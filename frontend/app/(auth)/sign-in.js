import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  Dimensions,
  // Import  for screen size detection
} from "react-native";
import { useAuth } from "../../context/auth-context";
import { router } from "expo-router";

import globalStyles, { Colors } from "../../constants/global-styles";

const logo = require("../../assets/logo.png");

const isSmallScreen = () => {
  const { width } = Dimensions.get("window");
  return width < 768;
};

const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (!username || !password) {
      setModalMessage("Please enter both username and password.");
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(username, password);
      if (result.success) {
        console.log("Sign-in successful!");

        console.log("Platform.OS:", Platform.OS);
        const { width: windowWidth, height: windowHeight } =
          Dimensions.get("window");
        console.log("Window Width:", windowWidth);
        console.log("Window Height:", windowHeight);
        console.log("isSmallScreen() result:", isSmallScreen());
        if (
          Platform.OS === "ios" ||
          Platform.OS === "android" ||
          (Platform.OS === "web" && isSmallScreen())
        ) {
          if (result.user.userType === "ADMIN") {
            router.replace("/(mobile)/student-list");
          } else if (result.user.userType === "ADVISER") {
            router.replace("/(mobile)/attendance-record");
          } else {
            router.replace("/(mobile)/home");
          }
        } else {
          if (result.user.userType === "ADMIN") {
            router.replace("/(app)/students");
          } else if (result.user.userType === "ADVISER") {
            router.replace("/(app)/class-sections");
          } else {
            router.replace("/(app)/home");
          }
        }
      } else {
        setModalMessage("Invalid username or password.");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Sign In Error:", error);
      setModalMessage("An unexpected error occurred during sign in.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setModalMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Image source={logo} style={styles.signInLogo} />
        <Text style={styles.title}>NCS II Information Management System</Text>
        <View style={styles.horizontalLine} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          keyboardType="default"
          autoCapitalize="none"
          placeholderTextColor={Colors.placeholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={Colors.placeholder}
        />
        <TouchableOpacity
          style={styles.buttonRed}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.buttonText}>SIGN IN</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showErrorModal}
        onRequestClose={closeErrorModal}
      >
        <View style={globalStyles.centeredView}>
          <View style={globalStyles.modalView}>
            <Text style={globalStyles.modalTitle}>Sign In Error</Text>
            <Text style={globalStyles.modalText}>{modalMessage}</Text>
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={[globalStyles.modalButton, globalStyles.buttonConfirm]}
                onPress={closeErrorModal}
              >
                <Text style={globalStyles.buttonTextStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  signInLogo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "normal",
    marginBottom: 0,
    color: Colors.textBorder,
  },
  horizontalLine: {
    width: "100%",
    borderBottomColor: Colors.buttonRed,
    borderBottomWidth: 4,
    marginVertical: 30,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "transparent",
    borderRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.textBorder,
  },
  buttonRed: {
    width: "80%",
    height: 50,
    backgroundColor: Colors.buttonRed,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "normal",
  },
});

export default SignInScreen;
