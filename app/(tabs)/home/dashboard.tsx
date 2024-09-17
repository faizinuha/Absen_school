import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/robot_absen.png')} // Ubah path sesuai dengan lokasi gambar Anda
        style={styles.profileImage}
      />
      <Text style={styles.text}>Selamat Datang di Aplikasi Keluarga!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#000',
  },
});

export default Welcome;
