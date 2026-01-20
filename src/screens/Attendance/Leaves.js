import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import LeaveRequestCard from "../../components/AttendanceComponents/LeaveRequestCard";
import LeaveSummaryCard from "../../components/AttendanceComponents/LeaveSummaryCard";

export default function Leaves() {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const leaveRequests = [
    {
      id: 1,
      date: "Nov 14, 2025",
      type: "Previous Leave",
      duration: "Short Leave",
      attendanceData: {
        date: "Nov 14, 2025",
        inTime: "09:47:26",
        outTime: "18:03:23",
        duration: "8.27 Hr",
        dayStatus: "Half Day",
        attendanceStatus: "Present",
      },
      reason: "Due to high traffic.",
      statusRH: "Approved",
      statusAdmin: "Rejected",
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: "#f3f6ff", paddingBottom: 50 }}>

      {/* ------- Request Summary Cards -------- */}
      <LeaveRequestCard title="Total Leave Requests" pending={0} approved={0} rejected={0} />

      <LeaveSummaryCard
        title="Total Leaves"
        total={0}
        shortDay={0}
        halfDay={0}
        singleDay={0}
        multiDay={0}
      />

      {/* ------- Leave Type Cards -------- */}
      <View style={styles.leaveRow}>
        <View style={[styles.leaveCard, { borderLeftColor: "#4c8bf5" }]}>
          <Text style={styles.leaveTitle}>Previous : 0</Text>
          <Text style={styles.leaveSub}>Available</Text>
        </View>

        <View style={[styles.leaveCard, { borderLeftColor: "#ffb133" }]}>
          <Text style={styles.leaveTitle}>Earned : 0</Text>
          <Text style={styles.leaveSub}>Available</Text>
        </View>
      </View>

      <View style={styles.leaveRow}>
        <View style={[styles.leaveCard, { borderLeftColor: "#23b04f" }]}>
          <Text style={styles.leaveTitle}>Casual : 0</Text>
          <Text style={styles.leaveSub}>Available</Text>
        </View>

        <View style={[styles.leaveCard, { borderLeftColor: "#ff4b4b" }]}>
          <Text style={styles.leaveTitle}>Sick : 0</Text>
          <Text style={styles.leaveSub}>Available</Text>
        </View>
      </View>

      {/* ------- New Leave Request Card Layout -------- */}

      <Text style={styles.sectionTitle}>Leave Requests</Text>

      {leaveRequests.length === 0 && (
        <Text style={styles.emptyText}>No leave records found</Text>
      )}

      {leaveRequests.map((item) => (
        <View key={item.id} style={styles.card}>
          
          {/* Top */}
          <View style={styles.cardTop}>
            <Text style={styles.dateText}>{item.date}</Text>

            <View style={[
              styles.statusChip,
              { backgroundColor: item.statusAdmin === "Rejected" ? "#ffd6d6" : "#d3ffd6" }
            ]}>
              <Text style={styles.statusText}>{item.statusAdmin}</Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.detailsBox}>
            <Row label="Duration" value={item.duration} />
            <Row label="Reason" value={item.reason} />
            <Row label="RH Status" value={item.statusRH} color="green" />
            <Row label="Admin Status" value={item.statusAdmin} color="red" />
          </View>

          {/* View Button */}
          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => {
              setSelectedRow(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.viewText}>👁 View Attendance</Text>
          </TouchableOpacity>

        </View>
      ))}

      {/* ------- MODAL -------- */}
      {selectedRow && (
        <Modal transparent animationType="fade" visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              
              <Text style={styles.modalTitle}>
                Attendance Summary - {selectedRow.attendanceData.date}
              </Text>

              <Row label="In Time" value={selectedRow.attendanceData.inTime} modal />
              <Row label="Out Time" value={selectedRow.attendanceData.outTime} modal />
              <Row label="Work Duration" value={selectedRow.attendanceData.duration} modal />
              <Row label="Day Status" value={selectedRow.attendanceData.dayStatus} modal />
              <Row label="Attendance Status" value={selectedRow.attendanceData.attendanceStatus} modal />

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      )}

    </ScrollView>
  );
}

/* 🔹 Reusable Key Value Row */
const Row = ({ label, value, color, modal }) => (
  <View style={[styles.row, modal && { borderBottomWidth: 1, borderColor: "#eee", paddingVertical: 10 }]}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[styles.rowValue, color && { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  leaveRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 15, paddingHorizontal: 10 },
  leaveCard: { width: "48%", padding: 14, backgroundColor: "#fff", borderRadius: 12, elevation: 2, borderLeftWidth: 4 },
  leaveTitle: { fontSize: 16, fontWeight: "700" },
  leaveSub: { color: "#6f6f6f" },

  sectionTitle: { fontSize: 20, fontWeight: "700", marginTop: 20, marginBottom: 10, textAlign: "center" },

  /* ---- NEW CARD STYLE ---- */
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 18,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e9ecff",
  },

  cardTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },

  dateText: { fontSize: 15, fontWeight: "700", color: "#1b2b70" },

  statusChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  statusText: { fontSize: 13, fontWeight: "600" },

  detailsBox: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#e6e6e6", paddingVertical: 10, marginTop: 5 },

  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  rowLabel: { fontSize: 14, fontWeight: "600", color: "#444" },
  rowValue: { fontSize: 14, color: "#333", maxWidth: "55%", textAlign: "right" },

  viewBtn: { backgroundColor: "#e9f0ff", paddingVertical: 10, borderRadius: 10, marginTop: 14, alignItems: "center" },
  viewText: { color: "#0a57ff", fontWeight: "700", fontSize: 14 },

  emptyText: { textAlign: "center", marginTop: 20, color: "#9AA0A6", fontSize: 14 },

  /* ---- MODAL ---- */
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 12, margin: 30 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  closeBtn: { backgroundColor: "#4c8bf5", paddingVertical: 12, marginTop: 15, borderRadius: 10, alignItems: "center" },
});
