# Scorecards Screen

## Purpose (Context)
Central hub for managing all company metrics (measurables/scorecards) across three organizational levels: company-wide, departmental, and individual. Users can view, add, edit, and delete metrics at each level. Metrics are updated daily, so editing must be quick and easy. This supports the Traction methodology's focus on tracking key performance indicators.

---

## Routing (INVARIANT)
**Incoming:**
- From menu navigation (Scorecards option selected)

**Outgoing:**
- To other screens via menu navigation

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `metrics` with columns: `id, description, level, department, owner, owner_id, current_status, min, max, created_at, updated_at`
- Table: `user_names` with columns: `id, name` (for individual metric owners)
- `level` values: 'company', 'departmental', 'individual'
- `department`: nullable string for departmental metrics
- `owner`: user name string for individual metrics
- `owner_id`: foreign key to user_names table for individual metrics
- `current_status`: numeric value (updated frequently)
- `min` and `max`: numeric range boundaries for green/red status indication

### Probably Needed (Research Required)
- Unit field - what is being measured (dollars, leads, hours, etc.)
- Frequency field - daily, weekly, monthly tracking
- Goal/target field - aspirational value beyond min/max range
- Historical data - track metric values over time
- Created by / last updated by tracking
- Alert thresholds - notify when metrics go red

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- Menu component from `/components/global` for navigation

### Layout Structure
Vertically stacked metric level components. Entire screen is scrollable; individual components are not. Three-layer visual hierarchy using background colors to show grouping (similar to Rocks screen).

**Visual hierarchy:**
- Top: Company Metrics component (2 layers: component + metrics)
- Middle: Departmental Metrics component (3 layers: component + departments + metrics)
- Bottom: Individual Metrics component (3 layers: component + users + metrics)

Background colors create nested elevation effect, with consistent metric background across all components.

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Screen size changes
**How:** 
- Components grow/shrink vertically based on content
- Metric grids reflow responsively
- Metrics maintain square shape at all times
- No text truncation - all text displays fully

### Screen States
**Known states:**
- Loaded with metrics
- Empty (no metrics at any level)
- Loading
- Long-press popup active (edit/delete options)
- Edit mode (edit popup visible)

**Unknown states:** Partial load failures, sync states - implement as needed

---

## Components (SPECIFIC)

### CompanyMetrics
**What component should accomplish**
User sees all company-level metrics displayed in a grid of squares. They can scan metrics with status indicators (green/red based on min/max range), long-press any metric to edit or delete it, or use the Add button to create new company metrics. These represent the top KPIs for the entire organization. Metrics are updated frequently (daily), so editing must be fast and easy.

**Data:** 
- Fetches: All metrics where `level = 'company'`
- Displays: `description`, `current_status` with color indicator
- Validates: `current_status` against `min` and `max` for color coding
- Mutations: Create, update, delete metrics

**Position:** Top section of scrollable screen

**Actions:**
- User long-presses metric → popup appears with "Edit" and "Delete" buttons
- User clicks "Edit" → edit popup appears with metric details pre-filled (optimized for quick status updates)
- User edits current_status or other fields → clicks "Done" → saves changes
- User clicks "Cancel" in edit popup → discards changes, closes popup
- User clicks "Delete" → confirmation → deletes metric
- User clicks "Add" button (top right) → edit popup appears for new company metric
- User clicks outside popup → popup dismisses

**States:**
- Default (metrics displayed in grid with status colors)
- Empty (no company metrics)
- Loading
- Long-press popup active
- Edit popup active

**Backend needs:** 
- Query: `SELECT * FROM metrics WHERE level = 'company'`
- Insert: Create new metric with level = 'company'
- Update: Edit existing metric (frequently updated for daily tracking)
- Delete: Remove metric by id

---

### DepartmentalMetrics
**What component should accomplish**
User sees all departmental metrics organized by department in a three-layer visual hierarchy. They can scan metrics with status indicators by department, long-press any metric to edit or delete it, or use the Add button to create new departmental metrics with department selection. Daily updates are common, so editing must be streamlined.

**Data:** 
- Fetches: All metrics where `level = 'departmental'`
- Displays: `description`, `department`, `current_status` with color indicator
- Validates: `current_status` against `min` and `max` for color coding
- Mutations: Create, update, delete metrics

**Position:** Middle section of scrollable screen

**Actions:**
- User long-presses metric → popup appears with "Edit" and "Delete" buttons
- User clicks "Edit" → edit popup appears with metric details and department field pre-filled
- User edits current_status or other fields → clicks "Done" → saves changes
- User clicks "Cancel" in edit popup → discards changes, closes popup
- User clicks "Delete" → confirmation → deletes metric
- User clicks "Add" button (top right) → edit popup appears with department field for new metric
- User clicks outside popup → popup dismisses

**States:**
- Default (metrics displayed in grids, grouped by department, with status colors)
- Empty (no departmental metrics)
- Loading
- Long-press popup active
- Edit popup active

**Backend needs:** 
- Query: `SELECT * FROM metrics WHERE level = 'departmental' ORDER BY department`
- Insert: Create new metric with level = 'departmental' and department value
- Update: Edit existing metric (frequently updated for daily tracking)
- Delete: Remove metric by id

