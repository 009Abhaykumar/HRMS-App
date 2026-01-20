import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileOptionsModal({
  visible,
  onClose,
  onEditProfile,
  onEditBank,
}) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item} onPress={onEditProfile}>
            <Icon name="account-edit-outline" size={20} />
            <Text style={styles.text}>Edit Profile Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={onEditBank}>
            <Icon name="bank-outline" size={20} />
            <Text style={styles.text}>Bank Details</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 80,
    paddingRight: 20,
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 220,
    elevation: 6,
    paddingVertical: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  text: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
  },
});
