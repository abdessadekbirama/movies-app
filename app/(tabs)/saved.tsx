import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const Saved = () => {
  return (
    <View className='flex-1 bg-[#1c0127]'>
      <View className='flex-col flex-1 justify-center items-center gap-4'>
        <Image className='size-8' source={icons.save} tintColor="white"/>
        <Text className='text-white text-xl'>Saved</Text>
      </View>
    </View>
  )
}

export default Saved;