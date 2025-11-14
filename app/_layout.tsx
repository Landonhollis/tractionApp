
import '../global.css'
import { Slot } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AccountProvider } from '../providers/AccountProvider'
import { StatusBar } from '../components/StatusBar'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

// Prevent auto-hiding splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // Instrument Sans - Primary UI font for themes 1, 2, 3 (variable, modern sans-serif)
    'InstrumentSans_400Regular': require('../assets/fonts/InstrumentSans-VariableFont_wdth,wght.ttf'),
    'InstrumentSans_600SemiBold': require('../assets/fonts/InstrumentSans-VariableFont_wdth,wght.ttf'),
    'InstrumentSans_700Bold': require('../assets/fonts/InstrumentSans-VariableFont_wdth,wght.ttf'),
    'InstrumentSans_400Regular_Italic': require('../assets/fonts/InstrumentSans-Italic-VariableFont_wdth,wght.ttf'),

    // Tinos - Primary UI font for theme 4, secondary for themes 1 & 3 (Times-like serif)
    'Tinos_400Regular': require('../assets/fonts/Tinos-Regular.ttf'),
    'Tinos_700Bold': require('../assets/fonts/Tinos-Bold.ttf'),
    'Tinos_400Regular_Italic': require('../assets/fonts/Tinos-Italic.ttf'),

    // Playfair Display - Headings for theme 1, editorial for theme 4 (elegant serif)
    'PlayfairDisplay_400Regular': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
    'PlayfairDisplay_700Bold': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
    'PlayfairDisplay_400Regular_Italic': require('../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf'),

    // Bodoni Moda - Editorial/special font for themes 1 & 4 (sophisticated serif)
    'BodonModa_400Regular': require('../assets/fonts/BodoniModa-VariableFont_opsz,wght.ttf'),
    'BodonModa_700Bold': require('../assets/fonts/BodoniModa-VariableFont_opsz,wght.ttf'),
    'BodonModa_400Regular_Italic': require('../assets/fonts/BodoniModa-Italic-VariableFont_opsz,wght.ttf'),

    // Merriweather Sans - Secondary body/metadata for all themes (friendly sans-serif)
    'MerriweatherSans_300Light': require('../assets/fonts/MerriweatherSans-VariableFont_wght.ttf'),
    'MerriweatherSans_400Regular': require('../assets/fonts/MerriweatherSans-VariableFont_wght.ttf'),
    'MerriweatherSans_400Regular_Italic': require('../assets/fonts/MerriweatherSans-Italic-VariableFont_wght.ttf'),

    // Josefin Sans - Display/accent for themes 1, 2, 3 (geometric elegant sans-serif)
    'JosefinSans_400Regular': require('../assets/fonts/JosefinSans-VariableFont_wght.ttf'),
    'JosefinSans_600SemiBold': require('../assets/fonts/JosefinSans-VariableFont_wght.ttf'),
    'JosefinSans_400Regular_Italic': require('../assets/fonts/JosefinSans-Italic-VariableFont_wght.ttf'),

    // DM Serif Text - Secondary body for theme 4 (elegant readable serif)
    'DMSerifText_400Regular': require('../assets/fonts/DMSerifText-Regular.ttf'),
    'DMSerifText_400Regular_Italic': require('../assets/fonts/DMSerifText-Italic.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <SafeAreaProvider>
      <AccountProvider>
        <StatusBar />
        <Slot />
      </AccountProvider>
    </SafeAreaProvider>
  )
}

