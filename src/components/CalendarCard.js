import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MonthSelector } from "./MonthSelector";

export default function CalendarCard({
  title = "Calendar",
  selectedMonth,
  onChangeMonth,
  children,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>{title}</Text>

        <MonthSelector
          selectedMonth={selectedMonth}
          onChange={onChangeMonth}
        />
      </View>

      <Text style={styles.subtitle}>Calendar UI Coming…</Text>

      <View style={styles.placeholderBox}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: "#888",
    marginBottom: 10,
    marginTop: 5,
  },
  placeholderBox: {
    height: 150,
    backgroundColor: "#eef2ff",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
