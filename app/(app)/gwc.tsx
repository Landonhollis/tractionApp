import React from 'react'
import { View, Text, ScrollView } from 'react-native'

export default function GWCScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 80,
          paddingHorizontal: 24,
          paddingBottom: 40
        }}
      >
        {/* Title */}
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 16,
          color: '#000'
        }}>
          GWC Protocol
        </Text>

        {/* Introduction */}
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 32,
          color: '#333'
        }}>
          GWC (Get it, Want it, Capacity to do it) is a simple yet powerful framework from the Traction
          methodology for evaluating whether someone is right for a role. All three components must be
          present for someone to truly excel in their position.
        </Text>

        {/* Get It Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Get It
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            "Get it" means the person understands the role at a conceptual level. They grasp:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • What the role requires and its responsibilities
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • How their work fits into the bigger picture
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • The expectations and standards for success
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • The natural flow and rhythm of the work
            </Text>
          </View>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
          }}>
            When someone "gets it," you don't need to explain things repeatedly. They intuitively
            understand what needs to be done and why.
          </Text>
        </View>

        {/* Want It Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Want It
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            "Want it" is about genuine desire and passion for the work. Someone who wants it:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Is energized by the responsibilities of the role
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Shows enthusiasm and initiative
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Doesn't need to be pushed or motivated externally
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • Finds fulfillment in the work itself
            </Text>
          </View>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
          }}>
            You can't create "want it" - it either exists naturally or it doesn't. People who
            want their role bring positive energy that spreads to the entire team.
          </Text>
        </View>

        {/* Capacity Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Capacity to Do It
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            "Capacity" encompasses the practical ability to perform. This includes:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Time - They have the bandwidth in their schedule
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Skills - They possess or can develop the necessary competencies
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Mental/emotional capacity - They have the resilience and focus
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • Physical capacity - They can handle the demands of the role
            </Text>
          </View>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
          }}>
            Someone might get it and want it, but if they lack the capacity, they'll struggle
            and underperform. Capacity is about matching role demands with available resources.
          </Text>
        </View>

        {/* All Three Required */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            All Three Are Required
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            For someone to be truly successful in their role, they must have all three components:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Get it + Want it (no capacity) = Burnout and frustration
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Get it + Capacity (no want) = Mediocre performance and disengagement
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Want it + Capacity (no get it) = Wasted effort and wrong priorities
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • All three together = Excellence and fulfillment
            </Text>
          </View>
        </View>

        {/* Application */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Application
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
          }}>
            Use GWC when evaluating candidates for hiring, assessing current team members, or
            considering role changes. Ask yourself honestly: Does this person Get it? Want it?
            Have the Capacity to do it? If the answer to any is no, address that gap through
            coaching, repositioning, or finding someone who has all three. This simple framework
            prevents countless performance issues and helps everyone find their right seat.
          </Text>
        </View>
      </ScrollView>
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
