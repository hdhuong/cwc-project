import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

import AuthStackScreen from "./navigation/AuthStack";
import { useFonts } from "expo-font";
export default function App() {
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <AuthStackScreen />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
