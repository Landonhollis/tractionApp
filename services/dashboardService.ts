import { supabase } from './supabaseClient'

// Types
export type DashboardRock = {
  id: string
  description: string
}

export type DashboardIssue = {
  id: string
  title: string
  description: string | null
}

export type DashboardMetric = {
  id: string
  description: string
  level: string
  current_status: number
  min: number
  max: number
  department: string | null
}

export type DashboardProcess = {
  id: string
  title: string
  description: string
}

// Fetch personal rocks (individual level rocks for current user)
export async function getPersonalRocks(userId: string): Promise<DashboardRock[]> {
  const { data, error } = await supabase
    .from('rocks')
    .select('id, title')
    .eq('level', 'individual')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching personal rocks:', error)
    throw error
  }

  // Map title to description for consistency with SRD
  return (data || []).map((rock) => ({
    id: rock.id,
    description: rock.title,
  }))
}

// Fetch department issues
export async function getDepartmentIssues(): Promise<DashboardIssue[]> {
  const { data, error } = await supabase
    .from('issues')
    .select('id, title')
    .eq('level', 'departmental')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching department issues:', error)
    throw error
  }

  // Map to include description (null for now, can be added to schema later)
  return (data || []).map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: null,
  }))
}

// Fetch company issues
export async function getCompanyIssues(): Promise<DashboardIssue[]> {
  const { data, error } = await supabase
    .from('issues')
    .select('id, title')
    .eq('level', 'company')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching company issues:', error)
    throw error
  }

  return (data || []).map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: null,
  }))
}

// Fetch personal measurables (individual level metrics for current user)
export async function getPersonalMeasurables(userId: string): Promise<DashboardMetric[]> {
  const { data, error } = await supabase
    .from('metrics')
    .select('id, description, level, current_status, min, max, department')
    .eq('level', 'individual')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching personal measurables:', error)
    throw error
  }

  return data || []
}

// Fetch departmental measurables
export async function getDepartmentalMeasurables(): Promise<DashboardMetric[]> {
  const { data, error } = await supabase
    .from('metrics')
    .select('id, description, level, current_status, min, max, department')
    .eq('level', 'departmental')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching departmental measurables:', error)
    throw error
  }

  return data || []
}

// Fetch company measurables
export async function getCompanyMeasurables(): Promise<DashboardMetric[]> {
  const { data, error } = await supabase
    .from('metrics')
    .select('id, description, level, current_status, min, max, department')
    .eq('level', 'company')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching company measurables:', error)
    throw error
  }

  return data || []
}

// Fetch individual processes for current user
export async function getIndividualProcesses(userId: string): Promise<DashboardProcess[]> {
  const { data, error } = await supabase
    .from('processes')
    .select('id, name, description')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching individual processes:', error)
    throw error
  }

  // Map name to title for consistency
  return (data || []).map((process) => ({
    id: process.id,
    title: process.name,
    description: process.description,
  }))
}

// Helper to determine if metric is in range (green) or out of range (red)
export function isMetricInRange(metric: DashboardMetric): boolean {
  return metric.current_status >= metric.min && metric.current_status <= metric.max
}

// Fetch all dashboard data in parallel
export async function getAllDashboardData(userId: string) {
  try {
    const [
      personalRocks,
      departmentIssues,
      companyIssues,
      personalMeasurables,
      departmentalMeasurables,
      companyMeasurables,
      individualProcesses,
    ] = await Promise.all([
      getPersonalRocks(userId),
      getDepartmentIssues(),
      getCompanyIssues(),
      getPersonalMeasurables(userId),
      getDepartmentalMeasurables(),
      getCompanyMeasurables(),
      getIndividualProcesses(userId),
    ])

    return {
      personalRocks,
      departmentIssues,
      companyIssues,
      personalMeasurables,
      departmentalMeasurables,
      companyMeasurables,
      individualProcesses,
    }
  } catch (error) {
    console.error('Error fetching all dashboard data:', error)
    throw error
  }
}
