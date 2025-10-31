import { View } from 'react-native'
import { Slot } from 'expo-router'
import { Menu } from '../../components/layoutComponents/Menu'

export default function AppLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Menu />
      <Slot />
    </View>
  )
}
