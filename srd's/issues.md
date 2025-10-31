# Issues Screen
[complete]
## Purpose (Context)
Central hub for managing all company issues across three organizational levels (quarterly, company, departmental). Users can view, add, edit, and delete issues at each level. This supports the Traction methodology's focus on identifying and tracking organizational issues.

---

## Routing (INVARIANT)
**Incoming:**
- From menu navigation (Issues option selected)

**Outgoing:**
- To other screens via menu navigation

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `issues` with columns: `id, title, level, department, created_at, updated_at`
- `level` values: 'quarterly', 'company', 'departmental'
- `department` column: nullable string for departmental issues

### Probably Needed (Research Required)
- User ownership/assignment fields - determine if issues are assigned to specific users
- Status field - track if issues are open, in progress, resolved
- Priority field - order issues by importance
- Description field - detailed issue context beyond title
- Created by / modified by tracking for audit trail

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- Menu component from `/components/global` for navigation

### Layout Structure
Vertically stacked issue level components. Entire screen is scrollable; individual components are not.

**Visual hierarchy:**
- Top: Quarterly Issues component
- Middle: Company Issues component
- Bottom: Departmental Issues component

Each component dynamically sizes to fit its content.

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Screen size changes, content amount changes
**How:** Components grow/shrink vertically based on issue count, maintain consistent padding/spacing

### Screen States
**Known states:**
- Loaded with issues
- Empty (no issues at any level)
- Loading
- Error fetching issues

**Unknown states:** Partial load failures, sync states - implement as needed

---

## Components (SPECIFIC)

### QuarterlyIssues
**What component should accomplish**
User sees all quarterly-level issues in a clean list. They can quickly scan issues, long-press any issue to edit it, or use Add/Delete buttons to manage the list. This represents the highest-level strategic issues for the quarter.

**Data:** 
- Fetches: All issues where `level = 'quarterly'`
- Displays: `title` of each issue
- Mutations: Create, update, delete issues

**Position:** Top section of scrollable screen

**Actions:**
- User long-presses issue → edit popup appears with issue details
- User edits in popup → saves changes to database
- User clicks "Add" button → modal/form appears to create new quarterly issue
- User clicks "Delete" button → confirmation then deletes selected issue(s)

**States:**
- Default (issues displayed)
- Empty (no quarterly issues)
- Loading
- Edit mode (popup visible)
- Add mode (form visible)

**Backend needs:** 
- Query: `SELECT * FROM issues WHERE level = 'quarterly'`
- Insert: Create new issue with level = 'quarterly'
- Update: Edit existing issue
- Delete: Remove issue by id

---

### CompanyIssues
**What component should accomplish**
User sees all company-level issues in a clean list. They can quickly scan issues, long-press any issue to edit it, or use Add/Delete buttons to manage the list. This represents company-wide operational issues.

**Data:** 
- Fetches: All issues where `level = 'company'`
- Displays: `title` of each issue
- Mutations: Create, update, delete issues

**Position:** Middle section of scrollable screen

**Actions:**
- User long-presses issue → edit popup appears with issue details
- User edits in popup → saves changes to database
- User clicks "Add" button → modal/form appears to create new company issue
- User clicks "Delete" button → confirmation then deletes selected issue(s)

**States:**
- Default (issues displayed)
- Empty (no company issues)
- Loading
- Edit mode (popup visible)
- Add mode (form visible)

**Backend needs:** 
- Query: `SELECT * FROM issues WHERE level = 'company'`
- Insert: Create new issue with level = 'company'
- Update: Edit existing issue
- Delete: Remove issue by id

---

### DepartmentalIssues
**What component should accomplish**
User sees all departmental issues organized by department with clear section headers. They can scan issues by department, long-press any issue to edit or delete it, or use the Add button to create new departmental issues. This represents team-specific tactical issues.

**Data:** 
- Fetches: All issues where `level = 'departmental'`
- Displays: `title`, grouped by `department`
- Mutations: Create, update, delete issues

**Position:** Bottom section of scrollable screen

**Actions:**
- User long-presses issue → edit popup appears with issue details and Delete button
- User edits in popup → saves changes to database
- User clicks "Delete" in popup → confirmation then deletes the issue
- User clicks "Add" button (top right of component) → modal/form appears to create new departmental issue

**States:**
- Default (issues displayed, grouped by department)
- Empty (no departmental issues)
- Loading
- Edit mode (popup visible with delete option)
- Add mode (form visible)

**Backend needs:** 
- Query: `SELECT * FROM issues WHERE level = 'departmental' ORDER BY department, created_at`
- Insert: Create new issue with level = 'departmental' and department value
- Update: Edit existing issue
- Delete: Remove issue by id

---

## User Flow (NARRATIVE)
1. User navigates to Issues screen from menu
2. User sees three stacked sections: Quarterly, Company, and Departmental issues
3. User scrolls through all issues across all levels
4. **To add an issue:**
   - Clicks Add button on desired level component
   - Fills in issue details in form/modal
   - Saves → new issue appears in appropriate list
5. **To edit an issue:**
   - Long-presses on specific issue
   - Popup appears with editable fields
   - Makes changes and saves → issue updates in list
6. **To delete an issue:**
   - (Quarterly/Company) Clicks Delete button, selects issue(s), confirms
   - (Departmental) Long-presses issue, clicks Delete in popup, confirms
7. User navigates away via menu when finished

---

## Notes & Considerations
- **Long-press interaction:** Define threshold (e.g., 500ms) for activation
- **Delete patterns:** Quarterly/Company use dedicated Delete button; Departmental uses Delete in edit popup (note the inconsistency - clarify if intentional)
- **Validation:** Issue title required, department selection for departmental issues
- **Empty states:** Clear messaging when no issues exist at any level
- **Grouping logic:** Departmental issues grouped by department, null values go to "No Department"
- **Sorting:** Define sort order within each level (created_at? priority? alphabetical?)
- **Separators:** Thin bars between issues, thicker bars between departments
- **Performance:** Consider pagination if issue count grows large
- **Real-time updates:** Determine if multiple users need live sync
- **Accessibility:** Ensure long-press has alternative interaction method

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Clean, scannable, action-oriented.
Issues should feel manageable, not overwhelming - use whitespace and clear grouping.
Visual hierarchy through separator weights (thin vs thick) is key.
Long-press interaction should feel discoverable - consider subtle visual hint.
Add/Delete actions should be clear but not dominate the interface.
Department headers in departmental section create clear mental model.
This is a working tool, not a presentation - prioritize speed and clarity.
-->
```