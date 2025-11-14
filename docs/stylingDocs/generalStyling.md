# General Styling


3d looks, depth, and elevation. 
  - default: medium
  - high 3-d'ness = heavy shadows, more defined secitions, and bias towards filled in componeents and elements instead of outlined components and elements. 
  - low 3-d'ness = few to no shadows, less visual hiarchy, better for outlined components and elements rather than filled in components and elements. 
Text size and font selection
  - readable fonts similar to times new roman and ariel that are easy on the eye should be used for longer texts. 
  - promotional, display, and landing page related pages should use fun and different fonts as long as the text length is shorter. 
  - text size should have a hiarchy, larger (but not huge) text should be the main entity above everything. smaller text should be the more fine details and find print. 
Color Placement
  - bg-1 is the background for the most back and deep part of the app. as you go higher in bg-#, the color is meant for items that feel closer to the user. bg-a1, bg-a2, and bg-a3 are accent background colors, these are used when a section is just a bit 'different' then the other sectinos, causing it to need to need to subtly be a different color. bg-a1 is the most contrasted with the background, and bg-a3 blends in with the background the most. 
  - shadow-1 is the strongest shadow and shadow-3 is the smallest/weakest shadow. 
  - accents will draw the attention of the user so make sure that these are used for the most important parts of the app where the user should focus. 
  - high contrast screens might use sharper shadows and lower contrast screens might use more gentle shadows. 
  - sometimes, if a component or element or two of them are the main focus of a screen, and it should really stand out in prominence, then an accent background might need to be used, (bg-a1, 2, 3). then it is also possible that text inverse would also need to be used so that text can be seen. border colors adjusted also for the different background. 
Statefull creativity
  - you should be creative with the states of the screen. 
  - states should alter the hiarchy of the screen, causing different components and elements to take different prominence. 
intuitive sectioning
  - the size of the sectioning, borders, and dividers should be in direct proportion to how different, or unrelated the content is. 
White space and device notches
  - the more presentational an app or screen is, the more white space it should have. the less presentational, more data driven an app or screen is, the less white space it should have. 
  - the spacing of the components and elements in a screen are the most important. each section of a screen should get an amount of space in proportion to its size and importance. then once you have each section, the amount of white space between them should be in proportion to how different they are. similar items = closer togeather. more different items = further apart. 
  - if the app is on mobile, make sure you account for the notch by adding a padding above the entire screen to avaoid any notches. 
Polishing and smoothness
  - you should make the app feel 'alive'. to do this there should be many small micro animations. this includes things that slide, rotate, and respond to small gestures that the user makes. 
  - haptic feedback should be used when there is an inhearent 'click' in some motion by the user. this will also make the app feel more alive. 
  - the app should also be smooth, there should not be many sharp chages. modals, state shifts, and more should fade in and out, very quickly, but they should fade in and out quickly to avaid sharp changes.
KeyBoad Handling
  - the first thing you should always do with keyboards is use keyboard avoiding view, the keyboard should not be in the way of the text input. 
  - the other thing you should always do when using keyboards isuse all space that is not the keyboard or test input as a keyboard escape touchable spot. this means that if you have a keyboard open, you should be able to touch anywhere other than the keyboard or the text input and the keyboard should go away. But if a user touches somewhere to get the keyboard to go away then the screen should stay on the smae focus, so if the user was edditing a modal, then touching the screen to get the keyboard to go away should NOT make the modal dissapear or delete any typing progress. 
Animation
  - to make an app look and feel very alive and connected to the user there should be many micro animations. these animations contribute to the app feeling smooth and not too rigid. these include things that slide, move, shift, fade in, fade out, bounce, change colors slowley and not suddunly, etc. but these animations should happen slowenough to notice them, but also quick enough for it to not through the users attention off. if the animation is longer than about 250 miliseconds then the user might start to notice it too much. These animations should also include some haptics only when neccisary, like when making big actions or when a 'click' would be intuitive. 
More animations  
  - Use Reanimated 3/4 for all motion; runs on the UI thread for 60–120 FPS. Always use worklets / native driver — never animate on the JS thread. Duration: ~200–300ms for most interactions; 400–600ms only for big movements. Easing: natural curves (ease-out in, ease-in out). Keep animations subtle, smooth, and purposeful; avoid sharp transitions. Use Gesture Handler + Reanimated for fluid gestures. For complex visuals, use React Native Skia (GPU-rendered). Add small animated gestures to make the app feel alive. Add haptic feedback for any “click-like” UI event.
List Rendering
- FlatList always: Use over ScrollView mapping for any dynamic list
- Extract components: Define list item components outside render for performance
- Key extractors: Provide stable, unique `keyExtractor` for list items
- windowSize: Adjust `windowSize` prop for memory management on very long lists

