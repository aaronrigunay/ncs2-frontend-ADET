import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ViewRequestScreen2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VIEW REQUEST</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>
          REQUESTED FILE:{" "}
          <Text style={styles.value}>Form 137 / Student Form 10</Text>
        </Text>

        <Text style={styles.label}>
          STUDENT NAME: <Text style={styles.value}>SCHWARZ, GREGORY</Text>
        </Text>

        <Text style={styles.label}>
          LRN: <Text style={styles.value}>579266789902</Text>
        </Text>

        <Text style={styles.label}>
          GRADE & SECTION: <Text style={styles.value}>6 - PLUTO</Text>
        </Text>

        <Text style={styles.label}>
          SCHOOL YEAR: <Text style={styles.value}>2013</Text>
        </Text>

        <View style={styles.separator} />

        <Text style={styles.label}>
          REQUESTOR: <Text style={styles.value}>SCHWARZ, NELLIE</Text>
        </Text>

        <Text style={styles.label}>
          EMAIL: <Text style={styles.value}>shwartz0422@mail.com</Text>
        </Text>

        <Text style={styles.label}>
          PHONE: <Text style={styles.value}>09999999993</Text>
        </Text>

        <Text style={styles.label}>
          STATUS:{" "}
          <Text style={[styles.value, styles.statusDenied]}>DENIED</Text>
        </Text>

        <Text style={styles.label}>
          DATE & TIME REQUESTED:{" "}
          <Text style={styles.value}>2019-06-17 14:37:32</Text>
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.checkButton}>
          <Text style={styles.buttonText}>CHECK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.approveButton}>
          <Text style={styles.buttonText}>APPROVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.denyButton}>
          <Text style={styles.buttonText}>DENY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
    textAlign: "left",
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#000000",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  checkButton: {
    backgroundColor: "#f0ad4e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: "#81c784",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  denyButton: {
    backgroundColor: "#e57373",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  statusDenied: {
    color: "#ff0000",
    fontWeight: "bold",
  },
});

export default ViewRequestScreen2;
