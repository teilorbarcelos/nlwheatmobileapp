import React from 'react'

import {
  Text,
  View
} from 'react-native'
import { UserPhoto } from '../UserPhoto'

import { styles } from './styles'

interface UserProps {
  name: string
  avatar_url: string
}

export interface MessageProps {
  id: string
  text: string
  user: UserProps
}

interface Props {
  data: MessageProps
}

export function Message({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {data.text}
      </Text>

      <View style={styles.footer}>
        <UserPhoto
          imageUri={data.user.avatar_url || ''}
          sizes='SMALL'
        />

        <Text style={styles.userName}>
          {data.user.name}
        </Text>
      </View>
    </View>
  )
}