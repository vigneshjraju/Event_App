import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert,KeyboardAvoidingView,Platform,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { router } from 'expo-router';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

const CreateEventScreen = () => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  




  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true, // Ensuring base64 is included in the response
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]?.base64) {
        setPhoto(result.assets[0].base64);  // Set base64 image data
      } else {
        Alert.alert('No image selected or selection failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };
  

  const handleCreateEvent = async () => {
    
    if (!eventName || !location || !date || !ticketPrice) {
      Alert.alert('Please fill in all required fields.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('eventName', eventName);
      formData.append('location', location);
      formData.append('date', date);
      formData.append('ticketPrice', ticketPrice);
      formData.append('description', description);
  
      if (photo) {
        formData.append('photo', {
          uri: `data:image/jpeg;base64,${photo}`, // ensure valid base64
          name: 'event.jpg',
          type: 'image/jpeg',
        } as any); // TypeScript requires a type assertion here
      }
  
      const response = await axios.post(
        'http://192.168.179.110:3000/events',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      const createdEventId = response.data._id; // or response.data._id based on backend
      Alert.alert('Success', response.data.message);
      
      router.push({
        pathname: "/screens/Getevent",
        params: { eventId: createdEventId },
      });
      
  

    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong';
      Alert.alert('Error', errorMessage);
    }
  };
  

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../photos/icon.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Create Event</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>


            <Text style={styles.label}>Event Name</Text>
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#888" value={eventName} onChangeText={setEventName} />

            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} placeholder="Location" placeholderTextColor="#888" value={location} onChangeText={setLocation} />

            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input} placeholder="YYYY-MM-DD" placeholderTextColor="#888" value={date} onChangeText={setDate} />

            <Text style={styles.label}>Ticket Price</Text>
            <TextInput style={styles.input} placeholder="Price" placeholderTextColor="#888" keyboardType="numeric" value={ticketPrice} onChangeText={setTicketPrice} />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.multilineInput} placeholder="Description" placeholderTextColor="#888" multiline numberOfLines={3} value={description} onChangeText={setDescription} />

            <Text style={styles.label}>Photo</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadButtonText}>{photo ? 'Photo Selected' : 'Upload Photo'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
              <Text style={styles.createButtonText}>Create Event</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* <View style={styles.footer}>
          <Text style={styles.copyright}>©2025 Event Management App</Text>
          <Image
            source={require('../photos/icon.png')}
            style={styles.smallLogo}
          />
          <Text style={styles.tagline}>Plan Smart. Manage Better. Celebrate More.</Text>
        </View> */}
      </View>
    </KeyboardAvoidingView>
  
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
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
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
  multilineInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  uploadButtonText: {
    color: '#333',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#776E65',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  createButtonText: {
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

export default CreateEventScreen;
