import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

const AssetsSection = () => {
  const assets = useSelector((state) => state.assets.assets || []);
  const [search, setSearch] = useState("");

  const filteredAssets = assets.filter((item) =>
    item.extension?.toString().includes(search)
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Asset ({assets.length})</Text>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search Extension No."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* EMPTY MESSAGE */}
      {assets.length === 0 && (
        <Text style={styles.emptyMsg}>No System Alloted</Text>
      )}

      {/* TABLE */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.th}>Sr. No.</Text>
          <Text style={styles.thWide}>Date</Text>
          <Text style={styles.thWide}>Description</Text>
          <Text style={styles.th}>Qty</Text>
        </View>

        {filteredAssets.map((item, index) => (
          <View key={index} style={styles.tr}>
            <Text style={styles.td}>{index + 1}</Text>
            <Text style={styles.tdWide}>{item.date}</Text>
            <Text style={styles.tdWide}>{item.description}</Text>
            <Text style={styles.td}>{item.quantity}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default AssetsSection;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#F2F5FF",
    flex: 1,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A73E8",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    elevation: 3,
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 6,
    color: "#555",
  },

  searchInput: {
    width: 140,
    fontSize: 14,
  },

  emptyMsg: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#444",
  },

  table: {
    backgroundColor: "#fff",
    elevation: 4,
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },

  tableHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },

  th: {
    width: "20%",
    fontWeight: "700",
    color: "#555",
    textAlign: "center",
  },

  thWide: {
    width: "30%",
    fontWeight: "700",
    color: "#555",
    textAlign: "center",
  },

  tr: {
    flexDirection: "row",
    paddingVertical: 6,
  },

  td: {
    width: "20%",
    color: "#333",
    textAlign: "center",
  },

  tdWide: {
    width: "30%",
    color: "#333",
    textAlign: "center",
  },
});
