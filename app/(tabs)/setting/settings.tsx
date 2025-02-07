import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react'; // Impor useState dan useEffect untuk mengelola state dan efek samping
import AsyncStorage from '@react-native-async-storage/async-storage'; // Impor AsyncStorage untuk menyimpan data
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  // State untuk menyimpan data pengguna
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('');
  const [showSettings, setShowSettings] = useState(false); // State untuk toggle pengaturan

  // Mengambil data dari AsyncStorage ketika komponen pertama kali dimuat
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedUsername && storedEmail) {
          setUsername(storedUsername);
          setEmail(storedEmail);
        }
      } catch (error) {
        console.log('Failed to load data from AsyncStorage', error);
      }
    };
    
    loadData();
  }, []);

  // Menyimpan data ke AsyncStorage
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('email', email);
      // Bisa juga menambahkan password jika diperlukan
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Failed to save data to AsyncStorage', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Settings</ThemedText>
        </ThemedView>

        <View style={styles.profileInfo}>
          <Image
            source={require('@/assets/images/profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>

        <ThemedText>
          Here you can edit your profile information and update your settings.
        </ThemedText>

        <Collapsible title="Personal Information">
          <ThemedText>Name: {username}</ThemedText>
          <ThemedText>Email: {email}</ThemedText>
        </Collapsible>

        <Collapsible title="Edit Profile Settings">
          <TouchableOpacity onPress={() => setShowSettings(!showSettings)} style={styles.button}>
            <Text style={styles.buttonText}>Edit Settings</Text>
          </TouchableOpacity>

          {showSettings && (
            <View style={styles.settingsContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter new username"
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter new email"
                keyboardType="email-address"
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter new password"
                secureTextEntry
              />
            </View>
          )}
        </Collapsible>

        {/* Tombol Simpan */}
        <TouchableOpacity onPress={saveData} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
    </ScrollView>
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
    fontSize: 10,
    textDecorationLine: "underline",
    color: '#808080',
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
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
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
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
