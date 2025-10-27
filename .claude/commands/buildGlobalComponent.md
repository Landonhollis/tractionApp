# Build Global Component
For simple, purely presentational global components with minimal state and logic.

## When to Use This Command
**ONLY use this if ALL are true:**
- ✅ No internal state (or only simple show/hide)
- ✅ No navigation logic
- ✅ No user interactions beyond basic tap
- ✅ Purely presentational (data in, display out)
- ✅ Minimal edge cases

**Examples:** Simple header, static badge, read-only card, divider, icon wrapper

**If ANY of these are false, use `global-component-coding-agent` instead.**

---

## YOUR JOB:

### 1. Gain Context
  1. Read the global component PRD given to you
  2. Check `/components/globalComponents/` for similar existing components
  3. Read `/prd's/1overview.md` to understand app structure

### 2. Check React Native Reusables (Optional)
  - Quickly scan https://reactnativereusables.com/docs for any useful UI primitives
  - Install if helpful, but not required for simple components

### 3. Build Component
  1. Create file: `/components/globalComponents/ComponentName.tsx`
  2. Define TypeScript interface for props with JSDoc comments
  3. Build component with:
     - Props-based rendering (no complex state)
     - Basic edge case handling (missing props, long text)
     - Basic layout styling (flexbox, spacing)
     - Accessibility props
  4. Export component and types
  5. Add usage example in comments

### 4. Styling Approach
  - **DO**: Layout, positioning, structure
  - **DO**: Accept style props for customization
  - **DON'T**: Hardcode colors/fonts
  - **DON'T**: Use theme system

### 5. Edge Cases (Minimal)
  - Missing props: Safe defaults
  - Long text: Truncate or wrap appropriately
  - Invalid values: Default to empty/placeholder

### 6. Deliverables
  1. Component file in `/components/globalComponents/ComponentName.tsx`
  2. TypeScript types exported
  3. Usage comment at top:
```typescript
     /**
      * ComponentName - Brief description
      *
      * Usage:
      * <ComponentName title="Screen Title" />
      */
```
  4. Add to Knowledge Graph & Registry

---

## Example: Simple Header
```typescript
/**
 * Header - Displays screen title at top of page
 *
 * Usage:
 * <Header title="Dashboard" />
 */

interface HeaderProps {
  /** Screen title to display */
  title: string;
  /** Optional style overrides */
  style?: ViewStyle;
}

export const Header = ({ title, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text 
        style={styles.title}
        numberOfLines={1}
        accessibilityRole="header"
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
```

---

## Rules:
  - ✅ Keep it simple - 50 lines max
  - ✅ Props-driven rendering
  - ✅ TypeScript types
  - ✅ Basic edge cases only
  - ❌ NO complex state management
  - ❌ NO navigation
  - ❌ NO data fetching
  - ❌ NO services/backend

If component grows beyond this scope, use `global-component-coding-agent` instead.