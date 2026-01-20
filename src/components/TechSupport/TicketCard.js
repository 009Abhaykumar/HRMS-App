import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const STATUS_COLORS = {
  Pending: { bg: "#FFE8CC", text: "#FF8C00" },
  Completed: { bg: "#DFF6E0", text: "#1E8E3E" },
  Closed: { bg: "#E0E0E0", text: "#555" },
};

export default function TicketCard({ ticket }) {
  const colors = STATUS_COLORS[ticket.status] || STATUS_COLORS.Pending;

  return (
    <View style={styles.card}>
      <Text style={styles.id}>#{ticket.id}</Text>

      <Text style={styles.email}>{ticket.email}</Text>
      <Text style={styles.name}>{ticket.name}</Text>

      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.task}>{ticket.task}</Text>

      <View style={styles.footer}>
        <Text style={styles.date}>{ticket.date}</Text>

        <View style={[styles.status, { backgroundColor: colors.bg }]}>
          <Text style={[styles.statusText, { color: colors.text }]}>
            {ticket.status}
          </Text>
        </View>

        <Icon name="chat-outline" size={22} color="#1A73E8" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
  },
  id: {
    color: "#1A73E8",
    fontWeight: "700",
  },
  email: {
    color: "#777",
    marginTop: 4,
  },
  name: {
    fontWeight: "700",
    marginBottom: 6,
  },
  title: {
    fontWeight: "700",
  },
  task: {
    color: "#555",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  date: {
    color: "#777",
    fontSize: 12,
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: "700",
    fontSize: 12,
  },
});
