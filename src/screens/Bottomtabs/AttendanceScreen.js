import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Screens
import Dashboard from "../Attendance/Dashboard";
import Leaves from "../Attendance/Leaves";
import Attendance from "../Attendance/Attendance";
import OutDuty from "../Attendance/OutDuty";
import Compensatory from "../Attendance/Compensatory";

export default function AttendanceScreen() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = ["Dashboard", "Attendance", "Leaves", "OutDuty", "Compensatory"];

  const tabScreens = {
    Dashboard: <Dashboard />,
    Attendance: <Attendance />,
    Leaves: <Leaves />,
    OutDuty: <OutDuty />,
    Compensatory: <Compensatory />,
  };

  return (
    <SafeAreaView style={styles.safe}>
      
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
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

              {activeTab === tab && (
                <View style={styles.activeLine} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {tabScreens[activeTab]}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f6ff",
  },

  /* Sticky Card Header */
  stickyHeader: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    zIndex: 50,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    fontSize:20,
  },

  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    columnGap: 28,
  },

  tabButton: {
    alignItems: "center",
    paddingBottom: 4,
  },

  tabText: {
    fontSize: 17,
    color: "#777",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#0a57ff",
    fontWeight: "700",
  },

  activeLine: {
    width: 22,
    height: 3.5,
    backgroundColor: "#0a57ff",
    borderRadius: 10,
    marginTop: 6,
  },

  content: {
    padding: 15,
  },
});



