# Chart Font Configuration Issue

## Error
```
TypeError: xAxis.font.getGlyphIDs is not a function (it is undefined)
```

## Location
`app/(app)/data-history.tsx` line 287

## Issue
The screenStylingAgent added font theming to CartesianChart's axisOptions:
```javascript
axisOptions={{
  formatXLabel: formatXLabel,
  labelColor: textNormalColor,
  font: ps('f-5').fontFamily,  // ❌ Incorrect
}}
```

## Fix
Remove the font property:
```javascript
axisOptions={{
  formatXLabel: formatXLabel,
  labelColor: textNormalColor,
}}
```

## Root Cause
1. **Incorrect font object format**: CartesianChart (victory-native) expects a Skia font object with methods like `getGlyphIDs()`, not a string font family name
2. **Agent misapplication**: The screenStylingAgent attempted to apply theme fonts to a charting library that requires a specific font object format incompatible with the `ps()` system
3. **Missing validation**: The agent didn't verify the font prop requirements for the third-party chart component

## Prevention
- Chart libraries with custom font requirements should not have theme fonts applied via `ps().fontFamily`
- Agent should skip font theming for complex third-party visualization components
- Use default chart fonts unless explicitly configured with proper Skia font objects
