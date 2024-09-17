import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker";

export default function AddLeave() {
  const [nama, setNama] = useState("");
  const [reason, setReason] = useState("Sakit");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null); // Specify the type

  const reasons = ["Sakit", "Izin Keluarga", "Acara Penting", "Lainnya"];

  const handleSave = async () => {
    if (nama === "" || description === "" || imageUri === null) {
      Alert.alert("Error", "Please fill out all fields and upload a photo.");
      return;
    }

    const newLeave = {
      nama,
      reason,
      description,
      date: date.toLocaleDateString(),
      image: imageUri,
    };

    try {
      const storedData = await AsyncStorage.getItem("dataizin");
      const data = storedData ? JSON.parse(storedData) : [];
      data.push(newLeave);
      await AsyncStorage.setItem("dataizin", JSON.stringify(data));
      Alert.alert("Data Saved", "Izin berhasil disimpan.");
      resetForm(); 
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan data");
    }
  };

  const handleDateChange = (_event: any, selectedDate: Date | undefined) => {
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Mohon IzinKan Akses Kamera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      const selectedImage = result.assets[0]; // Access the first asset
      if (selectedImage) {
        const selectedImageDate = new Date(selectedImage.uri);
        if (date.toLocaleDateString() !== selectedImageDate.toLocaleDateString()) {
          Alert.alert("Error", "Foto harus diambil pada hari yang sama dengan izin.");
        } else {
          setImageUri(selectedImage.uri); // Set the image URI
        }
      }
    }
  };

  const resetForm = () => {
    setNama("");
    setReason("Sakit");
    setDescription("");
    setDate(new Date());
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Izin Tidak Masuk Sekolah[👋]</Text>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        value={nama}
        onChangeText={setNama}
        placeholder="Masukkan nama"
      />

      <Text style={styles.label}>Alasan Tidak Masuk</Text>
      <Picker
        selectedValue={reason}
        style={styles.input}
        onValueChange={(itemValue) => setReason(itemValue)}
      >
        {reasons.map((reason, index) => (
          <Picker.Item key={index} label={reason} value={reason} />
        ))}
      </Picker>

      <Text style={styles.label}>Keterangan</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Keterangan izin"
      />

      <Text style={styles.label}>Tanggal</Text>
      <TextInput
        style={styles.input}
        value={date.toLocaleDateString()}
        placeholder="Pilih tanggal"
        onTouchStart={() => setShowDatePicker(true)}
        editable={false}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Upload Foto Bukti" onPress={pickImage} color="#6a11cb" />
        {imageUri && <Text style={styles.imageText}>Foto terpilih: {imageUri}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Simpan" onPress={handleSave} color="#6a11cb" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#6a11cb",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  imageText: {
    marginTop: 10,
    textAlign: "center",
  },
});
