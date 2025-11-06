# Whiteboard Implementation Guide

This document provides a flexible framework for creating whiteboard-style interfaces with pan, zoom, and draggable elements in React Native using Expo.

## Core Concepts

A whiteboard interface consists of:
1. **Canvas** - An infinite or bounded coordinate space for placing elements
2. **Pan & Zoom** - Gestures for navigating the canvas
3. **Draggable Elements** - Interactive objects (nodes, shapes, lines, etc.)
4. **Editing Controls** - Modals and UI for modifying element properties

## Architecture

### 1. Canvas Setup

Define canvas dimensions and create a zoomable, pannable container:

```typescript
const CANVAS_WIDTH = 3000;
const CANVAS_HEIGHT = 3000;

// Shared values for pan and zoom state
const scale = useSharedValue(1);
const translateX = useSharedValue(0);
const translateY = useSharedValue(0);
```

**Key Pattern**: Use `react-native-reanimated` shared values for smooth, performant gestures.

### 2. Pan Gesture with Boundaries

Implement panning with boundary constraints to prevent viewing empty space:

```typescript
const panGesture = Gesture.Pan()
  .onBegin(() => {
    // Save current state
    savedTranslateX.value = translateX.value;
    savedTranslateY.value = translateY.value;
  })
  .onUpdate((e) => {
    const newTranslateX = savedTranslateX.value + e.translationX;
    const newTranslateY = savedTranslateY.value + e.translationY;

    // Calculate boundaries based on current scale
    const scaledWidth = CANVAS_WIDTH * scale.value;
    const scaledHeight = CANVAS_HEIGHT * scale.value;

    const maxTranslateX = 0;
    const minTranslateX = screenWidth - scaledWidth;
    const maxTranslateY = 0;
    const minTranslateY = screenHeight - scaledHeight;

    // Constrain within bounds
    translateX.value = Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX));
    translateY.value = Math.max(minTranslateY, Math.min(maxTranslateY, newTranslateY));
  });
```

**Key Pattern**: Boundary constraints ensure users can't pan beyond the canvas edges, preventing confusion.

### 3. Pinch Zoom from Focal Point

Implement pinch-to-zoom that scales from the center of the user's two fingers:

```typescript
const pinchGesture = Gesture.Pinch()
  .onBegin(() => {
    savedScale.value = scale.value;
    savedTranslateX.value = translateX.value;
    savedTranslateY.value = translateY.value;
  })
  .onUpdate((e) => {
    const newScale = Math.max(0.5, Math.min(3, savedScale.value * e.scale));
    const focalX = e.focalX;
    const focalY = e.focalY;

    // Adjust translation to keep focal point stationary
    // IMPORTANT: Don't apply boundary constraints during zoom!
    translateX.value = focalX - (focalX - savedTranslateX.value) * (newScale / savedScale.value);
    translateY.value = focalY - (focalY - savedTranslateY.value) * (newScale / savedScale.value);
    scale.value = newScale;
  })
  .onEnd(() => {
    // Apply boundary constraints AFTER zoom completes to prevent view from flying away
    const scaledWidth = CANVAS_WIDTH * scale.value;
    const scaledHeight = CANVAS_HEIGHT * scale.value;
    const maxTranslateX = 0;
    const minTranslateX = screenWidth - scaledWidth;
    const maxTranslateY = 0;
    const minTranslateY = screenHeight - scaledHeight;

    translateX.value = Math.max(minTranslateX, Math.min(maxTranslateX, translateX.value));
    translateY.value = Math.max(minTranslateY, Math.min(maxTranslateY, translateY.value));

    // Save final constrained values
    savedScale.value = scale.value;
    savedTranslateX.value = translateX.value;
    savedTranslateY.value = translateY.value;
  });
```

**Key Patterns**:
- Using `focalX` and `focalY` creates intuitive zoom behavior that centers on where the user's fingers are
- **CRITICAL**: Do NOT apply boundary constraints during `onUpdate` - this causes the view to jump or "fly away" as the constraints fight against the focal point calculation. Only apply constraints in `onEnd` after the gesture completes
- The focal point formula `focalX - (focalX - savedTranslateX) * (newScale / savedScale)` keeps the canvas point under the focal point stationary during zoom

### 4. Background Grid

Create a visual grid for spatial orientation:

```typescript
<Svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
  {/* Background */}
  <Rect width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="#f5f5f5" />

  {/* Grid lines */}
  {Array.from({ length: Math.floor(CANVAS_WIDTH / 100) }).map((_, i) => (
    <Line
      key={`v-${i}`}
      x1={i * 100}
      y1={0}
      x2={i * 100}
      y2={CANVAS_HEIGHT}
      stroke="#e0e0e0"
      strokeWidth="1"
    />
  ))}
  {/* Repeat for horizontal lines */}
</Svg>
```

**Key Pattern**: A subtle grid helps users understand spatial relationships without being distracting.

