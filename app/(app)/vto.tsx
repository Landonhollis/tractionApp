// screen coding agent was in progress when ai rate limit was reached
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
import { useAccount } from '../../providers/AccountProvider'
import {
  getVto,
  createVto,
  updateVtoSection,
  formatSectionTitle,
  getVtoSectionColumns,
  VtoRecord,
} from '../../services/vtoService'

// Types
type EditingSection = {
  columnName: string
  title: string
  currentValue: string
} | null

export default function VtoScreen() {
  const { session, ps } = useAccount()
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
      <View style={ps('bg-1 flex-1')}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={ps('text-normal').color} />
          <Text style={ps('f-1 text-md text-normal fw-400')} className="mt-4">Loading VTO...</Text>
        </View>
      </View>
    )
  }

  // Empty state (no VTO and failed to create)
  if (!vtoData) {
    return (
      <View style={ps('bg-1 flex-1')}>
        <View className="flex-1 justify-center items-center px-5">
          <Text style={ps('f-3 text-lg text-strong fw-600')} className="text-center mb-4">
            Unable to load VTO
          </Text>
          <TouchableOpacity
            onPress={loadVto}
            style={ps('bg-a1 br-2')}
            className="px-6 py-3"
            activeOpacity={0.8}
          >
            <Text style={ps('f-1 text-md text-inverse fw-600')}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const sectionColumns = getVtoSectionColumns()

  return (
    <View style={ps('bg-1 flex-1')}>
      <ScrollView
        style={ps('flex-1')}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 80, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Page title */}
        <Text
          style={ps('f-3 text-2xl text-strong fw-700')}
          className="mb-6 text-center"
        >
          Vision/Traction Organizer
        </Text>

        {/* Instructional text */}
        <Text
          style={ps('f-1 text-sm text-muted fw-400')}
          className="mb-8 text-center px-4"
        >
          Long-press any section to edit
        </Text>

        {/* VTO Sections */}
        {sectionColumns.map((columnName) => (
          <VtoSection
            key={columnName}
            columnName={columnName}
            title={formatSectionTitle(columnName)}
            description={vtoData[columnName as keyof VtoRecord] as string}
            onLongPress={handleLongPress}
            ps={ps}
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
          ps={ps}
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
  ps: (styleString: string) => object
}

function VtoSection({ columnName, title, description, onLongPress, ps }: VtoSectionProps) {
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
      activeOpacity={0.95}
      style={{
        ...ps(isPressed ? 'bg-4 bw-2 bc-accent br-2 shadow-2' : 'bg-3 bw-1 bc-normal br-2 shadow-1'),
        marginBottom: 20,
        padding: 20,
      }}
    >
      {/* Section Title */}
      <Text
        style={ps('f-3 text-lg text-strong fw-600')}
        className="mb-3"
      >
        {title}
      </Text>

      {/* Section Description */}
      <Text
        style={ps(description ? 'f-1 text-md text-normal fw-400' : 'f-5 text-sm text-muted fw-400')}
        numberOfLines={description ? undefined : 1}
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
  ps: (styleString: string) => object
}

function EditVtoSectionModal({
  title,
  value,
  onValueChange,
  onSave,
  onCancel,
  saving,
  ps,
}: EditVtoSectionModalProps) {
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onCancel}>
      {/* Dimmed backdrop */}
      <Pressable
        onPress={onCancel}
        className="flex-1 justify-center items-center px-5"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
      >
        {/* Modal content - prevent backdrop close when tapping inside */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            ...ps('bg-2 br-3 shadow-3'),
            padding: 24,
            width: '100%',
            maxWidth: 500,
            maxHeight: '85%',
          }}
        >
          {/* Section Title (read-only) */}
          <Text
            style={ps('f-3 text-xl text-strong fw-700')}
            className="mb-2"
          >
            {title}
          </Text>

          {/* Helper text */}
          <Text
            style={ps('f-1 text-sm text-muted fw-400')}
            className="mb-5"
          >
            Edit the content for this section
          </Text>

          {/* Editable text area */}
          <ScrollView className="mb-6" style={{ maxHeight: 350 }}>
            <TextInput
              value={value}
              onChangeText={onValueChange}
              multiline
              placeholder="Enter section content..."
              placeholderTextColor={ps('text-muted').color}
              style={{
                ...ps('bg-1 bw-1 bc-normal br-2 f-1 text-md text-normal fw-400'),
                padding: 16,
                minHeight: 180,
                textAlignVertical: 'top',
              }}
              editable={!saving}
              autoFocus
            />
          </ScrollView>

          {/* Buttons */}
          <View className="flex-row justify-end" style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={onCancel}
              disabled={saving}
              style={{
                ...ps(saving ? 'bg-5 br-2' : 'bg-4 br-2'),
                paddingHorizontal: 20,
                paddingVertical: 12,
                minWidth: 90,
              }}
              activeOpacity={0.7}
            >
              <Text style={ps('f-1 text-md text-normal fw-500')} className="text-center">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSave}
              disabled={saving}
              style={{
                ...ps(saving ? 'bg-5 br-2' : 'bg-a1 br-2'),
                paddingHorizontal: 20,
                paddingVertical: 12,
                minWidth: 90,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.8}
            >
              {saving && <ActivityIndicator size="small" color={ps('text-inverse').color} style={{ marginRight: 8 }} />}
              <Text style={ps('f-1 text-md text-inverse fw-600')} className="text-center">
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
