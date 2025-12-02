import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function MonthSelector({ selectedMonth, onChange }) {
  const [open, setOpen] = useState(false);

  const months = [
    "This Month",
    "Last Month",
    "September 2025",
    "August 2025",
    "July 2025",
  ];

  return (
    <View style={{ alignItems: "flex-end" }}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Text style={styles.selectedText}>{selectedMonth} ▼</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {months.map((month) => (
            <TouchableOpacity
              key={month}
              onPress={() => {
                onChange(month);
                setOpen(false);
              }}
            >
              <Text
                style={[
                  styles.option,
                  month === selectedMonth && styles.activeOption,
                ]}
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectedText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  dropdown: {
    position: "absolute",
    top: 25,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    zIndex: 100,
  },
  option: {
    paddingVertical: 8,
    fontSize: 14,
    color: "#444",
  },
  activeOption: {
    color: "#0a57ff",
    fontWeight: "700",
  },
});
