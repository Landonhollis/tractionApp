import { supabase } from './supabaseClient'

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
