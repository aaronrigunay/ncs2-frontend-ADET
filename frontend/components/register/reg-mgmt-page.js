import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

import globalStyles, { Colors } from "../../constants/global-styles";

import TopBar from "../top-bar";

import { DUMMY_STUDENTS } from "../../dummy-data/dummy-register";

const registerStudent = async () => {
  console.log("Navigating to /register-student");
  router.push("/register-student");
};
const viewStudent = async (student) => {
  console.log("Navigating to /view-student with student:", student.fullName);
  router.push({
    pathname: "/view-student",
    params: {
      studentName: student.fullName,
      gender: student.gender,
      dateOfBirth: student.dateOfBirth,
      gradeLevel: student.gradeLevel,
    },
  });
};

const RegMegmtPage = () => {
  const [gradeLevel, setGradeLevel] = useState("ALL GRADE LEVELS");
  const [students, setStudents] = useState(DUMMY_STUDENTS);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const gradeLevels = [
    "ALL GRADE LEVELS",
    "GRADE 1",
    "GRADE 2",
    "GRADE 3",
    "GRADE 4",
    "GRADE 5",
    "GRADE 6",
  ];

  useEffect(() => {
    let currentFilteredStudents = students;

    if (searchText) {
      currentFilteredStudents = currentFilteredStudents.filter((student) =>
        student.fullName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (gradeLevel !== "ALL GRADE LEVELS") {
      currentFilteredStudents = currentFilteredStudents.filter(
        (student) => student.gradeLevel === gradeLevel
      );
    }

    setFilteredStudents(currentFilteredStudents);
  }, [students, searchText, gradeLevel]);

  const handleStudentSelection = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? { ...student, selected: !student.selected }
          : student
      )
    );

    setSelectedStudentIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((studentId) => studentId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const handleRemoveSelected = () => {
    if (selectedStudentIds.length === 0) {
      console.log("Please select students to remove.");
      return;
    }
    setShowConfirmationModal(true);
  };

  const confirmRemoveStudents = () => {
    const newStudents = students.filter(
      (student) => !selectedStudentIds.includes(student.id)
    );
    setStudents(newStudents);
    setSelectedStudentIds([]);
    setShowConfirmationModal(false);
    console.log("Selected students have been removed.");
  };

  const cancelRemoveStudents = () => {
    setShowConfirmationModal(false);
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({ ...student, selected: false }))
    );
    setSelectedStudentIds([]);
  };

  const handleRegisterStudent = () => {
    const selected = students.filter((student) =>
      selectedStudentIds.includes(student.id)
    );
    const selectedNames = selected.map((s) => s.fullName).join(", ");

    if (selected.length > 0) {
      console.log(`Registered Students: ${selectedNames}`);
    } else {
      console.log("No students selected");
    }
  };

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text !== "") {
      setGradeLevel("ALL GRADE LEVELS");
    }
  };

  const handleViewStudentDetails = (studentId) => {
    console.log(`Viewing details for student ID: ${studentId}`);
  };

  return (
    <View style={globalStyles.container}>
      <TopBar
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onUserIconPress={handleUserIconPress}
      />

      <View style={styles.content}>
        <View style={styles.filterContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gradeLevel}
              style={styles.picker}
              onValueChange={(itemValue) => setGradeLevel(itemValue)}
            >
              {gradeLevels.map((level) => (
                <Picker.Item key={level} label={level} value={level} />
              ))}
            </Picker>
          </View>
        </View>

        <ScrollView
          style={styles.tableContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={globalStyles.table}>
            <View style={globalStyles.headerRow}>
              <Text style={[globalStyles.headerCell, { flex: 1 }]}>
                GRADE LEVEL
              </Text>
              <Text style={[globalStyles.headerCell, { flex: 4 }]}>
                FULL NAME
              </Text>
              <Text style={[globalStyles.headerCellRightmost]}> </Text>
            </View>

            {filteredStudents.map((student) => (
              <View style={globalStyles.dataRow} key={student.id}>
                <TouchableOpacity
                  style={styles.mainContentClickableArea}
                  onPress={() => viewStudent(student)}
                >
                  <Text style={[globalStyles.dataCell, { flex: 1 }]}>
                    {student.gradeLevel}
                  </Text>
                  <Text
                    style={[
                      globalStyles.dataCell,
                      { flex: 4, borderRightWidth: 0 },
                    ]}
                  >
                    {student.fullName}
                  </Text>
                </TouchableOpacity>

                <View
                  style={[
                    globalStyles.dataCellRightmost,
                    {
                      width: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => handleStudentSelection(student.id)}
                    style={
                      student.selected
                        ? globalStyles.selectedStudentIndicator
                        : globalStyles.unselectedStudentIndicator
                    }
                  ></TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View
          style={[globalStyles.bottomButtons, styles.bottomButtonsOverride]}
        >
          <TouchableOpacity
            style={styles.removeSelectedButton}
            onPress={handleRemoveSelected}
          >
            <Text style={globalStyles.newRequestButtonText}>
              REMOVE SELECTED
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerStudentButton}
            onPress={registerStudent}
          >
            <Text style={globalStyles.newRequestButtonText}>
              REGISTER STUDENT
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
      >
        <View style={globalStyles.centeredView}>
          <View style={globalStyles.modalView}>
            <Text style={globalStyles.modalTitle}>Confirm Removal</Text>
            <Text style={globalStyles.modalText}>
              Are you sure you want to remove the selected student(s)? This
              action cannot be undone.
            </Text>
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={[globalStyles.modalButton, globalStyles.buttonCancel]}
                onPress={cancelRemoveStudents}
              >
                <Text style={globalStyles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  globalStyles.modalButton,
                  styles.modalButtonConfirmOverride,
                ]}
                onPress={confirmRemoveStudents}
              >
                <Text style={globalStyles.buttonTextStyle}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  pickerContainer: {
    fontSize: 16,
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    height: 63,
    width: 180,
    backgroundColor: Colors.mediumGrey,
  },
  tableContainer: {
    marginBottom: 20,
  },
  mainContentClickableArea: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  bottomButtonsOverride: {
    position: "relative",
    bottom: 0,
    right: 0,
  },
  removeSelectedButton: {
    backgroundColor: Colors.buttonRed,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  registerStudentButton: {
    backgroundColor: Colors.buttonGreen,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonConfirmOverride: {
    backgroundColor: Colors.buttonRed,
  },
});

export default RegMegmtPage;
