# setTheme Function

Updates the current theme and persists to database.

---

## Implementation

```typescript
const setTheme = async (themeName: Ctn) => {
  setCtn(themeName)
  try {
    updateThemeName(themeName)
  } catch (error) {
    console.log('Error updating theme name:', error)
  }
}
```

---

## Usage

```typescript
// Switch to theme2
await setTheme('theme2')

// Switch to theme1
await setTheme('theme1')

// Toggle between two themes
const newTheme = ctn === 'theme1' ? 'theme2' : 'theme1'
await setTheme(newTheme)
```
