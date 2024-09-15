import { StyleSheet, View, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";



export default function FamilyFinanceScreen() {
  const familyMembers = [
    { name: "Ayah - Budi", income: 5000, expenses: 3000 },
    { name: "Ibu - Siti", income: 4500, expenses: 2500 },
    { name: "Kakak - Rani", income: 2500, expenses: 1500 },
    { name: "Adik - Andi", income: 1500, expenses: 500 },
  ];

  const totalIncome = familyMembers.reduce(
    (sum, member) => sum + member.income,
    0
  );
  const totalExpenses = familyMembers.reduce(
    (sum, member) => sum + member.expenses,
    0
  );
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

      <ThemedView style={styles.familyContainer}>
        {familyMembers.map((member, index) => (
          <View key={index} style={styles.memberCard}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text>Pemasukan: Rp {member.income}</Text>
            <Text>Pengeluaran: Rp {member.expenses}</Text>
            <Text>Saldo: Rp {member.income - member.expenses}</Text>
          </View>
        ))}
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
});
