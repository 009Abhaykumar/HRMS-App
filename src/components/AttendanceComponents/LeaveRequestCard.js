import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LeaveRequestCard = ({ title = "Total Leave Requests", pending = 0, approved = 0, rejected = 0 }) => {
  return (
    <View style={styles.bigCard}>
      <Text style={styles.bigTitle}>{title}</Text>

      <View style={styles.rowItem}>
        <Text style={styles.label}>Pending Requests</Text>
        <Text style={styles.count}>{pending}</Text>
      </View>

      <View style={styles.rowItem}>
        <Text style={styles.label}>Approved Requests</Text>
        <Text style={styles.count}>{approved}</Text>
      </View>

      <View style={styles.rowItem}>
        <Text style={styles.label}>Rejected Requests</Text>
        <Text style={styles.count}>{rejected}</Text>
      </View>
    </View>
  );
};

export default LeaveRequestCard;

const styles = StyleSheet.create({
  bigCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    marginTop: 10,
  },
  bigTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: { fontSize: 15, color: "#333" },
  count: { fontSize: 15, fontWeight: "700" },
});
