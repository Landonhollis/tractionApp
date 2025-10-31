import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { useAccount } from '../../providers/AccountProvider'
import {
  getProcesses,
  createProcess,
  updateProcess,
  deleteProcess,
  Process,
  ProcessInput,
} from '../../services/processesService'

// Types
type ProcessPopupState = {
  processId: string
  position: { x: number; y: number }
} | null

type EditingProcess = {
  id: string
  name: string
  description: string
  isNew: boolean
} | null

export default function ProcessesScreen() {
  const { session } = useAccount()
  const [processes, setProcesses] = useState<Process[]>([])
  const [loading, setLoading] = useState(true)
  const [popupState, setPopupState] = useState<ProcessPopupState>(null)
  const [editingProcess, setEditingProcess] = useState<EditingProcess>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Load processes on mount
  useEffect(() => {
    loadProcesses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const loadProcesses = async () => {
    if (!session?.user?.id) {
      setLoading(false)
      return
    }

    setLoading(true)
    const result = await getProcesses(session.user.id)

    if (result.success && result.data) {
      setProcesses(result.data)
    }

    setLoading(false)
  }

  const handleLongPress = (processId: string) => {
    setPopupState({ processId, position: { x: 0, y: 0 } })
  }

  const handleAddProcess = async () => {
    if (!session?.user?.id) return

    const result = await createProcess(session.user.id)

    if (result.success && result.data) {
      setProcesses([result.data, ...processes])
      setEditingProcess({
        id: result.data.id,
        name: result.data.name,
        description: result.data.description,
        isNew: true,
      })
      setEditName(result.data.name)
      setEditDescription(result.data.description)
    }
  }

  const handleEditPress = () => {
    if (!popupState) return

    const process = processes.find((p) => p.id === popupState.processId)
    if (!process) return

    setEditingProcess({
      id: process.id,
      name: process.name,
      description: process.description,
      isNew: false,
    })
    setEditName(process.name)
    setEditDescription(process.description)
    setPopupState(null)
  }

  const handleDeletePress = () => {
    if (!popupState) return

    const process = processes.find((p) => p.id === popupState.processId)
    if (!process) return

    Alert.alert(
      'Delete Process',
      `Are you sure you want to delete "${process.name || 'this process'}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setPopupState(null),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteConfirm(process.id),
        },
      ]
    )
  }

  const handleDeleteConfirm = async (processId: string) => {
    setDeleting(true)
    const result = await deleteProcess(processId)

    if (result.success) {
      setProcesses(processes.filter((p) => p.id !== processId))
    }

    setDeleting(false)
    setPopupState(null)
  }

  const handleSave = async () => {
    if (!editingProcess) return

    // Validate name
    if (!editName.trim()) {
      Alert.alert('Error', 'Process name is required')
      return
    }

    setSaving(true)

    const input: ProcessInput = {
      name: editName.trim(),
      description: editDescription.trim(),
    }

    const result = await updateProcess(editingProcess.id, input)

    if (result.success && result.data) {
      setProcesses(
        processes.map((p) => (p.id === result.data!.id ? result.data! : p))
      )
      setEditingProcess(null)
      setEditName('')
      setEditDescription('')
    }

    setSaving(false)
  }

  const handleDeleteFromModal = () => {
    if (!editingProcess) return

    Alert.alert(
      'Delete Process',
      `Are you sure you want to delete "${editingProcess.name || 'this process'}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true)
            const result = await deleteProcess(editingProcess.id)

            if (result.success) {
              setProcesses(processes.filter((p) => p.id !== editingProcess.id))
              setEditingProcess(null)
              setEditName('')
              setEditDescription('')
            }

            setDeleting(false)
          },
        },
      ]
    )
  }

  const handleCancel = () => {
    // If it's a new process with no name, delete it
    if (editingProcess?.isNew && !editName.trim()) {
      deleteProcess(editingProcess.id)
      setProcesses(processes.filter((p) => p.id !== editingProcess.id))
    }

    setEditingProcess(null)
    setEditName('')
    setEditDescription('')
  }

  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 16, fontSize: 16 }}>Loading processes...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingTop: 80, paddingBottom: 100 }}
      >
        {/* Page title */}
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          Processes
        </Text>

        {/* Empty state */}
        {processes.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={{ fontSize: 18, color: '#999', marginBottom: 16 }}>
              No processes yet
            </Text>
            <Text style={{ fontSize: 14, color: '#999', textAlign: 'center' }}>
              Click the &quot;Add Process&quot; button to create your first process
            </Text>
          </View>
        )}

        {/* Process list */}
        {processes.map((process) => (
          <ProcessSection
            key={process.id}
            process={process}
            onLongPress={handleLongPress}
          />
        ))}
      </ScrollView>

      {/* Add Process Button - fixed bottom left */}
      {!editingProcess && (
        <TouchableOpacity
          onPress={handleAddProcess}
          style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            backgroundColor: '#22c55e',
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
            Add Process
          </Text>
        </TouchableOpacity>
      )}

      {/* Long-press popup */}
      {popupState && !editingProcess && (
        <Pressable
          onPress={() => setPopupState(null)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 8,
              minWidth: 200,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <TouchableOpacity
              onPress={handleEditPress}
              disabled={deleting}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#f0f0f0',
              }}
            >
              <Text style={{ fontSize: 16, color: '#000' }}>Edit Process</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDeletePress}
              disabled={deleting}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {deleting && (
                <ActivityIndicator size="small" color="#ef4444" style={{ marginRight: 8 }} />
              )}
              <Text style={{ fontSize: 16, color: '#ef4444' }}>
                {deleting ? 'Deleting...' : 'Delete Process'}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}

      {/* Edit Process Modal */}
      {editingProcess && (
        <EditProcessModal
          name={editName}
          description={editDescription}
          onNameChange={setEditName}
          onDescriptionChange={setEditDescription}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDeleteFromModal}
          saving={saving}
          deleting={deleting}
        />
      )}
    </View>
  )
}

