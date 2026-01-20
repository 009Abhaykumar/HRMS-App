// ApplyLeaveScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";

import LeavesSection from "./LeavesSection";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

function formatDate(d) {
  if (!d) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export default function ApplyLeaveScreen() {
  const [subTab, setSubTab] = useState("Single Day");
  const subTabs = ["Single Day", "Multi Day", "Half Day", "Short Day"];

  // Date picker state
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // For multi-day
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  // Half Selection FIX
  const [half, setHalf] = useState(""); // first | second

  // Leave type state
  const leaveOptions = [
    { label: "Select Leave Type", value: "" },
    { label: "Casual Leave", value: "casual" },
    { label: "Sick Leave", value: "sick" },
    { label: "Earned Leave", value: "earned" },
    { label: "Previous Leave", value: "previous" },
  ];
  const [leaveType, setLeaveType] = useState("");

  const Input = ({ placeholder, multiline }) => (
    <TextInput
      style={[
        styles.input,
        multiline && { height: 100, textAlignVertical: "top" },
      ]}
      placeholder={placeholder}
      multiline={multiline}
    />
  );

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };
  const onChangeFrom = (e, sel) => {
    setShowFromPicker(Platform.OS === "ios");
    if (sel) setFromDate(sel);
  };
  const onChangeTo = (e, sel) => {
    setShowToPicker(Platform.OS === "ios");
    if (sel) setToDate(sel);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <LeavesSection />

      <Text style={styles.sectionTitle}>Leave Duration</Text>

      {/* FIXED equal width sub tabs */}
      <View style={styles.subTabRow}>
        {subTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={{ flex: 1 }}
            onPress={() => setSubTab(tab)}
          >
            <Text
              style={[
                styles.subTabText,
                subTab === tab && styles.activeSubTab,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------- Single Day ---------- */}
      {subTab === "Single Day" && (
        <>
          <Text style={styles.label}>Date</Text>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={date ? styles.dateText : styles.placeholderText}>
              {date ? formatDate(date) : "dd-mm-yyyy"}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="calendar"
              onChange={onChangeDate}
              maximumDate={new Date(2100, 12, 31)}
            />
          )}

          <Text style={styles.label}>Leave Type</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={leaveType}
              onValueChange={(val) => setLeaveType(val)}
              style={styles.picker}
              dropdownIconColor="#0a57ff"
            >
              {leaveOptions.map((o) => (
                <Picker.Item key={o.value} label={o.label} value={o.value} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Description</Text>
          <Input placeholder="Reason" multiline />
        </>
      )}

      {/* ---------- Multi Day ---------- */}
      {subTab === "Multi Day" && (
        <>
          <Text style={styles.rowLabel}>From Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowFromPicker(true)}
          >
            <Text style={fromDate ? styles.dateText : styles.placeholderText}>
              {fromDate ? formatDate(fromDate) : "dd-mm-yyyy"}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {showFromPicker && (
            <DateTimePicker
              value={fromDate || new Date()}
              mode="date"
              display="calendar"
              onChange={onChangeFrom}
            />
          )}

          <Text style={styles.rowLabel}>To Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowToPicker(true)}
          >
            <Text style={toDate ? styles.dateText : styles.placeholderText}>
              {toDate ? formatDate(toDate) : "dd-mm-yyyy"}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {showToPicker && (
            <DateTimePicker
              value={toDate || new Date()}
              mode="date"
              display="calendar"
              onChange={onChangeTo}
            />
          )}

          <Text style={styles.label}>Leave Type</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={leaveType}
              onValueChange={setLeaveType}
              style={styles.picker}
            >
              {leaveOptions.map((o) => (
                <Picker.Item key={o.value} label={o.label} value={o.value} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Description</Text>
          <Input placeholder="Reason" multiline />
        </>
      )}

      {/* ---------- Half Day ---------- */}
      {subTab === "Half Day" && (
        <>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={date ? styles.dateText : styles.placeholderText}>
              {date ? formatDate(date) : "dd-mm-yyyy"}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="calendar"
              onChange={onChangeDate}
            />
          )}

          {/* FIXED Select Half */}
          <Text style={styles.label}>Select Half</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.halfButton,
                half === "first" && styles.activeHalf,
              ]}
              onPress={() => setHalf("first")}
            >
              <Text
                style={{
                  color: half === "first" ? "#0a57ff" : "#444",
                  fontWeight: half === "first" ? "700" : "600",
                }}
              >
                First Half
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.halfButton,
                half === "second" && styles.activeHalf,
              ]}
              onPress={() => setHalf("second")}
            >
              <Text
                style={{
                  color: half === "second" ? "#0a57ff" : "#444",
                  fontWeight: half === "second" ? "700" : "600",
                }}
              >
                Second Half
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Leave Type</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={leaveType}
              onValueChange={setLeaveType}
              style={styles.picker}
            >
              {leaveOptions.map((o) => (
                <Picker.Item key={o.value} label={o.label} value={o.value} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Description</Text>
          <Input placeholder="Reason" multiline />
        </>
      )}

      {/* ---------- Short Day ---------- */}
      {subTab === "Short Day" && (
        <>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={date ? styles.dateText : styles.placeholderText}>
              {date ? formatDate(date) : "dd-mm-yyyy"}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="calendar"
              onChange={onChangeDate}
            />
          )}

          <Text style={styles.rowTwo}>Start Time</Text>
          <Input placeholder="--:--:--" />
          <Text style={styles.rowTwo}>End Time</Text>
          <Input placeholder="--:--:--" />

          <Text style={styles.label}>Leave Type</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={leaveType}
              onValueChange={setLeaveType}
              style={styles.picker}
            >
              {leaveOptions.map((o) => (
                <Picker.Item key={o.value} label={o.label} value={o.value} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Description</Text>
          <Input placeholder="Reason" multiline />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 12,
    textAlign: "left",
  },

  subTabRow: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 8,
  },

  subTabText: {
    paddingVertical: 10,
    textAlign: "center",
    flex: 1,
    backgroundColor: "#f3f5ff",
    borderRadius: 20,
    color: "#444",
  },

  activeSubTab: {
    backgroundColor: "#dce6ff",
    color: "#0a57ff",
    fontWeight: "700",
  },

  label: { fontSize: 14, fontWeight: "600", marginTop: 10 },

  row: { flexDirection: "row", gap: 16, marginTop: 10 },

  rowTwo: { marginTop: 10, fontWeight: "600" },

  dateInput: {
    backgroundColor: "#f6f8fb",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  placeholderText: { color: "#999" },

  dateText: { color: "#111" },

  calendarIcon: { fontSize: 18 },

  input: {
    backgroundColor: "#f6f8fb",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },

  pickerWrap: {
    backgroundColor: "#f6f8fb",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
  },

  picker: { width: "100%" },

  // unchanged default
  halfButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#f3f5ff",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },

  // highlight for selected half  
  activeHalf: {
    backgroundColor: "#dce6ff",
    borderWidth: 1,
    borderColor: "#0a57ff",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 30,
  },

  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0a57ff",
  },

  cancelText: { color: "#0a57ff", fontWeight: "700" },

  leaveBtn: {
    backgroundColor: "#0a57ff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },

  leaveText: { color: "#fff", fontWeight: "700" },
});
