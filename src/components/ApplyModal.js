import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import ApplyLeaveScreen from "./ApplyLeaveScreen";
import OutDutyScreen from "./OutDutyScreen";
import AssignTaskForm from "./AssignTaskForm";

export default function ApplyModal({ visible, onClose }) {
  const [mainTab, setMainTab] = useState("Apply Leave");

  const mainTabs = ["Apply Leave", "Out Duty", "Assign Task"];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View style={styles.screen}>
        
        {/* ---------------- TOP MAIN TABS ---------------- */}
        <View style={styles.mainTabRow}>
          {mainTabs.map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setMainTab(tab)}>
              <Text
                style={[styles.mainTabText, mainTab === tab && styles.activeMainTab]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------------- CONTENT AREA ---------------- */}
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Heading */}
          <Text style={styles.heading}>
            {mainTab === "Apply Leave"
              ? "All Available Leaves:"
              : mainTab === "Out Duty"
              ? "Outduty Duration"
              : "Assign Task"}
          </Text>


          {/* FIXED: Always render all components, hide inactive ones */}
          <View style={{ flex: 1 }}>
            
            <View style={{ display: mainTab === "Apply Leave" ? "flex" : "none" }}>
              <ApplyLeaveScreen />
            </View>

            <View style={{ display: mainTab === "Out Duty" ? "flex" : "none" }}>
              <OutDutyScreen />
            </View>

            <View style={{ display: mainTab === "Assign Task" ? "flex" : "none" }}>
              <AssignTaskForm />
            </View>

          </View>


          {/* ---------------- FOOTER BUTTONS ---------------- */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitText}>
                {mainTab === "Apply Leave"
                  ? "Leave"
                  : mainTab === "Out Duty"
                  ? "Outduty"
                  : "Assign"}
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </Modal>
  );
}


/* ------------------ STYLES ------------------ */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff", padding: 20 },

  mainTabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    paddingBottom: 4,
  },
  mainTabText: { fontSize: 16, color: "#444" },
  activeMainTab: {
    color: "#0a57ff",
    fontWeight: "700",
    borderBottomWidth: 2,
    borderColor: "#0a57ff",
  },

  heading: { fontSize: 20, fontWeight: "700", marginBottom: 20 },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 40,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0a57ff",
  },
  cancelText: { color: "#0a57ff", fontWeight: "700" },

  submitBtn: {
    backgroundColor: "#0a57ff",
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 25,
  },
  submitText: { color: "#fff", fontWeight: "700" },
});
