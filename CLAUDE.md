# CLAUDE.md - Data 360 Solution Manager

## Project Overview

This is **Data 360 Solution Manager** - a web application providing guided workflows for Master Data Management (MDM) integration with Informatica in Salesforce Data 360. The application simulates a Salesforce-like environment with professional styling and step-by-step tutorials for complex data integration tasks.

## Repository Structure

```
d360-solution-manager-extended/
├── index.html           # Version picker - entry point for browsing all versions
├── .gitignore           # Ignored files (logs, .DS_Store, node_modules, .env)
├── CLAUDE.md            # This file
└── versions/            # Versioned implementations (1-36, skipping 25)
    ├── 1/               # Early version
    ├── ...
    └── 36/              # Latest version (current)
```

### Version Directory Structures

Versions have varying file structures:

**Single-file versions (latest pattern - v36):**
```
versions/36/
├── index.html                              # Complete app (HTML + CSS + JS inline)
└── Guided Flows - MDM in Data 360 - 36.pdf # Reference documentation
```

**Separate files pattern (most versions):**
```
versions/N/
├── index.html
├── script.js (or app.js)
├── styles.css
└── Guided Flows - MDM in Data 360 - N.pdf  # Some versions only
```

**Modular pattern (v7, v8):**
```
versions/7/
├── index.html
├── README.md
├── IMPLEMENTATION_PLAN.md
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── router.js
│   ├── navigation.js
│   ├── header.js
│   └── pages/
│       ├── home.js
│       ├── solutionManager.js
│       └── integrateBusinessEntities.js
└── Guided Flows - MDM in Data 360 - 07.pdf
```

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, transitions, animations
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
- **No database** - Client-side state only
- **No build tools** - Pure static files, open directly in browser

## Architecture

### Single-Page Application (SPA)

- URL never changes during navigation
- Pages render dynamically in the Page Area
- State managed in JavaScript object
- All scrolling contained within Page Area

### Application Layout (Latest Version)

```
┌─────────────────────────────────────────────────────────┐
│ Main Header (15vh)                                      │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Search Bar Area (60% of header)                     │ │
│ │ [Logo] [Search...] [Icons]                          │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ Top Navigation Area (40% of header)                 │ │
│ │ [App Picker] [App Label] [Home | Solution Manager]  │ │
│ └─────────────────────────────────────────────────────┘ │
├──────────┬──────────────────────────────────────────────┤
│ Left Nav │ Page Area                                    │
│ (15vw)   │ (Remaining space)                            │
│          │                                              │
│ [Menu]   │ Content rendered based on current page:      │
│ [Items]  │ - Home: Empty welcome state                  │
│ [...]    │ - Solution Manager: Solution tiles           │
│          │ - Solution pages: Step-by-step guides        │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### State Management Pattern

```javascript
const state = {
    currentApp: 'Data-360',        // Active app from picker
    currentPage: 'home',           // Current page: 'home', 'solution-manager', 'solution'
    currentSolution: null,         // Active solution: '262', 'DF', 'CH', or null
    stepProgress: {                // Progress tracking per solution
        '262': { 0: 'completed', 1: 'in-progress' },
        'DF': { 0: 'in-progress' }
    }
};
```

## Main Features

### Solution Manager

Provides access to guided tutorial flows:

1. **Integrate Business Entities (262 Version)** - Technical integration approach
   - Create Ingestion End-Point
   - Create Schema on D360-End-Point
   - Business Entity to Normalized-Lake
   - Publish Day 0 & Day 1
   - BYO MDM (Bring Your Own MDM)

2. **Integrate Business Entities (DF Version)** - Data Flow approach
   - Connect to Informatica System
   - Choose Business Entity
   - Choose Identity Resolution Type
   - Review Mappings
   - Validate Connected Data
   - Set up Identity Rules
   - Enable Sync to Informatica
   - Setup Experiences

3. **Customer Households** - Work in Progress placeholder

### Guided Flow Features

- **Step Summary Panel** - Collapsible overview with progress indicators
- **Step Detail Panels** - Expandable panels with instructions
- **Progress Tracking** - Visual status (Not Started, In Progress, Completed)
- **Form Components** - Text inputs, checkboxes, radio buttons, toggles
- **Navigation** - Auto-advance, smooth scrolling to steps

## Code Conventions

### CSS Class Naming

```css
/* State classes */
.active    /* Currently selected/active element */
.expanded  /* Expanded collapsible panel */
.collapsed /* Collapsed navigation/panel */
.hidden    /* Element not visible */
.completed /* Step marked as done */
.in-progress /* Step currently being worked on */
.show      /* Visible dropdown/notification */
```

### JavaScript Patterns

```javascript
// Function naming: verb + noun
function navigateToPage(page) { }
function renderSolution(solutionId) { }
function expandStep(solutionId, stepIndex) { }
function toggleLeftNav() { }
function updateStepStatus(solutionId, stepIndex, status) { }

