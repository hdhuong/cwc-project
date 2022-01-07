import React, { useState, useContext, useEffect } from "react";
import {
  LOCAL_STORAGE_TOKEN_NAME,
  API_URL,
  NOTIFICATION_TYPE,
} from "../utils/constants";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as Clipboard from "expo-clipboard";
if (__DEV__) {
  Clipboard.setString("");
}
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { auth } from "../firebase/config";
import axios from "axios";

const AddPostCategoryScreen = ({ navigation, route }) => {
  const user = route?.params?.user;
  const category = route?.params?.category;
  const [label, setLabel] = useState(null);
  const [subLabel, setSubLabel] = useState(null);
  const [desc, setDesc] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [data, setData] = React.useState({
    description: "",
    img: "",
  });
  if (category) {
    useEffect(() => {
      renderLabel(category);
    });
  }
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        description: val,
      });
    } else {
      setData({
        ...data,
        description: val,
      });
    }
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setData({
      ...data,
      img: text,
    });
  };

  const textInputChangeImg = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        img: val,
      });
    } else {
      setData({
        ...data,
        img: val,
      });
    }
  };

  const renderLabel = (val) => {
    switch (val) {
      case 1:
        setLabel("Va chạm");
        setDesc(
          "Đăng tải thông tin về va chạm để mọi người cùng nắm bắt thông tin !"
        );
        setImgSrc(images.crash);
        setSubLabel("va chạm");
        break;
      case 2:
        setLabel("Tắc đường");
        setDesc(
          "Đăng tải thông tin về tắc đường để mọi người cùng nắm bắt thông tin !"
        );
        setImgSrc(images.trafficJam);
        setSubLabel("tắc đường");
        break;
      case 3:
        setLabel("Chú ý");
        setDesc(
          "Đăng tải thông tin về những chú ý để mọi người cùng nắm bắt thông tin !"
        );
        setImgSrc(images.slippery);
        setSubLabel("chú ý");
        break;
      default:
        break;
    }
  };

  const onSubmit = async (description, img) => {
    const params = { userId: user._id, category, desc: description, img };
    try {
      const response = await axios.post(`${API_URL}/api/posts`, params);
      if (response.data.success) navigation.navigate("NewsFeed", { user });
      showMessage({
        message: "Thành công",
        description: "Đăng bài thành công",
        type: NOTIFICATION_TYPE.SUCCESS,
      });
    } catch (error) {
      showMessage({
        message: "Thất bại",
        description: error?.response?.data?.message,
        type: NOTIFICATION_TYPE.ERROR,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 45,
            }}
          >
            <Feather name="arrow-left" size={25} style={{ marginRight: 10 }} />
            <Text>Quay lại</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.text_header}>{label}</Text>
        <Text>{desc}</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <View style={styles.logoView}>
          <Image source={imgSrc ? imgSrc : null} style={styles.logo} />
        </View>

        <Text style={styles.text_footer}>Mô tả </Text>
        <TextInput
          editable
          multiline
          autoFocus
          style={styles.descInput}
          placeholder={"Nhập mô tả về " + subLabel}
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
        />
        <Text style={styles.text_footer}>Hình ảnh</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChangeImg(val)}
            selectTextOnFocus={true}
          />
          <TouchableOpacity
            onPress={() => {
              fetchCopiedText;
            }}
          >
            <View>
              <Feather
                name="plus"
                size={25}
                style={{
                  marginLeft: 10,
                  color: "#3181a3",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              onSubmit(data.description, data.img);
            }}
          >
            <LinearGradient
              colors={["#F9CCB3", "#cfebf9"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Gửi
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
export default AddPostCategoryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9CCB3",
  },
  descInput: {
    height: 140,
    borderWidth: 1,
    borderColor: "#cfebf9",
  },

  logo: {
    height: 100,
    width: 100,
    resizeMode: "cover",
  },
  logoView: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 30,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    marginTop: 10,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cfebf9",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 12 : -12,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5392b5",
  },
});