// ProcessSection Component
type ProcessSectionProps = {
  process: Process
  onLongPress: (processId: string) => void
}

function ProcessSection({ process, onLongPress }: ProcessSectionProps) {
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    setIsPressed(true)
    longPressTimer.current = setTimeout(() => {
      onLongPress(process.id)
      setIsPressed(false)
    }, 500) // 500ms long press threshold
  }

  const handlePressOut = () => {
    setIsPressed(false)
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
      style={{
        marginBottom: 24,
        padding: 20,
        backgroundColor: isPressed ? '#f9fafb' : '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Process Name */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#111827',
        }}
      >
        {process.name || 'Untitled Process'}
      </Text>

      {/* Process Description */}
      <Text
        style={{
          fontSize: 16,
          lineHeight: 24,
          color: process.description ? '#374151' : '#9ca3af',
        }}
      >
        {process.description || 'Long-press to add details...'}
      </Text>
    </TouchableOpacity>
  )
}

// EditProcess Modal Component
type EditProcessModalProps = {
  name: string
  description: string
  onNameChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
  saving: boolean
  deleting: boolean
}

function EditProcessModal({
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onSave,
  onCancel,
  onDelete,
  saving,
  deleting,
}: EditProcessModalProps) {
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onCancel}>
      {/* Dimmed backdrop */}
      <Pressable
        onPress={onCancel}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        {/* Modal content - prevent backdrop close when tapping inside */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            width: '100%',
            maxWidth: 600,
            maxHeight: '90%',
          }}
        >
          <ScrollView>
            {/* Process Name Input */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 8,
                color: '#111827',
              }}
            >
              Process Name *
            </Text>
            <TextInput
              value={name}
              onChangeText={onNameChange}
              placeholder="Enter process name..."
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                marginBottom: 20,
                backgroundColor: '#fff',
              }}
              editable={!saving && !deleting}
            />

            {/* Process Description Input */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 8,
                color: '#111827',
              }}
            >
              Process Description
            </Text>
            <TextInput
              value={description}
              onChangeText={onDescriptionChange}
              multiline
              placeholder="Enter process steps and details..."
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                minHeight: 200,
                textAlignVertical: 'top',
                backgroundColor: '#fff',
                marginBottom: 24,
              }}
              editable={!saving && !deleting}
            />
          </ScrollView>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Delete button on left */}
            <TouchableOpacity
              onPress={onDelete}
              disabled={saving || deleting}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: deleting ? '#fca5a5' : '#ef4444',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {deleting && (
                <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
              )}
              <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>
                {deleting ? 'Deleting...' : 'Delete'}
              </Text>
            </TouchableOpacity>

            {/* Save/Cancel buttons on right */}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                onPress={onCancel}
                disabled={saving || deleting}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: '#f3f4f6',
                }}
              >
                <Text style={{ fontSize: 16, color: '#111827' }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onSave}
                disabled={saving || deleting}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: saving ? '#93c5fd' : '#3b82f6',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {saving && (
                  <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
                )}
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>
                  {saving ? 'Saving...' : 'Done'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

/*
UI/UX BIAS FOR FUTURE DESIGN PASS
Formal, presentational, professional.
Processes should feel like important documentation - use typography to convey authority.
Each process section should feel like a distinct document or card.
Green "Add Process" button should be inviting but not dominate the interface.
Long-press popup should feel contextual and lightweight.
EditProcess modal should feel focused and distraction-free.
Consider subtle visual separation between processes (borders, shadows, spacing).
This is professional reference material that should inspire confidence.
*/
