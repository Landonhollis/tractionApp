# Theme Core Selection Documentation

## Purpose
This document provides comprehensive guidelines for selecting and implementing theme object values. These guidelines are based on industry best practices, accessibility standards (WCAG 2.0+), and research from authoritative design sources including Material Design, Human Interface Guidelines, and leading UX research organizations.

---

## Table of Contents
1. [Color System Principles](#color-system-principles)
2. [Typography Guidelines](#typography-guidelines)
3. [Border Radius Principles](#border-radius-principles)
4. [Border Width Guidelines](#border-width-guidelines)
5. [Shadow & Elevation](#shadow--elevation)
6. [Theme Implementation Process](#theme-implementation-process)

---

## Color System Principles

### The 60-30-10 Rule
The foundation of good color distribution in UI design:
- **60% - Background/Dominant Colors** (`bg-1` through `bg-6`): Neutral tones that form the canvas
- **30% - Secondary Colors**: Supporting colors for medium-emphasis components
- **10% - Accent Colors** (`bg-a1`, `bg-a2`, `bg-a3`): High-emphasis elements like CTAs, active states

### Color Categories in Theme Objects

#### Background Colors (`bg-1` through `bg-6`)
**Purpose**: Primary surface colors, used for backgrounds, cards, containers

**Dark Theme Guidelines:**
- Avoid pure black (#000000) - use dark grays instead (#121212, #1E1E1E)
- Reason: Pure black creates harsh contrast and eye strain on OLED screens
- Progressive lightening: Each level should be subtly lighter
  - `bg-1`: Darkest (e.g., #111111 or rgb(17,17,17)) - main background
  - `bg-2`: Dark (e.g., #1B1B1B or rgb(27,27,27)) - elevated surfaces
  - `bg-3`: Medium-dark (e.g., #3C3C3C or rgb(60,60,60)) - cards, containers
  - `bg-4` through `bg-6`: Progressively lighter for layered components

**Light Theme Guidelines:**
- Avoid pure white (#FFFFFF) - use off-whites
- Reason: Pure white is too bright and reduces readability in high-light conditions
- Progressive darkening: Each level should be subtly darker
  - `bg-1`: Lightest (e.g., #F5F5F5 or rgb(245,245,245)) - main background
  - `bg-2`: Light (e.g., #EBEBEB or rgb(235,235,235)) - elevated surfaces
  - `bg-3`: Medium-light (e.g., #D4D4D4 or rgb(212,212,212)) - cards, containers
  - `bg-4` through `bg-6`: Progressively darker for contrast

#### Accent Background Colors (`bg-a1`, `bg-a2`, `bg-a3`)
**Purpose**: Call-to-action buttons, active states, highlights, brand emphasis

**Guidelines:**
- Must be the most vibrant/saturated colors in the palette
- Should align with brand identity (primary brand color or complementary)
- Must maintain minimum 3:1 contrast ratio with adjacent elements (WCAG 2.1)
- Three levels allow for states:
  - `bg-a1`: Primary accent - default state
  - `bg-a2`: Secondary accent - hover/focus state (slightly lighter/darker)
  - `bg-a3`: Tertiary accent - pressed/active state or subtle accent

#### Text Colors (`text-normal`, `text-muted`, `text-strong`, `text-inverse`)
**Purpose**: Text hierarchy and readability

**Contrast Requirements (WCAG 2.0 Level AA):**
- Normal text (< 18pt): Minimum 4.5:1 contrast ratio with background
- Large text (e 18pt or 14pt bold): Minimum 3:1 contrast ratio
- Level AAA (enhanced): 7:1 for normal text, 4.5:1 for large text

**Dark Theme Text:**
- `text-normal`: Primary reading color (e.g., rgb(185,185,185)) - body text
- `text-muted`: De-emphasized text (e.g., rgb(132,132,132)) - captions, placeholders
- `text-strong`: High emphasis (e.g., rgb(212,212,212)) - headings, important labels
- `text-inverse`: For use on accent backgrounds (e.g., rgb(23,23,23)) - button text

**Light Theme Text:**
- `text-normal`: Primary reading color (e.g., rgb(40,40,40)) - body text
- `text-muted`: De-emphasized text (e.g., rgb(120,120,120)) - captions, placeholders
- `text-strong`: High emphasis (e.g., rgb(17,17,17)) - headings, important labels
- `text-inverse`: For use on accent backgrounds (e.g., rgb(255,255,255)) - button text

#### Text Accent Colors (`text-a1`, `text-a2`, `text-a3`)
**Purpose**: Links, interactive text, special emphasis, brand-colored text

**Guidelines:**
- Should coordinate with accent background colors but not be identical
- Must maintain 4.5:1 contrast with their backgrounds
- Often brighter/more saturated than background accents
- Three levels for different emphasis or states

#### Border Colors (`bc-normal`, `bc-muted`, `bc-strong`, `bc-accent`)
**Purpose**: Separators, input borders, card outlines

**Guidelines:**
- `bc-normal`: Standard borders, dividers (subtle but visible)
- `bc-muted`: Very subtle separators (lowest visual weight)
- `bc-strong`: Emphasized borders for focus/active states
- `bc-accent`: Brand-colored borders for special emphasis
- All border colors must maintain 3:1 contrast ratio with adjacent surfaces (WCAG 2.1)

### Accessibility Considerations

#### Color Blindness
**Statistics**: 8% of men, 0.5% of women have some form of color blindness
- **Protanopia & Deuteranopia**: Cannot distinguish red/green
- **Tritanopia**: Cannot distinguish blue/yellow

**Design Solutions:**
- Never rely on color alone to convey information
- Ensure text/background contrast meets WCAG standards
- Test palettes with color blindness simulators
- Use icons, patterns, or text labels alongside colors
- Avoid problematic combinations: red/green, blue/purple, green/brown

#### High Contrast Mode
- Support OS-level high contrast settings (iOS/Android)
- Ensure all text maintains readability when users enable increased contrast
- Test themes with increased contrast enabled

### Color Selection Process

1. **Choose Primary Brand Color**: Should align with brand identity
2. **Generate Palette**: Use tools like Material Design Color Tool, Adobe Color
3. **Apply 60-30-10 Rule**: Distribute colors across usage tiers
4. **Test Contrast**: Use WebAIM Contrast Checker or similar tools
5. **Validate Accessibility**: Test with color blindness simulators
6. **Create Variants**: Develop multiple themes (dark, light, alternatives)

---

## Typography Guidelines

### Font Families (`f-1` through `f-6`)

**Available Fonts in Assets:**
- Lora (serif) - elegant, readable, good for headings and body
- Lora-Italic (serif italic) - emphasis, quotes
- DM (sans-serif) - modern, clean, excellent for UI elements
- DM-Italic (sans-serif italic) - emphasis within sans-serif context

**Font Pairing Principles:**
1. **Contrast**: Pair serif with sans-serif for visual hierarchy
2. **Limit Families**: Use 2-3 font families maximum
3. **Consistency**: Assign specific roles to each family

**Recommended Assignments:**
- `f-1`: Primary heading font (e.g., Lora for elegant apps, DM for modern/tech)
- `f-2`: Secondary heading or emphasis font (italic variant)
- `f-3`: Body text font (should be highly readable - DM or Lora depending on theme)
- `f-4`: Body text emphasis (italic for quotes, citations)
- `f-5`: UI elements font (buttons, labels - typically sans-serif like DM)
- `f-6`: Alternative/special use (can be same as primary for simplicity)

**Platform Defaults for Reference:**
- iOS: San Francisco (sans-serif)
- Android: Roboto (sans-serif)
- Both optimized for mobile readability

### Font Weights (`fw-200` through `fw-800`)

**Weight Definitions:**
- 200 (Extra Light): Rarely used, only for very large decorative text
- 300 (Light): Subtle headings, large text, minimalist aesthetic
- 400 (Regular): Default body text, most readable weight
- 500 (Medium): Subheadings, slight emphasis, button text
- 600 (Semi-Bold): Strong subheadings, important labels
- 700 (Bold): Primary headings, strong emphasis
- 800 (Extra Bold): Display text, hero headings, rare use

**Usage Guidelines:**
- **Body Text**: Always 400 (Regular)
  - Reason: Most readable, tested across devices
  - Exception: Use 300 for very large body text (20pt+)

- **Buttons & Links**: 500 (Medium) or 600 (Semi-Bold)
  - Reason: Stands out from body text without overpowering

- **Headings Hierarchy**:
  - H1/Hero: 700-800 (Bold to Extra Bold)
  - H2: 600-700 (Semi-Bold to Bold)
  - H3: 500-600 (Medium to Semi-Bold)
  - H4+: 500 (Medium)

- **De-emphasized Text**: 300-400 (Light to Regular)
  - Captions, helper text, footnotes

**Best Practice**: Use 2-3 weights for clear hierarchy, not all 7 weights

### Font Sizes (`text-xs` through `text-2xl`)

**Mobile-Optimized Scale:**

Based on research from Apple HIG, Material Design, and mobile UX studies:

- `text-xs`: **12px**
  - Use for: Fine print, captions, timestamps
  - Warning: At readability limit - use sparingly

- `text-sm`: **14px**
  - Use for: Secondary text, metadata, labels
  - Readable but de-emphasized

- `text-md`: **16px** P CRITICAL SIZE
  - Use for: Body text (primary content)
  - Apple HIG recommends 17pt, Material recommends 16sp
  - This is the MINIMUM for comfortable reading

- `text-lg`: **18px**
  - Use for: Emphasized body text, small headings (H4-H5)
  - Qualifies as "large text" for WCAG (3:1 contrast minimum)

- `text-xl`: **20px**
  - Use for: Subheadings (H3), important labels
  - High readability, good for older users

- `text-2xl`: **24px**
  - Use for: Major headings (H1-H2), hero text
  - Strong visual impact

**Typography Hierarchy Formula:**
- Each level should be 1.2-1.3x the previous size (scale ratio)
- This scale follows the approximate ratio: 12, 14, 16, 18, 20, 24

**Line Length (Characters per Line):**
- Mobile: 30-40 characters per line optimal
- Tablet: 50-60 characters per line
- Adjust font size or container width accordingly

**Line Height (Leading):**
- Body text: 1.4-1.6x font size
- Headings: 1.2-1.3x font size
- Mobile: Slightly taller line heights (1.5-1.6) for thumb scrolling

---

## Border Radius Principles

### Psychology of Rounded Corners

**Scientific Basis:**
- Human brain processes sharp corners as potentially dangerous (evolutionary response)
- Rounded corners feel safe, friendly, approachable
- Phenomenon called "contour bias" - preference for curved objects
- Rounded corners reduce cognitive load in visual processing
- Corners direct attention inward toward element content

**Design Impact by Roundness Level:**

- **0-2px (Sharp to Subtle)**:
  - Professional, formal, serious
  - Corporate, financial, legal apps
  - Maximizes space efficiency

- **4-8px (Moderate)**:
  - Friendly, modern, balanced
  - Most versatile range
  - General-purpose apps

- **12px+ (Highly Rounded)**:
  - Playful, approachable, casual
  - Social, lifestyle, children's apps
  - Pills/fully rounded for tags and badges

### Recommended Values (`br-0` through `br-4`)

**Consistent Scale:**
- `br-0`: **0px** - No rounding (sharp corners)
  - Use for: Formal/professional themes, maximalist layouts

- `br-1`: **2px** - Subtle rounding
  - Use for: Professional but approachable, small elements (badges, tags)

- `br-2`: **4px** - Gentle rounding
  - Use for: Standard cards, buttons, inputs (default choice)
  - Most balanced option

- `br-3`: **8px** - Noticeable rounding
  - Use for: Friendly/modern aesthetic, larger containers
  - Material Design 3 uses 8-12px heavily

- `br-4`: **12px** - Prominent rounding
  - Use for: Playful/casual themes, hero cards, floating buttons
  - Approaching "pill" shape for smaller elements

**Usage Guidelines:**
1. **Consistency is Key**: Use 1-2 radius values across the app, not all 5
2. **Size Relationship**: Larger elements can handle larger radius values
3. **Platform Consideration**: iOS tends toward more rounding than Android historically

---

## Border Width Guidelines

### Visual Weight Hierarchy

Border width communicates importance and interactivity:

**Recommended Values:**

- `bw-0`: **0px** - No border
  - Use for: Borderless design, relying on shadows/backgrounds

- `bw-1`: **0.5px** - Hairline border
  - Use for: Subtle dividers, card separators
  - Most common for non-interactive elements

- `bw-2`: **2px** - Standard border
  - Use for: Input fields, standard buttons, default borders
  - Good balance of visibility and subtlety

- `bw-3`: **4px** - Thick border
  - Use for: Focus states, selected items, emphasis
  - Strong visual indicator

- `bw-4`: **8px** - Very thick border
  - Use for: Decorative accents, special emphasis
  - Rarely used, high impact

### Directional Borders (`bw-l-*`, `bw-r-*`, `bw-t-*`, `bw-b-*`)

**Purpose**: Accent indicators, visual guides, asymmetric design

**Common Patterns:**
- Left border: Navigation indicators (selected menu item)
- Bottom border: Tab indicators, input underlines (Material Design)
- Top border: Notification bars, status indicators

**Values**: Same scale as regular borders (0.5px, 2px, 4px, 8px)

---

## Shadow & Elevation

### Platform Philosophy

**Material Design (Android):**
- Elevation = distance on z-axis
- Shadows indicate depth and hierarchy
- Clear elevation levels (0dp, 2dp, 4dp, 6dp, 8dp, etc.)

**iOS Human Interface Guidelines:**
- Flat design philosophy
- Minimal shadows, prefers blur effects
- Subtle depth cues

**Cross-Platform Approach:**
- Use subtle shadows that work on both platforms
- Avoid heavy drop shadows (feels dated)

### Shadow Levels (`shadow-1`, `shadow-2`, `shadow-3`)

Shadows combine multiple properties for realistic depth:

**Anatomy of a Shadow:**
```javascript
{
  shadowColor: string,        // Usually black or dark gray
  shadowOffset: { width, height }, // Position of shadow
  shadowOpacity: number,      // 0-1, transparency
  shadowRadius: number,       // Blur amount
  elevation: number          // Android-specific z-index
}
```

**Recommended Values:**

**`shadow-1` - Subtle Elevation (2dp equivalent)**
```javascript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.18,
  shadowRadius: 1.0,
  elevation: 2
}
```
- Use for: Rested buttons, small cards, subtle depth
- Perception: Just lifted off background

**`shadow-2` - Medium Elevation (4dp equivalent)**
```javascript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 4
}
```
- Use for: Cards, raised buttons, dropdowns, tooltips
- Perception: Clearly elevated, interactive

**`shadow-3` - High Elevation (6dp equivalent)**
```javascript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.30,
  shadowRadius: 4.65,
  elevation: 6
}
```
- Use for: Modals, dialogs, FABs, popovers
- Perception: Floating above interface, demands attention

**Guidelines:**
- Higher elevation = larger offset, higher opacity, larger blur radius
- Shadow color should be pure black (#000) with controlled opacity
- Avoid colored shadows (except for special effects)
- Test shadows on both light and dark backgrounds
- iOS: Shadows may appear more subtle than Android elevation

---

## Theme Implementation Process

### Step 1: Analyze Theme Description

**Input**: Theme description from `prd's/1overview.md`

Extract these elements:
- **Visual style**: (e.g., "professional," "playful," "minimalist," "bold")
- **Target audience**: (e.g., "business users," "young adults," "creative professionals")
- **Color preferences**: Any specific colors or palettes mentioned
- **Mood/emotion**: (e.g., "calm," "energetic," "trustworthy," "innovative")

### Step 2: Establish Base Colors

**For Dark Themes:**
1. Choose darkest background: #0F0F0F to #1C1C1C range
2. Create 5-6 progressively lighter backgrounds
3. Select text colors with 4.5:1+ contrast
4. Choose vibrant accent color aligned with brand

**For Light Themes:**
1. Choose lightest background: #F5F5F5 to #FFFFFF range
2. Create 5-6 progressively darker backgrounds
3. Select text colors with 4.5:1+ contrast
4. Choose saturated accent color aligned with brand

**Tool Recommendation**: Use contrast checkers (WebAIM, Coolors) to validate all color pairs

### Step 3: Validate Accessibility

**Required Tests:**
1. Run all text/background combinations through contrast checker
2. Verify 4.5:1 minimum for normal text
3. Verify 3:1 minimum for large text and UI components
4. Test with color blindness simulator (protanopia, deuteranopia, tritanopia)
5. Ensure information isn't conveyed by color alone

### Step 4: Set Typography

**Font Selection:**
- Match font personality to theme description
- Use serif (Lora) for elegant, traditional, editorial themes
- Use sans-serif (DM) for modern, clean, tech-focused themes

**Size Hierarchy:**
- Always use 16px minimum for body text (`text-md`)
- Scale up to 24px for major headings (`text-2xl`)
- Use 12-14px sparingly for metadata (`text-xs`, `text-sm`)

**Weight Hierarchy:**
- Body: 400 (Regular)
- Emphasis: 500-600 (Medium to Semi-Bold)
- Headings: 600-700 (Semi-Bold to Bold)

### Step 5: Define Border Radius

**Based on Theme Personality:**
- Professional/Formal: 0-4px (`br-0` to `br-2`)
- Balanced/Modern: 4-8px (`br-2` to `br-3`)
- Friendly/Playful: 8-12px (`br-3` to `br-4`)

**Consistency**: Pick ONE primary radius value for most elements

### Step 6: Configure Shadows

**Conservative Approach (iOS-friendly):**
- Use `shadow-1` for most elevated elements
- Use `shadow-2` for interactive components
- Use `shadow-3` only for modals/dialogs

**Pronounced Approach (Material Design):**
- Use all three levels liberally
- Clear elevation hierarchy
- Stronger shadows for better depth perception

### Step 7: Set Status Bar Style

**`sb-style`: 'light' | 'dark'**

- **'light'**: Light text/icons on status bar
  - Use with: Dark backgrounds (dark themes)
  - When: Background is dark enough that white icons are readable

- **'dark'**: Dark text/icons on status bar
  - Use with: Light backgrounds (light themes)
  - When: Background is light enough that black icons are readable

**Test**: Launch app and verify status bar text is readable

### Step 8: Final Validation

**Checklist:**
- [ ] All text/background combinations pass WCAG AA (4.5:1 or 3:1 for large text)
- [ ] Accent colors are vibrant and aligned with brand
- [ ] Font sizes are readable on small screens (test on iPhone SE size)
- [ ] Border radius matches theme personality
- [ ] Shadows are subtle and enhance depth without distraction
- [ ] Theme looks cohesive when viewing multiple screens together
- [ ] Status bar is readable in app context
- [ ] Colors tested with color blindness simulator

---

## Theme Naming Conventions

### Suggested Theme Names by Style

**Professional/Business:**
- Corporate, Executive, Professional, Formal, Classic

**Modern/Tech:**
- Modern, Digital, Tech, Cyber, Neon, Future

**Nature/Organic:**
- Forest, Ocean, Earth, Sky, Sunset, Aurora

**Mood-Based:**
- Calm, Energetic, Elegant, Bold, Minimal, Vibrant

**Time-Based:**
- Day, Night, Dawn, Dusk, Twilight

**Descriptive:**
- Dark Mode, Light Mode, High Contrast, Soft Tones

---

## Common Theme Patterns

### Pattern 1: Classic Dark/Light Pair

**Dark Theme:**
- Backgrounds: Dark grays (#121212 to #3C3C3C)
- Text: Light grays (#B9B9B9 to #D4D4D4)
- Accent: Vibrant brand color (high saturation)
- Use: Default dark mode for all apps

**Light Theme:**
- Backgrounds: Off-whites (#F5F5F5 to #D4D4D4)
- Text: Dark grays (#282828 to #111111)
- Accent: Saturated brand color (good contrast)
- Use: Default light mode for all apps

### Pattern 2: Monochromatic

- Single base hue with varying lightness/saturation
- Very cohesive, calming aesthetic
- Good for content-focused apps
- Example: Blues (#1E3A8A to #93C5FD), Greens (#064E3B to #6EE7B7)

### Pattern 3: Vibrant/Colorful

- Multiple saturated colors throughout interface
- High energy, attention-grabbing
- Good for social, creative, youth-focused apps
- Requires careful balance to avoid overwhelming users

### Pattern 4: High Contrast

- Maximum contrast ratios (7:1+)
- Accessibility-first design
- Good for users with visual impairments
- Very legible in all lighting conditions

---

## Resources & Tools

### Color Tools
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Coolors**: https://coolors.co/ (palette generation)
- **Material Design Color Tool**: https://material.io/resources/color/
- **Adobe Color**: https://color.adobe.com/
- **Color Blindness Simulator**: https://www.color-blindness.com/coblis-color-blindness-simulator/

### Typography Tools
- **Type Scale**: https://type-scale.com/ (generate font size scales)
- **Modular Scale**: https://www.modularscale.com/

### Design System References
- **Material Design 3**: https://m3.material.io/
- **Apple Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **Atlassian Design System**: https://atlassian.design/

---

## Final Notes

**Principle #1: Accessibility First**
Every theme must be accessible. Beautiful design is useless if users can't read or interact with it.

**Principle #2: Consistency Over Variety**
It's better to use fewer colors consistently than many colors chaotically.

**Principle #3: Test in Context**
Colors look different on screens than in design tools. Always test themes in the actual app.

**Principle #4: User Choice**
Provide both dark and light themes when possible. Neither is universally more accessible.

**Principle #5: Performance**
Dark themes save battery on OLED screens (up to 60% savings with pure black backgrounds).

---

*This documentation is based on research from: Material Design (Google), Human Interface Guidelines (Apple), WCAG 2.0+ Standards, Nielsen Norman Group, Smashing Magazine, UX Planet, and peer-reviewed UX research studies (2023-2025).*
