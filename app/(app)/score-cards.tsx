import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native'
import {
  getCompanyMetrics,
  getDepartmentalMetrics,
  getIndividualMetrics,
  getUserNames,
  createMetric,
  updateMetric,
  deleteMetric,
  getStatusColor,
  Metric,
  MetricInsert,
  MetricLevel,
  UserName,
} from '../../services/scorecardsService'
import { useAccount } from '../../providers/AccountProvider'

// Types
type EditingMetric = {
  id?: string
  description: string
  level: MetricLevel
  department: string
  owner: string
  owner_id: string
  current_status: string
  min: string
  max: string
}

type LongPressState = {
  visible: boolean
  metric: Metric | null
  x: number
  y: number
}

export default function ScoreCardsScreen() {
  const { session } = useAccount()
  const [companyMetrics, setCompanyMetrics] = useState<Metric[]>([])
  const [departmentalMetrics, setDepartmentalMetrics] = useState<Metric[]>([])
  const [individualMetrics, setIndividualMetrics] = useState<Metric[]>([])
  const [userNames, setUserNames] = useState<UserName[]>([])
  const [loading, setLoading] = useState(true)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [longPressState, setLongPressState] = useState<LongPressState>({
    visible: false,
    metric: null,
    x: 0,
    y: 0,
  })
  const [editingMetric, setEditingMetric] = useState<EditingMetric | null>(null)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)

  // Load data
  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    try {
      setLoading(true)
      const [company, departmental, individual, users] = await Promise.all([
        getCompanyMetrics(),
        getDepartmentalMetrics(),
        getIndividualMetrics(),
        getUserNames(),
      ])
      setCompanyMetrics(company)
      setDepartmentalMetrics(departmental)
      setIndividualMetrics(individual)
      setUserNames(users)
    } catch (error) {
      console.error('Error loading metrics:', error)
      Alert.alert('Error', 'Failed to load metrics')
    } finally {
      setLoading(false)
    }
  }

  // Handle long press start
  const handlePressIn = (metric: Metric, event: any) => {
    const timer = setTimeout(() => {
      const { pageX, pageY } = event.nativeEvent
      setLongPressState({
        visible: true,
        metric,
        x: pageX,
        y: pageY,
      })
    }, 500)
    setLongPressTimer(timer)
  }

  // Handle long press cancel
  const handlePressOut = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
  }

  // Open edit modal with metric
  const handleEdit = (metric: Metric) => {
    setEditingMetric({
      id: metric.id,
      description: metric.description,
      level: metric.level,
      department: metric.department || '',
      owner: metric.owner || '',
      owner_id: metric.owner_id || '',
      current_status: metric.current_status.toString(),
      min: metric.min.toString(),
      max: metric.max.toString(),
    })
    setLongPressState({ visible: false, metric: null, x: 0, y: 0 })
    setEditModalVisible(true)
  }

  // Open edit modal for new metric
  const handleAdd = (level: MetricLevel) => {
    setEditingMetric({
      description: '',
      level,
      department: '',
      owner: '',
      owner_id: '',
      current_status: '',
      min: '',
      max: '',
    })
    setEditModalVisible(true)
  }

  // Save metric (create or update)
  const handleSave = async () => {
    if (!editingMetric || !session?.user?.id) return

    // Validation
    if (!editingMetric.description.trim()) {
      Alert.alert('Error', 'Description is required')
      return
    }
    if (!editingMetric.current_status || !editingMetric.min || !editingMetric.max) {
      Alert.alert('Error', 'Current status, min, and max are required')
      return
    }
    if (editingMetric.level === 'departmental' && !editingMetric.department.trim()) {
      Alert.alert('Error', 'Department is required for departmental metrics')
      return
    }
    if (editingMetric.level === 'individual' && !editingMetric.owner_id) {
      Alert.alert('Error', 'Owner is required for individual metrics')
      return
    }

    try {
      const metricData: MetricInsert = {
        user_id: session.user.id,
        description: editingMetric.description.trim(),
        level: editingMetric.level,
        department: editingMetric.level === 'departmental' ? editingMetric.department.trim() : null,
        owner: editingMetric.level === 'individual' ? editingMetric.owner : null,
        owner_id: editingMetric.level === 'individual' ? editingMetric.owner_id : null,
        current_status: parseFloat(editingMetric.current_status),
        min: parseFloat(editingMetric.min),
        max: parseFloat(editingMetric.max),
      }

      if (editingMetric.id) {
        await updateMetric({ id: editingMetric.id, ...metricData })
      } else {
        await createMetric(metricData)
      }

      setEditModalVisible(false)
      setEditingMetric(null)
      await loadAllData()
    } catch (error) {
      console.error('Error saving metric:', error)
      Alert.alert('Error', 'Failed to save metric')
    }
  }

  // Delete metric
  const handleDelete = (metric: Metric) => {
    setLongPressState({ visible: false, metric: null, x: 0, y: 0 })
    Alert.alert('Delete Metric', 'Are you sure you want to delete this metric?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMetric(metric.id)
            await loadAllData()
          } catch (error) {
            console.error('Error deleting metric:', error)
            Alert.alert('Error', 'Failed to delete metric')
          }
        },
      },
    ])
  }

  // Render metric square
  const renderMetric = (metric: Metric) => {
    const statusColor = getStatusColor(metric.current_status, metric.min, metric.max)
    const bgColor = statusColor === 'green' ? '#4ade80' : '#f87171'

    return (
      <TouchableOpacity
        key={metric.id}
        onPressIn={(e) => handlePressIn(metric, e)}
        onPressOut={handlePressOut}
        style={{
          aspectRatio: 1,
          backgroundColor: bgColor,
          borderRadius: 8,
          padding: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'center', color: '#fff' }}>
          {metric.description}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8, color: '#fff' }}>
          {metric.current_status}
        </Text>
        <Text style={{ fontSize: 10, marginTop: 4, color: '#fff' }}>
          Range: {metric.min} - {metric.max}
        </Text>
      </TouchableOpacity>
    )
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingTop: 80 }}>
        {/* Company Metrics */}
        <CompanyMetricsComponent
          metrics={companyMetrics}
          onAdd={() => handleAdd('company')}
          renderMetric={renderMetric}
        />

        {/* Departmental Metrics */}
        <DepartmentalMetricsComponent
          metrics={departmentalMetrics}
          onAdd={() => handleAdd('departmental')}
          renderMetric={renderMetric}
        />

        {/* Individual Metrics */}
        <IndividualMetricsComponent
          metrics={individualMetrics}
          onAdd={() => handleAdd('individual')}
          renderMetric={renderMetric}
        />
      </ScrollView>

      {/* Long press popup */}
      {longPressState.visible && longPressState.metric && (
        <Modal transparent visible={longPressState.visible} animationType="fade">
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setLongPressState({ visible: false, metric: null, x: 0, y: 0 })}
          >
            <View
              style={{
                position: 'absolute',
                top: longPressState.y,
                left: longPressState.x,
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => handleEdit(longPressState.metric!)}
                style={{ paddingVertical: 12, paddingHorizontal: 16 }}
              >
                <Text style={{ fontSize: 16 }}>Edit</Text>
              </TouchableOpacity>
              <View style={{ height: 1, backgroundColor: '#e5e7eb' }} />
              <TouchableOpacity
                onPress={() => handleDelete(longPressState.metric!)}
                style={{ paddingVertical: 12, paddingHorizontal: 16 }}
              >
                <Text style={{ fontSize: 16, color: '#ef4444' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      )}

      {/* Edit modal */}
      {editModalVisible && editingMetric && (
        <Modal transparent visible={editModalVisible} animationType="fade">
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              setEditModalVisible(false)
              setEditingMetric(null)
            }}
          >
            <Pressable
              onPress={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 24,
                width: '90%',
                maxWidth: 400,
                maxHeight: '80%',
              }}
            >
              <ScrollView>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
                  {editingMetric.id ? 'Edit Metric' : 'New Metric'}
                </Text>

                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4 }}>Description</Text>
                <TextInput
                  value={editingMetric.description}
                  onChangeText={(text) => setEditingMetric({ ...editingMetric, description: text })}
                  style={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 16,
                    fontSize: 16,
                  }}
                  placeholder="What are you measuring?"
                />

                {editingMetric.level === 'departmental' && (
                  <>
                    <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4 }}>Department</Text>
                    <TextInput
                      value={editingMetric.department}
                      onChangeText={(text) => setEditingMetric({ ...editingMetric, department: text })}
                      style={{
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        padding: 12,
                        marginBottom: 16,
                        fontSize: 16,
                      }}
                      placeholder="Department name"
                    />
                  </>
                )}

                {editingMetric.level === 'individual' && (
                  <>
                    <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4 }}>Owner</Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        marginBottom: 16,
                      }}
                    >
                      <ScrollView style={{ maxHeight: 150 }}>
                        {userNames.map((user) => (
                          <TouchableOpacity
                            key={user.id}
                            onPress={() =>
                              setEditingMetric({
                                ...editingMetric,
                                owner: user.name,
                                owner_id: user.id,
                              })
                            }
                            style={{
                              padding: 12,
                              backgroundColor: editingMetric.owner_id === user.id ? '#e5e7eb' : '#fff',
                            }}
                          >
                            <Text style={{ fontSize: 16 }}>{user.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </>
                )}

                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4 }}>Current Status</Text>
                <TextInput
                  value={editingMetric.current_status}
                  onChangeText={(text) => setEditingMetric({ ...editingMetric, current_status: text })}
                  style={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 16,
                    fontSize: 16,
                  }}
                  placeholder="Current value"
                  keyboardType="numeric"
                />

                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4 }}>Min (Green Range)</Text>
                <TextInput
                  value={editingMetric.min}
                  onChangeText={(text) => setEditingMetric({ ...editingMetric, min: text })}
                  style={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 16,
                    fontSize: 16,
                  }}
                  placeholder="Minimum acceptable value"
                  keyboardType="numeric"
                />

                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4 }}>Max (Green Range)</Text>
                <TextInput
                  value={editingMetric.max}
                  onChangeText={(text) => setEditingMetric({ ...editingMetric, max: text })}
                  style={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 24,
                    fontSize: 16,
                  }}
                  placeholder="Maximum acceptable value"
                  keyboardType="numeric"
                />

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setEditModalVisible(false)
                      setEditingMetric(null)
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#e5e7eb',
                      padding: 14,
                      borderRadius: 8,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSave}
                    style={{
                      flex: 1,
                      backgroundColor: '#000',
                      padding: 14,
                      borderRadius: 8,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Done</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  )
}

