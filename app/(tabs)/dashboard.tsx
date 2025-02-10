import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Alert, ScrollView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const statusOptions = ["Sakit", "Izin Keluarga", "Acara Penting"];
const kelasoption = [
  "X RPL", "X AK", "X TKJ", "X TKR", "X TB",
  "XI RPL", "XI AK", "XI TKJ", "XI TKR", "XI TB",
];

interface StudentAttendance {
  name: string;
  kehadiran: string;
  date: string;
  photo?: string;
  location: string;
}

export default function SchoolAttendanceScreen() {
  const [attendanceList, setAttendanceList] = useState<StudentAttendance[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("dataizin");
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setAttendanceList(parsedData);
      }
    } catch (error) {
      setErrorMessage("Gagal mengambil data izin");
      Alert.alert("Error", "Gagal mengambil data izin");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const clearAsyncStorage: () => Promise<void> = async () => {
    await AsyncStorage.clear();
    Alert.alert("Success", "Async Storage cleared");
  };
  return (
    <ScrollView style={styles.container}>
      {/* <Button onPress={clearAsyncStorage} title="Clear Async Storage" /> */}
      <Button onPress={clearAsyncStorage} title="Clear Async Storage" />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {attendanceList.length > 0 ? (
        attendanceList.map((student, index) => (
          <View key={index} style={styles.studentCard}>
            <Text style={styles.studentNumber}> {index + 1}. Nama Siswa: {student.name}</Text>
            <Text style={styles.studentKehadiran}>Status: {student.kehadiran}</Text>
            <Text style={styles.studentInfo}>Tanggal: {student.date}</Text>
            <Text style={styles.studentInfo}>Lokasi: {student.location}</Text>
            {student.photo && (
              <Image source={{ uri: student.photo }} style={styles.imagePreview} />
            )}
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>Belum ada data absensi.</Text>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  studentNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3F74CA",
  },  
  studentKehadiran: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3F74CA",
  },  
  studentCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  studentInfo: {
    fontSize: 16,
    marginTop: 5,
  },
  imagePreview: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
  },
});
