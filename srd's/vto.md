# VTO Screen

## Purpose (Context)
Display and edit the company's Vision/Traction Organizer (VTO) - a single-page strategic plan. The VTO contains multiple sections (core values, core focus, 10-year target, etc.) that define the company's vision and direction. This is a high-visibility, presentation-focused document that leadership references frequently.

---

## Routing (INVARIANT)
**Incoming:**
- From menu navigation (VTO option selected)

**Outgoing:**
- To other screens via menu navigation

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `vto` with one record containing multiple columns
- Each column represents a VTO section with a title (column name) and description (column value)
- Example columns might include: `core_values`, `core_focus`, `ten_year_target`, `marketing_strategy`, `three_year_picture`, `one_year_plan`, etc.

### Probably Needed (Research Required)
- Last updated timestamp - track when sections were modified
- Version history - track changes over time
- Multiple VTO records for different time periods
- Section ordering - define sequence of sections on screen

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices. If multiple records exist in vto table, display only the first one.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- Menu component from `/components/global` for navigation

### Layout Structure
Vertically stacked VTO sections in formal, presentational layout. Each section displays title and description. Full screen is scrollable.

**Visual hierarchy:**
- Each VTO section: Large title, body description text below
- Sections flow vertically down the page
- Formal, document-like presentation

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Screen size changes
**How:** Sections reflow to maintain readability, text scales appropriately

### Screen States
**Known states:**
- Loaded (VTO sections displayed)
- Loading
- Edit mode (EditVtoSection component visible)
- Empty (no VTO record exists)

**Unknown states:** Multiple VTO records handling - implement as needed

---

## Components (SPECIFIC)

### VtoSections
**What component should accomplish**
User views the company's VTO in a formal, presentational format. Each VTO section shows its title prominently with description below. User can long-press any section to edit its description. This is a high-visibility strategic document that should feel important and well-organized.

**Data:** 
- Fetches: First record from `vto` table
- Displays: All columns as sections (column name = title, column value = description)
- Mutations: Update section descriptions

**Position:** Full screen scrollable area below menu

**Actions:**
- User scrolls → views all VTO sections
- User long-presses section → EditVtoSection component appears with that section's data
- User edits and saves → section description updates
- User cancels edit → component closes without saving

**States:**
- Default (sections displayed)
- Loading
- Empty (no VTO record)
- Edit active (EditVtoSection visible)

**Backend needs:** 
- Query: `SELECT * FROM vto LIMIT 1` (get first record)
- Update: `UPDATE vto SET [column_name] = ? WHERE id = ?` (update specific section)

---

### EditVtoSection Component
**What component should accomplish**
User edits the description of a specific VTO section in a focused modal. The section title is displayed at top (read-only), description is in an editable text box pre-filled with current value. User can save changes or cancel. Modal dims the background to focus attention.

**Data:** 
- Receives: Section title (column name), current description (column value), column identifier
- Edits: Description text
- Mutations: Update specific column in vto record

**Position:** Centered modal overlay with dimmed background

**Actions:**
- Component opens → displays title, pre-filled description text box, Save/Cancel buttons
- User edits description → updates local state
- User clicks "Save" (accent color button) → saves to database → closes modal
- User clicks "Cancel" → discards changes → closes modal
- User clicks outside modal → discards changes → closes modal

**States:**
- Edit mode (default when visible)
- Saving
- Error (save failed)

**Backend needs:** 
- Update: `UPDATE vto SET [section_column] = ? WHERE id = ?`

---

## User Flow (NARRATIVE)
1. User navigates to VTO screen from menu
2. User sees company VTO displayed in formal, presentational layout with multiple sections
3. Each section shows large title (e.g., "Core Values", "10-Year Target") with description text below
4. User scrolls through all VTO sections, reviewing strategic plan
5. **To edit a section:**
   - Long-presses on specific section
   - EditVtoSection modal appears, dimming background
   - Sees section title at top (read-only)
   - Sees description in editable text box (pre-filled)
   - Edits description text
   - Clicks "Save" (accent color) → changes saved → modal closes
6. **To cancel editing:**
   - Clicks "Cancel" button → modal closes without saving
   - Clicks outside modal → modal closes without saving
7. Updated section now displays new description
8. User navigates away via menu when finished

---

## Notes & Considerations
- **Single record assumption:** Screen displays first record if multiple exist, but VTO table should only contain one active record
- **Column mapping:** Each column in the vto record becomes a section (column name = title, value = description)
- **Long-press threshold:** Define duration (e.g., 500ms) for activation
- **Presentational focus:** This is a high-visibility strategic document - design should feel formal and important
- **Section ordering:** Define how sections are ordered on screen (database column order? custom ordering?)
- **Title formatting:** Column names may need formatting (e.g., `core_values` → "Core Values")
- **Text length:** VTO descriptions can be lengthy - ensure text box in edit modal accommodates this
- **Validation:** Prevent empty descriptions or require minimum content
- **Modal behavior:** Background dimmed, clicks outside close modal
- **Save feedback:** Confirm successful save visually
- **Empty state:** Handle case where no VTO record exists
- **Accessibility:** Long-press needs alternative, modal keyboard navigation
- **Mobile considerations:** Text editing on mobile - ensure keyboard doesn't obscure content

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
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
-->
```