// Company Metrics Component
function CompanyMetricsComponent({
  metrics,
  onAdd,
  renderMetric,
}: {
  metrics: Metric[]
  onAdd: () => void
  renderMetric: (metric: Metric) => JSX.Element
}) {
  const { width } = useWindowDimensions()
  const numColumns = width > 768 ? 4 : width > 480 ? 3 : 2
  const gap = 12

  return (
    <View style={{ backgroundColor: '#e5e7eb', borderRadius: 12, padding: 16, marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Company Metrics</Text>
        <TouchableOpacity
          onPress={onAdd}
          style={{
            backgroundColor: '#000',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Add</Text>
        </TouchableOpacity>
      </View>

      {metrics.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#6b7280', paddingVertical: 20 }}>
          No company metrics yet
        </Text>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap,
          }}
        >
          {metrics.map((metric) => (
            <View key={metric.id} style={{ width: `${(100 - gap * (numColumns - 1)) / numColumns}%` }}>
              {renderMetric(metric)}
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

// Departmental Metrics Component
function DepartmentalMetricsComponent({
  metrics,
  onAdd,
  renderMetric,
}: {
  metrics: Metric[]
  onAdd: () => void
  renderMetric: (metric: Metric) => JSX.Element
}) {
  const { width } = useWindowDimensions()
  const numColumns = width > 768 ? 4 : width > 480 ? 3 : 2
  const gap = 12

  // Group by department
  const departmentGroups = metrics.reduce((acc, metric) => {
    const dept = metric.department || 'Unknown'
    if (!acc[dept]) acc[dept] = []
    acc[dept].push(metric)
    return acc
  }, {} as Record<string, Metric[]>)

  return (
    <View style={{ backgroundColor: '#d1d5db', borderRadius: 12, padding: 16, marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Departmental Metrics</Text>
        <TouchableOpacity
          onPress={onAdd}
          style={{
            backgroundColor: '#000',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Add</Text>
        </TouchableOpacity>
      </View>

      {metrics.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#6b7280', paddingVertical: 20 }}>
          No departmental metrics yet
        </Text>
      ) : (
        Object.entries(departmentGroups).map(([department, deptMetrics]) => (
          <View key={department} style={{ backgroundColor: '#e5e7eb', borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>{department}</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap,
              }}
            >
              {deptMetrics.map((metric) => (
                <View key={metric.id} style={{ width: `${(100 - gap * (numColumns - 1)) / numColumns}%` }}>
                  {renderMetric(metric)}
                </View>
              ))}
            </View>
          </View>
        ))
      )}
    </View>
  )
}

// Individual Metrics Component
function IndividualMetricsComponent({
  metrics,
  onAdd,
  renderMetric,
}: {
  metrics: Metric[]
  onAdd: () => void
  renderMetric: (metric: Metric) => JSX.Element
}) {
  const { width } = useWindowDimensions()
  const numColumns = width > 768 ? 4 : width > 480 ? 3 : 2
  const gap = 12

  // Group by owner
  const ownerGroups = metrics.reduce((acc, metric) => {
    const owner = metric.owner || 'Unknown'
    if (!acc[owner]) acc[owner] = []
    acc[owner].push(metric)
    return acc
  }, {} as Record<string, Metric[]>)

  return (
    <View style={{ backgroundColor: '#d1d5db', borderRadius: 12, padding: 16, marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Individual Metrics</Text>
        <TouchableOpacity
          onPress={onAdd}
          style={{
            backgroundColor: '#000',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Add</Text>
        </TouchableOpacity>
      </View>

      {metrics.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#6b7280', paddingVertical: 20 }}>
          No individual metrics yet
        </Text>
      ) : (
        Object.entries(ownerGroups).map(([owner, ownerMetrics]) => (
          <View key={owner} style={{ backgroundColor: '#e5e7eb', borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>{owner}</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap,
              }}
            >
              {ownerMetrics.map((metric) => (
                <View key={metric.id} style={{ width: `${(100 - gap * (numColumns - 1)) / numColumns}%` }}>
                  {renderMetric(metric)}
                </View>
              ))}
            </View>
          </View>
        ))
      )}
    </View>
  )
}

/*
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Clean, structured, data-driven with immediate visual feedback.
The three-layer background color system is critical - creates clear visual grouping (same as Rocks).
Square metrics are distinctive and scannable - matches Rocks screen pattern.
Green/red status indicators are the hero - must be immediately visible and unmistakable.
Grid layout should feel organized and allow quick scanning for red (problem) metrics.
Company metrics stand out with one less layer - appropriate given their importance.
Department and user name headers create clear organization.
This is daily tracking interface - prioritize speed of status updates above all.
Edit popup should optimize for quick current_status changes.
Consider larger touch targets for frequently-updated values.
Status colors should be accessible (not just red/green for colorblind users).
-->
*/
