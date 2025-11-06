# List Styling Guide

## List Choice

### FlatList vs ScrollView
- FlatList for dynamic data and longer lists (10+ items)
- ScrollView for small, fixed, heterogeneous content
- Consider performance implications for list length

## Spacing Approach

### Item Separation
- Use gap in contentContainerStyle when possible
- Or ItemSeparatorComponent for consistent gaps
- Avoid margins on items themselves (causes edge issues)
- Keep container padding separate from item spacing

## List Items

### Structure
- Maintain consistent padding across items
- Use uniform card/container styling
- Establish clear visual hierarchy within items

### Interaction
- Entire item should be tappable if interactive
- Provide touch feedback on interactive items
- Align icons/avatars consistently

## Empty & Loading States

### Empty States
- Never show blank space when no data
- Provide context about why empty
- Suggest actions when appropriate

### Loading States
- Show initial load indicator above fold
- Pagination loaders in footer
- Maintain layout structure during loading

## Performance

### Optimization Basics
- Always provide keyExtractor
- Extract renderItem to separate component
- Avoid ScrollView with map for long lists
- Consider getItemLayout for fixed heights

## Common Issues

### Spacing Problems
- Direct margins on items cause first/last spacing issues
- Inconsistent spacing methods throughout list

### Performance Neglect
- ScrollView with map on long lists
- Missing or incorrect key extractors
- Not extracting item components