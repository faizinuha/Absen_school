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
      // Ambil data yang sudah ada
      const storedData = await AsyncStorage.getItem("datakeluarga");
      const data = storedData ? JSON.parse(storedData) : [];

      // Tambahkan data baru
      data.push(newIncome);

      // Simpan kembali ke AsyncStorage
      await AsyncStorage.setItem("datakeluarga", JSON.stringify(data));

      Alert.alert("Data Saved", "Pendapatan berhasil disimpan.");
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan data");
    }
  };

  const handleDateChange = (_event: any, selectedDate: Date | undefined) => {
    if (selectedDate !== undefined) {
      setDate(selectedDate); // Set the selected date
    }
    setShowDatePicker(false); // Close the date picker
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
        onTouchStart={() => setShowDatePicker(true)} // Use onTouchStart instead of onFocus
        editable={false} // Make it non-editable to avoid typing
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}

      <Button title="Simpan" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
