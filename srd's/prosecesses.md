# Processes Screen

## Purpose (Context)
Central hub for managing company processes. Users can view all documented processes in a presentational format, and add, edit, or delete processes as needed. This supports the Traction methodology's emphasis on documenting core processes.

---

## Routing (INVARIANT)
**Incoming:**
- From menu navigation (Processes option selected)

**Outgoing:**
- To other screens via menu navigation

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `processes` with columns: `id, name, description, created_at, updated_at`
- `name`: Process title/name
- `description`: Process details/steps

### Probably Needed (Research Required)
- Owner/responsible person field - track who owns each process
- Department/category field - organize processes by area
- Status field - draft, active, archived
- Order/priority field - sequence processes
- Last reviewed date - track process maintenance
- Attachments/links - reference external documentation

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- Menu component from `/components/global` for navigation

### Layout Structure
Scrollable list of process sections with floating "Add Process" button in bottom left. Each process is its own distinct section with presentational formatting.

**Visual hierarchy:**
- Process sections stacked vertically
- Each section: Process name (prominent), process description (formatted)
- Bottom left: Fixed "Add Process" button (green)
- Overlay: Edit/Delete popup when process long-pressed
- Modal: EditProcess component when editing

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Screen size changes, keyboard appearance (in edit mode)
**How:** Process sections reflow, edit modal adapts to viewport

### Screen States
**Known states:**
- Default (processes displayed)
- Empty (no processes)
- Loading
- Long-press active (edit/delete popup visible for specific process)
- Edit mode (EditProcess component visible)

**Unknown states:** Sync states, partial load failures - implement as needed

---

## Components (SPECIFIC)

### ProcessList
**What component should accomplish**
User sees all company processes displayed in an appealing, formal presentation format. They can scan through processes, long-press any process to edit or delete it, or add new processes via the floating button.

**Data:** 
- Fetches: All records from `processes` table
- Displays: `name` and `description` for each process
- Mutations: Create, update, delete processes

**Position:** Full screen scrollable area below menu

**Actions:**
- User scrolls → views all processes
- User long-presses process section → edit/delete popup appears for that process
- User clicks "Edit Process" in popup → EditProcess component opens with process data pre-filled
- User clicks "Delete Process" in popup → "Are you sure?" confirmation → deletes process on confirmation
- User clicks anywhere outside popup → popup dismisses
- User clicks "Add Process" button (bottom left) → new process created in DB → EditProcess component opens for new process

**States:**
- Default (processes displayed)
- Empty (no processes yet)
- Loading
- Popup active (for specific process)

**Backend needs:** 
- Query: `SELECT * FROM processes ORDER BY created_at DESC` (or other ordering)
- Insert: Create new empty/template process
- Delete: Remove process by id

---

### AddProcessButton
**What component should accomplish**
Floating action button that allows users to quickly add a new process from anywhere on the screen.

**Data:** 
- Triggers: Process creation in database

**Position:** Fixed bottom left of screen

**Actions:**
- User clicks button → creates new process in DB → opens EditProcess component

**States:**
- Default (visible and clickable)
- Hidden (when EditProcess component is open)

**Backend needs:** 
- Insert: Create new process record

---

### EditProcess Component
**What component should accomplish**
User edits the name and description of a process in a focused modal interface. They can save changes with "Done" button or delete the process with "Delete" button. Component pre-fills with existing data when editing, or appears empty for new processes.

**Data:** 
- Receives: Process `id`, `name`, `description`
- Edits: `name`, `description` fields
- Mutations: Update or delete process

**Position:** Modal overlay (full screen or centered card)

**Actions:**
- User edits process name → updates local state
- User edits process description → updates local state
- User clicks "Done" button → saves changes to database → closes modal
- User clicks "Delete" button → "Are you sure?" confirmation → deletes process on "Yes" → closes modal
- User clicks outside modal or back/cancel → discards unsaved changes → closes modal

**States:**
- Edit mode (existing process)
- Create mode (new process)
- Saving
- Deleting

**Backend needs:** 
- Query: `SELECT * FROM processes WHERE id = ?` (if needed for refresh)
- Update: `UPDATE processes SET name = ?, description = ? WHERE id = ?`
- Delete: `DELETE FROM processes WHERE id = ?`

---

## User Flow (NARRATIVE)
1. User navigates to Processes screen from menu
2. User sees all company processes displayed in formal, presentational sections
3. **To view processes:**
   - Scrolls through list, reading process names and descriptions
4. **To add a process:**
   - Clicks green "Add Process" button (bottom left)
   - New empty process created in database
   - EditProcess component opens
   - Fills in process name and description
   - Clicks "Done" → saves → returns to process list
5. **To edit a process:**
   - Long-presses on process section
   - Popup appears with "Edit Process" and "Delete Process" buttons
   - Clicks "Edit Process"
   - EditProcess component opens with existing data pre-filled
   - Makes changes
   - Clicks "Done" → saves → returns to process list
6. **To delete a process:**
   - Long-presses on process section
   - Popup appears with "Edit Process" and "Delete Process" buttons
   - Clicks "Delete Process"
   - "Are you sure?" confirmation appears
   - Clicks "Yes" → process deleted → popup closes
7. **To dismiss popup:**
   - Clicks anywhere else on screen → popup closes
8. User navigates away via menu when finished

---

## Notes & Considerations
- **Long-press threshold:** Define duration (e.g., 500ms) for activation
- **Popup behavior:** Only one popup active at a time, dismisses when clicking outside
- **Add process flow:** Creates process in DB immediately, then opens editor (unusual pattern - consider if this is intentional vs creating on "Done")
- **Validation:** Process name required, description optional or required?
- **Empty state:** Clear messaging and prominent "Add Process" call-to-action
- **Confirmation messages:** "Are you sure?" for delete actions (both in popup and in EditProcess component)
- **Unsaved changes:** Handle case where user closes EditProcess without saving
- **Presentational formatting:** Process name should be prominent, description should be well-formatted and readable
- **Process ordering:** Define sort order (created_at? alphabetical? custom order field?)
- **Accessibility:** Long-press needs alternative interaction method, ensure modal keyboard navigation
- **Performance:** Consider pagination or lazy loading if many processes exist

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Formal, presentational, professional.
Processes should feel like important documentation - use typography to convey authority.
Each process section should feel like a distinct document or card.
Green "Add Process" button should be inviting but not dominate the interface.
Long-press popup should feel contextual and lightweight.
EditProcess modal should feel focused and distraction-free.
Consider subtle visual separation between processes (borders, shadows, spacing).
This is professional reference material that should inspire confidence.
-->
```