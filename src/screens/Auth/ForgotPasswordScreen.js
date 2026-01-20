import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';



import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    
    <View style={styles.safe}>

      {/* BACK ICON */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="#0a57ff" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>

          {/* ILLUSTRATION */}
          <Image
            source={require('../../assets/images/forget.png')}
            style={styles.topImage}
            resizeMode="contain"
          />

          {/* TITLE */}
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your registered email and we’ll help you reset your password
          </Text>

          {/* EMAIL */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* RESET BUTTON */}
          <TouchableOpacity style={styles.resetButton} activeOpacity={0.8}>
            <Text style={styles.resetText}>Reset Password</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  backIcon: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eef4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },

  topImage: {
    width: '100%',
    height: 220,
    marginBottom: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#eef4ff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 25,
    fontSize: 15,
  },

  resetButton: {
    backgroundColor: '#2b7bbb',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  resetText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
