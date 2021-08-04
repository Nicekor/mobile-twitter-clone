import React from 'react'
import { StyleSheet } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './screens/Home'
import { Theme, ThemeProvider, Text } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Header from './components/Header'
import DMs from './screens/DMs'
import Search from './screens/Search'
import Notifications from './screens/Notifications'

const queryClient = new QueryClient()

export type RootStackParamList = {
  Home: undefined
  Search: undefined
  Notifications: undefined
  DMs: undefined
}

export const theme: Theme = {
  Text: {
    style: {
      color: 'white',
    },
  },
  colors: {
    primary: '#15202b',
    secondary: '#1da1f2',
    divider: '#38444d',
  },
}

// ! The android navigation bar color is being set on app.json which is not dynamic atm

const Tab = createBottomTabNavigator<RootStackParamList>()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <Tab.Navigator
              sceneContainerStyle={styles.sceneContainer}
              screenOptions={({ route }) => ({
                header: (props) => <Header {...props} />,
                tabBarActiveBackgroundColor: theme.colors?.primary,
                tabBarInactiveBackgroundColor: theme.colors?.primary,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: theme.colors?.secondary,
                tabBarInactiveTintColor: theme.colors?.grey0,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName

                  if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline'
                  } else if (route.name === 'Search') {
                    iconName = focused ? 'search' : 'search-outline'
                  } else if (route.name === 'Notifications') {
                    iconName = focused
                      ? 'notifications'
                      : 'notifications-outline'
                  } else if (route.name === 'DMs') {
                    iconName = focused ? 'mail' : 'mail-outline'
                  }

                  return iconName ? (
                    <Ionicons name={iconName} size={size} color={color} />
                  ) : null
                },
              })}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Search" component={Search} />
              <Tab.Screen name="Notifications" component={Notifications} />
              <Tab.Screen name="DMs" component={DMs} />
            </Tab.Navigator>
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    backgroundColor: theme.colors?.primary,
  },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: theme.colors?.divider,
  },
})
