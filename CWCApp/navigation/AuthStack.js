import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "../screens/Onboarding";
import LoginScreen from "../screens/Login";
import SignUp from "../screens/SignUp";
import HomeScreen from "../screens/Home";
import AppStackDrawer from "./AppStackDrawer";
import Tabs from "./Tabs";
const AuthStack = createStackNavigator();

const AuthStackScreen = ({ navigation }) => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen name="Login" component={LoginScreen}></AuthStack.Screen>
      <AuthStack.Screen name="SignUp" component={SignUp}></AuthStack.Screen>
      <AuthStack.Screen name="Tabs" component={Tabs}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
