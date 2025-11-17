# Building a Gesture-Based Slide-Out Menu

## What Didn't Work

### Approach 1: Setting gesture state immediately
Setting `isGestureActive = false` immediately when a gesture ends, before animations complete, causes state synchronization issues. The Modal closes while animations are still running, creating visual glitches.

### Approach 2: Delaying state reset with animation callbacks
Keeping `isGestureActive = true` until animations complete works for functionality, but creates transparency issues if the backdrop wraps the drawer as a parent-child relationship. Children inherit parent opacity in React Native.

### Approach 3: Animated backdrop wrapping drawer
When the backdrop is a parent container with animated opacity (0 to 0.6) and the drawer is a child, the drawer inherits and multiplies the parent's opacity, making it transparent.

## What Worked

### Gesture State Management
1. Handle ALL gesture end states (END, CANCELLED, FAILED) - not just END
2. For successful gestures (meeting threshold): set `isGestureActive = false` immediately before opening
3. For failed gestures: immediately reset all animation values AND set `isGestureActive = false` together
4. During active gestures (state ACTIVE): update animation values directly with `setValue()` for real-time feedback

### Layout Structure
The backdrop and drawer must be **siblings**, not parent-child:

```jsx
<Modal visible={isOpen || isGestureActive}>
  <View>
    {/* Backdrop - absolute positioned */}
    <Animated.View
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#000',
        opacity: fadeAnim.interpolate([0, 1] -> [0, 0.6])
      }}
      pointerEvents={isOpen ? 'auto' : 'box-none'}
    >
      <Pressable onPress={closeMenu} />
    </Animated.View>

    {/* Drawer - absolute positioned, SIBLING to backdrop */}
    <Animated.View
      style={{
        position: 'absolute',
        top: 0, bottom: 0, left: 0,
        width: drawerWidth,
        transform: [{ translateX: slideAnim }]
        // NO opacity property
      }}
    >
      {/* Menu content */}
    </Animated.View>
  </View>
</Modal>
```

## Why This Works

1. **Sibling positioning prevents opacity inheritance**: When absolutely positioned as siblings, the drawer doesn't inherit the backdrop's opacity. Each controls its own visual properties independently.

2. **Backdrop fades, drawer slides**: The backdrop uses opacity animation (0 to 0.6) for the dimming effect. The drawer uses only `translateX` for sliding, maintaining full opacity at all times.

3. **Conditional pointer events**: Setting `pointerEvents={isOpen ? 'auto' : 'box-none'}` on the backdrop prevents it from blocking touches during gestures, only intercepting taps when fully open.

4. **Immediate reset on failed gestures**: When a gesture doesn't meet the threshold, immediately resetting both animation values and state prevents any stuck intermediate states.

5. **Handle all gesture states**: Gesture handlers emit multiple states. Failing to handle CANCELLED or FAILED states leaves the component in an inconsistent state where `isGestureActive` stays true indefinitely.

## Key Principles

- **Separate visual layers**: Backdrop and content should be independent visual layers
- **State must match visuals**: Animation state and component state must stay synchronized
- **Handle all gesture outcomes**: Success, failure, and cancellation all need explicit handling
- **Opacity doesn't compose well**: Avoid nested opacity animations - they multiply and cause transparency issues
