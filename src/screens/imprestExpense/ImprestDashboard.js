import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function ImprestDashboard() {

  const imprestData = [
    {
      id: 1,
      projectRef: "PRJ-2025/41",
      imprestDetails: "Travel Advance",
      amount: "₹6000",
      receivedDate: "Nov 12, 2025",
      approvalStatus: "Pending",
      expenseAmount: "₹2500",
      billRange: "Nov 12 - Nov 15",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.title}>My Imprest & Expenses</Text>

      {imprestData.length === 0 && (
        <Text style={styles.emptyText}>No Imprest Records Found</Text>
      )}

      {imprestData.map((item) => (
        <View key={item.id} style={styles.card}>

          {/* TOP ROW */}
          <View style={styles.topRow}>
            <Text style={styles.projectRef}>{item.projectRef}</Text>
            <View style={[styles.statusChip, styles.statusColor(item.approvalStatus)]}>
              <Text style={styles.statusText}>{item.approvalStatus}</Text>
            </View>
          </View>

          {/* DETAILS GROUP */}
          <View style={styles.detailsBox}>
            <Row label="📄 Imprest Type" value={item.imprestDetails} />
            <Row label="💰 Amount" value={item.amount} bold />
            <Row label="📅 Received on" value={item.receivedDate} />
            <Row label="🧾 Expense Amount" value={item.expenseAmount} color="#0a57ff" bold />
            <Row label="🗓 Bill Date Range" value={item.billRange} />
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.viewText}>View Details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn}>
              <Text style={styles.deleteText}>🗑 Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/* Row Component (Cleaner UI) */
const Row = ({ label, value, bold, color }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[
      styles.rowValue,
      bold && { fontWeight: "700" },
      color && { color }
    ]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: "#f3f6ff", padding: 16 },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#1b2b70",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
    color: "#999",
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#e9ecff",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  projectRef: {
    fontSize: 15,
    fontWeight: "700",
    color: "#003566",
  },

  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusColor: (status) => ({
    backgroundColor:
      status === "Pending"
        ? "#fff2cc"
        : status === "Approved"
        ? "#d3ffd6"
        : "#ffd6d6",
  }),

  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
  },

  detailsBox: {
    marginVertical: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    paddingVertical: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  rowLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },

  rowValue: {
    fontSize: 14,
    color: "#333",
    maxWidth: "55%",
    textAlign: "right",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  viewBtn: {
    backgroundColor: "#e9f0ff",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  deleteBtn: {
    backgroundColor: "#ffe3e3",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  viewText: { color: "#0a57ff", fontWeight: "700", fontSize: 14 },
  deleteText: { color: "#d12b2b", fontWeight: "700", fontSize: 14 },
});
