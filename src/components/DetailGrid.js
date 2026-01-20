import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailGrid({ title, rows }) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {rows.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value || "—"}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A73E8",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    color: "#555",
    width: "45%",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    width: "50%",
    textAlign: "right",
    color: "#222",
    fontWeight: "600",
  },
});
