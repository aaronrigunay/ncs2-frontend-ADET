import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
const logoSmall = require("../../../assets/logo.png");

const GrdClassRecord = () => {
  const [students, setStudents] = useState([
    { id: "1", name: "ADRIANO, MARK P.", present: false },
    { id: "2", name: "ANTHONY, CARMELO K.", present: true },
  ]);

  const handleCheckboxChange = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const handleMonthPress = () => {
    alert("Month selection functionality (Not Implemented)");
  };

  const handleNavigateForward = () => {
    alert("Navigate forward (Not Implemented)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoSmall} style={styles.logo} />
        <Text style={styles.headerTitle}>ATTENDANCE</Text>
      </View>

      <View style={styles.attendanceSection}>
        <View style={styles.attendanceHeader}>
          <TouchableOpacity style={styles.tabClassRecordActive}>
            <Text style={styles.tabText}>CLASS RECORD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabAttendanceRecordInactive}>
            <Text style={styles.tabText}>ATTENDANCE RECORD</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.studentListContainer}>
          {students.map((student) => (
            <View key={student.id} style={styles.studentItem}>
              <Text style={styles.studentName}>{student.name}</Text>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => handleCheckboxChange(student.id)}
              >
                {student.present ? (
                  <Text style={styles.checkedBox}>✓</Text>
                ) : (
                  <View style={styles.uncheckedBox} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.monthButton} onPress={handleMonthPress}>
        <Text style={styles.monthButtonText}>MONTH</Text>
        <Text style={styles.monthButtonArrow}>▲</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navigateButton}
        onPress={handleNavigateForward}
      >
        <Text style={styles.navigateButtonArrow}>➔</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    width: "85%",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
  attendanceSection: {
    width: "85%",
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
    overflow: "hidden",
    flex: 1,
    marginBottom: 20,
  },
  attendanceHeader: {
    flexDirection: "row",
    height: 50,
  },
  tabClassRecordActive: {
    flex: 1,
    backgroundColor: "#A0A0A0",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 5,
  },
  tabAttendanceRecordInactive: {
    flex: 1,
    backgroundColor: "#808080",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  studentListContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  studentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#B0B0B0",
  },
  studentName: {
    fontSize: 18,
    color: "#000000",
  },
  checkboxContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
  },
  uncheckedBox: {
    width: "100%",
    height: "100%",
  },
  checkedBox: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  monthButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A0A0A0",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
    width: "85%",
    justifyContent: "center",
  },
  monthButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 10,
  },
  monthButtonArrow: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  navigateButton: {
    backgroundColor: "#A0A0A0",
    width: "85%",
    height: 60,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  navigateButtonArrow: {
    fontSize: 40,
    color: "#000000",
    transform: [{ rotate: "180deg" }],
  },
});

export default GrdClassRecord;
