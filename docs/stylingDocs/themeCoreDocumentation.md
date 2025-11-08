# THEME CORE DOCUMENTATION


## OVERVIEW
the theme core system gives a very easy way to have highly customizable and user changeable styling all across the app. it does this mainly via the 'ps' function, which stands for parse styles. in the style prop in the tsx, the coder should input ps(styles here) in a native wind format. the ps function uses the all themes object to map these native wind type styles to the proper real styles that will work in the style prop. when the user uses the changeTheme function, it should update the theme in the backend/database and also update the theme immediately in the app so that the app does not have to listen live to the backend changes. for simplicity, all screens and components, even before the user signs in, should use these styles and if themeName is 'null', like it will be before the user signs in, then the system should default to the first theme (might not be named theme1). these themes will need to be loaded a bit differently in the _layout file for the status bar as shown below.
  - note: the keys for every key value pair is the same in each theme object.

## IMPORTANT TERMINOLOGY

**Global UI Design Bias** vs **Screen Bias Patterns** - These are different concepts:

- **Global UI Design Bias**: The overall app-wide design philosophy chosen by the human developer
  - Located in `prd's/1overview.md` under "Global UI design bias"
  - Options: presentational, business management, shop, or custom
  - Human chooses ONE option and checks the box in 1overview.md
  - This bias is pasted as a comment at the bottom of all TSX files by stylingSetupAgent
  - Guides the overall feel and approach of the entire app

- **Screen Bias Patterns**: Specific UX optimization patterns for individual screen types
  - Located in `docs/stylingDocs/screenBiases/screenBiasDirectory.md`
  - Examples: Data Dashboard, Checkout/Payment, Product Detail, Forms/Intake, etc.
  - screenStylingAgent chooses applicable patterns for each screen (can choose 0-3 per screen)
  - Humans can specify custom screen bias in SRD → coding agent adds to TSX → screenStylingAgent reads it
  - Guides what each individual screen optimizes for (clarity, conversion, scanning, etc.)


## WHEN TO USE
  - the theme core should be used everywhere it possibly can be used. 
  - where it cant be used, tailwind should be used. 
  - if tailwind and the theme core can not be used, the style prop outside of the ps functions should be used.

## the theme name
ctn
  - this is the Current Theme Name. 
  - it is just a name, not the whole object. 
  - this is what is stored in the backend/database for user preferences. 
  - the ps function uses it to map to the correct theme. 


## THE 'allThemes' OBJECT
- The following are the theme objects that the ps function should use to map the native wind styles to the real style prop styles. note: the names of each object may not stay the same, there may be more or less themes depending on what is required and a type should be made for the objects.
- theme objects should go in the assets folder, and in the themeObjects.tsx file.

