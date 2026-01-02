# Implementation Plan: Guided Flows - MDM in Data 360

## Overview
This document outlines the detailed implementation plan for building a single-page web application that provides guided flows for Master Data Management (MDM) in Data 360. The application will be built using HTML, CSS, and JavaScript with no database requirements.

---

## Phase 1: Project Setup and Core Structure

### 1.1 File Structure
```
/
├── index.html              # Main entry point
├── css/
│   ├── main.css           # Main stylesheet
│   ├── header.css         # Header component styles
│   ├── navigation.css     # Left navigation styles
│   ├── pages.css          # Page-specific styles
│   └── components.css     # Reusable component styles
├── js/
│   ├── app.js             # Main application logic
│   ├── router.js          # Page routing/navigation logic
│   ├── header.js          # Header component logic
│   ├── navigation.js      # Left navigation logic
│   └── pages/
│       ├── home.js        # Home page logic
│       ├── solutionManager.js
│       └── integrateBusinessEntities.js
└── assets/
    ├── icons/             # SVG icons
    └── images/            # Image assets
```

### 1.2 Core HTML Structure
- Create `index.html` with semantic HTML5 structure
- Implement the three main areas: `$Header`, `$Left-Navigation`, `$Main-Page-Area`
- Ensure no scrollbar on `$Main-App-Page` (only on content within `$Main-Page-Area`)

### 1.3 CSS Framework Setup
- Implement business professional CSS styling
- Use CSS Grid or Flexbox for layout management
- Set up CSS variables for consistent theming
- Ensure responsive design principles

---

## Phase 2: Header Component Implementation

### 2.1 Search Bar Area (60% of Header vertical space)
**Components:**
- `$Salesforce-Icon`: Blue cloud icon (left-aligned)
- `$Search-Bar`: Centered search input (display only, non-functional)
- `$Application-Icons`: Right-aligned icon set

**Implementation Tasks:**
- Create icon component for Salesforce logo
- Design and implement search bar with placeholder text
- Create application icon set (SVG icons)
- Implement click handlers for application icons to load pages

### 2.2 Top Navigation Area (40% of Header vertical space)
**Components:**
- `$App-Picker-Icon`: 3x3 grid icon (nine dots)
- `$App-Label`: Dynamic label based on selected app
- `$Navigation-Menu-Elements`: Tab navigation

**Implementation Tasks:**
- Create app picker dropdown menu with:
  - Sales
  - Service
  - Marketing
  - Commerce
  - Data 360 (default)
- Implement tab navigation for Data 360 App:
  - Home tab → loads `$Home-Data-360-Page`
  - Solution Manager tab → loads `$Solution-Manager-Page`
- Add click handlers for app selection and tab navigation
- Update `$App-Label` dynamically based on selection

---

## Phase 3: Left Navigation Component

### 3.1 Navigation Structure
**Menu Items (with icons):**
- Connect & Unify (`$Connect-Unify`)
- Govern Data (`$Govern-Data`)
- Process Content (`$Process-Content`)
- Query & Segment (`$Query-Segment`)
- Analyze & Predict (`$Analyze-Predict`)
- Act on Data (`$Act-on-Data`)
- Build & Share (`$Build-Share`)

### 3.2 Collapsible Functionality
**Implementation Tasks:**
- Create expand/collapse toggle button
- Default state: expanded (shows icons + labels)
- Collapsed state: shows icons only
- Each menu item should:
  - Fill full horizontal width when expanded
  - Display icon before label
  - Load corresponding placeholder page in `$Main-Page-Area`
- Implement smooth transition animations

---

## Phase 4: Main Page Area - Basic Pages

### 4.1 Home Data 360 Page (`$Home-Data-360-Page`)
- Create empty placeholder page
- Display empty state message
- Ensure proper styling and spacing

### 4.2 Solution Manager Page (`$Solution-Manager-Page`)
- Create empty page initially
- Add object home structure for tile list
- Implement single tile: `$Integrate-Business-Entities-Tile`
  - Title: "Integrate Business Entities from Informatica in Data360"
  - Click handler to load `$Integrate-Business-Entities-Page`

### 4.3 Placeholder Pages for Left Navigation
Create empty state pages for:
- Connect & Unify
- Govern Data
- Process Content
- Query & Segment
- Analyze & Predict
- Act on Data
- Build & Share

---

## Phase 5: Integrate Business Entities Page

### 5.1 Page Layout Structure
**Vertical Distribution:**
- `$Header-Instructions`: 20% of page height
- `$Step-Summary`: 20% of page height
- `$Step-Details-Template` panels: Remaining 60% (with scroll)

### 5.2 Header Instructions Component
**Content:**
- Text: "Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360"

**Implementation:**
- Create styled header section
- Ensure proper typography and spacing
- Position at top 20% of page

### 5.3 Step Summary Panel
**Features:**
- Collapsible vertically (collapses toward `$Header-Instructions`)
- Default: expanded
- Displays 7 steps with completion status icons:
  - Not Started
  - In-Progress
  - Completed
- Each step corresponds to one `$Step-Details-Template` panel
- Dynamic status updates based on user actions

**Implementation Tasks:**
- Create collapsible panel component
- Implement step list with status icons
- Add click handlers to scroll to corresponding step details
- Create status update mechanism

### 5.4 Step Details Template Component
**Structure:**
- Collapsed state:
  - Always visible: `$title` and `$headline`
  - Height: Same as `$Top-Navigation-Area`
