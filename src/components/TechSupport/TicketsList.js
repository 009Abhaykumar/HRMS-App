import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
import TicketCard from "./TicketCard";
import RaiseTicketModal from "./RaiseTicketModal";

/* -------- DUMMY DATA -------- */
const MY_TICKETS = [
  {
    id: 1,
    email: "hr.shubham.mzp@gmail.com",
    name: "Shubham Singh",
    title: "Reg: Sandwich Rule",
    task: "Plz apply sandwich rule in attendance for November-2025",
    date: "Dec 03, 2025",
    status: "Pending",
  },
];

const ALL_TICKETS = [
  ...MY_TICKETS,
  {
    id: 2,
    email: "abhishek229kumar@gmail.com",
    name: "Abhishek",
    title: "Imprest Report",
    task: "Please Provide Imprest Report Against Project Code-D1310",
    date: "Nov 24, 2025",
    status: "Pending",
  },
  {
    id: 3,
    email: "abhishek229kumar@gmail.com",
    name: "Abhishek",
    title: "Unable to Check Bill",
    task: "Option not available for check bill details or attachment",
    date: "Oct 25, 2025",
    status: "Pending",
  },
];

export default function TicketsList({ type }) {
  const isMyTickets = type === "MY";
  const data = isMyTickets ? MY_TICKETS : ALL_TICKETS;

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.header}>
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

      {/* FILTER */}
      <View style={styles.filterCard}>
        <View style={styles.dropdown}>
          <Icon name="tune" size={18} color="#555" />
          <Picker
            selectedValue={status}
            onValueChange={setStatus}
            style={{ flex: 1 }}
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

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.length === 0 ? (
          <Text style={styles.empty}>No tickets found</Text>
        ) : (
          data.map((item) => <TicketCard key={item.id} ticket={item} />)
        )}
      </ScrollView>

      {/* MODAL (ONLY MY TICKETS) */}
      {isMyTickets && (
        <RaiseTicketModal
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
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
  filterCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    elevation: 4,
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FC",
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FC",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});
