import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Announcements");
  const [activeTaskTab, setActiveTaskTab] = useState("Pending");

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
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Greeting */}
        <Text style={styles.greet}>Good Afternoon</Text>

        {/* ------------------ Calendar ------------------ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>November, 2025</Text>
          <Text style={{ color: "#888", marginBottom: 10 }}>
            Calendar UI Coming…
          </Text>
          <View style={styles.placeholderBox} />
        </View>

        {/* ------------------ Attendance Section ------------------ */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.cardTitle}>Attendance</Text>
            <Text style={styles.monthText}>Monthly ▼</Text>
          </View>

          {/* Attendance 2×2 */}
          <View style={styles.attendanceRow}>
            <View style={styles.attendanceBoxFixed}>
              <View style={styles.attendancePlaceholder} />
              <Text style={styles.attendanceLabel}>Absent</Text>
              <Text style={styles.attendanceValue}>0.0% (0)</Text>
            </View>

            <View style={styles.attendanceBoxFixed}>
              <View style={styles.attendancePlaceholder} />
              <Text style={styles.attendanceLabel}>Leave</Text>
              <Text style={styles.attendanceValue}>0.0% (0)</Text>
            </View>
          </View>

          <View style={styles.attendanceRow}>
            <View style={styles.attendanceBoxFixed}>
              <View style={styles.attendancePlaceholder} />
              <Text style={styles.attendanceLabel}>Present</Text>
              <Text style={styles.attendanceValue}>0.0%(0)</Text>
            </View>

            <View style={styles.attendanceBoxFixed}>
              <View style={styles.attendancePlaceholder} />
              <Text style={styles.attendanceLabel}>Days Off</Text>
              <Text style={styles.attendanceValue}>0.0% (2)</Text>
            </View>
          </View>
        </View>

        {/* ------------------ Available Leaves ------------------ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Available Leaves</Text>

          <View style={styles.leaveRow}>
            <View style={styles.leaveCard}>
              <Text style={styles.leaveTitle}>Previous</Text>
              <Text style={styles.leaveCount}>0 Available</Text>
            </View>

            <View style={styles.leaveCard}>
              <Text style={styles.leaveTitle}>Earned</Text>
              <Text style={styles.leaveCount}>0 Available</Text>
            </View>
          </View>

          <View style={styles.leaveRow}>
            <View style={styles.leaveCard}>
              <Text style={styles.leaveTitle}>Casual</Text>
              <Text style={styles.leaveCount}>0 Available</Text>
            </View>

            <View style={styles.leaveCard}>
              <Text style={styles.leaveTitle}>Sick</Text>
              <Text style={styles.leaveCount}>0 Available</Text>
            </View>
          </View>

          <View style={styles.pendingRow}>
            <Text style={styles.pendingText}>🟡 Leave Requests Pending – 0</Text>
            <Text style={styles.pendingText}>
              🔵 Outduty Requests Pending – 0
            </Text>
          </View>
        </View>

        {/* ------------------ ANNOUNCEMENTS SECTION ------------------ */}
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

  {/* Selected Content */}
  <View style={styles.tabContentBox}>
    <Text style={styles.tabContentText}>{tabContent[activeTab]}</Text>
  </View>
</View>

        {/* ------------------ TASKS SECTION ------------------ */}
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

        {/* ------------------ New Joining Employees ------------------ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>New Joining Employees</Text>
          <View style={styles.placeholderBox} />
          <Text style={{ color: "#aaa", marginTop: 10 }}>
            Data will show here...
          </Text>
        </View>

        {/* ------------------ Job Opening ------------------ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Job Openings</Text>
          <View style={styles.placeholderBoxSmall} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthText: {
    fontSize: 14,
    color: "#666",
  },

  /* Placeholder */
  placeholderBox: {
    height: 150,
    backgroundColor: "#eef2ff",
    borderRadius: 10,
    marginTop: 12,
  },
  placeholderBoxSmall: {
    height: 80,
    backgroundColor: "#eef2ff",
    borderRadius: 10,
    marginTop: 10,
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
    borderRadius: 80,
    backgroundColor: "#eef2ff",
  },
  attendanceLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
  },
  attendanceValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
  },

  /* Leaves */
  leaveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leaveCard: {
    width: "48%",
    padding: 14,
    backgroundColor: "#f4f6ff",
    borderRadius: 10,
  },
  leaveTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  leaveCount: {
    fontSize: 13,
    color: "#666",
  },
  pendingRow: {

    justifyContent: "space-between",
    marginTop: 12,
  },
  pendingText: {
    fontSize: 13,
    color: "#666",
  },

  /* Announcement Tabs */
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tabText: {
    fontSize: 15,
    color: "#444",
  },
  activeTabText: {
    color: "#0a57ff",
    fontWeight: "700",
  },
  activeLine: {
    height: 3,
    backgroundColor: "#0a57ff",
    marginTop: 3,
    borderRadius: 5,
  },
  tabContentBox: {
    marginTop: 10,
  },
  tabContentText: {
    fontSize: 15,
    color: "#555",
  },
  announcementTabScroll: {
  flexDirection: "row",
  columnGap: 25, // same spacing as tasks
  paddingRight: 20,
},

tabButton: {
  alignItems: "center",
},

tabText: {
  fontSize: 15,
  color: "#444",
  fontWeight: "500",
},

activeTabText: {
  color: "#0a57ff",
  fontWeight: "700",
},

activeLine: {
  width: "100%",
  height: 3,
  backgroundColor: "#0a57ff",
  marginTop: 4,
  borderRadius: 10,
},


  /* Task Tabs */
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
    fontSize: 15,
    fontWeight: "700",
    color: "#0a57ff",
  },
  taskActiveLine: {
    height: 3,
    backgroundColor: "#0a57ff",
    marginTop: 2,
    borderRadius: 5,
  },
  taskContent: {
    color: "#444",
    marginTop: 10,
  },
});
