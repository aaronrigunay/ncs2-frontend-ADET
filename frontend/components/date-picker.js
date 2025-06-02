import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");

const DatePicker = ({ visible, onClose, currentDate, onDateSelect }) => {
  const [date, setDate] = useState(currentDate || new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  useEffect(() => {
    if (visible && currentDate) {
      setDate(currentDate);
      setMonth(currentDate.getMonth());
      setYear(currentDate.getFullYear());
      setShowMonthPicker(false);
      setShowYearPicker(false);
    } else if (visible && !currentDate) {
      const today = new Date();
      setDate(today);
      setMonth(today.getMonth());
      setYear(today.getFullYear());
      setShowMonthPicker(false);
      setShowYearPicker(false);
    }
  }, [visible, currentDate]);

  const daysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const firstDayOfMonth = (m, y) => new Date(y, m, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateDays = useCallback(() => {
    const totalDays = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    return days;
  }, [month, year]);

  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleDayPress = (day) => {
    if (day !== null) {
      const newDate = new Date(year, month, day);
      setDate(newDate);
      onDateSelect(newDate);
      onClose();
    }
  };

  const isSelectedDate = (day) => {
    if (!date) return false;
    return (
      day === date.getDate() &&
      month === date.getMonth() &&
      year === date.getFullYear()
    );
  };

  const handleMonthClick = () => {
    setShowMonthPicker(true);
    setShowYearPicker(false);
  };

  const handleYearClick = () => {
    setShowYearPicker(true);
    setShowMonthPicker(false);
  };

  const selectMonth = (selectedMonthIndex) => {
    setMonth(selectedMonthIndex);
    setShowMonthPicker(false);
  };

  const selectYear = (selectedYear) => {
    setYear(selectedYear);
    setShowYearPicker(false);
  };

  const renderMonthPicker = () => (
    <View style={styles.monthYearGrid}>
      {monthNames.map((mName, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.monthYearCell,
            month === index && styles.selectedMonthYearCell,
          ]}
          onPress={() => selectMonth(index)}
        >
          <Text
            style={[
              styles.monthYearCellText,
              month === index && styles.selectedMonthYearCellText,
            ]}
          >
            {mName.substring(0, 3)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 100; i <= currentYear + 10; i++) {
      years.push(i);
    }

    return (
      <ScrollView style={styles.yearScrollContainer}>
        <View style={styles.yearGrid}>
          {years.map((y, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.monthYearCell,
                year === y && styles.selectedMonthYearCell,
              ]}
              onPress={() => selectYear(y)}
            >
              <Text
                style={[
                  styles.monthYearCellText,
                  year === y && styles.selectedMonthYearCellText,
                ]}
              >
                {y}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  const dayCells = generateDays();
  const weeks = [];
  for (let i = 0; i < dayCells.length; i += 7) {
    weeks.push(dayCells.slice(i, i + 7));
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.pickerContainer}>
          <View style={styles.header}>
            {!showMonthPicker && !showYearPicker && (
              <TouchableOpacity
                onPress={goToPreviousMonth}
                style={styles.navButton}
              >
                <Text style={styles.navText}>{"<"}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleMonthClick}>
              <Text style={styles.monthYearText}>{monthNames[month]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleYearClick}>
              <Text style={styles.monthYearText}>{year}</Text>
            </TouchableOpacity>
            {!showMonthPicker && !showYearPicker && (
              <TouchableOpacity
                onPress={goToNextMonth}
                style={styles.navButton}
              >
                <Text style={styles.navText}>{">"}</Text>
              </TouchableOpacity>
            )}
          </View>

          {showMonthPicker ? (
            renderMonthPicker()
          ) : showYearPicker ? (
            renderYearPicker()
          ) : (
            <>
              <View style={styles.weekdaysContainer}>
                {dayNames.map((dayName, index) => (
                  <Text key={index} style={styles.weekdayText}>
                    {dayName}
                  </Text>
                ))}
              </View>

              {weeks.map((week, weekIndex) => (
                <View key={weekIndex} style={styles.weekRow}>
                  {week.map((day, dayIndex) => (
                    <TouchableOpacity
                      key={dayIndex}
                      style={[
                        styles.dayCell,
                        day === null && styles.emptyDayCell,
                        isSelectedDate(day) && styles.selectedDayCell,
                      ]}
                      onPress={() => handleDayPress(day)}
                      disabled={day === null}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isSelectedDate(day) && styles.selectedDayText,
                        ]}
                      >
                        {day !== null ? day : ""}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </>
          )}

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    width: Math.min(width * 0.9, 350),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
  },
  navButton: {
    padding: 10,
  },
  navText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: 5,
  },
  weekdaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    width: "14.28%",
    textAlign: "center",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 5,
  },
  emptyDayCell: {
    backgroundColor: "transparent",
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDayCell: {
    backgroundColor: "#69A75F",
  },
  selectedDayText: {
    color: "white",
    fontWeight: "bold",
  },
  monthYearGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
  },
  monthYearCell: {
    width: "30%",
    aspectRatio: 1.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 5,
    backgroundColor: "#EFEFEF",
  },
  selectedMonthYearCell: {
    backgroundColor: "#69A75F",
  },
  monthYearCellText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectedMonthYearCellText: {
    color: "white",
  },
  yearScrollContainer: {
    maxHeight: 250,
  },
  yearGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#69A75F",
    borderRadius: 5,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DatePicker;
