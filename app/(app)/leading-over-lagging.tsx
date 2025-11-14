import React from 'react';
import { View, Text, ScrollView } from 'react-native';

type LeadingOverLaggingContentProps = {};

export default function LeadingOverLaggingScreen() {
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
        <LeadingOverLaggingContent />
      </ScrollView>
    </View>
  );
}

function LeadingOverLaggingContent({}: LeadingOverLaggingContentProps) {
  return (
    <View style={{ flex: 1 }}>
      {/* Title */}
      <Text style={{
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#000'
      }}>
        Leading Over Lagging Indicators
      </Text>

      {/* Introduction */}
      <Text style={{
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 32,
        color: '#333'
      }}>
        Understanding the difference between leading and lagging indicators is critical for effective business management.
        While both are important, focusing on leading indicators gives you the power to influence outcomes rather than
        simply measuring them after the fact.
      </Text>

      {/* Lagging Indicators Section */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '600',
          marginBottom: 16,
          color: '#000'
        }}>
          Lagging Indicators
        </Text>
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 12,
          color: '#333'
        }}>
          Lagging indicators are results-oriented metrics that measure outcomes after they've already occurred.
          They tell you what happened but provide limited insight into how to change future results.
        </Text>
        <Text style={{
          fontSize: 17,
          fontWeight: '500',
          marginBottom: 8,
          color: '#000'
        }}>
          Examples:
        </Text>
        <View style={{ marginLeft: 16, marginBottom: 8 }}>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Revenue</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Profit</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Customer satisfaction scores</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Number of new customers</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Quarterly sales totals</Text>
        </View>
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          fontStyle: 'italic',
          color: '#555'
        }}>
          Lagging indicators show you the scoreboard, but the game is already over.
        </Text>
      </View>

      {/* Leading Indicators Section */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '600',
          marginBottom: 16,
          color: '#000'
        }}>
          Leading Indicators
        </Text>
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 12,
          color: '#333'
        }}>
          Leading indicators are predictive, activity-based metrics that measure the actions and behaviors that
          drive future results. By tracking and influencing these activities, you can proactively impact your lagging indicators.
        </Text>
        <Text style={{
          fontSize: 17,
          fontWeight: '500',
          marginBottom: 8,
          color: '#000'
        }}>
          Examples:
        </Text>
        <View style={{ marginLeft: 16, marginBottom: 8 }}>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Number of sales calls made</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Proposals sent</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Website traffic</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Email open rates</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Customer meetings scheduled</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>• Product demos delivered</Text>
        </View>
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          fontStyle: 'italic',
          color: '#555'
        }}>
          Leading indicators show you what actions to take while you can still influence the outcome.
        </Text>
      </View>

      {/* Why Leading Matters More Section */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '600',
          marginBottom: 16,
          color: '#000'
        }}>
          Why Focus on Leading Indicators?
        </Text>
        <View style={{ marginLeft: 16, marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            <Text style={{ fontWeight: '600' }}>1. Actionable: </Text>
            Leading indicators tell your team exactly what to do today. If sales are down, telling someone
            "increase revenue" is useless. Telling them "make 20 sales calls this week" is actionable.
          </Text>
          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            <Text style={{ fontWeight: '600' }}>2. Controllable: </Text>
            Your team has direct control over their activities (leading indicators) but limited control over
            immediate results (lagging indicators).
          </Text>
          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            <Text style={{ fontWeight: '600' }}>3. Predictive: </Text>
            When tracked consistently, leading indicators reliably predict lagging indicator outcomes, allowing
            you to course-correct before problems become visible in results.
          </Text>
          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
            color: '#333'
          }}>
            <Text style={{ fontWeight: '600' }}>4. Motivating: </Text>
            People can see daily progress on leading indicators, creating momentum and accountability.
          </Text>
        </View>
      </View>

      {/* Application Section */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '600',
          marginBottom: 16,
          color: '#000'
        }}>
          Application in Your Business
        </Text>
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 12,
          color: '#333'
        }}>
          In the Traction methodology, your Scorecard should contain 5-15 leading indicators per person or department.
          These numbers should be tracked weekly and reviewed in your Level 10 Meetings.
        </Text>
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 12,
          color: '#333'
        }}>
          For each role or department, identify the 5-15 most important activities that, when done consistently,
          will drive the results you want. Make these measurable and assign clear ownership.
        </Text>
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '500',
          color: '#000'
        }}>
          Remember: If the number is trending in the wrong direction, you have time to fix it before it impacts
          your lagging indicators.
        </Text>
      </View>

      {/* Key Takeaway */}
      <View style={{
        marginBottom: 32,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 8,
          color: '#000'
        }}>
          Key Takeaway
        </Text>
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          color: '#333'
        }}>
          While lagging indicators tell you where you've been, leading indicators show you where you're going
          and give you the power to change course. Track the activities, and the results will follow.
        </Text>
      </View>
    </View>
  );
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
