import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";

export default function AddLeave() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Sakit");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const statusOptions = ["Sakit", "Izin Keluarga", "Acara Penting"];

  // Koordinat area sekolah (latitude, longitude)
  const schoolArea = {
    latitude: -8.30433,
    longitude: 114.1378014,
    radius: 200,  // radius dalam meter
  };

  useEffect(() => {
    (async () => {
      // Meminta izin lokasi
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === "granted");

      if (status === "granted") {
        // Mendapatkan lokasi pengguna
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      }
    })();
  }, []);

  const isInSchoolArea = () => {
    if (!location) return false;

    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const dLat = toRad(schoolArea.latitude - location.latitude);
    const dLon = toRad(schoolArea.longitude - location.longitude);
    const lat1 = toRad(location.latitude);
    const lat2 = toRad(schoolArea.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance <= schoolArea.radius;
  };

  const handleSave = async () => {
    if (!name || !location) {
      Alert.alert("Error", "Silakan isi nama dan pastikan Anda berada di area sekolah.");
      return;
    }

    if (!isInSchoolArea()) {
      Alert.alert("Error", "Anda tidak berada di area sekolah, absensi tidak dapat dilakukan.");
      return;
    }

    const newLeave = {
      name,
      status,
      date: date.toISOString(),
      location: location,
    };

    try {
      const storedData = await AsyncStorage.getItem("dataizin");
      const data = storedData ? JSON.parse(storedData) : [];
      data.push(newLeave);
      await AsyncStorage.setItem("dataizin", JSON.stringify(data));
      Alert.alert("Sukses", "Data izin berhasil disimpan.");
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan data");
    }
  };

  const resetForm = () => {
    setName("");
    setStatus("Sakit");
    setDate(new Date());
    setLocation(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Izin Tidak Masuk Sekolah</Text>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Masukkan nama..."
      />

      <Text style={styles.label}>Alasan Tidak Masuk</Text>
      <Picker
        selectedValue={status}
        style={styles.input}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        {statusOptions.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>

      <Text style={styles.label}>Tanggal</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString()}
          placeholder="Pilih tanggal"
          editable={false}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Lokasi Anda</Text>
      <TextInput
        style={styles.input}
        value={`Latitude: ${location ? location.latitude : ""} | Longitude: ${location ? location.longitude : ""}`}
        editable={false}
      />

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4A90E2",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonPrimary: {
    backgroundColor: "#34C759",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
