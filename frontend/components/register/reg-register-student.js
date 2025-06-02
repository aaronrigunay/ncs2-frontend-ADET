import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "../date-picker";
import TopBar from "../top-bar";
import globalStyles, { Colors } from "../../constants/global-styles";

const logoSmall = require("../../assets/logo.png");

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

const SuccessModal = ({ visible, studentName, onClose }) => {
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
            <Text style={modalStyles.modalTitle}>Registration Successful!</Text>
            <Text style={modalStyles.modalText}>Student registered.</Text>
            <Text style={modalStyles.modalText}>Student: {studentName}</Text>
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

const RegRegisterStudent = () => {
  const [studentLastName, setStudentLastName] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentMiddleName, setStudentMiddleName] = useState("");
  const [studentExtension, setStudentExtension] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");

  const [motherLastName, setMotherLastName] = useState("");
  const [motherFirstName, setMotherFirstName] = useState("");
  const [motherMiddleName, setMotherMiddleName] = useState("");
  const [motherExtension, setMotherExtension] = useState("");

  const [fatherLastName, setFatherLastName] = useState("");
  const [fatherFirstName, setFatherFirstName] = useState("");
  const [fatherMiddleName, setFatherMiddleName] = useState("");
  const [fatherExtension, setFatherExtension] = useState("");

  const [guardianLastName, setGuardianLastName] = useState("");
  const [guardianFirstName, setGuardianFirstName] = useState("");
  const [guardianMiddleName, setGuardianMiddleName] = useState("");
  const [guardianExtension, setGuardianExtension] = useState("");

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [registeredStudentName, setRegisteredStudentName] = useState("");

  const handleRegister = () => {
    const requiredFields = [
      { value: studentLastName, name: "Student Last Name" },
      { value: studentFirstName, name: "Student First Name" },
      { value: gender, name: "Gender" },
      {
        value:
          birthDate.toDateString() !== new Date().toDateString()
            ? birthDate
            : "",
        name: "Birth Date",
      },
      { value: address, name: "Address" },
      { value: city, name: "City" },
      { value: province, name: "Province" },
      { value: gradeLevel, name: "Grade Level" },
      { value: motherLastName, name: "Mother's Last Name" },
      { value: motherFirstName, name: "Mother's First Name" },
      { value: motherMiddleName, name: "Mother's Middle Name" },
      { value: fatherLastName, name: "Father's Last Name" },
      { value: fatherFirstName, name: "Father's First Name" },
      { value: guardianLastName, name: "Guardian Last Name" },
      { value: guardianFirstName, name: "Guardian First Name" },
    ];

    let allFieldsFilled = true;
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (
        !field.value ||
        (typeof field.value === "string" && field.value.trim() === "") ||
        (field.name === "Birth Date" && field.value === "")
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
      studentLastName,
      studentFirstName,
      studentMiddleName,
      studentExtension,
      gender,
      birthDate: birthDate.toISOString().split("T")[0],
      address,
      city,
      province,
      gradeLevel,
      motherLastName,
      motherFirstName,
      motherMiddleName,
      motherExtension,
      fatherLastName,
      fatherFirstName,
      fatherMiddleName,
      fatherExtension,
      guardianLastName,
      guardianFirstName,
      guardianMiddleName,
      guardianExtension,
    });

    setRegisteredStudentName(`${studentLastName}, ${studentFirstName}`);
    setIsSuccessModalVisible(true);
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleDateSelected = (date) => {
    setBirthDate(date);
  };

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  const resetFormFields = () => {
    setStudentLastName("");
    setStudentFirstName("");
    setStudentMiddleName("");
    setStudentExtension("");
    setGender("");
    setBirthDate(new Date());
    setAddress("");
    setCity("");
    setProvince("");
    setGradeLevel("");
    setMotherLastName("");
    setMotherFirstName("");
    setMotherMiddleName("");
    setMotherExtension("");
    setFatherLastName("");
    setFatherFirstName("");
    setFatherMiddleName("");
    setFatherExtension("");
    setGuardianLastName("");
    setGuardianFirstName("");
    setGuardianMiddleName("");
    setGuardianExtension("");
  };

  return (
    <View style={styles.outerContainer}>
      <TopBar onUserIconPress={handleUserIconPress} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          <View style={styles.sectionDivider} />

          <View style={styles.formRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.label}>Last Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={studentLastName}
                onChangeText={setStudentLastName}
              />
              <Text style={styles.label}>First Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={studentFirstName}
                onChangeText={setStudentFirstName}
              />
              <Text style={styles.label}>Middle Name</Text>
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

              <Text style={styles.label}>Gender*</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  style={styles.picker}
                  onValueChange={(itemValue) => setGender(itemValue)}
                >
                  <Picker.Item label="" value="" />
                  <Picker.Item label="MALE" value="MALE" />
                  <Picker.Item label="FEMALE" value="FEMALE" />
                </Picker>
              </View>

              <Text style={styles.label}>Birth Date*</Text>
              <TouchableOpacity
                onPress={handleShowDatePicker}
                style={[
                  globalStyles.baseInputSmall,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  },
                ]}
              >
                <Text style={styles.datePickerText}>
                  {birthDate.toDateString() === new Date().toDateString()
                    ? "Select Date"
                    : birthDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <DatePicker
                visible={showDatePicker}
                onClose={handleCloseDatePicker}
                currentDate={birthDate}
                onDateSelect={handleDateSelected}
              />
            </View>

            <View style={styles.fieldColumn}>
              <Text style={styles.label}>Address*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={address}
                onChangeText={setAddress}
              />
              <Text style={styles.label}>City*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={city}
                onChangeText={setCity}
              />
              <Text style={styles.label}>Province*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={province}
                onChangeText={setProvince}
              />
              <Text style={styles.label}>GRADE LEVEL*</Text>
              <View style={[styles.pickerContainer]}>
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
            </View>
          </View>
        </View>

        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Parents Information</Text>
          <View style={styles.sectionDivider} />

          <View style={styles.formRow}>
            <View style={styles.fieldGroup}>
              <Text style={styles.sectionSubtitle}>Mother</Text>
              <Text style={styles.label}>Last Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={motherLastName}
                onChangeText={setMotherLastName}
              />
              <Text style={styles.label}>First Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={motherFirstName}
                onChangeText={setMotherFirstName}
              />
              <Text style={styles.label}>Middle Name</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={motherMiddleName}
                onChangeText={setMotherMiddleName}
              />
              <Text style={styles.label}>Name Extension</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={motherExtension}
                onChangeText={setMotherExtension}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.sectionSubtitle}>Father</Text>
              <Text style={styles.label}>Last Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={fatherLastName}
                onChangeText={setFatherLastName}
              />
              <Text style={styles.label}>First Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={fatherFirstName}
                onChangeText={setFatherFirstName}
              />
              <Text style={styles.label}>Middle Name</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={fatherMiddleName}
                onChangeText={setFatherMiddleName}
              />
              <Text style={styles.label}>Name Extension</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={fatherExtension}
                onChangeText={setFatherExtension}
              />
            </View>
          </View>
        </View>

        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Guardian</Text>
          <View style={styles.sectionDivider} />

          <View style={styles.formRow}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Last Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={guardianLastName}
                onChangeText={setGuardianLastName}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>First Name*</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={guardianFirstName}
                onChangeText={setGuardianFirstName}
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Middle Name</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={guardianMiddleName}
                onChangeText={setGuardianMiddleName}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Name Extension</Text>
              <TextInput
                style={globalStyles.baseInput}
                value={guardianExtension}
                onChangeText={setGuardianExtension}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTER STUDENT</Text>
      </TouchableOpacity>

      <ErrorModal
        visible={isErrorModalVisible}
        message="Please fill all required fields."
        onClose={() => setIsErrorModalVisible(false)}
      />

      <SuccessModal
        visible={isSuccessModalVisible}
        studentName={registeredStudentName}
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
    backgroundColor: "#D9D9D9",
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#222222",
    borderBottomWidth: 1,
    borderBottomColor: "#444444",
  },
  pageLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  pageTitle: {
    color: "#D9D9D9",
    fontSize: 18,
    fontWeight: "bold",
  },
  pageSubtitle: {
    color: "#D9D9D9",
    fontSize: 12,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionWrapper: {
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#222222",
    marginBottom: 20,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  fieldGroup: {
    width: "48%",
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
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  picker: {
    width: "20%",
    height: "100%",
    backgroundColor: "transparent",
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    marginTop: 10,
  },
  registerButton: {
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
  datePickerText: {
    width: "40%",
    color: "#000000",
    fontSize: 16,
    textAlign: "left",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 15 : 0,
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

export default RegRegisterStudent;
