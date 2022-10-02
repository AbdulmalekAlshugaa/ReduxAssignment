import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { store } from "./src/store/store";
import { Provider } from "react-redux";

import ListingItemScreen from "./src/screen/ListingItemScreen";

export default function App() {
  return (
    <Provider store={store}>
      <ListingItemScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
