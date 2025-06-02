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

const DUMMY_ADVISERS = [
  {
    id: "a1",
    fullName: "Maria Santos",
    gender: "Female",
    dateOfBirth: "1980-05-15",
    gradeLevel: "GRADE 1",
  },
  {
    id: "a2",
    fullName: "Jose Rizal",
    gender: "Male",
    dateOfBirth: "1978-02-28",
    gradeLevel: "GRADE 2",
  },
  {
    id: "a3",
    fullName: "Elena Garcia",
    gender: "Female",
    dateOfBirth: "1985-11-10",
    gradeLevel: "GRADE 3",
  },
  {
    id: "a4",
    fullName: "Pedro Cruz",
    gender: "Male",
    dateOfBirth: "1982-07-20",
    gradeLevel: "GRADE 4",
  },
  {
    id: "a5",
    fullName: "Sofia Reyes",
    gender: "Female",
    dateOfBirth: "1975-09-01",
    gradeLevel: "GRADE 5",
  },
  {
    id: "a6",
    fullName: "Daniel Dela Cruz",
    gender: "Male",
    dateOfBirth: "1988-04-03",
    gradeLevel: "GRADE 6",
  },
];

const RegAdvisersList = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const [selectedGrade, setSelectedGrade] = useState("ALL GRADE LEVELS"); // Initialized to "ALL GRADE LEVELS"
  const [searchText, setSearchText] = useState("");
  const [advisers, setAdvisers] = useState(DUMMY_ADVISERS);
  const [filteredAdvisers, setFilteredAdvisers] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);

  useEffect(() => {
    const uniqueGrades = [
      "ALL GRADE LEVELS", // Add "ALL GRADE LEVELS" as the first option
      ...new Set(DUMMY_ADVISERS.map((adviser) => adviser.gradeLevel)),
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

    filterAdvisers(selectedGrade, searchText);
  }, [advisers]);

  useEffect(() => {
    filterAdvisers(selectedGrade, searchText);
  }, [selectedGrade, searchText]);

  const filterAdvisers = (grade, search) => {
    const lowerCaseSearch = search.toLowerCase();
    const filtered = DUMMY_ADVISERS.filter(
      (adviser) =>
        (grade === "ALL GRADE LEVELS" || adviser.gradeLevel === grade) && // Handle "ALL GRADE LEVELS"
        adviser.fullName.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredAdvisers(filtered);
  };

  const handleSearch = () => {
    filterAdvisers(selectedGrade, searchText);
  };

  const handleAdviserPress = (adviser) => {
    const adviserString = JSON.stringify(adviser);
    router.push({
      pathname: "view-adviser",
      params: { adviser: adviserString },
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
        <Text style={styles.headerTitle}>ADVISERS</Text>
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

      <View style={styles.adviserListSection}>
        <View style={styles.adviserListHeader}>
          <Text style={styles.listHeaderTextGrade}>GRADE</Text>
          <Text style={styles.listHeaderTextFullName}>FULL NAME</Text>
        </View>
        <ScrollView style={styles.adviserList}>
          {filteredAdvisers.map((adviser) => (
            <TouchableOpacity
              key={adviser.id}
              style={styles.adviserItem}
              onPress={() => handleAdviserPress(adviser)}
            >
              <Text style={styles.adviserItemGrade}>
                {adviser.gradeLevel.replace("GRADE ", "")}
              </Text>
              <Text style={styles.adviserItemName}>{adviser.fullName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("student-list")}
        >
          <Ionicons name="people-outline" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.activeNavButtonBackground]}
          onPress={() => {}}
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
  adviserListSection: {
    flex: 1,
    width: "85%",
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  adviserListHeader: {
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
  adviserList: {
    flex: 1,
  },
  adviserItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#B0B0B0",
  },
  adviserItemGrade: {
    fontSize: 16,
    color: "#000000",
    width: "30%",
  },
  adviserItemName: {
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

export default RegAdvisersList;
