import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import SearchCarScreen from "../screens/SearchCar";
import OtherProfileScreen from "../screens/OtherProfile";
import NewsFeedScreen from "../screens/NewsFeed";
const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation, route }) => {
  const user = route?.params;
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={user}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="SearchCar"
        component={SearchCarScreen}
        initialParams={user}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="OrtherProfile"
        component={OtherProfileScreen}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="NewsFeed"
        component={NewsFeedScreen}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
