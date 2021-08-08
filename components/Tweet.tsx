import {
  differenceInWeeks,
  format,
  formatDistanceToNowStrict,
  subWeeks,
} from 'date-fns'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Avatar, makeStyles, Text, useTheme } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TweetI } from '../screens/Home'

interface TweetProps {
  tweet?: TweetI
}

const getCreatedAtString = (createdAtStr?: string) => {
  if (!createdAtStr) return

  const createdAt: Date = new Date(createdAtStr)

  if (!(createdAt instanceof Date) || isNaN(createdAt.valueOf())) return ''

  const lastWeekDate = subWeeks(createdAt, 1)
  return differenceInWeeks(createdAt, lastWeekDate) >= 1
    ? format(createdAt, 'MMM d')
    : formatDistanceToNowStrict(createdAt)
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const { theme } = useTheme()
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="medium"
        icon={{ type: 'ionicon', name: 'person', color: theme.colors?.grey2 }}
        overlayContainerStyle={{ backgroundColor: theme.colors?.grey0 }}
        containerStyle={styles.avatarContainer}
        source={{
          uri: tweet?.owner?.picture,
        }}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.username}>
            {[tweet?.owner?.firstName, tweet?.owner?.lastName]
              .filter(Boolean)
              .join(' ')}
          </Text>
          <Ionicons
            name="ellipse"
            size={2}
            color={theme.colors?.grey0}
            style={{ marginHorizontal: 4 }}
          />
          <Text style={{ color: theme.colors?.grey0 }}>
            {getCreatedAtString(tweet?.publishDate)}
          </Text>
          <Ionicons
            name="ellipsis-vertical"
            color={theme.colors?.grey0}
            size={16}
            style={styles.optionsIcon}
          />
        </View>
        <Text>{tweet?.text}</Text>
      </View>
    </View>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  avatarContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
  },
  optionsIcon: {
    marginLeft: 'auto',
  },
}))

export default Tweet
