# Theme Types

These type definitions correspond to the theme objects structure. They ensure type safety when working with themes.

---

## Basic Type Structure

```typescript
// Define the shape of a single theme object
type ThemeObject = typeof allThemes.theme1

// Define all valid theme names
type ThemeName = 'theme1' | 'theme2' | 'theme3' | 'theme4'

// Type for the allThemes object
type AllThemes = {
  [K in ThemeName]: {
    themeName: K
    'f-1': { fontFamily: string }
    'f-2': { fontFamily: string }
    'f-3': { fontFamily: string }
    'f-4': { fontFamily: string }
    'f-5': { fontFamily: string }
    'f-6': { fontFamily: string }
    'fw-200': { fontWeight: string }
    'fw-300': { fontWeight: string }
    'fw-400': { fontWeight: string }
    'fw-500': { fontWeight: string }
    'fw-600': { fontWeight: string }
    'fw-700': { fontWeight: string }
    'fw-800': { fontWeight: string }
    'br-0': { borderRadius: number }
    'br-1': { borderRadius: number }
    'br-2': { borderRadius: number }
    'br-3': { borderRadius: number }
    'br-4': { borderRadius: number }
    'bw-0': { borderWidth: number }
    'bw-1': { borderWidth: number }
    'bw-2': { borderWidth: number }
    'bw-3': { borderWidth: number }
    'bw-4': { borderWidth: number }
    'bw-l-1': { borderLeftWidth: number }
    'bw-l-2': { borderLeftWidth: number }
    'bw-l-3': { borderLeftWidth: number }
    'bw-l-4': { borderLeftWidth: number }
    'bw-r-1': { borderRightWidth: number }
    'bw-r-2': { borderRightWidth: number }
    'bw-r-3': { borderRightWidth: number }
    'bw-r-4': { borderRightWidth: number }
    'bw-t-1': { borderTopWidth: number }
    'bw-t-2': { borderTopWidth: number }
    'bw-t-3': { borderTopWidth: number }
    'bw-t-4': { borderTopWidth: number }
    'bw-b-1': { borderBottomWidth: number }
    'bw-b-2': { borderBottomWidth: number }
    'bw-b-3': { borderBottomWidth: number }
    'bw-b-4': { borderBottomWidth: number }
    'bg-1': { backgroundColor: string }
    'bg-2': { backgroundColor: string }
    'bg-3': { backgroundColor: string }
    'bg-4': { backgroundColor: string }
    'bg-5': { backgroundColor: string }
    'bg-6': { backgroundColor: string }
    'bg-a1': { backgroundColor: string }
    'bg-a2': { backgroundColor: string }
    'bg-a3': { backgroundColor: string }
    'text-normal': { color: string }
    'text-muted': { color: string }
    'text-strong': { color: string }
    'text-a1': { color: string }
    'text-a2': { color: string }
    'text-a3': { color: string }
    'text-inverse': { color: string }
    'text-xs': { fontSize: number }
    'text-sm': { fontSize: number }
    'text-md': { fontSize: number }
    'text-lg': { fontSize: number }
    'text-xl': { fontSize: number }
    'text-2xl': { fontSize: number }
    'bc-normal': { borderColor: string }
    'bc-muted': { borderColor: string }
    'bc-strong': { borderColor: string }
    'bc-accent': { borderColor: string }
    'shadow-1': {
      shadowColor: string
      shadowOffset: { width: number; height: number }
      shadowOpacity: number
      shadowRadius: number
      elevation: number
    }
    'shadow-2': {
      shadowColor: string
      shadowOffset: { width: number; height: number }
      shadowOpacity: number
      shadowRadius: number
      elevation: number
    }
    'shadow-3': {
      shadowColor: string
      shadowOffset: { width: number; height: number }
      shadowOpacity: number
      shadowRadius: number
      elevation: number
    }
    'sb-style': 'light' | 'dark'
  }
}
```

---

## Simplified Approach

Instead of manually defining all properties, infer types from the theme object:

```typescript
// Infer the theme object type
type Ct = typeof allThemes.theme1

// Define theme name type
type Ctn = 'theme1' | 'theme2' | 'theme3' | 'theme4'

// Or infer theme names from the object keys
type Ctn = keyof typeof allThemes
```

---

## Usage in Account Interface

```typescript
interface Account {
  // ... other properties
  ctn: Ctn  // Current theme name
  ct: Ct    // Current theme object
  setTheme: (themeName: Ctn) => Promise<void>
  ps: (styleString: string) => object
}
```

---

## Key Notes

- `Ct` (Current Theme) represents the shape of a single theme object
- `Ctn` (Current Theme Name) is a union of all valid theme names
- Use `typeof` to infer types directly from the theme object
- Theme names in the union type should match keys in `allThemes`
