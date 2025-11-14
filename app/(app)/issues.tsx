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
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
  Issue,
  IssueInput,
} from '../../services/issuesService'

// Types
type EditingIssue = {
  id: string
  title: string
  level: 'quarterly' | 'company' | 'departmental'
  department: string
} | null

type AddingIssue = {
  level: 'quarterly' | 'company' | 'departmental'
} | null

export default function IssuesScreen() {
  const { session } = useAccount()
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [editingIssue, setEditingIssue] = useState<EditingIssue>(null)
  const [addingIssue, setAddingIssue] = useState<AddingIssue>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDepartment, setEditDepartment] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Load issues on mount
  useEffect(() => {
    loadIssues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const loadIssues = async () => {
    if (!session?.user?.id) {
      setLoading(false)
      return
    }

    setLoading(true)
    const result = await getIssues(session.user.id)

    if (result.success && result.data) {
      setIssues(result.data)
    }

    setLoading(false)
  }

  // Filter issues by level
  const quarterlyIssues = issues.filter((i) => i.level === 'quarterly')
  const companyIssues = issues.filter((i) => i.level === 'company')
  const departmentalIssues = issues.filter((i) => i.level === 'departmental')

  // Group departmental issues by department
  const departmentalGroups = departmentalIssues.reduce((acc, issue) => {
    const dept = issue.department || 'No Department'
    if (!acc[dept]) acc[dept] = []
    acc[dept].push(issue)
    return acc
  }, {} as Record<string, Issue[]>)

  const handleLongPress = (issue: Issue) => {
    setEditingIssue({
      id: issue.id,
      title: issue.title,
      level: issue.level,
      department: issue.department || '',
    })
    setEditTitle(issue.title)
    setEditDepartment(issue.department || '')
  }

  const handleAddIssue = (level: 'quarterly' | 'company' | 'departmental') => {
    setAddingIssue({ level })
    setEditTitle('')
    setEditDepartment('')
  }

  const handleSaveAdd = async () => {
    if (!session?.user?.id || !addingIssue) return

    if (!editTitle.trim()) {
      Alert.alert('Error', 'Issue title is required')
      return
    }

    if (addingIssue.level === 'departmental' && !editDepartment.trim()) {
      Alert.alert('Error', 'Department is required for departmental issues')
      return
    }

    setSaving(true)

    const input: IssueInput = {
      title: editTitle.trim(),
      level: addingIssue.level,
      department: addingIssue.level === 'departmental' ? editDepartment.trim() : null,
    }

    const result = await createIssue(session.user.id, input)

    if (result.success && result.data) {
      setIssues([result.data, ...issues])
      setAddingIssue(null)
      setEditTitle('')
      setEditDepartment('')
    }

    setSaving(false)
  }

  const handleSaveEdit = async () => {
    if (!editingIssue) return

    if (!editTitle.trim()) {
      Alert.alert('Error', 'Issue title is required')
      return
    }

    if (editingIssue.level === 'departmental' && !editDepartment.trim()) {
      Alert.alert('Error', 'Department is required for departmental issues')
      return
    }

    setSaving(true)

    const input: Partial<IssueInput> = {
      title: editTitle.trim(),
      department: editingIssue.level === 'departmental' ? editDepartment.trim() : null,
    }

    const result = await updateIssue(editingIssue.id, input)

    if (result.success && result.data) {
      setIssues(issues.map((i) => (i.id === result.data!.id ? result.data! : i)))
      setEditingIssue(null)
      setEditTitle('')
      setEditDepartment('')
    }

    setSaving(false)
  }

  const handleDelete = (issueId: string, issueTitle: string) => {
    Alert.alert(
      'Delete Issue',
      `Are you sure you want to delete "${issueTitle}"?`,
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
            const result = await deleteIssue(issueId)

            if (result.success) {
              setIssues(issues.filter((i) => i.id !== issueId))
              setEditingIssue(null)
            }

            setDeleting(false)
          },
        },
      ]
    )
  }

  const handleCancel = () => {
    setEditingIssue(null)
    setAddingIssue(null)
    setEditTitle('')
    setEditDepartment('')
  }

  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 16, fontSize: 16 }}>Loading issues...</Text>
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
          Issues
        </Text>

        {/* Empty state */}
        {issues.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={{ fontSize: 18, color: '#999', marginBottom: 16 }}>
              No issues yet
            </Text>
            <Text style={{ fontSize: 14, color: '#999', textAlign: 'center' }}>
              Click an &quot;Add Issue&quot; button to create your first issue
            </Text>
          </View>
        )}

        {/* Quarterly Issues Section */}
        <QuarterlyIssuesSection
          issues={quarterlyIssues}
          onLongPress={handleLongPress}
          onAdd={() => handleAddIssue('quarterly')}
          onDelete={(id, title) => handleDelete(id, title)}
        />

        {/* Company Issues Section */}
        <CompanyIssuesSection
          issues={companyIssues}
          onLongPress={handleLongPress}
          onAdd={() => handleAddIssue('company')}
          onDelete={(id, title) => handleDelete(id, title)}
        />

        {/* Departmental Issues Section */}
        <DepartmentalIssuesSection
          departmentalGroups={departmentalGroups}
          onLongPress={handleLongPress}
          onAdd={() => handleAddIssue('departmental')}
        />
      </ScrollView>

      {/* Edit Issue Modal */}
      {editingIssue && (
        <EditIssueModal
          title={editTitle}
          department={editDepartment}
          level={editingIssue.level}
          onTitleChange={setEditTitle}
          onDepartmentChange={setEditDepartment}
          onSave={handleSaveEdit}
          onCancel={handleCancel}
          onDelete={() => handleDelete(editingIssue.id, editingIssue.title)}
          saving={saving}
          deleting={deleting}
        />
      )}

      {/* Add Issue Modal */}
      {addingIssue && (
        <AddIssueModal
          title={editTitle}
          department={editDepartment}
          level={addingIssue.level}
          onTitleChange={setEditTitle}
          onDepartmentChange={setEditDepartment}
          onSave={handleSaveAdd}
          onCancel={handleCancel}
          saving={saving}
        />
      )}
    </View>
  )
}

