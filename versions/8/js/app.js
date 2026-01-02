// State Management
const state = {
    currentPage: 'home',
    leftNavCollapsed: false,
    stepSummaryCollapsed: false,
    expandedSteps: new Set(),
    stepStatus: {}, // { stepNumber: 'not-started' | 'in-progress' | 'completed' }
    currentApp: 'data360'
};

// Initialize step statuses
for (let i = 1; i <= 8; i++) {
    state.stepStatus[i] = 'not-started';
}

// DOM Elements
const leftNavigation = document.getElementById('left-navigation');
const navToggle = document.getElementById('nav-toggle');
const appPickerIcon = document.getElementById('app-picker-icon');
const appPickerDropdown = document.getElementById('app-picker-dropdown');
const appLabel = document.getElementById('app-label');
const stepSummaryToggle = document.getElementById('step-summary-toggle');
const stepSummary = document.getElementById('step-summary');
const stepSummaryContainer = document.querySelector('.step-summary-container');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeAppPicker();
    initializeLeftNavigation();
    initializeStepSummary();
    initializeStepDetails();
    initializeNavTabs();
    initializeTiles();
});

// Navigation Functions
function initializeNavigation() {
    // Left navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

function initializeNavTabs() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.getAttribute('data-page');
            navigateToPage(page);
            
            // Update active tab
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

function initializeTiles() {
    document.getElementById('integrate-business-entities-tile').addEventListener('click', () => {
        navigateToPage('integrate-business-entities');
        // Also activate Solution Manager tab if needed
        document.querySelectorAll('.nav-tab').forEach(t => {
            if (t.getAttribute('data-page') === 'solution-manager') {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
    });
}

function navigateToPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Special case for home page
    let pageId = `${pageName}-page`;
    if (pageName === 'home') {
        pageId = 'home-data-360-page';
    }
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        state.currentPage = pageName;
        
        // Scroll to top
        document.querySelector('.main-page-area').scrollTop = 0;
    }
}

// Left Navigation Toggle
function initializeLeftNavigation() {
    navToggle.addEventListener('click', () => {
        state.leftNavCollapsed = !state.leftNavCollapsed;
        if (state.leftNavCollapsed) {
            leftNavigation.classList.add('collapsed');
        } else {
            leftNavigation.classList.remove('collapsed');
        }
    });
}

// App Picker
function initializeAppPicker() {
    appPickerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!appPickerIcon.contains(e.target) && !appPickerDropdown.contains(e.target)) {
            appPickerDropdown.classList.add('hidden');
        }
    });
    
    // Handle app selection
    document.querySelectorAll('.app-option').forEach(option => {
        option.addEventListener('click', () => {
            const app = option.getAttribute('data-app');
            state.currentApp = app;
            
            // Update active state
            document.querySelectorAll('.app-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update app label (remove "-App" suffix)
            const appLabels = {
                'sales': 'Sales',
                'service': 'Service',
                'marketing': 'Marketing',
                'commerce': 'Commerce',
                'data360': 'Data 360'
            };
            appLabel.textContent = appLabels[app] || app;
            
            // Close dropdown
            appPickerDropdown.classList.add('hidden');
        });
    });
}

// Step Summary Toggle
function initializeStepSummary() {
    stepSummaryToggle.addEventListener('click', () => {
        state.stepSummaryCollapsed = !state.stepSummaryCollapsed;
        if (state.stepSummaryCollapsed) {
            stepSummaryContainer.classList.add('collapsed');
        } else {
            stepSummaryContainer.classList.remove('collapsed');
        }
    });
    
    // Step summary items click to scroll to step
    document.querySelectorAll('.step-summary-item').forEach(item => {
        item.addEventListener('click', () => {
            const stepNum = item.getAttribute('data-step');
            scrollToStep(stepNum);
        });
    });
}

// Step Details
function initializeStepDetails() {
    // All step panels start collapsed
    document.querySelectorAll('.step-details-panel').forEach(panel => {
        const stepNum = panel.getAttribute('data-step');
        state.expandedSteps.delete(stepNum);
    });
}

function toggleStepDetails(stepNum) {
    const panel = document.querySelector(`.step-details-panel[data-step="${stepNum}"]`);
    if (!panel) return;
    
    if (state.expandedSteps.has(stepNum)) {
        panel.classList.remove('expanded');
        state.expandedSteps.delete(stepNum);
    } else {
        panel.classList.add('expanded');
        state.expandedSteps.add(stepNum);
    }
}

function scrollToStep(stepNum) {
    const panel = document.querySelector(`.step-details-panel[data-step="${stepNum}"]`);
    if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Expand if collapsed
        if (!state.expandedSteps.has(stepNum)) {
            toggleStepDetails(stepNum);
        }
    }
}

// Step Status Management
function updateStepStatus(stepNum) {
    const panel = document.querySelector(`.step-details-panel[data-step="${stepNum}"]`);
    if (!panel) return;
    
    // Count checkboxes in this step
    const checkboxes = panel.querySelectorAll('input[type="checkbox"]');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const totalCount = checkboxes.length;
    
    let status;
    if (checkedCount === 0) {
        status = 'not-started';
    } else if (checkedCount === totalCount) {
        status = 'completed';
    } else {
        status = 'in-progress';
    }
    
    state.stepStatus[stepNum] = status;
    updateStepStatusIcon(stepNum, status);
}

function updateStepStatusIcon(stepNum, status) {
    const summaryItem = document.querySelector(`.step-summary-item[data-step="${stepNum}"]`);
    if (!summaryItem) return;
    
    const icon = summaryItem.querySelector('.step-status-icon');
    if (!icon) return;
    
    // Remove all status classes
    icon.classList.remove('not-started', 'in-progress', 'completed');
    icon.classList.add(status);
    
    // Update icon symbol
    switch (status) {
        case 'not-started':
            icon.textContent = '○';
            break;
        case 'in-progress':
            icon.textContent = '◐';
            break;
        case 'completed':
            icon.textContent = '✓';
            break;
    }
}

// Global functions for inline event handlers
window.toggleStepDetails = toggleStepDetails;
window.updateStepStatus = updateStepStatus;

