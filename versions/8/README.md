# MDM in Data 360 - Guided Flows

A single-page web application implementing a guided tutorial system for Master Data Management (MDM) workflows in Data 360.

## Features

- **Single-Page Application (SPA)**: No URL changes, all navigation handled client-side
- **Three-Panel Layout**: Header, Left Navigation, and Main Content Area
- **Collapsible Navigation**: Left navigation can be collapsed to show only icons
- **App Picker**: Switch between different applications (Sales, Service, Marketing, Commerce, Data 360)
- **Guided Tutorial System**: Step-by-step instructions with progress tracking
- **Professional UI**: Business-appropriate styling and interactions

## File Structure

```
/
├── index.html          # Main HTML structure
├── css/
│   └── styles.css     # All styling
├── js/
│   └── app.js         # Application logic and state management
└── README.md          # This file
```

## Usage

Simply open `index.html` in a modern web browser. No build process or server required.

## Key Components

### Header
- **Search Bar Area**: Contains Salesforce icon, search bar (display-only), and application icons
- **Top Navigation Area**: App picker, app label, and navigation tabs

### Left Navigation
- Collapsible sidebar with 7 main sections:
  - Connect & Unify
  - Govern Data
  - Process Content
  - Query & Segment
  - Analyze & Predict
  - Act on Data
  - Build & Share

### Main Pages
- **Home**: Welcome page
- **Solution Manager**: Object home with tile list
- **Integrate Business Entities**: Guided tutorial with 8 steps
- **Placeholder Pages**: Empty state pages for left navigation items

### Guided Tutorial Features
- **Header Instructions**: Title and description (20% of page)
- **Step Summary**: Collapsible summary of all steps with status indicators (20% of page)
- **Step Details**: Expandable panels with checkboxes for tracking progress
- **Status Tracking**: Visual indicators for Not Started, In Progress, and Completed states

## Browser Support

Works in all modern browsers that support:
- Flexbox
- CSS Grid
- ES6 JavaScript
- CSS Transitions

## Implementation Notes

- No database or backend required
- All state managed in JavaScript
- Smooth transitions and animations
- Responsive design considerations
- Professional business styling

