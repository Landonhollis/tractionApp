import { supabase } from './supabaseClient'
import { updateThemeName } from './accountProviderServices'
import { getAccountData } from './accountProviderServices'

// User name record type
export type UserNameRecord = {
  id: string
  user_id: string
  name: string
  created_at: string
  updated_at: string
}

/**
 * Fetches the user's name from the user_names table
 */
export const getUserName = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_names')
      .select('*')
      .eq('user_id', userId)
      .limit(1)
      .single()

    if (error) {
      // No record exists yet - this is expected for new users
      if (error.code === 'PGRST116') {
        return { success: true, data: null }
      }
      console.error('Error fetching user name:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in getUserName:', error)
    return { success: false, error: 'Failed to fetch user name' }
  }
}

/**
 * Updates the user's name in the user_names table
 * Creates a new record if one doesn't exist (upsert)
 */
export const updateUserName = async (userId: string, name: string) => {
  try {
    const { data, error } = await supabase
      .from('user_names')
      .upsert(
        {
          user_id: userId,
          name: name,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id',
        }
      )
      .select()
      .single()

    if (error) {
      console.error('Error updating user name:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in updateUserName:', error)
    return { success: false, error: 'Failed to update user name' }
  }
}

/**
 * Cycles through themes: theme1 -> theme2 -> theme3 -> theme4 -> theme1
 */
export const cycleTheme = async () => {
  try {
    // Get current account data
    const accountData = await getAccountData()

    if (!accountData) {
      console.error('No account data found')
      return { success: false, error: 'No account data found' }
    }

    // Determine the next theme
    const currentTheme = accountData.theme_name
    let nextTheme: string

    switch (currentTheme) {
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
        // If no theme is set or unknown theme, default to theme1
        nextTheme = 'theme1'
    }

    // Update the theme
    const result = await updateThemeName(nextTheme)

    if (result.success) {
      return { success: true, newTheme: nextTheme }
    } else {
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error('Unexpected error in cycleTheme:', error)
    return { success: false, error: 'Failed to cycle theme' }
  }
}
