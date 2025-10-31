import { supabase } from './supabaseClient'

// VTO section type for updates
export type VtoSection = {
  columnName: string
  value: string
}

// VTO record type
export type VtoRecord = {
  id: string
  user_id: string
  core_values: string | null
  core_focus: string | null
  ten_year_target: string | null
  marketing_strategy: string | null
  three_year_picture: string | null
  one_year_plan: string | null
  quarterly_rocks: string | null
  issues_list: string | null
  created_at: string
  updated_at: string
}

/**
 * Fetches the user's VTO record (first record only)
 */
export const getVto = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('vto')
      .select('*')
      .eq('user_id', userId)
      .limit(1)
      .single()

    if (error) {
      // No VTO record exists yet - this is expected for new users
      if (error.code === 'PGRST116') {
        return { success: true, data: null }
      }
      console.error('Error fetching VTO:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in getVto:', error)
    return { success: false, error }
  }
}

/**
 * Creates a new VTO record for the user
 */
export const createVto = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('vto')
      .insert({
        user_id: userId,
        core_values: '',
        core_focus: '',
        ten_year_target: '',
        marketing_strategy: '',
        three_year_picture: '',
        one_year_plan: '',
        quarterly_rocks: '',
        issues_list: '',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating VTO:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in createVto:', error)
    return { success: false, error }
  }
}

/**
 * Updates a specific section of the VTO
 */
export const updateVtoSection = async (
  vtoId: string,
  columnName: string,
  value: string
) => {
  try {
    const { data, error } = await supabase
      .from('vto')
      .update({ [columnName]: value })
      .eq('id', vtoId)
      .select()
      .single()

    if (error) {
      console.error('Error updating VTO section:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in updateVtoSection:', error)
    return { success: false, error }
  }
}

/**
 * Format column name for display
 * e.g., "core_values" -> "Core Values"
 */
export const formatSectionTitle = (columnName: string): string => {
  return columnName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Get ordered list of VTO section column names
 * (excludes system fields like id, user_id, timestamps)
 */
export const getVtoSectionColumns = (): string[] => {
  return [
    'core_values',
    'core_focus',
    'ten_year_target',
    'marketing_strategy',
    'three_year_picture',
    'one_year_plan',
    'quarterly_rocks',
    'issues_list',
  ]
}
