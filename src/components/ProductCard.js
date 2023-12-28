import { Image, StyleSheet, View, Text } from 'react-native'
import React from 'react'
import Animated, {FadeInLeft} from 'react-native-reanimated';

const ProductCard = (props) => {
    const { item } = props;
    
  return (
    <View style={styles.container} className=" items-center p-2 bg-[#fff]">
      <Animated.Image sharedTransitionTag={`T${item.id}`} className="object-contain w-[150px] h-[150px] rounded-xl" style={styles.images} source={item.thumbnail[0]} />
      <Text className="text-[18px] text-[#322d2d] font-semibold ">
        <Text className="text-[#24a8af] p-2 font-bold">€</Text>
        {item.price} 
        <Text className="text-[14px] font-light"> /day</Text>
      </Text>
      <Text className="text-lg font-bold">{item.title.length > 25
          ? `${item.title.substring(0, 14)}...`
          : item.title}</Text>
    </View>
  )
}

export default ProductCard
const styles = StyleSheet.create({
  container :{
    shadowColor: "#000",
    shadowOffset: {
    	width: 1,
    	height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    borderRadius:10,
    elevation: 14,
  },
    images:{
        resizeMode:'contain',
    }
})