### 5. Draggable Elements (Nodes)

Create draggable components that exist within the canvas coordinate space:

```typescript
function DraggableNode({ node, onPositionChange, canvasScale }) {
  const offsetX = useSharedValue(node.x_position);
  const offsetY = useSharedValue(node.y_position);

  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = offsetX.value;
      startY.value = offsetY.value;
    })
    .onUpdate((e) => {
      // Adjust for canvas scale
      offsetX.value = startX.value + e.translationX / canvasScale.value;
      offsetY.value = startY.value + e.translationY / canvasScale.value;
    })
    .onEnd(() => {
      // Use runOnJS to safely call async functions
      runOnJS(onPositionChange)(node.id, offsetX.value, offsetY.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }));

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View style={[styles.node, animatedStyle]}>
        {/* Node content */}
      </Animated.View>
    </GestureDetector>
  );
}
```

**Key Patterns**:
- Divide translation by `canvasScale.value` to maintain consistent drag speed at different zoom levels
- Use `runOnJS()` when calling callbacks from worklet context (gesture handlers)
- Store position in canvas coordinates, not screen coordinates

### 6. Draggable Lines

Lines require hit areas since SVG elements don't support gesture handlers directly:

```typescript
function DraggableLine({ line, onPositionChange, canvasScale }) {
  // Track both endpoints
  const startX = useSharedValue(line.start_x);
  const startY = useSharedValue(line.start_y);
  const endX = useSharedValue(line.end_x);
  const endY = useSharedValue(line.end_y);

  const dragGesture = Gesture.Pan()
    .onUpdate((e) => {
      const deltaX = e.translationX / canvasScale.value;
      const deltaY = e.translationY / canvasScale.value;
      // Move both endpoints together
      startX.value = savedStartX.value + deltaX;
      startY.value = savedStartY.value + deltaY;
      endX.value = savedEndX.value + deltaX;
      endY.value = savedEndY.value + deltaY;
    });

  // Calculate geometry for hit area
  const length = Math.sqrt(
    Math.pow(line.end_x - line.start_x, 2) + Math.pow(line.end_y - line.start_y, 2)
  );
  const angle = Math.atan2(line.end_y - line.start_y, line.end_x - line.start_x) * (180 / Math.PI);
  const centerX = (line.start_x + line.end_x) / 2;
  const centerY = (line.start_y + line.end_y) / 2;

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View
        style={{
          position: 'absolute',
          width: length,
          height: 20, // Hit area height
          left: centerX - length / 2,
          top: centerY - 10,
          transform: [{ rotate: `${angle}deg` }],
          backgroundColor: 'transparent',
        }}
      />
    </GestureDetector>
  );
}
```

**Key Pattern**: Create invisible rectangular hit areas positioned and rotated to align with visual elements.

### 7. Long Press for Editing

Combine long press with drag using gesture composition:

```typescript
const dragGesture = Gesture.Pan()...
const longPressGesture = Gesture.LongPress()
  .minDuration(500)
  .onStart((e) => {
    runOnJS(onLongPress)(e.absoluteX, e.absoluteY);
  });

// Race: whichever gesture activates first wins
const composedGesture = Gesture.Race(longPressGesture, dragGesture);
```

**Key Pattern**: `Gesture.Race()` allows either dragging OR long-pressing, preventing conflicts.

### 8. Edit Modals

Provide controls for modifying element properties:

```typescript
{editingLine && (
  <Modal visible onRequestClose={() => setEditingLine(null)}>
    <ScrollView>
      <Text>Length: {Math.round(editingLine.length)}</Text>
      <TouchableOpacity onPress={() =>
        setEditingLine({ ...editingLine, length: editingLine.length + 10 })
      }>
        <Text>+</Text>
      </TouchableOpacity>

      <Text>Rotation: {Math.round(editingLine.angle)}°</Text>
      <TouchableOpacity onPress={() =>
        setEditingLine({
          ...editingLine,
          angle: (editingLine.angle + 15) % 360
        })
      }>
        <Text>Rotate</Text>
      </TouchableOpacity>
    </ScrollView>
  </Modal>
)}
```

**Key Pattern**: Store geometric properties (length, angle, center) in editing state, then convert back to coordinates on save.

### 9. Data Persistence

Structure your database schema to store element positions and properties:

```typescript
// Node/Box schema
{
  id: string,
  x_position: number,
  y_position: number,
  // ... custom properties (title, color, etc.)
}

// Line/Connection schema
{
  id: string,
  start_x: number,
  start_y: number,
  end_x: number,
  end_y: number,
  start_node_id?: string,  // Optional: link to nodes
  end_node_id?: string,
  // ... custom properties (color, thickness, etc.)
}
```

**Key Pattern**: Store positions in canvas coordinates, not screen coordinates. This ensures consistent layout across devices.

## Common Variations

### Different Element Types