### Important Naming Rules
- **DO NOT change the object names** (e.g., `theme1`, `theme2`, etc.) once they are established, as other parts of the codebase may reference these names
- **The `themeName` field WITHIN the theme object CAN be changed** to a more descriptive name (e.g., from `themeName: 'theme1'` to `themeName: 'darkProfessional'`)
- All themes must have the same keys - only the values differ between themes 
```tsx
// IMPORTANT: Keep these placeholder constants (p, p2, p3, pFont) AND all placeholder values inside theme objects
// until the styling agents run. The agents will replace placeholders with real values and delete these constants.
// Do NOT manually delete or replace these - let the agents handle it.
//
// AGENT WORKFLOW:
// 1. fontsAgent: Replaces pFont with actual font family names in 'f-1' through 'f-6' for all themes
// 2. stylingSetupAgent: Replaces p, p2, p3 with real values for colors, sizes, shadows, etc., and deletes all placeholder constants
const p = 0;
const p2 = 'rgb(0, 0, 0)'
const p3 = 'light' as const;
const pFont = 'PLACEHOLDER_FONT'; // fontsAgent will replace this

export const allThemes = {
  theme1: {
    themeName:'theme1',
    'f-1': { fontFamily: pFont },
    'f-2': { fontFamily: pFont },
    'f-3': { fontFamily: pFont },
    'f-4': { fontFamily: pFont },
    'f-5': { fontFamily: pFont },
    'f-6': { fontFamily: pFont },
    'fw-200': { fontWeight: '200' as const },
    'fw-300': { fontWeight: '300' as const },
    'fw-400': { fontWeight: '400' as const },
    'fw-500': { fontWeight: '500' as const },
    'fw-600': { fontWeight: '600' as const },
    'fw-700': { fontWeight: '700' as const },
    'fw-800': { fontWeight: '800' as const },
    'br-0': { borderRadius: p },
    'br-1': { borderRadius: p },
    'br-2': { borderRadius: p },
    'br-3': { borderRadius: p },
    'br-4': { borderRadius: p },
    'bw-0': { borderWidth: p },
    'bw-1': { borderWidth: p },
    'bw-2': { borderWidth: p },
    'bw-3': { borderWidth: p },
    'bw-4': { borderWidth: p },
    'bw-l-1': { borderLeftWidth: p },
    'bw-l-2': { borderLeftWidth: p },
    'bw-l-3': { borderLeftWidth: p },
    'bw-l-4': { borderLeftWidth: p },
    'bw-r-1': { borderRightWidth: p },
    'bw-r-2': { borderRightWidth: p },
    'bw-r-3': { borderRightWidth: p },
    'bw-r-4': { borderRightWidth: p },
    'bw-t-1': { borderTopWidth: p },
    'bw-t-2': { borderTopWidth: p },
    'bw-t-3': { borderTopWidth: p },
    'bw-t-4': { borderTopWidth: p },
    'bw-b-1': { borderBottomWidth: p },
    'bw-b-2': { borderBottomWidth: p },
    'bw-b-3': { borderBottomWidth: p },
    'bw-b-4': { borderBottomWidth: p },
    'bg-1': { backgroundColor: p2 },
    'bg-2': { backgroundColor: p2 },
    'bg-3': { backgroundColor: p2 },
    'bg-4': { backgroundColor: p2 },
    'bg-5': { backgroundColor: p2 },
    'bg-6': { backgroundColor: p2 },
    'bg-a1': { backgroundColor: p2 },
    'bg-a2': { backgroundColor: p2 },
    'bg-a3': { backgroundColor: p2 },
    'text-normal': { color: p2 },
    'text-muted': { color: p2 },
    'text-strong': { color: p2 },
    'text-a1': { color: p2 },
    'text-a2': { color: p2 },
    'text-a3': { color: p2 },
    'text-inverse': { color: p2 },
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: p2 },
    'bc-muted': { borderColor: p2 },
    'bc-strong': { borderColor: p2 },
    'bc-accent': { borderColor: p2 },
    'shadow-1': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'shadow-2': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'shadow-3': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'sb-style': p3,
  },
  theme2: {
    themeName:'theme2',
    'f-1': { fontFamily: 'Lora' },
    'f-2': { fontFamily: 'Lora-Italic' },
    'f-3': { fontFamily: 'DM' },
    'f-4': { fontFamily: 'DM-Italic' },
    'f-5': { fontFamily: 'Lora' },
    'f-6': { fontFamily: 'Lora' },
    'fw-200': { fontWeight: '200' as const },
    'fw-300': { fontWeight: '300' as const },
    'fw-400': { fontWeight: '400' as const },
    'fw-500': { fontWeight: '500' as const },
    'fw-600': { fontWeight: '600' as const },
    'fw-700': { fontWeight: '700' as const },
    'fw-800': { fontWeight: '800' as const },
    'br-0': { borderRadius: p },
    'br-1': { borderRadius: p },
    'br-2': { borderRadius: p },
    'br-3': { borderRadius: p },
    'br-4': { borderRadius: p },
    'bw-0': { borderWidth: p },
    'bw-1': { borderWidth: p },
    'bw-2': { borderWidth: p },
    'bw-3': { borderWidth: p },
    'bw-4': { borderWidth: p },
    'bw-l-1': { borderLeftWidth: p },
    'bw-l-2': { borderLeftWidth: p },
    'bw-l-3': { borderLeftWidth: p },
    'bw-l-4': { borderLeftWidth: p },
    'bw-r-1': { borderRightWidth: p },
    'bw-r-2': { borderRightWidth: p },
    'bw-r-3': { borderRightWidth: p },
    'bw-r-4': { borderRightWidth: p },
    'bw-t-1': { borderTopWidth: p },
    'bw-t-2': { borderTopWidth: p },
    'bw-t-3': { borderTopWidth: p },
    'bw-t-4': { borderTopWidth: p },
    'bw-b-1': { borderBottomWidth: p },
    'bw-b-2': { borderBottomWidth: p },
    'bw-b-3': { borderBottomWidth: p },
    'bw-b-4': { borderBottomWidth: p },
    'bg-1': { backgroundColor: p2 },
    'bg-2': { backgroundColor: p2 },
    'bg-3': { backgroundColor: p2 },
    'bg-4': { backgroundColor: p2 },
    'bg-5': { backgroundColor: p2 },
    'bg-6': { backgroundColor: p2 },
    'bg-a1': { backgroundColor: p2 },
    'bg-a2': { backgroundColor: p2 },
    'bg-a3': { backgroundColor: p2 },
    'text-normal': { color: p2 },
    'text-muted': { color: p2 },
    'text-strong': { color: p2 },
    'text-a1': { color: p2 },
    'text-a2': { color: p2 },
    'text-a3': { color: p2 },
    'text-inverse': { color: p2 },
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: p2 },
    'bc-muted': { borderColor: p2 },
    'bc-strong': { borderColor: p2 },
    'bc-accent': { borderColor: p2 },
    'shadow-1': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'shadow-2': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'shadow-3': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'sb-style': p3,
  },
  theme3: {
    themeName:'theme3',
    'f-1': { fontFamily: 'Lora' },
    'f-2': { fontFamily: 'Lora-Italic' },
    'f-3': { fontFamily: 'DM' },
    'f-4': { fontFamily: 'DM-Italic' },
    'f-5': { fontFamily: 'Lora' },
    'f-6': { fontFamily: 'Lora' },
    'fw-200': { fontWeight: '200' as const },
    'fw-300': { fontWeight: '300' as const },
    'fw-400': { fontWeight: '400' as const },
    'fw-500': { fontWeight: '500' as const },
    'fw-600': { fontWeight: '600' as const },
    'fw-700': { fontWeight: '700' as const },
    'fw-800': { fontWeight: '800' as const },
    'br-0': { borderRadius: p },
    'br-1': { borderRadius: p },
    'br-2': { borderRadius: p },
    'br-3': { borderRadius: p },
    'br-4': { borderRadius: p },
    'bw-0': { borderWidth: p },
    'bw-1': { borderWidth: p },
    'bw-2': { borderWidth: p },
    'bw-3': { borderWidth: p },
    'bw-4': { borderWidth: p },
    'bw-l-1': { borderLeftWidth: p },
    'bw-l-2': { borderLeftWidth: p },
    'bw-l-3': { borderLeftWidth: p },
    'bw-l-4': { borderLeftWidth: p },
    'bw-r-1': { borderRightWidth: p },
    'bw-r-2': { borderRightWidth: p },
    'bw-r-3': { borderRightWidth: p },
    'bw-r-4': { borderRightWidth: p },
    'bw-t-1': { borderTopWidth: p },
    'bw-t-2': { borderTopWidth: p },
    'bw-t-3': { borderTopWidth: p },
    'bw-t-4': { borderTopWidth: p },
    'bw-b-1': { borderBottomWidth: p },
    'bw-b-2': { borderBottomWidth: p },
    'bw-b-3': { borderBottomWidth: p },
    'bw-b-4': { borderBottomWidth: p },
    'bg-1': { backgroundColor: p2 },
    'bg-2': { backgroundColor: p2 },
    'bg-3': { backgroundColor: p2 },
    'bg-4': { backgroundColor: p2 },
    'bg-5': { backgroundColor: p2 },
    'bg-6': { backgroundColor: p2 },
    'bg-a1': { backgroundColor: p2 },
    'bg-a2': { backgroundColor: p2 },
    'bg-a3': { backgroundColor: p2 },
    'text-normal': { color: p2 },
    'text-muted': { color: p2 },
    'text-strong': { color: p2 },
    'text-a1': { color: p2 },
    'text-a2': { color: p2 },
    'text-a3': { color: p2 },
    'text-inverse': { color: p2 },
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: p2 },
    'bc-muted': { borderColor: p2 },
    'bc-strong': { borderColor: p2 },
    'bc-accent': { borderColor: p2 },
    'shadow-1': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'shadow-2': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'shadow-3': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'sb-style': p3,
  },
  theme4: {
    themeName:'theme4',
    'f-1': { fontFamily: 'Lora' },
    'f-2': { fontFamily: 'Lora-Italic' },
    'f-3': { fontFamily: 'DM' },
    'f-4': { fontFamily: 'DM-Italic' },
    'f-5': { fontFamily: 'Lora' },
    'f-6': { fontFamily: 'Lora' },
    'fw-200': { fontWeight: '200' as const },
    'fw-300': { fontWeight: '300' as const },
    'fw-400': { fontWeight: '400' as const },
    'fw-500': { fontWeight: '500' as const },
    'fw-600': { fontWeight: '600' as const },
    'fw-700': { fontWeight: '700' as const },
    'fw-800': { fontWeight: '800' as const },
    'br-0': { borderRadius: p },
    'br-1': { borderRadius: p },
    'br-2': { borderRadius: p },
    'br-3': { borderRadius: p },
    'br-4': { borderRadius: p },
    'bw-0': { borderWidth: p },
    'bw-1': { borderWidth: p },
    'bw-2': { borderWidth: p },
    'bw-3': { borderWidth: p },
    'bw-4': { borderWidth: p },
    'bw-l-1': { borderLeftWidth: p },
    'bw-l-2': { borderLeftWidth: p },
    'bw-l-3': { borderLeftWidth: p },
    'bw-l-4': { borderLeftWidth: p },
    'bw-r-1': { borderRightWidth: p },
    'bw-r-2': { borderRightWidth: p },
    'bw-r-3': { borderRightWidth: p },
    'bw-r-4': { borderRightWidth: p },
    'bw-t-1': { borderTopWidth: p },
    'bw-t-2': { borderTopWidth: p },
    'bw-t-3': { borderTopWidth: p },
    'bw-t-4': { borderTopWidth: p },
    'bw-b-1': { borderBottomWidth: p },
    'bw-b-2': { borderBottomWidth: p },
    'bw-b-3': { borderBottomWidth: p },
    'bw-b-4': { borderBottomWidth: p },
    'bg-1': { backgroundColor: p2 },
    'bg-2': { backgroundColor: p2 },
    'bg-3': { backgroundColor: p2 },
    'bg-4': { backgroundColor: p2 },
    'bg-5': { backgroundColor: p2 },
    'bg-6': { backgroundColor: p2 },
    'bg-a1': { backgroundColor: p2 },
    'bg-a2': { backgroundColor: p2 },
    'bg-a3': { backgroundColor: p2 },
    'text-normal': { color: p2 },
    'text-muted': { color: p2 },
    'text-strong': { color: p2 },
    'text-a1': { color: p2 },
    'text-a2': { color: p2 },
    'text-a3': { color: p2 },
    'text-inverse': { color: p2 },
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: p2 },
    'bc-muted': { borderColor: p2 },
    'bc-strong': { borderColor: p2 },
    'bc-accent': { borderColor: p2 },
    'shadow-1': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'shadow-2': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'shadow-3': { shadowColor: p2, shadowOffset: { width: p, height: p }, shadowOpacity: p, shadowRadius: p, elevation: p },
    'sb-style': p3,
  },
};
```


