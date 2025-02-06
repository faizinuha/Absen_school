import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/absen.jpg')} // Ubah path sesuai dengan lokasi gambar Anda
        style={styles.profileImage}
      />
      <Text style={styles.text}>Welcome to Absen Application</Text>
      <Text style={styles.subText}>SMK Al Azhar</Text>

      {/* Deskripsi aplikasi */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Aplikasi Absen untuk memudahkan pencatatan kehadiran siswa di SMK Al Azhar.</Text>
      </View>

      {/* Tombol untuk aksi selanjutnya */}
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
    backgroundColor: '#f0f8ff', // Warna latar belakang lembut, memberikan nuansa sekolah
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#2e6f96', // Tambahkan border untuk gambar profil
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e6f96', // Warna biru sekolah yang elegan
    marginBottom: 10,
  },
  subText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#2e6f96', // Warna biru untuk kesan profesional
    marginBottom: 20,
  },
  descriptionContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2e6f96',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
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
    color: '#2e6f96',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default Welcome;
