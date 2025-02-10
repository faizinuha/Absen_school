import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import CustomTabBar from "@/components/custometabBar"; // Import custom navbar
import {styles} from "@/style/style"; // Import custom navbar

export default function TabLayout() {
  const colorScheme = "dark"; // Mode gelap
  const activeColor = Colors.dark.tint; // Warna saat aktif

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />} // Gunakan CustomTabBar
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "analytics" : "analytics-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Addicome"
        options={{
          title: "Izin",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "checkmark-circle" : "checkmark-circle-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
