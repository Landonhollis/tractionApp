# Dashboard Screen

## Complexity Level
**[X] Simple** - Standard CRUD, basic UI, Supabase + RN Reusables only
**[ ] Complex** - Check this if: external APIs, payments, real-time features, custom packages likely needed, or non-trivial business logic

*Note: Standard data display with filtering and responsive layout. Uses existing Supabase tables.*

---

## Purpose (Context)
Provides users with an at-a-glance overview of company health and personal accountability items. Displays the most critical metrics, rocks, issues, and processes that require attention across individual, departmental, and company levels.

---

## Routing (INVARIANT)
**Incoming:**
- From Sign-in flow via successful authentication
- From Menu via "Dashboard" selection

**Outgoing:**
- To [any other menu screen] via menu navigation

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `rocks` with columns: `id, description, level, owner_id`
- Table: `issues` with columns: `id, title, description, level`
- Table: `metrics` with columns: `id, description, level, current_status, min, max, owner_id, department`
- Table: `processes` with columns: `id, title, description, owner_id`
- Current user context: `user_id` for filtering personal items

### Probably Needed (Research Required)
- User-department relationship: How to filter departmental items for the current user's department
- Timestamp fields: May need `created_at` or `updated_at` for sorting
- Status/completion fields: Rocks and processes may have status indicators beyond what's listed
- Additional filtering: May need `is_active` or `archived` flags to exclude completed/archived items

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- Standard app header/navigation (if applicable)

### Layout Structure
Responsive grid of card components that adapt to screen size. Mobile displays single column stack, larger screens display multi-column grid. All cards float above background with consistent elevation/shadow.

**Visual hierarchy:**
- Personal items (top priority): Personal Rocks, Personal Measurables, Individual Processes
- Departmental items (middle): Department Issues, Departmental Measurables
- Company items (bottom): Company Issues, Company Measurables

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Screen width changes - stack vertically on mobile, multi-column grid on tablet/desktop
**How:** AI decides - ensure readable card sizes and proper spacing

### Screen States
**Known states:**
- loading (fetching data from all tables)
- populated (data displayed in cards)
- empty (no data in one or more categories)
- error (failed to fetch data)

**Unknown states:** Likely additional edge case states exist - implement as needed.

---

## Components (SPECIFIC)

### Personal Rocks
**What component should accomplish**
The user sees their individual rocks (goals/objectives) at a glance. They can quickly scan their personal commitments without leaving the dashboard. The list scrolls if there are many rocks, with text truncated to prevent overwhelming detail.

**Data:** 
- Displays: `description` field
- Needs: Records from `rocks` table where `level = "individual"` AND `owner_id = current_user_id`

**Position:** Top section of dashboard (high priority personal items)

**Actions:**
- User scrolls within component → reveals more rocks if list exceeds visible area
- No tap/long-press/hover interactions

**States:**
- Known: empty (no rocks), populated, scrolling
- Unknown: Handle edge cases as needed

**Backend needs:** Query `rocks` table with user-specific filter

---

### Department Issues
**What component should accomplish**
The user sees all departmental issues that need attention. They can scroll through the list to stay aware of department-level problems without needing to navigate away from the dashboard.

**Data:** 
- Displays: `title` (larger text), `description` (smaller text)
- Needs: Records from `issues` table where `level = "departmental"`

**Position:** Middle section of dashboard (departmental items grouping)

**Actions:**
- User scrolls within component → reveals more issues if list exceeds visible area
- No tap/long-press/hover interactions

**States:**
- Known: empty (no issues), populated, scrolling
- Unknown: Handle edge cases as needed

**Backend needs:** Query `issues` table filtered by level

---

### Company Issues
**What component should accomplish**
The user sees all company-wide issues requiring awareness. They can scroll through to understand organizational challenges at the highest level.

**Data:** 
- Displays: `title` (larger text), `description` (smaller text)
- Needs: Records from `issues` table where `level = "company"`

**Position:** Lower section of dashboard (company-wide items grouping)

**Actions:**
- User scrolls within component → reveals more issues if list exceeds visible area
- No tap/long-press/hover interactions

**States:**
- Known: empty (no issues), populated, scrolling
- Unknown: Handle edge cases as needed

**Backend needs:** Query `issues` table filtered by level

---

