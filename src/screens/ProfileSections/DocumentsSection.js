import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";



export default function DocumentsSection() {
  const userDocs = useSelector((state) => state.user.documents);
  const dispatch = useDispatch();

  const categories = [
    "Identity",
    "Employee Letters",
    "Previous Experience",
    "Degree & Certificates",
  ];

  const [activeTab, setActiveTab] = useState(categories[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [docName, setDocName] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docFile, setDocFile] = useState(null);

  const resetModal = () => {
    setModalVisible(false);
    setSelectedDoc(null);
    setDocName("");
    setDocFile(null);
  };

  const filteredDocs = userDocs.filter((d) => d.category === activeTab);

  return (
    <View style={styles.container}>
      
      {/* 🔵 UNIFIED HEADER TABS (same UI as other screens) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {categories.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tabBtn}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>

            {activeTab === tab && <View style={styles.tabLine} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Document List */}
      {filteredDocs.length === 0 ? (
        <Text style={styles.noDocs}>No documents found</Text>
      ) : (
        <FlatList
          data={filteredDocs}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Icon
                name="file-document-outline"
                size={35}
                color="#2B74E4"
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.docName}>{item.name}</Text>
                <Text style={styles.docCategory}>{item.category}</Text>
              </View>

              <TouchableOpacity onPress={() => Linking.openURL(item.file?.uri)}>
                <Icon name="eye" size={25} color="#2B74E4" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedDoc(item);
                  setDocName(item.name);
                  setDocFile(item.file);
                  setModalVisible(true);
                }}
              >
                <Icon name="pencil" size={25} color="#333" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <Icon name="delete" size={25} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {selectedDoc ? "Edit Document" : "Add Document"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Document Name"
              value={docName}
              onChangeText={setDocName}
            />

            <TouchableOpacity style={styles.uploadBtn}>
              <Icon name="upload" size={20} color="#fff" />
              <Text style={{ color: "#fff", marginLeft: 10 }}>
                {docFile ? "File Selected" : "Select File"}
              </Text>
            </TouchableOpacity>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#ccc" }]}
                onPress={resetModal}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#2B74E4" }]}
              >
                <Text style={{ color: "#fff" }}>
                  {selectedDoc ? "Update" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },

  /* 🔵 NEW UNIFIED SCREEN HEADER TABS */
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 8,
    marginBottom: 10,
  },
  tabBtn: { alignItems: "center", marginHorizontal: 12 },
  tabText: { fontSize: 15, color: "#777" },
  activeTabText: { color: "#1A73E8", fontWeight: "bold" },
  tabLine: {
    height: 3,
    backgroundColor: "#1A73E8",
    width: 120,
    borderRadius: 10,
    marginTop: 3,
  },

  addBtn: {
    backgroundColor: "#2B74E4",
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 15,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 3,
    marginVertical: 8,
    alignItems: "center",
    gap: 15,
  },

  docName: { fontSize: 16, fontWeight: "bold" },
  docCategory: { fontSize: 13, color: "#666" },
  noDocs: { textAlign: "center", marginTop: 20, color: "#777" },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    backgroundColor: "#fff",
    margin: 25,
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },

  uploadBtn: {
    backgroundColor: "#2B74E4",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  button: {
    width: "48%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
