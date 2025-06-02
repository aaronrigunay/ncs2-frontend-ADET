import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// Assuming the logo is in the same relative path as in the previous component
const logoSmall = require("../../../assets/logo.png");

const ReqTitlePage = ({ navigation }) => {
  // Added navigation prop for potential future use
  const handleMakeRequest = () => {
    console.log("Make Request button pressed!");
    // You would typically navigate to the request form page here
    // For example: navigation.navigate('RequestFormPage');
  };

  const handleQuit = () => {
    console.log("Quit button pressed!");
    // Implement quit/exit logic here, or navigate to a different screen
    // For example, if this is a standalone app, you might close it,
    // or if part of a larger app, navigate back to a home screen.
  };

  return (
    <View style={styles.container}>
      <Image source={logoSmall} style={styles.logo} />
      <Text style={styles.title}>NCS II DMS</Text>
      <Text style={styles.subtitle}>REQUEST</Text>

      <TouchableOpacity
        style={styles.makeRequestButton}
        onPress={handleMakeRequest}
      >
        <Text style={styles.buttonText}>MAKE REQUEST</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.quitButton} onPress={handleQuit}>
        <Text style={styles.buttonText}>QUIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150, // Adjust size as needed to match the image
    height: 150, // Adjust size as needed
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 50, // Space between title/subtitle and buttons
    textAlign: "center",
  },
  makeRequestButton: {
    backgroundColor: "#69A75F", // Green color consistent with previous component
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: "center",
    width: "80%", // Make button wider
    marginBottom: 15, // Space between buttons
  },
  quitButton: {
    backgroundColor: "#A7333F", // Red color consistent with previous component
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: "center",
    width: "80%", // Make button wider
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ReqTitlePage;
