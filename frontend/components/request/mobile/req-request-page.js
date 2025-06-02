import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/auth-context";

const logoSmall = require("../../../assets/logo.png");

const ReqRequestPage = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const [formType, setFormType] = useState("CHOOSE FORM");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [nameExtension, setNameExtension] = useState("");
  const [lrn, setLrn] = useState("");

  const [requestorLastName, setRequestorLastName] = useState("");
  const [requestorFirstName, setRequestorFirstName] = useState("");
  const [requestorMiddleName, setRequestorMiddleName] = useState("");
  const [requestorNameExtension, setRequestorNameExtension] = useState("");
  const [requestorEmail, setRequestorEmail] = useState("");
  const [requestorPhone, setRequestorPhone] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const handleSendRequest = () => {
    console.log("Send Request button pressed!");
    setModalVisible(true);
  };

  const handleLogout = async () => {
    await signOut();
    console.log("Logging out and navigating to sign-in screen");
    router.replace("/sign-in");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoSmall} style={styles.logo} />
        <Text style={styles.headerTitle}>REQUESTS</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>
          TYPE OF FORM: <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formType}
            onValueChange={(itemValue) => setFormType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="SCHOOL FORM 2" value="SCHOOL FORM 2" />
            <Picker.Item label="SCHOOL FORM 9" value="SCHOOL FORM 9" />
            <Picker.Item label="SCHOOL FORM 10" value="SCHOOL FORM 10" />
          </Picker>
        </View>

        <Text style={styles.label}>STUDENT INFORMATION</Text>
        <Text style={styles.label}>
          LAST NAME: <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
        />

        <Text style={styles.label}>
          FIRST NAME: <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
        />

        <Text style={styles.label}>MIDDLE NAME:</Text>
        <TextInput
          style={styles.input}
          value={middleName}
          onChangeText={setMiddleName}
          placeholder="Enter Middle Name"
        />

        <Text style={styles.label}>NAME EXTENSION:</Text>
        <TextInput
          style={styles.input}
          value={nameExtension}
          onChangeText={setNameExtension}
          placeholder="e.g., Jr., Sr., III"
        />

        <Text style={styles.label}>
          LRN: <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={lrn}
          onChangeText={setLrn}
          placeholder="Enter LRN"
          keyboardType="numeric"
        />

        <View style={styles.divider} />

        <Text style={styles.label}>REQUESTOR INFORMATION</Text>
        <Text style={styles.label}>
          LAST NAME: <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={requestorLastName}
          onChangeText={setRequestorLastName}
          placeholder="Enter Requestor's Last Name"
        />

        <Text style={styles.label}>
          FIRST NAME: <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={requestorFirstName}
          onChangeText={setRequestorFirstName}
          placeholder="Enter Requestor's First Name"
        />

        <Text style={styles.label}>MIDDLE NAME:</Text>
        <TextInput
          style={styles.input}
          value={requestorMiddleName}
          onChangeText={setRequestorMiddleName}
          placeholder="Enter Requestor's Middle Name"
        />

        <Text style={styles.label}>NAME EXTENSION:</Text>
        <TextInput
          style={styles.input}
          value={requestorNameExtension}
          onChangeText={setRequestorNameExtension}
          placeholder="e.g., Jr., Sr., III"
        />

        <Text style={styles.label}>
          EMAIL: <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={requestorEmail}
          onChangeText={setRequestorEmail}
          placeholder="Enter Requestor's Email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>
          PHONE NUMBER: <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={requestorPhone}
          onChangeText={setRequestorPhone}
          placeholder="Enter Requestor's Phone Number"
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={styles.sendRequestButton}
          onPress={handleSendRequest}
        >
          <Text style={styles.sendRequestButtonText}>SEND REQUEST</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={styles.centeredView}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Request Sent!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.navigate("student-list")}
        >
          <Ionicons name="people-outline" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.navigate("adviser-list")}
        >
          <Ionicons name="person-outline" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.activeNavButtonBackground]}
          onPress={() => {}}
        >
          <Ionicons name="document-text-outline" size={30} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 15,
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 30,
  },
  sendRequestButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  sendRequestButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomNavBar: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    backgroundColor: "#A0A0A0",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  activeNavButtonBackground: {
    backgroundColor: "#F0F0F0",
    borderRadius: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    minWidth: 80,
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ReqRequestPage;
