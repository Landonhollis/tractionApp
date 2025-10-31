import { supabase } from './supabaseClient'

// Process record type
export type Process = {
  id: string
  user_id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

// Process input type for creation/update
export type ProcessInput = {
  name: string
  description: string
}

/**
 * Fetches all processes for the user (ordered by created_at DESC)
 */
export const getProcesses = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('processes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching processes:', error)
      return { success: false, error }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Unexpected error in getProcesses:', error)
    return { success: false, error }
  }
}

/**
 * Creates a new process with empty/default values
 */
export const createProcess = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('processes')
      .insert({
        user_id: userId,
        name: '',
        description: '',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating process:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in createProcess:', error)
    return { success: false, error }
  }
}

/**
 * Updates a process
 */
export const updateProcess = async (
  processId: string,
  input: ProcessInput
) => {
  try {
    const { data, error } = await supabase
      .from('processes')
      .update({
        name: input.name,
        description: input.description,
      })
      .eq('id', processId)
      .select()
      .single()

    if (error) {
      console.error('Error updating process:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in updateProcess:', error)
    return { success: false, error }
  }
}

/**
 * Deletes a process by id
 */
export const deleteProcess = async (processId: string) => {
  try {
    const { error } = await supabase
      .from('processes')
      .delete()
      .eq('id', processId)

    if (error) {
      console.error('Error deleting process:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error in deleteProcess:', error)
    return { success: false, error }
  }
}
