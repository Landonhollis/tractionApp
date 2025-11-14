import React from 'react'
import { View, Text, ScrollView } from 'react-native'

export default function MeetingAgendasScreen() {
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
          Meeting Agendas
        </Text>

        {/* Introduction */}
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 32,
          color: '#333'
        }}>
          Effective meetings are essential to implementing Traction. Each meeting type has a
          specific structure and purpose designed to keep your team aligned, focused, and productive.
        </Text>

        {/* Level 10 Meeting Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Level 10 Meeting
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            The weekly team meeting designed to keep everyone on the same page. Duration: 90 minutes.
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Segue (5 min):</Text> Good news, personal and professional
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Scorecard Review (5 min):</Text> Review weekly numbers
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Rock Review (5 min):</Text> Check progress on quarterly priorities
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Customer/Employee Headlines (5 min):</Text> Key updates
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>To-Do List (5 min):</Text> Review last week's commitments
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>IDS (60 min):</Text> Identify, Discuss, Solve top 3 issues
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • <Text style={{ fontWeight: 'bold' }}>Conclude (5 min):</Text> Recap to-dos, cascading messages, rating
            </Text>
          </View>
        </View>

        {/* Quarterly Planning Meeting Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Quarterly Planning Meeting
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            Leadership team meets every 90 days to set priorities and align. Duration: Full day off-site.
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Team Building:</Text> Strengthen relationships and trust
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Previous Quarter Review:</Text> Review rocks completion and wins
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>V/TO Review:</Text> Refresh vision and ensure alignment
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Issues List:</Text> Build and prioritize issues to solve
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Establish Rocks:</Text> Set 3-7 priorities for next quarter
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • <Text style={{ fontWeight: 'bold' }}>Wrap-up:</Text> Cascading messages and next steps
            </Text>
          </View>
        </View>

        {/* Annual Planning Meeting Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Annual Planning Meeting
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            Leadership team meets once per year for strategic planning. Duration: 2 days off-site.
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Team Building:</Text> Deep relationship and trust development
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Previous Year Review:</Text> Celebrate wins and learn from challenges
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>V/TO Update:</Text> Refresh all 8 sections including 3-year picture
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>1-Year Plan:</Text> Set annual goals and revenue targets
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Issues Solving:</Text> Major strategic issues
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • <Text style={{ fontWeight: 'bold' }}>Q1 Rocks:</Text> Establish first quarter priorities
            </Text>
          </View>
        </View>

        {/* Same Page Meeting Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Same Page Meeting
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            Used for departmental teams or all-hands communication. Duration: 30-60 minutes.
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Share the Vision:</Text> Communicate company direction and strategy
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Share Your Quarterly Rocks:</Text> Communicate leadership priorities
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Review Customer/Employee Headlines:</Text> Important updates
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • <Text style={{ fontWeight: 'bold' }}>Share Your To-Do List:</Text> Company-wide commitments
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • <Text style={{ fontWeight: 'bold' }}>Q&A:</Text> Open forum for questions and clarification
            </Text>
          </View>
        </View>

        {/* Meeting Best Practices Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Meeting Best Practices
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            To get the most from these meeting formats:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Start and end on time - respect everyone's schedule
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Come prepared - review materials beforehand
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Stay present - no phones, laptops (unless needed for the meeting)
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Rate the meeting - score 1-10 to improve over time
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • Follow the agenda - structure creates productivity
            </Text>
          </View>
        </View>

        {/* Closing Text */}
        <View>
          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
          }}>
            Consistent use of these meeting structures creates organizational discipline, improves
            communication, and accelerates progress toward your goals. The key is following the
            agenda, respecting the time boxes, and maintaining the discipline week after week.
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
