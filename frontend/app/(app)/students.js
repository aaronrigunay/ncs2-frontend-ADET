import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RegisterMgmtPage from "../../../frontend/components/register/reg-mgmt-page";
// import RegStudentsList from "../../../frontend/components/register/mobile/reg-students-list";
// import RegStudentView from "../../../frontend/components/register/mobile/reg-student-view";

export default function RequestsScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Requests Screen Content</Text> */}
      <RegisterMgmtPage />
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
