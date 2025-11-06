# Badge and Pill Styling Guide

## Badge Fundamentals

### Purpose
- Badges draw attention to notifications, counts, or status
- Pills group or label content (tags, categories, status)
- Both are compact and visually distinct from surrounding content

### Visual Treatment
- Small, rounded shapes (circles for counts, rounded rectangles for text)
- High contrast with background
- Clear, readable text at small sizes
- Colors convey meaning (red for alerts, green for success, gray for neutral)

## Badge Types

### Notification Badges
- Small circles, usually with count
- Positioned on icons (top-right corner typical)
- Colors indicate urgency (red most common)
- Count display considers large numbers (9+, 99+, 999+)
- Empty badge (just dot) when count unavailable or unnecessary

### Status Badges
- Indicate state: active, pending, completed, error
- Semantic colors (green=success, red=error, yellow=warning, blue=info)
- Positioned near relevant content or as standalone indicator
- Text or icon conveys status

### Achievement Badges
- Decorative and motivational
- Larger than notification badges
- Often use custom icons or shapes
- Colors and visual treatment match achievement importance

## Pill Types

### Tag Pills
- Label or categorize content
- Multiple pills can appear together
- Removable pills have X icon
- Tappable pills filter or navigate
- Compact text, adequate padding

### Filter Pills
- Show active filters
- Often dismissible (X to remove)
- Visually distinct from unfiltered state
- Group together in row with horizontal scroll if needed

### Status Pills
- Similar to status badges but more prominent
- Full words rather than icons or dots
- Used when status is primary information

## Sizing and Placement

### Badge Size
- Small enough to not dominate, large enough to read
- Notification badges: minimal size, just fit count
- Status badges: accommodate text comfortably

### Pill Size
- Consistent height across all pills in same context
- Width adapts to text length
- Padding prevents cramped text

### Positioning
- Notification badges: anchored to top-right of parent (icon, avatar)
- Status pills: near related content or in dedicated status area
- Tag pills: below or beside content being tagged

## States

### Count Changes
- Animate when count increases (subtle scale or fade)
- Update immediately, don't wait for manual refresh
- Consider removing badge when count reaches zero

### Interactive States
- Tappable pills show press feedback
- Hover states on desktop
- Disabled pills visually muted

## Common Issues

### Overuse
- Too many badges creates visual noise
- Badge fatigue—everything urgent means nothing is urgent

### Poor Contrast
- Badge text or background too similar to surroundings
- Unreadable at small sizes

### Unclear Meaning
- Color without context (what does blue badge mean?)
- No explanation for badge presence

### Positioning Problems
- Badge overlaps important content
- Inconsistent positioning across similar elements

### Size Inconsistency
- Mixing different badge sizes in same context
- Pills with wildly different heights in same group
