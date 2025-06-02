import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/auth-context";

const logoSmall = require("../../../assets/logo.png");
import { DUMMY_STUDENTS } from "../../../dummy-data/dummy-register";

const RegStudentsList = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const [selectedGrade, setSelectedGrade] = useState("ALL GRADE LEVELS"); // Initialized to "ALL GRADE LEVELS"
  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState(DUMMY_STUDENTS);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);

  useEffect(() => {
    const uniqueGrades = [
      "ALL GRADE LEVELS", // Add "ALL GRADE LEVELS" as the first option
      ...new Set(DUMMY_STUDENTS.map((student) => student.gradeLevel)),
    ].sort((a, b) => {
      // Custom sort for grades
      if (a === "ALL GRADE LEVELS") return -1;
      if (b === "ALL GRADE LEVELS") return 1;
      // Extract grade numbers for numerical comparison
      const gradeA = parseInt(a.replace("GRADE ", ""));
      const gradeB = parseInt(b.replace("GRADE ", ""));
      return gradeA - gradeB;
    });
    setGradeLevels(uniqueGrades);

    // No need to check if selectedGrade is in uniqueGrades, as it's set to "ALL GRADE LEVELS" initially
    // and "ALL GRADE LEVELS" is guaranteed to be in uniqueGrades.

    filterStudents(selectedGrade, searchText);
  }, [students]);

  useEffect(() => {
    filterStudents(selectedGrade, searchText);
  }, [selectedGrade, searchText]);

  const filterStudents = (grade, search) => {
    const lowerCaseSearch = search.toLowerCase();
    const filtered = DUMMY_STUDENTS.filter(
      (student) =>
        (grade === "ALL GRADE LEVELS" || student.gradeLevel === grade) && // Handle "ALL GRADE LEVELS"
        student.fullName.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredStudents(filtered);
  };

  const handleSearch = () => {
    filterStudents(selectedGrade, searchText);
  };

  const handleStudentPress = (student) => {
    const studentString = JSON.stringify(student);
    router.push({
      pathname: "view-student",
      params: { student: studentString },
    });
  };

  const handleLogout = async () => {
    await signOut();
    console.log("Logging out and navigating to sign-in screen");
    router.replace("/sign-in");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoSmall} style={styles.logo} />
        <Text style={styles.headerTitle}>STUDENTS</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder=""
          value={searchText}
          onChangeText={setSearchText}
          onEndEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Image
            source={{
              uri: "https://cdn.icon-icons.com/icons2/1674/PNG/512/search_110998.png",
            }}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.gradePickerContainer}>
        <Picker
          selectedValue={selectedGrade}
          onValueChange={(itemValue) => setSelectedGrade(itemValue)}
          style={styles.gradePicker}
          itemStyle={styles.gradePickerItem}
        >
          {gradeLevels.map((grade) => (
            <Picker.Item key={grade} label={grade} value={grade} />
          ))}
        </Picker>
      </View>

      <View style={styles.studentListSection}>
        <View style={styles.studentListHeader}>
          <Text style={styles.listHeaderTextGrade}>GRADE</Text>
          <Text style={styles.listHeaderTextFullName}>FULL NAME</Text>
        </View>
        <ScrollView style={styles.studentList}>
          {filteredStudents.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={styles.studentItem}
              onPress={() => handleStudentPress(student)}
            >
              <Text style={styles.studentItemGrade}>
                {student.gradeLevel.replace("GRADE ", "")}
              </Text>
              <Text style={styles.studentItemName}>{student.fullName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.activeNavButtonBackground]}
          onPress={() => {}}
        >
          <Ionicons name="people-outline" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("adviser-list")}
        >
          <Ionicons name="person-outline" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("request-page")}
        >
          <Ionicons name="document-text-outline" size={30} color="#000000" />
        </TouchableOpacity>
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
    marginBottom: 20,
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
  searchContainer: {
    flexDirection: "row",
    width: "85%",
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000000",
  },
  searchButton: {
    padding: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: "#555555",
  },
  gradePickerContainer: {
    width: "85%",
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
    marginBottom: 20,
    overflow: "hidden",
  },
  gradePicker: {
    height: 50,
    width: "100%",
    color: "#000000",
  },
  gradePickerItem: {
    fontSize: 16,
  },
  studentListSection: {
    flex: 1,
    width: "85%",
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  studentListHeader: {
    flexDirection: "row",
    backgroundColor: "#A0A0A0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#B0B0B0",
  },
  listHeaderTextGrade: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    width: "30%",
  },
  listHeaderTextFullName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
  },
  studentList: {
    flex: 1,
  },
  studentItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#B0B0B0",
  },
  studentItemGrade: {
    fontSize: 16,
    color: "#000000",
    width: "30%",
  },
  studentItemName: {
    fontSize: 16,
    color: "#000000",
    flex: 1,
  },
  bottomNavBar: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    backgroundColor: "#A0A0A0",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  activeNavButtonBackground: {
    backgroundColor: "#F0F0F0",
    borderRadius: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default RegStudentsList;
