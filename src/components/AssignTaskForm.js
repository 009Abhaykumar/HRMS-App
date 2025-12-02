// AssignTaskForm.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

export default function AssignTaskForm() {
  const [task, setTask] = useState("");

  // DEADLINE DATE PICKER
  const [deadline, setDeadline] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  // PRIORITY (Single-select like half-day buttons)
  const [priority, setPriority] = useState("Low");

  // STATIC EMPLOYEE LIST
  const employees = [
    { id: "1", name: "Aayushi", code: "CIPL10027" },
    { id: "2", name: "Shivam Sharma", code: "CIPL10009" },
    { id: "3", name: "Sahil Sharma", code: "CIPL10035" },
    { id: "4", name: "Sakshi Devi", code: "CIPL10016" },
    { id: "5", name: "Amit Kumar", code: "CIPL10021" },
  ];

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCC, setSelectedCC] = useState("");

  const formatDate = (d) => {
    if (!d) return "dd-mm-yyyy";
    let dd = String(d.getDate()).padStart(2, "0");
    let mm = String(d.getMonth() + 1).padStart(2, "0");
    let yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const onDateChange = (event, selected) => {
    setShowPicker(Platform.OS === "ios");
    if (selected) setDeadline(selected);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      
      {/* Task */}
      <Text style={styles.label}>Task</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Task Description"
        multiline
        value={task}
        onChangeText={setTask}
      />

      {/* Deadline */}
      <Text style={styles.label}>Deadline Date</Text>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>{formatDate(deadline)}</Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          mode="date"
          value={deadline || new Date()}
          display="calendar"
          onChange={onDateChange}
        />
      )}

      {/* Priority (Updated Like Half-Day UI) */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityRow}>
        {["Low", "Medium", "High"].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.priorityBtn, priority === p && styles.priorityActive]}
            onPress={() => setPriority(p)}
          >
            <Text
              style={[
                styles.priorityText,
                priority === p && styles.priorityActiveText,
              ]}
            >
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Assign To */}
      <Text style={styles.label}>
        Assign To <Text style={{ color: "red" }}>*</Text>
      </Text>

      <View style={styles.pickerBox}>
        <Picker selectedValue={selectedEmployee} onValueChange={setSelectedEmployee}>
          <Picker.Item label="Select Employee" value="" />
          {employees.map((e) => (
            <Picker.Item key={e.id} label={`${e.name} - ${e.code}`} value={e.id} />
          ))}
        </Picker>
      </View>

      {/* CC */}
      <Text style={styles.label}>CC</Text>

      <View style={styles.pickerBox}>
        <Picker selectedValue={selectedCC} onValueChange={setSelectedCC}>
          <Picker.Item label="Select..." value="" />
          {employees.map((e) => (
            <Picker.Item key={e.id} label={`${e.name} - ${e.code}`} value={e.id} />
          ))}
        </Picker>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
  },

  textarea: {
    backgroundColor: "#f5f6fa",
    padding: 14,
    borderRadius: 10,
    height: 120,
    marginTop: 5,
    textAlignVertical: "top",
    fontSize: 15,
  },

  dateInput: {
    backgroundColor: "#f6f8fb",
    padding: 14,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateText: { color: "#111", fontSize: 15 },
  calendarIcon: { fontSize: 18 },

  /* Priority buttons - Same UI as Half Day buttons */
  priorityRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },

  priorityBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#f3f5ff",
    borderRadius: 12,
    alignItems: "center",
  },

  priorityActive: {
    backgroundColor: "#dce6ff",
    borderWidth: 1,
    borderColor: "#0a57ff",
  },

  priorityText: {
    fontSize: 15,
    color: "#444",
    fontWeight: "600",
  },

  priorityActiveText: {
    color: "#0a57ff",
    fontWeight: "700",
  },

  pickerBox: {
    backgroundColor: "#f6f8fb",
    borderRadius: 10,
    marginTop: 5,
    overflow: "hidden",
  },
});
