import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Picker,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import TopBar from "../top-bar";
const logoSmall = require("../../assets/logo.png");
import globalStyles, { Colors } from "../../constants/global-styles";
import { DUMMY_STUDENTS } from "../../dummy-data/dummy-register";

const StsStrugglingStats = () => {
  const [assessmentType, setAssessmentType] = useState("QUARTERLY ASSESMENT");
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  const strugglingStudents = DUMMY_STUDENTS.filter((student) =>
    [
      "LAGUNA, NATHANIEL KING",
      "ONG, KAIZER LEX",
      "PIMENTEL, CHYNNA LOUISE",
      "SALAZAR, ZACHARY JOHN",
      "SERRANO, MIGUEL ADRIAN",
      "TAGLE, KRYSTAL GAIL",
      "ESPIRITU, JOSHUA DALE",
      "BERMUDEZ, SOFIA DENISE",
      "DEL MUNDO, PIA ISABELLA",
      "PANGANIBAN, LUIS ANTOINE",
    ].includes(student.fullName)
  );

  const handleStudentNamePress = (student) => {
    console.log(`Struggling student name pressed: ${student.fullName}`);
    router.push({
      pathname: "/view-student",
      params: {
        studentId: student.id,
        studentName: student.fullName,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth,
        gradeLevel: student.gradeLevel,
      },
    });
  };

  const barHeights = ["65%", "60%", "50%", "30%", "30%"];

  return (
    <View style={globalStyles.container}>
      <TopBar
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onUserIconPress={handleUserIconPress}
      />
      <ScrollView style={styles.container}>
        <View style={styles.contentArea}>
          <View style={styles.pickerAlignRightContainer}>
            <View style={globalStyles.pickerContainer}>
              <Picker
                selectedValue={assessmentType}
                style={globalStyles.picker}
                onValueChange={(itemValue) => setAssessmentType(itemValue)}
              >
                <Picker.Item
                  label="QUARTERLY ASSESMENT"
                  value="QUARTERLY ASSESMENT"
                />
                <Picker.Item label="WRITTEN WORKS" value="WRITTEN WORKS" />
                <Picker.Item
                  label="PERFORMANCE TASKS"
                  value="PERFORMANCE TASKS"
                />
              </Picker>
            </View>
          </View>

          <View style={styles.improvingCard}>
            <Text style={styles.cardTitle}>Improving</Text>
            <View style={styles.cardDivider} />

            <View style={styles.cardContent}>
              <View style={styles.studentListColumn}>
                {strugglingStudents.map((student, index) => (
                  <TouchableOpacity
                    key={student.id}
                    onPress={() => handleStudentNamePress(student)}
                    style={styles.touchableStudentName}
                  >
                    <Text style={styles.studentListItem}>
                      {index + 1}. {student.fullName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.graphColumn}>
                <View style={styles.graphContainer}>
                  <View
                    style={[
                      styles.bar,
                      { height: barHeights[0], backgroundColor: "#FFD700" },
                    ]}
                  />
                  <View
                    style={[
                      styles.bar,
                      { height: barHeights[1], backgroundColor: "#FFD700" },
                    ]}
                  />
                  <View
                    style={[
                      styles.bar,
                      { height: barHeights[2], backgroundColor: "#A7333F" },
                    ]}
                  />
                  <View
                    style={[
                      styles.bar,
                      { height: barHeights[3], backgroundColor: "#A7333F" },
                    ]}
                  />
                  <View
                    style={[
                      styles.bar,
                      { height: barHeights[4], backgroundColor: "#A7333F" },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#222222",
    borderBottomWidth: 1,
    borderBottomColor: "#444444",
  },
  pageLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  pageSubtitle: {
    color: "#D9D9D9",
    fontSize: 12,
  },
  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F8F8",
    paddingTop: 30,
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "#D0D0D0",
    borderRadius: 25,
    marginRight: 10,
  },
  appHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
  },
  searchIconPlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: "#D0D0D0",
    borderRadius: 15,
    marginRight: 10,
  },
  profileIconPlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: "#D0D0D0",
    borderRadius: 15,
  },
  contentArea: {
    padding: 20,
  },
  pickerAlignRightContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  assessmentPickerContainer: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 5,
    overflow: "hidden",
    width: 200,
    height: 40,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  assessmentPicker: {
    height: 40,
    width: "100%",
    color: "#000000",
  },
  improvingCard: {
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#AAAAAA",
    width: "100%",
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  studentListColumn: {
    width: "45%",
    paddingRight: 10,
  },
  studentListItem: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 8,
  },
  touchableStudentName: {
    paddingVertical: 2,
  },
  graphColumn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  graphContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  bar: {
    width: "15%",
    borderRadius: 2,
    marginHorizontal: 2,
  },
});

export default StsStrugglingStats;
