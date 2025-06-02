import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

const logoSmall = require("../assets/logo.png");

const editProfile = async () => {
  router.push("/edit-profile");
};

const ViewProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoSmall} style={styles.logo} />
        <View>
          <Text style={styles.headerTitle}>NCS II: DMS</Text>
          <Text style={styles.headerSubtitle}>DATA MANAGEMENT SYSTEM</Text>
        </View>
      </View>

      <View style={styles.profileInfoSection}>
        <Text style={styles.profileInfoTitle}>Profile Information</Text>
        <View style={styles.titleUnderline} />

        <View style={styles.profileIconContainer}>
          <Image
            source={{
              uri: "https://via.placeholder.com/100/CCCCCC/000000?text=👤",
            }}
            style={styles.profileIcon}
          />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username:</Text>
          <Text style={styles.infoValue}>lisa.gabe</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Full Name:</Text>
          <Text style={styles.infoValue}>Gabe, Lisa Anne</Text>
        </View>

        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={editProfile}
        >
          <Text style={styles.changePasswordButtonText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </View>
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
  profileInfoSection: {
    width: "90%",
    alignItems: "center",
  },
  profileInfoTitle: {
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
  infoRow: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 20,
    color: "#000000",
  },
  changePasswordButton: {
    backgroundColor: "#66BB6A",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 30,
  },
  changePasswordButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default ViewProfilePage;
