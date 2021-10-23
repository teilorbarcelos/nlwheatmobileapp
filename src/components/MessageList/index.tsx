import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import {
  ScrollView
} from 'react-native'
import { api } from '../../services/api'
import { Message, MessageProps } from '../Message'

import { styles } from './styles'

let messagesQueue: MessageProps[] = []

const socket = io(String(api.defaults.baseURL))
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([])

  useEffect(() => {
    async function getMessages() {
      const messagesResponse = await api.get<MessageProps[]>('/getLast3Messages')
      setCurrentMessages(messagesResponse.data)
    }
    getMessages()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean))
        messagesQueue.shift()
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message: MessageProps) => {
        return (
          <Message key={message.id} data={message} />
        )
      })}

    </ScrollView>
  )
}