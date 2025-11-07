# THEME CORE DOCUMENTATION


## OVERVIEW
the theme core system gives a very easy way to have highly customizable and user changeable styling all across the app. it does this mainly via the 'ps' function, which stands for parse styles. in the style prop in the tsx, the coder should input ps(styles here) in a native wind format. the ps function uses the all themes object to map these native wind type styles to the proper real styles that will work in the style prop. when the user uses the changeTheme function, it should update the theme in the backend/database and also update the theme immediately in the app so that the app does not have to listen live to the backend changes. for simplicity, all screens and components, even before the user signs in, should use these styles and if themeName is 'null', like it will be before the user signs in, then the system should default to the first theme (might not be named theme1). these themes will need to be loaded a bit differently in the _layout file for the status bar as shown below.
  - note: the keys for every key value pair is the same in each theme object.


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
export const allThemes = {
  theme1: {
    themeName:'theme1',
    'f-1': { fontFamily: 'Lora' },
    'f-2': { fontFamily: 'Lora-Italic' },
    'f-3': { fontFamily: 'DM' },
    'f-4': { fontFamily: 'DM-Italic' },
    'f-5': { fontFamily: 'Lora' },
    'f-6': { fontFamily: 'Lora' },
    'fw-200': { fontWeight: '200' },
    'fw-300': { fontWeight: '300' },
    'fw-400': { fontWeight: '400' },
    'fw-500': { fontWeight: '500' },
    'fw-600': { fontWeight: '600' },
    'fw-700': { fontWeight: '700' },
    'fw-800': { fontWeight: '800' },
    'br-0': { borderRadius: 0 },
    'br-1': { borderRadius: 2 },
    'br-2': { borderRadius: 4 },
    'br-3': { borderRadius: 8 },
    'br-4': { borderRadius: 12 },
    'bw-0': { borderWidth: 0 },
    'bw-1': { borderWidth: 0.5 },
    'bw-2': { borderWidth: 2 },
    'bw-3': { borderWidth: 4 },
    'bw-4': { borderWidth: 8 },
    'bw-l-1': { borderLeftWidth: 0.5 },
    'bw-l-2': { borderLeftWidth: 2 },
    'bw-l-3': { borderLeftWidth: 4 },
    'bw-l-4': { borderLeftWidth: 8 },
    'bw-r-1': { borderRightWidth: 0.5 },
    'bw-r-2': { borderRightWidth: 2 },
    'bw-r-3': { borderRightWidth: 4 },
    'bw-r-4': { borderRightWidth: 8 },
    'bw-t-1': { borderTopWidth: 0.5 },
    'bw-t-2': { borderTopWidth: 2 },
    'bw-t-3': { borderTopWidth: 4 },
    'bw-t-4': { borderTopWidth: 8 },
    'bw-b-1': { borderBottomWidth: 0.5 },
    'bw-b-2': { borderBottomWidth: 2 },
    'bw-b-3': { borderBottomWidth: 4 },
    'bw-b-4': { borderBottomWidth: 8 },
    'bg-1': { backgroundColor: "rgb(17, 17, 17)" },
    'bg-2': { backgroundColor: "rgb(27, 27, 27)" },
    'bg-3': { backgroundColor: "rgb(60, 60, 60)" },
    'bg-4': { backgroundColor: "rgb(39, 38, 33)" },
    'bg-5': { backgroundColor: "rgb(45, 45, 45)" },
    'bg-6': { backgroundColor: "rgb(55, 55, 55)" },
    'bg-a1': { backgroundColor: "rgb(39, 38, 33)" },
    'bg-a2': { backgroundColor: "rgb(49, 48, 43)" },
    'bg-a3': { backgroundColor: "rgb(59, 58, 53)" },
    'text-normal': { color: "rgb(185, 185, 185)" },
    'text-muted': { color: "rgb(132, 132, 132)" },
    'text-strong': { color: "rgb(212, 212, 212)" },
    'text-a1': { color: "rgb(251, 191, 36)" },
    'text-a2': { color: "rgb(155, 106, 50)" },
    'text-a3': { color: "rgb(143, 110, 72)" },
    'text-inverse': { color: "rgb(23, 23, 23)" },
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: "rgb(99, 99, 99)" },
    'bc-muted': { borderColor: "rgb(75, 75, 75)" },
    'bc-strong': { borderColor: "rgb(212, 212, 212)" },
    'bc-accent': { borderColor: "rgb(237, 171, 17)" },
    'shadow-1': { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 1.0, elevation: 2 },
    'shadow-2': { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 4 },
    'shadow-3': { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 6 },
    'sb-style': 'light',
  },
  theme2: {
    themeName:'theme2',
    'f-1': { fontFamily: 'Lora' },
    'f-2': { fontFamily: 'Lora-Italic' },
    'f-3': { fontFamily: 'DM' },
    'f-4': { fontFamily: 'DM-Italic' },
    'f-5': { fontFamily: 'Lora' },
    'f-6': { fontFamily: 'Lora' },
    'fw-200': { fontWeight: '200' },
    'fw-300': { fontWeight: '300' },
    'fw-400': { fontWeight: '400' },
    'fw-500': { fontWeight: '500' },
    'fw-600': { fontWeight: '600' },
    'fw-700': { fontWeight: '700' },
    'fw-800': { fontWeight: '800' },
    'br-0': { borderRadius: 0 },
    'br-1': { borderRadius: 2 },
    'br-2': { borderRadius: 4 },
    'br-3': { borderRadius: 8 },
    'br-4': { borderRadius: 12 },
    'bw-0': { borderWidth: 0 },
    'bw-1': { borderWidth: 0.5 },
    'bw-2': { borderWidth: 2 },
    'bw-3': { borderWidth: 4 },
    'bw-4': { borderWidth: 8 },
    'bw-l-1': { borderLeftWidth: 0.5 },
    'bw-l-2': { borderLeftWidth: 2 },
    'bw-l-3': { borderLeftWidth: 4 },
    'bw-l-4': { borderLeftWidth: 8 },
    'bw-r-1': { borderRightWidth: 0.5 },
    'bw-r-2': { borderRightWidth: 2 },
    'bw-r-3': { borderRightWidth: 4 },
    'bw-r-4': { borderRightWidth: 8 },
    'bw-t-1': { borderTopWidth: 0.5 },
    'bw-t-2': { borderTopWidth: 2 },
    'bw-t-3': { borderTopWidth: 4 },
    'bw-t-4': { borderTopWidth: 8 },
    'bw-b-1': { borderBottomWidth: 0.5 },
    'bw-b-2': { borderBottomWidth: 2 },
    'bw-b-3': { borderBottomWidth: 4 },
    'bw-b-4': { borderBottomWidth: 8 },
    'bg-1': { backgroundColor: "rgb(185, 185, 185)" },
    'bg-2': { backgroundColor: "rgb(212, 212, 212)" },
    'bg-3': { backgroundColor: "rgb(241, 241, 241)" },
    'bg-4': { backgroundColor: "rgb(214, 212, 206)" },
    'bg-5': { backgroundColor: "rgb(195, 195, 195)" },
    'bg-6': { backgroundColor: "rgb(225, 225, 225)" },
    'bg-a1': { backgroundColor: "rgb(255, 191, 0)" },
    'bg-a2': { backgroundColor: "rgb(239, 225, 180)" },
    'bg-a3': { backgroundColor: "rgb(234, 232, 226)" },
    'text-normal': { color: "rgb(40, 40, 40)" },
    'text-muted': { color: "rgb(120, 120, 120)" },
    'text-strong': { color: "rgb(17, 17, 17)" },
    'text-a1': { color: "rgb(251, 191, 36)" },
    'text-a2': { color: "rgb(155, 106, 50)" },
    'text-a3': { color: "rgb(143, 110, 72)" },
    'text-inverse': { color: "rgb(255, 255, 255)" },
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: "rgb(27, 27, 27)" },
    'bc-muted': { borderColor: "rgb(120, 120, 120)" },
    'bc-strong': { borderColor: "rgb(17, 17, 17)" },
    'bc-accent': { borderColor: "rgb(237, 171, 17)" },
    'shadow-1': { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 1.0, elevation: 2 },
    'shadow-2': { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 4 },
    'shadow-3': { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 6 },
    'sb-style': 'dark',
  },
  theme3: {
    themeName:'theme3',
    'f-1': { fontFamily: 'Lora' },
    'f-2': { fontFamily: 'Lora-Italic' },
    'f-3': { fontFamily: 'DM' },
    'f-4': { fontFamily: 'DM-Italic' },
    'f-5': { fontFamily: 'Lora' },
    'f-6': { fontFamily: 'Lora' },
    'fw-200': { fontWeight: '200' },
    'fw-300': { fontWeight: '300' },
    'fw-400': { fontWeight: '400' },
    'fw-500': { fontWeight: '500' },
    'fw-600': { fontWeight: '600' },
    'fw-700': { fontWeight: '700' },
    'fw-800': { fontWeight: '800' },
    'br-0': { borderRadius: 0 },
    'br-1': { borderRadius: 2 },
    'br-2': { borderRadius: 4 },
    'br-3': { borderRadius: 8 },
    'br-4': { borderRadius: 12 },
    'bw-0': { borderWidth: 0 },
    'bw-1': { borderWidth: 0.5 },
    'bw-2': { borderWidth: 2 },
    'bw-3': { borderWidth: 4 },
    'bw-4': { borderWidth: 8 },
    'bw-l-1': { borderLeftWidth: 0.5 },
    'bw-l-2': { borderLeftWidth: 2 },
    'bw-l-3': { borderLeftWidth: 4 },
    'bw-l-4': { borderLeftWidth: 8 },
    'bw-r-1': { borderRightWidth: 0.5 },
    'bw-r-2': { borderRightWidth: 2 },
    'bw-r-3': { borderRightWidth: 4 },
    'bw-r-4': { borderRightWidth: 8 },
    'bw-t-1': { borderTopWidth: 0.5 },
    'bw-t-2': { borderTopWidth: 2 },
    'bw-t-3': { borderTopWidth: 4 },
    'bw-t-4': { borderTopWidth: 8 },
    'bw-b-1': { borderBottomWidth: 0.5 },
    'bw-b-2': { borderBottomWidth: 2 },
    'bw-b-3': { borderBottomWidth: 4 },
    'bw-b-4': { borderBottomWidth: 8 },
    'bg-1': { backgroundColor: "rgb(17, 17, 17)" },
    'bg-2': { backgroundColor: "rgb(27, 27, 27)" },
    'bg-3': { backgroundColor: "rgb(60, 60, 60)" },
    'bg-4': { backgroundColor: "rgb(39, 38, 33)" },
    'bg-5': { backgroundColor: "rgb(45, 45, 45)" },
    'bg-6': { backgroundColor: "rgb(55, 55, 55)" },
    'bg-a1': { backgroundColor: "rgb(218, 145, 11)" },
    'bg-a2': { backgroundColor: "rgb(114, 86, 26)" },
    'bg-a3': { backgroundColor: "rgb(59, 58, 53)" },
    'text-normal': { color: "rgb(185, 185, 185)" },
    'text-muted': { color: "rgb(132, 132, 132)" },
    'text-strong': { color: "rgb(212, 212, 212)" },
    'text-a1': { color: "rgb(251, 191, 36)" },
    'text-a2': { color: "rgb(155, 106, 50)" },
    'text-a3': { color: "rgb(143, 110, 72)" },
    'text-inverse': { color: "rgb(255, 255, 255)" },
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: "rgb(99, 99, 99)" },
    'bc-muted': { borderColor: "rgb(75, 75, 75)" },
    'bc-strong': { borderColor: "rgb(212, 212, 212)" },
    'bc-accent': { borderColor: "rgb(237, 171, 17)" },
    'shadow-1': { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 1.0, elevation: 2 },
    'shadow-2': { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 4 },
    'shadow-3': { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 6 },
    'sb-style': 'light',
  },
  theme4: {
    themeName:'theme4',
    'f-1': { fontFamily: 'Lora' },
    'f-2': { fontFamily: 'Lora-Italic' },
    'f-3': { fontFamily: 'DM' },
    'f-4': { fontFamily: 'DM-Italic' },
    'f-5': { fontFamily: 'Lora' },
    'f-6': { fontFamily: 'Lora' },
    'fw-200': { fontWeight: '200' },
    'fw-300': { fontWeight: '300' },
    'fw-400': { fontWeight: '400' },
    'fw-500': { fontWeight: '500' },
    'fw-600': { fontWeight: '600' },
    'fw-700': { fontWeight: '700' },
    'fw-800': { fontWeight: '800' },
    'br-0': { borderRadius: 0 },
    'br-1': { borderRadius: 2 },
    'br-2': { borderRadius: 4 },
    'br-3': { borderRadius: 8 },
    'br-4': { borderRadius: 12 },
    'bw-0': { borderWidth: 0 },
    'bw-1': { borderWidth: 0.5 },
    'bw-2': { borderWidth: 2 },
    'bw-3': { borderWidth: 4 },
    'bw-4': { borderWidth: 8 },
    'bw-l-1': { borderLeftWidth: 0.5 },
    'bw-l-2': { borderLeftWidth: 2 },
    'bw-l-3': { borderLeftWidth: 4 },
    'bw-l-4': { borderLeftWidth: 8 },
    'bw-r-1': { borderRightWidth: 0.5 },
    'bw-r-2': { borderRightWidth: 2 },
    'bw-r-3': { borderRightWidth: 4 },
    'bw-r-4': { borderRightWidth: 8 },
    'bw-t-1': { borderTopWidth: 0.5 },
    'bw-t-2': { borderTopWidth: 2 },
    'bw-t-3': { borderTopWidth: 4 },
    'bw-t-4': { borderTopWidth: 8 },
    'bw-b-1': { borderBottomWidth: 0.5 },
    'bw-b-2': { borderBottomWidth: 2 },
    'bw-b-3': { borderBottomWidth: 4 },
    'bw-b-4': { borderBottomWidth: 8 },
    'bg-1': { backgroundColor: "rgb(30, 58, 138)" },
    'bg-2': { backgroundColor: "rgb(37, 99, 235)" },
    'bg-3': { backgroundColor: "rgb(59, 130, 246)" },
    'bg-4': { backgroundColor: "rgb(147, 197, 253)" },
    'bg-5': { backgroundColor: "rgb(25, 48, 118)" },
    'bg-6': { backgroundColor: "rgb(45, 85, 200)" },
    'bg-a1': { backgroundColor: "rgb(147, 197, 253)" },
    'bg-a2': { backgroundColor: "rgb(167, 207, 253)" },
    'bg-a3': { backgroundColor: "rgb(187, 217, 253)" },
    'text-normal': { color: "rgb(255, 255, 255)" },
    'text-muted': { color: "rgb(229, 231, 235)" },
    'text-strong': { color: "rgb(243, 244, 246)" },
    'text-a1': { color: "rgb(251, 191, 36)" },
    'text-a2': { color: "rgb(155, 106, 50)" },
    'text-a3': { color: "rgb(143, 110, 72)" },
    'text-inverse': { color: "rgb(2, 6, 49)" },
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: "rgb(156, 163, 175)" },
    'bc-muted': { borderColor: "rgb(107, 114, 128)" },
    'bc-strong': { borderColor: "rgb(75, 85, 99)" },
    'bc-accent': { borderColor: "rgb(237, 171, 17)" },
    'shadow-1': { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 1.0, elevation: 2 },
    'shadow-2': { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 4 },
    'shadow-3': { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 6 },
    'sb-style': 'light',
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