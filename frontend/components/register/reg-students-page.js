import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
} from "react-native";

const RegStudentsListPage = () => {
  const [gradeLevel, setGradeLevel] = useState("GRADE 6");
  const [students, setStudents] = useState([
    { id: "1", fullName: "GABE, LISA ANNE", checked: false },
    { id: "2", fullName: "LAZARO, KAZIMIIREZ MRAN", checked: false },
    { id: "3", fullName: "ANTUMA, TRERCERO GILA", checked: false },
    { id: "4", fullName: "GOTTI, SHILA AXEL", checked: false },
    { id: "5", fullName: "MACHADO, AMOR SABINO", checked: false },
    { id: "6", fullName: "SKINNER, AMBROSO HALEY", checked: false },
    { id: "7", fullName: "PADEN, SORREL CAM", checked: false },
    { id: "8", fullName: "GOMEZ, BARBRA RUY", checked: false },
    { id: "9", fullName: "JACOBS, URBANO IDA", checked: false },
  ]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const gradeLevels = [
    "GRADE 1",
    "GRADE 2",
    "GRADE 3",
    "GRADE 4",
    "GRADE 5",
    "GRADE 6",
  ];

  const handleCheckboxChange = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, checked: !student.checked } : student
      )
    );
  };

  const handleRemoveSelected = () => {
    const newStudents = students.filter((student) => !student.checked);
    setStudents(newStudents);
    setSelectedStudents([]);
  };

  const handleRegisterStudent = () => {
    const selected = students.filter((student) => student.checked);
    setSelectedStudents(selected);
    if (selected.length > 0) {
      alert(
        `Registered Students: ${selected.map((s) => s.fullName).join(", ")}`
      );
    } else {
      alert("No students selected");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>NCS II : DMS</Text>
        <Text style={styles.headerSubtitle}>DATA MANAGEMENT SYSTEM</Text>

        <View style={styles.gradeLevelContainer}>
          <Text style={styles.gradeLevelText}>GRADE LEVEL</Text>
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

        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, { flex: 1 }]}>GRADE LEVEL</Text>
            <Text style={[styles.headerCell, { flex: 3 }]}>FULL NAME</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>ACTION</Text>
          </View>
          {students.map((student) => (
            <View style={styles.dataRow} key={student.id}>
              <Text style={[styles.dataCell, { flex: 1 }]}>{gradeLevel}</Text>
              <Text style={[styles.dataCell, { flex: 3 }]}>
                {student.fullName}
              </Text>
              <View
                style={[
                  styles.dataCell,
                  {
                    flex: 2,
                    flexDirection: "row",
                    justifyContent: "space-around",
                  },
                ]}
              >
                <TouchableOpacity>
                  <Text style={styles.viewButton}>VIEW</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.editButton}>EDIT</Text>
                </TouchableOpacity>
                <input
                  type="checkbox"
                  checked={student.checked}
                  onChange={() => handleCheckboxChange(student.id)}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.removeSelectedButton}
            onPress={handleRemoveSelected}
          >
            <Text style={styles.buttonText}>REMOVE SELECTED</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerStudentButton}
            onPress={handleRegisterStudent}
          >
            <Text style={styles.buttonText}>REGISTER STUDENT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  gradeLevelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  gradeLevelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    height: 30,
    width: 150,
  },
  table: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  dataCell: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  viewButton: {
    backgroundColor: "#D9D9D9",
    color: "#000000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#D9D9D9",
    color: "#000000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  removeSelectedButton: {
    backgroundColor: "#580C1F",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  registerStudentButton: {
    backgroundColor: "#69A75F",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegStudentsListPage;
