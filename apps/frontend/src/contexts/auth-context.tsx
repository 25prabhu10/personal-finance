import { sleepTest } from '@/lib/utils'
import { createContext, type ReactNode, use, useCallback, useEffect, useState } from 'react'

export interface AuthContext {
  isAuthenticated: boolean
  login: (username: string) => Promise<void>
  logout: () => Promise<void>
  // signup: (name: string, username: string, email: string, password: string) => Promise<void>
  user: null | string
}

const AuthContext = createContext<AuthContext | undefined>(undefined)

const key = 'tanstack.auth.user'

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<null | string>(getStoredUser())
  const isAuthenticated = !!user

  const logout = useCallback(async () => {
    await sleepTest(250)

    setStoredUser(null)
    setUser(null)
  }, [])

  const login = useCallback(async (username: string) => {
    await sleepTest(500)

    setStoredUser(username)
    setUser(username)
  }, [])

  // const signup = useCallback(
  //   async (name: string, username: string, email: string, password: string) => {
  //     await sleepTest(500)
  //
  //     setStoredUser(username)
  //     setUser(username)
  //   },
  //   []
  // )

  useEffect(() => {
    setUser(getStoredUser())
  }, [])

  return <AuthContext value={{ isAuthenticated, login, logout, user }}>{children}</AuthContext>
}

export function useAuth() {
  const context = use(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

function getStoredUser() {
  return localStorage.getItem(key)
}

function setStoredUser(user: null | string) {
  if (user) {
    localStorage.setItem(key, user)
  } else {
    localStorage.removeItem(key)
  }
}
