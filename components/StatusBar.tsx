import React from 'react'
import { StatusBar as RNStatusBar } from 'react-native'
import { useAccount } from '../providers/AccountProvider'

/**
 * StatusBar component that automatically adjusts based on the current theme
 * Placed in the root layout to control the status bar appearance throughout the app
 */
export const StatusBar = () => {
  const { ct } = useAccount()
  const barStyle = ct['sb-style']

  return <RNStatusBar barStyle={barStyle} />
}