## THE 'ps' FUNCTION
- This is the function that goes in the style prop, it takes native wind looking styles found in the theme objects and parses them into styles that the style prop understands
- ps just stands for "parse styles"
- this is a utility function and should go in the 'utilities' folder
```tsx
// Parse styles function - maps theme keys to React Native styles
  const ps = (styleString: string) => {
    const styles = styleString
      .split(' ')
      .filter(Boolean)
      .map(className => ct[className as keyof typeof ct])
      .filter(Boolean)

    return Object.assign({}, ...styles)
  }
```

## THE CHANGE THEME FUNCTION
- this changes the theme name in the data base, which is just the name, not the whole theme object. 
- ctn stands for current theme name. 
```tsx
const setTheme = async (themeName: Ctn) => {
    setCtn(themeName)
    try {
      updateThemeName(themeName)
    } catch (error) {
      console.log('Error updating theme name:')
    }
  }
```



# THE STATUS BAR

- because of issues with when certian things in the app load, you will most likley have to use the following in the _layout file and then directly input <statusBar> in the rootLayout. 
- sb-style in following stands for status bar style. its a prop in the theme objects and is needed so that the status bar is the correct light/dark option when the app loads. 

```tsx
function ThemedStatusBar() {
  const theme = useTheme();

  return (
    <StatusBar
      translucent
      backgroundColor="transparent"
      style={theme ? theme.ct['sb-style'] as 'light' | 'dark' : 'light'}
    />
  );
}
```


