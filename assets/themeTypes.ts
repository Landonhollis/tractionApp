import { allThemes } from './themeObjects'

// Infer the theme object type from theme1
export type Ct = typeof allThemes.theme1

// Define all valid theme names
export type Ctn = keyof typeof allThemes

// Type for style bar status
export type StatusBarStyle = 'light' | 'dark'
