import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>

        {/* TOP ILLUSTRATION */}
        <Image
          source={require('../../assets/images/main.png')}
          style={styles.topImage}
          resizeMode="contain"
        />

        {/* FORM */}
        <Text style={styles.hello}>Hello!</Text>
        <Text style={styles.welcome}>
          Welcome Back <Text style={styles.wave}>👋</Text>
        </Text>
        <Text style={styles.subtitle}>
          The world is just a step away from here
        </Text>

        {/* Email */}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <Text style={styles.label}>Password:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={setPassword}
          />

          {/* 👁 CUSTOM IMAGE ICONS */}
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeButton}
          >
            <Image
              source={
                hidePassword
                  ? require('../../assets/icons/hide.png')
                  : require('../../assets/icons/eye.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Login */}
        <TouchableOpacity
  style={styles.signInButton}
  onPress={() => navigation.replace("MainDrawer")}
>
  <Text style={styles.signInText}>Sign In</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>

          <Text style={styles.forgot}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
 container: {
  padding: 25,
  backgroundColor: '#fff',
  minHeight: '100%',
  justifyContent: 'center',
},


  // IMAGE ON TOP
  topImage: {
    width: '100%',
    height: 240,
    marginBottom: 20,
  },

  hello: {
    fontSize: 28,
    fontWeight: '600',
  },
  welcome: {
    fontSize: 34,
    fontWeight: '800',
    marginTop: 5,
  },
  wave: { fontSize: 34 },
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
    marginBottom: 15,
    fontSize: 15,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef4ff',
    borderRadius: 8,
    marginBottom: 20,
  },

  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 15,
  },

  eyeButton: {
    paddingHorizontal: 12,
  },
  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: '#555',
  },

  signInButton: {
    backgroundColor: '#0a57ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },

  signInText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  forgot: {
    textAlign: 'right',
    marginTop: 8,
    color: '#0a57ff',
    fontWeight: '600',
  },
});
