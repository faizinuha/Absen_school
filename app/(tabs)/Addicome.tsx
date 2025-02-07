import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

export default function AddLeave() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Sakit");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const statusOptions = ["Sakit", "Izin Keluarga", "Acara Penting"];

  const handleSave = async () => {
    if (!name || !description || !imageUri) {
      Alert.alert("Error", "Silakan isi semua kolom dan unggah foto bukti.");
      return;
    }

    const newLeave = {
      name,
      status,
      description,
      date: date.toISOString(),
      image: imageUri,
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

  interface LeaveData {
    name: string;
    status: string;
    description: string;
    date: string;
    image: string | null;
  }

  const handleDateChange = (_event: DateTimePickerEvent, selectedDate?: Date | undefined): void => {
    if (selectedDate) setDate(selectedDate);
    setShowDatePicker(false);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Mohon izinkan akses ke galeri!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled && result.assets.length > 0) setImageUri(result.assets[0].uri);
  };

  const resetForm = () => {
    setName("");
    setStatus("Sakit");
    setDescription("");
    setDate(new Date());
    setImageUri(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Deskripsi</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Jelaskan alasan izin..."
          multiline
        />

        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Unggah Foto Bukti</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
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
  button: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
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
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 15,
  },
});
