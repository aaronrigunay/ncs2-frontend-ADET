import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/auth-context";

import globalStyles, { Colors } from "../constants/global-styles";

const Sidebar = () => {
  const { user, signOut } = useAuth();
  const segments = useSegments();

  const pagesWithReturnButtonOnly = [
    "register-student",
    "view-student",
    "edit-student",
    "create-section",
    "view-section",
    "register-adviser",
    "new-request",
    "view-request",
    "approve-request",
    "deny-request",
    "best-students",
    "worst-students",
    "improving-students",
    "struggling-students",
    "view-profile",
    "edit-profile",
    "view-section",
    "student-sectioning",
  ];

  const pagesWithClassRecordSidebarContent = [
    "class-record",
    "attendance-record",
    "statistics",
    "best-students",
    "worst-students",
    "improving-students",
    "struggling-students",
  ];

  const currentRouteSegment = segments[segments.length - 1];
  const previousRouteSegment = segments[segments.length - 2];

  const isAdviser = user?.userType === "ADVISER";

  const shouldShowReturnButton =
    pagesWithReturnButtonOnly.includes(currentRouteSegment) ||
    pagesWithClassRecordSidebarContent.includes(currentRouteSegment) ||
    (currentRouteSegment === "statistics" &&
      previousRouteSegment === "class-record");

  const showStudentsAndStatisticsSidebar =
    pagesWithClassRecordSidebarContent.includes(currentRouteSegment) ||
    (currentRouteSegment === "statistics" &&
      previousRouteSegment === "class-record");

  const shouldShowAdviserSectionsTab =
    isAdviser &&
    !showStudentsAndStatisticsSidebar &&
    currentRouteSegment === "sections";

  const isActive = (path) => {
    if (
      path === "class-record" &&
      (currentRouteSegment === "class-record" ||
        currentRouteSegment === "attendance-record")
    ) {
      return true;
    }
    if (
      path === "statistics" &&
      currentRouteSegment === "statistics" &&
      previousRouteSegment === "class-record"
    ) {
      return true;
    }
    return currentRouteSegment === path;
  };

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  const handleGoBack = () => {
    router.back();
  };

  const NavItem = ({ icon, label, path, onPressOverride }) => (
    <TouchableOpacity
      style={[styles.navItem, isActive(path) && styles.navItemActive]}
      onPress={
        onPressOverride
          ? onPressOverride
          : () => router.replace(`/(app)/${path}`)
      }
    >
      <Ionicons
        name={icon}
        size={24}
        color={isActive(path) ? "#333333" : "#D9D9D9"}
        style={styles.navIcon}
      />
      <Text style={[styles.navText, isActive(path) && styles.navTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sidebarContainer}>
      <View style={styles.topSection}></View>

      {isAdviser ? (
        <View style={styles.adviserContentArea}>
          <View style={styles.navItemsContainer}>
            {showStudentsAndStatisticsSidebar ? (
              <>
                <NavItem
                  icon="people"
                  label="Students"
                  path="class-record"
                  onPressOverride={() => router.replace(`/(app)/class-record`)}
                />
                <NavItem
                  icon="stats-chart"
                  label="Statistics"
                  path="statistics"
                  onPressOverride={() => router.replace(`/(app)/statistics`)}
                />
              </>
            ) : (
              shouldShowAdviserSectionsTab && (
                <NavItem icon="easel" label="Sections" path="sections" />
              )
            )}
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.logoutSection}>
            {shouldShowReturnButton ? (
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleGoBack}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={"#D9D9D9"}
                  style={styles.navIcon}
                />
                <Text style={styles.logoutText}>RETURN</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Ionicons
                  name="log-out"
                  size={24}
                  color={"#D9D9D9"}
                  style={styles.navIcon}
                />
                <Text style={styles.logoutText}>LOGOUT</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <>
          {shouldShowReturnButton ? (
            <View style={styles.contentAreaForReturnButton}>
              <View style={styles.navItemsContainer}>
                {showStudentsAndStatisticsSidebar ? (
                  <>
                    <NavItem
                      icon="people"
                      label="Students"
                      path="class-record"
                      onPressOverride={() =>
                        router.replace(`/(app)/class-record`)
                      }
                    />
                    <NavItem
                      icon="stats-chart"
                      label="Statistics"
                      path="statistics"
                      onPressOverride={() =>
                        router.replace(`/(app)/class-record/statistics`)
                      }
                    />
                  </>
                ) : (
                  <>
                    <NavItem icon="people" label="Students" path="students" />
                    <NavItem icon="easel" label="Sections" path="sections" />
                    <NavItem icon="person" label="Advisers" path="advisers" />
                    <NavItem
                      icon="document-text"
                      label="Requests"
                      path="requests"
                    />
                  </>
                )}
              </View>
              <View style={{ flex: 1 }} />
              <View style={styles.logoutSection}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleGoBack}
                >
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color={"#D9D9D9"}
                    style={styles.navIcon}
                  />
                  <Text style={styles.logoutText}>RETURN</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.navItemsContainer}>
                <NavItem icon="people" label="Students" path="students" />
                <NavItem icon="easel" label="Sections" path="sections" />
                <NavItem icon="person" label="Advisers" path="advisers" />
                <NavItem
                  icon="document-text"
                  label="Requests"
                  path="requests"
                />
              </View>

              <View style={styles.logoutSection}>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                >
                  <Ionicons
                    name="log-out"
                    size={24}
                    color={"#D9D9D9"}
                    style={styles.navIcon}
                  />
                  <Text style={styles.logoutText}>LOGOUT</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 220,
    backgroundColor: "#222222",
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  topSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
    paddingTop: 10,
  },
  appName: {
    color: "#222222",
    fontSize: 20,
    fontWeight: "bold",
  },
  navItemsContainer: {
    width: "100%",
    flexGrow: 1,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "transparent",
  },
  navItemActive: {
    backgroundColor: "#D9D9D9",
    borderRadius: 0,
  },
  navIcon: {
    marginRight: 15,
  },
  navText: {
    color: "#ACB1AB",
    fontSize: 18,
    fontWeight: "bold",
  },
  navTextActive: {
    color: "#222222",
    fontWeight: "bold",
  },
  contentAreaForReturnButton: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  adviserContentArea: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backButtonContainer: {
    width: "100%",
    marginTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  backIcon: {
    marginRight: 15,
  },
  backText: {
    color: "#ACB1AB",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutSection: {
    width: "100%",
    marginTop: 40,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  logoutText: {
    color: "#ACB1AB",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Sidebar;
