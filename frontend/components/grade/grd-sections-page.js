import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import globalStyles, { Colors } from "../../constants/global-styles";
import TopBar from "../top-bar";
import { router } from "expo-router";

import { DUMMY_SECTIONS } from "../../dummy-data/dummy-sections";

const GrdSectionPage = () => {
  const [allSections] = useState(DUMMY_SECTIONS);

  const [searchText, setSearchText] = useState("");

  let sectionsToDisplay = allSections.filter((section) =>
    section.name.toLowerCase().includes(searchText.toLowerCase())
  );

  sectionsToDisplay.sort((a, b) => {
    if (a.isAdvisory && !b.isAdvisory) {
      return -1;
    }
    if (!a.isAdvisory && b.isAdvisory) {
      return 1;
    }
    return 0;
  });

  const handleSectionPress = (sectionId) => {
    router.push("/class-record");
  };

  return (
    <View style={globalStyles.container}>
      <TopBar
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onUserIconPress={() => {}}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionsContainerWrapper}>
          <View style={styles.sectionsContainer}>
            {sectionsToDisplay.map((section) => (
              <Pressable
                key={section.id}
                style={styles.sectionButton}
                onPress={() => handleSectionPress(section.id)}
              >
                {section.isAdvisory && (
                  <View style={styles.highlightTriangle} />
                )}
                <Text style={styles.sectionText}>{section.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 20,
    alignItems: "center",
  },
  sectionsContainerWrapper: {
    width: "100%",
    paddingHorizontal: 10,
  },
  sectionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  sectionButton: {
    minWidth: 320,
    maxWidth: 250,
    maxHeight: 150,
    flexShrink: 1,
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 5,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#6F2728",
  },
  sectionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D9D9D9",
    textAlign: "center",
  },
  highlightTriangle: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderLeftWidth: 40,
    borderLeftColor: "#FFB001",
    borderBottomWidth: 40,
    borderBottomColor: "transparent",
    borderRightWidth: 0,
    borderRightColor: "transparent",
  },
});

export default GrdSectionPage;
