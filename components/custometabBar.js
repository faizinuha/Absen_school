import React from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import { styles } from "@/style/style";
import { useNavigation } from "expo-router";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.tabBar, { opacity: fadeAnim, paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{ flex: 1, alignItems: "center", paddingVertical: 10 }}
          >
            {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? "aqua" : "#fff" })}
            <Text style={[styles.text, { color: isFocused ? "aqua" : "#fff" }]}>{options.title}</Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

export default CustomTabBar;
