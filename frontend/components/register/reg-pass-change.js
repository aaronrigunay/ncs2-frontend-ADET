import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const RegPassChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert(
      `Password change requested for:\nCurrent Password: ${currentPassword}\nNew Password: ${newPassword}`
    );
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}></View>
        <Text style={styles.headerTitle}>NCS II : DMS</Text>
      </View>

      <Text style={styles.mainTitle}>Change Password</Text>
      <View style={styles.divider} />

      <View style={styles.formContent}>
        <View style={styles.profileIconPlaceholder}></View>

        <Text style={styles.label}>Current Password :</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder=""
          placeholderTextColor="#d1d5db"
        />

        <Text style={styles.label}>New Password :</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder=""
          placeholderTextColor="#d1d5db"
        />

        <Text style={styles.label}>Confirm Password :</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder=""
          placeholderTextColor="#d1d5db"
        />

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F8F8",
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
  formContent: {
    alignItems: "center",
    padding: 20,
  },
  profileIconPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D0D0D0",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    width: "80%",
    textAlign: "left",
  },
  input: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    width: "80%",
  },
  button: {
    backgroundColor: "#69A75F",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegPassChange;
