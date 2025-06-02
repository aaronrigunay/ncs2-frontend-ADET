import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
  Modal,
} from "react-native";

import { router } from "expo-router";

import globalStyles, { Colors } from "../../constants/global-styles";

import TopBar from "../top-bar";

const DUMMY_SECTIONS = [
  {
    id: "s1",
    gradeLevel: "GRADE 6",
    sectionName: "COPPER",
    adviser: "NUNES, RODRIGO AYESHA",
    studentsCount: "30/50",
    selected: false,
  },
  {
    id: "s2",
    gradeLevel: "GRADE 6",
    sectionName: "SILVER",
    adviser: "CABRAL, REZA ZUHRA",
    studentsCount: "25/45",
    selected: false,
  },
  {
    id: "s3",
    gradeLevel: "GRADE 6",
    sectionName: "GOLD",
    adviser: "DANIEL, LOURDES BIA",
    studentsCount: "32/50",
    selected: false,
  },
  {
    id: "s4",
    gradeLevel: "GRADE 6",
    sectionName: "DIAMOND",
    adviser: "SERRA, PRANAY RUBEN",
    studentsCount: "28/48",
    selected: false,
  },
  {
    id: "s5",
    gradeLevel: "GRADE 5",
    sectionName: "PEARL",
    adviser: "BRUNO, IILA MAHAVIR",
    studentsCount: "35/50",
    selected: false,
  },
  {
    id: "s6",
    gradeLevel: "GRADE 5",
    sectionName: "RUBY",
    adviser: "TAVARES, SHANDAR NUNO",
    studentsCount: "29/47",
    selected: false,
  },
  {
    id: "s7",
    gradeLevel: "GRADE 4",
    sectionName: "SAPPHIRE",
    adviser: "BELO, INDRA ADELNA",
    studentsCount: "31/50",
    selected: false,
  },
  {
    id: "s8",
    gradeLevel: "GRADE 4",
    sectionName: "EMERALD",
    adviser: "GARCIA, JUAN DELA CRUZ",
    studentsCount: "28/45",
    selected: false,
  },
  {
    id: "s9",
    gradeLevel: "GRADE 3",
    sectionName: "TOPAZ",
    adviser: "SANTOS, MARIA CLARA",
    studentsCount: "25/40",
    selected: false,
  },
];

const createSection = async () => {
  console.log("Navigating to /create-section");
  router.push("/create-section");
};

const viewSectionDetails = async (sectionId) => {
  console.log(
    `Navigating to /view-section-details for section ID: ${sectionId}`
  );
  router.push(`/view-section`);
};

