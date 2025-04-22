import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";


export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the App</Text>
      <Button title="Go to Signup" onPress={() => router.push("/screens/SignupScreen")} />
      <Button title="Go to Login" onPress={() => router.push("/screens/LoginScreen")} />
      <Button title="Organizer Dashboard" onPress={() => router.push('/screens/OrganizerDashboardScreen')} />
      <Button title="Create Event" onPress={() => router.push('/screens/CreateEvent')}/>
      <Button title="Event" onPress={() => router.push('/screens/Getevent')}/>
      <Button title="Edit Event" onPress={() => router.push('/screens/EditEvent')}/>
    </View>
  );
}



