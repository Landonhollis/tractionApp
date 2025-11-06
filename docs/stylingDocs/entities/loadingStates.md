# Loading State Styling Guide

## Loading State Fundamentals

### Purpose
- Communicate that content is loading or processing
- Prevent user confusion during waits
- Set expectations for load time
- Maintain engagement during necessary delays

### Core Principles
- Loading state appears immediately (no blank screen first)
- Maintain page structure during loading
- Provide progress indication when duration known
- Allow cancellation when appropriate

## Loading Indicator Types

### Spinners
- Small circular animated indicators
- Suitable for short, indeterminate waits
- Positioned where content will appear
- Not suitable for long loads or full-screen

### Skeleton Screens
- Gray placeholder shapes matching final content structure
- Best for content-heavy screens
- Maintains layout, prevents jarring shifts
- Subtle shimmer animation optional
- Creates perception of faster loading

### Progress Bars
- Show determinate progress (percentage or stages)
- Use when load time can be estimated
- Linear or circular depending on context
- Include percentage or time remaining when helpful

### Text Indicators
- Simple "Loading..." text
- Least engaging but acceptable for quick loads
- Consider adding animation (ellipsis cycling)
- Useful when visual loading indicator doesn't fit

## Loading Patterns

### Initial Load
- Show loading state immediately
- Skeleton screens preferred for content screens
- Spinner acceptable for small data fetches
- No blank white screen—always show something

### Pagination/Infinite Scroll
- Footer loader indicates more content loading
- Doesn't block already-loaded content
- Small spinner or loading text
- Graceful handling if no more content

### Refresh
- Pull-to-refresh shows loading indicator at top
- Manual refresh button shows loading state
- Content remains visible during refresh when possible
- Clear indication when refresh completes

### Lazy Loading
- Images show placeholder until loaded
- Sections load as user scrolls near them
- Smooth appearance of new content
- Avoid layout shifts as content appears

## Button and Action Loading

### Loading Buttons
- Button shows loading state during async action
- Spinner replaces or appears beside button text
- Button disabled during loading
- Width remains constant (no layout shift)
- Loading state persists until success or error

### Inline Loading
- Small spinner near action being performed
- Doesn't block rest of interface
- Used for non-critical background tasks

## Loading Duration Considerations

### Quick Loads (<1 second)
- Consider no loading indicator if very fast
- Simple spinner if indicator needed
- Skeleton may feel too heavy

### Medium Loads (1-5 seconds)
- Skeleton screens work well
- Spinner acceptable
- Consider engaging copy ("Finding the best results...")

### Long Loads (>5 seconds)
- Progress bar if measurable
- Entertaining or informative content during wait
- Allow user to cancel or navigate away
- Explanation of why it's taking time

## States After Loading

### Success
- Smooth transition to loaded content
- No jarring shift or flash
- Fade out loading indicator as content fades in

### Error
- Clear error message replaces loading state
- Retry option prominent
- Explain what went wrong
- Don't leave user stuck in loading state

### Empty Result
- Transition to empty state, not just hide loader
- Explain why empty (no results, no data yet)
- Provide next action

## Common Issues

### Layout Shifts
- Content jumps when loading completes
- Skeleton doesn't match final content structure
- Button changes size when loading state applied

### No Loading State
- Blank screen or frozen UI during load
- User unsure if app is working or crashed
- No feedback during waits

### Infinite Loading
- Loading state never resolves
- No timeout or error handling
- User stuck with no way forward

### Overuse
- Loading indicators for instantaneous actions
- Multiple spinners on screen simultaneously
- Loading states for already-cached content

### Poor Communication
- No indication of what is loading
- Unclear if progress is being made
- No estimate or progress for long loads
