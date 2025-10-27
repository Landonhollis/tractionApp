# Authentication Screen Implementation Methods

**Research Date:** 2025-10-24
**Screen Type:** Authentication / Sign In / Sign Up
**Tech Stack:** React Native, Expo, Supabase Auth, NativeWind

## Overview

This document describes the methods and patterns used to implement a full-featured authentication screen with email/password and OAuth support.

---

## Architecture Pattern

### Three-Layer Architecture

1. **Screen Layer** (`/app/auth.tsx`)
   - UI components and user interaction
   - Form state management
   - Client-side validation
   - Loading and error states

2. **Service Layer** (`/services/authServices.ts`)
   - API calls to Supabase Auth
   - Business logic
   - Error handling
   - Type-safe return values

3. **Provider Layer** (`/providers/AccountProvider.tsx`)
   - Global authentication state
   - Session monitoring
   - Auto-navigation on auth state change
   - Account data synchronization

---

## Supabase Auth Integration

### Email/Password Authentication

**Sign Up:**
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})
```

**Sign In:**
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})
```

### OAuth Authentication

**Google OAuth:**
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
})
```

**Requirements:**
- Configure provider in Supabase dashboard (Auth > Providers)
- Set up OAuth credentials (client ID, secret)
- Configure redirect URLs

### Session Management

**Auto-monitoring with Provider:**
```typescript
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setIsAuthenticated(!!session?.user?.id)
      if (session?.user?.id) {
        loadAccountData()
      }
    }
  )
  return () => subscription.unsubscribe()
}, [])
```

**Session Storage:**
- Uses AsyncStorage for React Native
- Automatically persists sessions
- Auto-refresh enabled

---

## Form Validation Pattern

### Real-Time Validation

Validate on blur and clear errors on change:

```typescript
const [errors, setErrors] = useState<FormErrors>({})

