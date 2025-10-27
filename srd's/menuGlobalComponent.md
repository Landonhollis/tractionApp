# Menu Global Component

## Purpose (Context)
Primary navigation component allowing users to access all major app sections. Appears on every authenticated screen with collapsible drawer functionality.

---

## Component Type
**[x] Navigation** - Drawer navigation

---

## Props Interface (PATTERN)

### Required Props
None - navigation structure is hardcoded in component

### Optional Props  
- `onNavigate?`: `(route: string) => void` - Callback when navigation occurs (default: uses expo-router)

**Edge cases to handle:**
- Rapid taps: Debounce menu open/close and navigation
- Menu open during screen transition: Close menu on navigation

---

## Component States

### Known States
- **Closed**: Only menu icon visible (hamburger icon in small box)
- **Open**: Full drawer visible with all navigation sections

### State Management
Internal state controls open/closed status

---

## Visual Structure (TEMPLATE)

### Layout
**Closed:** Small box in top-left corner with three horizontal lines
**Open:** Full-height vertical drawer with four sections separated by thin dark lines

### Sections/Elements

**Closed State:**
- Top-left corner box with hamburger icon (three horizontal lines)

**Open State:**
- **Section 1** (Top): Menu close icon + Settings icon/button
- **Section 2**: "Dashboard" button (largest/most prominent text)
- **Section 3**: Primary features (can abbreviate long names)
  - Issues
  - Rocks
  - Accountability Chart
  - Score Cards
  - V/TO
- **Section 4**: Secondary features (can abbreviate long names)
  - Processes
  - IDS
  - Meeting Agendas
  - Right People Right Seats
  - GWC
  - Leading Over Lagging Indicators

### Responsive Behavior
**Must respond to:** 
- Drawer slides in/out on open/close
- Long section names: Abbreviate as needed to fit drawer width

---

## Navigation (If Applicable)

### Route Names (PERMANENT - DO NOT CHANGE)
```typescript
const ROUTES = {
  SETTINGS: '/settings',
  DASHBOARD: '/dashboard',
  ISSUES: '/issues',
  ROCKS: '/rocks',
  ACCOUNTABILITY_CHART: '/accountability-chart',
  SCORE_CARDS: '/score-cards',
  VTO: '/vto',
  IDS: '/ids',
  MEETING_AGENDAS: '/meeting-agendas',
  RIGHT_PEOPLE_RIGHT_SEATS: '/right-people-right-seats',
  GWC: '/gwc',
  LEADING_OVER_LAGGING: '/leading-over-lagging',
  PROCESSES: '/processes',
}
```

### Navigation Props
Component handles all navigation internally using these permanent routes. Screens created later must match these exact route names.

---

## Assets Needed

### Icons
- Hamburger menu icon (three horizontal lines) - Menu open/close button
- Settings icon - Settings navigation
- Close icon (X or hamburger) - Close drawer when open

**Note:** Icons passed via props or use simple geometric shapes as placeholders

---

## Component Restrictions (DO NOT INCLUDE)
- ❌ No data fetching
- ❌ No service calls
- ❌ No backend functions
- ❌ No webhooks  
- ❌ No screen-specific logic
- ❌ No theme/core system usage (UI/UX agent handles later)

---

## Usage Context
Used in authenticated _layout file. No props needed from screens - menu structure is self-contained.
```typescript
<Menu />
```

---

## Notes & Considerations
- Menu opens/closes with tap animation (slide in from left)
- Tapping outside open menu should close it
- Navigation items are hardcoded - no dynamic menu structure
- Section hierarchy: Dashboard > Section 3 items > Section 4 items
- Consider overlay/backdrop when menu is open
- Drawer should overlay content, not push it