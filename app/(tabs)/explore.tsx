import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent} // Apply centering styles here
    >
      <View style={styles.card}>
        <View style={styles.profileInfo}>
          <Image
            source={require('@/assets/images/profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.email}>johndoe@example.com</Text>
          </View>
        </View>

        <ThemedText style={styles.description}>
          This is your profile. You can view and edit your information here.
        </ThemedText>

        <Collapsible title="Personal Information">
          <ThemedText>Name: John Doe</ThemedText>
          <ThemedText>Email: johndoe@example.com</ThemedText>
        </Collapsible>

        <Collapsible title="Settings">
          <ThemedText>
            You can change your preferences and update settings from this section.
          </ThemedText>
        </Collapsible>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    paddingVertical: 20, // Optional: adds padding to the top and bottom
  },
  card: {
    width: '90%', // Adjust width as needed
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 20, // To avoid sticking to the top
    justifyContent: 'center', // Center horizontally
  },
  profileDetails: {
    marginLeft: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 12,
    textDecorationLine: "underline",
    color: '#808080',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
