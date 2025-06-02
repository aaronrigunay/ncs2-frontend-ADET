import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
  Dimensions,
  Modal,
} from "react-native";

import { router } from "expo-router";
import globalStyles, { Colors } from "../../constants/global-styles";
import TopBar from "../top-bar";

const registerAdviser = async () => {
  router.push("/register-adviser");
};

const GrdAdvisersPage = () => {
  const [formData, setFormData] = useState({
    gradeLevel: "ALL GRADE LEVELS",
    advisers: [
      {
        name: "NUNES, RODRIGO AYESHA",
        section: "COPPER",
        gradeLevel: "GRADE 6",
        checked: false,
      },
      {
        name: "CABRAL, REZA ZUHRA",
        section: "SILVER",
        gradeLevel: "GRADE 6",
        checked: false,
      },
      {
        name: "DANIEL, LOURDES BIA",
        section: "GOLD",
        gradeLevel: "GRADE 6",
        checked: false,
      },
      {
        name: "SERRA, PRANAY RUBEN",
        section: "DIAMOND",
        gradeLevel: "GRADE 6",
        checked: false,
      },
      {
        name: "BRUNO, IILA MAHAVIR",
        section: "PEARL",
        gradeLevel: "GRADE 5",
        checked: false,
      },
      {
        name: "TAVARES, SHANDAR NUNO",
        section: "RUBY",
        gradeLevel: "GRADE 5",
        checked: false,
      },
      {
        name: "BELO, INDRA ADELNA",
        section: "SAPPHIRE",
        gradeLevel: "GRADE 4",
        checked: false,
      },
    ],
  });

  const [searchText, setSearchText] = useState("");
  const [filteredAdvisers, setFilteredAdvisers] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const gradeLevels = [
    "ALL GRADE LEVELS",
    "GRADE 1",
    "GRADE 2",
    "GRADE 3",
    "GRADE 4",
    "GRADE 5",
    "GRADE 6",
  ];

  const { width, height } = Dimensions.get("window");

  const getResponsiveFontSize = (size) => {
    const baseSize = 16;
    const factor = Math.min(width, height) / 600;
    return Math.round(baseSize + size * factor);
  };

  useEffect(() => {
    let currentFilteredAdvisers = formData.advisers;

    if (searchText) {
      currentFilteredAdvisers = currentFilteredAdvisers.filter((adviser) =>
        adviser.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (formData.gradeLevel !== "ALL GRADE LEVELS") {
      currentFilteredAdvisers = currentFilteredAdvisers.filter(
        (adviser) => adviser.gradeLevel === formData.gradeLevel
      );
    }

    setFilteredAdvisers(currentFilteredAdvisers);
  }, [formData.advisers, formData.gradeLevel, searchText]);

  const handleCheckboxChange = (adviserName) => {
    const updatedAdvisers = formData.advisers.map((adviser) =>
      adviser.name === adviserName
        ? { ...adviser, checked: !adviser.checked }
        : adviser
    );
    setFormData({ ...formData, advisers: updatedAdvisers });
  };

  const handleRemoveSelected = () => {
    const selectedAdviserCount = formData.advisers.filter(
      (adviser) => adviser.checked
    ).length;
    if (selectedAdviserCount === 0) {
      console.log("Please select advisers to remove.");
      return;
    }
    setShowConfirmationModal(true);
  };

  const confirmRemoveAdvisers = () => {
    const newAdvisers = formData.advisers.filter((adviser) => !adviser.checked);
    setFormData({ ...formData, advisers: newAdvisers });
    setShowConfirmationModal(false);
    console.log("Selected advisers have been removed.");
  };

  const cancelRemoveAdvisers = () => {
    setShowConfirmationModal(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      advisers: prevFormData.advisers.map((adviser) => ({
        ...adviser,
        checked: false,
      })),
    }));
  };

  const handleRegisterAdviser = () => {
    const selectedAdvisers = formData.advisers.filter(
      (adviser) => adviser.checked
    );
    if (selectedAdvisers.length > 0) {
      console.log(
        `Adviser registered for advisers: ${selectedAdvisers
          .map((s) => s.name)
          .join(", ")}`
      );
    } else {
      console.log("Please select advisers to register an adviser.");
    }
  };

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
      <View style={styles.content}>
        <View style={styles.filterContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.gradeLevel}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setFormData({ ...formData, gradeLevel: itemValue })
              }
            >
              {gradeLevels.map((level) => (
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
              <Text style={[globalStyles.headerCell, { flex: 1 }]}>
                GRADE LEVEL
              </Text>
              <Text style={[globalStyles.headerCell, { flex: 3 }]}>
                FULL NAME
              </Text>
              <Text style={[globalStyles.headerCell, { flex: 2 }]}>
                CURRENT SECTION
              </Text>
              <Text style={[globalStyles.headerCell, { width: 40 }]}> </Text>
            </View>

            <ScrollView style={styles.tableScrollView}>
              {filteredAdvisers.map((adviser) => (
                <View style={globalStyles.dataRow} key={adviser.name}>
                  <Text style={[globalStyles.dataCell, { flex: 1 }]}>
                    {adviser.gradeLevel}
                  </Text>
                  <Text style={[globalStyles.dataCell, { flex: 3 }]}>
                    {adviser.name}
                  </Text>
                  <Text style={[globalStyles.dataCell, { flex: 2 }]}>
                    {adviser.section}
                  </Text>
                  <TouchableOpacity
                    style={[
                      globalStyles.dataCell,
                      {
                        width: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRightWidth: 0,
                      },
                    ]}
                    onPress={() => handleCheckboxChange(adviser.name)}
                  >
                    <View
                      style={
                        adviser.checked
                          ? globalStyles.selectedStudentIndicator
                          : globalStyles.unselectedStudentIndicator
                      }
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        <View style={[globalStyles.bottomButtons, styles.bottomButtonsFloat]}>
          <TouchableOpacity
            style={styles.removeSelectedButton}
            onPress={handleRemoveSelected}
          >
            <Text style={globalStyles.newRequestButtonText}>
              REMOVE SELECTED
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
              style={styles.registerAdviserButton}
              onPress={handleRegisterAdviser}
            >
              <Text style={globalStyles.newRequestButtonText}>
                REGISTER ADVISER
              </Text>
            </TouchableOpacity> */}
          <TouchableOpacity
            style={globalStyles.newRequestButton}
            onPress={registerAdviser}
          >
            <Text style={globalStyles.newRequestButtonText}>
              REGISTER ADVISER
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
              Are you sure you want to remove the selected adviser(s)? This
              action cannot be undone.
            </Text>
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={[globalStyles.modalButton, globalStyles.buttonCancel]}
                onPress={cancelRemoveAdvisers}
              >
                <Text style={globalStyles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  globalStyles.modalButton,
                  styles.modalButtonConfirmOverride,
                ]}
                onPress={confirmRemoveAdvisers}
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
  contentWrapper: {
    flex: 1,
    padding: 20,
    position: "relative",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  gradeLabel: {
    fontWeight: "bold",
    color: Colors.tableCellText,
    marginRight: 10,
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
    color: Colors.tableCellText,
  },
  tableScrollView: {
    marginBottom: 20,
  },
  removeSelectedButton: {
    backgroundColor: Colors.buttonRed,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  registerAdviserButton: {
    backgroundColor: Colors.buttonGreen,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomButtonsFloat: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  modalButtonConfirmOverride: {
    backgroundColor: Colors.buttonGreen,
  },
});

export default GrdAdvisersPage;
