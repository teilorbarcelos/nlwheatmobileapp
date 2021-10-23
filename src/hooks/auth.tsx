import React,
{
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AuthSessions from 'expo-auth-session'
import { api } from "../services/api"
import { CLIENT_ID } from "../../variables"

const SCOPE = 'read:user'
const USER_STORAGE = '@nlw7:user'
const TOKEN_STORAGE = '@nlw7:token'

interface AuthResponse {
  token: string
  user: User
}

interface AuthorizationResponse {
  params: {
    code?: string
    error?: string
  }
  type?: string
}

interface User {
  id: string
  avatar_url: string
  name: string
  login: string
}

interface AuthContextData {
  user: User | null
  isSigning: boolean
  signIn: () => Promise<void>
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigning, setIsSigning] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function loadUserStorage() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE)
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
        setUser(JSON.parse(userStorage))
      }

      setIsSigning(false)
    }

    loadUserStorage()
  }, [])


  async function signIn() {

    try {
      setIsSigning(true)
      const authUrl = `https://github.com/login/oauth/authorize?scope=${SCOPE}&client_id=${CLIENT_ID}`
      const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const authData = await api.post('/mobileAuthenticate', {
          code: authSessionResponse.params.code
        })

        const { token, user } = authData.data as AuthResponse

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
        await AsyncStorage.setItem(TOKEN_STORAGE, token)

        setUser(user)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSigning(false)
    }
  }

  async function logout() {
    api.defaults.headers.common['Authorization'] = ``
    await AsyncStorage.removeItem(USER_STORAGE)
    await AsyncStorage.removeItem(TOKEN_STORAGE)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signIn, logout, user, isSigning }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
