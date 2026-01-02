# Implementation Plan: MDM in Data 360 - Guided Flows

## Overview
A single-page web application (SPA) with HTML, CSS, and JavaScript. No database needed. Business professional CSS styling.

## Application Structure

### Main Layout ($Main-App-Page)
- Three main functional areas always visible:
  1. **$Header** - 15% of vertical space, full horizontal width
  2. **$Left-Navigation** - 15% horizontal when expanded, collapsible
  3. **$Main-Page-Area** - Remaining space, dynamically loads content
- No scroll bar on main app page (only on content within $Main-Page-Area)
- Minimal borders between areas
- $Left-Navigation can be collapsed to give more space to $Main-Page-Area

### Header Structure
**$Header** (15% vertical) contains two sub-components:

#### $Search-Bar-Area (60% of Header vertical space)
- Three elements:
  1. **$Salesforce-Icon** - Blue cloud icon, left-aligned
  2. **$Search-Bar** - Centered, display-only (non-functional)
  3. **$Application-Icons** - Small icons, right-aligned

#### $Top-Navigation-Area (40% of Header vertical space)
- Three elements (left-aligned):
  1. **$App-Picker-Icon** - 3x3 grid icon (Google style), dropdown menu
  2. **$App-Label** - Changes based on app selection
  3. **$Navigation-Menu-Elements** - Tabs for navigation

**App Picker Options:**
- Sales (default: "Sales")
- Service (default: "Service")
- Marketing (default: "Marketing")
- Commerce (default: "Commerce")
- Data 360 (default: "Data 360") - DEFAULT SELECTED

**Navigation Tabs for Data 360 App:**
- Home → loads $Home-Data-360-Page
- Solution Manager → loads $Solution-Manager-Page

### Left Navigation ($Left-Navigation)
- Collapsible, expanded by default
- When expanded: shows icons + labels (15% horizontal)
- When collapsed: shows only icons
- Items:
  1. Connect & Unify → placeholder page
  2. Govern Data → placeholder page
  3. Process Content → placeholder page
  4. Query & Segment → placeholder page
  5. Analyze & Predict → placeholder page
  6. Act on Data → placeholder page
  7. Build & Share → placeholder page

### Pages

#### $Home-Data-360-Page
- Placeholder page showing empty state

#### $Solution-Manager-Page
- Object home page (tile list)
- One tile: **$Integrate-Business-Entities-Tile**
  - Title: "Integrate Business Entities from Informatica in Data360"
  - Clicking loads $Integrate-Business-Entities-Page

#### $Integrate-Business-Entities-Page
**Structure:**
- **$Header-Instructions** (20% of page vertical)
  - Title: "Integrate Business Entities from Informatica in Data360"
  - Description: "Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360"
  
- **$Step-Summary** (20% of page vertical)
  - Collapsible vertically
  - Shows 7 steps with status icons:
    - Not Started
    - In-Progress
    - Completed
  - Each step corresponds to a $Step-Details panel
  - Status updates dynamically based on user actions

- **$Step-Details-Template** panels (7 total)
  - Initially collapsed
  - When collapsed: height = $Top-Navigation-Area height
  - When expanded: height = 3x $Top-Navigation-Area height
  - Always shows: $title and $headline
  - Expanded area ($main-body) contains:
    - List of checkboxes with instructions
    - Checkbox left-aligned, instruction text right-aligned to checkbox

**7 Steps:**
1. **$Connect-to-Informatica-System-Panel**
   - Title: "Connect to Informatica System"
   - Headline: "Establish trusted connection between D360 and Informatica tenants"
   - Main-Body: One checkbox item - "Configure details for the Informatica tenant, so that a trusted connection between them can be provided. The important items are "User-Name" and "Password""

2. **$Choose-Business-Entity** (details not provided, use template)

3. **$Review-and-Extend-Mappings** (details not provided, use template)

4. **$Validate-Connected-data** (details not provided, use template)

5. **$Set-up-Identity-Rules** (details not provided, use template)

6. **$Validate-Identity-Data** (details not provided, use template)

7. **$Enable-sync-to-Informatica** (details not provided, use template)

8. **$Setup-Experiences** (details not provided, use template)
   - Mentions: "Search Before Create", "Copy field", "Related List"

## Technical Implementation Details

### HTML Structure
- Single index.html file
- Semantic HTML5 elements
- Data attributes for state management

### CSS Requirements
- Business professional styling
- Responsive layout using flexbox/grid
- Smooth transitions for collapsing/expanding
- Minimal borders
- Professional color scheme

### JavaScript Functionality
- Single-page application routing (no URL changes)
- State management for:
  - Current page
  - Left navigation collapsed/expanded
  - Step summary collapsed/expanded
  - Step details expanded/collapsed
  - Step completion status
  - App selection
  - Tab selection
- Event handlers for:
  - Navigation clicks
  - Collapse/expand toggles
  - Checkbox interactions
  - App picker dropdown

### File Structure
```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── assets/
    └── icons/ (if needed)
```

## Implementation Steps

1. **HTML Structure**
   - Create main layout with Header, Left Navigation, Main Page Area
   - Add all page templates (hidden initially)
   - Add all navigation elements

2. **CSS Styling**
   - Layout styles (flexbox/grid)
   - Component styles
   - Responsive design
   - Professional color scheme
   - Transitions and animations

3. **JavaScript Core**
   - State management
   - Page routing/navigation
   - Collapse/expand functionality
   - Checkbox state tracking
   - Step status updates

4. **Component Implementation**
   - Header components
   - Left Navigation
   - All placeholder pages
   - Solution Manager page
   - Integrate Business Entities page with all 7 steps

5. **Testing & Refinement**
   - Test all navigation
   - Test all interactions
   - Verify layout requirements
   - Ensure smooth transitions

