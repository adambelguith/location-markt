import {
  View,
  Text,
  StatusBar,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native-paper";
import Calendar from "react-native-calendars/src/calendar";
import { useForm } from "react-hook-form";
import BackIcon from "../../assets/icons/back";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { CardField, confirmPayment } from '@stripe/stripe-react-native';
import paypalapi from "../api/paypalapi";

const userSchema = Yup.object({
  name: Yup.string()
    .min(4, "Too Short")
    .max(50, "Too long")
    .required("Name is required"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  phone: Yup.string()
    .required("phone is required"),
  address: Yup.string()
    .min(6, "Too Short")
    .max(50, "Too long")
    .required("Addresse is required"),
  start: Yup.date().required("Date is required"),
  end: Yup.date().required("Date is required"),
});

const ShopForm = () => {
  const { params } = useRoute();
  const { goBack, navigate } = useNavigation();
  const data = params?.product;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTextInput, setSelectedTextInput] = useState(null);


  console.log("pro",data)
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    start: "",
    end: "",
  };
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      validationSchema: userSchema,
      initialValues: initialValues,
      onSubmit: (values) => {
        Alert.alert(
          `Mr(s) ${values.name}`,
          `Do you want to confirm the rental ${data?.title} ?`,
          [
            { text: "Cancel", style: "cancel" },
            { text: "Confirm", onPress: async () =>{
              const userData = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                address: values.address,
              };

              try {
                await AsyncStorage.setItem("user", JSON.stringify(userData));
              } catch (error) {
                console.log("Error saving data to AsyncStorage:", error);
              }
              navigate("Pay"); 
            } }
          ],
          { cancelable: false }
        );
      },
    });

  const handleDayPress = (day) => {
    if (selectedTextInput === "start") {
      handleChange("start")(day.dateString);
    } else if (selectedTextInput === "end") {
      handleChange("end")(day.dateString);
    }

    setModalVisible(false);
  };

  const openCalendarModal = (textInput) => {
    setSelectedTextInput(textInput);
    setModalVisible(true);
  };

  const generateMarkedDates = () => {
    const markedDates = {};

    if (values.start) {
      markedDates[values.start] = { startingDay: true, color: "green" };
    }

    if (values.end) {
      markedDates[values.end] = { endingDay: true, color: "green" };
    }

    return markedDates;
  };

  const getMultipleData = async () => {
    try {
      const dataFromStorage  = await AsyncStorage.getItem("user");
      if (dataFromStorage) {
        const userData = JSON.parse(dataFromStorage);
        
        // Populate form fields with retrieved data
        handleChange("name")(userData.name);
        handleChange("email")(userData.email);
        handleChange("phone")(userData.phone);
        handleChange("address")(userData.address);
      }
      console.log(dataFromStorage );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMultipleData();
  }, []);





  return (
    <View>
      <SafeAreaView />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="">
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
          <View className="mx-auto relative bottom-12">
            <Text className="ml-8 font-bold text-2xl text-[#505554]">
              {data?.title}
            </Text>
          </View>
          <View className=" rounded-xl bg-[#f4f2f2]">
            <Text className="m-4 ml-2 mx-auto font-bold text-xl ">
              Your Informations{" "}
            </Text>
            <View className="m-4">
              <TextInput
                className=" rounded-xl"
                placeholder="Full Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                error={errors.name}
                touched={touched.name}
              />
              {errors.name && (
                <Text className=" text-red-600">{errors.name}</Text>
              )}
            </View>
            <View className="m-4">
              <TextInput
                icon="mail"
                className=" rounded-xl"
                placeholder="Email"
                keyboardType="email-address"
                textContentType={"emailAddress"}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
              />
            </View>
            <View className="m-4">
              <TextInput
                className=" rounded-xl"
                placeholder="Phone"
                keyboardType="phone-pad"
                textContentType={"telephoneNumber"}
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                error={errors.phone}
                touched={touched.phone}
              />
            </View>
            <View className="m-4">
              <TextInput
                className=" rounded-xl"
                placeholder="Address"
                textContentType={"addressCityAndState"}
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                error={errors.address}
                touched={touched.address}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => openCalendarModal("start")}
                style={{ margin: 10, flex: 1 }}
              >
                <Text>Start Date:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 10,
                    padding: 10,
                  }}
                  placeholder="Start"
                  value={values.start}
                  editable={false}
                  onChangeText={handleChange("start")}
                  onBlur={handleBlur("start")}
                  error={errors.start}
                  touched={touched.start}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openCalendarModal("end")}
                style={{ margin: 10, flex: 1 }}
              >
                <Text>End Date:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 10,
                    padding: 10,
                  }}
                  placeholder="End"
                  value={values.end}
                  editable={false}
                  onChangeText={handleChange("end")}
                  onBlur={handleBlur("end")}
                  error={errors.end}
                  touched={touched.end}
                />
              </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} animationType="slide">
              <View style={{ flex: 1 }}>
                <Calendar
                  minDate={values.start ? values.start
                  : new Date().toISOString()}
                  style={{
                    borderRadius: 10,
                    elevation: 4,
                    margin: 40,
                  }}
                  initialDate={
                    selectedTextInput === "start"
                      ? values.start
                      : new Date().toISOString()
                  }
                  markingType="period"
                  markedDates={generateMarkedDates()}
                  onDayPress={handleDayPress}
                  hideExtraDays={true}
                  disableMonthChange={true}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="mx-auto"
                >
                  <Text className="text-[#373e3e] font-semibold">Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#24a8af] m-4 h-14 w-32 p-4 rounded-lg mx-auto"
            >
              <Text className="text-white text-xl mx-auto ">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopForm;

const styles =StyleSheet.create({
  iconBack: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
})
