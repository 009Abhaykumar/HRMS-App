import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AttendanceDateRange from "../../components/AttendanceDateRange";
import AttendanceBehaviourCard from "../../components/AttendanceBehaviourCard";
import CalendarCard from "../../components/CalendarCard";
import LeaveRequestCard from "../../components/AttendanceComponents/LeaveRequestCard";
import LeaveSummaryCard from "../../components/AttendanceComponents/LeaveSummaryCard";
import OutDutySummaryCard from "../../components/AttendanceComponents/OutDutySummaryCard";
import OutDutyRequestCard from "../../components/AttendanceComponents/OutDutyRequestCard";


export default function Dashboard() {

  const [selectedMonth, setSelectedMonth] = useState("December");
  const attendanceData = [
    { name: "Present", count: 22, color: "#2ecc71", legendFontColor: "#333" },
    { name: "Out Duty", count: 7, color: "#2980b9", legendFontColor: "#333" },
    { name: "Leave", count: 0, color: "#1abc9c", legendFontColor: "#333" },
    { name: "Absent", count: 2, color: "#e74c3c", legendFontColor: "#333" },
  ];

  return (
    <View>



      {/* Calendar Card */}
      <CalendarCard
        selectedMonth={selectedMonth}
        onChangeMonth={(m) => setSelectedMonth(m)}
      />






      {/* ----------------- ATTENDANCE BEHAVIOUR ----------------- */}

      <AttendanceBehaviourCard
        onTime={11}
        late={0}
        halfDay={1}
        absent={2}
      />



      {/* ----------------- DATE RANGE SECTION ----------------- */}

      <AttendanceDateRange
        initialStartDate={new Date("2025-10-14")}
        initialEndDate={new Date("2025-11-13")}
        onDateChange={(data) => console.log("Updated:", data)}
      />






      {/* ----------------- LEAVE CARDS ----------------- */}
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

      {/* ----------------- TOTAL LEAVE REQUESTS ----------------- */}

      <LeaveRequestCard
        title="Total Leave Requests"
        pending={0}
        approved={0}
        rejected={0}
      />

      {/* ----------------- TOTAL LEAVES ----------------- */}
      <LeaveSummaryCard
        title="Total Leaves"
        total={0}
        shortDay={0}
        halfDay={0}
        singleDay={0}
        multiDay={0}
      />

      {/* ----------------- TOTAL OUT DUTIES ----------------- */}
      <OutDutySummaryCard
        title="Total Out Duties"
        total={1}
        shortDay={0}
        halfDay={0}
        singleDay={0}
        multiDay={1}
      />

      {/* ----------------- TOTAL OUT DUTY REQUESTS ----------------- */}

      <OutDutyRequestCard
        title="Total OutDuty Requests"
        pending={1}
        approved={0}
        rejected={0}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  /* DATE RANGE */
  dateCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateLabel: { fontSize: 15, fontWeight: "600" },
  dateBox: {
    backgroundColor: "#fafbff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  dateText: { fontSize: 15 },
  toText: { fontSize: 15, fontWeight: "600", color: "#555" },

  /* LEAVES */
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

  /* BIG CARD */
  bigCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    marginTop: 15,
  },
  bigTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  /* ROW ITEMS */
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: { fontSize: 15, color: "#333" },
  count: { fontSize: 15, fontWeight: "700" },

  /* EMPTY CHART SPACE */
  chartEmpty: {
    width: "100%",
    height: 150,
    borderRadius: 200,
    backgroundColor: "#f1f3ff",
    marginTop: 15,
  },

  /* LEGEND COLORS */
  legendRow: { flexDirection: "row", alignItems: "center", marginVertical: 2 },
  legend: { fontSize: 14, color: "#444", marginLeft: 6 },

  dotBlue: { color: "#007bff", fontSize: 16 },
  dotYellow: { color: "#f4b400", fontSize: 16 },
  dotRed: { color: "#ff4b4b", fontSize: 16 },
  dotGreen: { color: "#1abc9c", fontSize: 16 },
});
