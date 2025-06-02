import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import TopBar from "../top-bar";
import globalStyles, { Colors } from "../../constants/global-styles";

const VerifiedSuccessModal = ({ visible, onClose }) => {
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
            <Text style={modalStyles.modalTitle}>Verification Successful!</Text>
            <Text style={modalStyles.modalText}>
              The information has been successfully verified.
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

const approveRequest = async () => {
  router.push("/approve-request");
};

const denyRequest = async () => {
  router.push("/deny-request");
};

const handleUserIconPress = () => {
  console.log("User icon pressed! (Not Implemented)");
};

const ViewRequestScreen = () => {
  const params = useLocalSearchParams();
  const {
    requestId: paramRequestId,
    requestedFile: paramRequestedFile,
    studentName: paramStudentName,
    lrn: paramLrn,
    gradeSection: paramGradeSection,
    schoolYear: paramSchoolYear,
    requestor: paramRequestor,
    email: paramEmail,
    contact: paramContact,
    status: paramStatus,
    dateTime: paramDateTime,
  } = params;

  const [requestId, setRequestId] = useState("");
  const [requestedFile, setRequestedFile] = useState("");
  const [studentName, setStudentName] = useState("");
  const [lrn, setLrn] = useState("");
  const [gradeSection, setGradeSection] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [requestor, setRequestor] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const [dateTime, setDateTime] = useState("");

  const [isVerifiedSuccessModalVisible, setIsVerifiedSuccessModalVisible] =
    useState(false);

  useEffect(() => {
    if (paramRequestId) setRequestId(paramRequestId);
    if (paramRequestedFile) setRequestedFile(paramRequestedFile);
    if (paramStudentName) setStudentName(paramStudentName);
    if (paramLrn) setLrn(paramLrn);
    if (paramGradeSection) setGradeSection(paramGradeSection);
    if (paramSchoolYear) setSchoolYear(paramSchoolYear);
    if (paramRequestor) setRequestor(paramRequestor);
    if (paramEmail) setEmail(paramEmail);
    if (paramContact) setContact(paramContact);
    if (paramStatus) setStatus(paramStatus);
    if (paramDateTime) setDateTime(paramDateTime);
  }, [
    paramRequestId,
    paramRequestedFile,
    paramStudentName,
    paramLrn,
    paramGradeSection,
    paramSchoolYear,
    paramRequestor,
    paramEmail,
    paramContact,
    paramStatus,
    paramDateTime,
  ]);

  const handleCheckPress = () => {
    setIsVerifiedSuccessModalVisible(true);
  };

  const getStatusPillStyle = (currentStatus) => {
    switch (currentStatus) {
      case "PENDING":
        return globalStyles.pendingStatus;
      case "DENIED":
        return globalStyles.deniedStatus;
      case "APPROVED":
        return globalStyles.approvedStatus;
      default:
        return {};
    }
  };

  return (
    <View style={globalStyles.container}>
      <TopBar onUserIconPress={handleUserIconPress} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>View Request</Text>
          <View style={styles.headerDivider} />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Request ID: </Text>
          <Text style={styles.infoValue}>{requestId}</Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Requested File: </Text>
          <Text style={styles.infoValue}>{requestedFile}</Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Student Name: </Text>
          <Text style={styles.infoValue}>{studentName}</Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>LRN: </Text>
          <Text style={styles.infoValue}>{lrn}</Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Grade & Section: </Text>
          <Text style={styles.infoValue}>{gradeSection}</Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>School Year: </Text>
          <Text style={styles.infoValue}>{schoolYear}</Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Requestor: </Text>
          <Text style={styles.infoValue}>{requestor}</Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email: </Text>
          <Text style={styles.infoValue}>{email}</Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone: </Text>
          <Text style={styles.infoValue}>{contact}</Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status: </Text>
          <Text style={[globalStyles.statusPill, getStatusPillStyle(status)]}>
            {status}
          </Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date & Time Requested: </Text>
          <Text style={styles.infoValue}>{dateTime}</Text>
        </View>
        <View style={styles.rowDivider} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.checkButton}
            onPress={handleCheckPress}
          >
            <Text style={styles.buttonText}>CHECK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.approveButton}
            onPress={approveRequest}
          >
            <Text style={globalStyles.baseButtonText}>APPROVE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.denyButton} onPress={denyRequest}>
            <Text style={globalStyles.baseButtonText}>DENY</Text>
          </TouchableOpacity>
        </View>
      </View>

      <VerifiedSuccessModal
        visible={isVerifiedSuccessModalVisible}
        onClose={() => setIsVerifiedSuccessModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  headerDivider: {
    height: 2,
    backgroundColor: "#AAAAAA",
    width: "100%",
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
  },
  infoValue: {
    fontSize: 16,
    color: "#000000",
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  statusPending: {
    backgroundColor: "#F0D15F",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: "bold",
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "auto",
    marginBottom: 20,
  },
  checkButton: {
    width: "10%",
    backgroundColor: "transparent",
    borderColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 10,
  },
  approveButton: {
    width: "10%",
    backgroundColor: Colors.buttonGreen,
    borderColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  denyButton: {
    width: "10%",
    backgroundColor: Colors.buttonRed,
    borderColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#222222",
    fontSize: 18,
    fontWeight: "normal",
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

export default ViewRequestScreen;
