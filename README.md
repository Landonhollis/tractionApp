# Welcome to Betr Code Apps




# HOW THIS WORKS

   ## creating the project
   PRD'S FOLDER
      - 1overview: you should fill this in, it contains all basic information about your app. 
      - 2data: do not edit this, this is for ai to edit. 
      - 3infrastructure: you should ckeck off the boxes for this that fit your project. do not edit anything other than putting an 'x' in the selections you want. 
      - 4notifications: put what notifications you want here. they should be clear, and have a clear trigger. 
   SRD'S folder
      - global components: use the template in the srd's folder to create one file for each global component you want in the srd's folder. add any screen biases. 
      - simple screens: use the template to create one file for each screen that requires no more research than react native reusables and supabase. add any screen biases. 
      - complex screens: use the template to create one file per screen that requires more research and / or packages than just react native reusables and supabase. add any screen biases. 
   ## setup
   SET UP AGENT
      - The setup agent is the first to run. it looks at the infrastucture items that are cheked off and impliments them. this insluced supabase, themeCore and stripe setup. 
   ## coding
   GLOBAL COMPONENTS
      - The global components should be coded first. run one instance of the global components coding agent for each of the global component srd's. 
   SCREENS
      - After global components, code the rest of the screens using the complex screen coding agent and the simple screen coding agent.
      - These do not have to go in any certain order. 
      - each screen shuold get a fresh instance of its coding agent. 
   NEX
      - each screen coding agent stays in its own lane, it does not conjoin. that is the job of the nexAgent. 
      - the nex Agent takes all seperated screens, and conjoins them into a propper app by sorting them into the right files for navigation, making sure imports are accurate, checking that everything connects to geather propperly, and the the app flows as it should. 
   ## styling
   SETUP
      fontsAgent
         - This agent analyzes the app's aesthetic needs from global bias, theme descriptions, and SRDs
         - Selects appropriate fonts from the fonts directory (4-8 fonts typically)
         - Populates font families ('f-1' through 'f-6') in ALL theme objects in themeObjects.tsx
         - Loads selected fonts into _layout.tsx and app.json
         - Documents font choices at bottom of _layout.tsx for other styling agents

      stylingSetupAgent
         1. Adds global UI design bias comments to bottom of all TSX files created by coding agents
            - Global bias is chosen by human in 1overview.md (presentational/business/shop/custom)
            - This guides the overall app-wide design philosophy
         2. Fills all theme object values in themeObjects.tsx (colors, borders, shadows, etc.)
            - Does NOT modify fonts (already populated by fontsAgent)
            - Uses theme descriptions from 1overview.md and themeCoreSelectionDocs

   SCREEN STYLING
      - Run one instance of screenStylingAgent per TSX file created by coding agents
      - Agent workflow:
         1. Reads the TSX file and global bias comment at bottom
         2. Identifies applicable screen bias patterns from screenBiasesDirectory.md (0-3 per screen)
            - Screen biases are UX optimization patterns (Data Dashboard, Forms/Intake, etc.)
            - Different from global bias - these are per-screen optimizations
            - Human can specify custom screen bias in SRD → coding agent adds to TSX
         3. Identifies UI entities present (buttons, cards, lists, etc.) from entitiesDirectory.md
         4. Reads specific documentation for identified biases and entities only
         5. Applies styling using theme core system (ps function) without changing functionality
      - Resources available: screen biases, global bias, entities, generalStyling.md, theme core 


## NOTES BEFORE AGENTS RUN

- Make sure supabase is connected before running data agregate agent. 
- create global components before creating normal screens. (because screens will need the global components)
- make sure all media like puictures and icons and such is in the right place. 



