import React from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: (
            <Image
              source={require("../assets/images/banner.png")}
              style={styles.imageOnboard}
            />
          ),
          title: "Cars Connect",
          subtitle: "Ứng dụng kết nối thông tin xe nhanh nhất ",
        },
        {
          backgroundColor: "#fdeb93",
          image: (
            <Image
              source={require("../assets/images/car_forum.png")}
              style={styles.imageOnboard}
            />
          ),
          title: "CWC Forums",
          subtitle: "Diễn đàn trao đổi thông tin xe hơi ",
        },
        {
          backgroundColor: "#e9bcbe",
          image: (
            <Image
              source={require("../assets/images/hild.png")}
              style={styles.imageOnboard}
            />
          ),
          title: "Cars Community",
          subtitle: "Cộng đồng dành cho những tài xế ",
        },
      ]}
    />
  );
};
export default OnboardingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageOnboard: {
    width: "100%",
    height: 300,
  },
});
