# Card Styling Guide

## Card Fundamentals

### Visual Definition
- Cards group related information in distinct containers
- Consistent corner radius across all cards
- Subtle elevation through shadows or borders
- Clear separation from background

### Sizing
- Let content determine height when possible
- Consider fixed aspect ratios for grid layouts
- Avoid arbitrary heights that cut off content
- Full-width or grid-based widths

## Interaction Patterns

### Clickable Cards
- Entire card surface should be tappable
- Provide subtle press feedback (opacity or scale)
- Clear indication card is interactive
- Consider what action tap performs

### Long-Pressable Cards
- Primary action on tap, secondary on long-press
- Provide visual feedback for long-press trigger
- Consider haptic feedback if available
- Make long-press actions discoverable

### Editable Cards
- Clear edit affordance (icon, button, or gesture)
- Edit mode visually distinct from view mode
- Consider inline editing vs modal editing
- Save/cancel actions clearly available

### Static Cards
- No interaction feedback needed
- Focus on content hierarchy
- Padding prevents edge-touching content

## Card Content

### Internal Spacing
- Consistent padding on all sides
- Content shouldn't touch card edges
- Use internal hierarchy (heading, body, metadata)
- Consider spacing between internal elements

### Content Priority
- Most important info prominent and scannable
- Secondary details smaller and subdued
- Actions (buttons, links) clearly positioned
- Avoid cramming too much in one card

## Layout Patterns

### Single Cards
- Clear separation from surrounding content
- Adequate margin from screen edges
- Stand-alone cards should be visually balanced

### Card Lists
- Consistent spacing between cards
- Use FlatList for dynamic card lists
- Gap property for clean separation
- Avoid margin stacking

### Card Grids
- Responsive wrapping for different screens
- Equal-sized cards in grids
- Consistent gaps horizontally and vertically
- Consider 2-column on mobile, more on tablets

## States

### Normal State
- Base styling consistent across similar cards
- Clear content hierarchy
- Adequate white space

### Pressed State (if interactive)
- Immediate visual feedback
- Subtle opacity or scale change
- No layout shift

### Selected State (if selectable)
- Clear selected indicator (border, checkmark, background)
- Selected cards visually distinct from unselected
- Multiple selection vs single selection

### Loading State
- Skeleton screens for card content
- Maintain card structure during load
- Smooth transition when content loads

## Common Issues

### Inconsistent Styling
- Cards on same screen with different treatments
- Mixing shadows, borders, and backgrounds randomly

### Poor Touch Feedback
- Tappable cards without feedback
- Feedback too subtle to notice
- Delayed response to interaction

### Content Overflow
- Fixed heights cutting off content
- Text truncation without clear indication
- No way to see full content when needed

### Spacing Problems
- Cramped content touching card edges
- Inconsistent gaps between cards in lists
- Double-spacing from margin stacking