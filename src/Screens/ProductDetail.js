import { View, Text, Image , StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, Modal} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackIcon from '../../assets/icons/back'
import CartIcon from '../../assets/icons/cart'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated'
import Calendar from 'react-native-calendars/src/calendar'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductDetail = () => {
    const {params} = useRoute()
    const { goBack ,navigate} = useNavigation();
    const data = params?.data;
    const {width}= useWindowDimensions();
    const {height} =useWindowDimensions();
    const windowWidth = width;
    const windowHeight =height;
    const sizewidth = width ;
    const [imges, setImg] = useState(data.thumbnail[0]);
    const [indeximage, setIndexImage] = useState(0);

  
  
    const hoverHandler = (image, i) => {
      console.log('ima',image)
      setImg(image);
      setIndexImage(i);
    };
  


    
    const [showModal , setModel]= useState(false);
    const [selectedDates, setSelectedDates] = useState({});

    // const handleDayPress = (day) => {
    //   if (selectedDates.start && selectedDates.end) {
    //     setSelectedDates({});
    //   } else if (!selectedDates.start) {
    //     setSelectedDates({ start: day.dateString });
    //   } else {
    //     setSelectedDates({ ...selectedDates, end: day.dateString });
    //   }
    // };

    // const generateMarkedDates = () => {
    //     const markedDates = {};
    
    //     if (selectedDates.start && selectedDates.end) {
    //       const range = getDatesRange(selectedDates.start, selectedDates.end);
          
    //       range.forEach((date,index ) => {
    //         const isStart = index === 0;
    //       const isEnd = index === range.length - 1;
    //         markedDates[date] = { color: 'green', 
    //         textColor: 'white',
    //         startingDay: isStart,
    //         endingDay: isEnd,
    //         containerStyle: {
    //           borderRadius: isStart ? 10 : 0,
    //           borderBottomLeftRadius: isStart ? 10 : 0,
    //           borderTopLeftRadius: isStart ? 10 : 0,
    //           borderBottomRightRadius: isEnd ? 10 : 0,
    //           borderTopRightRadius: isEnd ? 10 : 0,
    //         },
    //     }
    //       });
    //     }
    
    //     return markedDates;
    //   };
    
    //   const getDatesRange = (start, end) => {
    //     const startDate = new Date(start);
    //     const endDate = new Date(end);
    //     const range = [];
    
    //     while (startDate <= endDate) {
    //       range.push(startDate.toISOString().split('T')[0]);
    //       startDate.setDate(startDate.getDate() + 1);
    //     }
    
    //     return range;
    //   };

    //   const cartshop= async () =>{
    //     const storedata= [data , selectedDates]
    //         console.log('shop',storedata)
    //     try {
    //         await AsyncStorage.setItem("cart", JSON.stringify(storedata));
    //       } catch (error) {
    //         console.log(error);
    //       }
    //       navigate("ShopForm",{data:storedata})
    //   }

    //   const Shop = () => {
    //     if (selectedDates.end){
    //         const storedata= [data , selectedDates]
    //         console.log('shop',storedata)
    //         return (<TouchableOpacity className="bg-[#c2c530] w-[115px] p-4 items-center rounded-xl mx-auto mt-4 flex-row"  onPress={() =>cartshop()} >
    //         <Text className="text-[18px] text-[#ffffff]">Shop</Text>
    //         <View className="w-4 h-4 ml-2 mb-4">
    //             <CartIcon   />
    //         </View>
    //        </TouchableOpacity>)
    //     }
    //     return null
    //   }

  return (
    <View style={styles.container}>
        <SafeAreaView />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={styles.backgroundgrey} className="h-[450px]">
        
        <View className="flex-row items-center justify-between py-4 px-4 ">
            <Animated.View entering={FadeInLeft.delay(50).duration(100) }>
            <TouchableOpacity onPress={()=> goBack() } style={styles.iconBack} className="bg-white h-12 w-12 items-center justify-center rounded-full">
                <BackIcon />
            </TouchableOpacity>
            </Animated.View>
            {/* <Animated.View entering={FadeInRight.delay(200).duration(500)} >
            <TouchableOpacity style={styles.iconBack} className="bg-white h-12 w-14 items-center justify-center rounded-full">
                <CartIcon />
            </TouchableOpacity>
            </Animated.View> */}
        </View>
        <View
        className="flex h-[80%] w-full items-center justify-center " 
        sharedTransitionTag={`T${data.id}`}
        snapToInterval={sizewidth}
        decelerationRate="fast"
        >
          <View >
       
            <Image
              source={ imges }
            />
      </View>
      
            {/* <ScrollView
                horizontal 
                showHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={10}
                snapToInterval={sizewidth}
                decelerationRate="fast"
                style={{height:'100%'}}
            
            >
            {
                data.thumbnail.map((item, index)=>{
                    if(!item){
                        return <View style={{width: '0%'}} key={index} />
                    }
                    return(
                        <View style={{width:sizewidth }} key={index}>
                            <View style={styles.imageContainer} className="mx-4" >
                                <Image source={item} className="h-full " style={styles.imagess} />
                            </View>
                        </View>
                    )
                })
            }
            </ScrollView> */}
            
        </View>
        <View >
        {data.thumbnail.map((image, i) => {
           return(
          <TouchableOpacity
            key={i}
            // style={[styles.img_wrap, indeximage === i && styles.active]}
            onPress={() => hoverHandler(image, i)}
          >
            {console.log(data.thumbnail)}
            <Image
              source={image}
            />
          </TouchableOpacity>)
})}
        
      </View>

      </View>
      <View className="">
        <View className="flex-row items-center justify-between p-4">
            <Text className="text-xl font-bold">{data.title}</Text>
            <Text className="text-[24px] text-[#322d2d] font-semibold ">
                <Text className="text-[#24a8af]">$</Text>
                {data.price} 
                <Text className="text-[14px] font-light"> /day</Text>
            </Text>
        </View>

        <View className="mx-auto">
            <Text className="font-bold text-[24px] text-[#2a8943] mx-10">
                {data.start}
                    <Text className="text-[#24a8af]">➡</Text>
                {data.end}
            </Text>
        </View>
        <View className="">
        <TouchableOpacity 
        onPress={()=> setModel(true)}
        style={{
            borderRadius:10,
            padding:10,
            width:200,
            alignItems:'center',
        }}
        className="justify-center mx-auto bg-[#24a8af] mt-2 flex-row "
        >
            <Text style={{color:'white', fontSize:22}}>Choose Period</Text>
            <Image  className="w-8 h-8 ml-2" source={{uri:'https://img.icons8.com/color/48/calendar--v1.png'}} alt="calendar"/>
        </TouchableOpacity>
        </View>
        {/* <Modal visible={showModal} animationType='fade' >
            <Calendar
            style={{borderRadius:10, elevation:4, margin:40}}
            initialDate={data?.start}
            minDate={data?.start}
            maxDate={data?.end}
            markingType="period" 
            markedDates={{
                [selectedDates.start]: { startingDay: true, color: 'green' },
                [selectedDates.end]: { endingDay: true, color: 'green' },
                ...generateMarkedDates(),
              }}
            onDayPress={handleDayPress}
             />
             <View className="flex-row justify-between mx-6">
                <TouchableOpacity onPress={()=> setSelectedDates({})} >
                    <Text className="text-lg m-4 mt-6 text-[#454040] ">Clear</Text>
                </TouchableOpacity>
             <TouchableOpacity 
        onPress={()=> setModel(false)}
        style={{
            borderRadius:10,
            margin:5,
            padding:10,
            width:120,
            alignItems:'center',
            justifyContent:'center',
        }}
        className="bg-[#24a8af]"
        >
            <Text style={{color:'white', fontSize:22}}>Done</Text>
        </TouchableOpacity>
        </View>
        </Modal> */}

        <Text className="my-6 mx-4 text-[#141313] text-[16px]">{data.description}</Text>
        
       
      </View>
      </ScrollView>
    </View>
  )
}

export default ProductDetail

const styles =StyleSheet.create({
    container:{
        flex:1
    },
    backgroundgrey:{
    borderBottomLeftRadius:50,
    borderBottomRightRadius: 50,
    backgroundColor:"lightgrey",
    },
    iconBack:{
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 7,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 14,
    },
    imageContainer:{
        alignSelf:"center",
        borderBottomLeftRadius:80,
        borderBottomRightRadius: 80,
    },
    imagess:{
        // width:'100%',
        // height:undefined,
        aspectRatio:1,
       alignSelf:"center",
       borderBottomLeftRadius:25,
       borderBottomRightRadius: 25,
      resizeMode:'contain',
    },
    selectedDateContainerStyle: {
        height: 35,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
      },
      selectedDateStyle: {
        fontWeight: "bold",
        color: "white",
      },



      left_2: {
        flex: 1,
      },
      grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      img_wrap: {
        // your styles
      },
      active: {
        // your active styles
      },
})