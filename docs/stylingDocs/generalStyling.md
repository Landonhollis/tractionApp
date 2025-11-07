# General Styling Guide

## Global UI Design Bias

The global UI design bias is a high-level design philosophy defined in `prd's/1overview.md` under "Global UI design bias - ONLY FOR STYLING AGENTS!!!" This bias guides all styling decisions across the app.

### Application
Add this comment to all screen and component files created via SRDs (Screen Requirements Documents):

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

**Rules:**
- Add to `/app/**/*.tsx` and `/components/**/*.tsx` files specified in SRDs only
- Append at bottom of files without modifying existing functional code
- Exclude layout/infrastructure files unless explicitly defined in SRD

---

## Typography

### Font Selection & Hierarchy
- **Limit variations**: Use 3-4 text sizes per screen maximum
- **Clear relationships**: heading → subheading → body → secondary/metadata
- **One primary heading** per screen, distinctly larger than subheadings
- **Platform differences**:
  - iOS: Vary font weights (light/regular/medium/semibold) over size changes
  - Android: Use contrasting font sizes with less weight variation

### Responsive Scaling
- **Avoid static sizes**: Use responsive scaling for different screen sizes and pixel densities
- **Libraries**: Leverage `react-native-size-matters` for `moderateScale` functions based on guideline sizes
- **APIs**: Use `PixelRatio` and `Dimensions` for device-appropriate scaling
- **Accessibility**: Enable `allowFontScaling={true}` on Text components to respect user's Dynamic Type settings

### Readability Standards
- **Line height**: Adequate spacing improves readability (1.4-1.6 for body text)
- **Text width**: Limit line length on larger screens (~60-80 characters)
- **Weight usage**: Prefer medium/semibold for emphasis over bold
- **Caps usage**: Reserve ALL-CAPS for small labels or buttons only
- **Minimum sizes**: Maintain readable minimum font sizes (14-16px for body text)

### Text Color Hierarchy
- **Primary content**: Highest opacity/contrast for main information
- **Secondary content**: Slightly muted for metadata and supporting text
- **Disabled text**: Clearly subdued to indicate non-interactivity
- **Contrast ratios**: Maintain minimum 4.5:1 for WCAG compliance

---

## Color Placement & Visual Hierarchy

### Visual Hierarchy Principles
- **Reading patterns**: Design for Z-pattern (desktop) and F-pattern (mobile) scanning
- **Rule of thirds**: Position key elements along intersecting thirds
- **Scale & contrast**: Use size and color contrast to direct attention
- **White space**: Leverage negative space to create breathing room and focus
- **Proximity**: Group related elements closer; separate unrelated content

### Color Placement Strategies
- **Layering for depth**: Use color and motion to convey hierarchy
- **Contrast requirements**: Ensure 4.5:1 ratio between text and backgrounds
- **Accessibility beyond color**: Support with patterns, textures, labels, icons, or size changes for color-blind users
- **Tertiary colors**: Use contrasting accents to balance primary/secondary colors or draw heightened attention

### Platform-Specific Considerations
- **iOS**: Emphasize subtle color transitions and lighter touch
- **Android**: Support bolder color contrasts and material design principles
- **Blend modes** (RN 0.77+): Use exclusion, hue, saturation, and color modes for visual effects

---

## 3D Looks, Depth & Elevation

### Platform-Specific Shadow Implementation
- **iOS shadows**: Use `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`
- **Android elevation**: Use `elevation` property (combines all shadow props)
- **Cross-platform** (New Architecture): Use `boxShadow` style prop for unified approach
- **Hairline borders**: Use `StyleSheet.hairlineWidth` for device-specific thin lines

### Shadow & Depth Best Practices
- **Purpose-driven shadows**: Every shadow should communicate elevation or focus
- **Modest intensity**: Keep shadows subtle to avoid visual noise
- **Layered depth**: Combine multiple elevation levels for card hierarchies
- **Performance**: Use lightweight shadows over heavy blur effects when possible
- **Liquid glass UI**: Combine `expo-blur`, `react-native-skia` for modern glass morphism effects

### Libraries & Tools
- **Cross-platform shadows**: `react-native-shadow-2` for Android, iOS, Web, and Expo
- **Blur effects**: `expo-blur`, `@sbaiahmed1/react-native-blur` for depth perception
- **Android fix**: Add `margin` equal to `elevation` value if shadow doesn't appear

---

## Layout, Spacing & Sectioning

### Spacing System
- **Consistent scale**: Define and use spacing scale (4px, 8px, 16px, 24px, 32px, etc.)
- **Avoid arbitrary values**: No one-off spacing decisions
- **Spacing conventions**:
  - Left component uses `marginRight` to space from right component
  - Top component uses `marginBottom` to space from bottom component
- **Grouping**: Tighter spacing for related content; generous space for section separation
- **Horizontal consistency**: Maintain uniform horizontal padding across screens

### Touch Targets & Accessibility
- **Minimum size**: 44x44 points for interactive elements
- **Edge padding**: Prevent content from touching screen edges
- **Thumb zones**: Consider reachability on mobile devices (bottom third most accessible)

### Sectioning with Borders & Dividers
- **Spacing first**: Always consider spacing before adding borders
- **Subtle borders**: When needed, keep borders light (1px or hairlineWidth)
- **Avoid compounding**: Don't add borders to both parent and child
- **Divider components**: Use library dividers (React Native Paper, Elements, NativeBase) for consistency
- **Stack abstraction**: Use Stack components with `padding` and `spacing` props to manage whitespace

### Vertical Rhythm
- **Section consistency**: Maintain uniform spacing between sections
- **Intentional white space**: Use negative space for readability and visual breathing room
- **Hierarchy through spacing**: Build visual importance through spacing variations alone

