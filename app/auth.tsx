import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native'
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../services/authServices'
import { useAccount } from '../providers/AccountProvider'
import { router } from 'expo-router'

type AuthMode = 'signin' | 'signup'

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

export default function AuthScreen() {
  const { isAuthenticated, ps } = useAccount()
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated])

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Password validation (minimum 6 characters for now)
  const validatePassword = (password: string): boolean => {
    return password.length >= 6
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Confirm password validation (only for signup)
    if (mode === 'signup') {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle sign in
  const handleSignIn = async () => {
    if (!validateForm()) return

    setLoading(true)
    setErrors({})

    const result = await signInWithEmail(email, password)

    if (!result.success) {
      setErrors({ general: result.error?.message || 'Failed to sign in. Please check your credentials.' })
      setLoading(false)
      return
    }

    // Success - AccountProvider will handle navigation
    setLoading(false)
  }

  // Handle sign up
  const handleSignUp = async () => {
    if (!validateForm()) return

    setLoading(true)
    setErrors({})

    const result = await signUpWithEmail(email, password)

    if (!result.success) {
      setErrors({ general: result.error?.message || 'Failed to create account.' })
      setLoading(false)
      return
    }

    // Success - AccountProvider will handle navigation
    setLoading(false)
  }

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    setLoading(true)
    setErrors({})

    const result = await signInWithGoogle()

    if (!result.success) {
      setErrors({ general: result.error?.message || 'Failed to sign in with Google.' })
      setLoading(false)
      return
    }

    // Success - AccountProvider will handle navigation
    setLoading(false)
  }

  // Toggle mode
  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setErrors({})
    setConfirmPassword('')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={ps('bg-1')}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Card Container */}
          <View style={ps('bg-3 br-3 shadow-2')} className="w-full max-w-md p-8">
            {/* App Branding */}
            <View className="items-center mb-8">
              <View style={ps('bg-a1 br-3')} className="w-20 h-20 items-center justify-center mb-4">
                <Text style={ps('text-inverse f-3 fw-700')} className="text-4xl">T</Text>
              </View>
              <Text style={ps('text-strong f-3 fw-700 text-2xl')}>Traction</Text>
              <Text style={ps('text-muted f-5 fw-400 text-sm')} className="mt-2">
                {mode === 'signin' ? 'Welcome back' : 'Create your account'}
              </Text>
            </View>

            {/* Form */}
            <View className="gap-4">
              {/* Email Input */}
              <View>
                <Text style={ps('text-normal f-1 fw-500 text-sm')} className="mb-2">
                  Email
                </Text>
                <TextInput
                  style={[
                    ps(`bg-2 br-2 text-normal f-1 fw-400 text-md ${errors.email ? 'bc-accent bw-2' : 'bc-muted bw-1'}`),
                    { paddingHorizontal: 16, paddingVertical: 12 }
                  ]}
                  className="w-full"
                  placeholder="you@example.com"
                  placeholderTextColor="rgb(132, 132, 132)"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text)
                    if (errors.email) setErrors({ ...errors, email: undefined })
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!loading}
                />
                {errors.email && (
                  <Text style={ps('text-a1 f-5 fw-400 text-xs')} className="mt-1">{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View>
                <Text style={ps('text-normal f-1 fw-500 text-sm')} className="mb-2">
                  Password
                </Text>
                <TextInput
                  style={[
                    ps(`bg-2 br-2 text-normal f-1 fw-400 text-md ${errors.password ? 'bc-accent bw-2' : 'bc-muted bw-1'}`),
                    { paddingHorizontal: 16, paddingVertical: 12 }
                  ]}
                  className="w-full"
                  placeholder="••••••••"
                  placeholderTextColor="rgb(132, 132, 132)"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text)
                    if (errors.password) setErrors({ ...errors, password: undefined })
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                  editable={!loading}
                />
                {errors.password && (
                  <Text style={ps('text-a1 f-5 fw-400 text-xs')} className="mt-1">{errors.password}</Text>
                )}
              </View>

              {/* Confirm Password Input (Sign Up only) */}
              {mode === 'signup' && (
                <View>
                  <Text style={ps('text-normal f-1 fw-500 text-sm')} className="mb-2">
                    Confirm Password
                  </Text>
                  <TextInput
                    style={[
                      ps(`bg-2 br-2 text-normal f-1 fw-400 text-md ${errors.confirmPassword ? 'bc-accent bw-2' : 'bc-muted bw-1'}`),
                      { paddingHorizontal: 16, paddingVertical: 12 }
                    ]}
                    className="w-full"
                    placeholder="••••••••"
                    placeholderTextColor="rgb(132, 132, 132)"
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text)
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined })
                    }}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    editable={!loading}
                  />
                  {errors.confirmPassword && (
                    <Text style={ps('text-a1 f-5 fw-400 text-xs')} className="mt-1">{errors.confirmPassword}</Text>
                  )}
                </View>
              )}

              {/* General Error */}
              {errors.general && (
                <View style={ps('bg-2 bc-accent bw-2 br-2')} className="p-3">
                  <Text style={ps('text-a1 f-1 fw-400 text-sm')}>{errors.general}</Text>
                </View>
              )}

              {/* Sign In / Sign Up Button */}
              <TouchableOpacity
                style={[
                  ps('bg-a1 br-2 shadow-1'),
                  { paddingVertical: 16, opacity: loading ? 0.7 : 1, minHeight: 56 }
                ]}
                className="w-full items-center justify-center"
                onPress={mode === 'signin' ? handleSignIn : handleSignUp}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="rgb(23, 23, 23)" />
                ) : (
                  <Text style={ps('text-inverse f-1 fw-600 text-md')}>
                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center my-2">
                <View style={ps('bg-5')} className="flex-1 h-px" />
                <Text style={ps('text-muted f-5 fw-400 text-sm')} className="mx-4">or</Text>
                <View style={ps('bg-5')} className="flex-1 h-px" />
              </View>

              {/* Google Sign In Button */}
              <TouchableOpacity
                style={[
                  ps('bg-2 bc-normal bw-1 br-2'),
                  { paddingVertical: 16, opacity: loading ? 0.5 : 1, minHeight: 56 }
                ]}
                className="w-full items-center justify-center"
                onPress={handleGoogleSignIn}
                disabled={loading}
                activeOpacity={0.7}
              >
                <Text style={ps('text-normal f-1 fw-500 text-md')}>
                  Sign in with Google
                </Text>
              </TouchableOpacity>

              {/* Mode Toggle */}
              <View className="flex-row justify-center items-center mt-4">
                <Text style={ps('text-muted f-5 fw-400 text-sm')}>
                  {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                </Text>
                <TouchableOpacity
                  onPress={toggleMode}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  <Text style={ps('text-a1 f-1 fw-600 text-sm')}>
                    {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
