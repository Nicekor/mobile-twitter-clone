import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
import { RootStackParamList } from '../App'

const Home: React.FC<BottomTabScreenProps<RootStackParamList, 'Home'>> = () => {
  return (
    <View>
      <Text>home</Text>
    </View>
  )
}

export default Home
