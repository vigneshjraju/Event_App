import { useLocalSearchParams, router } from "expo-router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from 'react-native';


const EditEventScreen = () => {
  const { eventId } = useLocalSearchParams();

  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://192.168.179.110:3000/events/${eventId}`, {
          withCredentials: true,
        });
        const event = response.data.event;
        setEventName(event.eventName);
        setLocation(event.location);
        setDate(event.date?.slice(0, 10)); // Format YYYY-MM-DD if needed
        setTicketPrice(event.ticketPrice.toString());
        setDescription(event.description);
        // optionally: setPhoto(event.photo); if you fetch photo URL/base64
      } catch (error: any) {
        Alert.alert('Error', error.response?.data?.message || error.message);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]?.base64) {
        setPhoto(result.assets[0].base64);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleUpdateEvent = async () => {
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
          uri: `data:image/jpeg;base64,${photo}`,
          name: 'event.jpg',
          type: 'image/jpeg',
        } as any);
      }

      await axios.patch(
        `http://192.168.179.110:3000/events/${eventId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      Alert.alert('Success', 'Event updated successfully');

      router.push('/screens/OrganizerDashboardScreen');
      
    
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Edit Event</Text>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>

            <Text style={styles.label}>Event Name</Text>
            <TextInput style={styles.input} value={eventName} onChangeText={setEventName} />

            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} value={location} onChangeText={setLocation} />

            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input} value={date} onChangeText={setDate} />

            <Text style={styles.label}>Ticket Price</Text>
            <TextInput style={styles.input} value={ticketPrice} onChangeText={setTicketPrice} keyboardType="numeric" />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.multilineInput} value={description} onChangeText={setDescription} multiline numberOfLines={3} />

            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadButtonText}>{photo ? 'Photo Selected' : 'Upload New Photo'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.createButton}
                onPress={handleUpdateEvent} 
                >
                <Text style={styles.createButtonText}>Update Event</Text>
            </TouchableOpacity>



          </View>
        </ScrollView>
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

export default EditEventScreen;
