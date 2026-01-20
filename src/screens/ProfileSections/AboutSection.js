import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import DetailGrid from "../../components/DetailGrid";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"; 

export default function AboutSection() {
  const user = useSelector((state) => state.user);
  const [editVisible, setEditVisible] = useState(false);

  const educationList = Array.isArray(user.education) ? user.education : [];
  const experienceList = Array.isArray(user.experience) ? user.experience : [];
  const emergencyList = Array.isArray(user.emergencyContacts) ? user.emergencyContacts : [];

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <DetailGrid
        title="Primary Details"
        rows={[
          { label: "Name", value: user.name },
          { label: "Marital Status", value: user.maritalStatus },
          { label: "Date of Birth", value: user.dob },
          { label: "Blood Group", value: user.bloodGroup },
          { label: "Birth Mark", value: user.birthMark },
        ]}
      />

      <DetailGrid
        title="Official Details"
        rows={[
          { label: "Designation", value: user.designation },
          { label: "Employee Role", value: user.role },
          { label: "Joining Date", value: user.joiningDate },
        ]}
      />

      <DetailGrid
        title="Address Details"
        rows={[
          { label: "Current Address", value: user.address },
          { label: "Permanent Address", value: user.permanentAddress },
        ]}
      />

      <Text style={styles.sectionTitle}>Education Details</Text>

      {educationList.length === 0 ? (
        <Text style={styles.emptyMsg}>No Education Records Found</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {educationList.map((edu, index) => (
            <View key={index} style={{ marginRight: 12, width: 320 }}>
              <DetailGrid
                title={`Education ${index + 1}`}
                rows={[
                  { label: "College", value: edu.college },
                  { label: "Course", value: edu.course },
                  { label: "Grade", value: edu.grade },
                  { label: "From", value: edu.fromYear },
                  { label: "To", value: edu.endYear },
                ]}
              />
            </View>
          ))}
        </ScrollView>
      )}

      <Text style={styles.sectionTitle}>Experience Details</Text>

      {experienceList.length === 0 ? (
        <Text style={styles.emptyMsg}>No Experience Records Found</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {experienceList.map((exp, index) => (
            <View key={index} style={{ marginRight: 12, width: 320 }}>
              <DetailGrid
                title={`Company ${index + 1}`}
                rows={[
                  { label: "Company Name", value: exp.companyName },
                  { label: "Designation", value: exp.designation },
                  { label: "Job Position", value: exp.position },
                  { label: "Duration", value: exp.duration },
                  { label: "Monthly CTC", value: exp.ctc },
                  { label: "Monthly In Hand", value: exp.inHand },
                ]}
              />
            </View>
          ))}
        </ScrollView>
      )}

      <Text style={styles.sectionTitle}>Emergency Details</Text>

      {emergencyList.length === 0 ? (
        <Text style={styles.emptyMsg}>No Emergency Contact Added</Text>
      ) : (
        emergencyList.map((person, index) => (
          <DetailGrid
            key={index}
            title={`Contact Person ${index + 1}`}
            rows={[
              { label: "Name", value: person?.name },
              { label: "Relation", value: person?.relation },
              { label: "Number", value: person?.phone },
            ]}
          />
        ))
      )}

      <TouchableOpacity style={styles.editBtn} onPress={() => setEditVisible(true)}>
        <Icon name="pencil" size={18} color="#fff" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <EditProfile visible={editVisible} onClose={() => setEditVisible(false)} user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A73E8",
    marginBottom: 10,
    marginTop: 15,
  },
  emptyMsg: {
    color: "#777",
    marginBottom: 10,
    fontStyle: "italic",
  },
  editBtn: {
    marginTop: 20,
    backgroundColor: "#1A73E8",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  editText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
  },
});
