import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; 

const HistoryLogsSection = () => {
  const statusOptions = ["All", "Pending", "Approved", "Rejected"];

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("compOff");

  // Dummy Data
  const compOffLogs = []; 
  const employeeHistory = [];

  const filteredCompOff =
    selectedStatus === "All"
      ? compOffLogs
      : compOffLogs.filter((item) => item.status === selectedStatus);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("compOff")}
          style={styles.tabBtn}
        >
          <Text
            style={[styles.tabText, activeTab === "compOff" && styles.activeTab]}
          >
            Leave Comp Off
          </Text>
          {activeTab === "compOff" && <View style={styles.tabLine} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("history")}
          style={styles.tabBtn}
        >
          <Text
            style={[styles.tabText, activeTab === "history" && styles.activeTab]}
          >
            Employee History
          </Text>
          {activeTab === "history" && <View style={styles.tabLine} />}
        </TouchableOpacity>
      </View>

      {/* MAIN CARD */}
      <View style={styles.card}>
        {activeTab === "compOff" && (
          <>
            <Text style={styles.title}>Employee Compensatory Logs</Text>

            {/* FILTER DROPDOWN */}
            <TouchableOpacity
              style={styles.filterDropdown}
              onPress={() => setDropdownOpen(!dropdownOpen)}
            >
              {/* 🔥 REPLACED EMOJI WITH PROPER ICON */}
              <Icon name="sliders" size={16} color="#0a57ff" style={{ marginRight: 8 }} />

              <Text style={styles.filterText}>{selectedStatus}</Text>
              <Text style={styles.filterArrow}>▾</Text>
            </TouchableOpacity>

            {dropdownOpen && (
              <View style={styles.filterList}>
                {statusOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.filterItem}
                    onPress={() => {
                      setSelectedStatus(option);
                      setDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.filterItemText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* HORIZONTAL SCROLLABLE TABLE */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              <View style={{ minWidth: 700 }}>
                {/* TABLE HEADER */}
                <View style={styles.tableHeader}>
                  <Text style={styles.thSmall}>Sr.no</Text>
                  <Text style={styles.thSmall}>Date</Text>
                  <Text style={styles.thMedium}>Time (Work Duration)</Text>
                  <Text style={styles.thMedium}>Reporting Head</Text>
                  <Text style={styles.thSmall}>Leave Type</Text>
                  <Text style={styles.thSmall}>Status</Text>
                </View>

                {/* EMPTY MESSAGE */}
                {filteredCompOff.length === 0 ? (
                  <Text style={styles.emptyMsg}>No Logs Available</Text>
                ) : null}
              </View>
            </ScrollView>
          </>
        )}

        {/* EMPLOYEE HISTORY */}
        {activeTab === "history" && (
          <>
            <Text style={styles.title}>
              Employee Organization Details Change History
            </Text>

            {employeeHistory.length === 0 ? (
              <Text style={styles.emptyMsg}>No change history found</Text>
            ) : null}
          </>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default HistoryLogsSection;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#F2F5FF",
  },

  /* TABS */
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  tabBtn: { alignItems: "center" },
  tabText: {
    fontSize: 16,
    color: "#777",
  },
  activeTab: {
    color: "#1A73E8",
    fontWeight: "700",
  },
  tabLine: {
    height: 3,
    width: 120,
    backgroundColor: "#1A73E8",
    borderRadius: 20,
    marginTop: 4,
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A73E8",
    marginBottom: 12,
  },

  /* FILTER DROPDOWN */
  filterDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F6FB",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E0E6F0",
    width: 150,
    marginBottom: 10,
  },
  filterText: { flex: 1, fontSize: 14, color: "#333" },
  filterArrow: { fontSize: 14, color: "#444" },

  filterList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#DCE2EA",
    width: 150,
    marginBottom: 10,
  },
  filterItem: { padding: 12 },
  filterItemText: { fontSize: 14, color: "#222" },

  /* TABLE */
  horizontalScroll: { marginTop: 10 },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#EFF3FB",
    paddingVertical: 10,
    borderRadius: 10,
  },

  thSmall: {
    width: 100,
    textAlign: "center",
    fontWeight: "700",
    color: "#555",
    fontSize: 12,
  },

  thMedium: {
    width: 160,
    textAlign: "center",
    fontWeight: "700",
    color: "#555",
    fontSize: 12,
  },

  emptyMsg: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 15,
    color: "#999",
  },
});
