import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AdviserSections from "../../components/grade/grd-sections-page";

export default function SectionsScreen() {
  return (
    <View style={styles.container}>
      <AdviserSections />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: { fontSize: 24, fontWeight: "bold" },
});
