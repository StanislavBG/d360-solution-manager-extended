# Guided Flows - MDM in Data 360

A single-page web application providing guided flows for Master Data Management (MDM) in Data 360.

## Overview

This application implements a comprehensive guided tutorial system for integrating business entities from Informatica into Data 360. It features a modern, professional interface with collapsible navigation, step-by-step instructions, and interactive checkboxes.

## Features

- **Single-Page Application (SPA)**: All content loads dynamically without page refreshes
- **Header Navigation**: App picker, search bar, and tab navigation
- **Collapsible Left Navigation**: Expandable/collapsible sidebar with icons
- **Guided Flow Pages**: Step-by-step instructions with progress tracking
- **Interactive Step Details**: Expandable panels with checkboxes for task completion
- **Progress Tracking**: Visual status indicators (Not Started, In Progress, Completed)

## File Structure

```
/
├── index.html                          # Main HTML file
├── css/
│   ├── main.css                       # Core application styles
│   ├── header.css                     # Header component styles
│   ├── navigation.css                 # Left navigation styles
│   ├── pages.css                      # Page-specific styles
│   └── components.css                 # Reusable component styles
├── js/
│   ├── app.js                         # Main application logic
│   ├── router.js                      # Page routing system
│   ├── header.js                      # Header component logic
│   ├── navigation.js                  # Left navigation logic
│   └── pages/
│       ├── home.js                    # Home page
│       ├── solutionManager.js         # Solution Manager page
│       └── integrateBusinessEntities.js # Guided flow page
└── README.md                          # This file
```

## Getting Started

1. Open `index.html` in a modern web browser
2. No build process or dependencies required
3. All functionality works out of the box

## Usage

### Navigation

- **App Picker**: Click the 3x3 grid icon in the header to switch between apps (Sales, Service, Marketing, Commerce, Data 360)
- **Tabs**: Use the navigation tabs (Home, Solution Manager) to navigate between main sections
- **Left Navigation**: Click items in the left sidebar to navigate to different functional areas
- **Collapse Navigation**: Click the arrow button at the top of the left navigation to collapse/expand

### Guided Flow

1. Navigate to **Solution Manager** from the top navigation
2. Click on **"Integrate Business Entities from Informatica in Data360"** tile
3. Follow the step-by-step instructions:
   - Review the header instructions
   - Use the Step Summary panel to see overall progress
   - Expand step detail panels to see instructions
   - Check off completed tasks
   - Watch the status icons update automatically

### Step Details

- Click on any step detail panel header to expand/collapse
- Check off instruction items as you complete them
- Step status automatically updates (Not Started → In Progress → Completed)
- Click on step summary items to scroll to and expand the corresponding step

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technical Details

- **No Dependencies**: Pure HTML, CSS, and vanilla JavaScript
- **No Database**: All state is managed in memory
- **Responsive Design**: Adapts to different screen sizes
- **Professional Styling**: Business-appropriate color scheme and typography

## Component Specifications

### Layout Proportions
- Header: 15% of viewport height
- Left Navigation: 15% of viewport width (when expanded)
- Main Page Area: Remaining space

### Step Details Panel
- Collapsed: Height equals Top Navigation Area height (~60px)
- Expanded: 3x Top Navigation Area height (~180px)
  - Title/Headline: 1/3 of expanded height
  - Main Body: 2/3 of expanded height

## Future Enhancements

- Search bar functionality
- Backend integration
- Data persistence
- User authentication
- Additional guided flows

