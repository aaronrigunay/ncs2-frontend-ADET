import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";

const Colors = {
  textBorder: "#222222",
  white: "#ffffff",
  darkGrey: "#222222",
  lightGreyBorder: "#cccccc",
  mediumGrey: "#ACB1AB",
};

const logoSmall = require("../assets/logo.png");

const viewProfile = async () => {
  router.push("/view-profile");
};

const TopBar = ({ searchText, onSearchTextChange }) => {
  const pathname = usePathname();

  const hideSearchPages = [
    "/register-student",
    "/create-section",
    "/view-request",
    "/view-student",
    "/register-adviser",
    "/new-request",
    "/approve-request",
    "/deny-request",
    "/statistics",
    "/edit-student",
    "/best-students",
    "/worst-students",
    "/improving-students",
    "/struggling-students",
  ];

  const shouldHideSearchBar = hideSearchPages.includes(pathname);

  return (
    <View style={styles.topBar}>
      <View style={styles.logoContainer}>
        <Image source={logoSmall} style={styles.logo} />
        <View>
          <Text style={styles.headerTitle}>NCS II : IMS</Text>
          <Text style={styles.headerSubtitle}>
            INFORMATION MANAGEMENT SYSTEM
          </Text>
        </View>
      </View>
      <View style={styles.searchAndUser}>
        {!shouldHideSearchBar && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholderTextColor={Colors.darkGrey}
              value={searchText}
              onChangeText={onSearchTextChange}
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Ionicons name="search" size={30} color={Colors.darkGrey} />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.userIcon} onPress={viewProfile}>
          <Ionicons
            name="person-circle-outline"
            size={50}
            color={Colors.darkGrey}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "transparent",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textBorder,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.textBorder,
  },
  searchAndUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mediumGrey,
    borderRadius: 4,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    width: 500,
    fontSize: 20,
    backgroundColor: "#ACB1AB",
    paddingLeft: 10,
  },
  searchIcon: {
    padding: 2,
  },
  userIcon: {
    padding: 2,
  },
});

export default TopBar;
