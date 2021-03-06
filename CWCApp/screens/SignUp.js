import React, { useState, useContext } from "react";
import axios from "axios";
import {
  LOCAL_STORAGE_TOKEN_NAME,
  NOTIFICATION_TYPE,
  API_URL,
} from "../utils/constants";
import { showMessage, hideMessage } from "react-native-flash-message";
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
const SignUp = ({ navigation }) => {
  const [data, setData] = React.useState({
    licensePlate: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        licensePlate: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        licensePlate: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const registerHandle = async (licensePlate, password) => {
    const params = { licensePlate, password };
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, params);
      if (response.data.success) navigation.navigate("Login");
      showMessage({
        message: "Th??nh c??ng",
        description: response?.data?.message,
        type: NOTIFICATION_TYPE.SUCCESS,
      });
    } catch (error) {
      showMessage({
        message: "Th???t b???i",
        description: error?.response?.data?.message,
        type: NOTIFICATION_TYPE.ERROR,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register !</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Bi???n s??? xe</Text>
        <View style={styles.action}>
          <FontAwesome name="calendar-minus-o" size={20} color="#05375a" />
          <TextInput
            placeholder="Nh???p bi???n s??? xe "
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>M???t kh???u</Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} color="#05375a" />
          <TextInput
            placeholder="Nh???p m???t kh???u"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>
          Nh???p l???i m???t kh???u
        </Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} color="#05375a" />
          <TextInput
            placeholder="Nh???p l???i m???t kh???u"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPasswordChange(val)}
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              registerHandle(data.licensePlate, data.password);
            }}
          >
            <LinearGradient
              colors={["#5392b5", "#cfebf9"]}
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
                ????ng k??
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.goBack()}
          >
            <Text>
              ???? c?? t??i kho???n ?{" "}
              <Text style={styles.navButtonText}>????ng nh???p</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfebf9",
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: "cover",
  },
  logoView: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
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
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
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
