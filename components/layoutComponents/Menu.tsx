import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native'
import { useRouter } from 'expo-router'

// Props interface
type MenuProps = {
  // Optional callback when navigation occurs (default: uses expo-router)
  onNavigate?: (route: string) => void
}

// Permanent route names - DO NOT CHANGE
const ROUTES = {
  SETTINGS: '/settings',
  DASHBOARD: '/dashboard',
  ISSUES: '/issues',
  ROCKS: '/rocks',
  ACCOUNTABILITY_CHART: '/accountability-chart',
  SCORE_CARDS: '/score-cards',
  DATA_HISTORY: '/data-history',
  VTO: '/vto',
  IDS: '/ids',
  MEETING_AGENDAS: '/meeting-agendas',
  RIGHT_PEOPLE_RIGHT_SEATS: '/right-people-right-seats',
  GWC: '/gwc',
  LEADING_OVER_LAGGING: '/leading-over-lagging',
  PROCESSES: '/processes',
} as const

type MenuItem = {
  label: string
  route: string
}

const SECTION_3_ITEMS: MenuItem[] = [
  { label: 'Issues', route: ROUTES.ISSUES },
  { label: 'Rocks', route: ROUTES.ROCKS },
  { label: 'Acct. Chart', route: ROUTES.ACCOUNTABILITY_CHART },
  { label: 'Score Cards', route: ROUTES.SCORE_CARDS },
  { label: 'Data History', route: ROUTES.DATA_HISTORY },
  { label: 'V/TO', route: ROUTES.VTO },
]

const SECTION_4_ITEMS: MenuItem[] = [
  { label: 'Processes', route: ROUTES.PROCESSES },
  { label: 'IDS', route: ROUTES.IDS },
  { label: 'Meeting Agendas', route: ROUTES.MEETING_AGENDAS },
  { label: 'RPRS', route: ROUTES.RIGHT_PEOPLE_RIGHT_SEATS },
  { label: 'GWC', route: ROUTES.GWC },
  { label: 'Leading/Lagging', route: ROUTES.LEADING_OVER_LAGGING },
]

export const Menu: React.FC<MenuProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const slideAnim = useRef(new Animated.Value(-300)).current
  const router = useRouter()
  const lastNavigationTime = useRef(0)

  // Debounced navigation to prevent rapid taps
  const handleNavigation = (route: string) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < 500) return // 500ms debounce

    lastNavigationTime.current = now

    if (onNavigate) {
      onNavigate(route)
    } else {
      router.push(route as any)
    }

    closeMenu()
  }

  // Debounced menu toggle
  const lastToggleTime = useRef(0)
  const toggleMenu = () => {
    const now = Date.now()
    if (now - lastToggleTime.current < 300) return // 300ms debounce

    lastToggleTime.current = now

    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const openMenu = () => {
    setIsOpen(true)
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false)
    })
  }

  // Hamburger icon component
  const HamburgerIcon = () => (
    <View style={{ width: 24, height: 24, justifyContent: 'space-around' }}>
      <View style={{ height: 3, backgroundColor: '#000', borderRadius: 2 }} />
      <View style={{ height: 3, backgroundColor: '#000', borderRadius: 2 }} />
      <View style={{ height: 3, backgroundColor: '#000', borderRadius: 2 }} />
    </View>
  )

  // Close icon component
  const CloseIcon = () => (
    <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          position: 'absolute',
          width: 20,
          height: 3,
          backgroundColor: '#000',
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: 20,
          height: 3,
          backgroundColor: '#000',
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  )

  // Settings icon component (simple gear placeholder)
  const SettingsIcon = () => (
    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#000' }} />
    </View>
  )

  const screenWidth = Dimensions.get('window').width
  const drawerWidth = Math.min(280, screenWidth * 0.75)

  return (
    <>
      {/* Closed state - hamburger button */}
      {!isOpen && (
        <TouchableOpacity
          onPress={toggleMenu}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 1000,
            backgroundColor: '#fff',
            padding: 12,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          activeOpacity={0.7}
        >
          <HamburgerIcon />
        </TouchableOpacity>
      )}

      {/* Open state - modal with drawer */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
        statusBarTranslucent
      >
        {/* Backdrop - tap to close */}
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={closeMenu}
        >
          {/* Drawer - prevent close on tap inside */}
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{ flex: 1, maxWidth: drawerWidth }}
          >
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                transform: [{ translateX: slideAnim }],
              }}
            >
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 40 }}
              >
                {/* Section 1: Header with close and settings */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    paddingTop: 50,
                    borderBottomWidth: 1,
                    borderBottomColor: '#333',
                  }}
                >
                  <TouchableOpacity onPress={closeMenu} activeOpacity={0.7}>
                    <CloseIcon />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleNavigation(ROUTES.SETTINGS)}
                    activeOpacity={0.7}
                  >
                    <SettingsIcon />
                  </TouchableOpacity>
                </View>

                {/* Section 2: Dashboard (most prominent) */}
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#333',
                    paddingVertical: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleNavigation(ROUTES.DASHBOARD)}
                    activeOpacity={0.7}
                    style={{ paddingHorizontal: 20 }}
                  >
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#000' }}>
                      Dashboard
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Section 3: Primary features */}
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#333',
                    paddingVertical: 16,
                  }}
                >
                  {SECTION_3_ITEMS.map((item, index) => (
                    <TouchableOpacity
                      key={item.route}
                      onPress={() => handleNavigation(item.route)}
                      activeOpacity={0.7}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                      }}
                    >
                      <Text style={{ fontSize: 18, color: '#000' }}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Section 4: Secondary features */}
                <View style={{ paddingVertical: 16 }}>
                  {SECTION_4_ITEMS.map((item, index) => (
                    <TouchableOpacity
                      key={item.route}
                      onPress={() => handleNavigation(item.route)}
                      activeOpacity={0.7}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                      }}
                    >
                      <Text style={{ fontSize: 16, color: '#000' }}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </Animated.View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}
