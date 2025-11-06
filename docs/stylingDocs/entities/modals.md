# Modal Styling Guide

## Modal Fundamentals

### Purpose and Context
- Modals interrupt the primary flow for focused tasks
- Use sparingly—only when focus or confirmation is essential
- User should understand why modal appeared
- Provide clear escape routes (X button, cancel, backdrop tap)

### Visual Treatment
- Backdrop dims underlying content (semi-transparent dark overlay)
- Modal content sits in elevated container (white/card background)
- Corner radius softens presentation
- Shadow or elevation distinguishes from background
- Consider safe area on mobile devices

## Sizing and Positioning

### Size Considerations
- Content determines height when possible
- Avoid full-screen modals unless absolutely necessary
- Consider max-height with internal scrolling for long content
- Width should not span entire screen—margins create focus
- Mobile: more screen coverage acceptable, but not always full

### Positioning
- Vertically centered on desktop/tablet
- Bottom-aligned or centered on mobile (consider keyboard)
- Ensure all content visible without scrolling when possible
- Buttons should remain visible (sticky footer if needed)

## Interaction Patterns

### Opening
- Smooth animation (fade + scale, or slide up)
- Backdrop appears simultaneously
- Focus moves to modal content
- Underlying content becomes inert

### Closing
- Multiple ways to dismiss: X button, cancel, backdrop tap
- Confirm before closing if data would be lost
- Reverse opening animation
- Return focus to trigger element when appropriate

### Keyboard Handling
- Consider keyboard on mobile—modal may need to shift up
- Enter key should trigger primary action
- Escape key should close modal (desktop)
- Tab navigation stays within modal

## Content Structure

### Header
- Clear title explaining modal purpose
- Close button in consistent position (usually top-right)
- Optional descriptive text below title

### Body
- Focused on single task or decision
- Avoid cramming multiple unrelated actions
- Adequate padding prevents edge-touching content
- Scrollable if content exceeds max-height

### Footer
- Primary and secondary actions clearly distinguished
- Primary action on right (or bottom on mobile stacked)
- Cancel/close always available
- Buttons remain accessible (sticky footer if scrolling)

## States

### Loading State
- Show loading indicator if modal content loads asynchronously
- Maintain modal structure during load
- Disable actions during processing

### Error State
- Display errors inline within modal
- Don't close modal on error—allow user to correct
- Error messages near relevant fields

## Common Issues

### Overuse
- Too many modals feels intrusive and annoying
- Consider inline expansion or separate screens instead

### Poor Escape Routes
- User must always have clear way to close
- Backdrop tap expected to dismiss (except for critical flows)
- Missing X button creates frustration

### Accessibility Problems
- Focus not trapped within modal
- No way to dismiss with keyboard
- Underlying content still interactive

### Mobile Keyboard Conflicts
- Modal footer hidden by keyboard
- No way to access submit button when keyboard open
- Content shifts awkwardly when keyboard appears
