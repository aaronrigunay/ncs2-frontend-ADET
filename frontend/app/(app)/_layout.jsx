import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Sidebar from "../../components/sidebar";

export default function AppLayout() {
  return (
    <View style={styles.container}>
      <Sidebar />
      <View style={styles.contentArea}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="home-screen" options={{ title: "Dashboard" }} />
          <Stack.Screen
            name="register"
            options={{ title: "Student Management" }}
          />
          <Stack.Screen name="sections" options={{ title: "Sections" }} />
          <Stack.Screen name="advisers" options={{ title: "Advisers" }} />
          <Stack.Screen name="requests" options={{ title: "Requests" }} />
          <Stack.Screen name="statistics" options={{ title: "Statistics" }} />
          <Stack.Screen
            name="register-student"
            options={{ title: "Register Student" }}
          />
          <Stack.Screen
            name="class-sections"
            options={{ title: "Class Sections" }}
          />
          <Stack.Screen
            name="attendance"
            options={{ title: "Class Attendance" }}
          />
          <Stack.Screen
            name="class-record"
            options={{ title: "Class Record" }}
          />
        </Stack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F0F2F5",
  },
  contentArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // Removed loadingContainer styles as they are no longer used here
  // loadingContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  // },
});
