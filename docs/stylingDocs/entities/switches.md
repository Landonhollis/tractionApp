# Switch and Toggle Styling Guide

## Switch Fundamentals

### Purpose
- Switches represent binary on/off states
- Immediate effect—no save button needed
- Visual state must be unambiguous

### Visual Design
- Clear distinction between on and off states
- On state typically uses accent color
- Off state muted (gray or neutral)
- Thumb (moving part) clearly visible in both states
- Track (background) changes color between states

## Switch Structure

### Component Parts
- Track: background pill shape
- Thumb: circular indicator that slides
- Label: describes what switch controls
- Optional description: explains consequence of state

### Sizing
- Touch target adequate for comfortable interaction
- Thumb size proportional to track
- Maintain consistent sizing across app
- Platform conventions guide default sizes

## State Indication

### On State
- Thumb positioned to one side (typically right)
- Track color accent or primary color
- Label or context confirms active state
- Optional icon within track (checkmark, etc.)

### Off State
- Thumb positioned opposite side
- Track color neutral or muted
- Clear visual difference from on state

### Disabled State
- Reduced opacity on both track and thumb
- No interaction feedback
- Consider hiding if switch is never available

## Interaction

### Touch Feedback
- Immediate visual response when tapped
- Smooth animation between states
- No delay—state changes instantly
- Haptic feedback optional but nice

### Toggle Behavior
- Tap anywhere on switch toggles state
- Optional: tap on label also toggles
- No confirmation dialog for reversible actions
- Confirm only for destructive or critical changes

## Layout Patterns

### Label Placement
- Label typically to left of switch
- Clear association between label and switch
- Adequate spacing prevents accidental taps

### List of Switches
- Align all switches vertically
- Consistent spacing between items
- Labels left-aligned, switches right-aligned
- Group related switches under section headers

### Inline Switches
- Switch within card or setting row
- Full row tappable vs only switch—choose one
- Visual feedback shows tappable area

## Common Issues

### Ambiguous State
- On and off states too similar
- User unsure of current state
- Unclear which side is on vs off

### Poor Touch Targets
- Switch too small for comfortable tapping
- Label not tappable when it should be
- Inadequate spacing between switches in list

### Misleading Labels
- Double negatives (disable notifications off = confusing)
- Unclear consequence of toggling
- Label describes opposite of what switch controls

### Performance Problems
- Delayed state change after tap
- Sluggish animation
- No immediate feedback

### Accessibility Issues
- No semantic meaning for screen readers
- State not announced when changed
- Insufficient contrast between states
