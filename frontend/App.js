import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import ReqRequestPage from "./components/request/mobile/req-request-page";
// import ReqTitlePage from "./components/request/mobile/req-title-page";
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("title");

  const goToRequestTitle = () => {
    setCurrentPage("requestTitle");
  };

  const goToRequestPage = () => {
    setCurrentPage("requestPage");
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
