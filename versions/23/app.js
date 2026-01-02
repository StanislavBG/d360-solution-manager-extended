// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepSummaryExpanded: true,
    stepStates: {
        1: { completed: 0, total: 1, status: 'not-started' },
        2: { completed: 0, total: 1, status: 'not-started' },
        3: { completed: 0, total: 1, status: 'not-started' },
        4: { completed: 0, total: 3, status: 'not-started' },
        5: { completed: 0, total: 1, status: 'not-started' },
        6: { completed: 0, total: 5, status: 'not-started' },
        7: { completed: 0, total: 1, status: 'not-started' },
        8: { completed: 0, total: 3, status: 'not-started' }
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    showPage('home');
});

// Initialize Event Listeners
function initializeEventListeners() {
    // App Picker
    const appPickerIcon = document.getElementById('app-picker-icon');
    const appDropdown = document.getElementById('app-dropdown');

    appPickerIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        appDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!appPickerIcon.contains(e.target) && !appDropdown.contains(e.target)) {
            appDropdown.classList.add('hidden');
        }
    });

    // App selection
    const appItems = document.querySelectorAll('.dropdown-item');
    appItems.forEach(item => {
        item.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            appState.currentApp = appName;
            document.getElementById('app-label').textContent = appName;
            appDropdown.classList.add('hidden');
        });
    });

    // Navigation Tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');

            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show page
            showPage(page);
        });
    });

    // Left Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const leftNav = document.getElementById('left-navigation');

    navToggle.addEventListener('click', function() {
        leftNav.classList.toggle('expanded');
        leftNav.classList.toggle('collapsed');
        appState.leftNavExpanded = !appState.leftNavExpanded;
    });

    // Left Navigation Items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');

            // Update active item
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Show page
            showPage(page);
        });
    });

    // Solution Manager Tile
    const integrateTile = document.getElementById('integrate-business-entities-tile');
    if (integrateTile) {
        integrateTile.addEventListener('click', function() {
            showPage('integrate-business-entities');
        });
    }

    // Step Summary Toggle
    const summaryToggle = document.getElementById('summary-toggle');
    const stepSummary = document.getElementById('step-summary');

    if (summaryToggle && stepSummary) {
        summaryToggle.addEventListener('click', function() {
            stepSummary.classList.toggle('expanded');
            stepSummary.classList.toggle('collapsed');
            appState.stepSummaryExpanded = !appState.stepSummaryExpanded;
        });
    }

    // Summary Step Clicks
    const summarySteps = document.querySelectorAll('.summary-step');
    summarySteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNum = parseInt(this.getAttribute('data-step'));
            scrollToStep(stepNum);
            toggleStep(stepNum, true);
        });
    });
}

// Show Page
function showPage(pageName) {
    appState.currentPage = pageName;

    // Hide all pages
    const allPages = document.querySelectorAll('.page-content');
    allPages.forEach(page => page.classList.remove('active'));

    // Show selected page
    let pageId;
    switch(pageName) {
        case 'home':
            pageId = 'home-page';
            break;
        case 'solution-manager':
            pageId = 'solution-manager-page';
            break;
        case 'integrate-business-entities':
            pageId = 'integrate-business-entities-page';
            break;
        case 'connect-unify':
            pageId = 'connect-unify-page';
            break;
        case 'govern-data':
            pageId = 'govern-data-page';
            break;
        case 'process-content':
            pageId = 'process-content-page';
            break;
        case 'query-segment':
            pageId = 'query-segment-page';
            break;
        case 'analyze-predict':
            pageId = 'analyze-predict-page';
            break;
        case 'act-on-data':
            pageId = 'act-on-data-page';
            break;
        case 'build-share':
            pageId = 'build-share-page';
            break;
        default:
            pageId = 'home-page';
    }

    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
}

// Toggle Step Detail Panel
function toggleStep(stepNum, forceOpen = false) {
    const stepDetail = document.querySelector(`.step-detail[data-step="${stepNum}"]`);
    if (stepDetail) {
        if (forceOpen) {
            stepDetail.classList.remove('collapsed');
        } else {
            stepDetail.classList.toggle('collapsed');
        }
    }
}

