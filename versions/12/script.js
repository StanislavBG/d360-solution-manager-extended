// Navigation and Page Management
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize navigation
    setupNavigation();
    setupAppPicker();
    setupLeftNavigation();
    setupStepSummary();
    
    // Set initial page
    showPage('home-data-360-page');
}

// Navigation Setup
function setupNavigation() {
    // Top navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding page
            if (pageId === 'home') {
                showPage('home-data-360-page');
            } else if (pageId === 'solution-manager') {
                showPage('solution-manager-page');
            }
        });
    });
    
    // Left navigation items
    const leftNavItems = document.querySelectorAll('.left-navigation .nav-item');
    leftNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            showPage(pageId + '-page');
            
            // Update active state
            leftNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Solution Manager Tile
    const integrateTile = document.getElementById('integrate-business-entities-tile');
    if (integrateTile) {
        integrateTile.addEventListener('click', function() {
            showPage('integrate-business-entities-page');
            
            // Update navigation to show we're in solution manager
            navTabs.forEach(t => t.classList.remove('active'));
            document.querySelector('.nav-tab[data-page="solution-manager"]').classList.add('active');
        });
    }
}

// Show Page Function
function showPage(pageId) {
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// App Picker Setup
function setupAppPicker() {
    const appPicker = document.getElementById('app-picker');
    const appPickerDropdown = document.getElementById('app-picker-dropdown');
    const appLabel = document.getElementById('app-label');
    
    if (appPicker && appPickerDropdown) {
        appPicker.addEventListener('click', function(e) {
            e.stopPropagation();
            appPickerDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!appPicker.contains(e.target)) {
                appPickerDropdown.classList.remove('show');
            }
        });
        
        // Handle app selection
        const appOptions = document.querySelectorAll('.app-option');
        appOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const appName = this.getAttribute('data-app');
                
                // Update active state
                appOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update app label
                if (appLabel) {
                    appLabel.textContent = appName.replace('-', ' ');
                }
                
                // Close dropdown
                appPickerDropdown.classList.remove('show');
            });
        });
    }
}

// Left Navigation Toggle
function setupLeftNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const leftNav = document.getElementById('left-navigation');
    
    if (navToggle && leftNav) {
        navToggle.addEventListener('click', function() {
            leftNav.classList.toggle('collapsed');
            leftNav.classList.toggle('expanded');
        });
    }
}

// Step Summary Panel Toggle
function setupStepSummary() {
    const stepSummaryCollapse = document.getElementById('step-summary-collapse');
    const stepSummaryPanel = document.getElementById('step-summary-panel');
    const stepSummaryContent = document.getElementById('step-summary-content');
    
    if (stepSummaryCollapse && stepSummaryPanel && stepSummaryContent) {
        stepSummaryCollapse.addEventListener('click', function() {
            stepSummaryPanel.classList.toggle('collapsed');
            stepSummaryContent.classList.toggle('collapsed');
            
            const icon = this.querySelector('i');
            if (stepSummaryPanel.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    }
    
    // Step summary item click to scroll to step
    const stepSummaryItems = document.querySelectorAll('.step-summary-item');
    stepSummaryItems.forEach(item => {
        item.addEventListener('click', function() {
            const stepIndex = this.getAttribute('data-step');
            const stepPanel = document.querySelector(`.step-details-panel[data-step="${stepIndex}"]`);
            
            if (stepPanel) {
                // Expand the step panel if collapsed
                if (!stepPanel.classList.contains('expanded')) {
                    toggleStepPanel(stepPanel.querySelector('.step-details-header'));
                }
                
                // Scroll to the step panel
                stepPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Toggle Step Panel
function toggleStepPanel(headerElement) {
    const panel = headerElement.closest('.step-details-panel');
    if (panel) {
        panel.classList.toggle('expanded');
        panel.classList.toggle('collapsed');
    }
}

// Update Step Status
function updateStepStatus(stepIndex) {
    const stepPanel = document.querySelector(`.step-details-panel[data-step="${stepIndex}"]`);
    if (!stepPanel) return;
    
    // Get all checkboxes in this step
    const checkboxes = stepPanel.querySelectorAll('input[type="checkbox"]');
    const selects = stepPanel.querySelectorAll('select');
    
    let allCompleted = true;
    let anyInProgress = false;
    
    // Check checkboxes
    checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            allCompleted = false;
        } else {
            anyInProgress = true;
        }
    });
    
    // Check selects (for step 1 - Choose Business Entity)
    selects.forEach(select => {
        if (select.value === '') {
            allCompleted = false;
        } else {
            anyInProgress = true;
        }
    });
    
    // Update step icon in summary
    const stepSummaryItem = document.querySelector(`.step-summary-item[data-step="${stepIndex}"]`);
    if (stepSummaryItem) {
        const stepIcon = stepSummaryItem.querySelector('.step-icon');
        if (stepIcon) {
            if (allCompleted && (checkboxes.length > 0 || selects.length > 0)) {
                stepIcon.setAttribute('data-status', 'completed');
                stepIcon.className = 'step-icon fas fa-check-circle';
            } else if (anyInProgress) {
                stepIcon.setAttribute('data-status', 'in-progress');
                stepIcon.className = 'step-icon fas fa-circle';
            } else {
                stepIcon.setAttribute('data-status', 'not-started');
                stepIcon.className = 'step-icon fas fa-circle';
            }
        }
    }
}

// Initialize step statuses on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check all steps and update their status
    for (let i = 0; i <= 8; i++) {
        updateStepStatus(i);
    }
    
    // Add change listener to business entity select
    const businessEntitySelect = document.getElementById('business-entity-select');
    if (businessEntitySelect) {
        businessEntitySelect.addEventListener('change', function() {
            updateStepStatus(1);
        });
    }
});

// Make functions globally available for inline event handlers
window.toggleStepPanel = toggleStepPanel;
window.updateStepStatus = updateStepStatus;

