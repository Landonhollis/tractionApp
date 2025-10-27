# Auth  Screen

## Purpose (Context)
This is the authentication entry point where users can sign in with email/password, create a new account with email/password, or sign in with Google. It serves as the gateway to the app for both new and returning users.

---

## Routing (INVARIANT)
**Incoming:**
- From app launch (initial screen when unauthenticated)
- From session expiration

**Outgoing:**
- To [Home/Main Screen] via successful authentication
- To [Onboarding Screen] via successful account creation (if onboarding flow exists)

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `users` with columns: `id, email, password_hash, created_at`
- Supabase Auth configured with email/password provider
- Supabase Auth configured with Google OAuth provider

### Probably Needed (Research Required)
- User profile data (name, avatar, etc.) - determine if collected at signup or later
- Email verification workflow - decide if required before app access
- Password reset flow - needs dedicated screen/modal

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- None (this is a standalone auth screen)

### Layout Structure
Single centered card layout with vertical content flow. Card should be responsive to viewport size.

**Visual hierarchy:**
- Top: App branding
- Middle: Form inputs (dynamic based on mode)
- Bottom: Mode toggle (Sign In / Sign Up)

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Screen size changes, keyboard appearance
**How:** 
- Mobile: Card takes most width with padding
- Tablet/Web: Card has max-width, centered, does not expand to full screen

### Screen States
**Known states:**
- Sign In mode (default)
- Sign Up mode
- Loading (during auth attempt)
- Error (invalid credentials, network error, etc.)

**Unknown states:** Password reset, email verification prompts - implement as needed.

---

## Components (SPECIFIC)

### SignInBox
**What component should accomplish**
User arrives and sees a clean auth interface. They can toggle between signing in (if returning) or signing up (if new). They enter their credentials, submit, and are authenticated into the app. Alternatively, they can use Google sign-in with one tap.

**Data:** 
- Inputs: `email`, `password`, `confirmPassword` (sign up only)
- Validates: email format, password match (sign up), non-empty fields
- Sends to: Supabase Auth service

**Position:** Centered on screen, responsive width

**Actions:**
- User toggles between Sign In / Sign Up modes → form fields update
- User enters email/password → validation on blur/submit
- User clicks "Sign In" → authenticates with Supabase Auth
- User clicks "Create Account" → validates password match, creates account
- User clicks "Sign in with Google" → OAuth flow with Google
- Validation errors → display inline error messages

**States:**
- Sign In mode (default)
- Sign Up mode
- Loading (during submission)
- Error (validation or auth failure)
- Success (brief before navigation)

**Backend needs:** 
- Supabase Auth email/password sign in
- Supabase Auth email/password sign up
- Supabase Auth Google OAuth
- Likely: Email verification webhook/trigger
- Likely: Post-signup user profile creation trigger

---

### AppIcon
**What component should accomplish**
Displays the Traction app logo at the top of the auth box, adapting to light/dark theme.

**Data:** 
- Static asset: TractionApp icon/logo

**Position:** Top of SignInBox, centered

**Actions:**
- None (static branding)

**States:**
- Theme-aware tint (matches text color)

**Backend needs:** None

---

## User Flow (NARRATIVE)
1. User opens app for first time or after session expiration
2. User sees auth screen with Sign In form (default view)
3. **If returning user:**
   - Enters email/password
   - Clicks "Sign In" or "Sign in with Google"
   - Authenticated → navigates to main app
4. **If new user:**
   - Clicks "Sign Up" toggle at bottom
   - Sees sign up form with email, password, confirm password
   - Enters credentials, validates password match
   - Clicks "Create Account"
   - Account created → navigates to main app or onboarding
5. **If error occurs:**
   - Sees inline error message (invalid credentials, network error, etc.)
   - Can retry or switch modes

---

## Notes & Considerations
- **Security:** Passwords must meet minimum requirements (define: min length, complexity?)
- **Validation:** Real-time validation for email format, password match
- **Error handling:** Clear messaging for network errors, invalid credentials, existing email
- **Google OAuth:** Handle OAuth callback and error states
- **Session management:** Store auth token securely (Supabase handles this)
- **Accessibility:** Form inputs need proper labels, error announcements
- **Edge cases:** 
  - User closes app during OAuth flow
  - Network timeout during sign-in
  - Email already exists during sign-up

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Clean, minimal, trustworthy. This is the first impression of the app.
Focus on reducing cognitive load - clear CTAs, obvious mode switching.
Accent color on primary buttons creates clear visual hierarchy.
Icon tinting ensures brand consistency across themes.
Consider subtle animations on mode toggle for polish.
-->
```