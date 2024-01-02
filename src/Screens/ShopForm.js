import {
  View,
  Text,
  StatusBar,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native-paper";
import Calendar from "react-native-calendars/src/calendar";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const userSchema = Yup.object({
  name: Yup.string()
    .min(6, "Too Short")
    .max(50, "Too long")
    .required("Name is required"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("number is required"),
  address: Yup.string()
    .min(6, "Too Short")
    .max(50, "Too long")
    .required("Addresse is required"),
});

const ShopForm = () => {
  const { params } = useRoute();
  const data = params?.data;
  // const [selectedDates, setSelectedDates] = useState({});
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTextInput, setSelectedTextInput] = useState(null);

  const initialValues = { name: "", email: "", phone: "", address: "" };
  const handleSubmit = (values) => {
   console.log(values)
  };

 
  const handleDayPress = (day) => {
    if (selectedTextInput === "start") {
      setSelectedDates({ ...selectedDates, start: day.dateString });
    } else if (selectedTextInput === "end") {
      setSelectedDates({ ...selectedDates, end: day.dateString });
    }

    setModalVisible(false);
  };

  const openCalendarModal = (textInput) => {
    setSelectedTextInput(textInput);
    setModalVisible(true);
  };

  const generateMarkedDates = () => {
    const markedDates = {};

    if (selectedDates.start) {
      markedDates[selectedDates.start] = { startingDay: true, color: "green" };
    }

    if (selectedDates.end) {
      markedDates[selectedDates.end] = { endingDay: true, color: "green" };
    }

    return markedDates;
  };

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("cart");
      const currentUser = JSON.parse(savedUser);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View>
      <SafeAreaView />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          // onSubmit={valueSubmit()}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldTouched,
            isValid,
            // handleSubmit,
          }) => (
            <View className="">
              <StatusBar barStyle={"light-content"} />
              <View className="m-4 rounded-xl bg-[#f4f2f2]">
                <Text className="m-4 mx-auto font-bold text-xl ">
                  Your Informations{" "}
                </Text>
                <View className="m-4">
                  <TextInput
                  autoFocus
                    className=" rounded-xl"
                    placeholder="Full Name"
                    value={values.name}
                    onChangeText={handleChange("name")}
                  />
                  {errors.name && (
                    <Text className=" text-red-600">{errors.name}</Text>
                  )}
                </View>
                <View className="m-4">
                  <TextInput
                    className=" rounded-xl"
                    placeholder="Email"
                    keyboardType="email-address"
                    textContentType={"emailAddress"}
                    value={values.email}
                    onChangeText={handleChange("email")}
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
                  />
                </View>
                <View className="m-4">
                  <TextInput
                    className=" rounded-xl"
                    placeholder="Address"
                    textContentType={"addressCityAndState"}
                    value={values.address}
                    onChangeText={handleChange("address")}
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
                      value={selectedDates.start}
                      editable={false} // Prevent user input, as we will use the calendar to set the date
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
                      value={selectedDates.end}
                      editable={false} // Prevent user input, as we will use the calendar to set the date
                    />
                  </TouchableOpacity>
                </View>

                <Modal visible={modalVisible} animationType="slide">
                  <View style={{ flex: 1 }}>
                    <Calendar
                      style={{
                        borderRadius: 10,
                        elevation: 4,
                        margin: 40,
                      }}
                      initialDate={
                        selectedTextInput === "start"
                          ? selectedDates.start
                          : data?.start
                      }
                      markingType="period"
                      markedDates={generateMarkedDates()}
                      onDayPress={handleDayPress}
                    />
                  </View>
                </Modal>

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  className="bg-[#24a8af] m-4 h-12 w-20 p-4 rounded-lg mx-auto"
                >
                  <Text className="text-white">Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default ShopForm;
