# Data 360 - MDM Application

A web application for Master Data Management (MDM) in Data 360, implementing a guided flow system for integrating business entities from Informatica.

## Features

- **Single Page Application**: All content loads dynamically without URL changes
- **Three Main Areas**:
  - Header: Contains search bar and top navigation
  - Left Navigation: Collapsible sidebar with menu items
  - Main Page Area: Dynamic content area that changes based on user selections

## Structure

### Header
- **Search Bar Area**: Contains Salesforce icon, search bar (display only), and application icons
- **Top Navigation Area**: Contains app picker, app label, and navigation tabs (Home, Solution Manager)

### Left Navigation
- Collapsible sidebar with icons and labels
- Menu items:
  - Connect & Unify
  - Govern Data
  - Process Content
  - Query & Segment
  - Analyze & Predict
  - Act on Data
  - Build & Share

### Main Pages

1. **Home Page**: Welcome page (empty state)
2. **Solution Manager**: Displays tiles for different solution templates
   - Integrate Business Entities from Informatica in Data360 tile
3. **Integrate Business Entities Page**: Step-by-step guided tutorial with:
   - Header Instructions
   - Step Summary Panel (collapsible)
   - 9 Step Detail Panels (expandable/collapsible)
   - Checkboxes for tracking progress
   - Dynamic status updates (Not Started, In Progress, Completed)

## Usage

1. Open `index.html` in a web browser
2. Navigate using:
   - Top navigation tabs (Home, Solution Manager)
   - Left navigation menu items
   - Click on tiles in Solution Manager to open detailed pages
3. In the Integrate Business Entities page:
   - Click step items in the summary to jump to that step
   - Expand/collapse step panels to view details
   - Check off substeps to track progress
   - Step status icons update automatically based on completion

## Files

- `index.html`: Main HTML structure
- `styles.css`: Business professional styling
- `script.js`: Navigation and interactivity logic

## Requirements Met

✅ Single page application with no URL changes
✅ Header, Left Navigation, and Main Page Area layout
✅ Collapsible left navigation
✅ Solution Manager with tile list
✅ Integrate Business Entities page with step-by-step guide
✅ Step Summary panel with collapsible functionality
✅ Step Details panels with expand/collapse
✅ Checkbox tracking for substeps
✅ Dynamic status updates
✅ Business professional CSS styling

