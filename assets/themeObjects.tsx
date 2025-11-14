export const allThemes = {
  theme1: {
    themeName: 'Dark Gold Professional',
    'f-1': { fontFamily: 'InstrumentSans_400Regular' }, // Primary UI/body - clean, modern, readable
    'f-2': { fontFamily: 'Tinos_400Regular' }, // Secondary body - professional, familiar
    'f-3': { fontFamily: 'PlayfairDisplay_700Bold' }, // Headings - elegant, luxurious (suits gold accents)
    'f-4': { fontFamily: 'BodonModa_400Regular' }, // Editorial/special - sophisticated (VTO, auth)
    'f-5': { fontFamily: 'MerriweatherSans_300Light' }, // Metadata/secondary - friendly, clear
    'f-6': { fontFamily: 'JosefinSans_600SemiBold' }, // Display/accent - geometric, elegant
    'fw-200': { fontWeight: '200' as const },
    'fw-300': { fontWeight: '300' as const },
    'fw-400': { fontWeight: '400' as const },
    'fw-500': { fontWeight: '500' as const },
    'fw-600': { fontWeight: '600' as const },
    'fw-700': { fontWeight: '700' as const },
    'fw-800': { fontWeight: '800' as const },
    'br-0': { borderRadius: 0 },
    'br-1': { borderRadius: 4 },
    'br-2': { borderRadius: 6 },
    'br-3': { borderRadius: 8 },
    'br-4': { borderRadius: 10 },
    'bw-0': { borderWidth: 0 },
    'bw-1': { borderWidth: 0.5 },
    'bw-2': { borderWidth: 2 },
    'bw-3': { borderWidth: 3 },
    'bw-4': { borderWidth: 4 },
    'bw-l-1': { borderLeftWidth: 0.5 },
    'bw-l-2': { borderLeftWidth: 2 },
    'bw-l-3': { borderLeftWidth: 3 },
    'bw-l-4': { borderLeftWidth: 4 },
    'bw-r-1': { borderRightWidth: 0.5 },
    'bw-r-2': { borderRightWidth: 2 },
    'bw-r-3': { borderRightWidth: 3 },
    'bw-r-4': { borderRightWidth: 4 },
    'bw-t-1': { borderTopWidth: 0.5 },
    'bw-t-2': { borderTopWidth: 2 },
    'bw-t-3': { borderTopWidth: 3 },
    'bw-t-4': { borderTopWidth: 4 },
    'bw-b-1': { borderBottomWidth: 0.5 },
    'bw-b-2': { borderBottomWidth: 2 },
    'bw-b-3': { borderBottomWidth: 3 },
    'bw-b-4': { borderBottomWidth: 4 },
    'bg-1': { backgroundColor: 'rgb(17, 17, 17)' }, // Darkest - main background
    'bg-2': { backgroundColor: 'rgb(27, 27, 27)' }, // Dark - elevated surfaces
    'bg-3': { backgroundColor: 'rgb(38, 38, 38)' }, // Medium-dark - cards
    'bg-4': { backgroundColor: 'rgb(48, 48, 48)' }, // Medium - containers
    'bg-5': { backgroundColor: 'rgb(58, 58, 58)' }, // Medium-light - nested elements
    'bg-6': { backgroundColor: 'rgb(68, 68, 68)' }, // Lighter - highlights
    'bg-a1': { backgroundColor: 'rgb(212, 175, 55)' }, // Gold accent - primary CTA
    'bg-a2': { backgroundColor: 'rgb(184, 134, 11)' }, // Darker gold - hover/pressed
    'bg-a3': { backgroundColor: 'rgb(255, 215, 0)' }, // Bright gold - emphasis
    'text-normal': { color: 'rgb(185, 185, 185)' }, // Body text - 4.8:1 contrast on bg-1
    'text-muted': { color: 'rgb(132, 132, 132)' }, // De-emphasized text
    'text-strong': { color: 'rgb(212, 212, 212)' }, // Headings - higher contrast
    'text-a1': { color: 'rgb(212, 175, 55)' }, // Gold text - links
    'text-a2': { color: 'rgb(255, 215, 0)' }, // Bright gold text
    'text-a3': { color: 'rgb(184, 134, 11)' }, // Dark gold text
    'text-inverse': { color: 'rgb(23, 23, 23)' }, // For use on gold backgrounds
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: 'rgb(68, 68, 68)' }, // Standard borders
    'bc-muted': { borderColor: 'rgb(48, 48, 48)' }, // Subtle separators
    'bc-strong': { borderColor: 'rgb(132, 132, 132)' }, // Emphasized borders
    'bc-accent': { borderColor: 'rgb(212, 175, 55)' }, // Gold borders
    'shadow-1': { shadowColor: 'rgb(255, 255, 255)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 1.0, elevation: 2 },
    'shadow-2': { shadowColor: 'rgb(255, 255, 255)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 2.0, elevation: 4 },
    'shadow-3': { shadowColor: 'rgb(255, 255, 255)', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 3.0, elevation: 6 },
    'sb-style': 'light' as const,
  },
  theme2: {
    themeName: 'Navy Peach Modern',
    'f-1': { fontFamily: 'InstrumentSans_400Regular' }, // Primary UI/body - Arial-like, clean sans-serif
    'f-2': { fontFamily: 'MerriweatherSans_400Regular' }, // Secondary body - warm sans-serif
    'f-3': { fontFamily: 'InstrumentSans_700Bold' }, // Headings - bold sans-serif (NOT serif)
    'f-4': { fontFamily: 'JosefinSans_400Regular' }, // Special text - geometric sans-serif
    'f-5': { fontFamily: 'MerriweatherSans_300Light' }, // Metadata - friendly sans-serif
    'f-6': { fontFamily: 'InstrumentSans_600SemiBold' }, // Display/accent - versatile sans-serif
    'fw-200': { fontWeight: '200' as const },
    'fw-300': { fontWeight: '300' as const },
    'fw-400': { fontWeight: '400' as const },
    'fw-500': { fontWeight: '500' as const },
    'fw-600': { fontWeight: '600' as const },
    'fw-700': { fontWeight: '700' as const },
    'fw-800': { fontWeight: '800' as const },
    'br-0': { borderRadius: 0 },
    'br-1': { borderRadius: 8 },
    'br-2': { borderRadius: 12 },
    'br-3': { borderRadius: 16 },
    'br-4': { borderRadius: 20 },
    'bw-0': { borderWidth: 0 },
    'bw-1': { borderWidth: 2 },
    'bw-2': { borderWidth: 3 },
    'bw-3': { borderWidth: 4 },
    'bw-4': { borderWidth: 5 },
    'bw-l-1': { borderLeftWidth: 2 },
    'bw-l-2': { borderLeftWidth: 3 },
    'bw-l-3': { borderLeftWidth: 4 },
    'bw-l-4': { borderLeftWidth: 5 },
    'bw-r-1': { borderRightWidth: 2 },
    'bw-r-2': { borderRightWidth: 3 },
    'bw-r-3': { borderRightWidth: 4 },
    'bw-r-4': { borderRightWidth: 5 },
    'bw-t-1': { borderTopWidth: 2 },
    'bw-t-2': { borderTopWidth: 3 },
    'bw-t-3': { borderTopWidth: 4 },
    'bw-t-4': { borderTopWidth: 5 },
    'bw-b-1': { borderBottomWidth: 2 },
    'bw-b-2': { borderBottomWidth: 3 },
    'bw-b-3': { borderBottomWidth: 4 },
    'bw-b-4': { borderBottomWidth: 5 },
    'bg-1': { backgroundColor: 'rgb(20, 28, 52)' }, // Navy - darkest background
    'bg-2': { backgroundColor: 'rgb(28, 38, 66)' }, // Navy - dark elevated
    'bg-3': { backgroundColor: 'rgb(36, 48, 80)' }, // Navy - medium-dark cards
    'bg-4': { backgroundColor: 'rgb(44, 58, 94)' }, // Navy - medium containers
    'bg-5': { backgroundColor: 'rgb(52, 68, 108)' }, // Navy - medium-light
    'bg-6': { backgroundColor: 'rgb(60, 78, 122)' }, // Navy - lighter highlights
    'bg-a1': { backgroundColor: 'rgb(255, 178, 140)' }, // Peach - primary accent
    'bg-a2': { backgroundColor: 'rgb(255, 160, 110)' }, // Peach - darker variant
    'bg-a3': { backgroundColor: 'rgb(255, 195, 170)' }, // Peach - lighter variant
    'text-normal': { color: 'rgb(200, 205, 220)' }, // Light blue-gray - body text (5.2:1 contrast)
    'text-muted': { color: 'rgb(145, 155, 175)' }, // Muted blue-gray
    'text-strong': { color: 'rgb(225, 230, 240)' }, // Very light - headings
    'text-a1': { color: 'rgb(255, 178, 140)' }, // Peach text - links
    'text-a2': { color: 'rgb(255, 160, 110)' }, // Darker peach text
    'text-a3': { color: 'rgb(255, 195, 170)' }, // Lighter peach text
    'text-inverse': { color: 'rgb(28, 28, 28)' }, // Dark text for peach backgrounds
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: 'rgb(60, 78, 122)' }, // Navy - standard borders
    'bc-muted': { borderColor: 'rgb(44, 58, 94)' }, // Navy - subtle
    'bc-strong': { borderColor: 'rgb(145, 155, 175)' }, // Light blue-gray - emphasized
    'bc-accent': { borderColor: 'rgb(255, 178, 140)' }, // Peach borders
    'shadow-1': { shadowColor: 'rgb(0, 0, 0)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.25, shadowRadius: 1.5, elevation: 2 },
    'shadow-2': { shadowColor: 'rgb(0, 0, 0)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.30, shadowRadius: 3.0, elevation: 4 },
    'shadow-3': { shadowColor: 'rgb(0, 0, 0)', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.35, shadowRadius: 4.5, elevation: 6 },
    'sb-style': 'light' as const,
  },
  theme3: {
    themeName: 'Ash Grey Coastal',
    'f-1': { fontFamily: 'InstrumentSans_400Regular' }, // Primary UI/body - balanced, modern
    'f-2': { fontFamily: 'MerriweatherSans_400Regular' }, // Secondary body - warm, readable
    'f-3': { fontFamily: 'InstrumentSans_700Bold' }, // Headings - clean, professional
    'f-4': { fontFamily: 'Tinos_400Regular' }, // Special/editorial - traditional serif balance
    'f-5': { fontFamily: 'MerriweatherSans_300Light' }, // Metadata - friendly, clear
    'f-6': { fontFamily: 'JosefinSans_600SemiBold' }, // Display/accent - geometric elegance
    'fw-200': { fontWeight: '200' as const },
    'fw-300': { fontWeight: '300' as const },
    'fw-400': { fontWeight: '400' as const },
    'fw-500': { fontWeight: '500' as const },
    'fw-600': { fontWeight: '600' as const },
    'fw-700': { fontWeight: '700' as const },
    'fw-800': { fontWeight: '800' as const },
    'br-0': { borderRadius: 0 },
    'br-1': { borderRadius: 2 },
    'br-2': { borderRadius: 3 },
    'br-3': { borderRadius: 4 },
    'br-4': { borderRadius: 6 },
    'bw-0': { borderWidth: 0 },
    'bw-1': { borderWidth: 0.5 },
    'bw-2': { borderWidth: 1 },
    'bw-3': { borderWidth: 1.5 },
    'bw-4': { borderWidth: 2 },
    'bw-l-1': { borderLeftWidth: 0.5 },
    'bw-l-2': { borderLeftWidth: 1 },
    'bw-l-3': { borderLeftWidth: 1.5 },
    'bw-l-4': { borderLeftWidth: 2 },
    'bw-r-1': { borderRightWidth: 0.5 },
    'bw-r-2': { borderRightWidth: 1 },
    'bw-r-3': { borderRightWidth: 1.5 },
    'bw-r-4': { borderRightWidth: 2 },
    'bw-t-1': { borderTopWidth: 0.5 },
    'bw-t-2': { borderTopWidth: 1 },
    'bw-t-3': { borderTopWidth: 1.5 },
    'bw-t-4': { borderTopWidth: 2 },
    'bw-b-1': { borderBottomWidth: 0.5 },
    'bw-b-2': { borderBottomWidth: 1 },
    'bw-b-3': { borderBottomWidth: 1.5 },
    'bw-b-4': { borderBottomWidth: 2 },
    'bg-1': { backgroundColor: 'rgb(70, 75, 80)' }, // Ash grey - darkest background (5/10 dark)
    'bg-2': { backgroundColor: 'rgb(85, 90, 95)' }, // Ash grey - dark elevated
    'bg-3': { backgroundColor: 'rgb(100, 105, 110)' }, // Ash grey - medium-dark cards
    'bg-4': { backgroundColor: 'rgb(115, 120, 125)' }, // Ash grey - medium containers
    'bg-5': { backgroundColor: 'rgb(130, 135, 140)' }, // Ash grey - medium-light
    'bg-6': { backgroundColor: 'rgb(145, 150, 155)' }, // Ash grey - lighter highlights
    'bg-a1': { backgroundColor: 'rgb(230, 115, 50)' }, // Dark orange - primary accent
    'bg-a2': { backgroundColor: 'rgb(25, 115, 140)' }, // Ocean blue - secondary accent
    'bg-a3': { backgroundColor: 'rgb(255, 140, 75)' }, // Lighter orange - tertiary accent
    'text-normal': { color: 'rgb(240, 240, 240)' }, // Very light - body text (7.5:1 contrast)
    'text-muted': { color: 'rgb(190, 190, 190)' }, // Light grey - de-emphasized
    'text-strong': { color: 'rgb(255, 255, 255)' }, // White - headings
    'text-a1': { color: 'rgb(255, 150, 80)' }, // Light orange - links
    'text-a2': { color: 'rgb(100, 200, 230)' }, // Light ocean - secondary links
    'text-a3': { color: 'rgb(230, 115, 50)' }, // Dark orange - tertiary
    'text-inverse': { color: 'rgb(25, 25, 25)' }, // Dark for light backgrounds
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: 'rgb(145, 150, 155)' }, // Light ash grey - standard
    'bc-muted': { borderColor: 'rgb(115, 120, 125)' }, // Medium ash grey - subtle
    'bc-strong': { borderColor: 'rgb(190, 190, 190)' }, // Very light grey - emphasized
    'bc-accent': { borderColor: 'rgb(230, 115, 50)' }, // Dark orange accent borders
    'shadow-1': { shadowColor: 'rgb(0, 0, 0)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.0, elevation: 2 },
    'shadow-2': { shadowColor: 'rgb(0, 0, 0)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 2.5, elevation: 4 },
    'shadow-3': { shadowColor: 'rgb(0, 0, 0)', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.30, shadowRadius: 3.5, elevation: 6 },
    'sb-style': 'light' as const,
  },
  theme4: {
    themeName: 'Light Tan Classic',
    'f-1': { fontFamily: 'Tinos_400Regular' }, // Primary UI/body - Times-like, professional serif
    'f-2': { fontFamily: 'DMSerifText_400Regular' }, // Secondary body - elegant serif for narrative
    'f-3': { fontFamily: 'Tinos_700Bold' }, // Headings - bold serif (NOT sans-serif)
    'f-4': { fontFamily: 'PlayfairDisplay_400Regular' }, // Editorial/special - sophisticated serif
    'f-5': { fontFamily: 'Tinos_400Regular_Italic' }, // Metadata - italic serif for differentiation
    'f-6': { fontFamily: 'BodonModa_700Bold' }, // Display/accent - refined high-contrast serif
    'fw-200': { fontWeight: '200' as const },
    'fw-300': { fontWeight: '300' as const },
    'fw-400': { fontWeight: '400' as const },
    'fw-500': { fontWeight: '500' as const },
    'fw-600': { fontWeight: '600' as const },
    'fw-700': { fontWeight: '700' as const },
    'fw-800': { fontWeight: '800' as const },
    'br-0': { borderRadius: 0 },
    'br-1': { borderRadius: 4 },
    'br-2': { borderRadius: 6 },
    'br-3': { borderRadius: 8 },
    'br-4': { borderRadius: 10 },
    'bw-0': { borderWidth: 0 },
    'bw-1': { borderWidth: 0.5 },
    'bw-2': { borderWidth: 2 },
    'bw-3': { borderWidth: 3 },
    'bw-4': { borderWidth: 4 },
    'bw-l-1': { borderLeftWidth: 0.5 },
    'bw-l-2': { borderLeftWidth: 2 },
    'bw-l-3': { borderLeftWidth: 3 },
    'bw-l-4': { borderLeftWidth: 4 },
    'bw-r-1': { borderRightWidth: 0.5 },
    'bw-r-2': { borderRightWidth: 2 },
    'bw-r-3': { borderRightWidth: 3 },
    'bw-r-4': { borderRightWidth: 4 },
    'bw-t-1': { borderTopWidth: 0.5 },
    'bw-t-2': { borderTopWidth: 2 },
    'bw-t-3': { borderTopWidth: 3 },
    'bw-t-4': { borderTopWidth: 4 },
    'bw-b-1': { borderBottomWidth: 0.5 },
    'bw-b-2': { borderBottomWidth: 2 },
    'bw-b-3': { borderBottomWidth: 3 },
    'bw-b-4': { borderBottomWidth: 4 },
    'bg-1': { backgroundColor: 'rgb(250, 245, 235)' }, // Light tan - lightest background
    'bg-2': { backgroundColor: 'rgb(240, 232, 215)' }, // Tan - elevated surfaces
    'bg-3': { backgroundColor: 'rgb(225, 215, 195)' }, // Medium tan - cards
    'bg-4': { backgroundColor: 'rgb(210, 198, 175)' }, // Darker tan - containers
    'bg-5': { backgroundColor: 'rgb(195, 181, 155)' }, // Brown-tan - nested elements
    'bg-6': { backgroundColor: 'rgb(180, 164, 135)' }, // Light brown - highlights
    'bg-a1': { backgroundColor: 'rgb(30, 58, 138)' }, // Navy blue - primary accent
    'bg-a2': { backgroundColor: 'rgb(59, 130, 246)' }, // Natural blue - secondary accent
    'bg-a3': { backgroundColor: 'rgb(37, 99, 235)' }, // Medium blue - tertiary accent
    'text-normal': { color: 'rgb(40, 40, 40)' }, // Dark grey - body text (11.5:1 contrast)
    'text-muted': { color: 'rgb(100, 100, 100)' }, // Medium grey - de-emphasized
    'text-strong': { color: 'rgb(17, 17, 17)' }, // Very dark - headings
    'text-a1': { color: 'rgb(30, 58, 138)' }, // Navy - links
    'text-a2': { color: 'rgb(37, 99, 235)' }, // Medium blue - secondary links
    'text-a3': { color: 'rgb(29, 78, 216)' }, // Dark blue - tertiary
    'text-inverse': { color: 'rgb(250, 250, 250)' }, // White for dark backgrounds
    'text-xs': { fontSize: 12 },
    'text-sm': { fontSize: 14 },
    'text-md': { fontSize: 16 },
    'text-lg': { fontSize: 18 },
    'text-xl': { fontSize: 20 },
    'text-2xl': { fontSize: 24 },
    'bc-normal': { borderColor: 'rgb(195, 181, 155)' }, // Brown-tan - standard
    'bc-muted': { borderColor: 'rgb(210, 198, 175)' }, // Tan - subtle
    'bc-strong': { borderColor: 'rgb(100, 100, 100)' }, // Grey - emphasized
    'bc-accent': { borderColor: 'rgb(30, 58, 138)' }, // Navy accent borders
    'shadow-1': { shadowColor: 'rgb(0, 0, 0)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 1.0, elevation: 2 },
    'shadow-2': { shadowColor: 'rgb(0, 0, 0)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 4 },
    'shadow-3': { shadowColor: 'rgb(0, 0, 0)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 6 },
    'sb-style': 'dark' as const,
  },
}

// =============================================================================
// THEME TYPES
// =============================================================================
// IMPORTANT: Types should always be in the same file as the objects they type.
// Do not create separate type files - keep types colocated with their data.

// Infer the theme object type from theme1
export type Ct = typeof allThemes.theme1

// Define all valid theme names
export type Ctn = keyof typeof allThemes

// Type for status bar style
export type StatusBarStyle = 'light' | 'dark'
