# Icon Styling Guide

## Icon Fundamentals

### Purpose
- Communicate meaning quickly and visually
- Support text labels or stand alone
- Provide visual interest and hierarchy
- Guide user actions and navigation

### Core Principles
- Clarity over creativity—meaning must be obvious
- Consistency in style throughout app
- Appropriate size for context
- Adequate touch targets when interactive

## Icon Style

### Visual Consistency
- Single icon family throughout app (outlined, filled, rounded, sharp)
- Consistent stroke weight across all icons
- Same level of detail across set
- Avoid mixing icon styles unless intentional hierarchy

### Size Standards
- Establish 3-4 standard sizes (small, medium, large, extra-large)
- Small: 16-20px for inline or dense contexts
- Medium: 24px most common for buttons and navigation
- Large: 32-40px for emphasis or isolated icons
- Extra-large: 48px+ for empty states or feature highlights

## Icon Usage

### Standalone Icons
- Meaning must be unambiguous
- Commonly understood symbols (home, search, settings)
- Touch target adequate even if icon is small
- Provide text label on long-press or tooltip when possible

### Icons with Labels
- Icon + text combination most clear
- Icon reinforces label meaning
- Alignment: icon before text (usually)
- Adequate spacing between icon and text

### Decorative Icons
- Support content but don't convey critical information
- Smaller or more subdued than actionable icons
- Used for visual interest
- Mark as decorative for accessibility

## Icon States

### Default State
- Base color matches context (text color, theme accent)
- Clear and readable
- Appropriate contrast with background

### Active/Selected State
- Filled version of outlined icon (common pattern)
- Color change (accent color)
- Increased visual weight
- Clear distinction from inactive state

### Disabled State
- Reduced opacity (typically 0.3-0.5)
- No interaction feedback
- Semantically disabled for accessibility

### Interactive Feedback
- Subtle opacity or scale change on press
- Immediate visual response
- No delay—feels sluggish

## Icon Color

### Semantic Colors
- Green: success, confirm, positive action
- Red: error, delete, destructive action
- Yellow/Orange: warning, caution
- Blue: info, neutral action
- Gray: disabled, inactive

### Contextual Colors
- Icons inherit text color in most contexts
- Primary actions use accent color
- Secondary actions use subdued color
- Maintain adequate contrast

## Touch Targets

### Interactive Icons
- Minimum 44x44px touch target (iOS) or 48x48dp (Android)
- Icon visual size can be smaller if padding provides target
- Adequate spacing between adjacent interactive icons
- No overlapping touch targets

## Common Issues

### Ambiguous Meaning
- Unclear or uncommon icon choice
- No text label when meaning not universal
- Cultural assumptions about icon meanings

### Inconsistent Style
- Mixing icon families (outlined with filled)
- Varying stroke weights across icons
- Different levels of detail or complexity

### Poor Size Choices
- Icons too small to recognize
- Icons too large for context
- Inconsistent sizing in same context

### Inadequate Touch Targets
- Icon-only buttons with small tap areas
- No padding around icon
- Icons too close together

### Color Problems
- Insufficient contrast with background
- Decorative color choices obscure meaning
- Inconsistent use of semantic colors

### Overuse
- Icons on everything creates visual noise
- Icons don't add clarity, just clutter
- Too many icon-only actions without labels

### Accessibility Issues
- Icons without alt text or labels
- Interactive icons not reachable via keyboard
- Color-only meaning without shape difference
