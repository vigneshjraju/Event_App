// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = 'http://your-api-base-url.com';

// interface Event {
//   photo: string;
//   eventName: string;
//   date: string;
//   description: string;
//   location: string;
//   ticketPrice: number;
// }

// const GetEventScreen = () => {
//   const { eventId } = useLocalSearchParams();

//   const [event, setEvent] = useState<Event | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const response = await axios.get(`${API_BASE_URL}/events/${eventId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const eventData: Event = response.data.event;
//         setEvent(eventData);
//       } catch (err: any) {
//         setError(err.response?.data?.message || 'Error fetching event details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (eventId) {
//       fetchEventDetails();
//     }
//   }, [eventId]);

//   if (loading) {
//     return (
//       <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <ActivityIndicator size="large" color="#fff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   if (!event) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>No event details to display.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.content}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Event Details</Text>
//           <TouchableOpacity style={styles.editButton}>
//             <Text style={styles.editButtonText}>Edit</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.eventImageContainer}>
//           <Image
//             source={
//               event.photo
//                 ? { uri: event.photo }
//                 : require('../../assets/default-event.jpg')
//             }
//             style={styles.eventImage}
//           />
//         </View>

//         <Text style={styles.eventName}>{event.eventName}</Text>
//         <Text style={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</Text>

//         <View style={styles.descriptionContainer}>
//           <Text style={styles.descriptionTitle}>Description</Text>
//           <Text style={styles.descriptionText}>{event.description}</Text>
//         </View>

//         <View style={styles.locationContainer}>
//           <Text style={styles.locationTitle}>Location</Text>
//           <Text style={styles.locationText}>{event.location}</Text>
//         </View>

//         <View style={styles.priceContainer}>
//           <Text style={styles.priceTitle}>Ticket Price (In Rupees)</Text>
//           <Text style={styles.priceText}>₹{event.ticketPrice} / -</Text>
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <Text style={styles.copyright}>©2025 Event Management App</Text>
//         <Image
//           source={require('../photos/icon.png')}
//           style={styles.smallLogo}
//         />
//         <Text style={styles.tagline}>Plan Smart. Manage Better. Celebrate More.</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4865A8',
//     paddingTop: 50,
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#D9D9D9',
//     borderRadius: 20,
//     marginHorizontal: 15,
//     padding: 20,
//     paddingBottom: 30,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   editButton: {
//     backgroundColor: '#776E65',
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   eventImageContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   eventImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//   },
//   eventName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   eventDate: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//   },
//   descriptionContainer: {
//     backgroundColor: '#F0F0F0',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//   },
//   descriptionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   descriptionText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   locationContainer: {
//     marginBottom: 20,
//   },
//   locationTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   locationText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   priceContainer: {
//     marginBottom: 20,
//   },
//   priceTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   priceText: {
//     fontSize: 16,
//     color: '#FF6347',
//     fontWeight: 'bold',
//   },
//   footer: {
//     alignItems: 'center',
//     paddingVertical: 20,
//     backgroundColor: '#D9D9D9',
//     marginTop: 20,
//   },
//   copyright: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 5,
//   },
//   smallLogo: {
//     width: 50,
//     height: 50,
//     marginBottom: 5,
//   },
//   tagline: {
//     fontSize: 12,
//     color: '#333',
//   },
//   errorContainer: {
//     backgroundColor: '#F87171',
//     borderRadius: 8,
//     padding: 16,
//     margin: 16,
//     alignItems: 'center',
//   },
//   errorText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   noEventText: {
//     fontSize: 18,
//     color: '#333',
//     textAlign: 'center',
//     marginTop: 20,
//   }
// });

// export default GetEventScreen;
