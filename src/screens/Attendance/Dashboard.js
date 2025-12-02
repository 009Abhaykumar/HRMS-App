import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Dashboard() {
  return (
    <View>

      {/* ----------------- DATE RANGE SECTION ----------------- */}
      <View style={styles.dateCard}>
        <View>
          <Text style={styles.dateLabel}>Attendance Starts</Text>
          <Text style={styles.dateLabel}>From</Text>
        </View>

        <View style={styles.dateBox}>
          <Text style={styles.dateText}>14-10-2025</Text>
        </View>

        <Text style={styles.toText}>To</Text>

        <View style={styles.dateBox}>
          <Text style={styles.dateText}>13-11-2025</Text>
        </View>
      </View>

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
      <View style={styles.bigCard}>
        <Text style={styles.bigTitle}>Total Leave Requests</Text>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Pending Requests</Text>
          <Text style={styles.count}>0</Text>
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Approved Requests</Text>
          <Text style={styles.count}>0</Text>
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Rejected Requests</Text>
          <Text style={styles.count}>0</Text>
        </View>
      </View>

      {/* ----------------- TOTAL LEAVES ----------------- */}
      <View style={styles.bigCard}>
        <Text style={styles.bigTitle}>Total Leaves - 0</Text>

        <View style={styles.legendRow}>
          <Text style={styles.dotBlue}>●</Text>
          <Text style={styles.legend}>Short Day Leave - 0</Text>
        </View>

        <View style={styles.legendRow}>
          <Text style={styles.dotYellow}>●</Text>
          <Text style={styles.legend}>HalfDay Leave - 0</Text>
        </View>

        <View style={styles.legendRow}>
          <Text style={styles.dotRed}>●</Text>
          <Text style={styles.legend}>Single Day Leave - 0</Text>
        </View>

        <View style={styles.legendRow}>
          <Text style={styles.dotGreen}>●</Text>
          <Text style={styles.legend}>Multi Day Leave - 0</Text>
        </View>

        <View style={styles.chartEmpty} />
      </View>

      {/* ----------------- TOTAL OUT DUTIES ----------------- */}
      <View style={styles.bigCard}>
        <Text style={styles.bigTitle}>Total Out Duties - 1</Text>

        <View style={styles.legendRow}>
          <Text style={styles.dotBlue}>●</Text>
          <Text style={styles.legend}>Short Day OutDuty - 0</Text>
        </View>

        <View style={styles.legendRow}>
          <Text style={styles.dotYellow}>●</Text>
          <Text style={styles.legend}>HalfDay OutDuty - 0</Text>
        </View>

        <View style={styles.legendRow}>
          <Text style={styles.dotRed}>●</Text>
          <Text style={styles.legend}>Single Day OutDuty - 0</Text>
        </View>

        <View style={styles.legendRow}>
          <Text style={styles.dotGreen}>●</Text>
          <Text style={styles.legend}>Multi Day OutDuty - 1</Text>
        </View>

        <View style={styles.chartEmpty} />
      </View>

      {/* ----------------- TOTAL OUT DUTY REQUESTS ----------------- */}
      <View style={styles.bigCard}>
        <Text style={styles.bigTitle}>Total OutDuty Requests</Text>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Pending Requests</Text>
          <Text style={styles.count}>1</Text>
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Approved Requests</Text>
          <Text style={styles.count}>0</Text>
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Rejected Requests</Text>
          <Text style={styles.count}>0</Text>
        </View>
      </View>

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
