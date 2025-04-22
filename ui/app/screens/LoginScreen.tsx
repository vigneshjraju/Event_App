import React, { useState } from 'react';
import { useRouter } from 'expo-router';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import axios from 'axios';




const LoginScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        Platform.OS === 'android'
          ? 'http://192.168.179.110:3000/users/login'
          : 'http://192.168.179.110:3000/users/login',
        form,
        { withCredentials: true } // Required for cookies to work
      );

      Alert.alert('Success', response.data.message || 'Logged in!');
      router.push('/screens/OrganizerDashboardScreen');

    } catch (error: any) {
      Alert.alert('Login Failed', error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../photos/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Log In</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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

export default LoginScreen;
