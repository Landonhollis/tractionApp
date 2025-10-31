import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

/**
 * Props for the Header component
 *
 * @property {string} title - The screen title to display in the header
 *
 * Edge cases handled:
 * - Long text: Truncates with ellipsis if title exceeds available width
 * - Missing props: Displays empty string (shouldn't happen in practice)
 * - Safe area insets: Automatically adjusts for iOS notch/island
 * - Screen width: Title adjusts based on available space
 */
type HeaderProps = {
  title: string
}

export const Header: React.FC<HeaderProps> = ({ title = '' }) => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <Text
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
})