// Quarterly Issues Section Component
type QuarterlyIssuesSectionProps = {
  issues: Issue[]
  onLongPress: (issue: Issue) => void
  onAdd: () => void
  onDelete: (id: string, title: string) => void
}

function QuarterlyIssuesSection({
  issues,
  onLongPress,
  onAdd,
  onDelete,
}: QuarterlyIssuesSectionProps) {
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([])
  const [deleteMode, setDeleteMode] = useState(false)

  const handleToggleSelect = (id: string) => {
    if (selectedForDelete.includes(id)) {
      setSelectedForDelete(selectedForDelete.filter((i) => i !== id))
    } else {
      setSelectedForDelete([...selectedForDelete, id])
    }
  }

  const handleDeleteSelected = () => {
    if (selectedForDelete.length === 0) return

    Alert.alert(
      'Delete Issues',
      `Delete ${selectedForDelete.length} selected issue(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            selectedForDelete.forEach((id) => {
              const issue = issues.find((i) => i.id === id)
              if (issue) onDelete(id, issue.title)
            })
            setSelectedForDelete([])
            setDeleteMode(false)
          },
        },
      ]
    )
  }

  return (
    <View style={{ marginBottom: 32 }}>
      {/* Section Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Quarterly Issues</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            onPress={onAdd}
            style={{
              backgroundColor: '#22c55e',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Add</Text>
          </TouchableOpacity>
          {issues.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                if (deleteMode && selectedForDelete.length > 0) {
                  handleDeleteSelected()
                } else {
                  setDeleteMode(!deleteMode)
                  setSelectedForDelete([])
                }
              }}
              style={{
                backgroundColor: deleteMode && selectedForDelete.length > 0 ? '#ef4444' : '#f3f4f6',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: deleteMode && selectedForDelete.length > 0 ? '#fff' : '#111827',
                  fontSize: 14,
                  fontWeight: '600',
                }}
              >
                {deleteMode ? (selectedForDelete.length > 0 ? 'Delete' : 'Cancel') : 'Delete'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Issues List */}
      {issues.length === 0 ? (
        <Text style={{ fontSize: 14, color: '#999', fontStyle: 'italic' }}>
          No quarterly issues
        </Text>
      ) : (
        issues.map((issue) => (
          <IssueItem
            key={issue.id}
            issue={issue}
            onLongPress={onLongPress}
            deleteMode={deleteMode}
            isSelected={selectedForDelete.includes(issue.id)}
            onToggleSelect={handleToggleSelect}
          />
        ))
      )}
    </View>
  )
}

// Company Issues Section Component
type CompanyIssuesSectionProps = {
  issues: Issue[]
  onLongPress: (issue: Issue) => void
  onAdd: () => void
  onDelete: (id: string, title: string) => void
}

function CompanyIssuesSection({
  issues,
  onLongPress,
  onAdd,
  onDelete,
}: CompanyIssuesSectionProps) {
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([])
  const [deleteMode, setDeleteMode] = useState(false)

  const handleToggleSelect = (id: string) => {
    if (selectedForDelete.includes(id)) {
      setSelectedForDelete(selectedForDelete.filter((i) => i !== id))
    } else {
      setSelectedForDelete([...selectedForDelete, id])
    }
  }

  const handleDeleteSelected = () => {
    if (selectedForDelete.length === 0) return

    Alert.alert(
      'Delete Issues',
      `Delete ${selectedForDelete.length} selected issue(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            selectedForDelete.forEach((id) => {
              const issue = issues.find((i) => i.id === id)
              if (issue) onDelete(id, issue.title)
            })
            setSelectedForDelete([])
            setDeleteMode(false)
          },
        },
      ]
    )
  }

  return (
    <View style={{ marginBottom: 32 }}>
      {/* Section Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Company Issues</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            onPress={onAdd}
            style={{
              backgroundColor: '#22c55e',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Add</Text>
          </TouchableOpacity>
          {issues.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                if (deleteMode && selectedForDelete.length > 0) {
                  handleDeleteSelected()
                } else {
                  setDeleteMode(!deleteMode)
                  setSelectedForDelete([])
                }
              }}
              style={{
                backgroundColor: deleteMode && selectedForDelete.length > 0 ? '#ef4444' : '#f3f4f6',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: deleteMode && selectedForDelete.length > 0 ? '#fff' : '#111827',
                  fontSize: 14,
                  fontWeight: '600',
                }}
              >
                {deleteMode ? (selectedForDelete.length > 0 ? 'Delete' : 'Cancel') : 'Delete'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Issues List */}
      {issues.length === 0 ? (
        <Text style={{ fontSize: 14, color: '#999', fontStyle: 'italic' }}>
          No company issues
        </Text>
      ) : (
        issues.map((issue) => (
          <IssueItem
            key={issue.id}
            issue={issue}
            onLongPress={onLongPress}
            deleteMode={deleteMode}
            isSelected={selectedForDelete.includes(issue.id)}
            onToggleSelect={handleToggleSelect}
          />
        ))
      )}
    </View>
  )
}

