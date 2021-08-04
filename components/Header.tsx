import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import React from 'react'
import { View, StatusBar } from 'react-native'
import { useTheme } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const Header: React.FC<BottomTabHeaderProps> = () => {
  const { theme } = useTheme()

  return (
    <SafeAreaView>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={theme.colors?.primary}
      />
      <View
        style={{
          backgroundColor: theme.colors?.primary,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors?.divider,
        }}
      >
        <Avatar
          rounded
          source={{
            uri: 'https://www.classifapp.com/wp-content/uploads/2017/09/avatar-placeholder.png',
          }}
        />
        <AntDesignIcon
          name="twitter"
          color={theme.colors?.secondary}
          size={25}
        />
        <FontAwesome5Icon
          name="hand-sparkles"
          color={theme.colors?.secondary}
          size={22}
        />
      </View>
    </SafeAreaView>
  )
}

export default Header
