import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Switch,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { updateBankDetails } from "../../redux/actions/userActions";

export default function EditBank({ visible, onClose }) {
  const dispatch = useDispatch();
  const bank = useSelector((state) => state.user.bankDetails);

  const [requestChange, setRequestChange] = useState(false);

  const [form, setForm] = useState({
    accountNo: "",
    ifsc: "",
    bankName: "",
    branch: "",
    reason: "",
  });

  useEffect(() => {
    if (bank) {
      setForm({
        accountNo: bank.accountNo,
        ifsc: bank.ifsc,
        bankName: bank.bankName,
        branch: bank.branch,
        reason: "",
      });
    }
    setRequestChange(false);
  }, [bank, visible]);

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    dispatch(updateBankDetails(form));
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={styles.container}>

        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Current Bank Details</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* ---------- CURRENT DETAILS CARD ---------- */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Current Details</Text>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Request Changes</Text>
              <Switch value={requestChange} onValueChange={setRequestChange} />
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account No</Text>
            <Text style={styles.detailValue}>{bank?.accountNo}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>IFSC</Text>
            <Text style={styles.detailValue}>{bank?.ifsc}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank</Text>
            <Text style={styles.detailValue}>{bank?.bankName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Branch</Text>
            <Text style={styles.detailValue}>{bank?.branch}</Text>
          </View>
        </View>

        {/* ---------- NEW DETAILS ---------- */}
        {requestChange && (
          <>
            <Text style={styles.sectionTitle}>New Details</Text>

            <Text style={styles.inputLabel}>ACCOUNT NUMBER *</Text>
            <TextInput
              style={styles.input}
              value={form.accountNo}
              onChangeText={(t) => setField("accountNo", t)}
            />

            <Text style={styles.inputLabel}>IFSC CODE *</Text>
            <TextInput
              style={styles.input}
              value={form.ifsc}
              onChangeText={(t) => setField("ifsc", t)}
            />

            <Text style={styles.inputLabel}>BANK NAME *</Text>
            <TextInput
              style={styles.input}
              value={form.bankName}
              onChangeText={(t) => setField("bankName", t)}
            />

            <Text style={styles.inputLabel}>BRANCH ADDRESS *</Text>
            <TextInput
              style={styles.input}
              value={form.branch}
              onChangeText={(t) => setField("branch", t)}
            />

            <Text style={styles.inputLabel}>REASON FOR CHANGE *</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={form.reason}
              onChangeText={(t) => setField("reason", t)}
              multiline
            />

            <Text style={styles.inputLabel}>
              PROOF ATTACHMENT (CANCEL CHEQUE / BANK STATEMENT) *
            </Text>

            <View style={styles.fileBox}>
              <Icon name="cloud-upload-outline" size={20} color="#555" />
              <Text style={styles.fileText}>No file selected</Text>
            </View>

            {/* ---------- ACTION BUTTONS ---------- */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit Change Request</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Modal>
  );
}

/* ================= CLEAN UI STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
    padding: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: "#E4E7EC",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  switchText: {
    marginRight: 8,
    fontSize: 14,
    color: "#374151",
  },

  detailRow: {
    marginTop: 8,
  },

  detailLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  detailValue: {
    fontSize: 14,
    color: "#111827",
    marginTop: 2,
  },

  sectionTitle: {
    marginTop: 26,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  inputLabel: {
    marginTop: 16,
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  fileBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  fileText: {
    marginLeft: 10,
    color: "#6B7280",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },

  cancelBtn: {
    borderWidth: 2,
    borderColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },

  cancelText: {
    color: "#2563EB",
    fontWeight: "700",
  },

  submitBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
  },

  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
});
