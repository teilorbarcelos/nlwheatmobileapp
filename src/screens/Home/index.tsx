import React from 'react'

import {
  KeyboardAvoidingView,
  Platform,
  View
} from 'react-native'
import { Header } from '../../components/Header'
import { MessageForm } from '../../components/MessageForm'
import { MessageList } from '../../components/MessageList'
import { SignInBox } from '../../components/SignInBox'
import { useAuth } from '../../hooks/auth'

import { styles } from './styles'

export function Home() {
  const { user } = useAuth()
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Header />

        <MessageList />
        {user ?
          <MessageForm />
          :
          <SignInBox />
        }

      </View>
    </KeyboardAvoidingView>
  )
}