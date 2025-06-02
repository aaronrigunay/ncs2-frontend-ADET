import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import TopBar from "../top-bar";
import globalStyles, { Colors } from "../../constants/global-styles";

const logoSmall = require("../../assets/logo.png");

const GrdSectionCreate = () => {
  const [gradeLevel, setGradeLevel] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [adviser, setAdviser] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(true);

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  const handleCreateSection = () => {
    if (!gradeLevel || !sectionName.trim() || !adviser) {
      setModalMessage("Please fill all required fields (*).");
      setIsSuccessModal(false);
      setIsModalVisible(true);
      return;
    }

    console.log("Create Section:", {
      gradeLevel,
      sectionName,
      adviser,
    });

    setModalMessage(
      `Section Created!\nGrade Level: ${gradeLevel}\nSection Name: ${sectionName}\nAdviser: ${adviser}`
    );
    setIsSuccessModal(true);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    if (isSuccessModal) {
      setGradeLevel(""); // Clear grade level as well
      setSectionName("");
      setAdviser("");
    }
  };

  return (
    <View style={globalStyles.container}>
      <TopBar onUserIconPress={handleUserIconPress} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.sectionHeader}>
          <Text style={styles.formTitle}>Section Creation</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Grade Level*</Text>
          <View
            style={[styles.pickerContainer, !gradeLevel && styles.inputError]}
          >
            <Picker
              selectedValue={gradeLevel}
              style={styles.picker}
              onValueChange={(itemValue) => setGradeLevel(itemValue)}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="GRADE 1" value="GRADE 1" />
              <Picker.Item label="GRADE 2" value="GRADE 2" />
              <Picker.Item label="GRADE 3" value="GRADE 3" />
              <Picker.Item label="GRADE 4" value="GRADE 4" />
              <Picker.Item label="GRADE 5" value="GRADE 5" />
              <Picker.Item label="GRADE 6" value="GRADE 6" />
            </Picker>
          </View>

          <Text style={styles.label}>Section Name*</Text>
          <TextInput
            style={[globalStyles.baseInputMedium]}
            value={sectionName}
            onChangeText={setSectionName}
          />

          <Text style={styles.label}>Adviser*</Text>
          <View style={[styles.pickerContainer, !adviser && styles.inputError]}>
            <Picker
              selectedValue={adviser}
              style={styles.pickerAdviser}
              onValueChange={(itemValue) => setAdviser(itemValue)}
            >
              <Picker.Item label="" value="" />
              <Picker.Item
                label="NUNES, RODRIGO AYESHA"
                value="NUNES, RODRIGO AYESHA"
              />
              <Picker.Item
                label="BELO, INDRA ADELNA"
                value="BELO, INDRA ADELNA"
              />
              <Picker.Item
                label="SERRA, PRANAY RUBEN"
                value="SERRA, PRANAY RUBEN"
              />
            </Picker>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateSection}
        >
          <Text style={styles.buttonText}>CREATE SECTION</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text
              style={[
                styles.modalTitle,
                !isSuccessModal && styles.modalErrorTitle,
              ]}
            >
              {isSuccessModal ? "Section Created Successfully!" : "Error"}
            </Text>
            {isSuccessModal ? (
              <>
                <Text style={styles.modalText}>
                  <Text style={styles.modalTextBold}>Grade Level:</Text>{" "}
                  {gradeLevel}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalTextBold}>Section Name:</Text>{" "}
                  {sectionName}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalTextBold}>Adviser:</Text> {adviser}
                </Text>
              </>
            ) : (
              <Text style={styles.modalTextError}>{modalMessage}</Text>
            )}
            <TouchableOpacity
              onPress={closeModal}
              style={[
                globalStyles.baseButtonGreen,
                !isSuccessModal && styles.modalErrorButton,
              ]}
            >
              <Text style={globalStyles.baseButtonText}>
                {isSuccessModal ? "Close" : "OK"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    paddingBottom: 10,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: "#AAAAAA",
    width: "100%",
  },
  formContainer: {
    paddingTop: 10,
  },
  label: {
    color: "#333333",
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 16,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#transparent",
  },
  inputError: {
    borderColor: Colors.red,
    borderWidth: 2,
  },
  pickerContainer: {
    fontSize: 16,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "transparent",
  },
  picker: {
    height: 50,
    width: "20%",
    backgroundColor: Colors.mediumGrey,
  },
  pickerAdviser: {
    height: 50,
    width: "40%",
    backgroundColor: Colors.mediumGrey,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  createButton: {
    backgroundColor: "#5CB85C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  modalErrorTitle: {
    color: Colors.red,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
    textAlign: "center",
  },
  modalTextBold: {
    fontWeight: "bold",
  },
  modalTextError: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.red,
    textAlign: "center",
  },
  modalErrorButton: {
    backgroundColor: Colors.red,
  },
});

export default GrdSectionCreate;
