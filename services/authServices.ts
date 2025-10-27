import { supabase } from './supabaseClient'

/**
 * Signs up a new user with email and password
 */
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error('Error signing up:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in signUpWithEmail:', error)
    return { success: false, error }
  }
}

/**
 * Signs in an existing user with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Error signing in:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in signInWithEmail:', error)
    return { success: false, error }
  }
}

/**
 * Signs in with Google OAuth
 * Note: This requires additional setup in Supabase dashboard
 */
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      console.error('Error signing in with Google:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in signInWithGoogle:', error)
    return { success: false, error }
  }
}

/**
 * Creates a user account record in the accounts table
 * Called when a new user signs up or when checking if account exists
 */
export const createUserAccount = async (userId: string) => {
  try {
    // First check if account already exists
    const { data: existingAccount, error: checkError } = await supabase
      .from('accounts')
      .select('id')
      .eq('user_id', userId)
      .single()

    // If account exists, return early
    if (existingAccount) {
      return { success: true, message: 'Account already exists' }
    }

    // If no account exists (and error is not just "no rows"), create one
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking for existing account:', checkError)
      return { success: false, error: checkError }
    }

    // Create new account
    const { data, error } = await supabase
      .from('accounts')
      .insert([{ user_id: userId, theme_name: null }])
      .select()
      .single()

    if (error) {
      console.error('Error creating user account:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in createUserAccount:', error)
    return { success: false, error }
  }
}

/**
 * Signs out the current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
      return { success: false, error }
    }
    return { success: true }
  } catch (error) {
    console.error('Unexpected error in signOut:', error)
    return { success: false, error }
  }
}

/**
 * Requests a password reset email
 */
export const requestPasswordReset = async (email: string, redirectTo?: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || undefined,
    })
    if (error) {
      console.error('Error requesting password reset:', error)
      return { success: false, error }
    }
    return { success: true }
  } catch (error) {
    console.error('Unexpected error in requestPasswordReset:', error)
    return { success: false, error }
  }
}

/**
 * Updates the authenticated user's password
 */
export const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    if (error) {
      console.error('Error updating password:', error)
      return { success: false, error }
    }
    return { success: true }
  } catch (error) {
    console.error('Unexpected error in updatePassword:', error)
    return { success: false, error }
  }
}

/**
 * Gets the current session
 */
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error getting session:', error)
      return { success: false, error }
    }
    return { success: true, session: data.session }
  } catch (error) {
    console.error('Unexpected error in getSession:', error)
    return { success: false, error }
  }
}

/**
 * Gets the current user
 */
export const getUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error getting user:', error)
      return { success: false, error }
    }
    return { success: true, user: data.user }
  } catch (error) {
    console.error('Unexpected error in getUser:', error)
    return { success: false, error }
  }
}
