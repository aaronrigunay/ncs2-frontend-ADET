// app/_layout.jsx (or wherever your root layout is)
import React from "react";
import { Stack } from "expo-router";
import { useAuth } from "../../context/auth-context";
import { Text } from "react-native";
import { Redirect } from "expo-router";

export default function RootLayout() {
  const { user, isLoading } = useAuth();

  if (!user) {
    return (
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Redirect href="/sign-in" />{" "}
      </Stack>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="student-list" options={{ title: "Student List" }} />
      <Stack.Screen name="adviser-list" options={{ title: "Adviser List" }} />
      <Stack.Screen name="view-student" options={{ title: "View Student" }} />
      <Stack.Screen name="view-adviser" options={{ title: "View Adviser" }} />
      <Stack.Screen
        name="attendance-record"
        options={{ title: "Attendance Record" }}
      />
      <Stack.Screen name="request-page" options={{ title: "Request" }} />
    </Stack>
  );
}