/*
 * =============================================================================
 * FONT DOCUMENTATION - For Future Styling Agents
 * =============================================================================
 *
 * The following fonts have been loaded into the app to support the business
 * management design aesthetic across all four themes:
 *
 * 1. Instrument Sans (Variable)
 *    - Type: Readable, modern geometric sans-serif
 *    - Use: Primary UI/body text, headings (themes 2 & 3), general content
 *    - Feel: Clean, modern, balanced, playful precision
 *    - Why: Versatile, variable font with 12 stylistic sets. Perfect for
 *      business interfaces requiring clarity and professionalism. Excellent
 *      screen readability at all sizes.
 *
 * 2. Tinos (Variable)
 *    - Type: Readable serif, Times New Roman alternative
 *    - Use: Primary UI/body for theme 4, secondary for themes 1 & 3
 *    - Feel: Professional, familiar, trustworthy, traditional
 *    - Why: Metrically compatible with Times New Roman. Excellent for
 *      business documents, reports, and data-heavy interfaces. Theme 4
 *      specifically requested "fonts close to Times New Roman."
 *
 * 3. Playfair Display (Variable)
 *    - Type: Readable elegant serif
 *    - Use: Headings (theme 1), editorial/special content (theme 4)
 *    - Feel: Luxurious, sophisticated, elegant, high-fashion
 *    - Why: Adds sophistication without sacrificing readability. Perfect for
 *      special screens like VTO (Vision/Traction Organizer) and auth. Works
 *      beautifully with theme 1's gold accents.
 *
 * 4. Bodoni Moda (Variable)
 *    - Type: Readable sophisticated serif
 *    - Use: Editorial/special text, display/accent
 *    - Feel: Sophisticated, classic, refined, luxurious
 *    - Why: High-contrast modern serif for upmarket feel. Used for special
 *      contexts like onboarding, settings, or branding moments. Variable
 *      font provides flexibility.
 *
 * 5. Merriweather Sans (Variable)
 *    - Type: Readable friendly sans-serif
 *    - Use: Metadata, secondary body, fine print across all themes
 *    - Feel: Friendly, professional, warm, clear
 *    - Why: Designed specifically for screen readability at small sizes.
 *      Perfect for metric descriptions, timestamps, help text, and secondary
 *      information that needs to be clear but unobtrusive.
 *
 * 6. Josefin Sans (Variable)
 *    - Type: Readable geometric sans-serif with vintage-modern feel
 *    - Use: Display/accent text, special headings
 *    - Feel: Elegant, geometric, vintage-modern, airy
 *    - Why: Provides visual interest for accent text without being too playful.
 *      Good for section headers, special callouts, or emphasis. Works well
 *      with modern business aesthetic.
 *
 * 7. DM Serif Text
 *    - Type: Readable elegant serif
 *    - Use: Secondary body text for theme 4
 *    - Feel: Elegant yet approachable, balanced, modern-traditional blend
 *    - Why: Perfect for longer narrative text in theme 4. Balances the
 *      formality of Tinos with a more approachable feel for articles,
 *      descriptions, and editorial content.
 *
 * THEME-SPECIFIC STRATEGY:
 * - Theme 1 (Dark/Gold): Mix of modern sans (Instrument) and elegant serif
 *   (Playfair, Bodoni) to match gold accent sophistication
 * - Theme 2 (Navy/Peach): Pure sans-serif stack (Instrument, Merriweather,
 *   Josefin) per requirement "Arial type fonts, nothing like Times New Roman"
 * - Theme 3 (Grey/Orange/Ocean): Balanced mix with primarily sans-serif
 *   (Instrument) but serif option (Tinos) for variety
 * - Theme 4 (Light/Tan/Navy): Pure serif stack (Tinos, DM Serif, Playfair,
 *   Bodoni) per requirement "fonts close to Times New Roman, nothing like Arial"
 *
 * USAGE GUIDELINES:
 * - f-1: Primary body text and UI elements (most frequently used)
 * - f-2: Secondary body text and alternative UI option
 * - f-3: Headings, titles, section headers
 * - f-4: Editorial content, special screens (VTO, auth, onboarding)
 * - f-5: Metadata, timestamps, help text, fine print
 * - f-6: Display/accent text, special emphasis, branding moments
 *
 * All fonts are variable or have multiple weights for design flexibility.
 * Prioritized readable fonts for data-heavy business management interface.
 * =============================================================================
 */
