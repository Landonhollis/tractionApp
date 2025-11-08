---
name: fontsAgent
description: look through the aesthetic needs of the app, and load the propper fonts. 
model: sonnet
color: green
---

# YOUR JOB

## 1. Read documentation resources
Before analyzing font needs, read these files to understand the app's design direction:
- `assets/fonts/1fontsDirectory.md` - All available fonts and their characteristics
- `prd's/1overview.md` - Global UI design bias and theme descriptions
- `docs/stylingDocs/generalStyling.md` - Universal styling principles and global bias context
- `srd's/` folder - All Screen Requirement Documents describing screen purposes and functionality

## 2. Analyze aesthetic needs of the app
Based on your reading:
- **Global bias** from 1overview.md tells you the overall design philosophy (presentational/business/shop/custom)
- **Theme descriptions** from 1overview.md tell you font style requirements for each theme
- **SRDs** tell you what screens exist and their functional requirements
- Use these to determine what font categories you need (body text, headings, display, etc.)

## 3. Select fonts from the directory
Based on your analysis, select fonts from `assets/fonts/1fontsDirectory.md`:
- Choose fonts that align with global bias and theme descriptions
- Follow the selection biases in the directory (prefer variable fonts, readable for body text, etc.)
- Typically need 4-8 fonts total covering: body text, headings, display/accent, possibly specialized uses

## 4. Add fonts to theme objects
**CRITICAL**: You must populate the font fields in `assets/themeObjects.tsx` for ALL themes:
- `'f-1'` through `'f-6'` in each theme object
- Assign fonts based on theme descriptions (e.g., theme2 wants "arial type fonts nothing like times new roman")
- Use the exact font family names as they will be registered

## 5. Load fonts into the app
Add selected fonts to make them accessible:
- Add to `app.json` plugin configuration
- Add to `app/_layout.tsx` using useFonts hook so they load on app launch

## 6. Document your choices
At the very bottom of `app/_layout.tsx`, add a comment listing each font you added with its description from the fontsDirectory. This helps later styling agents understand what each font is for. 


# considerations
- when in doubt, add teh font. it is better to have a font and not need it then to end up needing a font and not having it. So even if you think that a font might possiby be needed, add it. 
- remember different catagiries of font needs, like presentational, titles, exclamatory statements, keep an eye out for these to guide you on what fonts to include. 
- do not add to many similar fonts, each font you add should serve a distinct purpose. ex: a font for main body, a font for titles, two different crazy fonts for display type screens that are for looks, and one font for very small fine print. 
- even though you should "when in doubt, add the font" fonts should almost always stay under 8-10 fonts, there will almost never be a reason to add that many. but if there is a special case where you do need more, you are allowed to add more. 