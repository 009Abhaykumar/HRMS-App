import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ImprestScreen() {
  const [imprestList, setImprestList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const imprestTypeOptions = ["Travel Advance", "Office Purchase", "Project Expense"];
  const personOptions = ["Abhay Kumar", "Aman Sharma", "Mohit Thakur"];

  const [expenses, setExpenses] = useState([{ name: "Transportation", amount: "0" }]);

  const [formData, setFormData] = useState({
    projectRef: "",
    imprestName: "",
    imprestDate: "",
    imprestType: "",
    personName: "",
    days: "",
    remarks: "",
    status: "Pending",
  });

  const calculateTotal = () =>
    expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0).toString();

  const handleAddImprest = () => {
    if (!formData.imprestName || !formData.imprestType || !formData.personName || !formData.imprestDate) {
      alert("Please fill all required fields (*)");
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...formData,
      totalExpense: calculateTotal(),
    };

    setImprestList([...imprestList, newEntry]);
    setModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setExpenses([{ name: "Transportation", amount: "0" }]);
    setFormData({
      projectRef: "",
      imprestName: "",
      imprestDate: "",
      imprestType: "",
      personName: "",
      days: "",
      remarks: "",
      status: "Pending",
    });
  };

  const openDropdown = (key) => {
    setDropdownVisible(dropdownVisible === key ? null : key);
  };

  const selectDropdownValue = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setDropdownVisible(null);
  };

  const updateExpense = (i, key, value) => {
    const updated = [...expenses];
    updated[i][key] = value;
    setExpenses(updated);
  };

  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>My Imprest</Text>

        {imprestList.length === 0 && (
          <Text style={styles.emptyText}>No Imprest Records Found</Text>
        )}

        {imprestList.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.topRow}>
              <Text style={styles.projectRef}>{item.projectRef || "PRJ-REF"}</Text>
              <View style={[styles.statusChip, styles.statusColor(item.status)]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.detailsBox}>
              <Row label="📄 Imprest Name" value={item.imprestName} />
              <Row label="📅 Date" value={item.imprestDate} />
              <Row label="🏷 Type" value={item.imprestType} />
              <Row label="👤 Person" value={item.personName} />
              <Row label="📆 Days" value={item.days} />
              <Row label="💰 Total Expense" value={`₹${item.totalExpense}`} bold color="#007bff" />
              <Row label="📝 Remarks" value={item.remarks} />
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addText}>+ Imprest</Text>
      </TouchableOpacity>

      {/* ---------- MODAL ---------- */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <ScrollView>

              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Request Imprest</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeX}>✖</Text>
                </TouchableOpacity>
              </View>

              {/* DATE PICKER */}
              <Text style={styles.label}>Date *</Text>
              <Pressable style={styles.dropdownBox} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.placeholderText}>
                  {formData.imprestDate || "Select Date"}
                </Text>
                <Text style={styles.arrow}>📅</Text>
              </Pressable>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={(e, d) => {
                    setShowDatePicker(false);
                    if (d) setFormData({ ...formData, imprestDate: d.toDateString() });
                  }}
                />
              )}

              {/* Imprest Type Dropdown */}
              <Text style={styles.label}>Imprest Type *</Text>
              <Pressable style={styles.dropdownBox} onPress={() => openDropdown("type")}>
                <Text style={styles.placeholderText}>
                  {formData.imprestType || "Select Type"}
                </Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>

              {dropdownVisible === "type" &&
                imprestTypeOptions.map((opt) => (
                  <Pressable
                    key={opt}
                    style={styles.dropdownItem}
                    onPress={() => selectDropdownValue("imprestType", opt)}>
                    <Text>{opt}</Text>
                  </Pressable>
                ))}

              {/* Person Dropdown */}
              <Text style={styles.label}>Person Name *</Text>
              <Pressable style={styles.dropdownBox} onPress={() => openDropdown("person")}>
                <Text style={styles.placeholderText}>
                  {formData.personName || "Select Person"}
                </Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>

              {dropdownVisible === "person" &&
                personOptions.map((opt) => (
                  <Pressable
                    key={opt}
                    style={styles.dropdownItem}
                    onPress={() => selectDropdownValue("personName", opt)}>
                    <Text>{opt}</Text>
                  </Pressable>
                ))}

              {/* Text Inputs */}
              <TwoCol label="Imprest Name *" value={formData.imprestName} onChange={(v) => setFormData({ ...formData, imprestName: v })} />
              <TwoCol label="Days *" value={formData.days} keyboardType="numeric" onChange={(v) => setFormData({ ...formData, days: v })} />

              {/* Expense Section */}
              <Text style={styles.sectionTitle}>Expense Details</Text>
              {expenses.map((item, index) => (
                <View key={index} style={styles.expenseRow}>
                  <TwoCol value={item.name} onChange={(v) => updateExpense(index, "name", v)} label="Expense Name" />
                  <TwoCol value={item.amount} keyboardType="numeric" onChange={(v) => updateExpense(index, "amount", v)} label="Amount" />

                  {index > 0 && (
                    <TouchableOpacity onPress={() => removeExpense(index)} style={styles.deleteExpense}>
                      <Text style={{ color: "red", fontSize: 18 }}>✖</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity style={styles.addExpenseBtn} onPress={() => setExpenses([...expenses, { name: "", amount: "0" }])}>
                <Text style={styles.addExpenseText}>+ Add Expense</Text>
              </TouchableOpacity>

              <Text style={styles.label}>Remarks</Text>
              <TextInput
                style={[styles.input, { height: 70 }]}
                multiline
                value={formData.remarks}
                onChangeText={(v) => setFormData({ ...formData, remarks: v })}
              />

              {/* Buttons */}
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitBtn} onPress={handleAddImprest}>
                  <Text style={styles.submitText}>Add</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* -------- SMALL REUSABLE ROW COMPONENT -------- */

const Row = ({ label, value, bold, color }) => (
  <View style={styles.rowBox}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[styles.rowValue, bold && { fontWeight: "700" }, color && { color }]}>{value}</Text>
  </View>
);

const TwoCol = (props) => (
  <>
    <Text style={styles.label}>{props.label}</Text>
    <TextInput {...props} style={styles.input} placeholder={props.placeholder} />
  </>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF3FF", padding: 16 },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center" },
  emptyText: { textAlign: "center", marginTop: 10, color: "#999" },

  addButton: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#0A57FF", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24 },
  addText: { color: "#fff", fontWeight: "700" },

  modalWrapper: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: {
    width: "90%",
    maxHeight: "85%",
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
  },
  modalHeader: { flexDirection: "row", justifyContent: "space-between" },
  modalTitle: { fontWeight: "700", fontSize: 18 },
  closeX: { fontSize: 22 },

  label: { fontWeight: "600", marginTop: 10 },

  dropdownBox: {
    marginTop: 6,
    padding: 12,
    borderWidth: 1,
    backgroundColor: "#F5F6FA",
    borderRadius: 8,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownItem: { padding: 10, backgroundColor: "#eef", borderRadius: 6, marginTop: 4 },

  arrow: { fontSize: 16 },
  placeholderText: { color: "#777" },

  input: {
    borderWidth: 1,
    backgroundColor: "#F5F6FA",
    borderRadius: 8,
    borderColor: "#ddd",
    padding: 12,
    marginTop: 5,
  },

  expenseRow: { marginTop: 10, backgroundColor: "#F8FAFF", padding: 10, borderRadius: 8 },
  deleteExpense: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 5,
    borderWidth: 1,
    borderColor: "red",
  },

  addExpenseBtn: {
    marginTop: 10,
    backgroundColor: "#E8F1FF",
    paddingVertical: 10,
    borderRadius: 10,
  },
  addExpenseText: { textAlign: "center", fontWeight: "700", color: "#0066FF" },

  rowBox: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  rowLabel: { fontWeight: "600" },
  rowValue: { maxWidth: "55%", textAlign: "right" },

  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  cancelBtn: { backgroundColor: "#CCC", padding: 10, borderRadius: 10 },
  submitBtn: { backgroundColor: "#0A57FF", padding: 10, borderRadius: 10 },
  cancelText: { fontWeight: "700" },
  submitText: { color: "#fff", fontWeight: "700" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    marginTop: 12,
  },
  topRow: { flexDirection: "row", justifyContent: "space-between" },
  projectRef: { fontSize: 16, fontWeight: "700" },
  statusChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusColor: (s) => ({
    backgroundColor: s === "Pending" ? "#FFE9A4" : "#C8FFD0",
  }),
  statusText: { fontSize: 12 },
  detailsBox: { marginTop: 10, borderTopWidth: 1, paddingTop: 10 },
});