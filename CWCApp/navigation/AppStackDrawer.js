import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from "../components/Drawer";

import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import AppStackScreen from "./AppStack";
const Drawer = createDrawerNavigator();

const AppStackDrawer = ({ route }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#e9bcbe",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        initialParams={{ params: route.params }}
        name="Trang chủ"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Thông tin cá nhân"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        initialParams={{ params: route.params }}
        name="Tin nhắn"
        component={AppStackScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cài đặt"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStackDrawer;
