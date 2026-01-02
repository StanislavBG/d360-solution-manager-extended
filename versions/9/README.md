# Data 360 - MDM Application

A single-page web application implementing the guided flows for MDM in Data 360 as described in the project specification.

## Features

### Main Structure
- **Header** (15% vertical): Contains search bar area and top navigation
- **Left Navigation** (15% horizontal, collapsible): Navigation menu with icons
- **Main Page Area**: Dynamic content area that loads different pages

### Header Components
- **Search Bar Area** (60% of header):
  - Salesforce cloud icon (blue)
  - Search bar (display only, non-functional)
  - Application icons (right-aligned)
  
- **Top Navigation Area** (40% of header):
  - App Picker icon (9-dot grid) with dropdown menu
  - App Label (changes based on selection)
  - Navigation tabs (Home, Solution Manager for Data 360)

### Pages
1. **Home Data 360**: Placeholder page
2. **Solution Manager**: Object home with tile list
   - "Integrate Business Entities from Informatica in Data360" tile
3. **Integrate Business Entities Page**: Guided tutorial with:
   - Header Instructions (20% top)
   - Step Summary panel (20%, collapsible)
   - 7 Step Details panels (collapsible with checkboxes)
4. **Left Navigation Pages**: Placeholder pages for:
   - Connect & Unify
   - Govern Data
   - Process Content
   - Query & Segment
   - Analyze & Predict
   - Act on Data
   - Build & Share

## Usage

1. Open `index.html` in a web browser
2. Click on navigation items to load different pages
3. Toggle the left navigation collapse/expand button
4. Click the app picker icon to switch between applications
5. Click on the "Integrate Business Entities" tile to view the guided tutorial
6. Expand/collapse step details panels
7. Check off items in step instructions to track progress
8. Step status icons update automatically (○ Not Started, ◐ In Progress, ✓ Completed)

## Files

- `index.html`: Main HTML structure
- `styles.css`: Business professional styling
- `script.js`: JavaScript functionality for navigation and interactions

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

