import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';



const SignupScreen = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'organizer',
  });

  const router = useRouter(); // Initialize router

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        Platform.OS === 'android'
          ? 'http://192.168.179.110:3000/users/signup'
          : 'http://192.168.179.110:3000/users/signup',
        form,
        { withCredentials: true } // ← Important for cookies
      );
      Alert.alert('Success', response.data.message);
      //Navigate to login screen
      router.push('/screens/LoginScreen');


    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../photos/icon.png')} // Replace with actual logo
          style={styles.logo}
        />
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.roleContainer}>
          <View style={styles.radioOuter}>
            <View style={styles.radioInner} />
          </View>
          <Text style={styles.roleText}>Organiser</Text>
        </View>

        <TextInput
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.copyright}>©2025 Event Management App</Text>
        <Image
          source={require('../photos/icon.png')} 
          style={styles.smallLogo}
        />
        <Text style={styles.tagline}>Plan Smart. Manage Better. Celebrate More.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4865A8',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 15,
    paddingBottom: 30,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#776E65',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#776E65',
  },
  roleText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#776E65',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#D9D9D9',
    marginTop: 20,
  },
  copyright: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  smallLogo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  tagline: {
    fontSize: 12,
    color: '#333',
  },
});

export default SignupScreen;


