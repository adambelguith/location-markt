import { View, Text, StatusBar, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextInput } from 'react-native-paper';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const userSchema = Yup.object({
    name: Yup.string().min(6,'Too Short').max(50,'Too long').required('Name is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('number is required'),
    address: Yup.string().min(6,'Too Short').max(50,'Too long').required('Addresse is required'),
  });

const ShopForm = () => {
    const {params} = useRoute()
    const data = params?.data;
    console.log('data',data)
   
      
        const initialValues = { name: '', email: '', password: '' };
        const handleSubmit = (values, { setSubmitting }) => {
          // Handle form submission here
        };

    const getUser = async () => {
        try {
          const savedUser = await AsyncStorage.getItem("cart");
          const currentUser = JSON.parse(savedUser);
          console.log('current',currentUser);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(()=>{
        getUser();
      },[])
  return (
    <View>
        <SafeAreaView />
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, setFieldTouched, isValid,handleSubmit }) => (
            <View className="">
            <StatusBar barStyle={'light-content'} />
            <View className="m-4 rounded-xl bg-[#f4f2f2]">
                <Text className="m-4 mx-auto font-bold text-xl ">Your Informations </Text>
                <View className="m-4">
                    <TextInput 
                        className=" rounded-xl" 
                        placeholder="Full Name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        />
                        {errors.name &&(
                            <Text className=" text-red-600">{errors.name}</Text>
                        )}
                </View>
                <View className="m-4">
                    <TextInput className=" rounded-xl" 
                        placeholder="Email" 
                        keyboardType="email-address"
                        textContentType={'emailAddress'}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        />
                </View>
                <View className="m-4">
                    <TextInput className=" rounded-xl" 
                        placeholder="Phone" 
                        keyboardType="numeric"
                        textContentType={'emailAddress'}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        />
                </View>
                <View className="m-4">
                    <TextInput className=" rounded-xl" placeholder="Full Name" />
                </View>
                
                <TouchableOpacity onPress={()=>{}} className="bg-[#24a8af] m-4 h-8 w-8">
                    <Text className="">Submit</Text>
                </TouchableOpacity>

            </View>
            </View>
            )}
        </Formik>
        {/* <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" />

          <label htmlFor="email">Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" />

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik> */}
    </View>
  )
}

export default ShopForm