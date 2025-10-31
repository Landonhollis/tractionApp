# Data History Screen
[complete]
## Complexity Level
**[ ] Simple** - Standard CRUD, basic UI, Supabase + RN Reusables only
**[X] Complex** - Check this if: external APIs, payments, real-time features, custom packages likely needed, or non-trivial business logic

*Note: Requires charting library for time-series data visualization with custom styling and interactive filtering. Research React Native charting solutions (recharts, Victory Native, or similar).*

---

## Purpose (Context)
Provides users with historical trend visualization for all tracked metrics. Users can analyze performance over time, identify patterns, and understand whether metrics are consistently within acceptable ranges across different timeframes.

---

## Routing (INVARIANT)
**Incoming:**
- From Menu via "Data History" selection

**Outgoing:**
- To [any other menu screen] via menu navigation

**Parameters passed:** None

---

## Data (PATTERN + Flexible)

### Must Exist
These entities/columns must exist for this screen to function:
- Table: `data_history` with columns: `id, metric_id, current_status, min, max, timestamp` (or `created_at`)
- Reference needed: Metric names/descriptions from `metrics` table for graph titles

### Probably Needed (Research Required)
- Metric metadata: May need to join with `metrics` table to display metric `description` or `title` as graph headers
- Date range indexing: Performance optimization for filtering by date ranges
- Unit of measurement: May need to display units (e.g., "$", "%", "units") on y-axis
- Sorting/grouping: Define how metrics are ordered in the scrollable list (alphabetical, by department, by frequency of updates)

**Note:** AI should extend schema as needed to support functionality, following Supabase best practices.

---

## Screen Layout (PATTERN)

### Global Components (Use These)
- Standard app header/navigation (if applicable)

### Layout Structure
Single full-screen scrollable container displaying stacked graph sections. Each section represents one unique metric with its own time-series chart and filter buttons.

**Visual hierarchy:**
- Full-screen vertical scroll
- Each graph section: Header (metric name) → Filter buttons → Chart → Divider
- Repeat for all unique metric_ids

### Responsive Behavior (COMMAND → Implementation Flexible)
**Must respond to:** Screen width changes - graphs scale to fill available width while maintaining readability
**How:** AI decides - ensure charts remain legible and buttons accessible

### Screen States
**Known states:**
- loading (fetching all data_history records)
- populated (graphs rendered)
- empty (no data history exists)
- error (failed to fetch data)

**Unknown states:** Handle edge cases like metrics with single data point, missing min/max values, etc.

---

## Components (SPECIFIC)

### data_history_graphs
**What component should accomplish**
The user scrolls through time-series graphs for every metric in the system. For each metric, they can toggle between viewing all historical data, last 6 months, or last month. They instantly see whether each data point was in range (green) or out of range (red), with the current status line standing out prominently against faint min/max reference lines.

**Data:** 
- Displays: `current_status` (prominent), `min` and `max` (subtle), `timestamp`
- Needs: All records from `data_history` table, grouped by `metric_id`, joined with `metrics` table for metric names

**Position:** Full screen, vertically scrollable list of graph sections

**Actions:**
- User scrolls vertically → reveals graphs for other metrics
- User taps "All Time" button on a graph → displays all data points for that metric
- User taps "6-mo" button → filters graph to show only data from last 6 months
- User taps "1-mo" button → filters graph to show only data from last month
- Filter state is per-graph (each metric maintains its own selected timeframe)

**States:**
- Known: loading, populated, empty (no data for specific metric), timeframe selected (All Time/6-mo/1-mo)
- Unknown: Handle data anomalies, incomplete records

**Backend needs:** 
- Query `data_history` grouped by `metric_id`
- Date filtering logic for 1-month and 6-month ranges
- May need to fetch metric metadata for graph titles

---

## User Flow (NARRATIVE)
1. User arrives from menu by selecting "Data History"
2. User sees loading state while historical data fetches
3. User sees stacked graphs, one per unique metric
4. User scrolls vertically to view different metrics' histories
5. User taps timeframe buttons to zoom in/out on specific metric trends
6. User visually identifies patterns: consistent performance (green dots), problem periods (red dots), trends over time
7. User navigates away via menu to other screens

---

## Notes & Considerations
- **Charting library:** Research React Native-compatible charting solutions that support:
  - Time-series line charts
  - Multiple data series per chart (current_status, min, max)
  - Custom dot styling (size and color based on conditions)
  - Date range filtering
  - Performant rendering for potentially large datasets
- **Data point styling logic:**
  - If `current_status > max` OR `current_status < min` → large red dot
  - If `min <= current_status <= max` → large green dot
  - `current_status` line should be accent color (prominent)
  - `min` and `max` lines should be subtle/faded
- **Date filtering:**
  - "All Time": No date filter
  - "6-mo": `timestamp >= (today - 6 months)`
  - "1-mo": `timestamp >= (today - 1 month)`
- **Performance:** Consider pagination or lazy loading if metrics have thousands of data points
- **Empty states:** Handle metrics with no data history gracefully
- **X-axis formatting:** Display dates in readable format, scale appropriately to timeframe
- **Y-axis scaling:** Auto-scale based on data range, or use min/max as bounds
- **Graph titles:** Display metric name/description at top of each graph section

---

## UI/UX Bias (FOR FUTURE DESIGN AGENT ONLY)
**Instruction to coding agent:** Copy the text below into a comment at the bottom of the .tsx file. Do not use this information for styling the current implementation.
```
<!-- UI/UX BIAS FOR FUTURE DESIGN PASS
Minimalistic and data-focused. Simple line graphs without complex decorative elements. Accent color for current_status line draws attention to actual performance. Red/green dot color coding provides instant status feedback. Subtle min/max lines serve as reference without competing for attention. Button styling clearly indicates selected timeframe state. Overall aesthetic: clean, analytical, focused on trend identification rather than visual flair.
-->
```