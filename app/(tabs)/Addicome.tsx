import React, { useState } from "react";
import { Image } from "react-native";
import { StyleSheet, View, TextInput, Button, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { hideAsync } from "expo-splash-screen";
import { Route } from "expo-router/build/Route";

export default function AddLeave() {
  const [nama, setNama] = useState("");
  const [reason, setReason] = useState("Sakit");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null); // Specify the type

  const reasons = ["Sakit", "Izin Keluarga", "Acara Penting", "Lainnya"];

  const handleSave = async () => {
    if (nama === "" || null === "" || imageUri === null) {
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
      Alert.alert(
        "Data Saved",
        "Data Di Simpan Kami Akan Memastikan Bahwa Anda2 Benar2 Saki👋."
      );
      resetForm();
      // navigator.navigator("/app/(tabs)/index.tsx");
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
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Mohon IzinKan Akses Kamera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      const selectedImage = result.assets[0]; // Access the first asset
      setImageUri(selectedImage.uri); // Set the image URI
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
        onValueChange={(itemValue) => setReason(itemValue)}>
        {reasons.map((reason, index) => (
          <Picker.Item key={index} label={reason} value={reason} />
        ))}
      </Picker>

      {/* Menampilkan input keterangan jika alasan adalah "Acara Penting" atau "Lainnya" */}
      {(reason === "Acara Penting" || reason === "Lainnya") && (
        <>
          <Text style={styles.label}>Keterangan</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Keterangan izin"
          />
        </>
      )}

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
        <Button title="Simpan" onPress={handleSave} color="#6a11cb" />
      </View>

      <View style={styles.buttonContainer}>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}
        <Button title="Upload Foto Bukti" onPress={pickImage} color="#6a11cb"/>
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
  imagePreview: {
    width: 120, // Atur lebar sesuai kebutuhan Anda
    height: 120, // Atur tinggi sesuai kebutuhan Anda
    borderRadius: 19, // At
    marginTop: 5,
    marginBottom: 15,
    right: 60,
    alignSelf: "center",
  },
});
