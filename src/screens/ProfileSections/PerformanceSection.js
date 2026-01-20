import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const PerformanceSection = () => {
  // LOCAL STATIC DATA (later easily replace with API)
  const [ratingPeriods, setRatingPeriods] = useState([
    "April 1, 2024 - March 31, 2025",
    "April 1, 2023 - March 31, 2024",
  ]);

  const [appraisals, setAppraisals] = useState([
    {
      period: "April 1, 2024 - March 31, 2025",
      selfRating: 7,
      finalRating: 8,
    },
  ]);

  const [awards, setAwards] = useState([]);

  const [activeTab, setActiveTab] = useState("ratings");
  const [selectedPeriod, setSelectedPeriod] = useState(ratingPeriods[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredAppraisals = appraisals.filter(
    (item) => item.period === selectedPeriod
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ---------------- TABS ---------------- */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("ratings")}
          style={styles.tabBtn}
        >
          <Text
            style={[styles.tabText, activeTab === "ratings" && styles.activeTab]}
          >
            Quick Appraisal Ratings
          </Text>
          {activeTab === "ratings" && <View style={styles.tabLine} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("awards")}
          style={styles.tabBtn}
        >
          <Text
            style={[styles.tabText, activeTab === "awards" && styles.activeTab]}
          >
            Awards
          </Text>
          {activeTab === "awards" && <View style={styles.tabLine} />}
        </TouchableOpacity>
      </View>

      {/* ---------------- CARD START ---------------- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {activeTab === "ratings"
            ? "Appraisals Ratings"
            : `Total Awards (${awards.length})`}
        </Text>

        {/* ==================== RATINGS SECTION ==================== */}
        {activeTab === "ratings" && (
          <View style={{ marginTop: 10 }}>

            <Text style={styles.subTitle}>Select Rating Period</Text>

            {/* --- Dropdown --- */}
            <TouchableOpacity
              style={styles.newDropdown}
              onPress={() => setDropdownOpen(!dropdownOpen)}
            >
              <Text style={styles.newDropdownText}>{selectedPeriod}</Text>
              <Text style={styles.newDropdownArrow}>▾</Text>
            </TouchableOpacity>

            {/* Dropdown Items */}
            {dropdownOpen && (
              <View style={styles.newDropdownList}>
                {ratingPeriods.map((period, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.newDropdownItem}
                    onPress={() => {
                      setSelectedPeriod(period);
                      setDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.newDropdownValue}>{period}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Table Header */}
            <View style={styles.newTableHeader}>
              <Text style={styles.thSmall}>Sr.</Text>
              <Text style={styles.thLarge}>Rating Period</Text>
              <Text style={styles.thSmall}>Self</Text>
              <Text style={styles.thSmall}>Final</Text>
              <Text style={styles.thSmall}>Actions</Text>
            </View>

            {/* Table Data */}
            {filteredAppraisals.length === 0 ? (
              <Text style={styles.newEmptyMsg}>No Ratings Available</Text>
            ) : (
              filteredAppraisals.map((item, index) => (
                <View key={index} style={styles.newRow}>
                  <Text style={styles.tdSmall}>{index + 1}</Text>
                  <Text style={styles.tdLarge}>{item.period}</Text>
                  <Text style={styles.tdSmall}>{item.selfRating}</Text>
                  <Text style={styles.tdSmall}>{item.finalRating}</Text>
                  <Text style={styles.tdSmall}>➡</Text>
                </View>
              ))
            )}
          </View>
        )}

        {/* ==================== AWARDS SECTION ==================== */}
        {activeTab === "awards" && (
          <View style={{ marginTop: 10 }}>
            <View style={styles.newTableHeader}>
              <Text style={styles.thSmall}>Sr.</Text>
              <Text style={styles.thLarge}>Award Title</Text>
              <Text style={styles.thLarge}>Date</Text>
            </View>

            {awards.length === 0 ? (
              <Text style={styles.newEmptyMsg}>No Awards Found</Text>
            ) : (
              awards.map((item, index) => (
                <View key={index} style={styles.newRow}>
                  <Text style={styles.tdSmall}>{index + 1}</Text>
                  <Text style={styles.tdLarge}>{item.title}</Text>
                  <Text style={styles.tdLarge}>{item.date}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default PerformanceSection;

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#F2F5FF", flex: 1 },

  /* ---------------- TABS ---------------- */
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  tabBtn: { alignItems: "center" },
  tabText: { fontSize: 16, color: "#777" },
  activeTab: { color: "#1A73E8", fontWeight: "700" },
  tabLine: {
    height: 3,
    width: 160,
    backgroundColor: "#1A73E8",
    marginTop: 4,
    borderRadius: 20,
  },

  /* ---------------- CARD ---------------- */
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A73E8",
    marginBottom: 8,
  },

  /* ---------------- DROPDOWN ---------------- */
  subTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777",
    marginBottom: 5,
    marginTop: 6,
  },

  newDropdown: {
    backgroundColor: "#F4F6FB",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E6F0",
  },
  newDropdownText: { fontSize: 14, color: "#333" },
  newDropdownArrow: { fontSize: 16, color: "#444" },

  newDropdownList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#E7EBF3",
  },
  newDropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  newDropdownValue: { fontSize: 14, color: "#000" },

  /* ---------------- TABLE ---------------- */
  newTableHeader: {
    flexDirection: "row",
    backgroundColor: "#EFF3FB",
    borderRadius: 10,
    marginTop: 15,
    paddingVertical: 10,
  },

  thSmall: {
    width: "15%",
    fontWeight: "700",
    color: "#555",
    textAlign: "center",
    fontSize: 12,
  },
  thLarge: {
    width: "40%",
    fontWeight: "700",
    color: "#555",
    textAlign: "center",
    fontSize: 12,
  },

  /* TABLE ROW */
  newRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  tdSmall: {
    width: "15%",
    textAlign: "center",
    color: "#333",
  },
  tdLarge: {
    width: "40%",
    textAlign: "center",
    color: "#333",
  },

  /* EMPTY MESSAGE */
  newEmptyMsg: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 14,
    color: "#888",
  },
});
