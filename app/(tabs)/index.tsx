import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// Definisikan tipe untuk absen siswa
interface StudentAttendance {
  name: string;
  status: string;
  description?: string; // optional untuk alasan izin/sakit
  date: string;
  image?: string; // Tambahkan image untuk menampilkan gambar izin
}

export default function SchoolAttendanceScreen() {
  const [attendanceList, setAttendanceList] = useState<StudentAttendance[]>([
    {
      name: "Ahmad",
      status: "Hadir",
      date: "2024-09-01",
    },
    {
      name: "Budi",
      status: "Sakit",
      description: "Keperluan keluarga",
      date: "2024-09-01",
    },
    {
      name: "Citra",
      status: "Sakit",
      description: "Demam",
      date: "2024-09-01",
    },
  ]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fungsi untuk mengambil data izin dari AsyncStorage
  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("dataizin");
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setAttendanceList((prevAttendanceList) => [
          ...prevAttendanceList,
          ...parsedData,
        ]);
      }
    } catch (error) {
      setErrorMessage("Gagal mengambil data izin");
      Alert.alert("Error", "Gagal mengambil data izin");
    }
  };

  // Ambil data izin saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  // Hitung total kehadiran, izin, sakit, dan alfa
  const totalHadir = attendanceList.filter(
    (student) => student.status === "Hadir"
  ).length;
  const totalIzin = attendanceList.filter(
    (student) => student.status === "Izin"
  ).length;
  const totalSakit = attendanceList.filter(
    (student) => student.status === "Sakit"
  ).length;
  const totalAlfa = attendanceList.filter(
    (student) => student.status === "Alfa"
  ).length;

  return (
    <ParallaxScrollView>
      {/* Gambar Header */}
      <Image
        source={require("@/assets/images/smk_al_ahzah.jpeg")} 
        style={styles.headerImage}
        resizeMode="cover"
      />
      {/* Kotak-kotak fitur untuk status absensi */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Absensi Sekolah
        </ThemedText>

        <View style={styles.featureBoxContainer}>
          <View style={styles.featureBox}>
            <Text style={styles.featureText}>Hadir</Text>
            <Text style={styles.featureValue}>{totalHadir}</Text>
          </View>

          <View style={styles.featureBox}>
            <Text style={styles.featureText}>Izin</Text>
            <Text style={styles.featureValue}>{totalIzin}</Text>
          </View>

          <View style={styles.featureBox}>
            <Text style={styles.featureText}>Sakit</Text>
            <Text style={styles.featureValue}>{totalSakit}</Text>
          </View>

          <View style={styles.featureBox}>
            <Text style={styles.featureText}>Alfa</Text>
            <Text style={styles.featureValue}>{totalAlfa}</Text>
          </View>
        </View>
      </ThemedView>

      {errorMessage && (
        <View>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <ThemedView style={styles.attendanceContainer}>
        {attendanceList.length > 0 ? (
          attendanceList.map((student, index) => (
            <View key={index} style={styles.studentCard}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.studentInfo}>Status: {student.status}</Text>
              {student.description && (
                <Text style={styles.studentInfo}>
                  Alasan: {student.description}
                </Text>
              )}
              <Text style={styles.studentInfo}>Tanggal: {student.date}</Text>
              {student.image && (
                <Image
                  source={{ uri: student.image }}
                  style={styles.imagePreview} 
                />
              )}
            </View>
          ))
        ) : (
          <Text>Belum ada data absensi.</Text>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  featureBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  featureBox: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  featureText: {
    fontSize: 18,
  },
  featureValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  attendanceContainer: {
    padding: 20,
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
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
  errorText: {
    backgroundColor: "#3F74CA",
  },
});
                    