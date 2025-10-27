import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../services/supabaseClient'
import { getAccountData } from '../services/accountProviderServices'
import { createUserAccount } from '../services/authServices'
import { allThemes } from '../assets/themeObjects'
import { setTheme as setThemeService } from '../services/setTheme'
import { ps as psUtil } from '../utilities/ps'
import { Ctn, Ct } from '../assets/themeTypes'

interface Account {
  // Variables from Supabase
  userId?: string | null
  email?: string | null

  // Variables from account provider
  isAuthenticated: boolean
  ctn: Ctn
  ct: Ct
  themeLoading: boolean

  // Functions
  setTheme: (themeName: Ctn) => Promise<void>
  ps: (styleString: string) => object
  loadAccountData: () => Promise<void>
}

const Account = createContext<Account | undefined>(undefined)

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  // States
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Account data
  const [ctn, setCtn] = useState<Ctn>('theme1')
  const ct = allThemes[ctn] as Ct
  const [themeLoading, setThemeLoading] = useState(true)

  // Authentication functions
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session?.user?.id)

      if (session?.user?.id) {
        setUserId(session.user.id)
        setEmail(session.user.email || null)
        loadAccountData()
      } else {
        setUserId(null)
        setEmail(null)
        setIsAuthenticated(false)
        clearAccountData()
      }
    }
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user?.id)

      if (session?.user?.id) {
        setUserId(session.user.id)
        setEmail(session.user.email || null)
        loadAccountData()
      } else {
        setUserId(null)
        setEmail(null)
        setIsAuthenticated(false)
        clearAccountData()
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const loadAccountData = async () => {
    setThemeLoading(true)
    const { data: { session } } = await supabase.auth.getSession()

    // Create account if it doesn't exist
    if (session?.user?.id) {
      await createUserAccount(session.user.id)
    }

    const data = await getAccountData()
    if (data) {
      setCtn(data.theme_name as Ctn || 'theme1')
    } else {
      console.log('No account data found for user:', session?.user?.id)
    }
    setThemeLoading(false)
  }

  const clearAccountData = () => {
    setCtn('theme1')
    setThemeLoading(false)
  }

  // Theme setter function - updates both local state and database
  const handleSetTheme = async (themeName: Ctn) => {
    setThemeLoading(true)
    setCtn(themeName)
    await setThemeService(themeName)
    setThemeLoading(false)
  }

  // ps function wrapper that includes the current theme
  const ps = (styleString: string) => {
    return psUtil(styleString, ct)
  }

  return (
    <Account.Provider value={{
      userId,
      email,
      isAuthenticated,
      ctn,
      setTheme: handleSetTheme,
      ct,
      themeLoading,
      ps,
      loadAccountData,
    }}>
      {children}
    </Account.Provider>
  )
}

export const useAccount = () => {
  const context = useContext(Account)
  if (!context) {
    throw new Error('useAccount must be used within AccountProvider')
  }
  return context
}
