# Image Styling Guide

## Image Fundamentals

### Aspect Ratios
- Consistent aspect ratios create visual rhythm
- Common ratios: 1:1 (square), 16:9 (landscape), 4:3, 3:2
- Use resizeMode appropriately: cover, contain, stretch
- Avoid arbitrary crops that cut off important content

### Loading Behavior
- Never show broken image icons or blank spaces
- Use placeholders while loading (color, gradient, or skeleton)
- Fade in when loaded for polish
- Consider progressive loading for large images

## Image Sizing

### Responsive Sizing
- Images adapt to container and screen size
- Maintain aspect ratio during resize
- Use appropriate resolution for device (2x, 3x on retina)
- Consider performance—don't load huge images for small displays

### Fixed vs Flexible
- Fixed sizes for thumbnails, avatars, icons
- Flexible for hero images, detail views, galleries
- Consistent sizing within same context (all product images same size)

## Image States

### Loading State
- Show placeholder immediately
- Skeleton or blurred preview if available
- Spinner only for large or critical images

### Error State
- Show fallback image or icon if load fails
- Allow retry mechanism
- Don't leave empty space

### Empty State
- Placeholder for missing images (user avatar, product photo)
- Icon or initials for user avatars
- Generic image for missing product photos

## Image Presentation

### Borders and Shadows
- Subtle borders when image background matches screen background
- Shadows create elevation for floating images
- Rounded corners soften presentation

### Captions and Overlays
- Text overlays need sufficient contrast (gradient, scrim, or shadow)
- Captions below images for context
- Interactive overlays appear on press or hover

## Image Interaction

### Tappable Images
- Provide visual feedback on tap
- Common uses: open fullscreen, navigate to detail, zoom
- Make tappable affordance clear (icon, border, or context)

### Image Galleries
- Smooth swiping between images
- Indicators show position in gallery (dots, counter)
- Pinch to zoom expected in fullscreen view
- Easy exit from fullscreen (X, swipe down, tap outside)

## Performance

### Optimization
- Serve appropriately sized images (don't load 4K for thumbnails)
- Lazy load images below fold
- Cache loaded images
- Consider WebP or modern formats for smaller file sizes

## Common Issues

### Inconsistent Aspect Ratios
- Mixed sizes create chaotic layouts
- Maintain consistency within same screen or list

### Poor Loading Experience
- Blank spaces or broken icons during load
- No indication image is loading
- Layout shift when image loads

### Missing Fallbacks
- No placeholder for failed loads
- Empty space when image missing

### Accessibility Neglect
- Missing alt text or descriptions
- No context for screen readers
- Decorative images not marked as such

### Performance Problems
- Loading full-resolution images for tiny thumbnails
- Not caching images—repeated downloads
- Too many images loading simultaneously
