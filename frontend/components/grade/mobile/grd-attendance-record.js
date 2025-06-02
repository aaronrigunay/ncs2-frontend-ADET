import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import DatePicker from "../../date-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/auth-context";

const logoSmall = require("../../../assets/logo.png");

const GrdAttendanceRecord = ({ isLoggedIn }) => {
  const router = useRouter();
  const { signOut } = useAuth();

  const [students, setStudents] = useState([
    { id: "1", name: "ADRIANO, LEA P.", status: "P" },
    { id: "2", name: "HOUSE, JEFF I.", status: "A" },
    { id: "3", name: "SMITH, JOHN D.", status: "L" },
    { id: "4", name: "DOE, JANE K.", status: "E" },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const ATTENDANCE_STATUSES = [
    { label: "P", value: "P" },
    { label: "A", value: "A" },
    { label: "L", value: "L" },
    { label: "E", value: "E" },
  ];

  useEffect(() => {
    console.log("isLoggedIn changed:", isLoggedIn);
    if (isLoggedIn) {
      console.log("Closing date pickers due to login.");
      setShowDatePicker(false);
    }
  }, [isLoggedIn]);

  const handleStatusChange = (id, newStatus) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  const handleShowDatePicker = () => {
    console.log("Showing DatePicker.");
    setShowDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    console.log("Hiding DatePicker.");
    setShowDatePicker(false);
  };

  const handleDateSelected = (date) => {
    console.log("Date selected:", date);
    setSelectedDate(date);
    handleCloseDatePicker();
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleLogout = async () => {
    await signOut();
    console.log("Logging out and navigating to sign-in screen");
    router.replace("/sign-in");
  };

  const handleSaveAttendance = () => {
    console.log("Saving attendance:", students, "for date:", selectedDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoSmall} style={styles.logo} />
        <Text style={styles.headerTitle}>ATTENDANCE</Text>
      </View>

      <View style={styles.attendanceSection}>
        <View style={styles.attendanceHeader}>
          <TouchableOpacity style={styles.tabLeft}>
            <Text style={styles.tabText}>ATTENDANCE RECORD</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabRight}
            onPress={handleShowDatePicker}
          >
            <Text style={styles.tabText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.studentListContainer}>
          {students.map((student) => (
            <View key={student.id} style={styles.studentItem}>
              <Text style={styles.studentName}>{student.name}</Text>
              <View style={styles.statusButtonsContainer}>
                {ATTENDANCE_STATUSES.map((statusOption) => (
                  <TouchableOpacity
                    key={statusOption.value}
                    style={[
                      styles.statusButton,
                      student.status === statusOption.value &&
                        styles.statusButtonSelected,
                    ]}
                    onPress={() =>
                      handleStatusChange(student.id, statusOption.value)
                    }
                  >
                    <Text
                      style={[
                        styles.statusButtonText,
                        student.status === statusOption.value &&
                          styles.statusButtonTextSelected,
                      ]}
                    >
                      {statusOption.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveAttendance}
      >
        <Text style={styles.saveButtonText}>SAVE ATTENDANCE</Text>
      </TouchableOpacity>

      <DatePicker
        visible={showDatePicker}
        mode="date"
        onDateSelect={handleDateSelected}
        onClose={handleCloseDatePicker}
        currentDate={selectedDate}
      />

      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navButtonLeft} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="#000000" />
        </TouchableOpacity>
        <View style={styles.navButtonSpacer} />
      </View>
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
  tabLeft: {
    flex: 1,
    backgroundColor: "#A0A0A0",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#B0B0B0",
  },
  tabRight: {
    flex: 0.7,
    backgroundColor: "#909090",
    justifyContent: "center",
    alignItems: "center",
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
  statusButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 150,
  },
  statusButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#777777",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    backgroundColor: "#E0E0E0",
  },
  statusButtonSelected: {
    backgroundColor: "#68A55F", // Updated green color
    borderColor: "#2563EB",
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  statusButtonTextSelected: {
    color: "#FFFFFF",
  },
  saveButton: {
    backgroundColor: "#68A55F", // Updated green color
    width: "85%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  bottomNavBar: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    backgroundColor: "#A0A0A0",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  navButtonLeft: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 10,
  },
  navButtonSpacer: {
    flex: 1,
  },
});

export default GrdAttendanceRecord;
