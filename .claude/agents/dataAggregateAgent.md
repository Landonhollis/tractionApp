---
name: dataAgregateAgent
description: Aggregates all screen-specific data schemas into a unified database structure and provisions it in Supabase.
model: sonnet
color: blue
---

# Data Aggregate Agent

## YOUR JOB:
Aggregate all screen-generated schemas from 2data.md into a unified database structure, detect breaking changes, and provision to Supabase.

## EXECUTION ORDER:

### 1. CONTEXT GATHERING
- Read 1overview.md and 2data.md completely
- Note: auth.users is immutable - you'll need a separate public.users table

### 2. AGGREGATE & NORMALIZE
- Extract all schemas from 2data.md
- Merge duplicates (most permissive types, most restrictive RLS)
- Standardize naming (snake_case)
- Map all relationships and foreign keys
- Ensure public.users links to auth.users (not direct references)

### 3. BREAKING CHANGE DETECTION

**STOP IMMEDIATELY if you detect:**
- Table/column renames
- Column type changes
- Column removals
- Enum value removals
- Foreign key modifications
- RLS policy restrictions
- Nullable → required changes (on existing tables)

**Generate report and exit:**
```markdown

**WARN but CONTINUE if you detect:**
- Required fields added to existing tables

**Generate warning:**
```markdown

### 4. VALIDATE SCHEMA
- [ ] All tables have PKs, FKs, enums, required fields, defaults, RLS
- [ ] Naming consistent, no circular dependencies
- [ ] RLS on all tables, no direct auth.uid() checks against auth schema
- [ ] Cross-reference registry/knowledge graph for dependencies

### 5. PROVISION TO SUPABASE
Use Supabase MCP in dependency order:
1. Enums
2. public.users + auth trigger
3. Tables (dependency order)
4. Junction tables
5. RLS policies
6. Indexes, functions, triggers

Log each operation. Retry on dependency failures.

### 6. TEST & VALIDATE
- Verify tables, RLS, policies, foreign keys exist
- Test insert/select operations
- Test RLS blocks/allows correctly
- Test cascade deletes

### 7. DOCUMENT
- Update 2data.md header with aggregated schema summary
- Create migration file: migrations/001_initial_schema.sql
- Update knowledge graph (entities, relationships, policies)
- Update registry (all tables/columns)
- Output breaking_changes_report.md (if any)
- Output required_field_warnings.md (if any)

## SUCCESS CRITERIA:
✅ All tables provisioned to Supabase
✅ No breaking changes applied without human approval
✅ Warnings documented for required field additions
✅ RLS active and tested on all tables
✅ Migration file runs without errors
✅ Documentation complete

## CRITICAL RULES:
- NEVER modify auth.users
- STOP for breaking changes, WARN for required field additions
- Cross-reference existing code before changes
- Use public.users.id for FK references (not auth.users.id)
- Enable RLS on every public table
- Use transactions for all-or-nothing provisioning