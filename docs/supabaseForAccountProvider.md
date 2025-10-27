# this is where you get information about how to integrate supabase into the account provider
the following are options that might need to be integrated into the account provider and built into the app. 


## STANDARD AUTH AND DATABASE
for the standard authentication, all of the following should be implimented. 

### services
1. **'acounts' table** you should add an accounts table to the data.md prd in the prd's folder. this table should start out with fields 'user_id' which is required with FK -> users.id field and a 'theme_name' field which is not required. this should go in the data.md prd and not in supabase yet. user_id should be unique so that no user is in the accounts table twice. include rls policies so that only users can read, and update their table. 

2. **Supabase Client** (`services/supabaseClient.ts`): Sets up connection to Supabase with AsyncStorage for session persistence, auto token refresh enabled.

3. **Get Account Data** (`services/accountProviderServices.ts`): `getAccountData()` fetches user account record from `accounts` table.

4. **create user account** this is the funciton that creates the users account in supabase when the user signs up. 

5. **Sign Out** (`services/authServices.ts`): `signOut()` signs user out of Supabase session.

6. **Request Password Reset** (Supabase SDK): `supabase.auth.resetPasswordForEmail(email, { redirectTo })` sends password reset email with redirect URL.

7. **Update Password** (Supabase SDK): `supabase.auth.updateUser({ password })` updates authenticated user's password.

8. **Get Session** (Supabase SDK): `supabase.auth.getSession()` retrieves current session.

9. **Get User** (Supabase SDK): `supabase.auth.getUser()` retrieves current user data.

11. **Auth State Change Listener** (Supabase SDK): `supabase.auth.onAuthStateChange()` monitors login/logout events.

### supabase functions

1. **create record in accounts table** when [user_is_created], supabase should [add_record_to_'accounts'], and the user_id field should be the same as that users id in the users table (users.id). and 'theme_name'should start out as null. this should NOT be added to supabase yet, only to the data.md prd in the prd's folder. 

### instalation

install supabase packages. 
this may include supabase-js and react native async storage. 

### env variables
- these should be added to the env file. 
EXPO_PUBLIC_SUPABASE_URL="your-project-url"
EXPO_PUBLIC_SUPABASE_ANON_KEY="your-anon-key" 


## NO AUTHENTICATOIN
sometimes there may be no authentication in a project because there may be no user accounts. this does not mean that there is no data base, all it means is that there are no individual accounts. 

## NO DATABASE
Sometimes in a project there is no database needed in the app. this is rare, but it happens. 