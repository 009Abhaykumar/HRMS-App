import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CriticalTasks() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const [status, setStatus] = useState("");
  const [assigned, setAssigned] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>

      {/* ---------- SCROLL CONTENT ---------- */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>My Critical Tasks</Text>

        {/* ---------- FILTER CARD ---------- */}
        <View style={styles.card}>
          {/* DATE RANGE */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowFrom(true)}
            >
              <Icon name="calendar" size={18} color="#555" />
              <Text style={styles.dateText}>
                {fromDate ? fromDate.toDateString() : "From Date"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowTo(true)}
            >
              <Icon name="calendar" size={18} color="#555" />
              <Text style={styles.dateText}>
                {toDate ? toDate.toDateString() : "To Date"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* STATUS */}
          <View style={styles.dropdown}>
            <Icon name="tune" size={18} color="#555" />
            <Picker
              selectedValue={status}
              onValueChange={setStatus}
              style={styles.picker}
            >
              <Picker.Item label="Status" value="" />
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Completed" value="Completed" />
              <Picker.Item label="Closed" value="Closed" />
            </Picker>
          </View>

          {/* ASSIGNED */}
          <View style={styles.dropdown}>
            <Icon name="account" size={18} color="#555" />
            <Picker
              selectedValue={assigned}
              onValueChange={setAssigned}
              style={styles.picker}
            >
              <Picker.Item label="Assigned" value="" />
              <Picker.Item label="By You" value="By You" />
              <Picker.Item label="To You" value="To You" />
            </Picker>
          </View>

          {/* PRIORITY */}
          <View style={styles.dropdown}>
            <Icon name="flag" size={18} color="#555" />
            <Picker
              selectedValue={priority}
              onValueChange={setPriority}
              style={styles.picker}
            >
              <Picker.Item label="Priority" value="" />
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Low" value="Low" />
            </Picker>
          </View>

          {/* SEARCH */}
          <View style={styles.searchBox}>
            <Icon name="magnify" size={18} color="#777" />
            <TextInput
              placeholder="By Task, Emp & Name"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* ---------- MOBILE TASK CARD (SAMPLE) ---------- */}
        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>Server Access Issue</Text>

          <Text style={styles.taskRow}>
            <Text style={styles.label}>Assigned By:</Text> Admin
          </Text>
          <Text style={styles.taskRow}>
            <Text style={styles.label}>Assigned To:</Text> You
          </Text>
          <Text style={styles.taskRow}>
            <Text style={styles.label}>Due Date:</Text> 20 Dec 2025
          </Text>

          <View style={styles.badgeRow}>
            <View style={styles.priorityBadge}>
              <Text style={styles.badgeText}>High</Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.badgeText}>Pending</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ---------- FIXED APPLY BUTTON ----------
      <View style={styles.fixedFooter}>
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View> */}

      {/* DATE PICKERS */}
      {showFrom && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, d) => {
            setShowFrom(false);
            if (d) setFromDate(d);
          }}
        />
      )}

      {showTo && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, d) => {
            setShowTo(false);
            if (d) setToDate(d);
          }}
        />
      )}
    </SafeAreaView >
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A73E8",
    margin: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
  },

  dateInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FC",
    borderRadius: 10,
    padding: 12,
    marginRight: 8,
  },

  dateText: {
    marginLeft: 8,
    color: "#555",
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FC",
    borderRadius: 10,
    paddingHorizontal: 8,
    marginTop: 12,
  },

  picker: {
    flex: 1,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FC",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 12,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    margin: 16,
    elevation: 3,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  taskRow: {
    fontSize: 14,
    marginTop: 2,
  },

  label: {
    fontWeight: "700",
  },

  badgeRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  priorityBadge: {
    backgroundColor: "#F44336",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },

  statusBadge: {
    backgroundColor: "#FFA000",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  fixedFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    elevation: 10,
  },

  applyBtn: {
    backgroundColor: "#1A73E8",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
