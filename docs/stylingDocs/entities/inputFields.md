# Input Field Styling Guide

## Core Principles

### Sizing Consistency
- All inputs on a screen should match in height
- Maintain adequate padding for comfortable interaction
- Establish minimum height for touch accuracy

### Visual States
- Clear differentiation between default, focus, error, disabled
- Focus states should be immediately obvious
- Error states paired with helpful messaging

## Input Structure

### Layout Patterns
- Labels typically above inputs for clarity
- Error messages below relevant input
- Consistent spacing between form elements

### State Communication
- Focus indicated by border or background change
- Errors shown inline, not just in alerts
- Disabled state visually muted

## Form Behavior

### Spacing
- Consistent gaps between inputs
- Group related inputs with tighter spacing
- Larger gaps for section separation
- Use parent gap rather than margin stacking

### Input Types
- Appropriate keyboard type for content
- Correct auto-capitalization settings
- Consider character limits where relevant

## Keyboard Handling

### Focus Flow
- Auto-focus sparingly (only when expected)
- Return key should advance or submit appropriately
- Ensure submit button visible with keyboard

### Avoidance
- Forms need keyboard avoidance on mobile
- Prevent important UI from being hidden
- Consider dismissal options

## Common Issues

### Inconsistent Heights
- Varying padding across inputs looks unpolished
- Border widths affect total height calculations

### Weak Focus Indicators
- Focus state too subtle to notice
- No visual change on interaction

### Poor Error Handling
- Errors not clearly associated with field
- No indication of what needs correction