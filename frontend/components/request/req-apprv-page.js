import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import TopBar from "../top-bar";
import globalStyles, { Colors } from "../../constants/global-styles";
import DatePicker from "../date-picker";
import { router } from "expo-router";

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
            <Text style={modalStyles.modalTitle}>Approval Sent!</Text>
            <Text style={modalStyles.modalText}>
              The approval message has been successfully sent.
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

const ApproveRequestScreen = () => {
  const [claimDate, setClaimDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const recipientEmail = "fish3r-m4rt@gmail.com";
  const recipientName = "MARTIN FISHER";
  const requestedForm = "Form 137 / Student Form 10";
  const studentName = "CAMERON FISHER";

  const messageBody = `Greetings ${recipientName},\n\nThis message confirms your approval to receive a copy of the ${requestedForm} of the student ${studentName}. Please come visit the Guidance Coordinator's Office to pick up at your earliest convenience.`;

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateSelected = (date) => {
    setClaimDate(date);
  };

  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleSendApproval = () => {
    if (!claimDate) {
      setIsErrorModalVisible(true);
      return;
    }

    console.log("Sending approval message to:", recipientEmail);
    console.log("Claim Date:", claimDate.toLocaleDateString());
    setIsSuccessModalVisible(true);
  };

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
    router.push("/requests");
  };

  return (
    <View style={styles.outerContainer}>
      <TopBar onUserIconPress={handleUserIconPress} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Approve Request Message</Text>
          <View style={styles.sectionDivider} />

          <Text style={styles.label}>RECIPIENT:</Text>
          <Text style={styles.recipientEmail}>{recipientEmail}</Text>

          <Text style={styles.label}>MESSAGE:</Text>
          <Text style={styles.messageText}>{messageBody}</Text>

          <Text style={styles.label}>Claim your Copy by:</Text>
          <TouchableOpacity
            onPress={handleShowDatePicker}
            style={styles.datePickerTouchable}
          >
            <Text style={styles.datePickerText}>
              {claimDate ? claimDate.toLocaleDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DatePicker
              visible={showDatePicker}
              onClose={handleCloseDatePicker}
              currentDate={claimDate}
              onDateSelect={handleDateSelected}
            />
          )}

          <Text style={styles.messageText}>Sincerely,</Text>
          <Text style={styles.messageText}>GUIDANCE COORDINATOR</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.sendButton} onPress={handleSendApproval}>
        <Text style={styles.buttonText}>SEND</Text>
      </TouchableOpacity>

      <ErrorModal
        visible={isErrorModalVisible}
        message="Please select a claim date."
        onClose={() => setIsErrorModalVisible(false)}
      />

      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={handleSuccessModalClose}
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
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
    marginTop: 10,
  },
  recipientEmail: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 20,
  },
  messageText: {
    fontSize: 16,
    color: "#000000",
    lineHeight: 24,
    textAlign: "justify",
    marginBottom: 10,
  },
  datePickerTouchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.mediumGrey,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#222222",
    height: 50,
    width: 120,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: "#000000",
  },
  sendButton: {
    backgroundColor: "#69A75F",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 150,
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

export default ApproveRequestScreen;
