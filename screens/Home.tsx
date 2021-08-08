import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { FAB, makeStyles, Text, useTheme } from 'react-native-elements'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { FlatList } from 'react-native-gesture-handler'
import { useInfiniteQuery } from 'react-query'
import api from '../api'
import { RootStackParamList } from '../App'
import Tweet from '../components/Tweet'

export interface TweetI {
  appId: string
  id: string
  likes: number
  owner: User
  publishDate: string
  tags: string[]
  text: string
  updatedAt: string
}

export interface TweetResponse {
  data: TweetI[]
  limit: number
  offset: number
  page: number
  total: number
}

interface User {
  id: string
  title: string
  firstName: string
  lastName: string
  email: string
  picture: string
}

const getTweets = async ({ pageParam = 0 }) => {
  const { data } = await api.get<TweetResponse>(
    `/post?limit=10&page=${pageParam}`
  )
  return data
}

const Home: React.FC<BottomTabScreenProps<RootStackParamList, 'Home'>> = () => {
  const { theme } = useTheme()
  const styles = useStyles()
  const {
    data: tweets,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<TweetResponse, Error>('tweets', getTweets, {
    getNextPageParam: (page) => {
      const totalPages = Math.floor(page.total / page.limit)
      if (page.page < totalPages) {
        return page.page + 1
      }
    },
  })

  const renderTweet = ({ item }: { item?: TweetI }) => <Tweet tweet={item} />

  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={56} color={theme.colors?.secondary} />
      </View>
    )
  if (isError) return <Text>{error?.message}</Text>
  return (
    <View>
      <FlatList
        data={tweets?.pages.map((page) => page.data).flat()}
        keyExtractor={(tweet: TweetI) => tweet.id}
        renderItem={renderTweet}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() => {
          return (
            <View style={styles.loadingNextPageContainer}>
              <ActivityIndicator color={theme.colors?.secondary} />
            </View>
          )
        }}
        initialNumToRender={10}
        ItemSeparatorComponent={() => <Divider color={theme.colors?.divider} />}
      />
      <FAB
        placement="right"
        visible
        icon={{ name: 'add', type: 'ionicon', color: 'white' }}
        onPress={() => console.log('add a tweet')}
      />
    </View>
  )
}

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingNextPageContainer: {
    padding: 12,
  },
}))

export default Home
