import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function RequestManagementSection() {
  const [selectedFilter, setSelectedFilter] = useState("Completed Requests");
  const [showDropdown, setShowDropdown] = useState(false);

  const filters = ["All Requests", "In Process", "Completed Requests"];

  const requestData = []; // API DATA WILL COME HERE LATER

  return (
    <View style={{ padding: 15 }}>
      
      {/* TITLE */}
      <Text style={styles.pageTitle}>Bank Details Change History</Text>
      <View style={styles.titleLine} />

      {/* FILTER BOX */}
      <View style={styles.filterCard}>
        <TouchableOpacity
          style={styles.filterBox}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Icon name="sliders" size={18} color="#0a57ff" />
          <Text style={styles.filterText}>{selectedFilter}</Text>
          <Icon name="chevron-down" size={18} color="#0a57ff" />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdown}>
            {filters.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedFilter(item);
                  setShowDropdown(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    selectedFilter === item && { color: "#0a57ff", fontWeight: "700" },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* TABLE CARD */}
      <View style={styles.tableCard}>
        <Text style={styles.sectionTitle}>Stage of Bank Details Change</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* TABLE HEADER */}
            <View style={styles.tableHeader}>
              {[
                "S. No.",
                "Previous Details",
                "Requested Changes",
                "Changed Fields",
                "Proof",
                "Reason for Change",
                "Status",
                "Remarks",
                "Action",
              ].map((col) => (
                <Text key={col} style={styles.headerText}>
                  {col}
                </Text>
              ))}
            </View>

            {/* TABLE BODY */}
            {requestData.length === 0 ? (
              <Text style={styles.noData}>No Requests Available</Text>
            ) : (
              requestData.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.rowText}>{index + 1}</Text>
                  <Text style={styles.rowText}>{item.previous}</Text>
                  <Text style={styles.rowText}>{item.requested}</Text>
                  <Text style={styles.rowText}>{item.changed}</Text>
                  <Text style={styles.rowText}>{item.proof}</Text>
                  <Text style={styles.rowText}>{item.reason}</Text>
                  <Text style={styles.rowText}>{item.status}</Text>
                  <Text style={styles.rowText}>{item.remarks}</Text>
                  <Text style={styles.actionBtn}>View</Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  titleLine: {
    height: 3,
    backgroundColor: "#0a57ff",
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 15,
  },

  /* Filter card */
  filterCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  filterBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
  filterText: {
    flex: 1,
    fontSize: 15,
    color: "#000",
  },

  dropdown: {
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 0.7,
    borderColor: "#ddd",
  },
  dropdownText: {
    fontSize: 15,
    color: "#444",
  },

  /* Table Card */
  tableCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0a57ff",
    marginBottom: 12,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f7ff",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  headerText: {
    width: 140,
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    textAlign: "left",
  },

  /* Table Row */
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  rowText: {
    width: 140,
    fontSize: 14,
    color: "#444",
  },

  actionBtn: {
    width: 140,
    color: "#0a57ff",
    fontWeight: "700",
  },

  noData: {
    textAlign: "center",
    paddingVertical: 25,
    color: "#777",
    fontStyle: "italic",
  },
});
