import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import globalStyles, { Colors } from "../../constants/global-styles";

import TopBar from "../top-bar";

const bestStdnts = async () => {
  router.push("/best-students");
};

const worstStdnts = async () => {
  router.push("/worst-students");
};

const improvingStdnts = async () => {
  router.push("/improving-students");
};

const strugglingStdnts = async () => {
  router.push("/struggling-students");
};

const StsStatisticsPage = () => {
  const [gradeLevel, setGradeLevel] = useState("GRADE 6");
  const [searchText, setSearchText] = useState("");

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  return (
    <View style={globalStyles.container}>
      <TopBar
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onUserIconPress={handleUserIconPress}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>Statistics</Text>
          <View style={styles.gradeLevelFilterContainer}>
            <View style={globalStyles.pickerContainer}>
              <Picker
                selectedValue={gradeLevel}
                style={globalStyles.picker}
                onValueChange={(itemValue) => setGradeLevel(itemValue)}
              >
                <Picker.Item label="ENGLISH" value="ENGLISH" />
                <Picker.Item label="MATH" value="MATH" />
                <Picker.Item label="SCIENCE" value="SCIENCE" />
                <Picker.Item label="FILIPINO" value="FILIPINO" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.cardTitle}>Best Performing</Text>
            <TouchableOpacity
              style={styles.graphPlaceholder}
              onPress={bestStdnts}
            >
              <View
                style={[
                  styles.bar,
                  { height: "60%", backgroundColor: Colors.buttonGreen },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "70%", backgroundColor: Colors.buttonGreen },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "50%", backgroundColor: Colors.buttonGreen },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "50%", backgroundColor: Colors.buttonGreen },
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.cardTitle}>Worst Performing</Text>
            <TouchableOpacity
              style={styles.graphPlaceholder}
              onPress={worstStdnts}
            >
              <View
                style={[
                  styles.bar,
                  { height: "20%", backgroundColor: Colors.buttonRed },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "40%", backgroundColor: Colors.buttonRed },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "50%", backgroundColor: Colors.buttonRed },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "50%", backgroundColor: Colors.buttonRed },
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.cardTitle}>Improving Students</Text>
            <TouchableOpacity
              style={styles.graphPlaceholder}
              onPress={improvingStdnts}
            >
              <View
                style={[
                  styles.bar,
                  { height: "20%", backgroundColor: Colors.buttonRed },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "40%", backgroundColor: Colors.pendingStatus },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "50%", backgroundColor: Colors.pendingStatus },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "80%", backgroundColor: Colors.buttonGreen },
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.cardTitle}>Struggling Students</Text>
            <TouchableOpacity
              style={styles.graphPlaceholder}
              onPress={strugglingStdnts}
            >
              <View
                style={[
                  styles.bar,
                  { height: "50%", backgroundColor: Colors.pendingStatus },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "40%", backgroundColor: Colors.pendingStatus },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "30%", backgroundColor: Colors.buttonRed },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  { height: "20%", backgroundColor: Colors.buttonRed },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 20,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  divider: {
    height: 2,
    backgroundColor: "#AAAAAA",
    width: "100%",
    marginBottom: 20,
  },
  gradeLevelFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "600",
    color: Colors.black,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: Colors.white,
    width: 180,
    height: 45,
    justifyContent: "center",
  },
  gradeLevelPicker: {
    height: "100%",
    width: "100%",
    color: Colors.black,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: Colors.background,
    borderColor: "#aaa",
    borderWidth: 4,
    borderRadius: 4,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",

    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  graphPlaceholder: {
    width: "100%",
    height: 250,
    backgroundColor: Colors.background,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: Colors.mediumGrey,
  },
  bar: {
    width: "18%",
    borderRadius: 2,
    marginHorizontal: 2,
  },
});

export default StsStatisticsPage;
