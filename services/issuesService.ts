import { supabase } from './supabaseClient'

// Issue record type
export type Issue = {
  id: string
  user_id: string
  title: string
  level: 'quarterly' | 'company' | 'departmental'
  department: string | null
  status: 'open' | 'in_progress' | 'resolved'
  priority: number
  created_at: string
  updated_at: string
}

// Issue input type for creation/update
export type IssueInput = {
  title: string
  level: 'quarterly' | 'company' | 'departmental'
  department?: string | null
  status?: 'open' | 'in_progress' | 'resolved'
  priority?: number
}

/**
 * Fetches all issues for the user, ordered by created_at DESC
 */
export const getIssues = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('issues')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching issues:', error)
      return { success: false, error }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Unexpected error in getIssues:', error)
    return { success: false, error }
  }
}

/**
 * Creates a new issue
 */
export const createIssue = async (userId: string, input: IssueInput) => {
  try {
    const { data, error } = await supabase
      .from('issues')
      .insert({
        user_id: userId,
        title: input.title,
        level: input.level,
        department: input.department || null,
        status: input.status || 'open',
        priority: input.priority || 0,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating issue:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in createIssue:', error)
    return { success: false, error }
  }
}

/**
 * Updates an issue
 */
export const updateIssue = async (issueId: string, input: Partial<IssueInput>) => {
  try {
    const updateData: any = {}

    if (input.title !== undefined) updateData.title = input.title
    if (input.level !== undefined) updateData.level = input.level
    if (input.department !== undefined) updateData.department = input.department || null
    if (input.status !== undefined) updateData.status = input.status
    if (input.priority !== undefined) updateData.priority = input.priority

    const { data, error } = await supabase
      .from('issues')
      .update(updateData)
      .eq('id', issueId)
      .select()
      .single()

    if (error) {
      console.error('Error updating issue:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error in updateIssue:', error)
    return { success: false, error }
  }
}

/**
 * Deletes an issue by id
 */
export const deleteIssue = async (issueId: string) => {
  try {
    const { error } = await supabase
      .from('issues')
      .delete()
      .eq('id', issueId)

    if (error) {
      console.error('Error deleting issue:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error in deleteIssue:', error)
    return { success: false, error }
  }
}
