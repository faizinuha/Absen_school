import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { Colors } from '@/constants/Colors';
// Hapus useColorScheme untuk dark mode secara manual
// import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  // Set default dark mode
  const colorScheme = 'dark'; // Set ke dark mode secara manual

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint, // Gunakan skema dark
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background, // Background untuk dark mode
        },
        headerShown: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          fontSize: 24,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Addicome"
        options={{
          title: 'Izin',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add-sharp' : 'add-circle-outline'} color={color} />
          ),
        }}
      />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'star-outline' : 'star-outline'} color={color} />
            ),
          }}
      />
        <Tabs.Screen
          name="setting/settings"
          options={{
            title: 'settings',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'settings-sharp' : 'settings-outline'} color={color} />
            ),
          }}
      />
    
    </Tabs>
  );
}
