import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react'; // Impor useState untuk mengelola state
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  const [income, setIncome] = useState(''); // State untuk nominal pendapatan
  const [showInput, setShowInput] = useState(false); // State untuk mengelola visibilitas input

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">User Profile</ThemedText>
      </ThemedView>
      
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
      
      <ThemedText style={styles.introText}>
        This is your profile. You can view and edit your information here.
      </ThemedText>
      
      <Collapsible title="Personal Information">
        <ThemedText>
          Name: John Doe
        </ThemedText>
        <ThemedText>
          Email: johndoe@example.com
        </ThemedText>
      </Collapsible>

      <Collapsible title="Settings">
        <TouchableOpacity onPress={() => setShowInput(!showInput)} style={styles.button}>
          <Text style={styles.buttonText}>Toggle Input</Text>
        </TouchableOpacity>
        
        {showInput && (
          <View style={styles.settingsContainer}>
            <Text style={styles.label}>Masukan Nomer</Text>
            <TextInput
              style={styles.input}
              value={income}
              onChangeText={setIncome}
              placeholder="Masukkan Nomer"
              keyboardType="numeric"
            />
          </View>
        )}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
    fontSize: 16,
    textDecorationLine: "underline",
    color: '#808080',
  },
  introText: {
    fontSize: 16,
    marginHorizontal: 20,
    textAlign: 'center',
    color: '#444',
  },
  settingsContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF', // Warna latar belakang tombol
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
