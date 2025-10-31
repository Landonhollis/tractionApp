# Accountability Chart Screen
[complete]
## Complexity Level
**[ ] Simple** - Standard CRUD, basic UI, Supabase + RN Reusables only
**[X] Complex** - Check this if: external APIs, payments, real-time features, custom packages likely needed, or non-trivial business logic

*Note: Requires canvas/whiteboard functionality with pan/zoom, drag-and-drop, line rendering, and coordinate persistence. Research packages for React Native canvas manipulation.*

---

## Purpose (Context)
Provides users with an interactive visual representation of company hierarchy and structure. Users can create, position, and connect organizational nodes to map reporting relationships and accountability chains.

---

## Routing (INVARIANT)
**Incoming:**
- From Menu via "Accountability Chart" selection

**Outgoing:**
- To [any other menu screen] via menu navigation

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `accountability_nodes` with columns: `id, title, names, description, x_position, y_position`
- Table: `accountability_lines` with columns: `id, start_x, start_y, end_x, end_y, start_node_id, end_node_id`

### Probably Needed (Research Required)
- Relationship fields: `who_is_above` and `who_is_below` mentioned in edit form - clarify if these are stored as text fields or foreign key relationships to other nodes
- Canvas viewport state: May need to persist zoom level and pan position per user
- Line styling properties: thickness, color, or type (solid/dashed) if visual differentiation needed
- Ordering/layering: z-index or layer_order if nodes can overlap

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- None specified - this is a custom canvas screen

### Layout Structure
Fixed-size zoomable/pannable whiteboard canvas with textured background to provide spatial orientation. Action buttons fixed at bottom corners overlaying the canvas.

**Visual hierarchy:**
- Main area: Interactive canvas (full screen, zoomable, pannable)
- Bottom-right overlay: "Add Position" button
- Bottom-left overlay: "Add Line" button
- Floating overlay (conditional): Edit node modal or description popup

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Pinch-to-zoom gestures, two-finger pan, screen size changes
**How:** AI decides - ensure smooth canvas manipulation and button accessibility

### Screen States
**Known states:**
- empty (no nodes/lines created yet)
- populated (nodes and lines displayed)
- editing (edit modal open)
- viewing description (long-press popup visible)

**Unknown states:** Likely additional edge case states exist - implement as needed.

---

## Components (SPECIFIC)

### accountability_node
**What component should accomplish**
The user sees their organizational position displayed as a draggable box on the canvas. They can tap and drag to reposition it, creating their org chart layout. When they need details or want to edit, they long-press the node to see the description and access edit mode.

**Data:** 
- Displays: `title` (above), `names` (below title)
- Needs: `id, title, names, description, x_position, y_position` from `accountability_nodes` table

**Position:** Positioned at `x_position, y_position` coordinates on canvas (user-defined via drag)

**Actions:**
- User drags node → updates `x_position, y_position` in real-time, node follows finger
- User long-presses node → shows popup with `description` and "Edit" button
- User taps "Edit" in popup → opens `edit_accountability_node` component

**States:**
- Known: default, dragging, long-press popup visible
- Unknown: Handle edge cases as needed (e.g., selected, highlighted if connected)

**Backend needs:** Real-time position updates on drag end (debounced save recommended)

---

### edit_accountability_node
**What component should accomplish**
The user fills out or updates information about an organizational position. They see pre-filled data if editing an existing node, or empty fields if creating new. They can save changes, cancel, or delete the position entirely.

**Data:** 
- Displays/Edits: `title, names, description, who_is_above, who_is_below`
- Needs: Full record from `accountability_nodes` for the node being edited

**Position:** Modal overlay (centered on screen, above canvas)

**Actions:**
- User edits text fields → local state updates
- User taps "Cancel" → closes modal, discards changes
- User taps "Done" → saves changes to database, closes modal
- User taps "Delete" → deletes node record from database, removes from canvas, closes modal

**States:**
- Known: editing existing node, creating new node, saving, deleting
- Unknown: Handle validation errors, network failures

**Backend needs:** Update/create/delete operations on `accountability_nodes` table

---

### add_accountability_node
**What component should accomplish**
The user taps this button to create a new organizational position. A blank node appears on the canvas and the edit form opens immediately so they can define the position details.

**Data:** 
- Creates: New record in `accountability_nodes` with default/null values

**Position:** Fixed bottom-right corner of screen (overlays canvas)

**Actions:**
- User taps button → creates blank node at default canvas position, opens `edit_accountability_node` component for new node

**States:**
- Known: default, pressed
- Unknown: Handle creation failures

**Backend needs:** Create new `accountability_nodes` record

---

### add_accountability_line
**What component should accomplish**
The user taps this button to add a visual connection between positions. A line appears that they can drag and reposition to connect nodes, showing reporting relationships or accountability flows.

**Data:** 
- Creates: New record in `accountability_lines` with initial coordinates

**Position:** Fixed bottom-left corner of screen (overlays canvas)

**Actions:**
- User taps button → creates draggable line on canvas
- User drags line endpoints → updates line coordinates and visual rendering
- User positions endpoints on/near nodes → line connects to those nodes (snap behavior optional)

**States:**
- Known: default, pressed
- Unknown: Handle line manipulation states (dragging start point vs end point)

**Backend needs:** Create/update operations on `accountability_lines` table, coordinate persistence

---

## User Flow (NARRATIVE)
1. User arrives from menu by selecting "Accountability Chart"
2. User sees a textured whiteboard canvas with existing nodes and lines (if any), or empty canvas for first use
3. User can pan and zoom the canvas to navigate their org chart
4. User can tap "Add Position" to create new organizational nodes
5. User can tap "Add Line" to draw connections between positions
6. User can drag nodes to arrange the hierarchy visually
7. User can long-press nodes to view details or edit
8. User navigates away via menu to other screens

---

## Notes & Considerations
- **Coordinate system:** Need to define canvas coordinate space vs screen coordinate space for zoom/pan
- **Line rendering:** Research optimal approach for drawing/updating lines in React Native (SVG, Canvas, or custom solution)
- **Performance:** May need optimization for large org charts (virtualization, lazy rendering)
- **Validation:** Consider constraints on node deletion if connected by lines
- **Auto-save vs manual save:** Clarify if position changes save immediately or require explicit save action
- **Collaboration:** Consider if multiple users can edit simultaneously (locking mechanism may be needed)
- **who_is_above/who_is_below fields:** Clarify if these are free text or should be foreign keys to other nodes for data integrity

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Minimalistic and professional. Rounded boxes for nodes with clean typography. Subtle texture on canvas background for spatial orientation without distraction. Green accent for add buttons suggests growth and addition. Popups should feel lightweight and non-intrusive. Overall aesthetic should support focus on organizational structure rather than decorative elements.
-->
```