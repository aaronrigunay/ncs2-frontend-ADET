import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/auth-context";

const HomeScreen = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading user data...</Text>
      </View>
    );
  }

  // handleSignOut is now in Sidebar.js
  // const handleSignOut = async () => {
  //   await signOut();
  //   router.replace("/(auth)/sign-in-screen");
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, {user ? user.username || user.name : "Guest"}!
      </Text>
      <Text>This is your main application dashboard.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6ffe6",
    padding: 20,
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
export default HomeScreen;
