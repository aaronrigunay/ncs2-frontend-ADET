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
            <Text style={modalStyles.modalTitle}>Message Sent!</Text>
            <Text style={modalStyles.modalText}>
              The denial message has been successfully sent.
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

const DenyRequestScreen = () => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const recipientEmail = "fish3r-m4rt@gmail.com";
  const recipientName = "MARTIN FISHER";
  const requestedForm = "Student Form 10";

  const messageBody = `Greetings ${recipientName},\n\nThank you for contacting us regarding your request for a copy of the ${requestedForm}. We have carefully reviewed your request, but unfortunately, we are unable to provide you with a copy at this time.\n\nHere are some possible reasons why your request may have been denied:\n\nVerification Needed: We may require additional verification of your eligibility to receive this form.\nSecurity Concerns: The form may contain sensitive information that cannot be released publicly.\nConfidentiality: The form may pertain to a specific individual or situation, and releasing it could be a privacy violation.\n\nIf you believe one of these reasons may not apply to your situation, or if you have any additional information that might be helpful, please reply to this email and we will be happy to review your request again.\n\nSincerely,\n\nGUIDANCE COORDINATOR`;

  const handleSendDenial = () => {
    console.log("Sending denial message to:", recipientEmail);
    console.log("Message:", messageBody);
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
          <Text style={styles.sectionTitle}>Deny Request Message</Text>
          <View style={styles.sectionDivider} />

          <Text style={styles.label}>RECIPIENT :</Text>
          <Text style={styles.recipientEmail}>{recipientEmail}</Text>

          <Text style={styles.label}>MESSAGE :</Text>
          <Text style={styles.messageText}>{messageBody}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.sendButton} onPress={handleSendDenial}>
        <Text style={styles.buttonText}>SEND</Text>
      </TouchableOpacity>

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

export default DenyRequestScreen;
