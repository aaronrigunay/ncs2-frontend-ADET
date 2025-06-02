import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RequestMgmtPage from "../../../frontend/components/request/req-mgmt-page";
// import ViewRequestScreen from "../../../frontend/components/request/req-view-page";
import ViewRequestScreen2 from "../../../frontend/components/request/req-view-page-denied";
import ReqDenyPage from "../../../frontend/components/request/req-deny-page";
import ReqApprvPage from "../../../frontend/components/request/req-apprv-page";
import RequestFormPage from "../../../frontend/components/request/req-request-page";
import ViewProfilePage from "../../../frontend/components/view-profile-page";
import EditProfilePage from "../../../frontend/components/view-profile-page";
import ViewRequestScreen from "../../../frontend/components/request/mobile/req-request-page";
import ReqTitlePage from "../../../frontend/components/request/mobile/req-title-page";

export default function RequestsScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Requests Screen Content</Text> */}
      <RequestMgmtPage />
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
