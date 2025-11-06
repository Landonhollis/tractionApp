# this is the theme core documentation for the account provider

## what the Theme Core system is. 

the theme core system is a very simple way to have highly cutamizable themes all across the app. It has several parts and a few rules on how to use it. Generally, the theme core system is a set of theme objects, all of the same type, that live in the assets folder. these theme objects map a string to a certian style prop. then the ps() function goes in the style prop in tsx portions of the app. this function takes an input of strings seperated by a space and uses the theme objects and the current theme in the users profile to map the strings to a correct style prop in a native wind / tailwind fassion. 

## theme options
the following are the options that a project can use for its theme system. 

### standard theme core
the 'standard theme core' consists of the following 


**Theme Objects**
- four predeffined theme objects, all with the same names and values as the theme objects example in the examples folder. and with the basic type structure from the themeTypes examples in the example file. 
- see the 'themeObjects' file in the examples folder for examples of theme objects. 
- see the 'themeTypes' file in the examples folder to see theme types. 

**Theme State**
- `ctn`: Current theme name gotten forom
- `ct`: Current theme object
- `themeLoading`: Loading state for theme initialization

**Theme Functions**
- `setTheme(themeName)`: Updates theme locally and persists to database 
- `ps(styleString)`: Parse styles function - converts space-separated theme keys into React Native style objects (e.g., `ps('bg-1 text-normal f-3')`)
- see examples for the set theme funciton in the setThemeFunction file in the examples folder. 
- see examples for the ps() function in the psFunction file in the examples folder. 

**first priority rule**
- all this rule states is that if the theme core can be used it should. then next up is native wind. then if neither theme core nor native wind can work, then the style prop is to be used. 

**status bar component** there should be a status bar component in the components folder that is to go in the _layout file.

**MESSAGE TO AGENT** If you are the 'setupAgent' you should NOT include real values in the theme core. a later agent who is in charge of establishing the theme core values will take care of this. you should just put blank values for a later agent to fill in. but do include the type for the objects so the later agent knows what vlaudes are accepted. 

### No Theme Core
- sometimes apps will not use a theme core system. this is almost never the case, but if it is. then there are no theme core styles in the app, no theme objects, no theme saved in data base, just native wind and bare style props throughout the whole app. 

