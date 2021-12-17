import React from "react";
import { View, Text } from "react-native";

const ProfileScreen = ({ route }) => {
  const user = route?.params?.user;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;
