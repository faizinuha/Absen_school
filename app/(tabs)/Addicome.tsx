import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddIncome() {
  const [nama, setNama] = useState("");
  const [income, setIncome] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (nama === "" || income === "" || description === "") {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    const newIncome = {
      nama,
      income,
      description,
      date: date.toLocaleDateString(),
    };

    try {
      const storedData = await AsyncStorage.getItem("datakeluarga");
      const data = storedData ? JSON.parse(storedData) : [];
      data.push(newIncome);
      await AsyncStorage.setItem("datakeluarga", JSON.stringify(data));
      Alert.alert("Data Saved", "Pendapatan berhasil disimpan.");
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Pendapatan</Text>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        value={nama}
        onChangeText={setNama}
        placeholder="Masukkan nama"
      />

      <Text style={styles.label}>Nominal Pendapatan</Text>
      <TextInput
        style={styles.input}
        value={income}
        onChangeText={setIncome}
        placeholder="Masukkan nominal"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Keterangan</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Keterangan pendapatan"
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
        <Button title="Simpan" onPress={handleSave} color="#6a11cb" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5", // Warna latar belakang
    flex: 1, // Menggunakan seluruh layar
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#6a11cb", // Warna judul
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333", // Warna label
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8, // Sudut yang lebih melengkung
    marginBottom: 20,
    backgroundColor: "#fff", // Warna latar belakang input
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Efek bayangan untuk Android
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden", // Menambahkan efek melingkar pada tombol
  },
});
