# Data 360 - MDM Integration Application

A web application for integrating Master Data Management (MDM) entities from Informatica into Salesforce Data 360.

## Features

- **Single Page Application**: All navigation happens within a single page without URL changes
- **Three Main Areas**:
  - Header with search bar and top navigation
  - Left navigation sidebar (collapsible)
  - Main content area that dynamically loads different pages

- **Solution Manager**: Browse and select solution templates
- **Guided Tutorial**: Step-by-step guide for integrating business entities from Informatica
- **Professional UI**: Business-appropriate styling with smooth interactions

## File Structure

```
.
├── index.html      # Main HTML structure
├── styles.css      # Professional business styling
├── script.js       # Application logic and page management
└── README.md       # This file
```

## How to Use

1. Open `index.html` in a web browser
2. Navigate using:
   - **Top Navigation Tabs**: Switch between Home and Solution Manager
   - **Left Navigation**: Access different functional areas
   - **Solution Manager**: Click on tiles to start guided flows

## Key Pages

### Home Page
Default landing page with welcome message

### Solution Manager
- Displays available solution templates
- Click on "Integrate Business Entities from Informatica in Data360" to start the guided flow

### Integrate Business Entities Page
A comprehensive step-by-step guide with:
- **Header Instructions**: Overview of the integration process
- **Step Summary**: Collapsible panel showing all steps and their completion status
- **Step Details Panels**: Expandable panels for each step with:
  - Forms for data input
  - Checkboxes for task completion
  - Action buttons for navigation
  - Documentation links
  - Next Step button for smooth progression

## Features Implemented

✅ Header with Salesforce icon, search bar, and application icons
✅ Top navigation with app picker and tabs
✅ Collapsible left navigation with icons
✅ Solution Manager with tile-based navigation
✅ Step-by-step guided tutorial
✅ Collapsible step panels
✅ Progress tracking with status icons
✅ Form inputs and validation
✅ Professional business styling
✅ Smooth scrolling and transitions

## Browser Compatibility

Works best in modern browsers (Chrome, Firefox, Safari, Edge)

## Notes

- This is a front-end only application (no database)
- All state is managed in JavaScript
- Search bar is display-only (not functional)
- Application icons are placeholders

