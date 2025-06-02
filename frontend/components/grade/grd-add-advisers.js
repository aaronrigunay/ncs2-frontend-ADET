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
import DatePicker from "../date-picker";
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

const SuccessModal = ({ visible, defaultPassword, onClose }) => {
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
            <Text style={modalStyles.modalText}>Adviser registered.</Text>
            <Text style={modalStyles.modalText}>
              Default password:{" "}
              <Text style={modalStyles.passwordText}>{defaultPassword}</Text>
              {"\n"}Please write down the password before closing this message.
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

const RegRegisterAdviser = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [nameExtension, setNameExtension] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleRegister = () => {
    const requiredFields = [
      { value: lastName, label: "Last Name*" },
      { value: firstName, label: "First Name*" },
      { value: gender, label: "Gender*" },
      {
        value:
          birthDate.toDateString() !== new Date().toDateString()
            ? birthDate
            : "",
        label: "Birth Date*",
      },
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

    const newPassword = generateRandomPassword();
    setGeneratedPassword(newPassword);

    console.log({
      lastName,
      firstName,
      middleName,
      nameExtension,
      gender,
      birthDate: birthDate.toISOString().split("T")[0],
      defaultPassword: newPassword,
    });

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
    setLastName("");
    setFirstName("");
    setMiddleName("");
    setNameExtension("");
    setGender("");
    setBirthDate(new Date());
    setGeneratedPassword("");
  };

  return (
    <View style={styles.outerContainer}>
      <TopBar onUserIconPress={handleUserIconPress} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Adviser Information</Text>
          <View style={styles.sectionDivider} />

          <Text style={styles.label}>Last Name*</Text>
          <TextInput
            style={globalStyles.baseInputMedium}
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.label}>First Name*</Text>
          <TextInput
            style={globalStyles.baseInputMedium}
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>Middle Name</Text>
          <TextInput
            style={globalStyles.baseInputMedium}
            value={middleName}
            onChangeText={setMiddleName}
          />

          <Text style={styles.label}>Name Extension</Text>
          <TextInput
            style={globalStyles.baseInputMedium}
            value={nameExtension}
            onChangeText={setNameExtension}
          />

          <Text style={styles.label}>Gender*</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              style={styles.picker}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
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
      </ScrollView>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTER ADVISER</Text>
      </TouchableOpacity>

      <ErrorModal
        visible={isErrorModalVisible}
        message="Please fill out required fields."
        onClose={() => setIsErrorModalVisible(false)}
      />

      <SuccessModal
        visible={isSuccessModalVisible}
        defaultPassword={generatedPassword}
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: "#000000",
    marginBottom: 20,
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
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  picker: {
    width: "40%",
    height: "100%",
    color: Colors.textBorder,
    backgroundColor: "transparent",
    borderColor: Colors.textBorder,
  },
  datePickerText: {
    color: "#000000",
    fontSize: 16,
    textAlign: "left",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 15 : 0,
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
  passwordText: {
    fontWeight: "bold",
    color: Colors.primary,
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

export default RegRegisterAdviser;
