import { supabase } from './supabaseClient'

/**
 * Fetches the current user's account data from the accounts table
 */
export const getAccountData = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user?.id) {
      console.log('No active session found')
      return null
    }

    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (error) {
      console.error('Error fetching account data:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error in getAccountData:', error)
    return null
  }
}

/**
 * Updates the theme name for the current user
 */
export const updateThemeName = async (themeName: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user?.id) {
      console.log('No active session found')
      return { success: false, error: 'No active session' }
    }

    const { error } = await supabase
      .from('accounts')
      .update({ theme_name: themeName, updated_at: new Date().toISOString() })
      .eq('user_id', session.user.id)

    if (error) {
      console.error('Error updating theme name:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error in updateThemeName:', error)
    return { success: false, error }
  }
}
