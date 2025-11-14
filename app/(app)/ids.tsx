import React from 'react'
import { View, Text, ScrollView } from 'react-native'

export default function IDSScreen() {
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
          IDS Protocol
        </Text>

        {/* Introduction */}
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 32,
          color: '#333'
        }}>
          IDS stands for Identify, Discuss, Solve. It's a simple three-step protocol from the
          Traction methodology for addressing issues efficiently and effectively in meetings.
          This structured approach prevents teams from getting stuck in the "discuss" phase
          and ensures every issue moves toward resolution.
        </Text>

        {/* Identify Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Identify
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            The first step is clearly identifying and stating the real issue. This means:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Getting to the root cause, not just symptoms
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Ensuring everyone understands what the issue actually is
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Stating it clearly and concisely
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • Confirming the team agrees on the real issue before moving forward
            </Text>
          </View>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
          }}>
            Many teams rush past this step, but taking time to properly identify the issue
            prevents wasted discussion on the wrong problem.
          </Text>
        </View>

        {/* Discuss Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Discuss
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            Once the issue is identified, briefly discuss it. Key points:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Keep it focused and brief
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Share relevant perspectives and information
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Explore options and implications
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • Avoid getting stuck in analysis paralysis
            </Text>
          </View>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
          }}>
            The discussion should provide enough context and perspective to make a good decision,
            but not devolve into endless debate. When you have enough information, move to solve.
          </Text>
        </View>

        {/* Solve Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Solve
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            The final step is determining the solution and next actions:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Agree on a clear solution or next step
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Assign specific action items with owners
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Set deadlines for completion
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • Remove the issue from the list (it's now an action item)
            </Text>
          </View>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
          }}>
            The solve step is about making a decision and creating accountability. Every issue
            that goes through IDS should result in concrete action items with owners, or a
            decision that no action is needed.
          </Text>
        </View>

        {/* Application Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#000'
          }}>
            Application in Meetings
          </Text>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            Use IDS during your Level 10 meetings and other team discussions:
          </Text>

          <View style={{ paddingLeft: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Work through issues one at a time using the three steps
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Don't skip steps or try to discuss before identifying
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 }}>
              • Keep the team disciplined - if discussion drags, move to solve
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
              • Capture all action items and owners as you solve each issue
            </Text>
          </View>

          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#333'
          }}>
            The IDS protocol creates momentum and ensures your issue-solving sessions are
            productive. It prevents common meeting pitfalls like discussing the wrong problem,
            getting stuck in endless discussion, or failing to assign clear next steps.
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
