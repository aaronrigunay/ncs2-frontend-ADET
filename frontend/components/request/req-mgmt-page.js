import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import globalStyles, { Colors } from "../../constants/global-styles";

import { DUMMY_REQUEST } from "../../dummy-data/dummy-request";

import TopBar from "../top-bar";

const newRequest = async () => {
  router.push("/new-request");
};

const viewRequest = async (request) => {
  console.log("Navigating to /view-request with request:", request.id);
  router.push({
    pathname: "/view-request",
    params: {
      requestId: request.id,
      requestedFile: request.requestedFile,
      studentName: request.fullName,
      lrn: request.lrn,
      gradeSection: request.gradeSection,
      schoolYear: request.schoolYear,
      requestor: request.requestor,
      email: request.email,
      contact: request.contact,
      status: request.status,
      dateTime: request.dateTime,
    },
  });
};

const RequestMgmtPage = () => {
  const [requests, setRequests] = useState(DUMMY_REQUEST);

  const [filterStatus, setFilterStatus] = useState("ALL STATUSES");
  const [searchText, setSearchText] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const requestStatuses = ["ALL STATUSES", "PENDING", "DENIED", "APPROVED"];

  useEffect(() => {
    let currentFilteredRequests = requests;

    if (searchText) {
      currentFilteredRequests = currentFilteredRequests.filter(
        (request) =>
          request.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
          request.email.toLowerCase().includes(searchText.toLowerCase()) ||
          request.contact.includes(searchText) ||
          request.id.includes(searchText)
      );
    }

    if (filterStatus !== "ALL STATUSES") {
      currentFilteredRequests = currentFilteredRequests.filter(
        (request) => request.status === filterStatus
      );
    }

    setFilteredRequests(currentFilteredRequests);
  }, [requests, searchText, filterStatus]);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleUserIconPress = () => {
    console.log("User icon pressed! (Not Implemented)");
  };

  const confirmRemoveRequests = () => {
    const newRequests = requests.filter(
      (request) => !selectedRequestIds.includes(request.id)
    );
    setRequests(newRequests);
    setSelectedRequestIds([]);
    setShowConfirmationModal(false);
    console.log("Selected requests have been deleted.");
  };

  const cancelRemoveRequests = () => {
    setShowConfirmationModal(false);
  };

  const handleRemoveSelected = () => {
    if (selectedRequestIds.length === 0) {
      console.log("Please select requests to remove.");
      return;
    }
    setShowConfirmationModal(true);
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
              selectedValue={filterStatus}
              style={styles.picker}
              onValueChange={(itemValue) => setFilterStatus(itemValue)}
            >
              {requestStatuses.map((status) => (
                <Picker.Item key={status} label={status} value={status} />
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
                REQUEST ID
              </Text>
              <Text style={[globalStyles.headerCell, { flex: 2 }]}>
                FULL NAME
              </Text>
              <Text style={[globalStyles.headerCell, { flex: 2.5 }]}>
                REQUEST EMAIL
              </Text>
              <Text style={[globalStyles.headerCell, { flex: 1.5 }]}>
                CONTACT NUMBER
              </Text>
              <Text style={[globalStyles.headerCell, { flex: 2 }]}>
                DATE & TIME REQUESTED
              </Text>
              <Text style={[globalStyles.headerCell, { flex: 1 }]}></Text>
            </View>

            {filteredRequests.map((request, index) => (
              <View style={globalStyles.dataRow} key={request.id}>
                <TouchableOpacity
                  style={styles.requestContentClickableArea}
                  onPress={() => viewRequest(request)}
                >
                  <Text style={[globalStyles.dataCell, { flex: 1 }]}>
                    {request.id}
                  </Text>
                  <Text style={[globalStyles.dataCell, { flex: 2 }]}>
                    {request.fullName}
                  </Text>
                  <Text style={[globalStyles.dataCell, { flex: 2.5 }]}>
                    {request.email}
                  </Text>
                  <Text style={[globalStyles.dataCell, { flex: 1.5 }]}>
                    {request.contact}
                  </Text>
                  <Text style={[globalStyles.dataCell, { flex: 2 }]}>
                    {request.dateTime}
                  </Text>
                  <View
                    style={[
                      globalStyles.dataCell,
                      {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRightWidth: 0,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        globalStyles.statusPill,
                        request.status === "PENDING"
                          ? globalStyles.pendingStatus
                          : request.status === "DENIED"
                          ? globalStyles.deniedStatus
                          : globalStyles.approvedStatus,
                      ]}
                    >
                      {request.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={[globalStyles.bottomButtons, { marginTop: 20 }]}>
          <TouchableOpacity
            style={globalStyles.newRequestButton}
            onPress={newRequest}
          >
            <Text style={globalStyles.newRequestButtonText}>NEW REQUEST</Text>
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
            <Text style={globalStyles.modalText}>
              Are you sure you want to delete the selected request(s)? This
              action cannot be undone.
            </Text>
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={[globalStyles.modalButton, globalStyles.buttonCancel]}
                onPress={cancelRemoveRequests}
              >
                <Text style={globalStyles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.modalButton, globalStyles.buttonConfirm]}
                onPress={confirmRemoveRequests}
              >
                <Text style={globalStyles.buttonTextStyle}>Done</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
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
    flex: 1,
    marginBottom: 20,
  },
  requestContentClickableArea: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});

export default RequestMgmtPage;
