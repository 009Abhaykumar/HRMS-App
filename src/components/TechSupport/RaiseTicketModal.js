import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function RaiseTicketModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Raise a Ticket Request</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Title *</Text>
            <TextInput style={styles.input} placeholder="Enter Title" />

            <Text style={styles.label}>Ticket For *</Text>
            <TextInput
              style={styles.input}
              value="Aimantra HRMS"
              editable={false}
            />

            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              placeholder="Enter Description"
            />

            <Text style={styles.label}>Add Screenshot</Text>
            <View style={styles.fileBox}>
              <Icon name="paperclip" size={20} />
            </View>

            <Text style={styles.note}>
              Kindly note ticket resolution requires 2–3 working days.
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.cancel} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submit}>
                <Text style={styles.submitText}>Raise Request</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    maxHeight: "92%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  label: {
    marginTop: 14,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  fileBox: {
    backgroundColor: "#F7F7F7",
    padding: 14,
    borderRadius: 10,
    marginTop: 6,
    alignItems: "center",
  },
  note: {
    color: "red",
    marginTop: 14,
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cancel: {
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
  submit: {
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
