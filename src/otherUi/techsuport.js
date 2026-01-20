import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

/* ========================================================= */
export default function TechSupport() {
  const [activeTab, setActiveTab] = useState("MY");

  return (
    <SafeAreaView style={styles.container}>
      {/* ---------- TABS ---------- */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            activeTab === "MY" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("MY")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "MY" && styles.activeTabText,
            ]}
          >
            My Tickets
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabBtn,
            activeTab === "RAISED" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("RAISED")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "RAISED" && styles.activeTabText,
            ]}
          >
            Raised Tickets
          </Text>
        </TouchableOpacity>
      </View>

      {/* ---------- CONTENT ---------- */}
      <TicketsScreen mode={activeTab} />
    </SafeAreaView>
  );
}

/* ========================================================= */
/* ================== TICKETS SCREEN ======================= */
/* ========================================================= */

function TicketsScreen({ mode }) {
  const isMyTickets = mode === "MY";

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          {isMyTickets ? "My Tickets" : "Raised Tickets"}
        </Text>

        {isMyTickets && (
          <TouchableOpacity
            style={styles.newBtn}
            onPress={() => setShowModal(true)}
          >
            <Icon name="plus" size={18} color="#fff" />
            <Text style={styles.newBtnText}>New Ticket</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ---------- FILTER CARD ---------- */}
      <View style={styles.filterCard}>
        <View style={styles.dropdown}>
          <Icon name="tune" size={18} color="#555" />
          <Picker
            selectedValue={status}
            onValueChange={setStatus}
            style={styles.picker}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Completed" value="Completed" />
          </Picker>
        </View>

        <View style={styles.searchBox}>
          <Icon name="magnify" size={18} color="#777" />
          <TextInput
            placeholder="By Task, Emp & Name"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* ---------- TABLE HEADER (MOBILE) ---------- */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableText}>
          Sr | Title | Task | Date | Status
        </Text>
      </View>

      {/* ---------- EMPTY STATE ---------- */}
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>No tickets found</Text>
      </View>

      {/* ---------- MODAL ---------- */}
      {isMyTickets && (
        <RaiseTicketModal
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </View>
  );
}

/* ========================================================= */
/* ================= RAISE TICKET MODAL ==================== */
/* ========================================================= */

function RaiseTicketModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* HEADER */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Raise a Ticket Request
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={22} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Title"
            />

            <Text style={styles.label}>Ticket For *</Text>
            <TextInput
              style={styles.input}
              value="Aimantra HRMS"
              editable={false}
            />

            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, { height: 90 }]}
              multiline
              placeholder="Enter Description"
            />

            <Text style={styles.label}>Add Screenshot</Text>
            <View style={styles.fileBox}>
              <Icon name="paperclip" size={20} />
            </View>

            <Text style={styles.note}>
              Kindly note that ticket resolution typically requires
              a minimum of 2–3 working days.
            </Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitBtn}>
                <Text style={styles.submitText}>
                  Raise Request
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 30 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

/* ========================================================= */
/* ======================= STYLES ========================== */
/* ========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 16,
  },

  /* TABS */
  tabRow: {
    flexDirection: "row",
    marginBottom: 14,
  },

  tabBtn: {
    marginRight: 20,
    paddingBottom: 6,
  },

  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#1A73E8",
  },

  tabText: {
    fontSize: 16,
    color: "#555",
  },

  activeTabText: {
    color: "#1A73E8",
    fontWeight: "700",
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A73E8",
  },

  newBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E77BB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
  },

  newBtnText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "700",
  },

  /* FILTER */
  filterCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    elevation: 4,
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FC",
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  picker: {
    flex: 1,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FC",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 12,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  /* TABLE */
  tableHeader: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    elevation: 3,
  },

  tableText: {
    fontWeight: "700",
    color: "#555",
    fontSize: 13,
  },

  emptyBox: {
    marginTop: 40,
    alignItems: "center",
  },

  emptyText: {
    color: "#777",
    fontSize: 14,
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "92%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  label: {
    marginTop: 12,
    fontWeight: "700",
  },

  input: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },

  fileBox: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: 14,
    marginTop: 6,
    alignItems: "center",
  },

  note: {
    color: "red",
    marginTop: 14,
    fontSize: 13,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },

  cancelBtn: {
    borderWidth: 2,
    borderColor: "#2E77BB",
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 30,
  },

  cancelText: {
    color: "#2E77BB",
    fontWeight: "700",
  },

  submitBtn: {
    backgroundColor: "#2E77BB",
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 30,
  },

  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
});
