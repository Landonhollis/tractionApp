# Navigation Styling Guide

## Navigation Fundamentals

### Consistency
- Navigation position must be predictable (always top or always bottom)
- Same navigation pattern throughout app
- Active state clearly indicates current location
- Icons and labels consistent across all nav items

### Visual Clarity
- Clear distinction between active and inactive states
- Adequate touch targets for all nav items
- Labels support icons for clarity (icons alone can be ambiguous)
- Visual feedback on tap

## Navigation Types

### Bottom Tab Navigation
- Preferred for primary navigation on mobile
- 3-5 items maximum (more creates crowding)
- Icons + labels for clarity
- Active state uses color, weight, or indicator
- Respects safe area on devices with home indicators

### Top Navigation Bar
- Common for headers with back button and title
- Keep title concise and centered or left-aligned
- Actions (edit, share, etc.) on right
- Back button always in consistent position (usually left)
- Adequate height for comfortable touch targets

### Drawer Navigation
- Suitable for many secondary destinations
- Trigger icon (hamburger) in consistent position
- Overlay dims main content when open
- Swipe or tap outside to close
- Clearly shows active section

### Tab Bar (Segmented Control)
- Used for switching views within same screen
- Full-width or inline depending on context
- Active tab clearly distinguished
- Smooth animation when switching
- Equal-width tabs or content-based width

## Navigation States

### Active State
- Most prominent—color, underline, icon fill, or bold text
- Must be immediately obvious
- Consistent treatment across all nav types

### Inactive State
- Subdued but still clearly tappable
- Icons and text visible but less prominent

### Disabled State (if applicable)
- Visually muted (reduced opacity)
- No interaction feedback
- Rare in navigation—usually just hide unavailable options

## Interaction Patterns

### Touch Feedback
- Immediate visual response on tap
- Subtle opacity or scale change
- No delayed navigation (feels sluggish)

### Badge Indicators
- Small badge on nav item shows notifications or counts
- Clear contrast with navigation item
- Positioned consistently (usually top-right of icon)
- Consider max count display (9+, 99+)

## Common Issues

### Too Many Items
- Bottom nav with 6+ items feels cramped
- Consider hierarchy—use drawer for secondary items

### Unclear Active State
- Active state too subtle—user unsure of location
- Inconsistent active indicators across screens

### Poor Touch Targets
- Icon-only navigation with small tap areas
- Inadequate spacing between nav items

### Inconsistent Placement
- Navigation moves between screens
- Different nav patterns on similar screens

### Badge Overload
- Too many badges creates alarm fatigue
- Unclear what badges represent