- **Boxes/Nodes**: Use `<Animated.View>` with absolute positioning
- **Lines/Connections**: Use SVG `<Line>` for visuals + invisible hit areas for interaction
- **Shapes**: Use SVG shapes with gesture wrappers
- **Text**: Embed in nodes or use positioned `<Text>` components
- **Images**: Use `<Image>` within absolutely positioned containers

### Different Interaction Patterns

- **Tap to select**: Use `Gesture.Tap()` instead of `LongPress()`
- **Double-tap to edit**: Use `Gesture.Tap().numberOfTaps(2)`
- **Multi-select**: Maintain selection state array and use Ctrl/Shift modifiers
- **Snap to grid**: Round positions to grid increments in `onEnd()`
- **Connections**: Drag from node anchors to create lines

### Different Layouts

- **Infinite canvas**: Remove boundary constraints from pan gesture
- **Fixed viewport**: Set canvas size equal to screen size, no pan/zoom
- **Hierarchical**: Layer nodes at different z-indices
- **Grouped**: Implement parent-child relationships where dragging parent moves children

## Common Issues and Solutions

### Zoom "Flying Away" or Jumping Around

**Problem**: When pinching to zoom, the view shoots away, jumps erratically, or the zoom pivot point feels offset from where you're touching.

**Cause**: Boundary constraints being applied during the zoom gesture's `onUpdate` handler interfere with the focal point calculation. As the canvas scale changes, the boundary limits change, causing the translation to be clamped mid-gesture. This disrupts the smooth focal point zoom behavior.

**Solution**:
1. Calculate focal point translation in `onUpdate` WITHOUT applying boundary constraints
2. Only apply boundary constraints in `onEnd` after the zoom gesture completes
3. This allows the focal point calculation to work smoothly, then gently snaps the canvas back in bounds when the user finishes zooming

```typescript
const pinchGesture = Gesture.Pinch()
  .onUpdate((e) => {
    // Calculate WITHOUT constraints
    translateX.value = focalX - (focalX - savedTranslateX.value) * (newScale / savedScale.value);
    scale.value = newScale;
  })
  .onEnd(() => {
    // Apply constraints AFTER zoom completes
    translateX.value = Math.max(minTranslateX, Math.min(maxTranslateX, translateX.value));
  });
```

**NOTE**: These proposed fixes did not work. The agent failed to resolve the zoom "shooting off to the side" issue. The problem persists in the current implementation.

### Dragging Elements Causes Crash

**Problem**: App crashes when releasing a dragged node or line.

**Cause**: Async callback functions (like database updates) being called directly from worklet context.

**Solution**: Wrap callbacks with `runOnJS()` when calling from gesture handlers:

```typescript
.onEnd(() => {
  runOnJS(onPositionChange)(node.id, offsetX.value, offsetY.value);
});
```

### White Space Visible Outside Canvas

**Problem**: User can pan to see empty white space beyond the canvas grid.

**Cause**: Pan gesture lacks boundary constraints, or boundary constraints have incorrect calculations.

**Solution**: Calculate min/max translation based on scaled canvas dimensions and constrain values:

```typescript
const scaledWidth = CANVAS_WIDTH * scale.value;
const minTranslateX = screenWidth - scaledWidth; // Left boundary
const maxTranslateX = 0; // Right boundary (canvas left edge at screen left)
translateX.value = Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX));
```

## Performance Considerations

1. **Use `worklet` functions**: Keep animations on UI thread
2. **Limit re-renders**: Minimize state updates during gestures
3. **Virtualize large datasets**: Only render visible elements
4. **Optimize SVG**: Complex paths can be slow; use simple shapes when possible
5. **Debounce database writes**: Don't save position on every frame

## Testing Checklist

- [ ] Pan gesture respects boundaries at all zoom levels
- [ ] Pinch zoom centers on finger position
- [ ] Elements drag smoothly at different zoom levels
- [ ] Long press doesn't interfere with dragging
- [ ] Modal edits persist correctly to database
- [ ] App doesn't crash when releasing dragged elements
- [ ] Hit areas are appropriately sized for touch interaction
- [ ] Canvas initializes at a sensible default view

## Styling Recommendations

- Use subtle grid colors (#e0e0e0) to avoid visual clutter
- Provide clear visual feedback for selected elements
- Use consistent spacing and sizing
- Ensure touch targets are at least 44x44 points
- Consider color-coding different element types
- Add shadows or borders to lift elements off the canvas

## Future Enhancements

Consider adding:
- Undo/redo functionality
- Export to image or PDF
- Real-time collaboration
- Templates and presets
- Auto-layout algorithms
- Keyboard shortcuts (web)
- Accessibility features (VoiceOver/TalkBack support)

---

**Remember**: This is a flexible pattern. Adapt the coordinate system, gesture combinations, element types, and data schema to fit your specific use case while maintaining the core principles of smooth pan/zoom and intuitive dragging.