// Event handlers: inline onclick for simplicity
onclick="navigateToPage('home')"
onclick="expandStep('262', 0)"
```

### HTML Structure Patterns

```html
<!-- Page containers use id and class -->
<div id="solution-manager-page" class="solution-manager-page hidden">

<!-- Step components follow consistent structure -->
<div class="step-detail" id="step-262-0">
    <div class="step-detail-header">...</div>
    <div class="step-detail-body">
        <div class="step-detail-content">...</div>
        <div class="step-detail-footer">...</div>
    </div>
</div>
```

## Development Workflow

### Creating a New Version

1. Copy the latest version directory:
   ```bash
   cp -r versions/36 versions/37
   ```

2. Update the PDF filename if included:
   ```bash
   mv "versions/37/Guided Flows - MDM in Data 360 - 36.pdf" \
      "versions/37/Guided Flows - MDM in Data 360 - 37.pdf"
   ```

3. Make changes to `index.html` (and other files if applicable)

4. Test by opening in browser:
   ```bash
   # Open the version picker
   open index.html
   # Or open specific version directly
   open versions/37/index.html
   ```

### Publishing a Version

```bash
git add versions/37/
git commit -m "Publish version 37"
git push origin <branch-name>
```

### Version Picker Auto-Detection

The root `index.html` automatically detects available versions by checking for `versions/{N}/index.html` files (N from 1-100). No manual registration required.

## Testing

No automated tests. Manual testing process:

1. **Navigation Testing**
   - App picker dropdown works
   - Top nav tabs switch pages
   - Left nav collapse/expand works
   - Solution tiles navigate to flows

2. **Guided Flow Testing**
   - Step summary shows all steps
   - Steps expand/collapse on click
   - Progress indicators update correctly
   - "Next Step" advances to next step
   - Form inputs are functional
   - Toggle switches work

3. **Cross-Browser Testing**
   - Chrome (primary)
   - Firefox
   - Safari
   - Edge

## Common Tasks

### Adding a New Solution Tile

In the Solution Manager page section, add a new tile:

```html
<div class="solution-tile" onclick="navigateToSolution('NEW_ID')">
    <div class="tile-title">New Solution Title</div>
    <div class="tile-description">Description of the new solution.</div>
</div>
```

Add corresponding page container and implement in the solutions object.

### Adding Steps to a Solution

In the `solutions` object, add step definitions:

```javascript
const solutions = {
    'NEW_ID': [
        { title: 'Step 1', type: 'form', fields: ['Field1', 'Field2'] },
        { title: 'Step 2', type: 'radio', options: [...] },
        // ...
    ]
};
```

### Modifying Styling

Look for styles in the `<style>` section of `index.html`. Key style sections:

- **Layout**: `#main-app-page`, `#content-container`, `#page-area`
- **Navigation**: `.nav-tab`, `.nav-item`, `#left-navigation`
- **Solution Pages**: `.solution-tile`, `.step-detail`, `.step-summary`
- **Form Components**: `.form-input`, `.checkbox-item`, `.radio-item`, `.toggle-switch`

## Design System

### Colors (Salesforce-inspired)

```css
/* Primary */
--blue: #0070D2;
--blue-dark: #005FB2;

/* Status */
--green: #2E844A;      /* Completed */

/* Neutrals */
--gray-dark: #181818;  /* Primary text */
--gray-medium: #706E6B; /* Secondary text */
--gray-light: #DDDBDA; /* Borders */
--gray-bg: #F3F3F3;    /* Background */
--white: #FFFFFF;
```

### Component Heights

- Main Header: `15vh` (Search Bar 60%, Top Nav 40%)
- Content Area: `85vh`
- Left Navigation: `15vw` (expanded), `60px` (collapsed)

## Important Notes

1. **No External Dependencies** - Everything is vanilla HTML/CSS/JS
2. **No URL Routing** - SPA without URL changes
3. **No Persistence** - Progress resets on page refresh
4. **Self-Contained Versions** - Each version is independent
5. **PDF Documentation** - Some versions include reference PDFs

## File References

- Latest version: `versions/36/index.html`
- Version picker: `index.html`
- Example README: `versions/33/README.md`

## Git Conventions

- Commit message format: `Publish version N`
- Linear version history
- Each version is a complete snapshot
