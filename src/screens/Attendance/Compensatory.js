import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CompensatoryScreen() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filter, setFilter] = useState("All");

  const statusOptions = ["All", "Pending", "Approved", "Rejected"];

  const data = [];

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      
      {/* ---------- Filter Card ---------- */}
      <View style={styles.filterCard}>

        {/* Date Filters */}
        <View style={styles.dateRow}>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowFromPicker(true)}
          >
            <Icon name="calendar-month" size={20} color="#2D4EFF" />
            <Text style={styles.dateText}>
              {fromDate ? fromDate.toDateString().slice(4) : "From Date"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.arrow}>→</Text>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowToPicker(true)}
          >
            <Icon name="calendar-month" size={20} color="#2D4EFF" />
            <Text style={styles.dateText}>
              {toDate ? toDate.toDateString().slice(4) : "To Date"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* CUSTOM DROPDOWN */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownVisible(true)}
        >
          <Icon name="filter-variant" size={20} color="#2D4EFF" />
          <Text style={styles.dropdownText}>{filter}</Text>
          <Icon name="chevron-down" size={20} color="#2D4EFF" />
        </TouchableOpacity>
      </View>

      {/* DATE PICKERS */}
      {showFromPicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          onChange={(e, d) => {
            setShowFromPicker(false);
            if (d) setFromDate(d);
          }}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          onChange={(e, d) => {
            setShowToPicker(false);
            if (d) setToDate(d);
          }}
        />
      )}

      {/* Heading */}
      <Text style={styles.heading}>Compensatory Leaves</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        {["#", "Date", "In", "Out", "Hours", "Type", "Status"].map((label, i) => (
          <Text key={i} style={styles.headerText}>{label}</Text>
        ))}
      </View>

      {/* No Data */}
      {data.length === 0 && (
        <Text style={styles.noData}>No data found</Text>
      )}

      {/* Dropdown Modal */}
      <Modal visible={dropdownVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            {statusOptions.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => {
                  setFilter(item);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    paddingHorizontal: 16,
  },

  filterCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1E5FF",
    marginTop: 10,
    marginBottom: 20,
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },

  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    gap: 6,
  },

  dateText: {
    fontSize: 14,
    color: "#333",
  },

  arrow: {
    fontSize: 18,
    color: "#666",
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 10,
    padding: 12,
    justifyContent: "space-between",
  },

  dropdownText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D4EFF",
    marginBottom: 10,
  },

  tableHeader: {
    backgroundColor: "#E3E8FF",
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },

  headerText: {
    fontSize: 12,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    color: "#333",
  },

  noData: {
    textAlign: "center",
    marginTop: 40,
    color: "#97A0AF",
    fontSize: 14,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 30,
  },

  dropdownModal: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
  },

  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },

  optionText: {
    fontSize: 14,
    color: "#222",
  },
});