## THE THEME CORE PROVIDER AND IMPLIMENTATION

### IMPLEMENTATION REQUIREMENTS
the theme core provider answers most of the following questions which should be considered:
  - Where to store theme preferences in the database (which table/field)
  - How to sync theme changes with the backend
  - How to load user theme preferences on app startup
  - How to handle theme persistence across app restarts
  - Integration with the authentication system (if applicable) 

### THE THEME CORE PROVIDER FILE. 

Although this sytem is flexible so it can be changed, the following is an example of a theme core provider file which lives in the providers folder in the root of the project. 

```tsx
import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeName, DEFAULT_THEME, allThemes, Theme } from '../constants/themes';
import { getCurrentTheme, ps, Ctn } from '../utils/themeUtils';
import { updateUserTheme, getUserTheme } from '../services/theme';

type ThemeContextType = {
  ctn: ThemeName; // Current Theme Name
  ct: Theme; // Current Theme object
  ps: (styleString: string) => any; // Parse styles function
  setTheme: (themeName: Ctn) => Promise<void>; // Change theme function
  isLoading: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  ctn: DEFAULT_THEME,
  ct: allThemes.theme1,
  ps: () => ({}),
  setTheme: async () => {},
  isLoading: true,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [ctn, setCtn] = useState<ThemeName>(DEFAULT_THEME);
  const [isLoading, setIsLoading] = useState(true);

  // Get current theme object based on theme name
  const ct = getCurrentTheme(ctn);

  // Parse styles function that uses current theme
  const parseStyles = (styleString: string) => ps(styleString, ct);

  // Load theme from storage on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Try to get theme from AsyncStorage first (for immediate loading)
        const storedTheme = await AsyncStorage.getItem('theme_name');
        if (storedTheme) {
          setCtn(storedTheme as ThemeName);
        }

        // Then try to get theme from backend (for authenticated users)
        const { themeName, error } = await getUserTheme();
        if (!error && themeName) {
          setCtn(themeName);
          // Update AsyncStorage with the backend theme
          await AsyncStorage.setItem('theme_name', themeName);
        } else if (error) {
          console.log('Error loading theme from backend:', error);
          // Fall back to stored theme or default
          if (!storedTheme) {
            setCtn(DEFAULT_THEME);
          }
        }
      } catch (error) {
        console.log('Error loading theme:', error);
        setCtn(DEFAULT_THEME);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  // Change theme function
  const setTheme = async (themeName: Ctn) => {
    try {
      // Update local state immediately for instant UI update
      setCtn(themeName);
      
      // Store in AsyncStorage for persistence
      await AsyncStorage.setItem('theme_name', themeName || DEFAULT_THEME);
      
      // Update backend if user is authenticated
      if (themeName) {
        const { error } = await updateUserTheme(themeName);
        if (error) {
          console.log('Error updating theme name:', error);
        }
      }
    } catch (error) {
      console.log('Error setting theme:', error);
      // Revert to previous theme on error
      const storedTheme = await AsyncStorage.getItem('theme_name');
      setCtn((storedTheme as ThemeName) || DEFAULT_THEME);
    }
  };

  const value: ThemeContextType = {
    ctn,
    ct,
    ps: parseStyles,
    setTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

```