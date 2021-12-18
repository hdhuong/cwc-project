import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { images, COLORS, FONTS, SIZES } from "../constants";

const Onboarding = ({ navigation }) => {
  // Render

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/images/hild.png")}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ alignItems: "center", marginHorizontal: SIZES.padding }}>
          <Text style={{ ...FONTS.h2 }}>Cars Connect</Text>
          <Text
            style={{
              color: COLORS.gray,
              marginTop: SIZES.padding,
              textAlign: "center",
              ...FONTS.body3,
            }}
          >
            Ứng dụng kết nối thông tin xe hơi nhanh nhất.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.shadow,
            {
              marginTop: SIZES.padding * 2,
              width: "70%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          <LinearGradient
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
            colors={["#46aeff", "#5884ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Bắt đầu !</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Onboarding;
