import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/userActions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EditProfile({ visible, onClose, user }) {
  const dispatch = useDispatch();

  // ---------------- FORM ----------------
  const [form, setForm] = useState({
    name: "",
    dob: "",
    maritalStatus: "",
    bloodGroup: "",
    birthMark: "",
    address: "",
    permanentAddress: "",

    // Newly added personal fields
    fatherName: "",
    motherName: "",
    gender: "",
    birthPlace: "",
    marriageDate: "",
    aadhaar: "",
    pan: "",
    uan: "",
    esi: "",

    education: [],
    experience: [],
    emergencyContacts: [],
  });

  // ---------------- INITIALIZE FORM ----------------
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        dob: user.dob || "",
        maritalStatus: user.maritalStatus || "",
        bloodGroup: user.bloodGroup || "",
        birthMark: user.birthMark || "",
        address: user.address || "",
        permanentAddress: user.permanentAddress || "",

        // newly added fields
        fatherName: user.fatherName || "",
        motherName: user.motherName || "",
        gender: user.gender || "",
        birthPlace: user.birthPlace || "",
        marriageDate: user.marriageDate || "",
        aadhaar: user.aadhaar || "",
        pan: user.pan || "",
        uan: user.uan || "",
        esi: user.esi || "",

        education:
          Array.isArray(user.education) && user.education.length
            ? user.education.map((e) => ({ ...e }))
            : [],
        experience:
          Array.isArray(user.experience) && user.experience.length
            ? user.experience.map((e) => ({ ...e }))
            : [],
        emergencyContacts:
          Array.isArray(user.emergencyContacts) &&
            user.emergencyContacts.length
            ? user.emergencyContacts.map((c) => ({ ...c }))
            : [],
      });
    }
  }, [user, visible]);

  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  // ---------------- EDUCATION HELPERS (unchanged) ----------------
  const addEducation = () => {
    setForm((p) => ({
      ...p,
      education: [
        ...p.education,
        {
          id: Date.now(),
          college: "",
          course: "",
          grade: "",
          fromYear: "",
          endYear: "",
        },
      ],
    }));
  };

  const updateEducationField = (i, key, value) => {
    const arr = [...form.education];
    arr[i] = { ...arr[i], [key]: value };
    setForm({ ...form, education: arr });
  };

  const removeEducation = (i) => {
    const arr = [...form.education];
    arr.splice(i, 1);
    setForm({ ...form, education: arr });
  };

  // ---------------- EXPERIENCE HELPERS (unchanged) ----------------
  const addExperience = () => {
    setForm((p) => ({
      ...p,
      experience: [
        ...p.experience,
        {
          id: Date.now(),
          companyName: "",
          designation: "",
          position: "",
          duration: "",
          ctc: "",
          inHand: "",
        },
      ],
    }));
  };

  const updateExperienceField = (i, key, value) => {
    const arr = [...form.experience];
    arr[i] = { ...arr[i], [key]: value };
    setForm({ ...form, experience: arr });
  };

  const removeExperience = (i) => {
    const arr = [...form.experience];
    arr.splice(i, 1);
    setForm({ ...form, experience: arr });
  };

  // ---------------- EMERGENCY HELPERS (unchanged) ----------------
  const addEmergency = () => {
    setForm((p) => ({
      ...p,
      emergencyContacts: [
        ...p.emergencyContacts,
        { id: Date.now(), name: "", relation: "", phone: "" },
      ],
    }));
  };

  const updateEmergencyField = (i, key, value) => {
    const arr = [...form.emergencyContacts];
    arr[i] = { ...arr[i], [key]: value };
    setForm({ ...form, emergencyContacts: arr });
  };

  const removeEmergency = (i) => {
    const arr = [...form.emergencyContacts];
    arr.splice(i, 1);
    setForm({ ...form, emergencyContacts: arr });
  };

  // ---------------- SAVE ----------------
  const handleSave = () => {
    if (!form.name.trim()) return Alert.alert("Enter name");

    dispatch(updateUser({ ...form }));
    onClose();
  };

  // ---------------- UI ----------------
  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={styles.container}>
       

        {/* ---------- PERSONAL INFO (Updated with new fields) ---------- */}
        <View style={styles.headerRow}>
          <Text style={styles.header}>Edit Profile</Text>

          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={26} color="#333" />
          </TouchableOpacity>
        </View>


        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={(t) => setField("name", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Father Name"
          value={form.fatherName}
          onChangeText={(t) => setField("fatherName", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Mother Name"
          value={form.motherName}
          onChangeText={(t) => setField("motherName", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={form.gender}
          onChangeText={(t) => setField("gender", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Birth Place"
          value={form.birthPlace}
          onChangeText={(t) => setField("birthPlace", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={form.dob}
          onChangeText={(t) => setField("dob", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Marital Status"
          value={form.maritalStatus}
          onChangeText={(t) => setField("maritalStatus", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Marriage Date"
          value={form.marriageDate}
          onChangeText={(t) => setField("marriageDate", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Blood Group"
          value={form.bloodGroup}
          onChangeText={(t) => setField("bloodGroup", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Birth Mark"
          value={form.birthMark}
          onChangeText={(t) => setField("birthMark", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Aadhaar Number"
          value={form.aadhaar}
          onChangeText={(t) => setField("aadhaar", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="PAN"
          value={form.pan}
          onChangeText={(t) => setField("pan", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="UAN"
          value={form.uan}
          onChangeText={(t) => setField("uan", t)}
        />

        <TextInput
          style={styles.input}
          placeholder="ESI"
          value={form.esi}
          onChangeText={(t) => setField("esi", t)}
        />

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Current Address"
          value={form.address}
          onChangeText={(t) => setField("address", t)}
          multiline
        />

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Permanent Address"
          value={form.permanentAddress}
          onChangeText={(t) => setField("permanentAddress", t)}
          multiline
        />

        {/* ---------------- EDUCATION (unchanged) ---------------- */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Education Details</Text>
          <TouchableOpacity onPress={addEducation}>
            <Text style={styles.addMore}>+ Add Education</Text>
          </TouchableOpacity>
        </View>

        {(form.education || []).map((edu, i) => (
          <View key={edu.id ?? i} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>Education {i + 1}</Text>
              <TouchableOpacity onPress={() => removeEducation(i)}>
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="College"
              value={edu.college}
              onChangeText={(t) => updateEducationField(i, "college", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Course"
              value={edu.course}
              onChangeText={(t) => updateEducationField(i, "course", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Grade"
              value={edu.grade}
              onChangeText={(t) => updateEducationField(i, "grade", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="From Year"
              value={edu.fromYear}
              onChangeText={(t) => updateEducationField(i, "fromYear", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="End Year"
              value={edu.endYear}
              onChangeText={(t) => updateEducationField(i, "endYear", t)}
            />
          </View>
        ))}

        {/* ---------------- EXPERIENCE (unchanged) ---------------- */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          <TouchableOpacity onPress={addExperience}>
            <Text style={styles.addMore}>+ Add Experience</Text>
          </TouchableOpacity>
        </View>

        {(form.experience || []).map((exp, i) => (
          <View key={exp.id ?? i} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>Company {i + 1}</Text>
              <TouchableOpacity onPress={() => removeExperience(i)}>
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Company Name"
              value={exp.companyName}
              onChangeText={(t) => updateExperienceField(i, "companyName", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Designation"
              value={exp.designation}
              onChangeText={(t) => updateExperienceField(i, "designation", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Job Position"
              value={exp.position}
              onChangeText={(t) => updateExperienceField(i, "position", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Duration"
              value={exp.duration}
              onChangeText={(t) => updateExperienceField(i, "duration", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Monthly CTC"
              value={exp.ctc}
              onChangeText={(t) => updateExperienceField(i, "ctc", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Monthly In Hand"
              value={exp.inHand}
              onChangeText={(t) => updateExperienceField(i, "inHand", t)}
            />
          </View>
        ))}

        {/* ---------------- EMERGENCY CONTACT (unchanged) ---------------- */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <TouchableOpacity onPress={addEmergency}>
            <Text style={styles.addMore}>+ Add Contact</Text>
          </TouchableOpacity>
        </View>

        {(form.emergencyContacts || []).map((c, i) => (
          <View key={c.id ?? i} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>Contact {i + 1}</Text>
              <TouchableOpacity onPress={() => removeEmergency(i)}>
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={c.name}
              onChangeText={(t) => updateEmergencyField(i, "name", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Relation"
              value={c.relation}
              onChangeText={(t) => updateEmergencyField(i, "relation", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={c.phone}
              onChangeText={(t) => updateEmergencyField(i, "phone", t)}
            />
          </View>
        ))}

        {/* ---------------- DOCUMENTS (unchanged) ---------------- */}
        <Text style={styles.sectionTitle}>Upload Documents</Text>
        <View style={styles.uploadRow}>
          <Text style={styles.uploadLabel}>Aadhar</Text>
          <TouchableOpacity style={styles.uploadBtn}>
            <Text style={{ color: "#fff" }}>Upload</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.uploadRow}>
          <Text style={styles.uploadLabel}>CV</Text>
          <TouchableOpacity style={styles.uploadBtn}>
            <Text style={{ color: "#fff" }}>Upload</Text>
          </TouchableOpacity>
        </View>

        {/* ---------------- SAVE / CANCEL ---------------- */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={{ textAlign: "center" }}>Cancel</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: "#F7F9FF" },
  header: { fontSize: 20, fontWeight: "700", marginTop: 6, color: "#1A73E8" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 18,
    color: "#1A73E8",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#EEF1F6",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addMore: { color: "#1A73E8", fontWeight: "700", top: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 15, fontWeight: "700" },
  remove: { color: "#E53935", fontWeight: "600" },
  uploadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  uploadLabel: { fontSize: 16, fontWeight: "600" },
  uploadBtn: {
    backgroundColor: "#1A73E8",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveBtn: {
    backgroundColor: "#1A73E8",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 6,
},

  saveText: { color: "#fff", textAlign: "center", fontSize: 16 },
  cancelBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#eee",
  },
});
