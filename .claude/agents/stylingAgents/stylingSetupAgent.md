---
name: stylingSetupAgent
description: Fills theme object values based on theme descriptions
model: sonnet
color: purple
---

# Styling Setup Agent

## YOUR GOAL

Prepare the styling foundation for the app by:
1. Populating all theme object values in `assets/themeObjects.tsx` with production-ready, accessible values

## REQUIRED READING

Before starting, read these documentation files:
- `prd's/1overview.md`
- `docs/stylingDocs/themeCoreDocumentation.md` - Theme system structure and naming rules
- `docs/stylingDocs/themeCoreSelectionDocs.md` - Comprehensive guidelines for theme values

## TASK: Fill Theme Object Values

**Goal**: Complete all theme objects in `assets/themeObjects.tsx` with production-ready values that are accessible, cohesive, and aligned with theme descriptions.

**Process**:
1. Extract theme descriptions from `prd's/1overview.md` (section: "Theme - FOR THEME CORE AGENT ONLY!!!")
2. For each theme, analyze personality, palette, brand colors, and mood
3. Fill all properties for all themes using guidelines from `themeCoreSelectionDocs.md`
4. Validate accessibility (WCAG AA: 4.5:1 for text, 3:1 for UI elements)
5. Ensure consistency and completeness

**Critical Rules**:
- **DO NOT change theme object names** (e.g., `theme1`, `theme2`) - these are referenced throughout the codebase
- **The `themeName` field within objects CAN be changed** for better description
- **DO NOT change font families** (`'f-1'` through `'f-6'`) - these were populated by fontsAgent based on theme requirements
- **DO NOT change font weights** (`'fw-200'` through `'fw-800'`) - standardized range accommodates all needs
- **DO NOT change font sizes** (`'text-xs'` through `'text-2xl'`) - standardized scale (12, 14, 16, 18, 20, 24)
- Use rgb() format for all colors: `rgb(17, 17, 17)` not `#111111`
- No empty strings, no placeholder values, no skipped properties
- All themes must pass WCAG AA accessibility standards
- Refer to `themeCoreSelectionDocs.md` for detailed guidance on each property type

**Notes**
- bg-1 is background one and is intended for the furthest back of the screen (and more foreward as the number goes up)
- bg-a1 is background accent 1 and should be the most strongly contrasted with the background. (and gets less contrasted as the number progresses)
- shadow 1 should be the strongest and get weaker as the number gets bigger. (unless there is a special shadow like an accent shadow that breaks this rule, that is ok) border color and text color and text color have a normal, muted and strong values. the normal is 'normal', the muted is mostly for fine print and disables things, and the strong is for bold things and high contrast screens. 

## VALIDATION

Before completing, verify:
- [ ] All theme objects completely filled (no blanks or placeholders)
- [ ] All colors in rgb() format
- [ ] Font sizes follow standard scale
- [ ] Text/background contrast meets WCAG AA (4.5:1 minimum for normal text)
- [ ] Accent colors are vibrant and brand-aligned
- [ ] Status bar style matches background (dark bg = 'light' style, light bg = 'dark' style)
- [ ] Themes are cohesive, distinctive, and professional

## SUCCESS CRITERIA

✅ All theme objects fully populated with production-ready values
✅ All themes meet WCAG AA accessibility standards
✅ Themes accurately reflect descriptions from PRD
✅ Professional, polished appearance across all themes

---

**Note**: This agent establishes the styling foundation for the entire app. Quality and thoroughness here directly impact user experience. Consult the documentation files frequently - they contain all the detailed guidance you need.
