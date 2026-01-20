import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AttendanceBehaviourCard({
  onTime = 0,
  late = 0,
  halfDay = 0,
  absent = 0,
  loading = false,
}) {
  return (
    <View style={styles.card}>
      {/* Left Side Text */}
      <View style={styles.leftColumn}>
        <Text style={styles.label}>Behaviour:</Text>

        <Text style={styles.item}>
          <Text style={[styles.dot, { color: "#2ecc71" }]}>● </Text>
          On Time - {onTime}
        </Text>

        <Text style={styles.item}>
          <Text style={[styles.dot, { color: "#f4b400" }]}>● </Text>
          Late - {late}
        </Text>

        <Text style={styles.item}>
          <Text style={[styles.dot, { color: "#ff6f7d" }]}>● </Text>
          Half Day - {halfDay}
        </Text>

        <Text style={styles.item}>
          <Text style={[styles.dot, { color: "#e74c3c" }]}>● </Text>
          Absent - {absent}
        </Text>
      </View>

      {/* Right Side Placeholder Donut */}

      <View style={styles.donutPlaceholder}>
        <Text style={styles.donutText}>
          {loading ? "Loading..." : "Graph"} 
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftColumn: {
    width: "45%",
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  item: {
    fontSize: 14,
    marginVertical: 2,
    color: "#333",
  },

  dot: {
    fontSize: 18,
  },

  donutPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eef2ff",
    borderWidth: 10,
    borderColor: "#dce4ff",
    justifyContent: "center",
    alignItems: "center",
  },

  donutText: {
    fontSize: 12,
    color: "#999",
  },
});
