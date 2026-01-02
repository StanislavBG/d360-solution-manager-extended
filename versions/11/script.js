// Navigation state
let currentPage = 'home';
let leftNavCollapsed = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Setup app picker
    setupAppPicker();
    
    // Setup navigation tabs
    setupNavigationTabs();
    
    // Setup left navigation
    setupLeftNavigation();
    
    // Setup tile click handlers
    setupTileHandlers();
    
    // Initialize step panels as collapsed
    initializeStepPanels();
}

// App Picker functionality
function setupAppPicker() {
    const appPickerIcon = document.getElementById('appPickerIcon');
    const appLabel = document.getElementById('appLabel');
    const appOptions = document.querySelectorAll('.app-option');
    
    appOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const appName = this.getAttribute('data-app');
            
            // Update active state
            appOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update app label
            if (appName === 'Data-360') {
                appLabel.textContent = 'Data 360';
            } else {
                appLabel.textContent = appName;
            }
            
            // Hide dropdown
            document.getElementById('appPickerDropdown').style.display = 'none';
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        document.getElementById('appPickerDropdown').style.display = 'none';
    });
}

// Navigation tabs functionality
function setupNavigationTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Update active state
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show the corresponding page
            showPage(page);
        });
    });
}

// Left Navigation functionality
function setupLeftNavigation() {
    const navToggle = document.getElementById('navToggle');
    const leftNav = document.getElementById('leftNavigation');
    
    navToggle.addEventListener('click', function() {
        leftNavCollapsed = !leftNavCollapsed;
        leftNav.classList.toggle('collapsed', leftNavCollapsed);
    });
    
    // Setup nav item clicks
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
}

// Show specific page
function showPage(pageId) {
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show the requested page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
        currentPage = pageId;
    }
}

// Tile click handlers
function setupTileHandlers() {
    const integrateTile = document.getElementById('integrate-business-entities-tile');
    if (integrateTile) {
        integrateTile.addEventListener('click', function() {
            showPage('integrate-business-entities');
        });
    }
}

// Initialize step panels as collapsed
function initializeStepPanels() {
    const stepPanels = document.querySelectorAll('.step-details-panel');
    stepPanels.forEach(panel => {
        panel.classList.add('collapsed');
    });
}

// Toggle step panel
function toggleStepPanel(headerElement) {
    const panel = headerElement.closest('.step-details-panel');
    const isExpanded = panel.classList.contains('expanded');
    
    if (isExpanded) {
        panel.classList.remove('expanded');
        panel.classList.add('collapsed');
    } else {
        panel.classList.remove('collapsed');
        panel.classList.add('expanded');
    }
}

// Update step status based on checkbox completion
function updateStepStatus(stepNumber) {
    const stepPanel = document.querySelector(`.step-details-panel[data-step="${stepNumber}"]`);
    if (!stepPanel) return;
    
    const checkboxes = stepPanel.querySelectorAll('.substep-checkbox');
    const checkedBoxes = stepPanel.querySelectorAll('.substep-checkbox:checked');
    
    const stepItem = document.querySelector(`.step-item[data-step="${stepNumber}"]`);
    const stepIcon = stepItem ? stepItem.querySelector('.step-icon') : null;
    
    if (checkboxes.length === 0) return;
    
    if (checkedBoxes.length === 0) {
        // Not started
        if (stepIcon) {
            stepIcon.setAttribute('data-status', 'not-started');
            stepIcon.className = 'step-icon fas fa-circle';
        }
    } else if (checkedBoxes.length === checkboxes.length) {
        // Completed
        if (stepIcon) {
            stepIcon.setAttribute('data-status', 'completed');
            stepIcon.className = 'step-icon fas fa-check-circle';
        }
    } else {
        // In progress
        if (stepIcon) {
            stepIcon.setAttribute('data-status', 'in-progress');
            stepIcon.className = 'step-icon fas fa-clock';
        }
    }
}

// Step Summary toggle
document.addEventListener('DOMContentLoaded', function() {
    const stepSummaryToggle = document.getElementById('stepSummaryToggle');
    const stepSummary = document.getElementById('stepSummary');
    
    if (stepSummaryToggle && stepSummary) {
        stepSummaryToggle.addEventListener('click', function() {
            stepSummary.classList.toggle('collapsed');
        });
    }
    
    // Make step items clickable to scroll to corresponding panel
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        item.addEventListener('click', function() {
            const stepNumber = this.getAttribute('data-step');
            const stepPanel = document.querySelector(`.step-details-panel[data-step="${stepNumber}"]`);
            
            if (stepPanel) {
                // Expand the panel if collapsed
                if (stepPanel.classList.contains('collapsed')) {
                    stepPanel.classList.remove('collapsed');
                    stepPanel.classList.add('expanded');
                }
                
                // Scroll to the panel
                stepPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Prevent default link behavior for documentation links
document.addEventListener('DOMContentLoaded', function() {
    const docLinks = document.querySelectorAll('.doc-link, .tutorial-link');
    docLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real application, these would navigate to actual documentation
            console.log('Documentation link clicked:', this.href || this.textContent);
        });
    });
});

