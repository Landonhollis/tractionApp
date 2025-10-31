import { supabase } from './supabaseClient'

// Types
export type RockLevel = 'company' | 'departmental' | 'individual'

export type Rock = {
  id: string
  user_id: string
  title: string
  level: RockLevel
  department: string | null
  owner: string | null
  owner_id: string | null
  created_at: string
  updated_at: string
}

export type RockInsert = Omit<Rock, 'id' | 'created_at' | 'updated_at'>
export type RockUpdate = Partial<RockInsert> & { id: string }

export type UserName = {
  id: string
  user_id: string
  name: string
  created_at: string
  updated_at: string
}

// Fetch all rocks for the current user
export async function getRocks(): Promise<Rock[]> {
  const { data, error } = await supabase
    .from('rocks')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching rocks:', error)
    throw error
  }

  return data || []
}

// Fetch company-level rocks
export async function getCompanyRocks(): Promise<Rock[]> {
  const { data, error } = await supabase
    .from('rocks')
    .select('*')
    .eq('level', 'company')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching company rocks:', error)
    throw error
  }

  return data || []
}

// Fetch departmental rocks
export async function getDepartmentalRocks(): Promise<Rock[]> {
  const { data, error } = await supabase
    .from('rocks')
    .select('*')
    .eq('level', 'departmental')
    .order('department', { ascending: true })

  if (error) {
    console.error('Error fetching departmental rocks:', error)
    throw error
  }

  return data || []
}

// Fetch individual rocks with user names
export async function getIndividualRocks(): Promise<Rock[]> {
  const { data, error } = await supabase
    .from('rocks')
    .select(`
      *,
      user_names!rocks_owner_id_fkey (
        name
      )
    `)
    .eq('level', 'individual')
    .order('owner', { ascending: true })

  if (error) {
    console.error('Error fetching individual rocks:', error)
    throw error
  }

  return data || []
}

// Fetch all user names for individual rock owner dropdown
export async function getUserNames(): Promise<UserName[]> {
  const { data, error } = await supabase
    .from('user_names')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching user names:', error)
    throw error
  }

  return data || []
}

// Create a new rock
export async function createRock(rock: RockInsert): Promise<Rock> {
  const { data, error } = await supabase
    .from('rocks')
    .insert(rock)
    .select()
    .single()

  if (error) {
    console.error('Error creating rock:', error)
    throw error
  }

  return data
}

// Update an existing rock
export async function updateRock(rock: RockUpdate): Promise<Rock> {
  const { id, ...updates } = rock

  const { data, error } = await supabase
    .from('rocks')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating rock:', error)
    throw error
  }

  return data
}

// Delete a rock
export async function deleteRock(id: string): Promise<void> {
  const { error } = await supabase
    .from('rocks')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting rock:', error)
    throw error
  }
}
