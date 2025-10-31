import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
  Alert,
} from 'react-native'
import { useAuth } from '../contexts/AccountProvider'
import {
  getAllDashboardData,
  DashboardRock,
  DashboardIssue,
  DashboardMetric,
  DashboardProcess,
  isMetricInRange,
} from '../services/dashboardService'

// Types
type DashboardData = {
  personalRocks: DashboardRock[]
  departmentIssues: DashboardIssue[]
  companyIssues: DashboardIssue[]
  personalMeasurables: DashboardMetric[]
  departmentalMeasurables: DashboardMetric[]
  companyMeasurables: DashboardMetric[]
  individualProcesses: DashboardProcess[]
}

export default function DashboardScreen() {
  const { user } = useAuth()
  const { width } = useWindowDimensions()

  // State
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)

  // Load data
  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    if (!user) return

    try {
      setLoading(true)
      const dashboardData = await getAllDashboardData(user.id)
      setData(dashboardData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      Alert.alert('Error', 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // Error state
  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <Text style={{ fontSize: 16, color: '#666' }}>Failed to load dashboard data</Text>
      </View>
    )
  }

  // Determine grid layout based on screen width
  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024
  const isDesktop = width >= 1024

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {/* Personal Items Section (Top Priority) */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Personal</Text>
          <View
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <View style={{ flex: isMobile ? 1 : 1, minWidth: isMobile ? '100%' : 300 }}>
              <PersonalRocksCard rocks={data.personalRocks} />
            </View>
            <View style={{ flex: isMobile ? 1 : 1, minWidth: isMobile ? '100%' : 300 }}>
              <PersonalMeasurablesCard metrics={data.personalMeasurables} />
            </View>
            <View style={{ flex: isMobile ? 1 : 1, minWidth: isMobile ? '100%' : 300 }}>
              <IndividualProcessesCard processes={data.individualProcesses} />
            </View>
          </View>
        </View>

        {/* Departmental Items Section */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Departmental</Text>
          <View
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <View style={{ flex: isMobile ? 1 : 1, minWidth: isMobile ? '100%' : 300 }}>
              <DepartmentIssuesCard issues={data.departmentIssues} />
            </View>
            <View style={{ flex: isMobile ? 1 : 1, minWidth: isMobile ? '100%' : 300 }}>
              <DepartmentalMeasurablesCard metrics={data.departmentalMeasurables} />
            </View>
          </View>
        </View>

        {/* Company Items Section */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Company</Text>
          <View
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <View style={{ flex: isMobile ? 1 : 1, minWidth: isMobile ? '100%' : 300 }}>
              <CompanyIssuesCard issues={data.companyIssues} />
            </View>
            <View style={{ flex: isMobile ? 1 : 1, minWidth: isMobile ? '100%' : 300 }}>
              <CompanyMeasurablesCard metrics={data.companyMeasurables} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

// Personal Rocks Card
type PersonalRocksCardProps = {
  rocks: DashboardRock[]
}

function PersonalRocksCard({ rocks }: PersonalRocksCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Personal Rocks</Text>
      <ScrollView style={{ maxHeight: 300 }}>
        {rocks.length === 0 ? (
          <Text style={{ color: '#999', fontStyle: 'italic' }}>No personal rocks</Text>
        ) : (
          rocks.map((rock, index) => (
            <View key={rock.id} style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 14 }} numberOfLines={10}>
                {rock.description}
              </Text>
              {index < rocks.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 8 }} />
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

// Department Issues Card
type DepartmentIssuesCardProps = {
  issues: DashboardIssue[]
}

function DepartmentIssuesCard({ issues }: DepartmentIssuesCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Department Issues</Text>
      <ScrollView style={{ maxHeight: 300 }}>
        {issues.length === 0 ? (
          <Text style={{ color: '#999', fontStyle: 'italic' }}>No department issues</Text>
        ) : (
          issues.map((issue, index) => (
            <View key={issue.id} style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }} numberOfLines={10}>
                {issue.title}
              </Text>
              {issue.description && (
                <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }} numberOfLines={10}>
                  {issue.description}
                </Text>
              )}
              {index < issues.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 8 }} />
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

// Company Issues Card
type CompanyIssuesCardProps = {
  issues: DashboardIssue[]
}

function CompanyIssuesCard({ issues }: CompanyIssuesCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Company Issues</Text>
      <ScrollView style={{ maxHeight: 300 }}>
        {issues.length === 0 ? (
          <Text style={{ color: '#999', fontStyle: 'italic' }}>No company issues</Text>
        ) : (
          issues.map((issue, index) => (
            <View key={issue.id} style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }} numberOfLines={10}>
                {issue.title}
              </Text>
              {issue.description && (
                <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }} numberOfLines={10}>
                  {issue.description}
                </Text>
              )}
              {index < issues.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 8 }} />
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

// Personal Measurables Card
type PersonalMeasurablesCardProps = {
  metrics: DashboardMetric[]
}

function PersonalMeasurablesCard({ metrics }: PersonalMeasurablesCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Personal Measurables</Text>
      <ScrollView style={{ maxHeight: 300 }}>
        {metrics.length === 0 ? (
          <Text style={{ color: '#999', fontStyle: 'italic' }}>No personal measurables</Text>
        ) : (
          metrics.map((metric, index) => (
            <View key={metric.id} style={{ marginBottom: 8 }}>
              <View
                style={{
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: isMetricInRange(metric) ? '#d4edda' : '#f8d7da',
                }}
              >
                <Text style={{ fontSize: 14 }} numberOfLines={10}>
                  {metric.description}
                </Text>
                <Text style={{ fontSize: 12, marginTop: 4, color: '#666' }}>
                  Current: {metric.current_status} (Range: {metric.min} - {metric.max})
                </Text>
              </View>
              {index < metrics.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 8 }} />
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

// Departmental Measurables Card
type DepartmentalMeasurablesCardProps = {
  metrics: DashboardMetric[]
}

function DepartmentalMeasurablesCard({ metrics }: DepartmentalMeasurablesCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Departmental Measurables</Text>
      <ScrollView style={{ maxHeight: 300 }}>
        {metrics.length === 0 ? (
          <Text style={{ color: '#999', fontStyle: 'italic' }}>No departmental measurables</Text>
        ) : (
          metrics.map((metric, index) => (
            <View key={metric.id} style={{ marginBottom: 8 }}>
              <View
                style={{
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: isMetricInRange(metric) ? '#d4edda' : '#f8d7da',
                }}
              >
                <Text style={{ fontSize: 14 }} numberOfLines={10}>
                  {metric.description}
                </Text>
                {metric.department && (
                  <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                    Department: {metric.department}
                  </Text>
                )}
                <Text style={{ fontSize: 12, marginTop: 4, color: '#666' }}>
                  Current: {metric.current_status} (Range: {metric.min} - {metric.max})
                </Text>
              </View>
              {index < metrics.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 8 }} />
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

// Company Measurables Card
type CompanyMeasurablesCardProps = {
  metrics: DashboardMetric[]
}

function CompanyMeasurablesCard({ metrics }: CompanyMeasurablesCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Company Measurables</Text>
      <ScrollView style={{ maxHeight: 300 }}>
        {metrics.length === 0 ? (
          <Text style={{ color: '#999', fontStyle: 'italic' }}>No company measurables</Text>
        ) : (
          metrics.map((metric, index) => (
            <View key={metric.id} style={{ marginBottom: 8 }}>
              <View
                style={{
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: isMetricInRange(metric) ? '#d4edda' : '#f8d7da',
                }}
              >
                <Text style={{ fontSize: 14 }} numberOfLines={10}>
                  {metric.description}
                </Text>
                <Text style={{ fontSize: 12, marginTop: 4, color: '#666' }}>
                  Current: {metric.current_status} (Range: {metric.min} - {metric.max})
                </Text>
              </View>
              {index < metrics.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 8 }} />
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

// Individual Processes Card
type IndividualProcessesCardProps = {
  processes: DashboardProcess[]
}

function IndividualProcessesCard({ processes }: IndividualProcessesCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Individual Processes</Text>
      <ScrollView style={{ maxHeight: 300 }}>
        {processes.length === 0 ? (
          <Text style={{ color: '#999', fontStyle: 'italic' }}>No individual processes</Text>
        ) : (
          processes.map((process, index) => (
            <View key={process.id} style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }} numberOfLines={10}>
                {process.title}
              </Text>
              <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }} numberOfLines={10}>
                {process.description}
              </Text>
              {index < processes.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 8 }} />
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

/*
UI/UX BIAS FOR FUTURE DESIGN PASS
Clean, data-focused dashboard with minimal decoration. Cards should feel organized and scannable. Floating card aesthetic suggests modular information blocks. Color coding (green/red for metrics, differentiated levels) serves functional purpose of quick status assessment. Typography hierarchy (larger titles, smaller descriptions) aids scanning. Thin divider lines maintain separation without visual weight. Overall: professional, efficient, information-dense but not overwhelming.
*/
