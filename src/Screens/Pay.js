import { View, Text, TouchableOpacity, StyleSheet, Modal, StatusBar } from "react-native";
import React, { useState } from "react";
import { CardField, confirmPayment } from "@stripe/stripe-react-native";
import paypalapi from "../api/paypalapi";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import BackIcon from "../../assets/icons/back";
import { useNavigation } from "@react-navigation/native";

const Pay = () => {
  const { goBack } = useNavigation();
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const onPressPaypal = async () => {
    setLoading(true);
    try {
      const token = await paypalapi.generateToken();
      const res = await paypalapi.createOrder(token);
      setAccessToken(token);
      console.log("envvv", process.env.CLIENTID);
      console.log("res++++++", res);
      setLoading(false);
      if (!!res?.links) {
        const findUrl = res.links.find((data) => data?.rel == "approve");
        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const onUrlChange = (webviewState) => {
    console.log("webviewStatewebviewState", webviewState);
    if (webviewState.url.includes("https://example.com/cancel")) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes("https://example.com/return")) {
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log("my urls value", urlValues);
      const { token } = urlValues.query;
      if (!!token) {
        paymentSucess(token);
      }
    }
  };
  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  const paymentSucess = async (id) => {
    try {
      const res = paypalapi.capturePayment(id, accessToken);
      console.log("capturePayment res++++", res);
      alert("Payment sucessfull...!!!");
      clearPaypalState();
    } catch (error) {
      console.log("error raised in payment capture", error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <StatusBar barStyle={"light-content"} />
          <View className="flex-row items-center justify-between py-4 px-4 ">
            <Animated.View entering={FadeInLeft.delay(50).duration(100)}>
              <TouchableOpacity
                onPress={() => goBack()}
                style={styles.iconBack}
                className="bg-white h-10 w-10 items-center justify-center rounded-full"
              >
                <BackIcon />
              </TouchableOpacity>
            </Animated.View>
           
          </View>
      <View className="mx-auto mt-8">
        <Text className="text-4xl text-[#3c9fca] font-black tracking-[5px]">
          Checkout
        </Text>
      </View>
      <TouchableOpacity
        className="mt-24 mx-auto h-16 w-64 bg-[#d4db57] rounded-2xl"
        onPress={onPressPaypal}
      >
        <View className="mx-auto my-auto flex flex-row ">
        <Icon size={35} name="paypal" color="#3c77ca" />
        <Text className="text-white  text-2xl ml-4">Pay Paypal</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={!!paypalUrl}>
        <TouchableOpacity
          onPress={clearPaypalState}
          className="ml-24 m-2 h-8 w-32 bg-red-300 rounded-2xl"
        >
          <Text className="mx-auto text-white mt-2">Closed</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: paypalUrl }}
            onNavigationStateChange={onUrlChange}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