// Departmental Issues Section Component
type DepartmentalIssuesSectionProps = {
  departmentalGroups: Record<string, Issue[]>
  onLongPress: (issue: Issue) => void
  onAdd: () => void
}

function DepartmentalIssuesSection({
  departmentalGroups,
  onLongPress,
  onAdd,
}: DepartmentalIssuesSectionProps) {
  const departments = Object.keys(departmentalGroups).sort()

  return (
    <View style={{ marginBottom: 32 }}>
      {/* Section Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Departmental Issues</Text>
        <TouchableOpacity
          onPress={onAdd}
          style={{
            backgroundColor: '#22c55e',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Issues by Department */}
      {departments.length === 0 ? (
        <Text style={{ fontSize: 14, color: '#999', fontStyle: 'italic' }}>
          No departmental issues
        </Text>
      ) : (
        departments.map((department, index) => (
          <View key={department}>
            {/* Department Header - thicker separator */}
            {index > 0 && (
              <View
                style={{
                  height: 3,
                  backgroundColor: '#333',
                  marginVertical: 16,
                }}
              />
            )}
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                marginBottom: 12,
                color: '#374151',
              }}
            >
              {department}
            </Text>
            {departmentalGroups[department].map((issue) => (
              <IssueItem
                key={issue.id}
                issue={issue}
                onLongPress={onLongPress}
                deleteMode={false}
                isSelected={false}
                onToggleSelect={() => {}}
              />
            ))}
          </View>
        ))
      )}
    </View>
  )
}

