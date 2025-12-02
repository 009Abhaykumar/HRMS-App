import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MonthSelector } from "../../components/MonthSelector";
import CalendarCard from "../../components/CalendarCard";
import Leaves from "../../components/Leaves";

<CalendarCard
  selectedMonth={selectedMonth}
  onChangeMonth={(m) => setSelectedMonth(m)}
>

</CalendarCard>


export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Announcements");
  const [activeTaskTab, setActiveTaskTab] = useState("Pending");
  const [selectedMonth, setSelectedMonth] = useState("This Month");

  const tabs = ["Announcements", "Birthday", "Work Anniversary", "Event", "Star"];

  const tabContent = {
    Announcements: "No Announcements at the moment...",
    Birthday: "No Birthdays today 🎉",
    "Work Anniversary": "No Work Anniversaries today",
    Event: "No Events scheduled",
    Star: "No Stars awarded yet",
  };

  const taskContent = {
    Pending: "No pending tasks...",
    Completed: "No completed tasks yet",
    Closed: "No closed tasks...",
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <Text style={styles.greet}>Good Afternoon</Text>

        {/* ------------------ Calendar ------------------ */}
    <CalendarCard
  selectedMonth={selectedMonth}
  onChangeMonth={(m) => setSelectedMonth(m)}
/>


        {/* ------------------ Attendance ------------------ */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.cardTitle}>Attendance</Text>

            <MonthSelector
              selectedMonth={selectedMonth}
              onChange={(m) => setSelectedMonth(m)}
            />
          </View>

          {/* 2×2 layout */}
          <View style={styles.attendanceRow}>
            {renderAttendanceItem("Absent", "0.0% (0)")}
            {renderAttendanceItem("Leave", "0.0% (0)")}
          </View>

          <View style={styles.attendanceRow}>
            {renderAttendanceItem("Present", "0.0% (0)")}
            {renderAttendanceItem("Days Off", "0.0% (0)")}
          </View>
        </View>

        {/* ------------------ Leaves ------------------ */}
        <Leaves />

        {/* ------------------ Announcements ------------------ */}
        <View style={styles.card}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.announcementTabScroll}
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

          <View style={styles.tabContentBox}>
            <Text style={styles.tabContentText}>{tabContent[activeTab]}</Text>
          </View>
        </View>

        {/* ------------------ Tasks ------------------ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Tasks</Text>

          <View style={styles.taskTabRow}>
            {["Pending", "Completed", "Closed"].map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setActiveTaskTab(tab)}>
                <Text
                  style={[
                    styles.taskTabText,
                    activeTaskTab === tab && styles.taskActiveTabText,
                  ]}
                >
                  {tab}
                </Text>

                {activeTaskTab === tab && (
                  <View style={styles.taskActiveLine} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.taskContent}>{taskContent[activeTaskTab]}</Text>
        </View>

        {/* ------------------ Joining Employees ------------------ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>New Joining Employees</Text>
          <View style={styles.placeholderBox} />
          <Text style={{ color: "#aaa", marginTop: 10 }}>
            Data will show here...
          </Text>
        </View>

        {/* ------------------ Job Openings ------------------ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Job Openings</Text>
          <View style={styles.placeholderBoxSmall} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Reusable Small Components */
const renderAttendanceItem = (label, value) => (
  <View style={styles.attendanceBoxFixed}>
    <View style={styles.attendancePlaceholder} />
    <Text style={styles.attendanceLabel}>{label}</Text>
    <Text style={styles.attendanceValue}>{value}</Text>
  </View>
);

const renderLeaveCard = (title, count) => (
  <View style={styles.leaveCard}>
    <Text style={styles.leaveTitle}>{title}</Text>
    <Text style={styles.leaveCount}>{count}</Text>
  </View>
);

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f6f8ff",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  greet: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 10,
  },

  /* Card */
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  /* Attendance */
  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  attendanceBoxFixed: {
    width: "48%",
    alignItems: "center",
  },
  attendancePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#eef2ff",
  },
  attendanceLabel: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
  },
  attendanceValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },



  /* Announcement Tabs */
  announcementTabScroll: {
    flexDirection: "row",
    columnGap: 25,
    paddingRight: 15,
  },

  tabButton: {
    alignItems: "center",
  },

  tabText: {
    fontSize: 15,
    color: "#555",
  },

  activeTabText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0a57ff",
  },

  activeLine: {
    height: 3,
    backgroundColor: "#0a57ff",
    width: "100%",
    marginTop: 3,
    borderRadius: 10,
  },

  tabContentBox: {
    marginTop: 10,
  },
  tabContentText: {
    fontSize: 15,
    color: "#444",
  },

  /* Task tabs */
  taskTabRow: {
    flexDirection: "row",
    gap: 25,
    marginVertical: 10,
  },
  taskTabText: {
    fontSize: 15,
    color: "#666",
  },
  taskActiveTabText: {
    color: "#0a57ff",
    fontWeight: "700",
  },
  taskActiveLine: {
    height: 3,
    backgroundColor: "#0a57ff",
    borderRadius: 10,
  },
  taskContent: {
    marginTop: 10,
    color: "#444",
  },
});
