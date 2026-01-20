import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Child screens
import ImprestDashboard from "../imprestExpense/ImprestDashboard";
import Imprest from "../imprestExpense/Imprest";
import Expense from "../imprestExpense/Expense";

export default function ImprestExpenseScreen() {

  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = ["Dashboard", "Imprest", "Expense"];

  const tabScreens = {
    Dashboard: <ImprestDashboard />,
    Imprest: <Imprest />,
    Expense: <Expense />,
  };

  return (
    <SafeAreaView style={styles.safe}>
      
      {/* ================= TAB NAVIGATION ================= */}
      <View style={styles.tabHeader}>
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeText,
                ]}
              >
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.activeLine} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ================= SCREEN CONTENT ================= */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

  /* ---------- Tabs ---------- */
  tabHeader: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around", // 👈 FIXED SPACING
    alignItems: "center",
  },

  tabItem: { alignItems: "center" },

  tabText: {
    fontSize: 17,
    color: "#777",
    fontWeight: "500",
  },

  activeText: {
    color: "#0a57ff",
    fontWeight: "700",
  },

  activeLine: {
    width: 22,
    height: 3,
    backgroundColor: "#0a57ff",
    borderRadius: 10,
    marginTop: 6,
  },

  /* ---------- Page Content ---------- */
  content: {
    padding: 16,
  },
});
