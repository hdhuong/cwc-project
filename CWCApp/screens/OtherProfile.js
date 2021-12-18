import React from "react";
import { View, Text } from "react-native";

const OtherProfileScreen = ({ route }) => {
  console.log("user hahah", route);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> Other Profile Screen</Text>
    </View>
  );
};

export default OtherProfileScreen;
