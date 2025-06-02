import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Modal, // Import Modal
  Alert, // Import Alert (still needed if used elsewhere, but not for finalize grades confirmation)
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import globalStyles, { Colors } from "../../constants/global-styles";

import TopBar from "../top-bar";
import { DUMMY_CLASS_REC } from "../../dummy-data/dummy-class-rec";

const handleUserIconPress = () => {
  console.log("User icon pressed! (Not Implemented)");
};

const ScoreInputCell = ({ value, onValueChange, maxScore, style }) => {
  const [text, setText] = useState(value !== null ? String(value) : "");
  const inputMaxLength = maxScore !== null ? String(maxScore).length : 3;

  const handleChangeText = (newText) => {
    setText(newText);
    const numValue = newText === "" ? null : parseInt(newText, 10);
    if (numValue === null || (numValue >= 0 && numValue <= maxScore)) {
      onValueChange(numValue);
    }
  };

  const isInvalid =
    text !== "" && (parseInt(text, 10) < 0 || parseInt(text, 10) > maxScore);
  const cellStyle = [
    styles.scoreInputCell,
    style,
    isInvalid && styles.invalidInputCell,
  ];
  return (
    <TextInput
      style={cellStyle}
      value={text}
      onChangeText={handleChangeText}
      keyboardType="numeric"
      maxLength={inputMaxLength}
      placeholder=""
      placeholderTextColor={Colors.mediumGrey}
      textAlign="center"
    />
  );
};

const WW_ITEM_COUNT = 10;
const PT_ITEM_COUNT = 10;
const ATTENDANCE_DAYS = 15;

const GRADING_WEIGHTS = {
  writtenWorks: 0.25,
  performanceTasks: 0.45,
  quarterlyAssessment: 0.3,
};

const AttendanceInputCell = ({ value, onValueChange, style }) => {
  const [text, setText] = useState(value || "");
  const handleChangeText = (newText) => {
    const formattedText = newText.toUpperCase();
    if (
      formattedText === "" ||
      formattedText === "P" ||
      formattedText === "A" ||
      formattedText === "L" ||
      formattedText === "T"
    ) {
      setText(formattedText);
      onValueChange(formattedText);
    }
  };

  return (
    <View style={[styles.attendanceInputCellContainer, style]}>
      <TextInput
        style={styles.attendanceInputCell}
        onChangeText={handleChangeText}
        value={text}
        maxLength={1}
        autoCapitalize="characters"
        textAlign="center"
      />
    </View>
  );
};

