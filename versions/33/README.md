# Data 360 - Guided Flows Application

A professional web application implementing guided flows for MDM (Master Data Management) integration with Informatica in Salesforce Data 360.

## Project Overview

This is a single-page web application built with HTML, CSS, and JavaScript (no database required) that provides step-by-step guided tutorials for complex multi-step tasks related to business entity integration.

## Features

### Main Application Structure

1. **Main Header (15% vertical space)**
   - Search Bar Area with Salesforce logo, search functionality, and application icons
   - Top Navigation Area with app picker, app label, and navigation tabs

2. **Left Navigation (15% horizontal space when expanded)**
   - Collapsible sidebar with navigation items
   - Gray icon set for each menu item
   - Links to different Data 360 sections:
     - Connect & Unify
     - Govern Data
     - Process Content
     - Query & Segment
     - Analyze & Predict
     - Act on Data
     - Build & Share

3. **Page Area (Dynamic content display)**
   - No scrollbar on main app page
   - All scrolling happens within the Page Area
   - Content changes based on user navigation

### Solution Manager

The Solution Manager provides access to guided tutorial flows:

#### Available Tiles:
1. **Integrate Business Entities from Informatica in Data 360**
   - Two implementation versions:
     - **DF Version** - Modern data flow approach with 9 steps
     - **262 Version** - Technical integration approach with 9 steps

2. **Integrate and expand CRM Households in Data 360** (Work in Progress)

### Guided Flow Features

Each guided flow includes:

- **Header Instructions** - Overview of the tutorial with title and description
- **Step Summary** - Collapsible overview showing all steps with completion status
  - Status icons: ⭕ Not Started, 🔄 In Progress, ✅ Completed
  - Video tutorial placeholder
  - Quick navigation to specific steps

- **Step Details Panels** - Individual collapsible panels for each step
  - Title, headline, and sub-steps summary
  - Detailed instructions and form inputs
  - Action buttons for external navigation
  - Progress tracking with checkboxes
  - "Next Step" navigation button
  - Links to documentation and tutorials

## DF Version Steps

1. **Connect to Informatica System** - Establish trusted connection
2. **Choose Business Entity** - Select entities to integrate (Customer, Organization, Product, etc.)
3. **Choose Identity Resolution Type** - Direct Mapping vs Golden Key-Ring
4. **Review Mappings** - Validate data objects and field mappings
5. **Validate Connected Data** - Preview integrated data
6. **Set up Identity Rules** - Configure match rules for identity resolution
7. **Validate Identity Data** - Review identity resolution results
8. **Enable sync to Informatica** - Configure synchronization
9. **Setup Experiences** - Configure user experiences (Search Before Create, Copy Field, Related List)

## 262 Version Steps

1. **Create Ingestion End-Point** - Setup API endpoint
2. **Create Schema on D360-End-Point** - Register business entity schemas
3. **Create Business Entity to Normalized-Lake** - Install extensibility packages
4. **Publish Day0** - Initial data load
5. **Publish Day1** - Enable change data capture
6. **Bring Your Own MDM** - External MDM integration
7. **Data-360-MDM Datakit** - Install mappings and definitions
8. **Search Before Create** - Install Informatica component
9. **CRM Enrichment** - Configure profile components and field enrichment

## Technical Implementation

### Files:
- `index.html` - Main application structure
- `styles.css` - Professional business styling with Salesforce design patterns
- `app.js` - Application logic, state management, and interactive features

### Key Features:
- Single-page application (no URL changes)
- Collapsible navigation and step panels
- Real-time progress tracking
- Form validations and user inputs
- Dynamic content loading
- Responsive design
- Professional Salesforce-style UI

## Usage

1. Open `index.html` in a web browser
2. Navigate using the top navigation tabs or left sidebar
3. Click "Solution Manager" to view available guided flows
4. Select a tile to start a guided tutorial
5. Expand steps, fill in information, and track progress
6. Use "Next Step" buttons to navigate through the flow

## Browser Compatibility

Compatible with modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Design Principles

- Business professional CSS styling
- Minimal borders between sections
- Page Area utilizes full available space
- No scrollbars on main app page
- Smooth transitions and interactions
- Clean, minimalistic design to avoid overwhelming users
