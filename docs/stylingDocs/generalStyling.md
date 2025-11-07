# General Styling Guide

## Global UI Design Bias

The global UI design bias is a high-level design philosophy that guides all styling decisions across the entire app. This bias is defined in `prd's/1overview.md` under the section "Global UI design bias - ONLY FOR STYLING AGENTS!!!"

### Purpose
The global bias should be added as a comment to the bottom of all screen and component files that were created via SRDs (Screen Requirements Documents). This ensures that when styling agents work on these files, they have immediate context about the app's overall design direction.

### Comment Format
The global bias should be added to files using this exact format:

```tsx
/*
 * ============================================
 * GLOBAL UI DESIGN BIAS - FOR STYLING AGENT
 * ============================================
 *
 * [PASTE THE EXACT GLOBAL BIAS TEXT FROM 1overview.md HERE]
 *
 * This information guides future styling passes.
 * Do not modify the functional code above based on this bias yet.
 * ============================================
 */
```

### Where to Add
- Add to all screen files in `/app/**/*.tsx` that were specified in SRDs
- Add to all component files in `/components/**/*.tsx` that were specified in SRDs
- Do NOT add to layout files or other infrastructure files unless they were explicitly defined in an SRD

### Important Rules
- Only append the comment at the bottom of files - never modify existing functional code
- Only add to files that correspond to SRD specifications
- Preserve all existing content exactly as is

## Layout & Spacing

### Spacing Consistency
- Use a consistent spacing scale throughout the app
- Avoid arbitrary or one-off spacing values
- Group related content with tighter spacing, separate sections with more space
- Maintain consistent horizontal padding across screens

### Touch Targets
- Interactive elements need adequate hit areas (minimum 44x44 recommended)
- Ensure padding prevents content from touching edges
- Consider thumb reach zones on mobile devices

### Vertical Rhythm
- Maintain consistent spacing between sections
- Use white space intentionally for readability
- Build clear visual hierarchy through spacing alone

## Typography

### Hierarchy
- Limit text sizes to 3-4 variations per screen
- One primary heading per screen, clearly larger than subheadings
- Establish clear size relationships: heading → subheading → body → secondary

### Readability
- Adequate line height improves readability
- Consider limiting text width on larger screens
- Use weight variations (medium, semibold) for emphasis over bold
- Avoid all-caps except for small labels or buttons

### Text Color Hierarchy
- Primary content should be most opaque
- Secondary/metadata content slightly muted
- Disabled text clearly subdued
- Maintain sufficient contrast ratios for accessibility

## Visual Hierarchy

### Layering
- Establish clear z-index system for overlapping elements
- Base content lowest, modals/overlays highest
- Sticky elements in middle layer

### Separation
- Consider spacing before adding borders
- When using borders, keep them subtle
- Avoid compounding borders on parent and child

### Cards & Containers
- Maintain consistent corner radius across similar elements
- Use shadows sparingly - consider elevation purpose
- Keep shadow intensity modest

## Platform Behavior

### Safe Areas
- Respect platform safe areas (notches, home indicators)
- Bottom navigation must clear system UI elements

### Scrolling
- Preserve native scroll behavior (bounce on iOS)
- Ensure proper flex configuration for scrollable content
- Position loading states where users expect them

### Keyboard
- Forms should adapt when keyboard appears
- Provide keyboard avoidance for input-heavy screens
- Consider keyboard dismissal on appropriate gestures

## Performance & Polish

### Images
- Provide explicit dimensions or aspect ratios
- Show loading states for remote images
- Optimize for appropriate resolutions

### Lists
- Use FlatList for dynamic/long lists over ScrollView mapping
- Extract list components for performance
- Provide key extractors for list items

### Animations
- Keep interactions subtle and purposeful
- Use appropriate duration (avoid too fast or slow)
- Prefer native driver when possible

## Accessibility

### Screen Readers
- Provide meaningful labels for non-text elements
- Add hints for non-obvious interactions
- Group related elements appropriately

### Visual Accessibility
- Maintain readable minimum font sizes
- Don't rely solely on color to convey information
- Ensure adequate contrast ratios

## States

### Errors
- Make errors visible and actionable
- Use multiple indicators (color, icon, text)
- Provide clear next steps or retry options

### Empty States
- Never show blank space for missing data
- Provide helpful messaging and guidance
- Consider illustrations to soften experience

## Consistency

### System Adherence
- Similar elements should behave identically
- Reuse patterns rather than creating one-offs
- Maintain predictable interaction patterns
- Standard gestures should feel native