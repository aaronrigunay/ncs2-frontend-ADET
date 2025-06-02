import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import globalStyles, { Colors } from "../../constants/global-styles";

import TopBar from "../top-bar";

const RegStudentView = () => {
  const params = useLocalSearchParams();
  const {
    studentName: paramStudentName,
    gender: paramGender,
    dateOfBirth: paramDateOfBirth,
  } = params;

  const [studentName, setStudentName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gradeLevel, setGradeLevel] = useState("GRADE 6");

  const [grades, setGrades] = useState([
    { subject: "MATHEMATICS", q1: 80, q2: 80, q3: 80, q4: 80, average: 80 },
    { subject: "SCIENCE", q1: 80, q2: 80, q3: 80, q4: 80, average: 80 },
    { subject: "ENGLISH", q1: 80, q2: 80, q3: 80, q4: 80, average: 80 },
    { subject: "FILIPINO", q1: 80, q2: 80, q3: 80, q4: 80, average: 80 },
    { subject: "MUSIC", q1: 80, q2: 80, q3: 80, q4: 80, average: 80 },
    { subject: "ARTS", q1: 80, q2: 80, q3: 80, q4: 80, average: 80 },
    {
      subject: "PHYSICAL EDUCATION",
      q1: 80,
      q2: 80,
      q3: 80,
      q4: 80,
      average: 80,
    },
    { subject: "HEALTH", q1: 80, q2: 80, q3: 80, q4: 80, average: 80 },
    {
      subject: "ARALING PANLIPUNAN",
      q1: 80,
      q2: 80,
      q3: 80,
      q4: 80,
      average: 80,
    },
    { subject: "SUBJECT 10", q1: 80, q2: 80, q3: 80, q4: 80, average: 80 },
  ]);

  useEffect(() => {
    if (paramStudentName) {
      setStudentName(paramStudentName);
    }
    if (paramGender) {
      setGender(paramGender);
    }
    if (paramDateOfBirth) {
      setDateOfBirth(paramDateOfBirth);
    }
  }, [paramStudentName, paramGender, paramDateOfBirth]);

  const calculateGeneralAverage = () => {
    const totalAverage = grades.reduce((sum, grade) => sum + grade.average, 0);
    return grades.length > 0
      ? (totalAverage / grades.length).toFixed(2)
      : "0.00";
  };

  const handleEditStudent = () => {
    alert("Navigating to Edit Student screen...");
  };

  const editStudent = async () => {
    console.log("Navigating to /edit-student");
    router.push({
      pathname: "/edit-student",
      params: {
        studentName: studentName,
        gender: gender,
        dateOfBirth: dateOfBirth,
      },
    });
  };

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  return (
    <View style={globalStyles.container}>
      <TopBar onUserIconPress={handleUserIconPress} />
      <View style={styles.mainContentContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Student</Text>
            <View style={globalStyles.pickerContainer}>
              <Picker
                selectedValue={gradeLevel}
                style={globalStyles.picker}
                onValueChange={(itemValue) => setGradeLevel(itemValue)}
                itemStyle={Platform.OS === "ios" ? { height: 40 } : {}}
              >
                <Picker.Item label="GRADE 1" value="GRADE 1" />
                <Picker.Item label="GRADE 2" value="GRADE 2" />
                <Picker.Item label="GRADE 3" value="GRADE 3" />
                <Picker.Item label="GRADE 4" value="GRADE 4" />
                <Picker.Item label="GRADE 5" value="GRADE 5" />
                <Picker.Item label="GRADE 6" value="GRADE 6" />
              </Picker>
            </View>
          </View>
          <View style={styles.headerDivider} />
          <View style={styles.contentContainer}>
            <View style={styles.studentInfoColumn}>
              <Text style={styles.infoLabel}>STUDENT NAME:</Text>
              <Text style={styles.infoValue}>{studentName}</Text>
              <View style={styles.infoDivider} />
              <Text style={styles.infoLabel}>GENDER:</Text>
              <Text style={styles.infoValue}>{gender}</Text>
              <View style={styles.infoDivider} />
              <Text style={styles.infoLabel}>DATE OF BIRTH</Text>
              <Text style={styles.infoValue}>{dateOfBirth}</Text>
              <View style={styles.infoDivider} />
            </View>

            <View style={styles.gradesColumn}>
              <Text style={styles.gradeColumnHeader}>
                GRADE {gradeLevel.split(" ")[1]}
              </Text>
              <View style={styles.gradesTable}>
                <View style={styles.tableHeaderRow}>
                  <Text style={[styles.tableHeaderCell, styles.subjectCell]}>
                    SUBJECT
                  </Text>
                  <Text style={styles.tableHeaderCell}>QUARTER 1</Text>
                  <Text style={styles.tableHeaderCell}>QUARTER 2</Text>
                  <Text style={styles.tableHeaderCell}>QUARTER 3</Text>
                  <Text style={styles.tableHeaderCell}>QUARTER 4</Text>
                  <Text style={styles.tableHeaderCell}>AVERAGE</Text>
                </View>
                {grades.map((grade, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.subjectCell]}>
                      {grade.subject}
                    </Text>
                    <Text style={styles.tableCell}>{grade.q1}</Text>
                    <Text style={styles.tableCell}>{grade.q2}</Text>
                    <Text style={styles.tableCell}>{grade.q3}</Text>
                    <Text style={styles.tableCell}>{grade.q4}</Text>
                    <Text style={styles.tableCell}>{grade.average}</Text>
                  </View>
                ))}
                <View style={styles.generalAverageRow}>
                  <Text style={styles.generalAverageLabel}>
                    GENERAL AVERAGE:
                  </Text>
                  <Text style={styles.generalAverageValue}>
                    {calculateGeneralAverage()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.editButton} onPress={editStudent}>
          <Text style={styles.buttonText}>EDIT STUDENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContentContainer: {
    flex: 1,
    position: "relative",
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  gradeLevelPickerContainer: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    overflow: "hidden",
    width: 120,
    height: 35,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  gradeLevelPicker: {
    height: 35,
    width: "100%",
    color: "#000000",
  },
  headerDivider: {
    height: 2,
    backgroundColor: "#000000",
    width: "100%",
    marginBottom: 20,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  studentInfoColumn: {
    width: "30%",
    paddingRight: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#000000",
    marginBottom: 5,
    marginTop: 15,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  infoDivider: {
    height: 1,
    backgroundColor: "transparent",
    marginTop: 5,
    marginBottom: 10,
  },
  gradesColumn: {
    width: "65%",
    borderLeftWidth: 1,
    backgroundColor: "transparent",
    paddingLeft: 20,
  },
  gradeColumnHeader: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "transparent",
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  gradesTable: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 0,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    paddingHorizontal: 2,
    backgroundColor: "transparent",
  },
  subjectCell: {
    flex: 2.5,
    textAlign: "left",
    paddingLeft: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  tableCell: {
    flex: 1,
    fontSize: 18,
    color: "#000000",
    textAlign: "center",
    paddingHorizontal: 2,
  },
  generalAverageRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderTopColor: "#000000",
  },
  generalAverageLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 10,
  },
  generalAverageValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  editButton: {
    backgroundColor: "#69A75F",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegStudentView;
