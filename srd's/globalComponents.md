# [Component Name] Global Component

## Purpose (Context)
[1-2 sentences: What does this component do? Where will it appear across screens?]

---

## Component Type
**[ ] Navigation** - Menu, tab bar, drawer, header nav
**[ ] Header** - Top bar, title area, action bar
**[ ] Modal/Overlay** - Popup, sheet, dialog
**[ ] Other** - [Describe]

---

## Props Interface (PATTERN)

### Required Props
- `[propName]`: `[type]` - [What data/config does this prop provide?]

### Optional Props  
- `[propName]?`: `[type]` - [What does this configure? What's the default?]

**Edge cases to handle:**
- Missing props: [What should happen?]
- Long text/content: [How should it behave?]
- Empty states: [What displays?]

---

## Component States

### Known States
- [open/closed, selected/unselected, active/inactive, etc.]
- [How does the component visually change between states?]

### State Management
[Is state internal to component or passed via props?]

---

## Visual Structure (TEMPLATE)

### Layout
[Describe the component's structure - e.g., "Horizontal bar with left icon, center title, right action buttons"]

### Sections/Elements
- [Element 1]: [What goes here, positioning]
- [Element 2]: [What goes here, positioning]

### Responsive Behavior
**Must respond to:** [screen size, content overflow, etc.]

---

## Navigation (If Applicable)

### Route Names (PERMANENT - DO NOT CHANGE)
If this component handles navigation, define the permanent routes screens must use:
```typescript
// These route names are permanent. Screens created later MUST use these exact names.
const ROUTES = {
  HOME: '/home',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  // ... other permanent routes
}
```

### Navigation Props
- Component accepts navigation items as props with these route names
- Screens will be created later and must match these routes

---

## Assets Needed

### Icons
- [Icon name/purpose] - [Where used in component]

### Images
- [Image type] - [Where used, fallback behavior]

**Note:** All assets passed via props or use placeholder until provided.

---

## Component Restrictions (DO NOT INCLUDE)
- ❌ No data fetching
- ❌ No service calls
- ❌ No backend functions
- ❌ No webhooks  
- ❌ No screen-specific logic
- ❌ No theme/core system usage (UI/UX agent handles later)

**If any of these are needed, STOP - this should not be a global component.**

---

## Usage Context
[Where will screens use this? What do screens need to pass in? Brief example of how a screen would implement this component]

---

## Notes & Considerations
- [Any special behavior or edge cases]
- [Accessibility considerations]
- [Platform-specific behavior (iOS vs Android)]
- [Any hardcoded data like menu items, if applicable]