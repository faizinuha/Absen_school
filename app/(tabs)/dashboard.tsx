import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

interface AttendanceItem {
  photo: string;
  name: string;
  kehadiran: string;
  date: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const Dashboard = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceItem[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("dataKehadiran");
        console.log("Stored Data:", storedData); // Debugging

        if (storedData) {
          const parsedData: AttendanceItem[] = JSON.parse(storedData).map((item: any) => ({
            ...item,
            location: typeof item.location === "string" ? JSON.parse(item.location) : item.location,
          }));

          setAttendanceData(parsedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Bagian Header dengan Gambar dan Judul */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/absen.jpg")} // Pastikan path gambar benar
          style={styles.profileImage}
        />
        <Text style={styles.title}>Riwayat Kehadiran</Text>
      </View>

      {/* List Kehadiran */}
      <FlatList
        data={attendanceData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.status}>Status: {item.kehadiran}</Text>
            <Text style={styles.date}>Tanggal: {new Date(item.date).toLocaleDateString()}</Text>

            {/* MapView untuk Menampilkan Lokasi */}
                        <MapView
              style={styles.map}
              initialRegion={{
                latitude: item.location.latitude,
                longitude: item.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              aria-disabled
            >
              <Marker
                coordinate={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                }}
                title={item.name}
                description={`Status: ${item.kehadiran}`}
              />
            </MapView>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row", // Membuat gambar sejajar dengan teks
    alignItems: "center", // Menyelaraskan elemen secara vertikal
    marginTop: 50,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Agar tetap bulat
    marginRight: 10, // Memberi jarak antara gambar dan teks
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    color: "gray",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  map: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default Dashboard;
