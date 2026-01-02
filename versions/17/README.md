# Data 360 - MDM Guided Flows

A web application implementing the guided tutorial flow for integrating Business Entities from Informatica in Data360.

## Features

- **Single Page Application**: All content loads dynamically without URL changes
- **Three Main Areas**:
  - Header (15% vertical space) with Search Bar and Top Navigation
  - Left Navigation (15% horizontal, collapsible)
  - Main Page Area (dynamic content)

## Structure

- `index.html` - Main HTML structure
- `styles.css` - Business professional styling
- `script.js` - All interactivity and navigation logic

## Usage

1. Open `index.html` in a web browser
2. Navigate using:
   - **Top Navigation Tabs**: Home, Solution Manager
   - **Left Navigation**: Connect & Unify, Govern Data, Process Content, etc.
   - **Solution Manager Tile**: Click "Integrate Business Entities from Informatica in Data360"

## Key Features Implemented

### Header
- Salesforce cloud icon
- Search bar (display only)
- Application icons (Notifications, Settings, User)
- App picker (9-dot menu) with dropdown
- Navigation tabs (Home, Solution Manager)

### Left Navigation
- Collapsible menu (expanded by default)
- Icons for each menu item
- Gray hue icons
- Shows only icons when collapsed

### Main Pages
- **Home**: Welcome page
- **Solution Manager**: Tile-based interface
- **Integrate Business Entities**: Guided tutorial with 8 steps
  - Header Instructions (20% of page)
  - Step Summary (20% of page, collapsible)
  - Step Details panels (collapsible, scrollable)

### Step Details Features
- Collapsible panels
- Checkbox tracking for sub-steps
- Status indicators (Not Started, In Progress, Completed)
- Next Step button with smooth scrolling
- Documentation links
- Form inputs for connection setup
- Data preview tables
- Action buttons for navigation

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Notes

- No database required - all state is managed in JavaScript
- Font Awesome icons used for UI elements
- Responsive design with professional business styling
- Smooth transitions and animations

