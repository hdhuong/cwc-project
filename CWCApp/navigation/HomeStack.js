import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import SearchCarScreen from "../screens/SearchCar";
import OtherProfileScreen from "../screens/OtherProfile";
import NewsFeedScreen from "../screens/NewsFeed";
import AddPostScreen from "../screens/AddPost";
import ChatScreen from "../screens/Chat";
import MessagesScreen from "../screens/Messages";
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
      <HomeStack.Screen
        name="AddPost"
        component={AddPostScreen}
      ></HomeStack.Screen>
      <HomeStack.Screen name="Chat" component={ChatScreen}></HomeStack.Screen>
      <HomeStack.Screen
        name="Messages"
        component={MessagesScreen}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
