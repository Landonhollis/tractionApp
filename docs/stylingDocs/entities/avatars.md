# Avatar Styling Guide

## Avatar Fundamentals

### Purpose
- Represent users visually throughout app
- Aid recognition and personalization
- Create human connection in interface

### Visual Treatment
- Circular most common (squares with rounded corners also acceptable)
- Consistent shape across entire app
- Image fills entire avatar (no white space inside)
- Sharp, clear images preferred

## Avatar Sizing

### Size Hierarchy
- Establish 3-4 standard sizes: small, medium, large, extra-large
- Small: list items, comments, compact views (24-32px)
- Medium: standard list items, message senders (40-48px)
- Large: profile headers, focus views (64-80px)
- Extra-large: profile screens, focal points (96-128px+)

### Consistency
- Same context always uses same size
- Message senders all same size
- List items all same size
- Sizing changes only for emphasis

## Avatar States

### With Image
- User's profile photo
- Fills entire avatar
- Cropped to fit (usually center crop)
- Handles various image aspect ratios gracefully

### Fallback (No Image)
- Initials on colored background
- Color derived from user (consistent per user)
- 1-2 letters (first name + last name initial)
- Readable contrast between text and background

### Placeholder (Loading)
- Gray circle or skeleton while loading
- Smooth transition when image loads
- No broken image icons

### System/Bot
- Icon or logo instead of user photo
- Visually distinct from user avatars
- Consistent treatment for all system messages

## Avatar Interaction

### Tappable Avatars
- Subtle press feedback (opacity or scale)
- Usually navigates to user profile
- Adequate touch target even for small avatars
- Make tappable affordance clear through context or behavior

### Status Indicators
- Small badge shows online/offline/busy status
- Positioned consistently (usually bottom-right)
- High contrast, small size
- Don't obscure avatar too much

### Edit Affordance
- On user's own profile, show edit icon or overlay
- Camera icon or edit pencil common
- Appears on press or always visible

## Layout Patterns

### Avatar + Text
- Name and optional subtitle next to avatar
- Vertical alignment: avatar centered with text
- Adequate spacing between avatar and text
- Text truncates before avatar shrinks

### Avatar Lists
- Uniform avatar sizes in lists
- Aligned vertically
- Consistent spacing between rows
- Consider grouping by date or category with headers

### Avatar Groups (Stacks)
- Overlapping avatars show multiple users
- Limit visible avatars (3-4), "+X" for more
- Maintain circular appearance despite overlap
- Tappable to show all users

## Special Cases

### Group Avatars
- Grid of multiple user photos in one avatar
- Or generic group icon
- Differentiate from individual user avatars

### Anonymous Users
- Generic icon or silhouette
- Consistent treatment for all anonymous users
- Different from user with no photo uploaded

## Common Issues

### Inconsistent Sizing
- Avatar sizes vary without reason
- Same context uses different sizes
- Disproportionate to surrounding content

### Poor Fallbacks
- Broken image icons when photo missing
- Ugly or unclear placeholder
- Inconsistent fallback appearance

### Low Quality Images
- Pixelated or blurry photos
- Stretched or distorted images
- Poor cropping cuts off faces

### Unclear Interaction
- Tappable avatars with no feedback
- User unsure if avatar is interactive
- No indication of what happens on tap

### Status Overload
- Too many badges or indicators
- Unclear what status indicators mean
- Status badge obscures avatar

### Accessibility Issues
- No alt text or user name for screen readers
- Initials in fallback have poor contrast
- Color-only status indicators
