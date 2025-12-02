import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// IMPORT THE DASHBOARD COMPONENT
import Dashboard from "../Attendance/Dashboard";

export default function AttendanceScreen() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = [
    "Dashboard",
    "Attendance",
    "Leaves",
    "Out Duties",
    "Compensatory",
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* TOP TABS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topTabs}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tabButton}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>

              {activeTab === tab && <View style={styles.activeLine} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* CONDITIONAL RENDERING */}
        {activeTab === "Dashboard" && <Dashboard />}

        {activeTab !== "Dashboard" && (
          <View style={styles.card}>
            <Text style={styles.title}>{activeTab}</Text>
            <Text style={styles.soon}>This section will be added later…</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f8ff" },
  container: { padding: 15 },

  /* TOP TABS */
  topTabs: { flexDirection: "row", columnGap: 25, marginBottom: 15 },
  tabButton: { alignItems: "center" },
  tabText: { fontSize: 16, fontWeight: "500", color: "#555" },
  activeTabText: { color: "#0a57ff", fontWeight: "700" },
  activeLine: {
    height: 3,
    backgroundColor: "#0a57ff",
    width: "100%",
    marginTop: 3,
    borderRadius: 8,
  },

  /* PLACEHOLDER */
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    marginTop: 15,
  },
  title: { fontSize: 18, fontWeight: "700" },
  soon: { color: "#777", marginTop: 10 },
});
