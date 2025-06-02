import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GrdAdvisersPage from "../../../frontend/components/grade/grd-advisers-page";
import GrdAddAdviser from "../../../frontend/components/grade/grd-add-advisers";
import GrdStdntSection from "../../../frontend/components/grade/grd-stdnt-section";

export default function AdvisersScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Advisers Screen Content</Text> */}
      <GrdAdvisersPage />
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
