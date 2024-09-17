import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ProfileScreen from "./explore";

// Definisikan tipe untuk absen siswa
interface StudentAttendance {
  name: string;
  status: string;
  description?: string; // optional untuk alasan izin/sakit
  date: string;
}

export default function SchoolAttendanceScreen() {
  // Data manual untuk absensi siswa
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

  useEffect(() => {
    setErrorMessage(null); // Tidak ada error untuk saat ini
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
        source={require("@/assets/images/smk_al_ahzah.jpeg")} // Perbaiki jalur sesuai struktur proyek Anda
        style={styles.headerImage}
        resizeMode="cover"
      />
      {/* Gambar absensi siswa */}
      <ThemedView style={styles.header}>
      {/* <Image source={require('@/assets/images/profile.png')} style={styles.headerImage} /> */}
        <ThemedText type="title" style={styles.headerTitle}>
          Absensi Sekolah
        </ThemedText>

        {/* Kotak-kotak fitur untuk status absensi */}
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
  // Gaya untuk gambar header
  headerImage: {
    width: "100%", // Ganti ke 100% untuk sesuai dengan lebar kontainer
    height: 50, // Atur tinggi gambar sesuai kebutuhan
    resizeMode: "cover", // Agar gambar tidak terdistorsi
    borderRadius: 20, // Jarak radius gambar header
    shadowColor: "#000", // Warna bayangan
    shadowOffset: { width: 0, height: 2 }, // Offset bayangan
    shadowOpacity: 0.1, // Opacity bayangan
    shadowRadius: 100, // Radius bayangan
    elevation: 3, // Untuk Android
  },

  header: {
    right: 10,
    paddingHorizontal: 22, // Padding horizontal
    paddingVertical: 22, // Padding vertikal
    width: "109%", // Lebar 100% dari kontainer induk
    backgroundColor: "#000", // Warna hitam untuk header
    borderRadius: 15 | 16 | 11,
    alignItems: "center",
    marginBottom: 10, // Jarak bawah dari header ke konten lainnya
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  // Kotak fitur
  featureBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "120%",
    padding: 10,
    marginTop: 20,
  },
  featureBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    width: "20%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    margin: 10,
    gap: 0,
  },
  featureText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  featureValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  attendanceContainer: {
    paddingHorizontal: 20,
  },
  studentCard: {
    padding: 15,
    backgroundColor: "#f8f9fa",
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  studentInfo: {
    fontSize: 15,
    color: "#555",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});
