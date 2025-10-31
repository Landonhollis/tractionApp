# Settings Screen
[complete]

## Purpose (Context)
Simple settings screen where users can update their display name. This is a minimal configuration screen focused on user profile management.

---

## Routing (INVARIANT)
**Incoming:**
- From menu navigation (Settings option selected)

**Outgoing:**
- To other screens via menu navigation

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `user_names` with columns: `id, user_id, name`
- `user_id`: matches current authenticated user's id
- `name`: user's display name

### Probably Needed (Research Required)
- Email field - display/edit user email
- Theme preference - light/dark mode toggle
- Notification settings
- Account deletion option
- Password change functionality

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- Menu component from `/components/global` for navigation

### Layout Structure
Simple centered form with single editable field. Minimal interface focused on the one setting available.

**Visual hierarchy:**
- Label + text input for name field
- Auto-save or explicit save mechanism

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Screen size changes, keyboard appearance
**How:** Form remains centered and readable across all viewport sizes

### Screen States
**Known states:**
- Loaded (name field populated)
- Editing
- Saving
- Error (save failed)

**Unknown states:** Empty name handling, validation errors - implement as needed

---

## Components (SPECIFIC)

### NameField
**What component should accomplish**
User sees their current display name in an editable text field. They can update their name and save the change. The field is pre-filled with their existing name from the database.

**Data:** 
- Fetches: User's name from `user_names` table where `user_id` matches current user
- Displays: `name` field, editable
- Mutations: Update name

**Position:** Centered on screen below menu

**Actions:**
- User edits name field → updates local state
- User saves (via auto-save on blur, explicit save button, or other mechanism) → updates database
- Save successful → confirmation feedback
- Save failed → error message

**States:**
- Default (name displayed, editable)
- Loading (fetching current name)
- Editing (focus in field)
- Saving
- Error

**Backend needs:** 
- Query: `SELECT name FROM user_names WHERE user_id = [current_user_id]`
- Update: `UPDATE user_names SET name = ? WHERE user_id = [current_user_id]`

---

## User Flow (NARRATIVE)
1. User navigates to Settings screen from menu
2. User sees simple form with "Name:" label and text input
3. Text input is pre-filled with their current display name
4. **To change name:**
   - Clicks into text field
   - Edits name
   - Saves (either auto-save on blur or explicit save action)
   - Sees confirmation that name was updated
5. **If error occurs:**
   - Sees error message
   - Can retry save
6. User navigates away via menu when finished

---

## Notes & Considerations
- **Pre-fill data:** Must fetch and display current user's name on load
- **User identification:** Use authenticated user's id to query/update correct record
- **Validation:** Name field should not be empty - require at least 1 character
- **Save mechanism:** Define whether auto-save on blur, explicit save button, or other pattern
- **Feedback:** Clear indication when save is successful or fails
- **Empty state:** Handle case where user record doesn't exist in user_names table
- **Real-time updates:** If name is used elsewhere in app, consider propagating updates
- **Accessibility:** Proper form labels, error announcements
- **Future expansion:** This screen will likely grow to include more settings over time

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Minimal, clean, focused.
This is a simple utility screen - don't over-design it.
Clear label, obvious input field, straightforward interaction.
Consider gentle feedback animations for save success.
Leave room for future settings to be added below.
Professional and straightforward - this is a tool, not a showcase.
-->
```