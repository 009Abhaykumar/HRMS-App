import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ApplyButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Apply</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 1,
    right: 1,
    backgroundColor: "#0a57ff",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 25,
    elevation: 4,
    zIndex: 999,  
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
