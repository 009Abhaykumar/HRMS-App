import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Imprest() {
  const [imprestList, setImprestList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const imprestTypes = ["Travel Advance", "Office Purchase", "Project Expense"];
  const persons = ["Abhay Kumar", "Aman Sharma", "Mohit Thakur"];

  const [expenses, setExpenses] = useState([{ name: "Transportation", amount: "0" }]);

  const [form, setForm] = useState({
    date: "",
    imprestName: "",
    imprestType: "",
    person: "",
    days: "",
    remarks: "",
  });

  const totalExpense = expenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);

  const addExpense = () => {
    setExpenses([...expenses, { name: "", amount: "0" }]);
  };

  const removeExpense = (i) => {
    setExpenses(expenses.filter((_, index) => index !== i));
  };

  const updateExpense = (i, key, value) => {
    const updated = [...expenses];
    updated[i][key] = value;
    setExpenses(updated);
  };

  const submitForm = () => {
    if (!form.date || !form.imprestName || !form.imprestType || !form.person) {
      alert("Please fill required fields *");
      return;
    }

    setImprestList([...imprestList, { ...form, totalExpense, id: Date.now(), expenses }]);

    setModalVisible(false);

    setForm({
      date: "",
      imprestName: "",
      imprestType: "",
      person: "",
      days: "",
      remarks: "",
    });
    setExpenses([{ name: "Transportation", amount: "0" }]);
  };

  return (
    <View style={styles.container}>
      

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {imprestList.length === 0 && (
          <Text style={styles.noData}>No Imprest Records Found</Text>
        )}

        {imprestList.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.imprestName}</Text>
            <Text style={styles.cardLine}>📅 Date: {item.date}</Text>
            <Text style={styles.cardLine}>🏷 Type: {item.imprestType}</Text>
            <Text style={styles.cardLine}>👤 Person: {item.person}</Text>
            <Text style={styles.cardLine}>📆 Days: {item.days || "0"}</Text>
            <Text style={styles.cardTotal}>💰 Total: ₹{item.totalExpense}</Text>
            <Text style={styles.cardLine}>📝 Remarks: {item.remarks}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Floating Center Button */}
      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.addBtnText}>+ Imprest</Text>
      </TouchableOpacity>

      {/* ------------------- MODAL ------------------- */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ScrollView>

              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Request Imprest</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeBtn}>✖</Text>
                </TouchableOpacity>
              </View>

              {/* Date */}
              <Field label="Date *">
                <Pressable style={styles.fieldBox} onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.placeholder}>{form.date || "Select Date"}</Text>
                  <Text>📅</Text>
                </Pressable>
              </Field>

              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  value={new Date()}
                  onChange={(e, d) => {
                    setShowDatePicker(false);
                    if (d) setForm({ ...form, date: d.toDateString() });
                  }}
                />
              )}

              {/* Dropdowns */}
              <Dropdown
                label="Imprest Type *"
                value={form.imprestType}
                list={imprestTypes}
                open={dropdownOpen === "type"}
                onPress={() => setDropdownOpen(dropdownOpen === "type" ? null : "type")}
                onSelect={(v) => {
                  setForm({ ...form, imprestType: v });
                  setDropdownOpen(null);
                }}
              />

              <Dropdown
                label="Person Name *"
                value={form.person}
                list={persons}
                open={dropdownOpen === "person"}
                onPress={() => setDropdownOpen(dropdownOpen === "person" ? null : "person")}
                onSelect={(v) => {
                  setForm({ ...form, person: v });
                  setDropdownOpen(null);
                }}
              />

              {/* Two Inputs */}
              <TwoCol>
                <Field label="Imprest Name *">
                  <TextInput style={styles.input} value={form.imprestName} onChangeText={(v) => setForm({ ...form, imprestName: v })} />
                </Field>

                <Field label="Days">
                  <TextInput style={styles.input} keyboardType="numeric" value={form.days} onChangeText={(v) => setForm({ ...form, days: v })} />
                </Field>
              </TwoCol>

              <Text style={styles.section}>Expense Details</Text>

              {expenses.map((item, i) => (
                <View key={i} style={styles.expenseItem}>
                  <TwoCol>
                    <Field label="Expense Name">
                      <TextInput style={styles.input} value={item.name} onChangeText={(v) => updateExpense(i, "name", v)} />
                    </Field>

                    <Field label="Amount">
                      <TextInput style={styles.input} keyboardType="numeric" value={item.amount} onChangeText={(v) => updateExpense(i, "amount", v)} />
                    </Field>
                  </TwoCol>

                  {i > 0 && (
                    <TouchableOpacity onPress={() => removeExpense(i)}>
                      <Text style={styles.removeX}>❌ Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity style={styles.addExpense} onPress={addExpense}>
                <Text style={styles.addExpenseText}>+ Add Expense</Text>
              </TouchableOpacity>

              {/* Remarks */}
              <Field label="Remarks">
                <TextInput style={[styles.input, { height: 70 }]} multiline value={form.remarks} onChangeText={(v) => setForm({ ...form, remarks: v })} />
              </Field>

              {/* Submit */}
              <TouchableOpacity style={styles.submitBtn} onPress={submitForm}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ------------ Reusable ---------------- */

const Field = ({ label, children }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const TwoCol = ({ children }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ width: "48%" }}>{children[0]}</View>
    <View style={{ width: "48%" }}>{children[1]}</View>
  </View>
);

const Dropdown = ({ label, value, list, open, onPress, onSelect }) => (
  <Field label={label}>
    <Pressable style={styles.fieldBox} onPress={onPress}>
      <Text style={styles.placeholder}>{value || "Select"}</Text>
      <Text>▾</Text>
    </Pressable>

    {open && list.map((i) => (
      <Pressable key={i} style={styles.dropdownItem} onPress={() => onSelect(i)}>
        <Text>{i}</Text>
      </Pressable>
    ))}
  </Field>
);

/* ------------ Styles ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F1F5FF", padding: 16 },
  header: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 10 },
  noData: { textAlign: "center", color: "#999", marginTop: 20 },

  card: { backgroundColor: "#FFF", padding: 16, borderRadius: 12, marginTop: 12, elevation: 4 },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  cardLine: { marginTop: 4, fontSize: 14, color: "#555" },
  cardTotal: { marginTop: 8, color: "#007AFF", fontWeight: "700", fontSize: 16 },

  /* CENTER BUTTON FIXED */
  addBtn: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingVertical: 14,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", alignItems: "center" },

  modalBox: { backgroundColor: "#FFF", width: "92%", maxHeight: "85%", borderRadius: 18, padding: 18, elevation: 10 },

  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: "700" },
  closeBtn: { fontSize: 22, color: "#333" },

  input: { borderWidth: 1, borderRadius: 10, padding: 12, borderColor: "#DCE3F1", backgroundColor: "#F9FBFF" },
  fieldBox: { borderWidth: 1, borderRadius: 10, padding: 12, borderColor: "#DCE3F1", backgroundColor: "#F9FBFF", flexDirection: "row", justifyContent: "space-between" },

  dropdownItem: { backgroundColor: "#EAF0FF", padding: 10, borderRadius: 8, marginTop: 4 },

  label: { fontWeight: "600", marginBottom: 6 },

  section: { fontWeight: "700", marginVertical: 10, fontSize: 16 },

  expenseItem: { backgroundColor: "#F3F6FF", padding: 12, borderRadius: 12, marginBottom: 10 },
  removeX: { color: "red", textAlign: "right", marginTop: 6 },

  addExpense: { backgroundColor: "#E2EDFF", padding: 12, borderRadius: 12, marginVertical: 10 },
  addExpenseText: { textAlign: "center", fontWeight: "700", color: "#007AFF" },

  submitBtn: { backgroundColor: "#007AFF", padding: 14, borderRadius: 12, marginTop: 10 },
  submitText: { textAlign: "center", color: "#FFF", fontWeight: "700", fontSize: 16 },

  placeholder: { color: "#444" }
});
