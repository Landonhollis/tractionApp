# STRIPE FOR INFRASTRUCTURE
the following are the possible options for the stripe integration of a project



## Standard stripe setup

1. install the packages: 'npx expo install @stripe/stripe-react-native'
2. add the provider to the _layout file: 
```tsx
<StripeProvider
  publishableKey="pk_test_..."
  merchantIdentifier="merchant.com.yourapp" // For Apple Pay
  urlScheme="yourapp" // For redirect flows
>
  {/* Your app content */}
</StripeProvider>
```