### Personal Measurables
**What component should accomplish**
The user sees their personal metrics with instant visual feedback on performance. Green backgrounds indicate metrics within target range, red indicates out of range. They can quickly identify which personal metrics need attention.

**Data:** 
- Displays: `description`, `level`, `current_status`
- Needs: Records from `metrics` table where `owner_id = current_user_id`, plus `min` and `max` values for status calculation

**Position:** Top section of dashboard (high priority personal items)

**Actions:**
- User scrolls within component → reveals more metrics if list exceeds visible area
- No tap/long-press/hover interactions

**States:**
- Known: empty (no metrics), populated, scrolling, in-range (green), out-of-range (red)
- Unknown: Handle edge cases as needed

**Backend needs:** Query `metrics` table with user-specific filter, client-side logic for status color determination

---

### Departmental Measurables
**What component should accomplish**
The user sees department-level metrics with visual status indicators. They can monitor departmental performance across all tracked metrics, with color coding showing health at a glance.

**Data:** 
- Displays: `description`, `department`, `current_status`
- Needs: Records from `metrics` table where `level = "departmental"`, plus `min` and `max` values for status calculation

**Position:** Middle section of dashboard (departmental items grouping)

**Actions:**
- User scrolls within component → reveals more metrics if list exceeds visible area
- No tap/long-press/hover interactions

**States:**
- Known: empty (no metrics), populated, scrolling, in-range (green), out-of-range (red)
- Unknown: Handle edge cases as needed

**Backend needs:** Query `metrics` table filtered by level, client-side logic for status color determination

---

### Company Measurables
**What component should accomplish**
The user sees company-wide metrics with status indicators. They understand organizational performance across key metrics, with immediate visual feedback on which metrics are on or off target.

**Data:** 
- Displays: `description`, `current_status`
- Needs: Records from `metrics` table where `level = "company"`, plus `min` and `max` values for status calculation

**Position:** Lower section of dashboard (company-wide items grouping)

**Actions:**
- User scrolls within component → reveals more metrics if list exceeds visible area
- No tap/long-press/hover interactions

**States:**
- Known: empty (no metrics), populated, scrolling, in-range (green), out-of-range (red)
- Unknown: Handle edge cases as needed

**Backend needs:** Query `metrics` table filtered by level, client-side logic for status color determination

---

### Individual Processes
**What component should accomplish**
The user sees all processes they own. They can review their documented procedures and responsibilities without navigating to a dedicated processes screen.

**Data:** 
- Displays: `title`, `description`
- Needs: Records from `processes` table where `owner_id = current_user_id`

**Position:** Top section of dashboard (high priority personal items)

**Actions:**
- User scrolls within component → reveals more processes if list exceeds visible area
- No tap/long-press/hover interactions

**States:**
- Known: empty (no processes), populated, scrolling
- Unknown: Handle edge cases as needed

**Backend needs:** Query `processes` table with user-specific filter

---

## User Flow (NARRATIVE)
1. User arrives from sign-in or menu "Dashboard" selection
2. User sees loading state briefly while data fetches from all tables
3. User sees grid of cards showing personal, departmental, and company items
4. User can scroll within each card to see full lists
5. User quickly identifies issues (red metrics, numerous issues, etc.) requiring attention
6. User navigates to specific screens via menu to take action on items

---

## Notes & Considerations
- **Text truncation:** All fields truncated at 10 lines to prevent overly long cards
- **Color coding for metrics:** 
  - `level` field color codes: Define color scheme for "individual", "departmental", "company"
  - Status color codes: Green if `min <= current_status <= max`, Red otherwise
- **Sorting:** Define default sort order for each list (e.g., most recent, priority, alphabetical)
- **Real-time updates:** Consider if dashboard should refresh automatically or require manual refresh
- **Empty states:** Each component should handle empty data gracefully with placeholder text
- **Performance:** May need to limit number of items fetched per component to prevent slow loads
- **Departmental filtering:** Clarify how departmental items are filtered for the current user (may need user-department relationship)

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Clean, data-focused dashboard with minimal decoration. Cards should feel organized and scannable. Floating card aesthetic suggests modular information blocks. Color coding (green/red for metrics, differentiated levels) serves functional purpose of quick status assessment. Typography hierarchy (larger titles, smaller descriptions) aids scanning. Thin divider lines maintain separation without visual weight. Overall: professional, efficient, information-dense but not overwhelming.
-->
```