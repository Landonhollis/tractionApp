
import '../global.css'
import { Slot } from 'expo-router'
import { AccountProvider } from '../providers/AccountProvider'
import { StatusBar } from '../components/StatusBar'

export default function RootLayout() {
  return (
    <AccountProvider>
      <StatusBar />
      <Slot />
    </AccountProvider>
  )
}
