import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Semi-transparan
    paddingBottom: 10,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10, // Efek shadow di Android
  },
  text: {
    fontSize: 14,
    color: "#fff",
  },
});
