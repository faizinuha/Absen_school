import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Definisikan tipe untuk familyMembers
interface FamilyMember {
  nama: string;
  Addincome: string;
  description: string;
  date: string;
}

export default function FamilyFinanceScreen() {
  // Data manual untuk keluarga
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      nama: "Ayah",
      Addincome: "5000000",
      description: "Gaji bulanan",
      date: "2024-09-01",
    },
    {
      nama: "Ibu",
      Addincome: "2000000",
      description: "Pendapatan usaha",
      date: "2024-09-02",
    },
    {
      nama: "Anak",
      Addincome: "1000000",
      description: "Uang saku",
      date: "2024-09-03",
    },
  ]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Tidak ada pengambilan data, data manual sudah diset di state
    setErrorMessage(null);
  }, []);

  // Menghitung total pemasukan, pengeluaran, dan saldo
  const totalIncome = familyMembers.reduce(
    (sum, member) => sum + parseFloat(member.Addincome),
    0
  );
  const totalExpenses = 0; // Jika belum ada pengeluaran, bisa diset ke 0
  const totalBalance = totalIncome - totalExpenses;

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Catatan Keuangan Keluarga
        </ThemedText>
        <ThemedText type="subtitle" style={styles.headerText}>
          Total Pemasukan: Rp {totalIncome}
        </ThemedText>
        <ThemedText type="subtitle" style={styles.headerText}>
          Total Pengeluaran: Rp {totalExpenses}
        </ThemedText>
        <ThemedText type="subtitle" style={styles.headerText}>
          Saldo: Rp {totalBalance}
        </ThemedText>
      </ThemedView>

      {errorMessage && (
        <View>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <ThemedView style={styles.familyContainer}>
        {familyMembers.length > 0 ? (
          familyMembers.map((member, index) => (
            <View key={index} style={styles.memberCard}>
              <Text style={styles.memberName}>{member.nama}</Text>
              <Text style={styles.memberInfo}>
                Pemasukan: Rp {member.Addincome}
              </Text>
              <Text style={styles.memberInfo}>
                Keterangan: {member.description}
              </Text>
              <Text style={styles.memberInfo}>Tanggal: {member.date}</Text>
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
    backgroundColor: "#6a11cb", // Gradien warna untuk header
    borderRadius: 25, // Hapus "px", gunakan angka saja
    alignItems: "center",
    marginBottom: 20,
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },
  familyContainer: {
    paddingHorizontal: 20,
  },
  memberCard: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: "#000", // Menambahkan bayangan ke kartu
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Untuk shadow di Android
  },
  memberName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Warna teks lebih gelap
  },
  memberInfo: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});
