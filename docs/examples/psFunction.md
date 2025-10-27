# ps Function

Parses space-separated theme keys into a React Native style object.

---

## Implementation

```typescript
const ps = (styleString: string) => {
  const styles = styleString
    .split(' ')
    .filter(Boolean)
    .map(className => ct[className as keyof typeof ct])
    .filter(Boolean)

  return Object.assign({}, ...styles)
}
```

---

## Usage

```typescript
// Single style
ps('bg-1')
// Returns: { backgroundColor: "rgb(17, 17, 17)" }

// Multiple styles
ps('bg-1 text-normal f-3 text-md')
// Returns: {
//   backgroundColor: "rgb(17, 17, 17)",
//   color: "rgb(185, 185, 185)",
//   fontFamily: 'DM',
//   fontSize: 16
// }

// With borders and shadows
ps('bg-2 br-3 shadow-2 bw-1 bc-muted')
// Returns merged object with all style properties

// Empty strings are filtered
ps('bg-1  text-normal') // Extra spaces are ignored

// Combine with inline styles
const style = [ps('bg-1 text-normal'), { padding: 16 }]
```
