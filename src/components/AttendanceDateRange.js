import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AttendanceDateRange({
  initialStartDate = new Date(),
  initialEndDate = new Date(),
  onDateChange,
}) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [pickerType, setPickerType] = useState(null);

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB").replace(/\//g, "/");

  const handleDateChange = (_, selectedDate) => {
    if (!selectedDate) {
      setPickerType(null);
      return;
    }

    if (pickerType === "start") {
      setStartDate(selectedDate);
      onDateChange?.({ startDate: selectedDate, endDate });
    } else {
      setEndDate(selectedDate);
      onDateChange?.({ startDate, endDate: selectedDate });
    }

    setPickerType(null);
  };

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.heading}>Attendance</Text>
        <Text style={styles.heading}>Starts From</Text>
      </View>

      <View style={styles.line} />

      {/* DATE ROW */}
      <View style={styles.row}>
        
        {/* Start Date */}
        <TouchableOpacity
          onPress={() => setPickerType("start")}
          style={styles.dateBox}
        >
          <Text style={styles.dateText}>{formatDate(startDate)}</Text>
        </TouchableOpacity>

        <Text style={styles.toText}>To</Text>

        {/* End Date */}
        <TouchableOpacity
          onPress={() => setPickerType("end")}
          style={styles.dateBox}
        >
          <Text style={styles.dateText}>{formatDate(endDate)}</Text>
        </TouchableOpacity>
      </View>

      {pickerType && (
        <DateTimePicker
          value={pickerType === "start" ? startDate : endDate}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 14,
    elevation: 3,
    marginVertical: 10,
  },

  heading: {
    color: "#0a57ff",
    fontWeight: "700",
    fontSize: 14,
  },

  line: {
    height: 40,
    width: 1,
    backgroundColor: "#e6e6e6",
    marginHorizontal: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },

  dateBox: {
    backgroundColor: "#f3f5ff",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 10,
    minWidth: 110,
    alignItems: "center",
  },

  dateText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  toText: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: "700",
    color: "#0a57ff",
  },
});
