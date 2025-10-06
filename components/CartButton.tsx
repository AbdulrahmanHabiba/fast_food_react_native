import { View, Text ,TouchableOpacity } from 'react-native'
import React from 'react'

export default function CartButton() {
    const totalItems = 10 ;
  return (
    <TouchableOpacity className="cart-btn" >
      <View className='cart-badge'>
        <Text className='small-bold text-white'>{totalItems}</Text>
      </View>
    </TouchableOpacity>
  )
}   

