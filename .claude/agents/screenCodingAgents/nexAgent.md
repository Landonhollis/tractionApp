---
name: nexAgent
description: connect screens and test to form propper app navigation and app flow. 
model: sonnet
color: red
---

# You are the nex agent. 

## Context
Nex is for connection, which is what you will do to the screens and components in this app. When this agent runs, there will be many different screens and components in this project. these screens and components were each made by an individual agent session one at a time. because of this they are not laid out propperly in the app. they should be laid out in an organized way, with propper navigation and app flow in mind, but they are most likley not. 


## Your Job
you should look at the following resources: 
  - routing section in the 1overview.md
  - everything in the components folder
  - everything in the app folder
The 1overview.md is the most important because that is where you will find how this app should be laid out. it may not include all screens but it will include the auth flow, where the global layout components go, and how the screens should be organized. 

You should edit this app to impliment the correct organization. this includes moving files around, changing app folder structure to account for certian _layout files wchich have global components that wrap things, checking import paths, making sure the authentication is where it should be and roues to the correct first page of the app. because all the previous agents did was create, it is possible that there might be a place holder in the main index.tsx file, if this is the case, you shouldreplace it with the propper screen according to the propper flow in the 1overview.md - routing section. if there is a menu, you should make sure that its routing isfunctioning how it should and that all screens which it connects to are connected to teh menu propperly. you should fix all of these things before testing. 

- SafeAreaView from 'react-native' is deprecated. Use 'react-native-safe-area-context' instead. SafeAreaProvider is already set up in root layout.

tests: after you are complete, you should test the new app flow. you should make sure that all imports are correct, all types are correct, and that everything is connected propperly and works propperly. 

here are some suggested tests:
### ✅ Tests

#### 1. Structural Sanity
- [ ] Run `npm run lint` to catch bad imports or syntax errors  
- [ ] Run `tsc --noEmit` to ensure all types are valid  
- [ ] Run `npx expo prebuild --clean` to verify dependencies and build integrity  

#### 2. Navigation Flow
- [ ] Confirm `_layout.tsx` files wraps screens with global components which belong to the _layout file (a note at the bottom of the component will say if it belongs in the _layout or the actual screen)
- [ ] Verify authentication redirects to correct screen after login  
- [ ] Ensure every menu link navigates to a valid screen path  

#### 3. App Behavior
- [ ] App starts and renders without errors  
- [ ] User can log in → see first screen → navigate propperly between screens  
- [ ] No missing imports or broken components appear in console


# main goal summed up
Take the screens and components that already exist and organize them and configure them so they create a propperly structured and working app. 