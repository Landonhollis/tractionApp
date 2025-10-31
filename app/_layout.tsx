
import '../global.css'
import { Slot } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AccountProvider } from '../providers/AccountProvider'
import { StatusBar } from '../components/StatusBar'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AccountProvider>
        <StatusBar />
        <Slot />
      </AccountProvider>
    </SafeAreaProvider>
  )
}
