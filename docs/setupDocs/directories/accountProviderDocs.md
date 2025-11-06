# Account Provider Documentation and directory

## Account Provider

The Account Provider is a centralized infrastructure layer that bundles authentication, user data, theming and subscription management into a single React context. It serves as the single source of truth for account-related state throughout the application. The account provider setup is limited to theme, supabase, and stripe, but more may be added on later. 

**Purpose**: Consolidate all account infrastructure in one place, making user data, authentication status, theme settings, subscription information, and stipe provider accessible anywhere in the app via the `useAccount()` hook.

**Location**: `providers/AccountProvider.tsx`

---

## DIRECTORY - What can go in the account provider

These are the infrastructure components that can be integrated into the Account Provider when present in your project:

### 1. Supabase Authentication & Database
- see the 'supabaseForAccountProvider' file to learn more about authentication within the account provider. 
- this has to do with the users personal account data, session management and more. 

### 2. Theme System

- see 'themeCoreForAccountProvider' file to learn about the theme core system and the theme options used within the theme core. 


# example
- '../examples/accountprovider.md'
you should see accountProvider.md in the examples folder to see an exammple of an account provider. yours does not have to look examtly like this but this is just an example to show you. 