# Rocks Screen

## Purpose (Context)
Central hub for managing all company rocks (quarterly goals/priorities) across three organizational levels: company-wide, departmental, and individual. Users can view, add, edit, and delete rocks at each level. This supports the Traction methodology's focus on setting and tracking quarterly priorities.

---

## Routing (INVARIANT)
**Incoming:**
- From menu navigation (Rocks option selected)

**Outgoing:**
- To other screens via menu navigation

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `rocks` with columns: `id, title, level, department, owner, owner_id, created_at, updated_at`
- Table: `user_names` with columns: `id, name` (for individual rock owners)
- `level` values: 'company', 'departmental', 'individual'
- `department`: nullable string for departmental rocks
- `owner`: user name string for individual rocks
- `owner_id`: foreign key to user_names table for individual rocks

### Probably Needed (Research Required)
- Status field - track rock completion (on track, off track, done)
- Due date field - when rock should be completed
- Description field - detailed rock information beyond title
- Priority/order field - sequence rocks within each level
- Created by / assigned by tracking
- Progress percentage or milestones

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- Menu component from `/components/global` for navigation

### Layout Structure
Vertically stacked rock level components. Entire screen is scrollable; individual components are not. Three-layer visual hierarchy using background colors to show grouping.

**Visual hierarchy:**
- Top: Company Rocks component (2 layers: component + rocks)
- Middle: Departmental Rocks component (3 layers: component + departments + rocks)
- Bottom: Individual Rocks component (3 layers: component + users + rocks)

Background colors create nested elevation effect, with consistent rock background across all components.

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Screen size changes
**How:** 
- Components grow/shrink vertically based on content
- Rock grids reflow responsively
- Rocks maintain square shape at all times
- No text truncation - all text displays fully

### Screen States
**Known states:**
- Loaded with rocks
- Empty (no rocks at any level)
- Loading
- Long-press popup active (edit/delete options)
- Edit mode (edit popup visible)

**Unknown states:** Partial load failures, sync states - implement as needed

---

## Components (SPECIFIC)

### CompanyRocks
**What component should accomplish**
User sees all company-level rocks displayed in a grid of squares. They can scan rocks, long-press any rock to edit or delete it, or use the Add button to create new company rocks. These represent the top quarterly priorities for the entire organization.

**Data:** 
- Fetches: All rocks where `level = 'company'`
- Displays: `title` of each rock
- Mutations: Create, update, delete rocks

**Position:** Top section of scrollable screen

**Actions:**
- User long-presses rock → popup appears with "Edit" and "Delete" buttons
- User clicks "Edit" → edit popup appears with rock details pre-filled
- User edits in popup → clicks "Done" → saves changes
- User clicks "Cancel" in edit popup → discards changes, closes popup
- User clicks "Delete" → confirmation → deletes rock
- User clicks "Add" button (top right) → edit popup appears for new company rock
- User clicks outside popup → popup dismisses

**States:**
- Default (rocks displayed in grid)
- Empty (no company rocks)
- Loading
- Long-press popup active
- Edit popup active

**Backend needs:** 
- Query: `SELECT * FROM rocks WHERE level = 'company'`
- Insert: Create new rock with level = 'company'
- Update: Edit existing rock
- Delete: Remove rock by id

---

### DepartmentalRocks
**What component should accomplish**
User sees all departmental rocks organized by department in a three-layer visual hierarchy. They can scan rocks by department, long-press any rock to edit or delete it, or use the Add button to create new departmental rocks with department selection.

**Data:** 
- Fetches: All rocks where `level = 'departmental'`
- Displays: `title`, grouped by `department`
- Mutations: Create, update, delete rocks

**Position:** Middle section of scrollable screen

**Actions:**
- User long-presses rock → popup appears with "Edit" and "Delete" buttons
- User clicks "Edit" → edit popup appears with rock details and department field pre-filled
- User edits in popup → clicks "Done" → saves changes
- User clicks "Cancel" in edit popup → discards changes, closes popup
- User clicks "Delete" → confirmation → deletes rock
- User clicks "Add" button (top right) → edit popup appears with department field for new rock
- User clicks outside popup → popup dismisses

**States:**
- Default (rocks displayed in grids, grouped by department)
- Empty (no departmental rocks)
- Loading
- Long-press popup active
- Edit popup active

