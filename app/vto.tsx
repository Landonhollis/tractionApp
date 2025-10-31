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
} from 'react-native'
import { Menu } from '../components/layoutComponents/Menu'
import { useAccount } from '../providers/AccountProvider'
import {
  getVto,
  createVto,
  updateVtoSection,
  formatSectionTitle,
  getVtoSectionColumns,
  VtoRecord,
} from '../services/vtoService'

// Types
type EditingSection = {
  columnName: string
  title: string
  currentValue: string
} | null

export default function VtoScreen() {
  const { session } = useAccount()
  const [vtoData, setVtoData] = useState<VtoRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingSection, setEditingSection] = useState<EditingSection>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)

  // Load VTO data on mount
  useEffect(() => {
    loadVto()
  }, [session])

  const loadVto = async () => {
    if (!session?.user?.id) {
      setLoading(false)
      return
    }

    setLoading(true)
    const result = await getVto(session.user.id)

    if (result.success && result.data) {
      setVtoData(result.data)
    } else if (result.success && !result.data) {
      // No VTO exists, create one
      const createResult = await createVto(session.user.id)
      if (createResult.success && createResult.data) {
        setVtoData(createResult.data)
      }
    }

    setLoading(false)
  }

  const handleLongPress = (columnName: string, currentValue: string | null) => {
    setEditingSection({
      columnName,
      title: formatSectionTitle(columnName),
      currentValue: currentValue || '',
    })
    setEditValue(currentValue || '')
  }

  const handleSave = async () => {
    if (!editingSection || !vtoData) return

    setSaving(true)

    const result = await updateVtoSection(
      vtoData.id,
      editingSection.columnName,
      editValue
    )

    if (result.success && result.data) {
      setVtoData(result.data)
      setEditingSection(null)
      setEditValue('')
    }

    setSaving(false)
  }

  const handleCancel = () => {
    setEditingSection(null)
    setEditValue('')
  }

  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Menu />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 16, fontSize: 16 }}>Loading VTO...</Text>
        </View>
      </View>
    )
  }

  // Empty state (no VTO and failed to create)
  if (!vtoData) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Menu />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 16 }}>
            Unable to load VTO
          </Text>
          <TouchableOpacity
            onPress={loadVto}
            style={{
              backgroundColor: '#000',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const sectionColumns = getVtoSectionColumns()

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Menu />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingTop: 80 }}
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
          Vision/Traction Organizer
        </Text>

        {/* VTO Sections */}
        {sectionColumns.map((columnName) => (
          <VtoSection
            key={columnName}
            columnName={columnName}
            title={formatSectionTitle(columnName)}
            description={vtoData[columnName as keyof VtoRecord] as string}
            onLongPress={handleLongPress}
          />
        ))}
      </ScrollView>

      {/* Edit Modal */}
      {editingSection && (
        <EditVtoSectionModal
          title={editingSection.title}
          value={editValue}
          onValueChange={setEditValue}
          onSave={handleSave}
          onCancel={handleCancel}
          saving={saving}
        />
      )}
    </View>
  )
}

// VtoSection Component
type VtoSectionProps = {
  columnName: string
  title: string
  description: string | null
  onLongPress: (columnName: string, currentValue: string | null) => void
}

function VtoSection({ columnName, title, description, onLongPress }: VtoSectionProps) {
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    setIsPressed(true)
    longPressTimer.current = setTimeout(() => {
      onLongPress(columnName, description)
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
        marginBottom: 32,
        padding: 16,
        backgroundColor: isPressed ? '#f0f0f0' : '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
      }}
    >
      {/* Section Title */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#000',
        }}
      >
        {title}
      </Text>

      {/* Section Description */}
      <Text
        style={{
          fontSize: 16,
          lineHeight: 24,
          color: description ? '#333' : '#999',
        }}
      >
        {description || 'Long-press to add content...'}
      </Text>
    </TouchableOpacity>
  )
}

// EditVtoSection Modal Component
type EditVtoSectionModalProps = {
  title: string
  value: string
  onValueChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
}

function EditVtoSectionModal({
  title,
  value,
  onValueChange,
  onSave,
  onCancel,
  saving,
}: EditVtoSectionModalProps) {
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
            maxWidth: 500,
            maxHeight: '80%',
          }}
        >
          {/* Section Title (read-only) */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 16,
              color: '#000',
            }}
          >
            {title}
          </Text>

          {/* Editable text area */}
          <ScrollView style={{ maxHeight: 300, marginBottom: 20 }}>
            <TextInput
              value={value}
              onChangeText={onValueChange}
              multiline
              placeholder="Enter section content..."
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                minHeight: 150,
                textAlignVertical: 'top',
                backgroundColor: '#fff',
              }}
              editable={!saving}
            />
          </ScrollView>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
            <TouchableOpacity
              onPress={onCancel}
              disabled={saving}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: '#f0f0f0',
              }}
            >
              <Text style={{ fontSize: 16, color: '#000' }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSave}
              disabled={saving}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: saving ? '#ccc' : '#007AFF',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {saving && <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />}
              <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>
                {saving ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

/*
UI/UX BIAS FOR FUTURE DESIGN PASS
Formal, professional, presentation-quality.
This is THE strategic document - it should feel authoritative and important.
Large, clear section titles create strong hierarchy.
Generous whitespace between sections - let content breathe.
Typography is critical - titles should command attention, body should be highly readable.
Consider subtle visual separators between sections (rules, spacing, background tints).
EditVtoSection modal should feel focused and distraction-free.
Dimmed background reinforces modal focus.
Save button in accent color creates clear primary action.
This document represents the company's vision - design should inspire confidence.
*/
