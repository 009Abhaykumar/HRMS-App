import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// IMPORT SCREENS
import ImprestDashboard from "../imprestExpense/ImprestDashboard";
import Imprest from "../imprestExpense/Imprest";
import Expense from "../imprestExpense/Expense";

const ExpenseSection = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ImprestDashboard />;
      case "imprest":
        return <Imprest />;
      case "expense":
        return <Expense />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("dashboard")}
          style={styles.tabBtn}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "dashboard" && styles.activeTab,
            ]}
          >
            Dashboard
          </Text>
          {activeTab === "dashboard" && <View style={styles.tabLine} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("imprest")}
          style={styles.tabBtn}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "imprest" && styles.activeTab,
            ]}
          >
            Imprest
          </Text>
          {activeTab === "imprest" && <View style={styles.tabLine} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("expense")}
          style={styles.tabBtn}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "expense" && styles.activeTab,
            ]}
          >
            Expense
          </Text>
          {activeTab === "expense" && <View style={styles.tabLine} />}
        </TouchableOpacity>
      </View>

      {/* CONTENT (FULL WIDTH) */}
      <View style={styles.contentContainer}>{renderActiveComponent()}</View>
    </View>
  );
};

export default ExpenseSection;

/* ------------------- STYLES ---------------------- */

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: "#F2F5FF",
  },

  /* TABS */
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#F2F5FF",
  },

  tabBtn: {
    alignItems: "center",
  },

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
    width: 110,
    backgroundColor: "#1A73E8",
    borderRadius: 50,
    marginTop: 4,
  },

  /* CONTENT WRAPPER */
  contentContainer: {
    flex: 1,
    width: "100%",          
    paddingHorizontal: 0,   
    backgroundColor: "#F2F5FF",
  },
});
