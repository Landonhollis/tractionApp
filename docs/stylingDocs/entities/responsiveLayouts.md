# Responsive Layout Guide

## Flex Fundamentals

### Parent-Child Relationships
- Parent containers should define available space (often flex-1)
- Use gap properties for spacing rather than stacking margins
- Let content determine height when possible
- Reserve fixed dimensions for truly static elements

### Flex Distribution
- Apply flex-1 selectively to elements that should grow
- Fixed UI elements (headers, footers) don't need flex
- When mixing fixed and flexible, fixed elements first
- Avoid over-flexing - not everything needs to grow

## Common Issues

### Spacing Problems
- Stacking margins on adjacent elements doubles the gap
- Use gap on parent instead of margins on all children
- Be intentional about where spacing is applied

### Flex Conflicts
- Multiple flex-1 siblings compete for space
- Nested flex-1 elements can cause unexpected sizing
- Percentage heights often don't work with dynamic content
- Reserve absolute positioning for overlays, not layout structure

## Responsive Patterns

### Grid Layouts
- Use flex-row with wrapping for responsive grids
- Set minimum widths to control when items wrap
- Let natural wrapping handle different screen sizes
- Consider how items stack on narrow screens

### Column Splits
- Flex values determine proportional width
- Equal flex values create equal columns
- Unequal values create proportional splits

### Multi-Section Layouts
- Fixed headers/footers without flex
- Scrollable middle section with flex-1
- Let individual sections size naturally within scroll
- Consider equal-height splits with multiple flex-1 siblings

## List Spacing

### FlatList/SectionList
- Use contentContainerStyle gap for item spacing
- Or use ItemSeparatorComponent for gaps
- Avoid margins on list items (causes first/last issues)
- Keep container padding separate from item spacing

## Decision Framework

Consider these questions when sizing elements:
1. Should this scroll? → flex-1 on parent, natural children
2. Is this always the same size? → explicit dimensions
3. Should this share space? → consider flex-1 here
4. Does content change dynamically? → avoid fixed height
5. Is this beside other elements? → flex-row parent with gap

## Screen Adaptation

### Size Considerations
- Single column works best on small screens
- Leverage horizontal space on tablets
- Center narrow content on wide screens
- Test both orientations on tablets

### Adaptive Approaches
- Detect screen dimensions for layout decisions
- Consider breakpoints for major layout changes
- Prioritize mobile-first, enhance for larger screens