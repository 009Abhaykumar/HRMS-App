import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TicketsList from "../../components/TechSupport/TicketsList";

export default function TechSupport() {
  const [activeTab, setActiveTab] = useState("MY");

  return (
    <SafeAreaView style={styles.container}>
      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "MY" && styles.activeTab]}
          onPress={() => setActiveTab("MY")}
        >
          <Text style={[styles.tabText, activeTab === "MY" && styles.activeText]}>
            My Tickets
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "RAISED" && styles.activeTab]}
          onPress={() => setActiveTab("RAISED")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "RAISED" && styles.activeText,
            ]}
          >
            Raised Tickets
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <TicketsList type={activeTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 16,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 14,
  },
  tab: {
    marginRight: 20,
    paddingBottom: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#1A73E8",
  },
  tabText: {
    fontSize: 16,
    color: "#777",
  },
  activeText: {
    color: "#1A73E8",
    fontWeight: "700",
  },
});
