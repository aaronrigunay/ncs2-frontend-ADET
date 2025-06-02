import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const logoSmall = require("../../../assets/logo.png");

const RegAdviserView = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [adviser, setAdviser] = useState(null);

  useEffect(() => {
    if (params?.adviser) {
      try {
        setAdviser(JSON.parse(params.adviser));
      } catch (error) {
        console.error("Failed to parse adviser JSON in RegAdviserView:", error);
        router.back();
      }
    } else {
      console.warn("No adviser parameter found in route params.");
    }
  }, [params?.adviser]);

  if (!adviser) {
    return (
      <View style={styles.container}>
        <Text>Loading adviser data or no adviser data found...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoSmall} style={styles.logo} />
        <Text style={styles.headerTitle}>ADVISERS</Text>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.label}>ADVISER NAME:</Text>
        <Text style={styles.value}>{adviser.fullName}</Text>
        <View style={styles.divider} />

        <Text style={styles.label}>GENDER:</Text>
        <Text style={styles.value}>{adviser.gender}</Text>
        <View style={styles.divider} />

        <Text style={styles.label}>DATE OF BIRTH</Text>
        <Text style={styles.value}>{adviser.dateOfBirth}</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.bottomNavBar}>
        <TouchableOpacity
          style={[styles.navButton, styles.activeNavButtonBackground]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back-outline" size={40} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    width: "85%",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
  contentSection: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 5,
  },
  value: {
    fontSize: 20,
    color: "#000000",
    marginBottom: 5,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#B0B0B0",
    marginVertical: 20,
  },
  bottomNavBar: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    backgroundColor: "#A0A0A0",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
  },
  navButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default RegAdviserView;
