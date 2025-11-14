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
import { useAccount } from '../../providers/AccountProvider'
import {
  Rock,
  RockLevel,
  UserName,
  getCompanyRocks,
  getDepartmentalRocks,
  getIndividualRocks,
  getUserNames,
  createRock,
  updateRock,
  deleteRock,
} from '../../services/rocksService'

// Types for the component
type EditingRock = {
  id?: string
  title: string
  level: RockLevel
  department?: string
  owner?: string
  owner_id?: string
}

type LongPressMenuState = {
  visible: boolean
  rock: Rock | null
}

type EditModalState = {
  visible: boolean
  rock: EditingRock | null
  isNew: boolean
}

export default function RocksScreen() {
  // Auth context
  const { user } = useAccount()

  // Data state
  const [companyRocks, setCompanyRocks] = useState<Rock[]>([])
  const [departmentalRocks, setDepartmentalRocks] = useState<Rock[]>([])
  const [individualRocks, setIndividualRocks] = useState<Rock[]>([])
  const [userNames, setUserNames] = useState<UserName[]>([])
  const [loading, setLoading] = useState(true)

  // UI state
  const [longPressMenu, setLongPressMenu] = useState<LongPressMenuState>({
    visible: false,
    rock: null,
  })
  const [editModal, setEditModal] = useState<EditModalState>({
    visible: false,
    rock: null,
    isNew: false,
  })

  // Load data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [company, departmental, individual, names] = await Promise.all([
        getCompanyRocks(),
        getDepartmentalRocks(),
        getIndividualRocks(),
        getUserNames(),
      ])
      setCompanyRocks(company)
      setDepartmentalRocks(departmental)
      setIndividualRocks(individual)
      setUserNames(names)
    } catch (error) {
      console.error('Error loading rocks:', error)
      Alert.alert('Error', 'Failed to load rocks')
    } finally {
      setLoading(false)
    }
  }

  // Long press handler
  const handleLongPress = (rock: Rock) => {
    setLongPressMenu({ visible: true, rock })
  }

  // Edit handlers
  const handleEditPress = () => {
    if (!longPressMenu.rock) return
    setEditModal({
      visible: true,
      rock: {
        id: longPressMenu.rock.id,
        title: longPressMenu.rock.title,
        level: longPressMenu.rock.level,
        department: longPressMenu.rock.department || undefined,
        owner: longPressMenu.rock.owner || undefined,
        owner_id: longPressMenu.rock.owner_id || undefined,
      },
      isNew: false,
    })
    setLongPressMenu({ visible: false, rock: null })
  }

  const handleAddPress = (level: RockLevel) => {
    setEditModal({
      visible: true,
      rock: {
        title: '',
        level,
      },
      isNew: true,
    })
  }

  const handleSaveRock = async () => {
    if (!editModal.rock || !user) return

    const { title, level, department, owner, owner_id } = editModal.rock

    // Validation
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required')
      return
    }
    if (level === 'departmental' && !department?.trim()) {
      Alert.alert('Error', 'Department is required for departmental rocks')
      return
    }
    if (level === 'individual' && (!owner?.trim() || !owner_id)) {
      Alert.alert('Error', 'Owner is required for individual rocks')
      return
    }

    try {
      if (editModal.isNew) {
        await createRock({
          user_id: user.id,
          title: title.trim(),
          level,
          department: level === 'departmental' ? department?.trim() || null : null,
          owner: level === 'individual' ? owner?.trim() || null : null,
          owner_id: level === 'individual' ? owner_id || null : null,
        })
      } else {
        await updateRock({
          id: editModal.rock.id!,
          user_id: user.id,
          title: title.trim(),
          level,
          department: level === 'departmental' ? department?.trim() || null : null,
          owner: level === 'individual' ? owner?.trim() || null : null,
          owner_id: level === 'individual' ? owner_id || null : null,
        })
      }
      setEditModal({ visible: false, rock: null, isNew: false })
      loadData()
    } catch (error) {
      console.error('Error saving rock:', error)
      Alert.alert('Error', 'Failed to save rock')
    }
  }

  // Delete handler
  const handleDeletePress = () => {
    if (!longPressMenu.rock) return

    Alert.alert(
      'Delete Rock',
      'Are you sure you want to delete this rock?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRock(longPressMenu.rock!.id)
              setLongPressMenu({ visible: false, rock: null })
              loadData()
            } catch (error) {
              console.error('Error deleting rock:', error)
              Alert.alert('Error', 'Failed to delete rock')
            }
          },
        },
      ]
    )
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ flex: 1 }}>
        <CompanyRocks
          rocks={companyRocks}
          onLongPress={handleLongPress}
          onAddPress={() => handleAddPress('company')}
        />
        <DepartmentalRocks
          rocks={departmentalRocks}
          onLongPress={handleLongPress}
          onAddPress={() => handleAddPress('departmental')}
        />
        <IndividualRocks
          rocks={individualRocks}
          onLongPress={handleLongPress}
          onAddPress={() => handleAddPress('individual')}
        />
      </ScrollView>

      {/* Long Press Menu */}
      <Modal
        visible={longPressMenu.visible}
        transparent
        animationType="fade"
        onRequestClose={() => setLongPressMenu({ visible: false, rock: null })}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setLongPressMenu({ visible: false, rock: null })}
        >
          <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, minWidth: 200 }}>
            <TouchableOpacity
              onPress={handleEditPress}
              style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}
            >
              <Text style={{ fontSize: 16, textAlign: 'center' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeletePress}
              style={{ paddingVertical: 12 }}
            >
              <Text style={{ fontSize: 16, textAlign: 'center', color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Edit Modal */}
      <Modal
        visible={editModal.visible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModal({ visible: false, rock: null, isNew: false })}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 }}
          onPress={() => setEditModal({ visible: false, rock: null, isNew: false })}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '100%', maxWidth: 500 }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
              {editModal.isNew ? 'Add Rock' : 'Edit Rock'}
            </Text>

            <Text style={{ fontSize: 14, marginBottom: 8 }}>Title</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                fontSize: 16,
              }}
              value={editModal.rock?.title || ''}
              onChangeText={(text) =>
                setEditModal((prev) => ({
                  ...prev,
                  rock: prev.rock ? { ...prev.rock, title: text } : null,
                }))
              }
              placeholder="Enter rock title"
              multiline
            />

            {editModal.rock?.level === 'departmental' && (
              <>
                <Text style={{ fontSize: 14, marginBottom: 8 }}>Department</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 16,
                    fontSize: 16,
                  }}
                  value={editModal.rock?.department || ''}
                  onChangeText={(text) =>
                    setEditModal((prev) => ({
                      ...prev,
                      rock: prev.rock ? { ...prev.rock, department: text } : null,
                    }))
                  }
                  placeholder="Enter department name"
                />
              </>
            )}

            {editModal.rock?.level === 'individual' && (
              <>
                <Text style={{ fontSize: 14, marginBottom: 8 }}>Owner</Text>
                <ScrollView style={{ maxHeight: 200, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 16 }}>
                  {userNames.map((userName) => (
                    <TouchableOpacity
                      key={userName.id}
                      onPress={() =>
                        setEditModal((prev) => ({
                          ...prev,
                          rock: prev.rock
                            ? { ...prev.rock, owner: userName.name, owner_id: userName.id }
                            : null,
                        }))
                      }
                      style={{
                        padding: 12,
                        backgroundColor: editModal.rock?.owner_id === userName.id ? '#e0e0e0' : '#fff',
                      }}
                    >
                      <Text>{userName.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity
                onPress={() => setEditModal({ visible: false, rock: null, isNew: false })}
                style={{ paddingVertical: 10, paddingHorizontal: 20 }}
              >
                <Text style={{ fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveRock}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: '#007AFF',
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 16, color: '#fff' }}>Done</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}

// Component for Company Rocks
type CompanyRocksProps = {
  rocks: Rock[]
  onLongPress: (rock: Rock) => void
  onAddPress: () => void
}

function CompanyRocks({ rocks, onLongPress, onAddPress }: CompanyRocksProps) {
  return (
    <View style={{ backgroundColor: '#e8e8e8', padding: 16, marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Company Rocks</Text>
        <TouchableOpacity
          onPress={onAddPress}
          style={{ backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
      {rocks.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#666', paddingVertical: 20 }}>No company rocks yet</Text>
      ) : (
        <RockGrid rocks={rocks} onLongPress={onLongPress} />
      )}
    </View>
  )
}

// Component for Departmental Rocks
type DepartmentalRocksProps = {
  rocks: Rock[]
  onLongPress: (rock: Rock) => void
  onAddPress: () => void
}

function DepartmentalRocks({ rocks, onLongPress, onAddPress }: DepartmentalRocksProps) {
  // Group rocks by department
  const groupedRocks = rocks.reduce((acc, rock) => {
    const dept = rock.department || 'Unknown'
    if (!acc[dept]) acc[dept] = []
    acc[dept].push(rock)
    return acc
  }, {} as Record<string, Rock[]>)

  return (
    <View style={{ backgroundColor: '#d0d0d0', padding: 16, marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Departmental Rocks</Text>
        <TouchableOpacity
          onPress={onAddPress}
          style={{ backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
      {rocks.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#666', paddingVertical: 20 }}>No departmental rocks yet</Text>
      ) : (
        Object.entries(groupedRocks).map(([department, deptRocks]) => (
          <View key={department} style={{ backgroundColor: '#e8e8e8', padding: 12, marginBottom: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{department}</Text>
            <RockGrid rocks={deptRocks} onLongPress={onLongPress} />
          </View>
        ))
      )}
    </View>
  )
}

// Component for Individual Rocks
type IndividualRocksProps = {
  rocks: Rock[]
  onLongPress: (rock: Rock) => void
  onAddPress: () => void
}

function IndividualRocks({ rocks, onLongPress, onAddPress }: IndividualRocksProps) {
  // Group rocks by owner
  const groupedRocks = rocks.reduce((acc, rock) => {
    const owner = rock.owner || 'Unknown'
    if (!acc[owner]) acc[owner] = []
    acc[owner].push(rock)
    return acc
  }, {} as Record<string, Rock[]>)

  return (
    <View style={{ backgroundColor: '#b8b8b8', padding: 16, marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Individual Rocks</Text>
        <TouchableOpacity
          onPress={onAddPress}
          style={{ backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>
      {rocks.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#666', paddingVertical: 20 }}>No individual rocks yet</Text>
      ) : (
        Object.entries(groupedRocks).map(([owner, ownerRocks]) => (
          <View key={owner} style={{ backgroundColor: '#d0d0d0', padding: 12, marginBottom: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{owner}</Text>
            <RockGrid rocks={ownerRocks} onLongPress={onLongPress} />
          </View>
        ))
      )}
    </View>
  )
}

// Shared Rock Grid component
type RockGridProps = {
  rocks: Rock[]
  onLongPress: (rock: Rock) => void
}

function RockGrid({ rocks, onLongPress }: RockGridProps) {
  const { width } = useWindowDimensions()
  const numColumns = Math.max(2, Math.floor(width / 150))
  const rockSize = Math.floor((width - 32 - (numColumns - 1) * 8) / numColumns)

  let pressTimer: NodeJS.Timeout | null = null

  const handlePressIn = (rock: Rock) => {
    pressTimer = setTimeout(() => {
      onLongPress(rock)
    }, 500)
  }

  const handlePressOut = () => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      pressTimer = null
    }
  }

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {rocks.map((rock) => (
        <TouchableOpacity
          key={rock.id}
          onPressIn={() => handlePressIn(rock)}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
          style={{
            width: rockSize,
            height: rockSize,
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, textAlign: 'center' }} numberOfLines={0}>
            {rock.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

/*
 * ============================================
 * GLOBAL UI DESIGN BIAS - FOR STYLING AGENT
 * ============================================
 *
 * [ ]: presentational - visually rich with fancy fonts, large graphics, and generous whitespace.
 * [x]: business management - function first, graphs are less visual, more numeric. display is more plain, but more clear.
 * [ ]: shop - conversion first = clear checkout flow, smooth transitions, bold CTA's, high contrast palate.
 * [x]: custom: emphasis on well defined sections, very distinctively separated. this is because of the amount of business information that needs to be easily scrolled through.
 *
 * This information guides future styling passes.
 * Do not modify the functional code above based on this bias yet.
 * ============================================
 */
