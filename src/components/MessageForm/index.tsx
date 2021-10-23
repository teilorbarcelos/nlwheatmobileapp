import React, { useState } from 'react'

import {
  Alert,
  Keyboard,
  TextInput,
  View
} from 'react-native'
import { api } from '../../services/api'
import { COLORS } from '../../theme'
import { Button } from '../Button'

import { styles } from './styles'

export function MessageForm() {
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  async function sendMessage() {
    const messageFormated = message.trim()

    if (messageFormated.length === 0) {
      Alert.alert('Escreva uma mensagem!')
      return
    }

    setSendingMessage(true)

    await api.post('/messageCreate', {
      text: messageFormated
    })

    setMessage('')
    Keyboard.dismiss()
    setSendingMessage(false)
    Alert.alert('Mensagem enviada!')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual a sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={sendMessage}
      />
    </View>
  )
}