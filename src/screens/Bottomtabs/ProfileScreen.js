import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/* ---------- SECTIONS ---------- */
import AboutSection from "../ProfileSections/AboutSection";
import DocumentsSection from "../ProfileSections/DocumentsSection";
import Attendance from "../Attendance/Attendance";
import Leaves from "../Attendance/Leaves";
import FinanceSection from "../ProfileSections/FinanceSection";
import ExpensesSection from "../ProfileSections/ExpensesSection";
import AssetsSection from "../ProfileSections/AssetsSection";
import PerformanceSection from "../ProfileSections/PerformanceSection";
import HistoryLogsSection from "../ProfileSections/HistoryLogsSection";
import RequestManagementSection from "../ProfileSections/RequestManagementSection";

/* ---------- MODALS ---------- */
import EditProfile from "../ProfileSections/EditProfile";
import EditBank from "../ProfileSections/EditBank";
import ProfileOptionsModal from "../../components/ProfileOptionsModal";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("About");

  // modal states
  const [editVisible, setEditVisible] = useState(false);
  const [bankVisible, setBankVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const tabs = [
    "About",
    "Documents",
    "Attendance",
    "Requests",
    "Finance",
    "Expenses",
    "Assets",
    "Performance",
    "History Logs",
    "Request Management",
  ];

  const renderSection = () => {
    switch (activeTab) {
      case "Documents":
        return <DocumentsSection />;
      case "Attendance":
        return <Attendance />;
      case "Requests":
        return <Leaves />;
      case "Finance":
        return <FinanceSection />;
      case "Expenses":
        return <ExpensesSection />;
      case "Assets":
        return <AssetsSection />;
      case "Performance":
        return <PerformanceSection />;
      case "History Logs":
        return <HistoryLogsSection />;
      case "Request Management":
        return <RequestManagementSection />;
      default:
        return <AboutSection user={user} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* ---------- HEADER CARD ---------- */}
        <View style={styles.headerCard}>
          <Image
            source={{
              uri:
                user.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
            }}
            style={styles.avatar}
          />

          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.role}>{user.role} at Aimantra</Text>

            <View style={styles.row}>
              <Icon name="map-marker" size={18} color="#4D89FF" />
              <Text style={styles.infoText}>Gurgaon, India</Text>
            </View>

            <View style={styles.row}>
              <Icon name="email-outline" size={18} color="#4D89FF" />
              <Text style={styles.infoText}>{user.email}</Text>
            </View>

            <View style={styles.row}>
              <Icon name="phone" size={18} color="#4D89FF" />
              <Text style={styles.infoText}>{user.phone}</Text>
            </View>
          </View>

          {/* ---------- THREE DOT MENU ---------- */}
          <TouchableOpacity
            style={styles.menuDots}
            onPress={() => setOptionsVisible(true)}
          >
            <Icon name="dots-vertical" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* ---------- TAB LIST ---------- */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabWrap}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTab,
              ]}
            >
              <Text
                style={
                  activeTab === tab
                    ? styles.activeTabText
                    : styles.tabText
                }
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ---------- CONTENT ---------- */}
        <View style={{ marginTop: 10 }}>{renderSection()}</View>

      </ScrollView>

      {/* ---------- OPTIONS MODAL ---------- */}
      <ProfileOptionsModal
        visible={optionsVisible}
        onClose={() => setOptionsVisible(false)}
        onEditProfile={() => {
          setOptionsVisible(false);
          setEditVisible(true);
        }}
        onEditBank={() => {
          setOptionsVisible(false);
          setBankVisible(true);
        }}
      />

      {/* ---------- EDIT PROFILE ---------- */}
      <EditProfile
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        user={user}
      />

      {/* ---------- BANK DETAILS ---------- */}
      <EditBank
        visible={bankVisible}
        onClose={() => setBankVisible(false)}
      />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },

  container: {
    paddingBottom: 100,
  },

  headerCard: {
    backgroundColor: "#fff",
    padding: 18,
    margin: 15,
    flexDirection: "row",
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#4D89FF",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },

  role: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },

  infoText: {
    fontSize: 14,
    marginLeft: 6,
    color: "#333",
  },

  menuDots: {
    padding: 5,
  },

  tabWrap: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  tabButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: "#E4E9F2",
    borderRadius: 18,
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: "#4D89FF",
  },

  tabText: {
    color: "#444",
    fontSize: 14,
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
