import React from 'react'
import { View, Text, ScrollView } from 'react-native'

export default function RightPeopleRightSeatsScreen() {
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
          Right People, Right Seats
        </Text>

        {/* Introduction */}
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 32,
          color: '#333'
        }}>
          The Right People, Right Seats concept is a cornerstone of the Traction methodology.
          It ensures your team is both culturally aligned and positioned for maximum effectiveness.
        </Text>

        {/* Right People Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Right People
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            Right People are those who share your company's core values. They are:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Aligned with your organization's culture and beliefs
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Enthusiastic about your mission and vision
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Demonstrating your core values consistently
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • Contributing positively to team dynamics
            </Text>
          </View>
        </View>

        {/* Right Seats Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Right Seats
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            Right Seats means each person has the role where they can excel. This is evaluated using GWC:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>Get it:</Text> They understand the role, its responsibilities, and how it fits into the bigger picture
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>Want it:</Text> They genuinely desire to do the job and are passionate about the work
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              <Text style={{ fontWeight: 'bold' }}>Capacity to do it:</Text> They have the time, skills, and mental/emotional bandwidth to perform at a high level
            </Text>
          </View>
        </View>

        {/* How They Work Together */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            How They Work Together
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            Having the Right People in the Right Seats creates a powerful combination:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Cultural fit + Role fit = Maximum performance
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Reduced conflict and friction
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Higher job satisfaction and retention
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • Accelerated achievement of company goals
            </Text>
          </View>
        </View>

        {/* Evaluation Process */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Evaluating Your Team
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            To assess if someone is in the right place:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>1. Right Person Check:</Text> Do they consistently demonstrate your core values? Are they a culture fit?
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>2. Right Seat Check:</Text> Do they Get it, Want it, and have the Capacity to do their role?
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              <Text style={{ fontWeight: 'bold' }}>3. Both must be "yes":</Text> If either is no, action is required - coaching, repositioning, or separation
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
            Use this framework when hiring new team members and assessing current employees.
            It provides clarity on personnel decisions and ensures everyone is positioned to
            contribute their best work while embodying your company's values. Regular evaluation
            of Right People, Right Seats helps maintain organizational health and momentum.
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
