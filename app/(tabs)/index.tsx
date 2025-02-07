import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/absen.jpg')} // Pastikan path gambar benar
        style={styles.profileImage}
      />
      <Text style={styles.title}>Welcome to Absen Application</Text>
      <Text style={styles.subtitle}>SMK Al Azhar</Text>

      {/* Deskripsi aplikasi */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          Aplikasi absen untuk memudahkan pencatatan kehadiran siswa di SMK Al Azhar.
        </Text>
      </View>

      {/* Tombol aksi */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Navigating to the next screen')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => alert('Opening Help')}>
        <Text style={styles.secondaryButtonText}>Need Help?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd', // Warna lebih soft dan modern
    padding: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#1565c0', // Biru lebih elegan
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d47a1', // Biru lebih solid
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#1565c0',
    marginBottom: 20,
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1565c0',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#0d47a1',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default Welcome;
