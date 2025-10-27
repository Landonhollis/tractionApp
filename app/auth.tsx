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
  const { isAuthenticated } = useAccount()
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
      className="flex-1 bg-gray-50 dark:bg-gray-900"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Card Container */}
          <View className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            {/* App Branding */}
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-blue-500 rounded-2xl items-center justify-center mb-4">
                <Text className="text-white text-3xl font-bold">T</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">Traction</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {mode === 'signin' ? 'Welcome back' : 'Create your account'}
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              {/* Email Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </Text>
                <TextInput
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg text-gray-900 dark:text-white`}
                  placeholder="you@example.com"
                  placeholderTextColor="#9CA3AF"
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
                  <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </Text>
                <TextInput
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg text-gray-900 dark:text-white`}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
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
                  <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
                )}
              </View>

              {/* Confirm Password Input (Sign Up only) */}
              {mode === 'signup' && (
                <View>
                  <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </Text>
                  <TextInput
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } rounded-lg text-gray-900 dark:text-white`}
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
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
                    <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text>
                  )}
                </View>
              )}

              {/* General Error */}
              {errors.general && (
                <View className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <Text className="text-red-600 dark:text-red-400 text-sm">{errors.general}</Text>
                </View>
              )}

              {/* Sign In / Sign Up Button */}
              <TouchableOpacity
                className={`w-full py-4 rounded-lg items-center justify-center ${
                  loading ? 'bg-blue-400' : 'bg-blue-500'
                }`}
                onPress={mode === 'signin' ? handleSignIn : handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-semibold text-base">
                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center my-2">
                <View className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                <Text className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</Text>
                <View className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
              </View>

              {/* Google Sign In Button */}
              <TouchableOpacity
                className="w-full py-4 border border-gray-300 dark:border-gray-600 rounded-lg items-center justify-center"
                onPress={handleGoogleSignIn}
                disabled={loading}
              >
                <Text className="text-gray-700 dark:text-gray-300 font-medium text-base">
                  Sign in with Google
                </Text>
              </TouchableOpacity>

              {/* Mode Toggle */}
              <View className="flex-row justify-center items-center mt-4">
                <Text className="text-gray-600 dark:text-gray-400 text-sm">
                  {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                </Text>
                <TouchableOpacity onPress={toggleMode} disabled={loading}>
                  <Text className="text-blue-500 font-semibold text-sm">
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
UI/UX BIAS FOR FUTURE DESIGN PASS
Clean, minimal, trustworthy. This is the first impression of the app.
Focus on reducing cognitive load - clear CTAs, obvious mode switching.
Accent color on primary buttons creates clear visual hierarchy.
Icon tinting ensures brand consistency across themes.
Consider subtle animations on mode toggle for polish.

SCREEN FUNCTIONALITY:
- Authentication entry point for the Traction app
- Supports email/password sign in and sign up
- Includes Google OAuth sign in option
- Real-time form validation with inline error messages
- Responsive design that works on mobile, tablet, and web
- Theme-aware (light/dark mode support)
- Loading states during authentication
- Automatic redirect when user is authenticated via AccountProvider
*/
