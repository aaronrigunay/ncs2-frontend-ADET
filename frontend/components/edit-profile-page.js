import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

const logoSmall = require("../assets/logo.png");
import globalStyles, { Colors } from "../constants/global-styles";

const CustomErrorModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={globalStyles.centeredView}>
          <View style={globalStyles.modalView}>
            <Text style={globalStyles.modalTitle}>Error</Text>
            <Text style={globalStyles.modalText}>{message}</Text>
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={[globalStyles.modalButton, globalStyles.buttonConfirm]}
                onPress={onClose}
              >
                <Text style={globalStyles.buttonTextStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const CustomSuccessModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={globalStyles.centeredView}>
          <View style={globalStyles.modalView}>
            <Text style={globalStyles.modalTitle}>Success</Text>
            <Text style={globalStyles.modalText}>{message}</Text>
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={[globalStyles.modalButton, globalStyles.buttonConfirm]}
                onPress={onClose}
              >
                <Text style={globalStyles.buttonTextStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const EditProfilePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorModalMessage("New password and confirm password do not match.");
      setIsErrorModalVisible(true);
      return;
    }
    if (newPassword.length < 6) {
      setErrorModalMessage("New password must be at least 6 characters long.");
      setIsErrorModalVisible(true);
      return;
    }

    // Simulated password validation
    if (currentPassword === "incorrect_password") {
      setErrorModalMessage("Current password incorrect");
      setIsErrorModalVisible(true);
      return;
    }

    if (newPassword === currentPassword) {
      setErrorModalMessage("Your new password cannot be your old password");
      setIsErrorModalVisible(true);
      return;
    }

    setSuccessModalMessage("Password changed successfully");
    setIsSuccessModalVisible(true);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const closeErrorModal = () => {
    setIsErrorModalVisible(false);
    setErrorModalMessage("");
  };

  const closeSuccessModal = () => {
    setIsSuccessModalVisible(false);
    setSuccessModalMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoSmall} style={styles.logo} />
        <View>
          <Text style={styles.headerTitle}>NCS II: DMS</Text>
          <Text style={styles.headerSubtitle}>DATA MANAGEMENT SYSTEM</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.mainTitle}>Change Password</Text>
        <View style={styles.titleUnderline} />

        <View style={styles.profileIconContainer}>
          <Image
            source={{
              uri: "https://via.placeholder.com/100/CCCCCC/000000?text=👤",
            }}
            style={styles.profileIcon}
          />
        </View>

        <Text style={styles.inputLabel}>Current Password:</Text>
        <TextInput
          style={globalStyles.baseInputMedium}
          secureTextEntry={true}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <Text style={styles.inputLabel}>New Password:</Text>
        <TextInput
          style={globalStyles.baseInputMedium}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.inputLabel}>Confirm Password:</Text>
        <TextInput
          style={globalStyles.baseInputMedium}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.changePasswordButtonText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </View>

      <CustomErrorModal
        visible={isErrorModalVisible}
        message={errorModalMessage}
        onClose={closeErrorModal}
      />

      <CustomSuccessModal
        visible={isSuccessModalVisible}
        message={successModalMessage}
        onClose={closeSuccessModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    marginBottom: 30,
    paddingLeft: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#000000",
  },
  contentSection: {
    width: "90%",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  titleUnderline: {
    width: "100%",
    height: 1,
    backgroundColor: "#000000",
    marginBottom: 30,
  },
  profileIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  profileIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    tintColor: "#000000",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 5,
    left: 450,
  },
  changePasswordButton: {
    backgroundColor: "#66BB6A",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 40,
  },
  changePasswordButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default EditProfilePage;
