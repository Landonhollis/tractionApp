// screen coding agent was in progress when ai rate limit was reached
import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native'
import { useAccount } from '../../providers/AccountProvider'
import { getUserName, updateUserName } from '../../services/settingsService'
import { signOut } from '../../services/authServices'
import { useRouter } from 'expo-router'
import type { Ctn } from '../../assets/themeObjects'

// Types
type SaveState = 'idle' | 'saving' | 'success' | 'error'

export default function SettingsScreen() {
  const { session, ps, ct, ctn, setTheme } = useAccount()
  const router = useRouter()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [error, setError] = useState<string | null>(null)
  const [signingOut, setSigningOut] = useState(false)
  const [switchingTheme, setSwitchingTheme] = useState(false)
  const [themeMessage, setThemeMessage] = useState<string | null>(null)

  // Load user name on mount
  useEffect(() => {
    loadUserName()
  }, [session])

  const loadUserName = async () => {
    if (!session?.user?.id) {
      setLoading(false)
      return
    }

    setLoading(true)
    const result = await getUserName(session.user.id)

    if (result.success && result.data) {
      setName(result.data.name || '')
    } else if (result.error) {
      setError(result.error)
    }

    setLoading(false)
  }

  const handleSave = async () => {
    if (!session?.user?.id) {
      setError('No user session found')
      setSaveState('error')
      return
    }

    // Validation: name must not be empty
    if (!name.trim()) {
      setError('Name cannot be empty')
      setSaveState('error')
      return
    }

    setSaveState('saving')
    setError(null)

    const result = await updateUserName(session.user.id, name.trim())

    if (result.success) {
      setSaveState('success')
      // Clear success message after 2 seconds
      setTimeout(() => {
        setSaveState('idle')
      }, 2000)
    } else {
      setError(result.error || 'Failed to save name')
      setSaveState('error')
    }
  }

  const handleSignOut = async () => {
    setSigningOut(true)
    const result = await signOut()

    if (result.success) {
      // Navigate to index, which will redirect to auth screen
      router.replace('/')
    } else {
      setError('Failed to sign out')
      setSigningOut(false)
    }
  }

  const handleSwitchTheme = async () => {
    setSwitchingTheme(true)
    setThemeMessage(null)

    try {
      // Determine the next theme
      let nextTheme: Ctn
      switch (ctn) {
        case 'theme1':
          nextTheme = 'theme2'
          break
        case 'theme2':
          nextTheme = 'theme3'
          break
        case 'theme3':
          nextTheme = 'theme4'
          break
        case 'theme4':
          nextTheme = 'theme1'
          break
        default:
          nextTheme = 'theme1'
      }

      // Update theme in both local state and database
      await setTheme(nextTheme)

      setThemeMessage(`Switched to ${nextTheme}`)
      // Clear message after 2 seconds
      setTimeout(() => {
        setThemeMessage(null)
      }, 2000)
    } catch (error) {
      setThemeMessage('Failed to switch theme')
    }

    setSwitchingTheme(false)
  }

  // Loading state
  if (loading) {
    return (
      <View style={[ps('bg-1'), { flex: 1 }]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={ct['text-normal'].color} />
          <Text style={[ps('text-md text-normal f-1'), { marginTop: 16 }]}>
            Loading settings...
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[ps('bg-1'), { flex: 1 }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 24,
          paddingTop: 80,
          alignItems: 'center',
        }}
      >
        {/* Page title */}
        <Text
          style={[
            ps('text-2xl text-strong f-3 fw-700'),
            { marginBottom: 32, textAlign: 'center' },
          ]}
        >
          Settings
        </Text>

        {/* Settings content container */}
        <View style={{ width: '100%', maxWidth: 480 }}>
          {/* Profile Section */}
          <View style={[ps('bg-2 br-2 shadow-1'), { padding: 20, marginBottom: 24 }]}>
            <Text style={[ps('text-lg text-strong f-1 fw-600'), { marginBottom: 16 }]}>
              Profile Information
            </Text>

            <Text style={[ps('text-sm text-muted f-1 fw-400'), { marginBottom: 8 }]}>
              Name
            </Text>

            <TextInput
              value={name}
              onChangeText={(text) => {
                setName(text)
                if (saveState === 'error') {
                  setSaveState('idle')
                  setError(null)
                }
              }}
              placeholder="Enter your name"
              placeholderTextColor={ct['text-muted'].color}
              style={[
                ps('text-md f-1 fw-400 br-2 bg-3'),
                {
                  borderWidth: 1,
                  borderColor: saveState === 'error'
                    ? ct['text-a1'].color
                    : ct['bc-muted'].borderColor,
                  padding: 12,
                  color: ct['text-normal'].color,
                  marginBottom: 12,
                },
              ]}
              editable={saveState !== 'saving'}
            />

            {/* Save button */}
            <Pressable
              onPress={handleSave}
              disabled={saveState === 'saving' || !name.trim()}
              style={({ pressed }) => [
                ps('br-2'),
                {
                  backgroundColor:
                    saveState === 'saving' || !name.trim()
                      ? ct['bg-4'].backgroundColor
                      : pressed
                      ? ct['bg-a2'].backgroundColor
                      : ct['bg-a1'].backgroundColor,
                  paddingVertical: 14,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              {saveState === 'saving' && (
                <ActivityIndicator
                  size="small"
                  color={ct['text-inverse'].color}
                  style={{ marginRight: 8 }}
                />
              )}
              <Text style={[ps('text-md text-inverse f-1 fw-600')]}>
                {saveState === 'saving' ? 'Saving...' : 'Save Changes'}
              </Text>
            </Pressable>

            {/* Success message */}
            {saveState === 'success' && (
              <View
                style={[
                  ps('bg-a1 br-2'),
                  { padding: 12, alignItems: 'center', marginTop: 12 },
                ]}
              >
                <Text style={[ps('text-sm text-inverse f-1 fw-600')]}>
                  Name updated successfully
                </Text>
              </View>
            )}

            {/* Error message */}
            {saveState === 'error' && error && (
              <View
                style={[
                  ps('br-2 bg-3'),
                  {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: ct['text-a1'].color,
                    marginTop: 12,
                  },
                ]}
              >
                <Text style={[ps('text-sm text-a1 f-1 fw-400')]}>
                  {error}
                </Text>
              </View>
            )}
          </View>

          {/* Sign Out button */}
          <TouchableOpacity
            onPress={handleSignOut}
            disabled={signingOut}
            style={{
              backgroundColor: signingOut ? '#ccc' : '#FF3B30',
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 32,
              marginBottom: 16,
            }}
          >
            {signingOut && (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>
              {signingOut ? 'Signing Out...' : 'Sign Out'}
            </Text>
          </TouchableOpacity>

          {/* Switch Theme button */}
          <TouchableOpacity
            onPress={handleSwitchTheme}
            disabled={switchingTheme}
            style={{
              backgroundColor: switchingTheme ? '#ccc' : '#007AFF',
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            {switchingTheme && (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>
              {switchingTheme ? 'Switching...' : 'Switch Theme'}
            </Text>
          </TouchableOpacity>

          {/* Theme switch message */}
          {themeMessage && (
            <View
              style={{
                backgroundColor: '#34C759',
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
                {themeMessage}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

/*
 * ============================================
 * GLOBAL UI DESIGN BIAS - FOR STYLING AGENT
 * ============================================
 *
 * [ ]: presentational - visually rich with fancy fonts, large graphics, and generous whitespace.
 * [x]: business management - function first, graphs are less visual, more numeric. display is more plain, but more clear.
 * [ ]: shop - conversion first = clear checkout flow, smooth transitions, bold CTA's, high contrast palate.
 * [x]: custom: emphasis on well defined sections, very distinctively separated. this is because of the amount of business information that needs to be easily scrolled through.
 *
 * This information guides future styling passes.
 * Do not modify the functional code above based on this bias yet.
 * ============================================
 */
