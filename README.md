# Welcome to Betr Code Apps




# HOW THIS WORKS

   ## creating the project
   PRD'S FOLDER
      - 1overview: you should fill this in, it contains all basic information about your app.
      - 2data: do not edit this, this is for ai to edit.
      - 3infrastructure: you should ckeck off the boxes for this that fit your project. do not edit anything other than putting an 'x' in the selections you want.
      - 4notifications: put what notifications you want here. they should be clear, and have a clear trigger.
   SRD'S folder
      - global components: use the template in the srd's folder to create one file for each global component you want in the srd's folder.
      - simple screens: use the template to create one file for each screen that requires no more research than react native reusables and supabase.
      - complex screens: use the template to create one file per screen that requires more research and / or packages than just react native reusables and supabase. 
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
   DATA AGREGATE
      - The data agregate takes all the data that has been entered into the 2data.md prd from ths screen coding agents, makes sure that everything connects propperly and there are no conflicts in logic, makes sure there are propper rls policies, defualts, FK's and PK's, then migrates all data to supabase via the supabase mcp. 
   ## styling
   SETUP
      fontsAgent
         - This agent analyzes the app's aesthetic needs from theme descriptions and SRDs
         - Selects appropriate fonts from the fonts directory (4-8 fonts typically)
         - Populates font families ('f-1' through 'f-6') in ALL theme objects in themeObjects.tsx
         - Loads selected fonts into _layout.tsx and app.json
         - Documents font choices at bottom of _layout.tsx for other styling agents
      stylingSetupAgent
         - Fills all theme object values in themeObjects.tsx (colors, borders, shadows, etc.)
         - Does NOT modify fonts (already populated by fontsAgent)
         - Uses theme descriptions from 1overview.md and themeCoreSelectionDocs
   SCREEN STYLING
      screen styling agent
         - Run one instance of screenStylingAgent per TSX file created by coding agents
         - Agent workflow:
            1. Reads the TSX file
            2. Identifies UI entities present (buttons, cards, lists, etc.)
            3. Applies styling using theme core system (ps function) without changing functionality
         - Resources available: generalStyling.md and theme core 


## NOTES BEFORE AGENTS RUN

- Make sure supabase is connected before running data agregate agent. 
- create global components before creating normal screens. (because screens will need the global components)
- make sure all media like puictures and icons and such is in the right place. 



