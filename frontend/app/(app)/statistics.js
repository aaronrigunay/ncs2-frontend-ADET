import React from "react";
import { View, Text, StyleSheet } from "react-native";

import StsStatisticsPage from "../../components/statistics/sts-statistics-page";
import GrdClassRec from "../../components/grade/grd-class-rec-page";
import GrdAttendRec from "../../components/grade/grd-attnd-rec-page";

export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Statistics Screen Content</Text> */}
      <StsStatisticsPage />
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
