# SRD Implementation Certainty Tier Guide

This document categorizes each screen by implementation certainty level to help you choose the right tool (slash command vs agent) for building each screen.

---

## HIGH CERTAINTY → Use `/build-simple-screen` Slash Command

**Criteria:** All tools/patterns known, standard CRUD + basic UI, no research needed

### Settings
**Tier:** High Certainty
**Reason:** Single field CRUD operation, basic form, standard Supabase query. Straightforward implementation with no unknowns.

---

## MEDIUM CERTAINTY → Use Simple Screen Agent

**Criteria:** Minor unknowns, light research needed (React Native Reusables, basic Supabase patterns), familiar patterns with slight variation

### Auth 
**Tier:** Medium Certainty
**Reason:** Supabase Auth is well-documented, but requires research on OAuth implementation, multiple form states, and validation patterns. Moderate complexity with known tools.

### VTO
**Tier:** Medium Certainty
**Reason:** Dynamic sections from database columns, modal editing, long-press interactions. Requires some pattern research but uses standard Supabase + RN Reusables.

### Processes
**Tier:** Medium Certainty
**Reason:** List with CRUD operations, long-press popup, floating action button. Slightly more complex than basic CRUD but no external packages needed.

### Issues
**Tier:** Medium Certainty
**Reason:** Multi-level grouping (quarterly, company, departmental), long-press interactions, department organization. Familiar patterns with organizational complexity.

### GWC
**Tier:** Medium Certainty
**Reason:** Static hardcoded content, presentational layout. Simple implementation but requires thoughtful typography and layout decisions.

### IDS
**Tier:** Medium Certainty
**Reason:** Static hardcoded content, presentational layout. Same as GWC - simple but needs good layout implementation.

### Leading Over Lagging
**Tier:** Medium Certainty
**Reason:** Static hardcoded content, presentational layout. Same as GWC/IDS - straightforward but requires layout finesse.

### Meeting Agendas
**Tier:** Medium Certainty
**Reason:** Static hardcoded content with multiple sections, presentational layout. Similar to other educational screens but with more sections to organize.

### Right People Right Seats
**Tier:** Medium Certainty
**Reason:** Static hardcoded content, presentational layout. Same pattern as other educational screens.

### Dashboard
**Tier:** Medium Certainty
**Reason:** Multi-source data aggregation, responsive grid layout, color-coded status indicators. More complex than basic CRUD but uses standard patterns and no external packages beyond RN Reusables.

---

## LOW CERTAINTY → Use Complex Screen Agent

**Criteria:** Significant research required, package exploration needed, complex architecture/integration, external APIs, payments, real-time features, or unfamiliar patterns

### Rocks
**Tier:** Low Certainty
**Reason:** Multi-level hierarchy (company/departmental/individual), complex grouping by department and user with joins, three-layer background system, square grid layout with responsive behavior, long-press with edit/delete popups. Architectural complexity requires careful planning.

### Scorecards
**Tier:** Low Certainty
**Reason:** Similar complexity to Rocks (multi-level, grouping, joins) PLUS real-time status indicator logic (green/red based on min/max), frequently updated data requiring optimized edit flows, color-coded visual feedback system. High data complexity + interaction optimization.

### Accountability Chart
**Tier:** Low Certainty
**Reason:** Requires canvas/whiteboard package research (pan, zoom, drag-and-drop), coordinate system management, line rendering between nodes, complex state management for draggable elements. Significant unknowns in implementation approach.

### Data History
**Tier:** Low Certainty
**Reason:** Requires charting library research (React Native time-series charts), complex data visualization with custom styling, per-graph date filtering state, large dataset handling, conditional dot coloring logic. Major package research required.

---

## Summary Count

- **High Certainty (Slash Command):** 1 screen
- **Medium Certainty (Simple Screen Agent):** 11 screens
- **Low Certainty (Complex Screen Agent):** 4 screens

---

## Decision Framework Quick Reference

**Use `/build-simple-screen` command when:**
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
