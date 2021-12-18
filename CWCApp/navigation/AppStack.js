import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../screens/Chat";
import MessagesScreen from "../screens/Messages";
const AppStack = createStackNavigator();

const AppStackScreen = ({ navigation, route }) => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppStack.Screen
        name="Messages"
        component={MessagesScreen}
        initialParams={{ params: route.params }}
      ></AppStack.Screen>
      <AppStack.Screen name="Chat" component={ChatScreen}></AppStack.Screen>
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