const GrdClassRec = () => {
  const [activeRecordTab, setActiveRecordTab] = useState("GRADES");
  const [selectedSubject, setSelectedSubject] = useState("ENGLISH");
  const [selectedQuarter, setSelectedQuarter] = useState("QUARTER 1");
  const [studentsData, setStudentsData] = useState(DUMMY_CLASS_REC);
  const [writtenWorksCollapsed, setWrittenWorksCollapsed] = useState(false);
  const [performanceTasksCollapsed, setPerformanceTasksCollapsed] =
    useState(false);
  const [searchText, setSearchText] = useState("");
  const [gradeLevel, setGradeLevel] = useState("ALL GRADE LEVELS");

  const [month, setMonth] = useState("JANUARY");
  const [attendanceData, setAttendanceData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  // State for result modal visibility and message
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // New state for finalize grades confirmation modal
  const [confirmFinalizeModalVisible, setConfirmFinalizeModalVisible] =
    useState(false);

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const monthIndex = months.indexOf(month);

    if (monthIndex !== -1) {
      const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
      const newDateRange = Array.from({ length: daysInMonth }, (_, i) =>
        String(i + 1)
      );
      setDateRange(newDateRange);

      const newDaysOfWeek = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear, monthIndex, i);
        const day = date.getDay();
        const dayNames = ["S", "M", "T", "W", "TH", "F", "S"];
        newDaysOfWeek.push(dayNames[day]);
      }
      setDaysOfWeek(newDaysOfWeek);

      if (
        attendanceData.length === 0 ||
        attendanceData[0].days.length !== daysInMonth
      ) {
        const initialAttendance = DUMMY_CLASS_REC.map((student) => ({
          name: student.name,
          days: Array(daysInMonth).fill("P"),
          absent: 0,
          tardy: 0,
          remarks: "Perfect Attendance",
        }));
        setAttendanceData(initialAttendance);
      } else {
        setAttendanceData((prevData) =>
          prevData.map((student) => {
            const newDays = Array(daysInMonth).fill("P");
            return {
              ...student,
              days: newDays,
              absent: 0,
              tardy: 0,
              remarks: "Perfect Attendance",
            };
          })
        );
      }
    }
  }, [month]);

  const [highestPossibleScores, setHighestPossibleScores] = useState({
    writtenWorks: Array(WW_ITEM_COUNT).fill(10),
    performanceTasks: Array(PT_ITEM_COUNT).fill(10),
    quarterlyAssessment: 100,
  });

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text !== "") {
      setGradeLevel("ALL GRADE LEVELS");
    }
  };

  const calculateStudentGrades = (student) => {
    const writtenWorksTotalMax = highestPossibleScores.writtenWorks.reduce(
      (sum, score) => sum + (score || 0),
      0
    );
    const performanceTasksTotalMax =
      highestPossibleScores.performanceTasks.reduce(
        (sum, score) => sum + (score || 0),
        0
      );
    const quarterlyAssessmentTotalMax =
      highestPossibleScores.quarterlyAssessment || 0;

    const validWrittenWorks = student.writtenWorks.filter((s) => s !== null);
    const totalWrittenWorksRaw = validWrittenWorks.reduce(
      (sum, score) => sum + score,
      0
    );
    const wwPS =
      writtenWorksTotalMax > 0
        ? (totalWrittenWorksRaw / writtenWorksTotalMax) * 100
        : 0;
    const wwWS = wwPS * GRADING_WEIGHTS.writtenWorks;
    const validPerformanceTasks = student.performanceTasks.filter(
      (s) => s !== null
    );
    const totalPerformanceTasksRaw = validPerformanceTasks.reduce(
      (sum, score) => sum + score,
      0
    );
    const ptPS =
      performanceTasksTotalMax > 0
        ? (totalPerformanceTasksRaw / performanceTasksTotalMax) * 100
        : 0;
    const ptWS = ptPS * GRADING_WEIGHTS.performanceTasks;
    const quarterlyAssessmentRaw = student.quarterlyAssessment;
    const qaPS =
      quarterlyAssessmentTotalMax > 0 && quarterlyAssessmentRaw !== null
        ? (quarterlyAssessmentRaw / quarterlyAssessmentTotalMax) * 100
        : 0;
    const qaWS = qaPS * GRADING_WEIGHTS.quarterlyAssessment;
    const initialGrade = wwWS + ptWS + qaWS;
    const finalGrade = Math.round(initialGrade);
    return {
      totalWrittenWorksRaw: totalWrittenWorksRaw,
      wwPS: parseFloat(wwPS.toFixed(1)),
      wwWS: parseFloat(wwWS.toFixed(1)),
      totalPerformanceTasksRaw: totalPerformanceTasksRaw,
      ptPS: parseFloat(ptPS.toFixed(1)),
      ptWS: parseFloat(ptWS.toFixed(1)),
      quarterlyAssessmentPS: parseFloat(qaPS.toFixed(1)),
      quarterlyAssessmentWS: parseFloat(qaWS.toFixed(1)),
      initialGrade: parseFloat(initialGrade.toFixed(1)),
      finalGrade: finalGrade,
    };
  };

  const handleHighestPossibleScoreChange = (category, itemIndex, newValue) => {
    setHighestPossibleScores((prevScores) => {
      const newScores = { ...prevScores };
      const parsedValue = newValue === null ? null : parseInt(newValue, 10);

      const maxOverallScore = 1000;
      if (
        parsedValue !== null &&
        (parsedValue < 0 || parsedValue > maxOverallScore)
      ) {
        return prevScores;
      }

      if (category === "writtenWorks" || category === "performanceTasks") {
        const newCategoryScores = [...newScores[category]];
        newCategoryScores[itemIndex] = parsedValue;
        newScores[category] = newCategoryScores;
      } else if (category === "quarterlyAssessment") {
        newScores.quarterlyAssessment = parsedValue;
      }
      return newScores;
    });
  };

  const handleScoreChange = (studentName, category, itemIndex, newValue) => {
    setStudentsData((prevData) => {
      const newStudentsData = [...prevData];
      const studentIndex = newStudentsData.findIndex(
        (s) => s.name === studentName
      );
      if (studentIndex === -1) return prevData; // Student not found, do nothing

      const parsedValue = newValue === null ? null : parseInt(newValue, 10);

      let isValid = true;
      let maxAllowed = 0;

      if (category === "writtenWorks") {
        maxAllowed = highestPossibleScores.writtenWorks[itemIndex] || 0;
      } else if (category === "performanceTasks") {
        maxAllowed = highestPossibleScores.performanceTasks[itemIndex] || 0;
      } else if (category === "quarterlyAssessment") {
        maxAllowed = highestPossibleScores.quarterlyAssessment || 0;
      }

      if (
        parsedValue !== null &&
        (parsedValue < 0 || parsedValue > maxAllowed)
      ) {
        isValid = false;
      }

      if (category === "writtenWorks" || category === "performanceTasks") {
        newStudentsData[studentIndex][category][itemIndex] = isValid
          ? parsedValue
          : newValue;
      } else if (category === "quarterlyAssessment") {
        newStudentsData[studentIndex].quarterlyAssessment = isValid
          ? parsedValue
          : newValue;
      }
      return newStudentsData;
    });
  };

  const handleAttendanceChange = (studentName, dayIndex, newValue) => {
    setAttendanceData((prevData) => {
      const newAttendanceData = [...prevData];
      const studentIndex = newAttendanceData.findIndex(
        (s) => s.name === studentName
      );
      if (studentIndex === -1) return prevData; // Student not found

      if (
        newAttendanceData[studentIndex] &&
        newAttendanceData[studentIndex].days
      ) {
        newAttendanceData[studentIndex].days[dayIndex] = newValue;
        const student = newAttendanceData[studentIndex];
        student.absent = student.days.filter((d) => d === "A").length;
        student.tardy = student.days.filter((d) => d === "T").length;
        student.remarks =
          student.absent > 0
            ? "Has Absences"
            : student.tardy > 0
              ? "Has Lates"
              : "Perfect Attendance";
      }
      return newAttendanceData;
    });
  };

  const calculatedHighestScores = {
    writtenWorksTotal: highestPossibleScores.writtenWorks.reduce(
      (sum, score) => sum + (score || 0),
      0
    ),
    writtenWorksPS: 100,
    writtenWorksWS: GRADING_WEIGHTS.writtenWorks * 100,
    performanceTasksTotal: highestPossibleScores.performanceTasks.reduce(
      (sum, score) => sum + (score || 0),
      0
    ),
    performanceTasksPS: 100,
    performanceTasksWS: GRADING_WEIGHTS.performanceTasks * 100,
    quarterlyAssessmentPS: 100,
    quarterlyAssessmentWS: GRADING_WEIGHTS.quarterlyAssessment * 100,
  };
  const renderHighestPossibleScoresRow = () => (
    <View style={[globalStyles.dataRow, styles.highestScoresRow]}>
      <Text style={[styles.highestScoresLabel, styles.nameCell]}>
        HIGHEST POSSIBLE SCORES
      </Text>
      {!writtenWorksCollapsed &&
        highestPossibleScores.writtenWorks.map((maxScore, index) => (
          <ScoreInputCell
            key={`hps-ww-${index}`}
            value={maxScore}
            onValueChange={(newValue) =>
              handleHighestPossibleScoreChange("writtenWorks", index, newValue)
            }
            maxScore={100}
            style={styles.highestScoreInputCell}
          />
        ))}
      <Text style={styles.highestScoreCellBold}>
        {calculatedHighestScores.writtenWorksTotal}
      </Text>
      <Text style={styles.highestScoreCellBold}>
        {calculatedHighestScores.writtenWorksPS}
      </Text>
      <Text style={styles.highestScoreCellBold}>
        {calculatedHighestScores.writtenWorksWS}%
      </Text>
      {!performanceTasksCollapsed &&
        highestPossibleScores.performanceTasks.map((maxScore, index) => (
          <ScoreInputCell
            key={`hps-pt-${index}`}
            value={maxScore}
            onValueChange={(newValue) =>
              handleHighestPossibleScoreChange(
                "performanceTasks",
                index,
                newValue
              )
            }
            maxScore={100}
            style={styles.highestScoreInputCell}
          />
        ))}
      <Text style={styles.highestScoreCellBold}>
        {calculatedHighestScores.performanceTasksTotal}
      </Text>
      <Text style={styles.highestScoreCellBold}>
        {calculatedHighestScores.performanceTasksPS}
      </Text>
      <Text style={styles.highestScoreCellBold}>
        {calculatedHighestScores.performanceTasksWS}%
      </Text>
      <ScoreInputCell
        value={highestPossibleScores.quarterlyAssessment}
        onValueChange={(newValue) =>
          handleHighestPossibleScoreChange("quarterlyAssessment", 0, newValue)
        }
        maxScore={100}
        style={styles.highestScoreInputCell}
      />
      <Text style={styles.highestScoreCellBold}>
        {calculatedHighestScores.quarterlyAssessmentPS}
      </Text>
      <Text style={styles.highestScoreCellBold}>
        {calculatedHighestScores.quarterlyAssessmentWS}%
      </Text>
      <Text style={styles.emptyCalculatedCell}></Text>
      <Text
        style={[styles.emptyCalculatedCell, { borderRightWidth: 0 }]}
      ></Text>
    </View>
  );

  const handleSaveDraft = () => {
    // Simulate API call success/failure
    const success = Math.random() > 0.3; // 70% chance of success
    if (success) {
      setModalMessage("Grades saved.");
    } else {
      setModalMessage("Error saving grades.");
    }
    setModalVisible(true);
  };

  const handleFinalizeGrades = () => {
    // Instead of Alert.alert, show the custom confirmation modal
    setConfirmFinalizeModalVisible(true);
  };

  // Function to handle the actual finalization logic
  const performFinalization = () => {
    const success = Math.random() > 0.3; // 70% chance of success
    if (success) {
      setModalMessage("Grades finalized."); // Specific message for successful finalization
    } else {
      setModalMessage("Error finalizing grades.");
    }
    setModalVisible(true); // Show the custom result modal
    setConfirmFinalizeModalVisible(false); // Hide the confirmation modal
  };

  return (
    <View style={globalStyles.container}>
      <TopBar
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onUserIconPress={handleUserIconPress}
      />
      <View style={globalStyles.mainContent}>
        <View style={styles.topHeader}>
          <View style={styles.recordTypeSelection}>
            <TouchableOpacity
              style={[
                styles.tabOption,
                activeRecordTab === "GRADES" && styles.tabOptionActive,
              ]}
              onPress={() => setActiveRecordTab("GRADES")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeRecordTab === "GRADES" && styles.tabTextActive,
                ]}
              >
                GRADES
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabOption,
                activeRecordTab === "ATTENDANCE" && styles.tabOptionActive,
              ]}
              onPress={() => setActiveRecordTab("ATTENDANCE")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeRecordTab === "ATTENDANCE" && styles.tabTextActive,
                ]}
              >
                ATTENDANCE
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dropdowns}>
            {activeRecordTab === "GRADES" && (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedSubject}
                  onValueChange={(itemValue) => setSelectedSubject(itemValue)}
                  style={globalStyles.picker}
                >
                  <Picker.Item label="ENGLISH" value="ENGLISH" />
                  <Picker.Item label="MATH" value="MATH" />
                  <Picker.Item label="SCIENCE" value="SCIENCE" />
                  <Picker.Item label="FILIPINO" value="FILIPINO" />
                </Picker>
              </View>
            )}
            <View style={styles.pickerContainer}>
              {activeRecordTab === "GRADES" ? (
                <Picker
                  selectedValue={selectedQuarter}
                  onValueChange={(itemValue) => setSelectedQuarter(itemValue)}
                  style={globalStyles.picker}
                >
                  <Picker.Item label="QUARTER 1" value="QUARTER 1" />
                  <Picker.Item label="QUARTER 2" value="QUARTER 2" />
                  <Picker.Item label="QUARTER 3" value="QUARTER 3" />
                  <Picker.Item label="QUARTER 4" value="QUARTER 4" />
                </Picker>
              ) : (
                <Picker
                  selectedValue={month}
                  onValueChange={(itemValue) => setMonth(itemValue)}
                  style={globalStyles.picker}
                >
                  {months.map((m) => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                </Picker>
              )}
            </View>
          </View>
        </View>

        {activeRecordTab === "GRADES" && (
          <>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.tableScrollContainer}
              stickyHeaderIndices={[0, 1]}
              showsVerticalScrollIndicator={false}
              key={`grades-table-${searchText}`}
            >
              <View style={tableStyles.table}>
                <View style={globalStyles.headerRow}>
                  <Text style={[tableStyles.headerCell, styles.nameHeader1]}>
                    NAME
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setWrittenWorksCollapsed(!writtenWorksCollapsed)
                    }
                    style={[
                      tableStyles.headerCell,
                      styles.categoryHeader1,
                      {
                        width: writtenWorksCollapsed
                          ? styles.categoryHeader1Collapsed.width
                          : styles.categoryHeader1.width,
                      },
                    ]}
                  >
                    <Text style={styles.headerText}>
                      WRITTEN WORKS {writtenWorksCollapsed ? "►" : "▼"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setPerformanceTasksCollapsed(!performanceTasksCollapsed)
                    }
                    style={[
                      tableStyles.headerCell,
                      styles.categoryHeader1,
                      {
                        width: performanceTasksCollapsed
                          ? styles.categoryHeader1Collapsed.width
                          : styles.categoryHeader1.width,
                      },
                    ]}
                  >
                    <Text style={styles.headerText}>
                      PERFORMANCE TASK {performanceTasksCollapsed ? "►" : "▼"}
                    </Text>
                  </TouchableOpacity>
                  <Text style={[tableStyles.headerCell, styles.qaHeader1]}>
                    QUARTERLY ASSESSMENT
                  </Text>
                  <Text style={[tableStyles.headerCell, styles.gradeHeader1]}>
                    INITIAL GRADE
                  </Text>
                  <Text
                    style={[
                      tableStyles.headerCell,
                      styles.gradeHeader1,
                      { borderRightWidth: 0 },
                    ]}
                  >
                    FINAL GRADE
                  </Text>
                </View>

                <View style={styles.headerRow2}>
                  <Text style={[styles.nameHeader2]}></Text>
                  {!writtenWorksCollapsed &&
                    studentsData[0].writtenWorksNames.map((name, i) => (
                      <Text key={`ww-h2-${i}`} style={styles.subHeaderCell}>
                        {name || i + 1}{" "}
                      </Text>
                    ))}
                  <Text style={styles.subHeaderCellCalculated}>TOTAL</Text>
                  <Text style={styles.subHeaderCellCalculated}>PS</Text>
                  <Text style={styles.subHeaderCellCalculated}>WS</Text>
                  {!performanceTasksCollapsed &&
                    studentsData[0].performanceTasksNames.map((name, i) => (
                      <Text key={`pt-h2-${i}`} style={styles.subHeaderCell}>
                        {name || i + 1}{" "}
                      </Text>
                    ))}
                  <Text style={styles.subHeaderCellCalculated}>TOTAL</Text>
                  <Text style={styles.subHeaderCellCalculated}>PS</Text>
                  <Text style={styles.subHeaderCellCalculated}>WS</Text>
                  <Text style={styles.subHeaderCell}>QA</Text>
                  <Text style={styles.subHeaderCellCalculated}>PS</Text>
                  <Text style={styles.subHeaderCellCalculated}>WS</Text>
                  <Text style={styles.emptyCalculatedCell}></Text>
                  <Text
                    style={[
                      styles.emptyCalculatedCell,
                      { borderRightWidth: 0 },
                    ]}
                  ></Text>
                </View>

                {renderHighestPossibleScoresRow()}

                <ScrollView
                  contentContainerStyle={styles.dataRowsContainer}
                  showsVerticalScrollIndicator={false}
                >
                  {studentsData
                    .filter((student) =>
                      student.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                    .map((student, studentIndex) => {
                      const grades = calculateStudentGrades(student);
                      const isPassing = grades.finalGrade >= 75;

                      return (
                        <View
                          key={student.name}
                          style={[
                            globalStyles.dataRow,
                            studentIndex % 2 === 1 && styles.oddRowBackground,
                          ]}
                        >
                          <Text style={styles.nameCell}>{student.name}</Text>
                          {!writtenWorksCollapsed &&
                            student.writtenWorks.map((score, i) => (
                              <ScoreInputCell
                                key={`ww-input-${student.name}-${i}`}
                                value={score}
                                onValueChange={(newValue) =>
                                  handleScoreChange(
                                    student.name,
                                    "writtenWorks",
                                    i,
                                    newValue
                                  )
                                }
                                maxScore={
                                  highestPossibleScores.writtenWorks[i] || 0
                                }
                                style={styles.scoreInputCell}
                              />
                            ))}
                          <Text style={styles.calculatedCell}>
                            {grades.totalWrittenWorksRaw}
                          </Text>
                          <Text style={styles.calculatedCell}>
                            {grades.wwPS.toFixed(1)}
                          </Text>
                          <Text style={styles.calculatedCell}>
                            {grades.wwWS.toFixed(1)}
                          </Text>

                          {!performanceTasksCollapsed &&
                            student.performanceTasks.map((score, i) => (
                              <ScoreInputCell
                                key={`pt-input-${student.name}-${i}`}
                                value={score}
                                onValueChange={(newValue) =>
                                  handleScoreChange(
                                    student.name,
                                    "performanceTasks",
                                    i,
                                    newValue
                                  )
                                }
                                maxScore={
                                  highestPossibleScores.performanceTasks[i] || 0
                                }
                                style={styles.scoreInputCell}
                              />
                            ))}
                          <Text style={styles.calculatedCell}>
                            {grades.totalPerformanceTasksRaw}
                          </Text>
                          <Text style={styles.calculatedCell}>
                            {grades.ptPS.toFixed(1)}
                          </Text>
                          <Text style={styles.calculatedCell}>
                            {grades.ptWS.toFixed(1)}
                          </Text>

                          <ScoreInputCell
                            value={student.quarterlyAssessment}
                            onValueChange={(newValue) =>
                              handleScoreChange(
                                student.name,
                                "quarterlyAssessment",
                                0,
                                newValue
                              )
                            }
                            maxScore={highestPossibleScores.quarterlyAssessment}
                            style={styles.scoreInputCell}
                          />
                          <Text style={styles.calculatedCell}>
                            {grades.quarterlyAssessmentPS.toFixed(1)}
                          </Text>
                          <Text style={styles.calculatedCell}>
                            {grades.quarterlyAssessmentWS.toFixed(1)}
                          </Text>

                          <Text style={styles.initialGradeCell}>
                            {grades.initialGrade.toFixed(1)}
                          </Text>
                          <Text
                            style={[
                              styles.finalGradeCell,
                              isPassing
                                ? styles.passingGrade
                                : styles.failingGrade,
                            ]}
                          >
                            {grades.finalGrade}
                          </Text>
                        </View>
                      );
                    })}
                </ScrollView>
              </View>
            </ScrollView>

            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={globalStyles.baseButtonGreen}
                onPress={handleSaveDraft} // Call handler for Save Draft
              >
                <Text style={styles.submitButtonText}>SAVE DRAFT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyles.baseButtonGreen}
                onPress={handleFinalizeGrades} // Call handler for Finalize Grades
              >
                <Text style={styles.submitButtonText}>FINALIZE GRADES</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {activeRecordTab === "ATTENDANCE" && (
          <ScrollView
            contentContainerStyle={styles.tableScrollContainer}
            stickyHeaderIndices={[0, 1]}
            showsVerticalScrollIndicator={true}
            key={`attendance-table-${searchText}`} // Added key here
          >
            <View style={tableStyles.table}>
              <View style={styles.attendanceHeaderRow}>
                <Text style={[styles.attendanceNameHeader, { flex: 0.8 }]}>
                  NAME
                </Text>
                <View
                  style={[
                    styles.attendanceHeaderCell,
                    {
                      flex: 3.5,
                      flexDirection: "column",
                      paddingHorizontal: 0,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      marginBottom: 5,
                    }}
                  >
                    <Text style={styles.attendanceHeaderText}>DATE</Text>
                  </View>
                  <View style={styles.dateDaysContainer}>
                    {" "}
                    {dateRange.map((date) => (
                      <View key={date} style={styles.dateDayCell}>
                        <Text style={styles.attendanceHeaderText}>{date}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <Text
                  style={[
                    styles.attendanceHeaderCell,
                    { flex: 0.7, textAlign: "center" },
                  ]}
                >
                  Total
                </Text>
                <Text
                  style={[
                    styles.attendanceHeaderCell,
                    { flex: 1, borderRightWidth: 0 },
                  ]}
                >
                  REMARK/S
                </Text>
              </View>

              <View style={styles.attendanceHeaderRow}>
                <Text
                  style={[styles.attendanceNameHeader, { flex: 0.8 }]}
                ></Text>
                <View
                  style={[
                    styles.attendanceHeaderCell,
                    {
                      flex: 3.5,
                      flexDirection: "column",
                      paddingHorizontal: 0,
                    },
                  ]}
                >
                  <View style={{ width: "100%", marginBottom: 5 }}></View>
                  <View style={styles.dateDaysContainer}>
                    {" "}
                    {daysOfWeek.map((day, index) => (
                      <View
                        key={`dayHeader${index}`}
                        style={styles.dateDayCell}
                      >
                        <Text style={styles.attendanceHeaderText}>{day}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View
                  style={[
                    styles.attendanceHeaderCell,
                    { flex: 0.7, flexDirection: "row", paddingHorizontal: 0 },
                  ]}
                >
                  <Text
                    style={[
                      styles.attendanceSubHeaderText,
                      { borderRightWidth: 1 },
                    ]}
                  >
                    Absent
                  </Text>
                  <Text
                    style={[
                      styles.attendanceSubHeaderText,
                      { borderRightWidth: 0 },
                    ]}
                  >
                    Tardy
                  </Text>
                </View>
                <Text
                  style={[
                    styles.attendanceHeaderCell,
                    { flex: 1, borderRightWidth: 0 },
                  ]}
                ></Text>
              </View>

              <ScrollView
                contentContainerStyle={styles.dataRowsContainer}
                showsVerticalScrollIndicator={false}
              >
                {attendanceData
                  .filter((student) =>
                    student.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((student, studentIndex) => {
                    const totalAbsent = student.days.filter(
                      (a) => a === "A"
                    ).length;
                    const totalTardy = student.days.filter(
                      (a) => a === "T"
                    ).length;
                    return (
                      <View
                        key={student.name}
                        style={[
                          globalStyles.dataRow,
                          studentIndex % 2 === 1 && styles.oddRowBackground,
                        ]}
                      >
                        <Text
                          style={[
                            styles.nameCell,
                            { flex: 0.8, backgroundColor: Colors.white },
                          ]}
                        >
                          {student.name}
                        </Text>
                        <View
                          style={[
                            styles.dataCell,
                            {
                              flex: 3.5,
                              flexDirection: "row",
                              flexWrap: "wrap",
                              paddingVertical: 0,
                              paddingHorizontal: 0,
                              justifyContent: "space-around",
                            },
                          ]}
                        >
                          {student.days.map((status, dayIndex) => (
                            <AttendanceInputCell
                              key={`att-${student.name}-${dayIndex}`}
                              value={status}
                              onValueChange={(newValue) =>
                                handleAttendanceChange(
                                  student.name,
                                  dayIndex,
                                  newValue
                                )
                              }
                              style={[
                                styles.attendanceInputCellAttendanceTable,
                                {
                                  borderColor:
                                    status === "A"
                                      ? Colors.danger
                                      : status === "T"
                                        ? Colors.warning
                                        : Colors.mediumGrey,
                                  color:
                                    status === "A"
                                      ? Colors.danger
                                      : status === "T"
                                        ? Colors.warning
                                        : Colors.success,
                                  borderWidth: 1,
                                  margin: 1,
                                },
                              ]}
                            />
                          ))}
                        </View>
                        <View
                          style={[
                            styles.dataCell,
                            {
                              flex: 0.7,
                              flexDirection: "row",
                              paddingVertical: 0,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.attendanceCalculatedCell,
                              {
                                borderRightWidth: 1,
                                borderColor: Colors.border,
                              },
                            ]}
                          >
                            {totalAbsent}
                          </Text>
                          <Text
                            style={[
                              styles.attendanceCalculatedCell,
                              { borderRightWidth: 0 },
                            ]}
                          >
                            {totalTardy}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.attendanceRemarksCell,
                            {
                              flex: 1,
                              borderRightWidth: 0,
                              backgroundColor: Colors.fadedGrey,
                              paddingVertical: 10,
                            },
                          ]}
                        >
                          {student.remarks}
                        </Text>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>

            <View style={styles.notesContainer}>
              <Text style={styles.notesTitle}>Notes:</Text>
              <Text style={styles.noteText}>
                DATE (1st row for date, 2nd row for Day: M,T,W,TH,F, S)
              </Text>
              <Text style={styles.noteText}>
                REMARK/S (If DROPPED OUT, state reason, please refer to legend
                number 2. If TRANSFERRED IN/OUT, write the name of School.)
              </Text>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Confirmation Modal for Finalize Grades */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmFinalizeModalVisible}
        onRequestClose={() => {
          setConfirmFinalizeModalVisible(false); // Allows dismissal by Android back button
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>Finalize grades?</Text>
            <Text style={modalStyles.modalSubText}>This cannot be undone.</Text>
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonCancel]}
                onPress={() => setConfirmFinalizeModalVisible(false)}
              >
                <Text style={globalStyles.baseButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonConfirm]}
                onPress={performFinalization} // Call the actual finalization logic
              >
                <Text style={globalStyles.baseButtonText}>Finalize</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Result Modal for "Grades saved.", "Error saving grades.", or "Grades finalized." */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={modalStyles.textStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles remain unchanged, adding new styles for confirmation modal buttons and sub-text
const styles = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  recordTypeSelection: {
    flexDirection: "row",
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.mediumGrey,
  },
  tabOption: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRightWidth: 1,
    borderRightColor: Colors.mediumGrey,
    borderWidth: 1,
    borderBlockColor: Colors.tableBorder,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  tabOptionActive: {
    backgroundColor: Colors.buttonGreen,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.darkGrey,
  },
  tabTextActive: {
    color: Colors.white,
  },
  dropdowns: {
    flexDirection: "row",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.mediumGrey,
    borderRadius: 5,
    overflow: "hidden",
    height: 35,
    justifyContent: "center",
    marginHorizontal: 5,
    backgroundColor: Colors.white,
    minWidth: 120,
  },
  tableScrollContainer: {
    flexGrow: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  nameHeader1: {
    width: 180,
    backgroundColor: Colors.headerBg,
    borderRightColor: Colors.border,
    textAlign: "left",
    paddingLeft: 10,
  },
  categoryHeader1: {
    width: WW_ITEM_COUNT * 30 + 3 * 50,
    backgroundColor: Colors.headerBg,
    borderRightColor: Colors.border,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryHeader1Collapsed: {
    width: 3 * 50,
  },
  headerText: {
    color: Colors.headerText,
    fontWeight: "bold",
  },
  qaHeader1: {
    width: 1 * 30 + 2 * 50,
    backgroundColor: Colors.headerBg,
    borderRightColor: Colors.border,
  },
  gradeHeader1: {
    width: 70,
    backgroundColor: Colors.headerBg,
    borderRightColor: Colors.border,
  },
  headerRow2: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  nameHeader2: {
    width: 180,
    borderRightWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.nameBg,
  },
  subHeaderCell: {
    width: 30,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: Colors.border,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
    color: Colors.headerText,
  },
  subHeaderCellCalculated: {
    width: 50,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: Colors.border,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
    color: Colors.headerText,
  },
  highestScoresRow: {
    backgroundColor: Colors.lighterGrey,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  highestScoresLabel: {
    fontWeight: "bold",
    color: Colors.darkGrey,
    textAlign: "left",
    paddingLeft: 10,
    backgroundColor: Colors.nameBg,
    borderRightColor: Colors.border,
  },
  highestScoreInputCell: {
    width: 30,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: Colors.border,
    textAlign: "center",
    fontSize: 10,
    color: Colors.darkGrey,
    backgroundColor: Colors.white,
  },
  highestScoreCellBold: {
    width: 50,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: Colors.border,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.darkGrey,
  },
  dataRowsContainer: {
    flexGrow: 1,
  },
  oddRowBackground: {
    backgroundColor: Colors.lightGrey,
  },
  nameCell: {
    width: 180,
    paddingVertical: 10,
    paddingLeft: 10,
    borderRightWidth: 1,
    borderColor: Colors.border,
    fontSize: 13,
    fontWeight: "normal",
    color: Colors.darkGrey,
    backgroundColor: Colors.white,
    position: "sticky",
    left: 0,
    zIndex: 1,
  },
  scoreInputCell: {
    width: 30,
    height: 30,
    marginHorizontal: 0,
    borderRadius: 4,
    borderColor: Colors.mediumGrey,
    borderWidth: 1,
    backgroundColor: Colors.white,
    color: Colors.darkGrey,
    fontSize: 13,
  },
  invalidInputCell: {
    borderColor: Colors.danger,
    borderWidth: 2,
  },
  calculatedCell: {
    width: 50,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: Colors.border,
    textAlign: "center",
    fontSize: 13,
    color: Colors.darkGrey,
    backgroundColor: Colors.fadedGrey,
    fontWeight: "500",
  },
  initialGradeCell: {
    width: 70,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: Colors.border,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.darkGrey,
    backgroundColor: Colors.lighterGrey,
  },
  finalGradeCell: {
    width: 70,
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.darkGrey,
    backgroundColor: Colors.lighterGrey,
    borderRightWidth: 0,
  },
  passingGrade: {
    color: Colors.success,
  },
  failingGrade: {
    color: Colors.danger,
  },
  emptyCalculatedCell: {
    width: 70,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.secondary,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 15,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  submitAllButton: {
    backgroundColor: Colors.baseButtonGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitAllButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  submitButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  placeholderView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  placeholderText: {
    fontSize: 18,
    color: Colors.darkGrey,
    fontStyle: "italic",
  },
  attendanceHeaderRow: {
    flexDirection: "row",
    backgroundColor: Colors.headerBg,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  attendanceNameHeader: {
    paddingVertical: 10,
    paddingLeft: 10,
    borderRightWidth: 1,
    borderColor: Colors.border,
    fontWeight: "bold",
    color: Colors.headerText,
    textAlign: "left",
    backgroundColor: Colors.nameBg,
  },
  attendanceHeaderCell: {
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  attendanceHeaderText: {
    fontWeight: "bold",
    fontSize: 12,
    color: Colors.headerText,
  },
  attendanceSubHeaderText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
    color: Colors.headerText,
    borderRightWidth: 1,
    borderColor: Colors.border,
  },
  attendanceInputCellContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRightWidth: 1,
    borderColor: Colors.border,
  },
  attendanceInputCell: {
    width: "80%",
    height: 30,
    borderRadius: 4,
    borderColor: Colors.mediumGrey,
    borderWidth: 1,
    backgroundColor: Colors.white,
    color: Colors.darkGrey,
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
  attendanceInputCellAttendanceTable: {
    width: 25,
    height: 25,
    borderRadius: 4,
    borderColor: Colors.mediumGrey,
    borderWidth: 1,
    backgroundColor: Colors.white,
    color: Colors.darkGrey,
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
    marginHorizontal: 1,
    marginVertical: 1,
  },
  attendanceCalculatedCell: {
    flex: 1,
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 13,
    color: Colors.darkGrey,
    backgroundColor: Colors.fadedGrey,
    fontWeight: "500",
  },
  attendanceRemarksCell: {
    textAlign: "left",
    paddingLeft: 10,
    fontSize: 13,
    color: Colors.darkGrey,
    fontWeight: "500",
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.tableBorder,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },
  headerCell: {
    paddingVertical: 12,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.text,
    borderRightWidth: 1,
    borderRightColor: Colors.tableBorder,
  },
  dataCell: {
    fontSize: 13,
    color: Colors.tableCellText,
    textAlign: "center",
    paddingHorizontal: 10,
    flex: 1,
  },
  notesContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.darkGrey,
  },
  noteText: {
    fontSize: 12,
    color: Colors.darkGrey,
    marginBottom: 3,
  },
  dateDaysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  dateDayCell: {
    width: 25,
    alignItems: "center",
    marginVertical: 2,
  },
});

const tableStyles = StyleSheet.create({
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.tableBorder,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },
  headerCell: {
    paddingVertical: 12,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.text,
    borderRightWidth: 1,
    borderRightColor: Colors.tableBorder,
  },
  dataCell: {
    fontSize: 13,
    color: Colors.tableCellText,
    textAlign: "center",
    paddingHorizontal: 10,
    flex: 1,
  },
});

// New styles for the modal
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalView: {
    margin: 10, // Reduced margin to make the white box bigger
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Added width to make it bigger
    maxWidth: 400, // Optional: maximum width for larger screens
    maxHeight: "70%", // Optional: maximum height
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.darkGrey,
  },
  modalSubText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14,
    color: "#222222",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginHorizontal: 5,
    minWidth: 100,
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: Colors.buttonGreen,
  },

  buttonConfirm: {
    width: "40%",
    height: 50,
    backgroundColor: Colors.buttonGreen,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonCancel: {
    width: "40%",
    height: 50,
    backgroundColor: Colors.buttonRed,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GrdClassRec;
