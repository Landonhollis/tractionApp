import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import { useAccount } from '../../providers/AccountProvider'
import { getUserName, updateUserName, cycleTheme } from '../../services/settingsService'
import { signOut } from '../../services/authServices'
import { useRouter } from 'expo-router'

// Types
type SaveState = 'idle' | 'saving' | 'success' | 'error'

export default function SettingsScreen() {
  const { session } = useAccount()
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

    const result = await cycleTheme()

    if (result.success) {
      setThemeMessage(`Switched to ${result.newTheme}`)
      // Clear message after 2 seconds
      setTimeout(() => {
        setThemeMessage(null)
      }, 2000)
    } else {
      setThemeMessage('Failed to switch theme')
    }

    setSwitchingTheme(false)
  }

  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 16, fontSize: 16 }}>Loading settings...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingTop: 80,
          alignItems: 'center',
        }}
      >
        {/* Page title */}
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          Settings
        </Text>

        {/* Name field */}
        <View style={{ width: '100%', maxWidth: 400 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 8,
              color: '#000',
            }}
          >
            Name:
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
            style={{
              borderWidth: 1,
              borderColor: saveState === 'error' ? '#FF3B30' : '#ddd',
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              backgroundColor: '#fff',
              marginBottom: 12,
            }}
            editable={saveState !== 'saving'}
          />

          {/* Save button */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={saveState === 'saving' || !name.trim()}
            style={{
              backgroundColor:
                saveState === 'saving' || !name.trim() ? '#ccc' : '#007AFF',
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            {saveState === 'saving' && (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>
              {saveState === 'saving' ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>

          {/* Success message */}
          {saveState === 'success' && (
            <View
              style={{
                backgroundColor: '#34C759',
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
                Name updated successfully!
              </Text>
            </View>
          )}

          {/* Error message */}
          {saveState === 'error' && error && (
            <View
              style={{
                backgroundColor: '#FFEBEE',
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#FF3B30',
              }}
            >
              <Text style={{ color: '#C62828', fontSize: 14 }}>
                {error}
              </Text>
            </View>
          )}

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
UI/UX BIAS FOR FUTURE DESIGN PASS
Minimal, clean, focused.
This is a simple utility screen - don't over-design it.
Clear label, obvious input field, straightforward interaction.
Consider gentle feedback animations for save success.
Leave room for future settings to be added below.
Professional and straightforward - this is a tool, not a showcase.
*/
