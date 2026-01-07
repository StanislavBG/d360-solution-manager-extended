# Data 360 - Guided Flows Application

A professional web application for managing Master Data Management (MDM) workflows in Salesforce Data 360, with a focus on integrating business entities from Informatica.

## Overview

This is a single-page application (SPA) that provides a guided, step-by-step tutorial interface for complex data integration tasks. The application simulates a Salesforce-like environment with professional styling and intuitive navigation.

## Features

### Main Application Structure

- **Main Header** (15% vertical space)
  - Search Bar Area with Salesforce logo
  - Top Navigation Area with app picker and navigation tabs

- **Left Navigation** (15% horizontal space when expanded)
  - Collapsible sidebar with icon-based navigation
  - Seven navigation items: Connect & Unify, Govern Data, Process Content, Query & Segment, Analyze & Predict, Act on Data, Build & Share

- **Page Area** (Dynamic content area)
  - Single-page application - URL never changes
  - Multiple pages rendered based on user selection
  - Scrollable content within pages

### Key Pages

1. **Home Page** - Empty state with welcome message
2. **Solution Manager** - Displays solution tiles for different workflows
3. **Integrate Business Entities Page** - Comprehensive step-by-step guide with 9 detailed steps
4. **Customer Households Page** - Work in progress placeholder

### Interactive Components

#### Solution Tiles
- Clickable cards that navigate to detailed workflow pages
- Professional hover effects
- Clear descriptions of each solution

#### Step Summary Panel
- Collapsible overview of all steps
- Progress tracking with visual indicators (Not Started, In Progress, Completed)
- Clickable steps for quick navigation
- Video tutorial placeholder

#### Step Detail Panels
- Expandable/collapsible panels for each step
- Header with title, headline, and progress counter
- Main content area with two-column layout (instructions + actions)
- Footer with documentation links and "Next Step" button
- Interactive elements: checkboxes, forms, buttons, toggles

### The 9 Steps in "Integrate Business Entities"

1. **Connect to Informatica System** - Establish connection with tenant credentials
2. **Choose Business Entity** - Select from 10 business entity types
3. **Choose Identity Resolution Type** - Direct Mapping vs Golden Key-Ring
4. **Review Mappings** - Validate data object mappings and fields
5. **Validate Connected Data** - Preview and validate data samples
6. **Set up Identity Rules** - Configure match and reconciliation rules
7. **Validate Identity Data** - Inspect identity resolution results
8. **Enable Sync to Informatica** - Configure bidirectional sync
9. **Setup Experiences** - Configure Search Before Create, Copy Field, Related List

## Technical Implementation

### Files

- `index.html` - Main HTML structure
- `styles.css` - Professional business styling
- `script.js` - Interactive functionality and state management

### Technologies

- Pure HTML5
- CSS3 with modern layout techniques (Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- No external dependencies or frameworks
- No database required

### State Management

The application maintains state in JavaScript for:
- Current app selection
- Current page
- Navigation collapse states
- Step expansion states
- Step completion progress
- Substep completion tracking

### Key JavaScript Features

- Dynamic page switching without URL changes
- Collapsible navigation
- Step expansion/collapse with smooth animations
- Progress tracking for all substeps
- Auto-validation of form inputs
- Smooth scrolling to steps
- Keyboard shortcuts (Ctrl/Cmd + B to toggle navigation)

## Usage Instructions

### Navigation

1. **App Picker** - Click the 3x3 grid icon to switch between apps (Sales, Service, Marketing, Commerce, Data 360)
2. **Top Tabs** - Click "Home" or "Solution Manager" to navigate main sections
3. **Left Navigation** - Click any item to view placeholder pages
4. **Collapse Toggle** - Click the arrow button to collapse/expand left navigation

### Working with Solutions

1. Navigate to "Solution Manager" tab
2. Click on a solution tile to open the guided workflow
3. Use the Step Summary to see all steps at a glance
4. Click on any step in the summary to jump to that step
5. Click step headers to expand/collapse detailed instructions
6. Complete checkboxes and form fields as you progress
7. Click "Next Step" to move to the next step automatically

### Progress Tracking

- **Not Started** - Empty circle (○)
- **In Progress** - Square icon (■)
- **Completed** - Checkmark (✓)

Progress updates automatically as you complete substeps within each step.

## Design Principles

### Business Professional Styling

- Clean, minimal design
- Salesforce-inspired color scheme (blues, grays, whites)
- Professional typography
- Subtle shadows and borders
- Smooth transitions and hover effects

### User Experience

- No overwhelming content - steps are digestible
- Clear visual hierarchy
- Consistent interaction patterns
- Responsive feedback for all actions
- Smooth scrolling and animations

### Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Clear focus states
- Readable font sizes
- Sufficient color contrast

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for different screen sizes
- Optimized for desktop use (minimum 1024px recommended)

## Future Enhancements

- Customer Households workflow implementation
- Functional search bar
- Real data integration
- Save/load progress to localStorage
- Export configuration
- Print-friendly step guides

## Development Notes

This application strictly follows the specifications from the PDF document:
- Only implements features explicitly described
- Maintains single-page application architecture
- No URL changes during navigation
- All pages render within the Page Area
- Professional business CSS throughout

## License

Proprietary - For demonstration purposes only
