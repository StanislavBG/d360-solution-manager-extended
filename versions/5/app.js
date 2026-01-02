// App Picker functionality
const appPicker = document.getElementById('appPicker');
const appPickerDropdown = document.getElementById('appPickerDropdown');
const appLabel = document.getElementById('appLabel');
const navigationMenu = document.getElementById('navigationMenu');

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!appPicker.contains(e.target)) {
        appPickerDropdown.classList.remove('show');
    }
});

appPicker.addEventListener('click', (e) => {
    e.stopPropagation();
    appPickerDropdown.classList.toggle('show');
});

// Handle app selection
document.querySelectorAll('.app-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const appName = option.getAttribute('data-app');
        
        // Update active state
        document.querySelectorAll('.app-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Update app label (remove "-App" suffix)
        const labelMap = {
            'sales': 'Sales',
            'service': 'Service',
            'marketing': 'Marketing',
            'commerce': 'Commerce',
            'data360': 'Data 360'
        };
        appLabel.textContent = labelMap[appName] || 'Data 360';
        
        // For now, only Data 360 has navigation tabs
        if (appName === 'data360') {
            navigationMenu.style.display = 'flex';
        } else {
            navigationMenu.style.display = 'none';
        }
        
        // Close dropdown
        appPickerDropdown.classList.remove('show');
    });
});

// Left Navigation Toggle
const leftNav = document.getElementById('leftNav');
const navToggle = document.getElementById('navToggle');
let isNavCollapsed = false;

navToggle.addEventListener('click', () => {
    isNavCollapsed = !isNavCollapsed;
    leftNav.classList.toggle('collapsed', isNavCollapsed);
});

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
    }
    
    // Update active states
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Set active tab if it exists
    const activeTab = document.querySelector(`.nav-tab[data-page="${pageId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Set active nav item if it exists
    const activeNavItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// Navigation Tabs
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const pageId = tab.getAttribute('data-page');
        showPage(pageId);
    });
});

// Left Navigation Items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const pageId = item.getAttribute('data-page');
        showPage(pageId);
    });
});

// Application Icons
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const pageId = icon.getAttribute('data-page');
        if (pageId) {
            showPage(pageId);
        }
    });
});

// Solution Manager Tile
const integrateTile = document.getElementById('integrate-business-entities-tile');
if (integrateTile) {
    integrateTile.addEventListener('click', () => {
        showPage('integrate-business-entities');
    });
}

// Step Details Expand/Collapse
document.querySelectorAll('.step-details-template').forEach(step => {
    // Initialize as collapsed
    step.classList.add('collapsed');
    
    step.addEventListener('click', (e) => {
        // Don't toggle if clicking inside step-content
        if (e.target.closest('.step-content')) {
            e.stopPropagation();
            return;
        }
        
        const isExpanded = step.classList.contains('expanded');
        
        if (isExpanded) {
            step.classList.remove('expanded');
            step.classList.add('collapsed');
        } else {
            // Collapse all other steps
            document.querySelectorAll('.step-details-template').forEach(s => {
                s.classList.remove('expanded');
                s.classList.add('collapsed');
            });
            
            step.classList.remove('collapsed');
            step.classList.add('expanded');
        }
    });
});

// Step Summary Item Click
document.querySelectorAll('.step-summary-item').forEach(item => {
    item.addEventListener('click', () => {
        const stepNumber = item.getAttribute('data-step');
        
        // Update active state
        document.querySelectorAll('.step-summary-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Expand corresponding step
        const stepDetail = document.querySelector(`.step-details-template[data-step="${stepNumber}"]`);
        if (stepDetail) {
            // Collapse all steps first
            document.querySelectorAll('.step-details-template').forEach(s => {
                s.classList.remove('expanded');
                s.classList.add('collapsed');
            });
            
            // Expand selected step
            stepDetail.classList.remove('collapsed');
            stepDetail.classList.add('expanded');
            
            // Scroll to step
            stepDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Initialize - show home page
showPage('home-data360');

