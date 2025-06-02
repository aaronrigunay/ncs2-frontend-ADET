import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RegProfileView = () => {
  const username = "lisa.gabe";
  const fullName = "Gabe, Lisa Anne";

  const handleChangePassword = () => {
    alert("Navigating to Change Password screen...");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}></View>
        <Text style={styles.headerTitle}>NCS II : DMS</Text>
      </View>

      <Text style={styles.mainTitle}>Profile Information</Text>
      <View style={styles.divider} />

      <View style={styles.profileContent}>
        <View style={styles.profileIconPlaceholder}></View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Username :</Text>
          <Text style={styles.value}>{username}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name :</Text>
          <Text style={styles.value}>{fullName}</Text>
        </View>
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
  profileContent: {
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
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 5,
  },
  value: {
    fontSize: 16,
    color: "#000000",
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

export default RegProfileView;
