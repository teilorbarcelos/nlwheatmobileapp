import React from 'react'

import {
  Image
} from 'react-native'

import { styles } from './styles'

import imageDefault from '../../assets/avatar.png'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../../theme'

const SIZES = {
  SMALL: {
    containerSize: 32,
    avatarSize: 28
  },
  NORMAL: {
    containerSize: 48,
    avatarSize: 42
  }
}

interface Props {
  imageUri: string | undefined
  sizes?: 'SMALL' | 'NORMAL'
}

export function UserPhoto({ imageUri, sizes = 'NORMAL' }: Props) {
  const { containerSize, avatarSize } = SIZES[sizes]

  return (
    <LinearGradient
      colors={[COLORS.PINK, COLORS.YELLOW]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2
        }
      ]}
    >
      <Image
        source={(imageUri != '') ? { uri: imageUri } : imageDefault}
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2
          }
        ]}
      />
    </LinearGradient>
  )
}