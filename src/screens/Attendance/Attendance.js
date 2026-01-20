import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import AttendanceDateRange from "../../components/AttendanceDateRange";
import AttendanceBehaviourCard from "../../components/AttendanceBehaviourCard";
import CalendarCard from "../../components/CalendarCard";
import LeaveRequestCard from "../../components/AttendanceComponents/LeaveRequestCard";
import LeaveSummaryCard from "../../components/AttendanceComponents/LeaveSummaryCard";
import OutDutySummaryCard from "../../components/AttendanceComponents/OutDutySummaryCard";
import OutDutyRequestCard from "../../components/AttendanceComponents/OutDutyRequestCard";

export default function Dashboard() {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Later this data will come from API
  const attendanceHistory = [
    {
      id: 1,
      date: "Nov 04, 2025",
      punchIn: "09:16:35",
      punchOut: "18:19:42",
      hours: "9.05",
      behaviour: "OnTime",
      status: "Present",
    },
    {
      id: 2,
      date: "Nov 07, 2025",
      punchIn: "00:00:00",
      punchOut: "00:00:00",
      hours: "0",
      behaviour: "WeeklyOff",
      status: "WeeklyOff",
    },
    {
      id: 3,
      date: "Nov 07, 2025",
      punchIn: "00:00:00",
      punchOut: "00:00:00",
      hours: "0",
      behaviour: "WeeklyOff",
      status: "WeeklyOff",
    },
    {
      id: 4,
      date: "Nov 07, 2025",
      punchIn: "00:00:00",
      punchOut: "00:00:00",
      hours: "0",
      behaviour: "WeeklyOff",
      status: "WeeklyOff",
    },
    {
      id: 5,
      date: "Nov 07, 2025",
      punchIn: "00:00:00",
      punchOut: "00:00:00",
      hours: "0",
      behaviour: "WeeklyOff",
      status: "WeeklyOff",
    },
    {
      id: 6,
      date: "Nov 07, 2025",
      punchIn: "00:00:00",
      punchOut: "00:00:00",
      hours: "0",
      behaviour: "WeeklyOff",
      status: "WeeklyOff",
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: "#f3f6ff" }} showsVerticalScrollIndicator={false}>

      {/* Calendar */}
      <CalendarCard />

      {/* Behaviour Summary */}
      <AttendanceBehaviourCard onTime={11} late={0} halfDay={1} absent={2} />

      {/* Date Range */}
      <AttendanceDateRange
        initialStartDate={new Date("2025-10-14")}
        initialEndDate={new Date("2025-11-13")}
      />

      {/* Leave Available */}
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

      {/* Summary Cards */}
      <LeaveRequestCard title="Total Leave Requests" pending={0} approved={0} rejected={0} />
      <LeaveSummaryCard title="Total Leaves" total={0} shortDay={0} halfDay={0} singleDay={0} multiDay={0} />
      <OutDutySummaryCard title="Total Out Duties" total={1} shortDay={0} halfDay={0} singleDay={0} multiDay={1} />
      <OutDutyRequestCard title="Total OutDuty Requests" pending={1} approved={0} rejected={0} />


      {/* NEW MOBILE FRIENDLY TABLE */}
      <Text style={styles.sectionTitle}>Attendance History</Text>

      {attendanceHistory.map((item, index) => (
        <View key={item.id} style={styles.card}>

          <View style={styles.rowHeader}>
           
            <Text style={styles.rowDate}>{item.date}</Text>
            <Text style={[styles.status, item.status === "Present" ? styles.present : styles.weekoff]}>
              {item.status}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => {
              setSelectedRow(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.viewText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}


      {/* 📌 MODAL FOR DETAILS */}
      {selectedRow && (
        <Modal transparent animationType="fade" visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>

              <Text style={styles.modalTitle}>
                Attendance Summary: {selectedRow.date}
              </Text>

              {[
                ["Date", selectedRow.date],
                ["Punch In", selectedRow.punchIn],
                ["Punch Out", selectedRow.punchOut],
                ["Hours", selectedRow.hours],
                ["Behaviour", selectedRow.behaviour],
                ["Status", selectedRow.status],
              ].map(([key, value], i) => (
                <View style={styles.modalRow} key={i}>
                  <Text style={styles.modalKey}>{key}</Text>
                  <Text style={styles.modalValue}>{value}</Text>
                </View>
              ))}

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowNumber: { fontWeight: "700" },
  rowDate: { fontWeight: "600", color: "#333" },

  status: { fontWeight: "700" },
  present: { color: "green" },
  weekoff: { color: "#4c8bf5" },

  viewBtn: {
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e9f0ff",
    alignItems: "center",
  },
  viewText: { color: "#0a57ff", fontWeight: "700" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "88%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 18 },

  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalKey: { fontSize: 15, fontWeight: "600" },
  modalValue: { fontSize: 15 },

  closeBtn: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#4c8bf5",
    borderRadius: 10,
    alignItems: "center",
  },

  leaveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leaveCard: {
    width: "48%",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    borderLeftWidth: 4,
  },
  leaveTitle: { fontSize: 16, fontWeight: "700" },
  leaveSub: { fontSize: 14, color: "#666" },
});
