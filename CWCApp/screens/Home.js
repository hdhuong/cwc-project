import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";

const OptionItem = ({ bgColor, icon, label, onPress }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onPress={onPress}
    >
      <View style={[styles.shadow, { width: 60, height: 60 }]}>
        <LinearGradient
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              backgroundColor: "red",
            },
          ]}
          colors={bgColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Image
            source={icon}
            resizeMode="cover"
            style={{
              tintColor: COLORS.white,
              width: 30,
              height: 30,
            }}
          />
        </LinearGradient>
      </View>
      <Text
        style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation, route }) => {
  // Dummy Data
  const [news, setNews] = React.useState([
    {
      id: 0,
      name: "Tin tức",
      img: images.news1,
    },
    {
      id: 1,
      name: "Đánh giá xe",
      img: images.news2,
    },
    {
      id: 2,
      name: "Bảng giá",
      img: images.news3,
    },
    {
      id: 3,
      name: "Phụ tùng",
      img: images.news4,
    },
  ]);

  // Render

  function renderNews(item, index) {
    var newsStyle = {};

    if (index == 0) {
      newsStyle = { marginLeft: SIZES.padding };
    }

    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          marginHorizontal: SIZES.base,
          ...newsStyle,
        }}
        onPress={() => {
          navigation.navigate("DestinationDetail");
        }}
      >
        <Image
          source={item.img}
          resizeMode="cover"
          style={{
            width: SIZES.width * 0.28,
            height: "82%",
            borderRadius: 15,
          }}
        />

        <Text style={{ marginTop: SIZES.base / 2, ...FONTS.h4 }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.base,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Image
          source={images.banner}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 15,
          }}
        />
      </View>

      {/* Options */}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.base,
          }}
        >
          <OptionItem
            icon={icons.searchcar}
            bgColor={["#46aeff", "#5884ff"]}
            label="Tìm xe"
            onPress={() => {
              navigation.navigate("SearchCar");
            }}
          />
          <OptionItem
            icon={icons.community}
            bgColor={["#fddf90", "#fcda13"]}
            label="Cộng đồng"
            onPress={() => {
              console.log("Train");
            }}
          />
          <OptionItem
            icon={icons.carpark}
            bgColor={["#e973ad", "#da5df2"]}
            label="Đỗ xe"
            onPress={() => {
              console.log("Bus");
            }}
          />
          <OptionItem
            icon={icons.map}
            bgColor={["#fcaba8", "#fe6bba"]}
            label="Bản đồ"
            onPress={() => {
              console.log("Taxi");
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.base,
          }}
        >
          <OptionItem
            icon={icons.slippery}
            bgColor={["#ffc465", "#ff9c5f"]}
            label="Chú ý"
            onPress={() => {
              console.log("Hotel");
            }}
          />
          <OptionItem
            icon={icons.accident}
            bgColor={["#7cf1fb", "#4ebefd"]}
            label="Va chạm"
            onPress={() => {
              console.log("Eats");
            }}
          />
          <OptionItem
            icon={icons.trafficjam}
            bgColor={["#7be993", "#46caaf"]}
            label="Tắc đường"
            onPress={() => {
              console.log("Adventure");
            }}
          />
          <OptionItem
            icon={icons.urgent}
            bgColor={["#fca397", "#fc7b6c"]}
            label="Cứu hộ"
            onPress={() => {
              console.log("Event");
            }}
          />
        </View>
      </View>

      {/* Car news */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            marginTop: SIZES.base,
            marginHorizontal: SIZES.padding,
            ...FONTS.h2,
          }}
        >
          Cars News
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={news}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => renderNews(item, index)}
        />
      </View>
    </View>
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

export default HomeScreen;
