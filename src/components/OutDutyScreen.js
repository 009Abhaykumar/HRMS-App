// OutDutyScreen.js
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

export default function OutDutyScreen() {
  const [subTab, setSubTab] = useState("Single Day");
  const subTabs = ["Single Day", "Multi Day", "Half Day", "Short Day"];

  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const [half, setHalf] = useState("");

  const formatDate = (d) => {
    if (!d) return "dd-mm-yyyy";
    let dd = String(d.getDate()).padStart(2, "0");
    let mm = String(d.getMonth() + 1).padStart(2, "0");
    let yy = d.getFullYear();
    return `${dd}-${mm}-${yy}`;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 5 }}>

      {/* SAME STYLE AS APPLY LEAVE SCREEN */}
      <View style={styles.subTabRow}>
        {subTabs.map((tab) => (
          <TouchableOpacity key={tab} style={{ flex: 1 }} onPress={() => setSubTab(tab)}>
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

      {/* ---------------- SINGLE DAY ---------------- */}
      {subTab === "Single Day" && (
        <>
          <Text style={styles.label}>Date</Text>

          <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
            <Text style={styles.dateText}>{formatDate(date)}</Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="calendar"
              onChange={(e, sel) => {
                setShowPicker(false);
                if (sel) setDate(sel);
              }}
            />
          )}

          <Text style={styles.label}>Location & Work performed</Text>
          <TextInput style={styles.textArea} placeholder="Description" multiline />
        </>
      )}

      {/* ---------------- MULTI DAY ---------------- */}
      {subTab === "Multi Day" && (
        <>
          <View style={styles.dateRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>From Date</Text>
              <TouchableOpacity style={styles.dateInput} onPress={() => setShowFromPicker(true)}>
                <Text style={styles.dateText}>{formatDate(fromDate)}</Text>
                <Text style={styles.calendarIcon}>📅</Text>
              </TouchableOpacity>

              {showFromPicker && (
                <DateTimePicker
                  value={fromDate || new Date()}
                  mode="date"
                  display="calendar"
                  onChange={(e, sel) => {
                    setShowFromPicker(false);
                    if (sel) setFromDate(sel);
                  }}
                />
              )}
            </View>

            <View style={{ width: 20 }} />

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>To Date</Text>
              <TouchableOpacity style={styles.dateInput} onPress={() => setShowToPicker(true)}>
                <Text style={styles.dateText}>{formatDate(toDate)}</Text>
                <Text style={styles.calendarIcon}>📅</Text>
              </TouchableOpacity>

              {showToPicker && (
                <DateTimePicker
                  value={toDate || new Date()}
                  mode="date"
                  display="calendar"
                  onChange={(e, sel) => {
                    setShowToPicker(false);
                    if (sel) setToDate(sel);
                  }}
                />
              )}
            </View>
          </View>

          <Text style={styles.label}>Location & Work performed</Text>
          <TextInput style={styles.textArea} placeholder="Description" multiline />
        </>
      )}

      {/* ---------------- HALF DAY ---------------- */}
      {subTab === "Half Day" && (
        <>
          <Text style={styles.label}>Date</Text>

          <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
            <Text style={styles.dateText}>{formatDate(date)}</Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="calendar"
              onChange={(e, sel) => {
                setShowPicker(false);
                if (sel) setDate(sel);
              }}
            />
          )}

          {/* SAME "SELECT HALF" UI AS APPLY LEAVE SCREEN */}
          <Text style={styles.label}>Select Half</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.halfButton, half === "first" && styles.activeHalf]}
              onPress={() => setHalf("first")}
            >
              <Text style={{
                color: half === "first" ? "#0a57ff" : "#444",
                fontWeight: half === "first" ? "700" : "600",
              }}>
                First Half
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.halfButton, half === "second" && styles.activeHalf]}
              onPress={() => setHalf("second")}
            >
              <Text style={{
                color: half === "second" ? "#0a57ff" : "#444",
                fontWeight: half === "second" ? "700" : "600",
              }}>
                Second Half
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Location & Work performed</Text>
          <TextInput style={styles.textArea} placeholder="Description" multiline />
        </>
      )}

      {/* ---------------- SHORT DAY ---------------- */}
      {subTab === "Short Day" && (
        <>
          <Text style={styles.label}>Date</Text>

          <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
            <Text style={styles.dateText}>{formatDate(date)}</Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="calendar"
              onChange={(e, sel) => {
                setShowPicker(false);
                if (sel) setDate(sel);
              }}
            />
          )}

          <View style={styles.dateRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Start Time</Text>
              <TextInput style={styles.dateInput} placeholder="--:--:--" />
            </View>

            <View style={{ width: 20 }} />

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>End Time</Text>
              <TextInput style={styles.dateInput} placeholder="--:--:--" />
            </View>
          </View>

          <Text style={styles.label}>Location & Work performed</Text>
          <TextInput style={styles.textArea} placeholder="Description" multiline />
        </>
      )}

    </ScrollView>
  );
}

// ------------------ Styles ------------------
const styles = StyleSheet.create({
  heading: { fontSize: 20, fontWeight: "700", marginVertical: 20 },

  /* Same UI as ApplyLeaveScreen */
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

  label: { fontSize: 15, fontWeight: "600", marginTop: 10 },

  dateInput: {
    backgroundColor: "#f6f8fb",
    padding: 15,
    borderRadius: 12,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateText: { color: "#111" },
  calendarIcon: { fontSize: 18 },

  textArea: {
    backgroundColor: "#f6f8fb",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    height: 120,
    textAlignVertical: "top",
  },

  dateRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  row: {
    flexDirection: "row",
    gap: 16,
    marginTop: 10,
  },

  halfButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#f3f5ff",
    borderRadius: 12,
    alignItems: "center",
  },

  activeHalf: {
    backgroundColor: "#dce6ff",
    borderWidth: 1,
    borderColor: "#0a57ff",
  },
});