---

## Interactive States & Micro-Interactions

### Component States
- **Pressable over Touchable**: Use `Pressable` for better control over touch interactions
- **State types**: Default, hover, pressed, active, selected, disabled, loading, error
- **Visual feedback**: Every interactive element needs clear state changes
- **Multiple indicators**: Combine color, icon, and text for state communication (especially errors)

### Loading States
- **Purposeful animations**: Use `ActivityIndicator` or skeleton screens
- **Continuous rotation**: Implement with `withRepeat` and `withTiming` from Reanimated
- **Loading buttons**: Show loading state on buttons during async operations
- **Expected positions**: Place loading indicators where users anticipate content

### State Animation Patterns
- **SharedValue tracking**: Use Reanimated's `SharedValue` to track press/active states
- **Smooth transitions**: Use `interpolateColor` for color state transitions
- **Scale & opacity**: Animate both for tactile press feedback
- **Custom hooks**: Create reusable animation logic across components with shared state management

### Empty & Error States
- **Never blank**: Always show messaging for missing data
- **Actionable errors**: Provide clear retry options or next steps
- **Helpful guidance**: Use illustrations to soften empty state experience

---

## Animations & Transitions

### Performance-First Animation
- **React Native Reanimated 3**: Primary library for 60-120 FPS animations
- **UI thread execution**: Use worklets to run animations on native thread, bypassing JS bridge
- **Native driver**: Set `useNativeDriver: true` with built-in Animated API
- **Avoid choppy animations**: Never run animations on JavaScript thread

### Animation Best Practices
- **Subtle & purposeful**: Keep interactions meaningful, not distracting
- **Appropriate duration**: 200-300ms for most interactions; 400-600ms for larger movements
- **Easing functions**: Use natural easing (ease-out for entrances, ease-in for exits)
- **60+ FPS target**: Ensure animations maintain smooth frame rates
- **High-refresh displays**: Reanimated reaches up to 120 FPS on modern devices

### Micro-Interactions
- **Guide behavior**: Error shakes, button scaling, swipe confirmations
- **Feedback loops**: Immediate response to user actions builds trust
- **Polish through detail**: Small animations make apps feel alive and premium

### Libraries & Tools
- **Reanimated 3/4**: Latest versions with improved hooks and CSS-style animations
- **React Native Skia**: Direct GPU rendering for complex graphics
- **Gesture Handler**: Integrate smooth gestures with animations
- **Future (Reanimated 4)**: CSS-style animations for easier, more predictable motion

---

## Platform Behavior

### Safe Areas & System UI
- **Respect safe areas**: Account for notches, home indicators, status bars
- **SafeAreaView usage**: Wrap content or use `useSafeAreaInsets` hook
- **Bottom navigation**: Must clear system UI elements with adequate padding

### Scrolling
- **Native behavior**: Preserve platform scroll feel (bounce on iOS, overscroll on Android)
- **Proper flex config**: Ensure `flex: 1` and appropriate container setup for scrollable content
- **FlatList for performance**: Use for dynamic/long lists over ScrollView with `.map()`

### Keyboard Handling
- **Keyboard avoidance**: Use `KeyboardAvoidingView` or `react-native-keyboard-aware-scroll-view`
- **Input visibility**: Ensure focused inputs scroll into view when keyboard appears
- **Dismissal gestures**: Implement keyboard dismiss on scroll or tap outside
- **Bottom-pinned buttons**: Adjust position when keyboard is active

---

## Performance & Optimization

### Images
- **Explicit dimensions**: Provide width/height or aspectRatio to prevent layout shift
- **Loading states**: Show placeholders for remote images
- **Resolution optimization**: Serve appropriate image sizes for device density
- **Caching**: Leverage FastImage or Expo Image for automatic caching

### List Rendering
- **FlatList always**: Use over ScrollView mapping for any dynamic list
- **Extract components**: Define list item components outside render for performance
- **Key extractors**: Provide stable, unique `keyExtractor` for list items
- **windowSize**: Adjust `windowSize` prop for memory management on very long lists

### Component Optimization
- **Avoid inline functions**: Extract handlers to prevent re-renders
- **Memoization**: Use `React.memo`, `useMemo`, `useCallback` appropriately
- **Conditional rendering**: Unmount unused components rather than hiding with opacity

---

## Accessibility

### Screen Readers
- **Meaningful labels**: Provide `accessibilityLabel` for non-text elements (icons, images)
- **Interaction hints**: Add `accessibilityHint` for non-obvious interactions
- **Logical grouping**: Use `accessibilityRole` and group related elements
- **Focus order**: Ensure logical tab/focus order through component structure

### Visual Accessibility
- **Color independence**: Never rely solely on color to convey information
- **Contrast compliance**: Verify 4.5:1 ratio for text, 3:1 for UI components (WCAG AA)
- **Touch targets**: Minimum 44x44 for all interactive elements
- **Text scaling**: Support Dynamic Type with `allowFontScaling`

### Testing
- **Screen reader testing**: Test with VoiceOver (iOS) and TalkBack (Android)
- **Color contrast tools**: Use WCAG Contrast Checker during design and development
- **Accessibility scanner**: Run automated checks regularly

---

## Consistency & System Patterns

### Behavioral Consistency
- **Identical elements behave identically**: Same UI patterns should have same interactions
- **Reuse over reinvention**: Prefer existing patterns to custom one-offs
- **Predictable interactions**: Standard gestures should feel native to platform
- **Systematic approach**: Define interaction patterns once, apply everywhere

### Design System Adherence
- **Component library**: Build and maintain reusable components
- **Theme consistency**: Use centralized theme object for colors, spacing, typography
- **Pattern documentation**: Document patterns for team alignment
- **Regular audits**: Review app for consistency drift over time
