import { supabase } from './supabaseClient'
import { dataHistoryService } from './dataHistoryService'

// Types
export type MetricLevel = 'company' | 'departmental' | 'individual'

export type Metric = {
  id: string
  user_id: string
  description: string
  level: MetricLevel
  department: string | null
  owner: string | null
  owner_id: string | null
  current_status: number
  min: number
  max: number
  created_at: string
  updated_at: string
}

export type MetricInsert = Omit<Metric, 'id' | 'created_at' | 'updated_at'>
export type MetricUpdate = Partial<MetricInsert> & { id: string }

export type UserName = {
  id: string
  user_id: string
  name: string
  created_at: string
  updated_at: string
}

// Fetch all metrics for the current user
export async function getMetrics(): Promise<Metric[]> {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching metrics:', error)
    throw error
  }

  return data || []
}

// Fetch company-level metrics
export async function getCompanyMetrics(): Promise<Metric[]> {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .eq('level', 'company')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching company metrics:', error)
    throw error
  }

  return data || []
}

// Fetch departmental metrics
export async function getDepartmentalMetrics(): Promise<Metric[]> {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .eq('level', 'departmental')
    .order('department', { ascending: true })

  if (error) {
    console.error('Error fetching departmental metrics:', error)
    throw error
  }

  return data || []
}

// Fetch individual metrics with user names
export async function getIndividualMetrics(): Promise<Metric[]> {
  const { data, error } = await supabase
    .from('metrics')
    .select(`
      *,
      user_names!metrics_owner_id_fkey (
        name
      )
    `)
    .eq('level', 'individual')
    .order('owner', { ascending: true })

  if (error) {
    console.error('Error fetching individual metrics:', error)
    throw error
  }

  return data || []
}

// Fetch all user names for individual metric owner dropdown
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

// Create a new metric
export async function createMetric(metric: MetricInsert): Promise<Metric> {
  const { data, error } = await supabase
    .from('metrics')
    .insert(metric)
    .select()
    .single()

  if (error) {
    console.error('Error creating metric:', error)
    throw error
  }

  // Create initial history snapshot
  try {
    await dataHistoryService.createHistorySnapshot(
      data.user_id,
      data.id,
      data.current_status,
      data.min,
      data.max
    )
  } catch (historyError) {
    console.error('Error creating initial history snapshot:', historyError)
    // Don't throw - history creation failure shouldn't block metric creation
  }

  return data
}

// Update an existing metric
export async function updateMetric(metric: MetricUpdate): Promise<Metric> {
  const { id, ...updates } = metric

  const { data, error } = await supabase
    .from('metrics')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating metric:', error)
    throw error
  }

  // Create history snapshot if current_status, min, or max changed
  if (
    updates.current_status !== undefined ||
    updates.min !== undefined ||
    updates.max !== undefined
  ) {
    try {
      await dataHistoryService.createHistorySnapshot(
        data.user_id,
        data.id,
        data.current_status,
        data.min,
        data.max
      )
    } catch (historyError) {
      console.error('Error creating history snapshot:', historyError)
      // Don't throw - history creation failure shouldn't block metric update
    }
  }

  return data
}

// Delete a metric
export async function deleteMetric(id: string): Promise<void> {
  const { error } = await supabase
    .from('metrics')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting metric:', error)
    throw error
  }
}

// Calculate status color based on min/max range
export function getStatusColor(current: number, min: number, max: number): 'green' | 'red' {
  return current >= min && current <= max ? 'green' : 'red'
}
