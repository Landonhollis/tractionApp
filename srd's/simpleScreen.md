# [Screen Name] Screen



## Decision Framework Quick Reference

**Use `/build-simple-screen` when:**
- ✓ You know exactly what to build
- ✓ All tools/patterns are familiar
- ✓ Standard CRUD + basic UI
- ✓ No research needed

**Use Simple Screen Agent when:**
- ✓ Minor unknowns exist
- ✓ Need to research RN Reusables or basic Supabase patterns
- ✓ Familiar patterns with organizational complexity
- ✓ Multiple states or components but no external packages

**Use Complex Screen Agent when:**
- ✓ Need to research packages/integrations
- ✓ Multi-level data hierarchies with joins
- ✓ Canvas/visualization libraries required
- ✓ Complex state management (drag-drop, real-time updates)
- ✓ Significant architectural decisions needed




## Purpose (Context)
[1-2 sentences: What user goal does this accomplish? What business logic does it serve?]

---

## Routing (INVARIANT)
**Incoming:**
- From [ScreenA] via [trigger/event]
- From [ScreenB] via [trigger/event]

**Outgoing:**
- To [ScreenX] via [user action]
- To [ScreenY] via [condition/event]

**Parameters passed:** [if any]

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `[table_name]` with columns: `[col1, col2, col3]`
- [Any other guaranteed data structures]

### Probably Needed (Research Required)
- [Uncertain data needs - describe what you're not sure about]
- [Relationships between entities that may need definition]
- [Any data you suspect exists but haven't confirmed]

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- [Component name from /components/global] at [general position]
- [Component name] with [specific behavior if different from default]

### Layout Structure
[Describe the sectional layout as a template - e.g., "Header sticky at top, scrollable content area, bottom action bar fixed"]

**Visual hierarchy:**
- [Section 1]: [what goes here]
- [Section 2]: [what goes here]

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** [screen size changes, keyboard appearance, etc.]
**How:** [AI decides - just ensure it works]

### Screen States
**Known states:**
- [loading, error, empty, populated, etc.]

**Unknown states:** Likely additional edge case states exist - implement as needed.

---

## Components (SPECIFIC)

### [Component Name 1]
**What component should accomplish**
- naritive of how the user uses the component

**Data:** 
- Displays: `[data.field]`
- Needs: [describe data requirements, not exact schema]

**Position:** [Where in layout - template description]

**Actions:**
- User [action] → [effect/state change]
- User [action] → [navigation/backend call]

**States:**
- Known: [visible, disabled, loading, etc.]
- Unknown: Handle edge cases as needed

**Backend needs:** [Mention if services/functions/webhooks likely needed - AI will implement]

---

### [Component Name 2]
[Same structure as above]

---

## User Flow (NARRATIVE)
1. User arrives from [screen/state]
2. User sees [high-level description of screen state]
3. User can [primary actions available]
4. User [completes goal] and navigates to [destination]

---

## Notes & Considerations
- [Any special rules, validation logic, or edge cases]
- [Security considerations]
- [Performance notes]
- [Anything weird or non-standard]

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
[Presentational, formal, minimalistic, data-rich, playful, etc.]
[Any specific UI personality traits that should influence later design passes]
-->
```