const AdvisoryClassManagement = () => {
  const [selectedGradeLevel, setSelectedGradeLevel] =
    useState("ALL GRADE LEVELS");
  const [sections, setSections] = useState(DUMMY_SECTIONS);
  const [selectedSectionIds, setSelectedSectionIds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredSections, setFilteredSections] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const gradeLevelOptions = [
    "ALL GRADE LEVELS",
    "GRADE 1",
    "GRADE 2",
    "GRADE 3",
    "GRADE 4",
    "GRADE 5",
    "GRADE 6",
  ];

  useEffect(() => {
    let currentFilteredSections = sections;

    if (searchText) {
      currentFilteredSections = currentFilteredSections.filter(
        (section) =>
          section.sectionName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          section.adviser.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedGradeLevel !== "ALL GRADE LEVELS") {
      currentFilteredSections = currentFilteredSections.filter(
        (section) => section.gradeLevel === selectedGradeLevel
      );
    }

    setFilteredSections(currentFilteredSections);
  }, [sections, searchText, selectedGradeLevel]);

  const handleSectionSelection = (id) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id
          ? { ...section, selected: !section.selected }
          : section
      )
    );

    setSelectedSectionIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((sectionId) => sectionId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const importSections = () => {};

  const handleRemoveSelected = () => {
    if (selectedSectionIds.length === 0) {
      console.log("Please select sections to remove.");
      return;
    }
    setShowConfirmationModal(true);
  };

  const confirmRemoveSections = () => {
    const newSections = sections.filter(
      (section) => !selectedSectionIds.includes(section.id)
    );
    setSections(newSections);
    setSelectedSectionIds([]);
    setShowConfirmationModal(false);
    console.log("Selected sections have been removed.");
  };

  const cancelRemoveSections = () => {
    setShowConfirmationModal(false);
    setSections((prevSections) =>
      prevSections.map((section) => ({ ...section, selected: false }))
    );
    setSelectedSectionIds([]);
  };

  const handleImportSections = () => {
    console.log("Import Sections functionality (Not Implemented)");
  };

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text !== "") {
      setSelectedGradeLevel("ALL GRADE LEVELS");
    }
  };

  return (
    <View style={globalStyles.container}>
      <TopBar
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onUserIconPress={handleUserIconPress}
      />

      <View style={styles.content}>
        <View style={styles.filterContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedGradeLevel}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedGradeLevel(itemValue)}
            >
              {gradeLevelOptions.map((level) => (
                <Picker.Item key={level} label={level} value={level} />
              ))}
            </Picker>
          </View>
        </View>

        <ScrollView
          style={styles.tableContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={globalStyles.table}>
            <View style={globalStyles.headerRow}>
              <Text style={[globalStyles.headerCell, { flex: 2 }]}>
                GRADE LEVEL
              </Text>
              <Text style={[globalStyles.headerCell, { flex: 4 }]}>
                SECTION NAME
              </Text>
              <Text style={[globalStyles.headerCell, { flex: 3.8 }]}>
                ADVISER
              </Text>
              <Text
                style={[
                  globalStyles.headerCell,
                  { flex: 4, borderRightWidth: 0 },
                ]}
              >
                STUDENTS
              </Text>
              <Text
                style={[
                  globalStyles.headerCellRightmost,
                  { width: 40, borderRightWidth: 0 },
                ]}
              >
                {" "}
              </Text>
            </View>

            {filteredSections.map((section) => (
              <View style={globalStyles.dataRow} key={section.id}>
                <TouchableOpacity
                  style={styles.mainContentClickableArea}
                  onPress={() => viewSectionDetails(section.id)}
                >
                  <Text style={[globalStyles.dataCell, { flex: 2 }]}>
                    {section.gradeLevel}
                  </Text>
                  <Text style={[globalStyles.dataCell, { flex: 4 }]}>
                    {section.sectionName}
                  </Text>
                  <Text style={[globalStyles.dataCell, { flex: 4 }]}>
                    {section.adviser}
                  </Text>
                  <Text
                    style={[
                      globalStyles.dataCellRightmost,
                      { flex: 4.1, borderRightWidth: 0 },
                    ]}
                  >
                    {section.studentsCount}
                  </Text>
                </TouchableOpacity>

                <View
                  style={[
                    globalStyles.dataCellRightmost,
                    {
                      width: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => handleSectionSelection(section.id)}
                    style={
                      section.selected
                        ? globalStyles.selectedStudentIndicator
                        : globalStyles.unselectedStudentIndicator
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View
          style={[globalStyles.bottomButtons, styles.bottomButtonsOverride]}
        >
          <TouchableOpacity
            style={styles.removeSelectedButton}
            onPress={handleRemoveSelected}
          >
            <Text style={globalStyles.newRequestButtonText}>
              REMOVE SELECTED
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerStudentButton}
            onPress={importSections}
          >
            <Text style={globalStyles.newRequestButtonText}>
              IMPORT SECTIONS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerStudentButton}
            onPress={createSection}
          >
            <Text style={globalStyles.newRequestButtonText}>
              CREATE SECTION
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
      >
        <View style={globalStyles.centeredView}>
          <View style={globalStyles.modalView}>
            <Text style={globalStyles.modalTitle}>Confirm Removal</Text>
            <Text style={globalStyles.modalText}>
              Are you sure you want to remove the selected section(s)? This
              action cannot be undone.
            </Text>
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={[globalStyles.modalButton, globalStyles.buttonCancel]}
                onPress={cancelRemoveSections}
              >
                <Text style={globalStyles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  globalStyles.modalButton,
                  styles.modalButtonConfirmOverride,
                ]}
                onPress={confirmRemoveSections}
              >
                <Text style={globalStyles.buttonTextStyle}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  pickerContainer: {
    fontSize: 16,
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    height: 63,
    width: 180,
    backgroundColor: Colors.mediumGrey,
  },
  tableContainer: {
    marginBottom: 20,
  },
  mainContentClickableArea: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  bottomButtonsOverride: {
    position: "relative",
    bottom: 0,
    right: 0,
  },
  removeSelectedButton: {
    backgroundColor: Colors.buttonRed,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
  },
  registerStudentButton: {
    backgroundColor: Colors.buttonGreen,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
  },
  modalButtonConfirmOverride: {
    backgroundColor: Colors.buttonRed,
  },
  actionsCell: {
    flex: 1,
    borderRightWidth: 0,
  },
  viewText: {
    color: Colors.linkBlue,
  },
});

export default AdvisoryClassManagement;
