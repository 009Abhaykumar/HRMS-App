import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import OutDutySummaryCard from "../../components/AttendanceComponents/OutDutySummaryCard";
import OutDutyRequestCard from "../../components/AttendanceComponents/OutDutyRequestCard";

export default function OutDuty() {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // 🔥 READY FOR API (Supports Single + Multiple View)
  const outDutyRequests = [
    {
      id: 1,
      date: "Nov 17, 2025",
      duration: "Single",
      reason: "Convocation",
      attendanceData: {
        date: "Nov 17, 2025",
        inTime: "00:00:00",
        outTime: "00:00:00",
        duration: "0 Hr",
        dayStatus: "Absent",
        attendanceStatus: "Absent",
      },
      statusRH: "Pending",
      statusAdmin: "Pending",
    },
    {
      id: 2,
      date: "Nov 04–Nov 10, 2025",
      duration: "Multiple",
      reason: "On-Boarding",
      attendanceData: [
        { date: "Nov 10, 2025", inTime: "00:00", outTime: "00:00", duration: "0 Hr", dayStatus: "OutDuty", attendanceStatus: "Present" },
        { date: "Nov 09, 2025", inTime: "00:00", outTime: "00:00", duration: "0 Hr", dayStatus: "OutDuty", attendanceStatus: "Present" },
        { date: "Nov 08, 2025", inTime: "00:00", outTime: "00:00", duration: "0 Hr", dayStatus: "OutDuty", attendanceStatus: "Present" },
      ],
      statusRH: "Approved",
      statusAdmin: "Approved",
    }
  ];

  return (
    <ScrollView style={{ backgroundColor: "#f3f6ff", paddingBottom: 50 }}>

      <OutDutyRequestCard title="Total OutDuty Requests" pending={1} approved={0} rejected={0} />
      <OutDutySummaryCard title="Total Out Duties" total={1} shortDay={0} halfDay={0} singleDay={0} multiDay={1} />

      {/* -------- TITLE -------- */}
      <Text style={styles.sectionTitle}>OutDuty Requests</Text>

      {/* 🎯 New Card-Based Request UI */}
      {outDutyRequests.length === 0 && (
        <Text style={styles.emptyText}>No records found</Text>
      )}

      {outDutyRequests.map((item) => (
        <View key={item.id} style={styles.card}>
          
          {/* Top Information */}
          <View style={styles.cardTop}>
            <Text style={styles.dateText}>{item.date}</Text>

            <View style={[
              styles.statusChip,
              { backgroundColor: item.statusAdmin === "Rejected"
                  ? "#ffd6d6"
                  : item.statusAdmin === "Approved"
                  ? "#d6ffe3"
                  : "#ffe9c7"
              }
            ]}>
              <Text style={styles.statusText}>{item.statusAdmin}</Text>
            </View>
          </View>

          {/* Details Section */}
          <View style={styles.detailsBox}>
            <Row label="Duration" value={item.duration} />
            <Row label="Reason" value={item.reason} />
            <Row label="RH Status" value={item.statusRH} color="green" />
            <Row label="Admin Status" value={item.statusAdmin} color={item.statusAdmin === "Rejected" ? "red" : "orange"} />
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

      {/* -------- MODAL -------- */}
      {selectedRow && (
        <Modal transparent animationType="fade" visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              
              <Text style={styles.modalTitle}>
                Attendance Summary - {selectedRow.date}
              </Text>

              {/* --- SINGLE REQUEST LAYOUT --- */}
              {selectedRow.duration === "Single" && (
                <>
                  <Row label="In Time" value={selectedRow.attendanceData.inTime} modal />
                  <Row label="Out Time" value={selectedRow.attendanceData.outTime} modal />
                  <Row label="Work Duration" value={selectedRow.attendanceData.duration} modal />
                  <Row label="Day Status" value={selectedRow.attendanceData.dayStatus} modal />
                  <Row label="Attendance Status" value={selectedRow.attendanceData.attendanceStatus} modal />
                </>
              )}

              {/* --- MULTIPLE REQUEST LAYOUT --- */}
              {selectedRow.duration === "Multiple" && (
                <View style={{ marginTop: 10 }}>
                  {selectedRow.attendanceData.map((d, i) => (
                    <View key={i} style={styles.multiRow}>
                      <Text style={styles.multiText}>{d.date}</Text>
                      <Text style={styles.multiValue}>{d.attendanceStatus}</Text>
                    </View>
                  ))}
                </View>
              )}

              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      )}

    </ScrollView>
  );
}

/* ✅ Shared reusable Row Component */
const Row = ({ label, value, color, modal }) => (
  <View style={[styles.row, modal && { borderBottomWidth: 1, borderColor: "#eee", paddingVertical: 10 }]}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[styles.rowValue, color && { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },

  /* Card Layout */
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

  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  dateText: { fontSize: 15, fontWeight: "700", color: "#1b2b70" },

  statusChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  statusText: { fontSize: 13, fontWeight: "600" },

  detailsBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    paddingVertical: 10,
    marginTop: 8,
  },

  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  rowLabel: { fontSize: 14, fontWeight: "600", color: "#444" },
  rowValue: { fontSize: 14, maxWidth: "55%", textAlign: "right" },

  viewBtn: { backgroundColor: "#e9f0ff", paddingVertical: 10, borderRadius: 10, marginTop: 14, alignItems: "center" },
  viewText: { color: "#0a57ff", fontWeight: "700", fontSize: 14 },

  emptyText: { textAlign: "center", color: "#9AA0A6", marginTop: 20 },

  /* Modal */
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 12, margin: 30 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  multiRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  multiText: { fontSize: 14, fontWeight: "600" },
  multiValue: { fontSize: 14, color: "#007bff", fontWeight: "700" },

  closeBtn: {
    backgroundColor: "#4c8bf5",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
});