- Expanded state:
  - Height: 3x `$Top-Navigation-Area`
  - Top 1/3: Title and headline
  - Bottom 2/3: `$main-body` content

**Main Body Content:**
- List of instruction items
- Each item contains:
  - `$instructions` text (left-aligned)
  - `$checkbox` (right-aligned)
- Checkboxes update step status in `$Step-Summary`

**Implementation Tasks:**
- Create expand/collapse animation
- Implement smooth height transitions
- Create instruction list with checkboxes
- Connect checkbox state to step summary status
- Ensure proper alignment (text left, checkbox right)

---

## Phase 6: Step Details Implementation

### 6.1 Step 1: Connect to Informatica System Panel
**Details:**
- Title: "Connect to Informatica System"
- Headline: "Establish trusted connection between D360 and Informatica tenants"
- Main Body:
  - Single instruction: "Configure details for the Informatica tenant, so that a trusted connection between them can be provided. The important items are "User-Name" and "Password""

### 6.2 Step 2: Choose Business Entity
- Create panel structure
- Add placeholder instructions (to be detailed later)

### 6.3 Step 3: Review and Extend Mappings
- Create panel structure
- Add placeholder instructions

### 6.4 Step 4: Validate Connected Data
- Create panel structure
- Add placeholder instructions

### 6.5 Step 5: Set up Identity Rules
- Create panel structure
- Add placeholder instructions

### 6.6 Step 6: Validate Identity Data
- Create panel structure
- Add placeholder instructions

### 6.7 Step 7: Enable Sync to Informatica
- Create panel structure
- Add placeholder instructions

### 6.8 Step 8: Setup Experiences
**Sub-experiences:**
- "Search Before Create" - prevent duplicate records
- "Copy field" - enrich operational records
- "Related List" - showcase related information
- Create panel structure with these sub-items

---

## Phase 7: State Management and Routing

### 7.1 Application State
**Track:**
- Current active page
- Current active app (default: Data 360)
- Current active tab
- Left navigation expanded/collapsed state
- Step summary expanded/collapsed state
- Step completion statuses
- Individual step detail expanded/collapsed states
- Checkbox states for each instruction

### 7.2 Routing Logic
**Implementation:**
- Create router module to handle page navigation
- Map navigation items to page components
- Implement page loading without URL changes (SPA behavior)
- Ensure smooth transitions between pages

---

## Phase 8: Styling and UX Polish

### 8.1 Business Professional CSS
**Design Principles:**
- Clean, modern interface
- Consistent spacing and typography
- Professional color scheme
- Subtle shadows and borders
- Smooth animations and transitions

### 8.2 Responsive Considerations
- Ensure proper layout on different screen sizes
- Maintain proportions as specified
- Test collapsible states on various viewports

### 8.3 Accessibility
- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus states for interactive elements

---

## Phase 9: Integration and Testing

### 9.1 Component Integration
- Ensure all components work together seamlessly
- Test navigation flows
- Verify state persistence during navigation

### 9.2 Functionality Testing
**Test Cases:**
- Header navigation (app picker, tabs)
- Left navigation expand/collapse
- Page loading in Main Page Area
- Step summary expand/collapse
- Step details expand/collapse
- Checkbox interactions
- Status updates in step summary
- Scroll behavior in Main Page Area

### 9.3 Edge Cases
- Rapid clicking on navigation items
- Multiple step details expanded simultaneously
- State consistency during navigation

---

## Phase 10: Final Polish and Documentation

### 10.1 Code Organization
- Ensure clean, maintainable code structure
- Add code comments where necessary
- Organize CSS with clear naming conventions

### 10.2 Performance Optimization
- Optimize CSS for smooth animations
- Minimize JavaScript execution time
- Ensure efficient DOM manipulation

### 10.3 Documentation
- Create README with setup instructions
- Document component structure
- Note any assumptions or limitations

---

## Technical Specifications

### Layout Specifications
- **Header**: 15% of total vertical height
  - Search Bar Area: 60% of header height
  - Top Navigation Area: 40% of header height
- **Left Navigation**: 15% of horizontal width (when expanded)
- **Main Page Area**: Remaining space (85% horizontal when left nav expanded)

### Component Dimensions
- **Step Details Collapsed**: Height = `$Top-Navigation-Area` height
- **Step Details Expanded**: Height = 3x `$Top-Navigation-Area` height
  - Title/Headline: 1/3 of expanded height
  - Main Body: 2/3 of expanded height

### Status Icons
- Not Started: Empty circle or similar
- In-Progress: Half-filled or spinner icon
- Completed: Checkmark or filled circle

---

## Implementation Order (Recommended)

1. **Week 1**: Phase 1-2 (Setup, Header)
2. **Week 2**: Phase 3-4 (Navigation, Basic Pages)
3. **Week 3**: Phase 5-6 (Integrate Business Entities Page, Step Details)
4. **Week 4**: Phase 7-8 (State Management, Styling)
5. **Week 5**: Phase 9-10 (Testing, Polish)

---

## Dependencies
- Modern browser with ES6+ support
- No external libraries required (vanilla JavaScript)
- SVG support for icons

---

## Assumptions
- All icons will be SVG format
- No backend API integration needed
- All content is static (no dynamic data loading)
- Browser compatibility: Modern browsers (Chrome, Firefox, Safari, Edge)

---

## Future Enhancements (Out of Scope)
- Search bar functionality
- Dynamic content loading
- User authentication
- Data persistence
- Backend integration

