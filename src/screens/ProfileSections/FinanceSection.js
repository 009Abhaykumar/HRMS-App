import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

export default function FinanceSection() {
  const finance = useSelector((state) => state.finance);

  const months = Object.keys(finance.monthsData);

  const [selectedMonth, setSelectedMonth] = useState(months[months.length - 1]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const data = finance.monthsData[selectedMonth];

  // SMART LABELS (This Month, Last Month, Nov 2025 etc.)
  const getFormattedMonth = (key) => {
    const [year, month] = key.split("-");
    const date = new Date(year, month - 1);

    const now = new Date();
    const currentKey = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;
    const lastKey = `${now.getFullYear()}-${String(now.getMonth()).padStart(
      2,
      "0"
    )}`;

    if (key === currentKey) return "This Month";
    if (key === lastKey) return "Last Month";

    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  // Status Colors
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "green";
      case "approved":
        return "#1A73E8";
      case "rejected":
        return "red";
      case "pending":
        return "#ff9800";
      default:
        return "#333";
    }
  };

  const [tab, setTab] = useState("salary");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Salary Structure</Text>

        <TouchableOpacity
          style={styles.monthSelector}
          onPress={() => setDropdownOpen(!dropdownOpen)}
        >
          <Text style={styles.monthText}>{getFormattedMonth(selectedMonth)}</Text>
          <Text style={styles.arrow}>▾</Text>
        </TouchableOpacity>
      </View>

      {/* MONTH DROPDOWN */}
      {dropdownOpen && (
        <View style={styles.dropdown}>
          {months.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedMonth(key);
                setDropdownOpen(false);
              }}
            >
              <Text style={styles.dropdownText}>{getFormattedMonth(key)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* GRAPH PLACEHOLDER */}
      <View style={styles.graphBox}>
        <Text style={styles.graphText}>📊 Graph Coming Soon</Text>
      </View>

      {/* SUMMARY CARDS */}
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Standard Salary</Text>
          <Text style={styles.cardValue}>₹ {data.standardSalary}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total Days</Text>
          <Text style={styles.cardValue}>{data.totalDays} Days</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Upcoming Salary</Text>
          <Text style={styles.cardValue}>₹ {data.upcomingSalary}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Pay Days</Text>
          <Text style={styles.cardValue}>{data.payDays} Days</Text>
        </View>
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab("salary")} style={styles.tabBtn}>
          <Text style={[styles.tabText, tab === "salary" && styles.activeTab]}>
            Salary Slips
          </Text>
          {tab === "salary" && <View style={styles.tabLine} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTab("advance")} style={styles.tabBtn}>
          <Text style={[styles.tabText, tab === "advance" && styles.activeTab]}>
            Advance Slips
          </Text>
          {tab === "advance" && <View style={styles.tabLine} />}
        </TouchableOpacity>
      </View>

      {/* SALARY TABLE */}
      {tab === "salary" && (
        <View style={styles.table}>
          <Text style={styles.tableTitle}>Salary Slip List</Text>

          <View style={styles.tableHead}>
            <Text style={styles.th}>Sr.</Text>
            <Text style={styles.thWide}>Month</Text>
            <Text style={styles.th}>Days</Text>
            <Text style={styles.th}>Net Pay</Text>
          </View>

          {finance.salarySlips.map((item, index) => (
            <View key={item.id} style={styles.tr}>
              <Text style={styles.td}>{index + 1}</Text>
              <Text style={styles.tdWide}>{item.month} {item.year}</Text>
              <Text style={styles.td}>{item.payDays}</Text>
              <Text style={styles.td}>₹ {item.netPay}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ADVANCE TABLE */}
      {tab === "advance" && (
        <View style={styles.table}>
          <Text style={styles.tableTitle}>Advance Slip Request</Text>

          <View style={styles.tableHead}>
            <Text style={styles.th}>Sr.</Text>
            <Text style={styles.thWide}>Date</Text>
            <Text style={styles.th}>Amount</Text>
            <Text style={styles.th}>Status</Text>
          </View>

          {finance.advanceSlips.map((item, index) => (
            <View key={item.id} style={styles.tr}>
              <Text style={styles.td}>{index + 1}</Text>
              <Text style={styles.tdWide}>{item.requestDate}</Text>
              <Text style={styles.td}>₹ {item.amount}</Text>

              <Text
                style={[
                  styles.td,
                  { color: getStatusColor(item.status), fontWeight: "700" },
                ]}
              >
                {item.status}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={{ height: 30 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#F2F5FF" },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A73E8",
  },

  monthSelector: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
  },

  monthText: { color: "#1A73E8", fontWeight: "700", fontSize: 14 },
  arrow: { marginLeft: 6, color: "#1A73E8", fontSize: 16 },

  dropdown: {
    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 5,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },

  dropdownText: { fontSize: 15, color: "#333", textAlign: "center" },

  graphBox: {
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 20,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  graphText: { color: "#888", fontSize: 16 },

  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    marginBottom: 12,
  },

  cardLabel: { color: "#777", fontSize: 14 },
  cardValue: { color: "#1A73E8", fontSize: 20, fontWeight: "700" },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 10,
  },

  tabBtn: { alignItems: "center" },
  tabText: { fontSize: 16, color: "#666" },
  activeTab: { color: "#1A73E8", fontWeight: "700" },

  tabLine: {
    height: 3,
    width: 90,
    backgroundColor: "#1A73E8",
    marginTop: 5,
    borderRadius: 20,
  },

  table: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 4,
    padding: 15,
    marginTop: 10,
  },

  tableTitle: {
    color: "#1A73E8",
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 10,
    textAlign: "center",
  },

  tableHead: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },

  th: {
    width: "20%",
    fontWeight: "700",
    color: "#555",
    textAlign: "center",
  },

  thWide: {
    width: "40%",
    fontWeight: "700",
    color: "#555",
    textAlign: "center",
  },

  tr: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 6,
  },

  td: {
    width: "20%",
    color: "#333",
    textAlign: "center",
  },

  tdWide: {
    width: "40%",
    color: "#333",
    textAlign: "center",
  },
});