**Backend needs:** 
- Query: `SELECT * FROM rocks WHERE level = 'departmental' ORDER BY department`
- Insert: Create new rock with level = 'departmental' and department value
- Update: Edit existing rock
- Delete: Remove rock by id

---

### IndividualRocks
**What component should accomplish**
User sees all individual rocks organized by person in a three-layer visual hierarchy. They can scan rocks by person, long-press any rock to edit or delete it, or use the Add button to create new individual rocks with owner selection from user dropdown.

**Data:** 
- Fetches: All rocks where `level = 'individual'`, joined with `user_names` table
- Displays: `title`, grouped by `owner` (using `user_name` from user_names table)
- Mutations: Create, update, delete rocks

**Position:** Bottom section of scrollable screen

**Actions:**
- User long-presses rock → popup appears with "Edit" and "Delete" buttons
- User clicks "Edit" → edit popup appears with rock details and owner dropdown pre-filled
- User selects owner from dropdown → populates `owner` and `owner_id` fields from user_names table
- User edits in popup → clicks "Done" → saves changes
- User clicks "Cancel" in edit popup → discards changes, closes popup
- User clicks "Delete" → confirmation → deletes rock
- User clicks "Add" button (top right) → edit popup appears with owner dropdown for new rock
- User clicks outside popup → popup dismisses

**States:**
- Default (rocks displayed in grids, grouped by user)
- Empty (no individual rocks)
- Loading
- Long-press popup active
- Edit popup active

**Backend needs:** 
- Query: `SELECT rocks.*, user_names.name FROM rocks JOIN user_names ON rocks.owner_id = user_names.id WHERE rocks.level = 'individual' ORDER BY user_names.name`
- Query: `SELECT * FROM user_names` (for owner dropdown)
- Insert: Create new rock with level = 'individual', owner, and owner_id
- Update: Edit existing rock
- Delete: Remove rock by id

---

## User Flow (NARRATIVE)
1. User navigates to Rocks screen from menu
2. User sees three stacked sections: Company, Departmental, and Individual rocks
3. User scrolls through all rocks across all levels
4. **To add a rock:**
   - Clicks "Add" button in top right of desired level component
   - Edit popup appears with appropriate fields (department for departmental, owner dropdown for individual)
   - Fills in rock details
   - Clicks "Done" → new rock appears in grid
5. **To edit a rock:**
   - Long-presses on specific rock square
   - Popup appears with "Edit" and "Delete" buttons
   - Clicks "Edit"
   - Edit popup appears with existing data pre-filled
   - Makes changes
   - Clicks "Done" → rock updates in grid
6. **To delete a rock:**
   - Long-presses on specific rock square
   - Popup appears with "Edit" and "Delete" buttons
   - Clicks "Delete"
   - Confirmation appears
   - Confirms → rock removed from grid
7. **To cancel editing:**
   - Clicks "Cancel" in edit popup → popup closes without saving
   - Clicks outside popup → popup dismisses
8. User navigates away via menu when finished

---

## Notes & Considerations
- **Long-press threshold:** Define duration (e.g., 500ms) for activation
- **Square rocks:** Maintain square aspect ratio at all responsive sizes
- **Layered backgrounds:** 
  - Company Rocks: 2 layers (component + rocks)
  - Departmental Rocks: 3 layers (component + department sections + rocks)
  - Individual Rocks: 3 layers (component + user sections + rocks)
  - Rock background color consistent across all three components
  - Creates visual grouping and hierarchy
- **No text truncation:** All rock titles display fully, no line limits
- **Grid layout:** Rocks arranged in responsive grid, maintaining square shape
- **Validation:** Rock title required, department required for departmental, owner required for individual
- **User dropdown:** Populated from user_names table for individual rocks
- **Empty states:** Clear messaging when no rocks exist at any level
- **Confirmation messages:** "Are you sure?" for delete actions
- **Popup dismissal:** Click outside popup to close
- **Accessibility:** Long-press needs alternative, keyboard navigation in popups
- **Performance:** Consider pagination if rock count grows very large

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Clean, structured, visually hierarchical.
The three-layer background color system is critical - creates clear visual grouping.
Square rocks are distinctive - this is intentional, makes them feel like building blocks.
Grid layout should feel organized and scannable.
Company rocks stand out with one less layer - appropriate given their importance.
Department and user name headers create clear organization.
This is goal-tracking interface - prioritize clarity and quick scanning over decoration.
Consider subtle shadows or elevation cues to reinforce layer hierarchy.
-->
```