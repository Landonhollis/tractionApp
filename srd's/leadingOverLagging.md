# Leading Over Lagging Screen
[complete]

## Purpose (Context)
Display educational content about the Leading Over Lagging Indicators protocol from the Traction methodology. This is a reference/learning screen with no interaction beyond reading.

---

## Routing (INVARIANT)
**Incoming:**
- From menu navigation

**Outgoing:**
- To other screens via menu navigation

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Static hardcoded content: Leading Over Lagging Indicators summary organized into clear sections
- Content should be: hardcoded directly in the component (no external files, no API calls)

### Probably Needed (Research Required)
- None - this is static hardcoded content display only

**Note:** Agent should NOT spend time researching extensively. Use a simple, organized summary of the concept hardcoded into the component.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- Menu component from `/components/global` for navigation

### Layout Structure
Full-screen scrollable content area with presentational text layout. Focus on readability and visual appeal over data-driven organization.

**Visual hierarchy:**
- Flowing content sections
- Typography-driven design
- Generous whitespace
- Visual breaks between concepts

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Screen size changes, text scaling preferences
**How:** Content reflows naturally, maintains readability across all viewport sizes

### Screen States
**Known states:**
- Loaded (default - content visible)
- Scrolling

**Unknown states:** None expected - static content only

---

## Components (SPECIFIC)

### LeadingOverLaggingContent
**What component should accomplish**
User navigates to this screen via menu and reads educational content about Leading Over Lagging Indicators. They scroll through the content at their own pace, absorbing the concept and its application. No actions required beyond reading and scrolling.

**Data:** 
- Displays: Hardcoded organized summary of Leading vs Lagging Indicators concept
- Content structure: Title, brief intro, explanation of lagging indicators, explanation of leading indicators, why leading matters more, brief application note
- Keep it simple and organized - don't over-research

**Position:** Full screen scrollable area below menu

**Actions:**
- User scrolls → reveals more content
- User navigates away via menu → returns to menu system

**States:**
- Default (content visible and scrollable)

**Backend needs:** None - static hardcoded content only

---

## User Flow (NARRATIVE)
1. User navigates to Leading Over Lagging screen from menu
2. User sees presentational layout of Leading Over Lagging Indicators explanation
3. User scrolls through content, reading organized summary about:
   - What are lagging indicators (results/outcomes that already happened)
   - What are leading indicators (predictive actions/activities)
   - Why focus on leading indicators
   - Examples of each type
   - Brief application note for tracking business metrics
4. User finishes reading and navigates elsewhere via menu

---

## Notes & Considerations
- **Content:** Simple hardcoded summary - agent should NOT spend time researching extensively
- **Accessibility:** Ensure proper text contrast, readable font sizes, screen reader support
- **Typography:** Prioritize readability - line height, font size, text width
- **Design direction:** Presentational and pleasing over structured/data-like
- **Scrolling:** Ensure smooth scroll behavior, consider subtle scroll indicators
- **No interaction needed:** This is pure content consumption
- **Keep it simple:** Organized bullet-style summary is fine, doesn't need to be elaborate

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Presentational, editorial, magazine-like feel.
Think modern digital publication rather than app screen.
Typography is the hero - use hierarchy, weight, spacing to create visual interest.
Generous whitespace, confident layout choices.
Should feel like quality educational content, not a dense reference doc.
Consider pull quotes, visual separators, subtle accents to break up text.
This is about making learning feel premium and engaging.
-->
```