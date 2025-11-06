# Welcome to Betr Code Apps




# HOW THIS WORKS

   ## creating the project
   PRD'S FOLDER
      - 1overview: you should fill this in, it contains all basic information about your app. 
      - 2data: do not edit this, this is for ai to edit. 
      - 3infrastructure: you should ckeck off the boxes for this that fit your project. do not edit anything other than putting an 'x' in the selections you want. 
      - 4notifications: put what notifications you want here. they should be clear, and have a clear trigger. 
   SRD'S folder
      - global components: use the template in the srd's folder to create one file for each global component you want in the srd's folder
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
   ## styling
   SETUP
      - The first part of the styling is the stylingSetupAgent.
      1.  this agent figures out what global biases apply to the app, and adds them to each of the tsx files created by the coding agent.
      2. Then this agent looks at the '1overview.md ## Theme Object Descriptions' and the theme core selection docs from the './docs/stylingDocs' folder in order to actually fill in the values for the theme objects. 
   SCREEN STYLING
      - one instance of the the screenStylingAgent will run on each tsx file that was created by the coding agents. 
      - this styling agent will first read the tsx file it was given, then go to the screenBiasesDirectory.md to find out what screen biases the screen should have. then it will go to the the entitiesDirectory.md to find out if it should look here for any styling guidence. 
      - now the agent should have the screen biases, global biases, entities, and it should also look at the generalStyling.md, these are the agents resources. 
      it should now use these resouces to style the tsx file it was given without changing the functionality of the screen, only changing the styles and looks. 


## NOTES BEFORE AGENTS RUN

- Make sure supabase is connected before running data agregate agent. 
- create global components before creating normal screens. (because screens will need the global components)
- make sure all media like puictures and icons and such is in the right place. 