// Validate on submit
const validateForm = (): boolean => {
  const newErrors: FormErrors = {}

  if (!email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!validateEmail(email)) {
    newErrors.email = 'Please enter a valid email'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

// Clear error on change
<TextInput
  value={email}
  onChangeText={(text) => {
    setEmail(text)
    if (errors.email) setErrors({ ...errors, email: undefined })
  }}
/>
```

### Validation Rules

**Email:**
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Required, non-empty
- Valid email format

**Password:**
- Minimum 6 characters (Supabase default)
- Required, non-empty
- Can add complexity requirements as needed

**Confirm Password (Sign Up only):**
- Must match password field
- Required for sign up mode

---

## State Management Pattern

### Form States

```typescript
type AuthMode = 'signin' | 'signup'

const [mode, setMode] = useState<AuthMode>('signin')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [loading, setLoading] = useState(false)
const [errors, setErrors] = useState<FormErrors>({})
```

### Screen States

1. **Default (Sign In)** - User sees sign in form
2. **Sign Up** - User sees sign up form with confirm password
3. **Loading** - During authentication attempt
4. **Error** - Display error messages
5. **Success** - Brief state before navigation (handled by provider)

---

## Error Handling Pattern

### Service Layer Returns

```typescript
interface ServiceResult {
  success: boolean
  data?: any
  error?: any
}

// Example service method
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return { success: false, error }
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}
```

### UI Error Display

```typescript
// General error banner
{errors.general && (
  <View className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg p-3">
    <Text className="text-red-600 dark:text-red-400 text-sm">
      {errors.general}
    </Text>
  </View>
)}

// Inline field errors
{errors.email && (
  <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
)}
```

---

## Database Pattern

### Automatic Account Creation

Use database triggers to create app-specific account data:

```sql
CREATE FUNCTION create_account_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.accounts (user_id, theme_name)
  VALUES (NEW.id, NULL);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_account_for_new_user();
```

**Why this pattern:**
- Ensures accounts table always has matching record
- Atomic operation (no race conditions)
- Works for all signup methods (email, OAuth, etc.)
- No need for client-side account creation

### Row Level Security (RLS)

```sql
-- Users can only access their own data
CREATE POLICY "Users can view their own account"
  ON public.accounts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own account"
  ON public.accounts
  FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## Navigation Pattern

### Auto-redirect on Auth State

**In Index/Home Screen:**
```typescript
const { isAuthenticated, themeLoading } = useAccount()

if (themeLoading) return <LoadingScreen />
if (!isAuthenticated) return <Redirect href="/auth" />

// Show authenticated content
```

**In Auth Screen:**
```typescript
const { isAuthenticated } = useAccount()

useEffect(() => {
  if (isAuthenticated) {
    router.replace('/')
  }
}, [isAuthenticated])
```

**Why this pattern:**
- Provider manages auth state centrally
- Screens only read state, don't manage it
- Automatic navigation on state change
- Prevents manual navigation code in auth handlers

---

## Responsive Design Pattern

### KeyboardAvoidingView

```typescript
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  className="flex-1"
>
  <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
  >
    {/* Form content */}
  </ScrollView>
</KeyboardAvoidingView>
```

**Why:**
- Prevents keyboard from covering inputs
- Platform-specific behavior (iOS vs Android)
- ScrollView allows content to scroll when keyboard appears
- `keyboardShouldPersistTaps` allows buttons to work while keyboard is visible

### Responsive Card Layout

```typescript
<View className="flex-1 items-center justify-center px-6 py-12">
  <View className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-8">
    {/* Card content */}
  </View>
</View>
```

**Why:**
- `max-w-md` prevents card from being too wide on tablets/web
- `w-full` allows card to expand on mobile
- Centered on screen with `items-center justify-center`

---

## Theme Support Pattern

### NativeWind Dark Mode

```typescript
// Automatically responds to system theme
<View className="bg-white dark:bg-gray-800">
  <Text className="text-gray-900 dark:text-white">Content</Text>
</View>
```

**Pattern:**
- All colors have dark mode variants
- Uses semantic color names (not hex values)
- Consistent with app theme system

---

## Loading States Pattern

### Button Loading State

```typescript
<TouchableOpacity
  className={`w-full py-4 rounded-lg ${
    loading ? 'bg-blue-400' : 'bg-blue-500'
  }`}
  onPress={handleSignIn}
  disabled={loading}
>
  {loading ? (
    <ActivityIndicator color="white" />
  ) : (
    <Text className="text-white font-semibold">Sign In</Text>
  )}
</TouchableOpacity>
```

**Why:**
- Visual feedback during async operations
- Disabled state prevents multiple submissions
- Lighter color indicates disabled state

### Form Disable During Loading

```typescript
<TextInput
  value={email}
  onChangeText={setEmail}
  editable={!loading}
/>
```

---

## Security Best Practices

### Password Handling
- Never log passwords
- Use `secureTextEntry` for password inputs
- Let Supabase handle hashing (bcrypt)
- Minimum length validation client and server-side

### Email Verification
- Optional but recommended
- Configure in Supabase dashboard
- Prevents spam accounts
- Improves deliverability

### OAuth Security
- Use PKCE flow (automatic with Supabase)
- Whitelist redirect URLs
- Never expose client secrets in client code
- Use environment variables for configuration

---

## Testing Considerations

### Manual Testing Checklist
- [ ] Sign up with valid email/password
- [ ] Sign up with existing email (should error)
- [ ] Sign up with invalid email format
- [ ] Sign up with password too short
- [ ] Sign up with mismatched passwords
- [ ] Sign in with valid credentials
- [ ] Sign in with wrong password
- [ ] Sign in with non-existent email
- [ ] OAuth flow (if configured)
- [ ] Auto-redirect when authenticated
- [ ] Session persistence (close and reopen app)
- [ ] Sign out flow
- [ ] Theme switching (light/dark)
- [ ] Keyboard behavior on mobile
- [ ] Responsive layout (mobile, tablet, web)

---

## Common Issues & Solutions

### Issue: Infinite redirect loop
**Solution:** Check that auth screen doesn't try to redirect when already on auth screen. Use `router.replace()` not `router.push()`.

### Issue: Account record not created
**Solution:** Verify database trigger is in place. Check Supabase logs for errors.

### Issue: OAuth not working
**Solution:**
1. Verify provider configured in Supabase dashboard
2. Check OAuth credentials are correct
3. Ensure redirect URLs are whitelisted
4. For React Native, may need deep linking setup

### Issue: Session not persisting
**Solution:** Verify AsyncStorage is configured in Supabase client. Check that `persistSession: true` is set.

### Issue: RLS blocking queries
**Solution:** Ensure RLS policies use `auth.uid()` correctly. Test with different user accounts.

---

## Performance Optimizations

1. **Debounce validation** - Don't validate on every keystroke
2. **Lazy load OAuth** - Only load when user clicks OAuth button
3. **Optimize re-renders** - Use `useCallback` for handlers
4. **Memoize validation functions** - Prevent recreation on every render

---

## Future Enhancements

- [ ] Password strength indicator
- [ ] Remember me checkbox
- [ ] Social login buttons (Facebook, Apple, etc.)
- [ ] Magic link / passwordless login
- [ ] Two-factor authentication (2FA)
- [ ] Password reset flow
- [ ] Email verification flow
- [ ] Terms of service / privacy policy acceptance
- [ ] CAPTCHA for bot prevention
