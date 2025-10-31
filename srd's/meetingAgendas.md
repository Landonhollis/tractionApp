# Meeting Agendas Screen
[complete]

## Purpose (Context)
Display educational content about various meeting agendas from the Traction methodology. This is a reference/learning screen showing multiple meeting types and their structures with no interaction beyond reading.
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
- Static hardcoded content: Meeting agendas summaries organized into clear sections
- Content should be: hardcoded directly in the component (no external files, no API calls)
- Each meeting type gets its own section

### Probably Needed (Research Required)
- None - this is static hardcoded content display only

**Note:** Agent should NOT spend time researching meeting agendas extensively. Use a simple, organized summary of the different meeting types hardcoded into the component.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- Menu component from `/components/global` for navigation

### Layout Structure
Full-screen scrollable content area with presentational text layout. Multiple meeting agenda sections stacked vertically. Focus on readability and visual appeal over data-driven organization.

**Visual hierarchy:**
- Flowing content sections
- Each meeting type clearly separated
- Typography-driven design
- Generous whitespace
- Visual breaks between meeting types

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

### MeetingAgendasContent
**What component should accomplish**
User navigates to this screen via menu and reads educational content about different Traction meeting agendas. They scroll through sections for each meeting type, learning the structure and purpose of each. No actions required beyond reading and scrolling.

**Data:** 
- Displays: Hardcoded organized summary of meeting agendas (Level 10, Quarterly, Annual, etc.)
- Content structure: Title, intro, then individual sections for each meeting type with brief description
- Keep it simple and organized - don't over-research

**Position:** Full screen scrollable area below menu

**Actions:**
- User scrolls → reveals more content sections
- User navigates away via menu → returns to menu system

**States:**
- Default (content visible and scrollable)

**Backend needs:** None - static hardcoded content only

---

## User Flow (NARRATIVE)
1. User navigates to Meeting Agendas screen from menu
2. User sees presentational layout with multiple meeting agenda sections
3. User scrolls through content, reading organized summaries about:
   - Level 10 Meeting agenda (weekly team meeting)
   - Quarterly Planning Meeting agenda
   - Annual Planning Meeting agenda
   - Other relevant Traction meeting types
4. Each section provides brief description of meeting purpose and structure
5. User finishes reading and navigates elsewhere via menu

---

## Notes & Considerations
- **Content:** Simple hardcoded summary - agent should NOT spend time researching extensively
- **Section separation:** Each meeting type should be visually distinct section
- **Accessibility:** Ensure proper text contrast, readable font sizes, screen reader support
- **Typography:** Prioritize readability - line height, font size, text width
- **Design direction:** Presentational and pleasing over structured/data-like
- **Scrolling:** Ensure smooth scroll behavior, consider subtle scroll indicators
- **No interaction needed:** This is pure content consumption
- **Keep it simple:** Organized sections with brief descriptions, doesn't need to be elaborate

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Presentational, editorial, magazine-like feel.
Think modern digital publication rather than app screen.
Typography is the hero - use hierarchy, weight, spacing to create visual interest.
Generous whitespace, confident layout choices.
Each meeting type section should feel distinct but cohesive.
Should feel like quality educational content, not a dense reference doc.
Consider pull quotes, visual separators, subtle accents to break up sections.
This is about making learning feel premium and engaging.
-->
```