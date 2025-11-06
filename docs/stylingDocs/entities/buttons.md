# Button Styling Guide

## Core Principles

### Touch Targets
- Ensure comfortable minimum hit areas
- Don't rely on text size alone for button dimensions
- Add adequate padding around button content

### Visual Hierarchy
- Primary actions should be most prominent
- Secondary actions more subtle (outlined or ghost)
- Tertiary actions minimal (text-only)
- Limit primary buttons per section

## Button States

### Interaction Feedback
- Provide immediate visual feedback on press
- Consider opacity reduction or subtle scale
- Avoid delayed or sluggish transitions

### State Variations
- Disabled state clearly differentiated (reduced opacity)
- Loading state shows activity without layout shift
- Maintain button structure across all states

## Layout Patterns

### Width Considerations
- Full-width appropriate for primary actions
- Inline width for secondary actions
- Keep consistent within button groups

### Button Groups
- Maintain consistent spacing between buttons
- Keep same height across related buttons
- Consider standard ordering (primary right/bottom)

## Common Issues

### Size Inconsistency
- Mixing different paddings creates visual chaos
- Establish standards for similar button types

### Poor Feedback
- Every button needs press feedback
- Loading states must be unambiguous
- Disable during async operations to prevent double-tap

### Inadequate Touch Areas
- Icon buttons need surrounding touchable space
- Text-only buttons still need padding