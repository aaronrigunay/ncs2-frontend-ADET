import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import globalStyles, { Colors } from "../../constants/global-styles";
import TopBar from "../top-bar";

const GrdStdntSection = () => {
  const [enrolledStudents, setEnrolledStudents] = useState([
    { id: "e1", name: "GABE, LISA ANNE", checked: false },
    { id: "e2", name: "KOVACH, MILES HENRY", checked: false },
    { id: "e3", name: "PADEN, SORREL CAM", checked: false },
    { id: "e4", name: "CASTELIIO, ELZA ROMULO", checked: false },
    { id: "e5", name: "STAUSS, DOMINCA AYAN", checked: false },
    { id: "e6", name: "ANTUMA, TRERCERO GILA", checked: false },
    { id: "e7", name: "CASTELIIO, ELZA ROMULO", checked: false },
    { id: "e8", name: "BARAN, IWONA ATENEA", checked: false },
    { id: "e9", name: "BACKUS, NOREEN NEELY", checked: false },
  ]);

  const [unenrolledStudents, setUnenrolledStudents] = useState([
    { id: "u1", name: "ESTEVES, SHAZIA YUSUF", checked: false },
    { id: "u2", name: "JOSHII, YULIANA FELIIPE", checked: false },
    { id: "u3", name: "ARIF, MIGUELITO LUCAS", checked: false },
    { id: "u4", name: "LAZARO, BIA SHARMILA", checked: false },
    { id: "u5", name: "RICO, SIT CORNELIO", checked: false },
    { id: "u6", name: "CORREIA, FLORA LAKSHMI", checked: false },
  ]);

  const [gradeLevel] = useState("Grade 6");
  const [sectionName] = useState("Copper");
  const [adviser] = useState("GABE, LISA ANNE");
  const [searchText, setSearchText] = useState("");
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] =
    useState(false);
  const [saveModalMessage, setSaveModalMessage] = useState("");

  const searchInputTimeoutRef = useRef(null);

  const filteredEnrolledStudents = useMemo(() => {
    if (!searchText) {
      return enrolledStudents;
    }
    const lowercasedSearchText = searchText.toLowerCase();
    return enrolledStudents.filter((student) =>
      student.name.toLowerCase().includes(lowercasedSearchText)
    );
  }, [enrolledStudents, searchText]);

  const filteredUnenrolledStudents = useMemo(() => {
    if (!searchText) {
      return unenrolledStudents;
    }
    const lowercasedSearchText = searchText.toLowerCase();
    return unenrolledStudents.filter((student) =>
      student.name.toLowerCase().includes(lowercasedSearchText)
    );
  }, [unenrolledStudents, searchText]);

  const handleEnrolledCheckboxChange = useCallback((id) => {
    setEnrolledStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, checked: !student.checked } : student
      )
    );
  }, []);

  const handleUnenrolledCheckboxChange = useCallback((id) => {
    setUnenrolledStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, checked: !student.checked } : student
      )
    );
  }, []);

  const handleRemoveSelected = useCallback(() => {
    const studentsToRemove = enrolledStudents.filter(
      (student) => student.checked
    );
    const remainingEnrolled = enrolledStudents.filter(
      (student) => !student.checked
    );
    setEnrolledStudents(remainingEnrolled);
    setUnenrolledStudents((prevUnenrolled) => [
      ...prevUnenrolled,
      ...studentsToRemove.map((s) => ({ ...s, checked: false })),
    ]);
  }, [enrolledStudents]);

  const handleUserIconPress = useCallback(() => {
    console.log("User icon pressed! (Not Implemented)");
  }, []);

  const handleSearchTextChange = useCallback((text) => {
    setSearchText(text);

    if (searchInputTimeoutRef.current) {
      clearTimeout(searchInputTimeoutRef.current);
    }

    searchInputTimeoutRef.current = setTimeout(() => {}, 300);
  }, []);

  const handleAddStudents = useCallback(() => {
    const studentsToAdd = unenrolledStudents.filter(
      (student) => student.checked
    );
    const remainingUnenrolled = unenrolledStudents.filter(
      (student) => !student.checked
    );
    setUnenrolledStudents(remainingUnenrolled);
    setEnrolledStudents((prevEnrolled) => [
      ...prevEnrolled,
      ...studentsToAdd.map((s) => ({ ...s, checked: false })),
    ]);
  }, [unenrolledStudents]);

  const handleSave = () => {
    setSaveModalMessage("Save current edit?");
    setShowSaveConfirmationModal(true);
  };

  const confirmSave = () => {
    console.log("Saving changes...");
    setSaveModalMessage("Changes saved");
    setTimeout(() => {
      setShowSaveConfirmationModal(false);
      setSaveModalMessage("");
    }, 1500);
  };

  const cancelSave = () => {
    setShowSaveConfirmationModal(false);
    setSaveModalMessage("");
  };

  return (
    <View style={globalStyles.container}>
      <TopBar
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onUserIconPress={handleUserIconPress}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.mainTitle}>Student Sectioning</Text>
        <View style={styles.divider} />

        <View style={styles.sectionInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Grade Level :</Text>
            <Text style={styles.infoValue}>{gradeLevel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Section Name :</Text>
            <Text style={styles.infoValue}>{sectionName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Adviser :</Text>
            <Text style={styles.infoValue}>{adviser}</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.studentsListsContainer}>
          <View style={styles.studentsListColumn}>
            <Text style={styles.listHeader}>Enrolled Students</Text>
            {filteredEnrolledStudents.map((student) => (
              <View key={student.id} style={styles.studentItem}>
                <Text style={styles.studentName}>{student.name}</Text>
                <TouchableOpacity
                  onPress={() => handleEnrolledCheckboxChange(student.id)}
                  style={
                    student.checked
                      ? globalStyles.selectedStudentIndicator
                      : globalStyles.unselectedStudentIndicator
                  }
                ></TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.studentsListColumn}>
            <Text style={styles.listHeader}>Unenrolled Students</Text>
            {filteredUnenrolledStudents.map((student) => (
              <View key={student.id} style={styles.studentItem}>
                <Text style={styles.studentName}>{student.name}</Text>
                <TouchableOpacity
                  onPress={() => handleUnenrolledCheckboxChange(student.id)}
                  style={
                    student.checked
                      ? globalStyles.selectedStudentIndicator
                      : globalStyles.unselectedStudentIndicator
                  }
                ></TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemoveSelected}
        >
          <Text style={styles.buttonText}>REMOVE SELECTED</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddStudents}>
          <Text style={styles.buttonText}>ADD STUDENTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleSave}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showSaveConfirmationModal}
        onRequestClose={() => setShowSaveConfirmationModal(false)}
      >
        <View style={globalStyles.centeredView}>
          <View style={globalStyles.modalView}>
            <Text style={globalStyles.modalTitle}>Save Changes</Text>
            <Text style={globalStyles.modalText}>{saveModalMessage}</Text>
            {saveModalMessage === "Save current edit?" ? (
              <View style={globalStyles.modalButtons}>
                <TouchableOpacity
                  style={[globalStyles.modalButton, globalStyles.buttonCancel]}
                  onPress={cancelSave}
                >
                  <Text style={globalStyles.buttonTextStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    globalStyles.modalButton,
                    { backgroundColor: Colors.buttonGreen },
                  ]}
                  onPress={confirmSave}
                >
                  <Text style={globalStyles.buttonTextStyle}>SAVE</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={globalStyles.modalButtons}>
                <TouchableOpacity
                  style={[
                    globalStyles.modalButton,
                    { backgroundColor: Colors.buttonGreen },
                  ]}
                  onPress={cancelSave}
                >
                  <Text style={globalStyles.buttonTextStyle}>OK</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#D9D9D9",
    paddingTop: 30,
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "#D0D0D0",
    borderRadius: 25,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
  },
  searchInput: {
    width: 150,
    height: 30,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  divider: {
    height: 2,
    backgroundColor: "#AAAAAA",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  sectionInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 5,
  },
  infoValue: {
    fontSize: 16,
    color: "#000000",
  },
  studentsListsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  studentsListColumn: {
    flex: 1,
    marginHorizontal: 10,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    paddingBottom: 5,
  },
  studentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    backgroundColor: "#D9D9D9",
  },
  studentName: {
    fontSize: 16,
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  removeButton: {
    backgroundColor: "#580C1F",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#69A75F",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GrdStdntSection;
