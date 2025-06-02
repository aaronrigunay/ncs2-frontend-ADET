import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import TopBar from "../top-bar";
import globalStyles, { Colors } from "../../constants/global-styles";
import { router } from "expo-router";

const studentSectioning = async () => {
  console.log("Navigating to /student-sectioning");
  router.push("/student-sectioning");
};

const ViewSectionScreen = () => {
  const [sectionData, setSectionData] = useState({
    gradeLevel: "Grade 6",
    sectionName: "Copper",
    adviser: "NUNES, RODRIGO AYESHA",
    students: [
      { id: "s1", name: "GABE, LISA ANNE", selected: false },
      { id: "s2", name: "KOVACH, MILES HENRY", selected: false },
      { id: "s3", name: "PADEN, SORREL CAM", selected: false },
      { id: "s4", name: "CASTELIIO, ELZA ROMULO", selected: false },
      { id: "s5", name: "STAUSS, DOMINCA AYAN", selected: false },
      { id: "s6", name: "ANTUMA, TRERCERO GILA", selected: false },
      { id: "s7", name: "CASTELIIO, ELZA ROMULO", selected: false },
      { id: "s8", name: "BARAN, IWONΑ ΑΤΕΝΕΑ", selected: false },
      { id: "s9", name: "BACKUS, NOREEN NEELY", selected: false },
    ],
  });

  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  const toggleStudentSelection = (studentId) => {
    setSectionData((prevSectionData) => {
      const updatedStudents = prevSectionData.students.map((student) =>
        student.id === studentId
          ? { ...student, selected: !student.selected }
          : student
      );
      return { ...prevSectionData, students: updatedStudents };
    });

    setSelectedStudentIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(studentId)) {
        return prevSelectedIds.filter((id) => id !== studentId);
      } else {
        return [...prevSelectedIds, studentId];
      }
    });
  };

  const handleRemoveSelected = () => {
    if (selectedStudentIds.length === 0) {
      console.log("No students selected to remove.");
      return;
    }
    setShowConfirmationModal(true);
  };

  const confirmRemoveStudents = () => {
    setSectionData((prevSectionData) => {
      const newStudents = prevSectionData.students.filter(
        (student) => !selectedStudentIds.includes(student.id)
      );
      return { ...prevSectionData, students: newStudents };
    });
    setSelectedStudentIds([]);
    setShowConfirmationModal(false);
    console.log("Selected students have been removed.");
  };

  const cancelRemoveStudents = () => {
    setShowConfirmationModal(false);
    setSectionData((prevSectionData) => ({
      ...prevSectionData,
      students: prevSectionData.students.map((student) => ({
        ...student,
        selected: false,
      })),
    }));
    setSelectedStudentIds([]);
  };

  const handleAddStudent = () => {
    console.log("Navigating to Add Student screen (Not Implemented)");
  };

  return (
    <View style={styles.outerContainer}>
      <TopBar onUserIconPress={handleUserIconPress} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>View Section</Text>
          <View style={styles.sectionDivider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Grade Level :</Text>
            <Text style={styles.infoValue}>{sectionData.gradeLevel}</Text>
          </View>
          <View style={styles.rowDivider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Section Name :</Text>
            <Text style={styles.infoValue}>{sectionData.sectionName}</Text>
          </View>
          <View style={styles.rowDivider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Adviser :</Text>
            <Text style={styles.infoValue}>{sectionData.adviser}</Text>
          </View>
          <View style={styles.rowDivider} />

          <View style={styles.studentsHeaderRow}>
            <Text style={styles.studentsLabel}>Students</Text>
          </View>
          <View style={styles.studentsHeaderDivider} />

          {sectionData.students.map((student) => (
            <View key={student.id} style={styles.studentRow}>
              <Text style={styles.studentName}>{student.name}</Text>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => toggleStudentSelection(student.id)}
              >
                <View
                  style={
                    student.selected
                      ? globalStyles.selectedStudentIndicator
                      : globalStyles.unselectedStudentIndicator
                  }
                />
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.rowDivider} />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemoveSelected}
        >
          <Text style={styles.removeButtonText}>REMOVE SELECTED</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={studentSectioning}>
          <Text style={styles.addButtonText}>ADD STUDENT</Text>
        </TouchableOpacity>
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
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionWrapper: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: "#000000",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 5,
  },
  infoValue: {
    fontSize: 16,
    color: "#000000",
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  studentsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  studentsLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  studentsHeaderDivider: {
    height: 2,
    backgroundColor: "#000000",
    marginBottom: 10,
  },
  studentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  studentName: {
    fontSize: 16,
    color: "#000000",
  },
  checkboxContainer: {
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
  },
  removeButton: {
    backgroundColor: Colors.buttonRed,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: Colors.buttonGreen,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalButtonConfirmOverride: {
    backgroundColor: Colors.buttonRed,
  },
});

export default ViewSectionScreen;
