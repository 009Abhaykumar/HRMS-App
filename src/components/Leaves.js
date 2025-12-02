import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Leaves = () => {
  
  const renderLeaveCard = (title, count) => (
    <View style={styles.leaveCard}>
      <Text style={styles.leaveTitle}>{title}</Text>
      <Text style={styles.leaveCount}>{count}</Text>
    </View>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Available Leaves</Text>

      <View style={styles.leaveRow}>
        {renderLeaveCard("Previous", "0 Available")}
        {renderLeaveCard("Earned", "0 Available")}
      </View>

      <View style={styles.leaveRow}>
        {renderLeaveCard("Casual", "0 Available")}
        {renderLeaveCard("Sick", "0 Available")}
      </View>

      <View style={styles.pendingRow}>
        <Text style={styles.pendingText}>🟡 Leave Requests Pending – 0</Text>
        <Text style={styles.pendingText}>🔵 Outduty Requests Pending – 0</Text>
      </View>
    </View>
  );
};

// ------------ Styles ------------
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  leaveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leaveCard: {
    width: "48%",
    padding: 14,
    backgroundColor: "#f4f6ff",
    borderRadius: 10,
  },
  leaveTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  leaveCount: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },
  pendingRow: {
    marginTop: 12,
  },
  pendingText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 3,
  },
});

export default Leaves;
