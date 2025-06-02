import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GrdSectionPage from "../../components/grade/grd-sections-page";
import GrdAdviserSections from "../../components/grade/grd-adviser-sections";
import GrdSectionCreate from "../../components/grade/grd-section-create";
import GrdSectionView from "../../components/grade/grd-section-view";
// import GrdAttendanceRecord from "../../components/grade/mobile/grd-attendance-record";
// import GrdClassRecord from "../../components/grade/mobile/grd-class-record";

export default function SectionsScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Sections Screen Content</Text> */}
      <GrdAdviserSections />
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
