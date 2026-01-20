import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LeaveSummaryCard({
  title = "Total Leaves",
  total = 0,
  shortDay = 0,
  halfDay = 0,
  singleDay = 0,
  multiDay = 0,
}) {
  return (
    <View style={styles.bigCard}>
      <Text style={styles.bigTitle}>{`${title} - ${total}`}</Text>

      <View style={styles.legendRow}>
        <Text style={styles.dotBlue}>●</Text>
        <Text style={styles.legend}>{`Short Day Leave - ${shortDay}`}</Text>
      </View>

      <View style={styles.legendRow}>
        <Text style={styles.dotYellow}>●</Text>
        <Text style={styles.legend}>{`HalfDay Leave - ${halfDay}`}</Text>
      </View>

      <View style={styles.legendRow}>
        <Text style={styles.dotRed}>●</Text>
        <Text style={styles.legend}>{`Single Day Leave - ${singleDay}`}</Text>
      </View>

      <View style={styles.legendRow}>
        <Text style={styles.dotGreen}>●</Text>
        <Text style={styles.legend}>{`Multi Day Leave - ${multiDay}`}</Text>
      </View>

      <View style={styles.chartEmpty} />
    </View>
  );
}

const styles = StyleSheet.create({
  bigCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    marginTop: 15,
    marginBottom:10
  },
  bigTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  legendRow: { flexDirection: "row", alignItems: "center", marginVertical: 2 },
  legend: { fontSize: 14, color: "#444", marginLeft: 6 },

  chartEmpty: {
    width: "100%",
    height: 150,
    borderRadius: 200,
    backgroundColor: "#f1f3ff",
    marginTop: 15,
  },

  dotBlue: { color: "#007bff", fontSize: 16 },
  dotYellow: { color: "#f4b400", fontSize: 16 },
  dotRed: { color: "#ff4b4b", fontSize: 16 },
  dotGreen: { color: "#1abc9c", fontSize: 16 },
});
