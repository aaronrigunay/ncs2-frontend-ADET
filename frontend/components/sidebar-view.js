import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/global-styles";

import { router } from "expo-router";

const logoSmall = require("../assets/logo.png");

const handleGoBack = () => {
  router.back();
};

const SidebarView = ({ children }) => {
  return (
    <View style={styles.sidebarContainer}>
      <View style={styles.contentPlaceholder}>{children}</View>

      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={"#222222"}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>RETURN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 220,
    backgroundColor: "#ACB1AB",
    paddingVertical: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  topSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
    paddingTop: 10,
  },
  sidebarLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  appName: {
    color: "#222222",
    fontSize: 20,
    fontWeight: "bold",
  },
  contentPlaceholder: {
    flex: 1,
    width: "100%",
  },
  backButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "transparent",
    width: "90%",
    justifyContent: "center",
  },
  backIcon: {
    marginRight: 15,
  },
  backText: {
    color: "#222222",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SidebarView;
