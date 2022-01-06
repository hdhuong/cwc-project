import React from "react";
import { View, Text } from "react-native";

const AddPostCategoryScreen = ({ route }) => {
  const user = route?.params?.user;
  const category = route?.params?.category;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>AddPostCategorycreen </Text>
    </View>
  );
};

export default AddPostCategoryScreen;
