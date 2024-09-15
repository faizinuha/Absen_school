import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Definisikan tipe untuk familyMembers
interface FamilyMember {
  nama: string;
  Addincome: string; // Sesuaikan dengan struktur yang benar
  description: string;
  date: string;
}

export default function FamilyFinanceScreen() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]); // Berikan tipe data yang benar
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State untuk menangani error

  // Fungsi untuk mengambil data dari AsyncStorage
  const fetchFamilyData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("datakeluarga");
      const data = storedData ? JSON.parse(storedData) : [];
      setFamilyMembers(data);
      setErrorMessage(null); // Clear error if successful
    } catch (error) {
      console.error("Gagal mengambil data keluarga:", error);
      setErrorMessage("Gagal mengambil data keluarga"); // Set error message
    }
  };

  useEffect(() => {
    fetchFamilyData(); // Ambil data saat komponen pertama kali dirender
  }, []);

  // Menghitung total pemasukan, pengeluaran, dan saldo
  const totalIncome = familyMembers.reduce(
    (sum, member) => sum + parseFloat(member.Addincome), // Sesuaikan dengan nama properti yang benar
    0
  );
  const totalExpenses = 0; // Jika belum ada pengeluaran, kamu bisa set ke 0
  const totalBalance = totalIncome - totalExpenses;

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Catatan Keuangan Keluarga</ThemedText>
        <ThemedText type="subtitle">
          Total Pemasukan: Rp {totalIncome}
        </ThemedText>
        <ThemedText type="subtitle">
          Total Pengeluaran: Rp {totalExpenses}
        </ThemedText>
        <ThemedText type="subtitle">Saldo: Rp {totalBalance}</ThemedText>
      </ThemedView>

      {errorMessage && ( // Jika ada error, tampilkan dalam elemen Text
        <View>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <ThemedView style={styles.familyContainer}>
        {familyMembers.length > 0 ? (
          familyMembers.map((member, index) => (
            <View key={index} style={styles.memberCard}>
              <Text style={styles.memberName}>{member.nama}</Text>
              <Text>Pemasukan: Rp {member.Addincome}</Text> {/* Sesuaikan dengan nama properti yang benar */}
              <Text>Keterangan: {member.description}</Text>
              <Text>Tanggal: {member.date}</Text>
            </View>
          ))
        ) : (
          <Text>Belum ada data pendapatan.</Text>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    marginBottom: 20,
  },
  familyContainer: {
    paddingHorizontal: 20,
  },
  memberCard: {
    padding: 15,
    backgroundColor: "#e3e3e3",
    marginVertical: 10,
    borderRadius: 10,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorText: {
    color: "red", // Tampilkan error dalam warna merah
    textAlign: "center",
    marginVertical: 10,
  },
});
