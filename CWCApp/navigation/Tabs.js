import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./HomeStack";
import HomeScreen from "../screens/Home";
import AppStackScreen from "../navigation/AppStack";
import ProfileScreen from "../screens/Profile";
import SearchCarScreen from "../screens/SearchCar";
import { icons, COLORS } from "../constants";

const Tab = createBottomTabNavigator();

const Tabs = ({ route }) => {
  const user = route?.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.53,
          shadowRadius: 13.97,

          elevation: 21,
        },
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.gray;

          switch (route.name) {
            case "HomeStackScreen":
              return (
                <Image
                  source={icons.home}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case "Search":
              return (
                <Image
                  source={icons.search}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case "Message":
              return (
                <Image
                  source={icons.message}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case "Account":
              return (
                <Image
                  source={icons.user}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        initialParams={user}
      />
      <Tab.Screen
        name="Search"
        component={SearchCarScreen}
        initialParams={user}
      />
      <Tab.Screen
        name="Message"
        component={AppStackScreen}
        initialParams={user}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        initialParams={user}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
