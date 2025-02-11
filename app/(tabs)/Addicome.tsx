import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";

export default function AddAttendance() {
  const [name, setName] = useState("");
  const [kehadiran, setKehadiran] = useState("Hadir");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const kehadiranOptions = ["Hadir", "Sakit", "Izin Keluarga"];

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const getLocation = async () => {
    setLoadingLocation(true);
    try {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } catch (error) {
      Alert.alert("Error", "Gagal mendapatkan lokasi.");
    } finally {
      setLoadingLocation(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Silakan isi nama terlebih dahulu.");
      return false;
    }
    if (!location) {
      Alert.alert("Error", "Silakan ambil lokasi terlebih dahulu.");
      return false;
    }
    if ((kehadiran === "Sakit" || kehadiran === "Izin Keluarga") && !photo) {
      Alert.alert("Error", "Silakan unggah bukti foto.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    const newAttendance = { name, kehadiran, date: date.toISOString(), location, photo };
    try {
      const storedData = await AsyncStorage.getItem("dataKehadiran");
      const data = storedData ? JSON.parse(storedData) : [];
      data.push(newAttendance);
      await AsyncStorage.setItem("dataKehadiran", JSON.stringify(data));
      Alert.alert("Sukses", "Data kehadiran berhasil disimpan.");
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan data.");
    }
  };

  const resetForm = () => {
    setName("");
    setKehadiran("Hadir");
    setDate(new Date());
    setLocation(null);
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋Yuk Absen...</Text>
      <Text style={styles.label}>Nama</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Masukkan nama..." />

      <Text style={styles.label}>Absen</Text>
      <Picker selectedValue={kehadiran} style={styles.input} onValueChange={setKehadiran}>
        {kehadiranOptions.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>

      {(kehadiran === "Sakit" || kehadiran === "Izin Keluarga") && (
        <>
          <Text style={styles.label}>Bukti Foto</Text>
          <TouchableOpacity style={styles.buttonSecondary} onPress={pickImage}>
            <Text style={styles.buttonText}>Unggah Foto</Text>
          </TouchableOpacity>
          {photo && <Image source={{ uri: photo }} style={styles.imagePreview} />}
        </>
      )}

      <Text style={styles.label}>Lokasi Anda</Text>
      <TouchableOpacity style={styles.buttonPrimary} onPress={getLocation}>
        <Text style={styles.buttonText}>Ambil Lokasi</Text>
      </TouchableOpacity>
      
      {loadingLocation ? (
        <ActivityIndicator size="small" color="#007AFF" />
      ) : location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        </MapView>
      ) : (
            <Text style={styles.locationText}>Lokasi belum diambil.</Text>
            
      )}

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8, marginBottom: 15 },
  buttonPrimary: { backgroundColor: "#34C759", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  buttonSecondary: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  imagePreview: { width: "100%", height: 200, marginTop: 10, borderRadius: 8 },
  locationText: { fontSize: 14, marginBottom: 15 },
  map: { width: "100%", height: 200, marginTop: 10, borderRadius: 8 },
});