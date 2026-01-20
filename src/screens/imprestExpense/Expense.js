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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Expense() {
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState("existing");

  const [expenseList, setExpenseList] = useState([]); // ADDED LIST STATE ✔

  const imprestRecords = ["IMP-0001 – Project A", "IMP-0002 – Project B"];
  const persons = ["CIPL10043 - Abhay Kumar", "CIPL10044 - Aman Sharma"];
  const imprestTypes = ["Travel Advance", "Office Purchase", "Project Expense"];

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [expenses, setExpenses] = useState([
    { name: "Transportation", amount: "0" },
  ]);

  const [form, setForm] = useState({
    expenseNameTop: "",
    imprestName: "",
    date: "",
    imprestType: "",
    person: "",
    days: "",
    remarks: "",
    numberOfPersons: "0",
    againstImprest: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateExpense = (i, key, value) => {
    const updated = [...expenses];
    updated[i][key] = value;
    setExpenses(updated);
  };

  const addExpenseRow = () => {
    setExpenses([...expenses, { name: "", amount: "0" }]);
  };

  const removeExpenseRow = (idx) => {
    setExpenses(expenses.filter((_, i) => i !== idx));
  };

  const submitForm = () => {
    setExpenseList([
      ...expenseList,
      {
        id: Date.now(),
        name: form.expenseNameTop,
        date: form.date,
        type: form.imprestType,
        person: form.person,
        total: expenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0),
      },
    ]);

    setModalVisible(false);
    alert("Expense Added Successfully!");
  };

  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>
     

        {expenseList.length === 0 ? (
          <Text style={styles.emptyText}>No Expense Records Found</Text>
        ) : (
          expenseList.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardField}>📅 Date: {item.date}</Text>
              <Text style={styles.cardField}>🏷 Type: {item.type}</Text>
              <Text style={styles.cardField}>👤 Person: {item.person}</Text>
              <Text style={styles.cardTotal}>💰 Total: ₹{item.total}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addBtnText}>+ Expense</Text>
      </TouchableOpacity>

      {/* ------------------- MODAL ------------------- */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Expense</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeIcon}>✖</Text>
                </TouchableOpacity>
              </View>

              <Field label="Expense Name *">
                <TextInput
                  style={styles.input}
                  placeholder="Expense Name"
                  value={form.expenseNameTop}
                  onChangeText={(v) => updateField("expenseNameTop", v)}
                />
              </Field>

              <View style={styles.segmentContainer}>
                <Pressable
                  style={[styles.segmentBtn, mode === "existing" && styles.segmentActive]}
                  onPress={() => setMode("existing")}
                >
                  <Text style={mode === "existing" ? styles.segmentTextActive : styles.segmentText}>
                    Existing Imprest
                  </Text>
                </Pressable>

                <Pressable
                  style={[styles.segmentBtn, mode === "noImprest" && styles.segmentActive]}
                  onPress={() => setMode("noImprest")}
                >
                  <Text style={mode === "noImprest" ? styles.segmentTextActive : styles.segmentText}>
                    No Imprest
                  </Text>
                </Pressable>
              </View>

              {mode === "existing" && (
                <>
                  <Field label="Against Imprest *">
                    <Pressable
                      style={styles.inputDropdown}
                      onPress={() => setDropdownOpen(dropdownOpen === "against" ? null : "against")}
                    >
                      <Text style={form.againstImprest ? styles.selectedText : styles.placeholder}>
                        {form.againstImprest || "Select Imprest"}
                      </Text>
                      <Text>▾</Text>
                    </Pressable>

                    {dropdownOpen === "against" &&
                      imprestRecords.map((item) => (
                        <Pressable
                          key={item}
                          style={styles.dropdownItem}
                          onPress={() => {
                            updateField("againstImprest", item);
                            setDropdownOpen(null);
                          }}
                        >
                          <Text>{item}</Text>
                        </Pressable>
                      ))}
                  </Field>
                </>
              )}

              {mode === "noImprest" && (
                <>
                  <TwoCol>
                    <Field label="Imprest Name *">
                      <TextInput style={styles.input} placeholder="Imprest Name" value={form.imprestName} onChangeText={(v) => updateField("imprestName", v)} />
                    </Field>

                    <Field label="Expense Date *">
                      <Pressable style={styles.inputDropdown} onPress={() => setShowDatePicker(true)}>
                        <Text style={form.date ? styles.selectedText : styles.placeholder}>
                          {form.date || "Select Date"}
                        </Text>
                        <Text>📅</Text>
                      </Pressable>

                      {showDatePicker && (
                        <DateTimePicker
                          mode="date"
                          value={new Date()}
                          onChange={(e, d) => {
                            setShowDatePicker(false);
                            if (d) updateField("date", d.toDateString());
                          }}
                        />
                      )}
                    </Field>
                  </TwoCol>
                </>
              )}

              {/* Expense Section */}
              <View style={styles.expenseHeaderRow}>
                <Text style={styles.sectionTitle}>Expense Details</Text>
                <Text style={styles.linkAdd} onPress={addExpenseRow}>+ Add Expense</Text>
              </View>

              {expenses.map((exp, idx) => (
                <View key={idx} style={styles.expenseBox}>
                  <TwoCol>
                    <Field label="Expense Name">
                      <TextInput style={styles.input} value={exp.name} onChangeText={(v) => updateExpense(idx, "name", v)} />
                    </Field>

                    <Field label="Amount">
                      <TextInput style={styles.input} keyboardType="numeric" value={exp.amount} onChangeText={(v) => updateExpense(idx, "amount", v)} />
                    </Field>
                  </TwoCol>

                  {idx > 0 && (
                    <TouchableOpacity style={styles.removeBtn} onPress={() => removeExpenseRow(idx)}>
                      <Text style={{ color: "#FF4D4D" }}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {/* Bottom Buttons */}
              <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addBtnModal} onPress={submitForm}>
                  <Text style={styles.addTextModal}>Add</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ---------------- Small Components ---------------- */

const Field = ({ label, children }) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const TwoCol = ({ children }) => (
  <View style={{ flexDirection: "row", gap: 10 }}>{children}</View>
);

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F1F5FF", padding: 16 },

  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    color: "#1b2b70",
  },

  emptyText: {
    
    
    textAlign: "center",
    marginTop: 30,
    fontSize: 15,
    color: "#999",
  },

  /* LIST CARD */
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    elevation: 4,
    marginBottom: 15,
  },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardField: { fontSize: 14, marginTop: 5, color: "#444" },
  cardTotal: { marginTop: 8, fontWeight: "700", fontSize: 15, color: "#0A57FF" },

  /* Floating Button */
  addBtn: {
    position: "absolute",
    bottom: -90,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 13,
    paddingHorizontal: 35,
    borderRadius: 30,
    elevation: 5,
  },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    maxHeight: "90%",
  },

  modalHeader: { flexDirection: "row", justifyContent: "space-between" },
  modalTitle: { fontSize: 18, fontWeight: "700" },
  closeIcon: { fontSize: 22, color: "#444" },

  /* Inputs */
  label: { fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#D7DEEE",
    backgroundColor: "#F9FBFF",
    padding: 12,
    borderRadius: 10,
  },
  inputDropdown: {
    borderWidth: 1,
    borderColor: "#D7DEEE",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F9FBFF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeholder: { color: "#9AA2B5" },
  selectedText: { color: "#000" },
  dropdownItem: {
    backgroundColor: "#EAF0FF",
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
  },

  /* Segment Buttons */
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#E6ECFF",
    borderRadius: 30,
    padding: 4,
    marginBottom: 12,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 28,
    alignItems: "center",
  },
  segmentActive: {
    backgroundColor: "#fff",
    elevation: 3,
  },
  segmentText: { color: "#555" },
  segmentTextActive: { fontWeight: "700", color: "#111" },

  /* Expense rows */
  expenseHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  sectionTitle: { fontWeight: "700" },
  linkAdd: { color: "#007AFF", fontWeight: "700" },

  expenseBox: {
    backgroundColor: "#F5F7FF",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  removeBtn: { alignSelf: "flex-end", marginTop: 5 },

  /* Buttons */
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  cancelBtn: {
    borderWidth: 2,
    borderColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 30,
  },
  cancelText: { color: "#007AFF", fontWeight: "700" },

  addBtnModal: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  addTextModal: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
