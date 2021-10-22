import React from 'react'

import {
  ScrollView
} from 'react-native'
import { Message } from '../Message'

import { styles } from './styles'

export function MessageList() {
  const message = {
    id: '123123123',
    text: 'Test Message',
    user: {
      avatar_url: 'https://github.com/teilorbarcelos.png',
      name: 'Teilor Souza Barcelos'
    }
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      <Message data={message} />
      <Message data={message} />
      <Message data={message} />
    </ScrollView>
  )
}