// Scroll to Step
function scrollToStep(stepNum) {
    const stepDetail = document.querySelector(`.step-detail[data-step="${stepNum}"]`);
    if (stepDetail) {
        const pageArea = document.getElementById('page-area');
        const offsetTop = stepDetail.offsetTop - 100; // Account for some spacing
        pageArea.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Next Step
function nextStep(currentStep) {
    const nextStepNum = currentStep + 1;

    // Close current step
    toggleStep(currentStep);

    // Open and scroll to next step
    if (nextStepNum <= 8) {
        setTimeout(() => {
            scrollToStep(nextStepNum);
            toggleStep(nextStepNum, true);
        }, 300);
    }
}

// Validate Connection (Step 1)
function validateConnection(stepNum) {
    const validationResult = document.getElementById(`validation-${stepNum}`);
    const connName = document.getElementById('conn-name').value;
    const tenantUrl = document.getElementById('tenant-url').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Show loading state
    validationResult.className = 'validation-result loading';
    validationResult.innerHTML = '<div class="spinner"></div><span>Validating connection...</span>';
    validationResult.style.display = 'flex';

    // Simulate validation
    setTimeout(() => {
        if (connName && tenantUrl && username && password) {
            validationResult.className = 'validation-result success';
            validationResult.innerHTML = '✓ Connection validated successfully';
            updateStepProgress(stepNum, true);
        } else {
            validationResult.className = 'validation-result';
            validationResult.style.display = 'none';
            alert('Please fill in all connection details');
        }
    }, 1500);
}

// Update Entity Selection (Step 2)
function updateEntitySelection(stepNum) {
    const checkboxes = document.querySelectorAll('input[name="entity"]:checked');
    const notification = document.getElementById('relationship-notification');

    // Show notification if multiple entities selected
    if (checkboxes.length > 1) {
        notification.classList.remove('hidden');
    } else {
        notification.classList.add('hidden');
    }

    // Mark step complete if at least one entity selected
    if (checkboxes.length > 0) {
        updateStepProgress(stepNum, true);
    } else {
        updateStepProgress(stepNum, false);
    }
}

// Show Redirect Notification
function showRedirectNotification() {
    alert('This would redirect to the configuration page in a full implementation.');
}

// Update Step Progress
function updateStepProgress(stepNum, isComplete = null) {
    const stepDetail = document.querySelector(`.step-detail[data-step="${stepNum}"]`);
    const stepBody = stepDetail.querySelector('.step-body');
    const checkboxes = stepBody.querySelectorAll('input[type="checkbox"]:checked');

    const state = appState.stepStates[stepNum];

    if (isComplete !== null) {
        // Manual completion for single-checkbox steps
        state.completed = isComplete ? state.total : 0;
    } else {
        // Count checked checkboxes
        state.completed = checkboxes.length;
    }

    // Update sub-steps summary
    const subStepsSummary = stepDetail.querySelector('.sub-steps-summary');
    if (subStepsSummary) {
        subStepsSummary.textContent = `${state.completed} out of ${state.total}`;
    }

    // Determine status
    if (state.completed === 0) {
        state.status = 'not-started';
    } else if (state.completed < state.total) {
        state.status = 'in-progress';
    } else {
        state.status = 'completed';
    }

    // Update summary step status icon
    updateSummaryStepStatus(stepNum, state.status);
}

// Update Summary Step Status
function updateSummaryStepStatus(stepNum, status) {
    const summaryStep = document.querySelector(`.summary-step[data-step="${stepNum}"]`);
    if (!summaryStep) return;

    const statusIcon = summaryStep.querySelector('.status-icon');

    // Remove all status classes
    statusIcon.classList.remove('not-started', 'in-progress', 'completed');

    // Add current status class
    statusIcon.classList.add(status);

    // Update icon SVG based on status
    if (status === 'completed') {
        statusIcon.innerHTML = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>';
    } else if (status === 'in-progress') {
        statusIcon.innerHTML = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" opacity="0.5"/><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="2" stroke-dasharray="31.4 31.4" stroke-dashoffset="15.7"/>';
    } else {
        statusIcon.innerHTML = '<circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="2"/>';
    }
}

// Global functions for inline event handlers
window.toggleStep = toggleStep;
window.nextStep = nextStep;
window.validateConnection = validateConnection;
window.updateEntitySelection = updateEntitySelection;
window.showRedirectNotification = showRedirectNotification;
window.updateStepProgress = updateStepProgress;
