import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
} from "react-native";

const GrdAttendRec = () => {
  const [month, setMonth] = useState("MONTH");
  const [attendance, setAttendance] = useState([
    {
      name: "ANTUMA, MARK G.",
      days: ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
      absent: 0,
      tardy: 0,
      remarks: "Good attendance",
    },
    {
      name: "BACKUS, NOREEN N.",
      days: ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
      absent: 0,
      tardy: 0,
      remarks: "",
    },
    {
      name: "BARAN, IWONA A.",
      days: ["P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "P", "P"],
      absent: 1,
      tardy: 0,
      remarks: "",
    },
    {
      name: "BARROS, DAFNE R.",
      days: ["P", "P", "T", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
      absent: 0,
      tardy: 1,
      remarks: "",
    },
    {
      name: "CASTELIO, ELZA R.",
      days: ["P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "P", "P"],
      absent: 2,
      tardy: 0,
      remarks: "",
    },
    {
      name: "COELHO, JAQUELINE A.",
      days: ["P", "P", "P", "P", "T", "P", "P", "P", "P", "P", "P", "P"],
      absent: 0,
      tardy: 1,
      remarks: "",
    },
    {
      name: "COELLO, ARON A.",
      days: ["P", "P", "P", "P", "P", "P", "P", "T", "P", "P", "P", "P"],
      absent: 0,
      tardy: 1,
      remarks: "",
    },
    {
      name: "DELGADO, ROBERTO R.",
      days: ["P", "A", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
      absent: 1,
      tardy: 0,
      remarks: "",
    },
    {
      name: "DARWIN, FAITH R.",
      days: ["P", "P", "P", "T", "P", "P", "P", "P", "P", "P", "P", "P"],
      absent: 0,
      tardy: 1,
      remarks: "",
    },
    {
      name: "ESCAMILLA, LASSI L.",
      days: ["P", "P", "P", "P", "P", "A", "P", "P", "P", "P", "P", "P"],
      absent: 1,
      tardy: 0,
      remarks: "",
    },
    {
      name: "GOMEZ, BARBRA R.",
      days: ["P", "P", "P", "P", "P", "P", "T", "P", "P", "P", "P", "P"],
      absent: 0,
      tardy: 1,
      remarks: "",
    },
    {
      name: "GOTTI, SHILA I.",
      days: ["P", "P", "A", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
      absent: 1,
      tardy: 0,
      remarks: "",
    },
    {
      name: "JACOBS, URBANO I.",
      days: ["P", "P", "P", "P", "P", "P", "P", "P", "T", "P", "P", "P"],
      absent: 0,
      tardy: 1,
      remarks: "",
    },
  ]);

  const daysOfWeek = ["M", "T", "W", "TH", "F", "S"];
  const dateRange = [
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
  ];

  const months = [
    "MONTH",
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const [activeTab, setActiveTab] = useState("ATTENDANCE RECORD");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View>
      <View style={styles.searchContainer}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "CLASS RECORD" && styles.activeTabButton,
              { borderRightWidth: 1, borderColor: "#ccc" },
            ]}
            onPress={() => setActiveTab("CLASS RECORD")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "CLASS RECORD" && styles.activeTabText,
              ]}
            >
              CLASS RECORD
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "ATTENDANCE RECORD" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("ATTENDANCE RECORD")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "ATTENDANCE RECORD" && styles.activeTabText,
              ]}
            >
              ATTENDANCE RECORD
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>ATTENDANCE RECORD</Text>
          <View style={styles.monthPicker}>
            <Picker
              selectedValue={month}
              style={styles.picker}
              onValueChange={(itemValue) => setMonth(itemValue)}
            >
              {months.map((m) => (
                <Picker.Item key={m} label={m} value={m} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, { flex: 2 }]}>NAME</Text>
            <View
              style={[styles.headerCell, { flex: 6, flexDirection: "row" }]}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>DATE</Text>
              </View>
              <View style={{ flex: 5, flexDirection: "row" }}>
                {dateRange.map((date) => (
                  <View key={date} style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                      {date}
                    </Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>Day</Text>
              </View>
            </View>
            <Text style={[styles.headerCell, { flex: 1, textAlign: "center" }]}>
              Total for the month
            </Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>REMARK/S</Text>
          </View>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, { flex: 2 }]}></Text>
            <View
              style={[styles.headerCell, { flex: 6, flexDirection: "row" }]}
            >
              <View style={{ flex: 1 }}></View>
              {Array(12)
                .fill(null)
                .map((_, index) => (
                  <View
                    key={`dayHeader${index}`}
                    style={{ flex: 1, alignItems: "center" }}
                  >
                    {index < daysOfWeek.length && (
                      <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                        {daysOfWeek[index]}
                      </Text>
                    )}
                  </View>
                ))}
              <View style={{ flex: 1 }}></View>
            </View>
            <View
              style={[styles.headerCell, { flex: 1, flexDirection: "row" }]}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Absent
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Tardy
              </Text>
            </View>
            <Text style={[styles.headerCell, { flex: 2 }]}></Text>
          </View>

          {attendance
            .filter((student) =>
              student.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((student, studentIndex) => (
              <View key={studentIndex} style={styles.dataRow}>
                <Text
                  style={[
                    styles.dataCell,
                    { flex: 2, textAlign: "left", paddingLeft: 10 },
                  ]}
                >
                  {student.name}
                </Text>
                <View
                  style={[styles.dataCell, { flex: 6, flexDirection: "row" }]}
                >
                  {student.days.map((status, dayIndex) => (
                    <View
                      key={dayIndex}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#eee",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            status === "A"
                              ? "red"
                              : status === "T"
                              ? "orange"
                              : "green",
                        }}
                      >
                        {status}
                      </Text>
                    </View>
                  ))}
                </View>
                <View
                  style={[styles.dataCell, { flex: 1, flexDirection: "row" }]}
                >
                  <Text style={{ flex: 1, textAlign: "center" }}>
                    {student.absent}
                  </Text>
                  <Text style={{ flex: 1, textAlign: "center" }}>
                    {student.tardy}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.dataCell,
                    { flex: 2, textAlign: "left", paddingLeft: 10 },
                  ]}
                >
                  {student.remarks}
                </Text>
              </View>
            ))}
        </View>

        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Notes:</Text>
          <Text style={styles.noteText}>
            DATE (1st row for date, 2nd row for Day: M,T,W,TH,F, S)
          </Text>
          <Text style={styles.noteText}>
            REMARK/S (If DROPPED OUT, state reason, please refer to legend
            number 2. If TRANSFERRED IN/OUT, write the name of School.)
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  monthPicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabButton: {
    backgroundColor: "#81c784",
  },
  tabText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
  },
  activeTabText: {
    color: "#fff",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  dataCell: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  picker: {
    height: 30,
    width: 120,
  },
  notesContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  noteText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  searchButton: {
    padding: 8,
    backgroundColor: "#81c784",
    borderRadius: 5,
  },
  searchText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default GrdAttendRec;
