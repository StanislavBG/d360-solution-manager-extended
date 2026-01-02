# Data 360 - MDM Application

A web application for Master Data Management (MDM) in Data 360, implementing a guided flow for integrating business entities from Informatica.

## Features

- **Single Page Application (SPA)**: All content loads dynamically without URL changes
- **Three Main Areas**:
  - Header: Contains search bar and top navigation
  - Left Navigation: Collapsible sidebar with main navigation items
  - Main Page Area: Dynamic content area that changes based on user selections

## Structure

### Header Components
- **Search Bar Area**: Salesforce icon, search bar (display only), and application icons
- **Top Navigation Area**: App picker, app label, and navigation tabs (Home, Solution Manager)

### Left Navigation
Collapsible navigation with the following items:
- Connect & Unify
- Govern Data
- Process Content
- Query & Segment
- Analyze & Predict
- Act on Data
- Build & Share

### Main Pages

1. **Home Data 360 Page**: Welcome page with empty state
2. **Solution Manager**: Object home displaying solution tiles
3. **Integrate Business Entities Page**: Step-by-step guided tutorial with:
   - Header instructions
   - Collapsible step summary panel
   - 9 detailed step panels with checkboxes and validation criteria

## Usage

1. Open `index.html` in a web browser
2. Navigate using:
   - Top navigation tabs (Home, Solution Manager)
   - Left navigation items
   - Solution tiles in Solution Manager
3. Use the collapsible controls to:
   - Collapse/expand the left navigation
   - Collapse/expand the step summary panel
   - Expand/collapse individual step detail panels
4. Complete steps by:
   - Checking off checklist items
   - Selecting options (e.g., Business Entity)
   - Step status automatically updates (Not Started → In Progress → Completed)

## Files

- `index.html`: Main HTML structure
- `styles.css`: Professional business styling
- `script.js`: Navigation and interactivity logic

## Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Font Awesome icons via CDN)

## Notes

- No database required - all functionality is client-side
- Search bar is display-only (non-functional as specified)
- All pages are placeholders except for the Integrate Business Entities guided flow

