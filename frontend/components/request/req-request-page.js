import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import TopBar from "../top-bar";
import globalStyles, { Colors } from "../../constants/global-styles";

const ErrorModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>Required Fields</Text>
            <Text style={modalStyles.modalText}>{message}</Text>
            <TouchableOpacity
              style={globalStyles.baseButtonGreen}
              onPress={onClose}
            >
              <Text style={globalStyles.baseButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const SuccessModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>Request Sent!</Text>
            <Text style={modalStyles.modalText}>
              Your request has been successfully sent.
            </Text>
            <TouchableOpacity
              style={globalStyles.baseButtonGreen}
              onPress={onClose}
            >
              <Text style={globalStyles.baseButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const RequestScreen = () => {
  const [formToRequest, setFormToRequest] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentMiddleName, setStudentMiddleName] = useState("");
  const [studentExtension, setStudentExtension] = useState("");
  const [studentLRN, setStudentLRN] = useState("");

  const [requestorLastName, setRequestorLastName] = useState("");
  const [requestorFirstName, setRequestorFirstName] = useState("");
  const [requestorExtension, setRequestorExtension] = useState("");
  const [requestorPhoneNumber, setRequestorPhoneNumber] = useState("");
  const [requestorEmail, setRequestorEmail] = useState("");

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleSendRequest = () => {
    const requiredFields = [
      { value: formToRequest, label: "Form to Request" },
      { value: studentLastName, label: "Student Last Name*" },
      { value: studentFirstName, label: "Student First Name*" },
      { value: studentMiddleName, label: "Student Middle Name*" },
      { value: requestorLastName, label: "Requestor Last Name*" },
      { value: requestorFirstName, label: "Requestor First Name*" },
      { value: requestorPhoneNumber, label: "Requestor Phone Number*" },
      { value: requestorEmail, label: "Requestor Email*" },
    ];

    let allFieldsFilled = true;
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (
        !field.value ||
        (typeof field.value === "string" && field.value.trim() === "")
      ) {
        allFieldsFilled = false;
        break;
      }
    }

    if (!allFieldsFilled) {
      setIsErrorModalVisible(true);
      return;
    }

    console.log({
      formToRequest,
      studentLastName,
      studentFirstName,
      studentMiddleName,
      studentExtension,
      studentLRN,
      requestorLastName,
      requestorFirstName,
      requestorExtension,
      requestorPhoneNumber,
      requestorEmail,
    });

    setIsSuccessModalVisible(true);
  };

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  const resetFormFields = () => {
    setFormToRequest("");
    setStudentLastName("");
    setStudentFirstName("");
    setStudentMiddleName("");
    setStudentExtension("");
    setStudentLRN("");
    setRequestorLastName("");
    setRequestorFirstName("");
    setRequestorExtension("");
    setRequestorPhoneNumber("");
    setRequestorEmail("");
  };

  return (
    <View style={styles.outerContainer}>
      <TopBar onUserIconPress={handleUserIconPress} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Request</Text>
          <View style={styles.sectionDivider} />

          <View style={styles.formRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.label}>Form to Request</Text>
              <View style={globalStyles.pickerContainer}>
                <Picker
                  selectedValue={formToRequest}
                  style={globalStyles.picker}
                  onValueChange={(itemValue) => setFormToRequest(itemValue)}
                >
                  <Picker.Item label="Select Form" value="" />
                  <Picker.Item label="Student Form 2" value="Student Form 2" />
                  <Picker.Item label="Student Form 9" value="Student Form 9" />
                  <Picker.Item
                    label="Student Form 10"
                    value="Student Form 10"
                  />
                </Picker>
              </View>

              <Text style={styles.label}>Student Last Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={studentLastName}
                onChangeText={setStudentLastName}
              />

              <Text style={styles.label}>Student First Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={studentFirstName}
                onChangeText={setStudentFirstName}
              />

              <Text style={styles.label}>Student Middle Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={studentMiddleName}
                onChangeText={setStudentMiddleName}
              />

              <Text style={styles.label}>Student Extension</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={studentExtension}
                onChangeText={setStudentExtension}
              />

              <Text style={styles.label}>Student LRN</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={studentLRN}
                onChangeText={setStudentLRN}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.fieldColumn}>
              <Text style={styles.label}>Requestor Last Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={requestorLastName}
                onChangeText={setRequestorLastName}
              />

              <Text style={styles.label}>Requestor First Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={requestorFirstName}
                onChangeText={setRequestorFirstName}
              />

              <Text style={styles.label}>Requestor Extension</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={requestorExtension}
                onChangeText={setRequestorExtension}
              />

              <Text style={styles.label}>Requestor Phone Number*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={requestorPhoneNumber}
                onChangeText={setRequestorPhoneNumber}
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>Requestor Email*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={requestorEmail}
                onChangeText={setRequestorEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.sendRequestButton}
        onPress={handleSendRequest}
      >
        <Text style={styles.buttonText}>SEND REQUEST</Text>
      </TouchableOpacity>

      <ErrorModal
        visible={isErrorModalVisible}
        message="Please fill out required fields."
        onClose={() => setIsErrorModalVisible(false)}
      />

      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={() => {
          setIsSuccessModalVisible(false);
          resetFormFields();
        }}
      />
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
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  fieldColumn: {
    width: "48%",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
    marginTop: 10,
  },
  pickerContainer: {
    height: 50,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: Colors.mediumGrey,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  picker: {
    width: "100%",
    height: "100%",
    color: "#000000",
  },
  sendRequestButton: {
    backgroundColor: "#69A75F",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 100,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default RequestScreen;