---

### IndividualMetrics
**What component should accomplish**
User sees all individual metrics organized by person in a three-layer visual hierarchy. They can scan metrics with status indicators by person, long-press any metric to edit or delete it, or use the Add button to create new individual metrics with owner selection from user dropdown. Daily tracking means editing must be efficient.

**Data:** 
- Fetches: All metrics where `level = 'individual'`, joined with `user_names` table
- Displays: `description`, `owner`, `current_status` with color indicator
- Validates: `current_status` against `min` and `max` for color coding
- Mutations: Create, update, delete metrics

**Position:** Bottom section of scrollable screen

**Actions:**
- User long-presses metric → popup appears with "Edit" and "Delete" buttons
- User clicks "Edit" → edit popup appears with metric details and owner dropdown pre-filled
- User selects owner from dropdown → populates `owner` and `owner_id` fields from user_names table
- User edits current_status or other fields → clicks "Done" → saves changes
- User clicks "Cancel" in edit popup → discards changes, closes popup
- User clicks "Delete" → confirmation → deletes metric
- User clicks "Add" button (top right) → edit popup appears with owner dropdown for new metric
- User clicks outside popup → popup dismisses

**States:**
- Default (metrics displayed in grids, grouped by user, with status colors)
- Empty (no individual metrics)
- Loading
- Long-press popup active
- Edit popup active

**Backend needs:** 
- Query: `SELECT metrics.*, user_names.name FROM metrics JOIN user_names ON metrics.owner_id = user_names.id WHERE metrics.level = 'individual' ORDER BY user_names.name`
- Query: `SELECT * FROM user_names` (for owner dropdown)
- Insert: Create new metric with level = 'individual', owner, and owner_id
- Update: Edit existing metric (frequently updated for daily tracking)
- Delete: Remove metric by id

---

## User Flow (NARRATIVE)
1. User navigates to Scorecards screen from menu
2. User sees three stacked sections: Company, Departmental, and Individual metrics
3. User scrolls through all metrics across all levels, quickly scanning status indicators (green = on track, red = off track)
4. **To add a metric:**
   - Clicks "Add" button in top right of desired level component
   - Edit popup appears with appropriate fields (department for departmental, owner dropdown for individual)
   - Fills in metric details: description, min, max, current_status
   - Clicks "Done" → new metric appears in grid with status color
5. **To update a metric (daily use case):**
   - Long-presses on specific metric square
   - Popup appears with "Edit" and "Delete" buttons
   - Clicks "Edit"
   - Edit popup appears with existing data pre-filled
   - Quickly updates current_status value
   - Clicks "Done" → metric updates in grid with new status color
6. **To delete a metric:**
   - Long-presses on specific metric square
   - Popup appears with "Edit" and "Delete" buttons
   - Clicks "Delete"
   - Confirmation appears
   - Confirms → metric removed from grid
7. **To cancel editing:**
   - Clicks "Cancel" in edit popup → popup closes without saving
   - Clicks outside popup → popup dismisses
8. User navigates away via menu when finished

---

## Notes & Considerations
- **Daily updates critical:** Edit popup should prioritize quick current_status updates
- **Status indicators:** 
  - Green rounded background if `min <= current_status <= max`
  - Red rounded background if outside range
  - Visual feedback is immediate and clear
- **Square metrics:** Maintain square aspect ratio at all responsive sizes (like Rocks screen)
- **Layered backgrounds:** 
  - Company Metrics: 2 layers (component + metrics)
  - Departmental Metrics: 3 layers (component + department sections + metrics)
  - Individual Metrics: 3 layers (component + user sections + metrics)
  - Metric background color consistent across all three components
  - Creates visual grouping and hierarchy
- **No text truncation:** All metric descriptions display fully, no line limits
- **Grid layout:** Metrics arranged in responsive grid, maintaining square shape
- **Validation:** Description required, min/max required for status indication, department required for departmental, owner required for individual
- **User dropdown:** Populated from user_names table for individual metrics
- **Empty states:** Clear messaging when no metrics exist at any level
- **Confirmation messages:** "Are you sure?" for delete actions
- **Popup dismissal:** Click outside popup to close
- **Long-press threshold:** Define duration (e.g., 500ms) for activation
- **Accessibility:** Long-press needs alternative, keyboard navigation in popups
- **Performance:** Consider pagination if metric count grows very large
- **Historical tracking:** Consider if historical current_status values should be stored

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Clean, structured, data-driven with immediate visual feedback.
The three-layer background color system is critical - creates clear visual grouping (same as Rocks).
Square metrics are distinctive and scannable - matches Rocks screen pattern.
Green/red status indicators are the hero - must be immediately visible and unmistakable.
Grid layout should feel organized and allow quick scanning for red (problem) metrics.
Company metrics stand out with one less layer - appropriate given their importance.
Department and user name headers create clear organization.
This is daily tracking interface - prioritize speed of status updates above all.
Edit popup should optimize for quick current_status changes.
Consider larger touch targets for frequently-updated values.
Status colors should be accessible (not just red/green for colorblind users).
-->
```