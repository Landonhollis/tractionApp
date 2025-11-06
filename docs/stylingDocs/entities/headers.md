# Header and Section Styling Guide

## Header Fundamentals

### Purpose
- Headers organize content into logical sections
- Provide context about what follows
- Create visual hierarchy on long screens
- Aid scanning and navigation

### Visual Treatment
- Larger or bolder text than body content
- Adequate spacing above and below
- Clear distinction from content
- Consistent styling across similar header levels

## Header Types

### Screen Headers
- Top-level header, usually with title of screen
- Often includes navigation (back button) and actions
- Fixed or scrollable depending on context
- Safe area considerations on mobile

### Section Headers
- Divide content within a screen
- Smaller than screen headers, larger than body text
- Often include dividers or extra spacing
- Sticky headers keep context visible during scroll

### List Headers
- Categorize items in lists
- Compact but distinct from list items
- Often used in grouped lists (alphabetical, date-based)
- Sticky behavior common

## Header Structure

### Title
- Concise and descriptive
- Sentence case or title case (stay consistent)
- Truncate long titles gracefully

### Optional Subtitle
- Additional context below main title
- Smaller and more subdued than title
- Brief—detailed descriptions belong in body

### Actions
- Icons or text buttons in header
- Positioned consistently (usually right side)
- Don't overcrowd—limit to 2-3 actions
- Overflow menu for additional options

## Spacing and Layout

### Vertical Spacing
- More space above header than below (groups with following content)
- First section header needs less top spacing
- Consistent spacing between all sections

### Horizontal Layout
- Adequate margins from screen edges
- Title and actions balanced
- Back button or menu icon on left (typically)

## Interaction Patterns

### Sticky Headers
- Section headers remain visible during scroll
- Useful for long categorized lists
- Smooth transition when sticky/unsticky
- Consider z-index and shadows for elevation

### Collapsible Sections
- Header tappable to expand/collapse section
- Icon indicates state (chevron, plus/minus)
- Smooth animation when expanding/collapsing
- Save expanded/collapsed state when appropriate

### Scrolling Behavior
- Large headers can collapse on scroll (iOS style)
- Title remains visible in collapsed state
- Smooth animation during transition

## Common Issues

### Inconsistent Hierarchy
- Mixing header styles without clear levels
- Same visual weight for different importance
- Unclear which header level to use

### Poor Spacing
- Headers too close to preceding content
- Insufficient spacing creates ambiguity about grouping
- Inconsistent spacing between sections

### Overcrowded Headers
- Too many actions crammed into header
- Long titles with no truncation
- Title and actions overlap on small screens

### Missing Context
- Generic headers ("Details", "Info") without specificity
- No indication of content below
- Headers that don't aid scanning

### Accessibility Problems
- Header hierarchy not semantic (for screen readers)
- Actions in headers not reachable via keyboard
- Poor contrast makes headers unreadable