// Issue Item Component
type IssueItemProps = {
  issue: Issue
  onLongPress: (issue: Issue) => void
  deleteMode: boolean
  isSelected: boolean
  onToggleSelect: (id: string) => void
}

function IssueItem({
  issue,
  onLongPress,
  deleteMode,
  isSelected,
  onToggleSelect,
}: IssueItemProps) {
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    if (deleteMode) return
    setIsPressed(true)
    longPressTimer.current = setTimeout(() => {
      onLongPress(issue)
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

  const handlePress = () => {
    if (deleteMode) {
      onToggleSelect(issue.id)
    }
  }

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      activeOpacity={deleteMode ? 0.7 : 1}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        backgroundColor: isSelected ? '#dbeafe' : isPressed ? '#f9fafb' : '#fff',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {deleteMode && (
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: isSelected ? '#3b82f6' : '#9ca3af',
            backgroundColor: isSelected ? '#3b82f6' : '#fff',
            marginRight: 12,
          }}
        />
      )}
      <Text style={{ fontSize: 16, color: '#111827', flex: 1 }}>{issue.title}</Text>
    </TouchableOpacity>
  )
}

// Edit Issue Modal Component
type EditIssueModalProps = {
  title: string
  department: string
  level: 'quarterly' | 'company' | 'departmental'
  onTitleChange: (value: string) => void
  onDepartmentChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
  saving: boolean
  deleting: boolean
}

function EditIssueModal({
  title,
  department,
  level,
  onTitleChange,
  onDepartmentChange,
  onSave,
  onCancel,
  onDelete,
  saving,
  deleting,
}: EditIssueModalProps) {
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onCancel}>
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
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            width: '100%',
            maxWidth: 600,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 20,
              color: '#111827',
            }}
          >
            Edit Issue
          </Text>

          {/* Title Input */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 8,
              color: '#111827',
            }}
          >
            Issue Title *
          </Text>
          <TextInput
            value={title}
            onChangeText={onTitleChange}
            placeholder="Enter issue title..."
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

          {/* Department Input (only for departmental issues) */}
          {level === 'departmental' && (
            <>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  marginBottom: 8,
                  color: '#111827',
                }}
              >
                Department *
              </Text>
              <TextInput
                value={department}
                onChangeText={onDepartmentChange}
                placeholder="Enter department name..."
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
            </>
          )}

          {/* Buttons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: level === 'departmental' ? 'space-between' : 'flex-end',
              alignItems: 'center',
            }}
          >
            {/* Delete button (only for departmental issues) */}
            {level === 'departmental' && (
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
            )}

            {/* Save/Cancel buttons */}
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
                  {saving ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

// Add Issue Modal Component
type AddIssueModalProps = {
  title: string
  department: string
  level: 'quarterly' | 'company' | 'departmental'
  onTitleChange: (value: string) => void
  onDepartmentChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
}

function AddIssueModal({
  title,
  department,
  level,
  onTitleChange,
  onDepartmentChange,
  onSave,
  onCancel,
  saving,
}: AddIssueModalProps) {
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onCancel}>
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
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            width: '100%',
            maxWidth: 600,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 20,
              color: '#111827',
            }}
          >
            Add {level.charAt(0).toUpperCase() + level.slice(1)} Issue
          </Text>

          {/* Title Input */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 8,
              color: '#111827',
            }}
          >
            Issue Title *
          </Text>
          <TextInput
            value={title}
            onChangeText={onTitleChange}
            placeholder="Enter issue title..."
            style={{
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              marginBottom: 20,
              backgroundColor: '#fff',
            }}
            editable={!saving}
          />

          {/* Department Input (only for departmental issues) */}
          {level === 'departmental' && (
            <>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  marginBottom: 8,
                  color: '#111827',
                }}
              >
                Department *
              </Text>
              <TextInput
                value={department}
                onChangeText={onDepartmentChange}
                placeholder="Enter department name..."
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  marginBottom: 20,
                  backgroundColor: '#fff',
                }}
                editable={!saving}
              />
            </>
          )}

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
            <TouchableOpacity
              onPress={onCancel}
              disabled={saving}
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
              disabled={saving}
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
                {saving ? 'Adding...' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
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
