# Header Global Component

## Purpose (Context)
Displays the current screen title to orient the user. Appears at the top of every authenticated screen across the app.

---

## Component Type
**[x] Header** - Top bar, title area

---

## Props Interface (PATTERN)

### Required Props
- `title`: `string` - The current screen name to display

### Optional Props  
None

**Edge cases to handle:**
- Long text: Truncate with ellipsis if title exceeds available width
- Missing props: Display empty string (shouldn't happen in practice)

---

## Component States

### Known States
- Static display only (no interactive states)

### State Management
No internal state - purely presentational

---

## Visual Structure (TEMPLATE)

### Layout
Thin horizontal bar spanning full width at absolute top of screen with centered text

### Sections/Elements
- Center text: Screen title, centered horizontally and vertically

### Responsive Behavior
**Must respond to:** 
- Screen width: Title truncates on small screens
- Content overflow: Ellipsis for long titles

---

## Navigation (If Applicable)
N/A - Display only component

---

## Assets Needed
None - text only component

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
Screens pass their title as a prop. Used in authenticated _layout file wrapping all post-auth screens.
```typescript
<Header title="Dashboard" />
<Header title="Settings" />
```

---

## Notes & Considerations
- Should have minimal height to maximize screen real estate
- Position absolute/fixed at top to always remain visible
- Consider safe area insets for iOS notch/island