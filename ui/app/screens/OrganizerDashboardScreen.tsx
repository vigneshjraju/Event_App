import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { fetchCurrentUser } from '../../api/userApi';
import { fetchUserEvents } from '../../api/eventApi';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




const OrganizerDashboardScreen = () => {

  const router = useRouter(); 
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const userData = await fetchCurrentUser();
        const userEvents = await fetchUserEvents();

        setUser(userData);
        setEvents(userEvents);
      } catch (err) {
        console.error('Error loading dashboard', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear the token from AsyncStorage (or any other auth storage method you're using)
      await AsyncStorage.removeItem('token'); // or use your preferred method

      // Optionally show a confirmation message
      Alert.alert('Logged out', 'You have been logged out successfully.');

      // Navigate to login screen or home screen after logging out
      router.push('/screens/LoginScreen'); // Adjust this according to your routes
    } catch (error) {
      console.error('Error logging out', error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../photos/icon.png')} // Replace with your actual logo URL
          style={styles.logo}
        />
        <Text style={styles.title}>Organizer Dashboard</Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <ScrollView style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {user?.name || user?.email}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{events.length}</Text>
            <Text style={styles.statLabel}>Total Events</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {events.filter((e) => new Date(e.date) > new Date()).length}
            </Text>
            <Text style={styles.statLabel}>Upcoming Events</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>25</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.createEventButton} onPress={() => router.push('/screens/CreateEvent')}>
          <Text style={styles.createEventButtonText}>+ CREATE NEW EVENT</Text>
        </TouchableOpacity>

        
        <Text style={styles.eventsTitle}>Events</Text>
        {events.map((event) => (
          <TouchableOpacity
            key={event._id}
            onPress={() =>
              router.push({
                pathname: '/screens/Getevent',
                params: { eventId: event._id },
              })
            }
          >
            <View style={styles.eventItem}>
              <Image
                source={{
                  uri: event.photo
                    ? `data:image/jpeg;base64,${event.photo}`
                    : 'https://via.placeholder.com/150',
                }}
                style={styles.eventImage}
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{event.eventName}</Text>
                <Text style={styles.eventDate}>{event.date || 'No Date'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    paddingVertical: 20,
  },

  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#ff4757',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },


  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    marginHorizontal: 15,
    padding: 20,
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '30%',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  createEventButton: {
    backgroundColor: '#776E65',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 25,
  },
  createEventButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1, // Added border
    borderColor: '#D3D3D3', // Light gray border
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  eventDetails: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
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

export default OrganizerDashboardScreen;