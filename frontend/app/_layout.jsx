import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { AuthProvider, useAuth } from "../context/auth-context";

function RootLayoutContent() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen
          name="(app)"
          options={{ headerShown: false }}
          key="app-stack"
        />
      ) : (
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
          key="auth-stack"
        />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <RootLayoutContent />
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#333",
//   },
// });
