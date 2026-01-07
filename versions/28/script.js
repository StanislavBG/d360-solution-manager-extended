// Application State
const appState = {
    currentApp: 'data-360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepSummaryExpanded: true,
    stepStates: Array(9).fill({
        expanded: false,
        status: 'not-started',
        completedSubSteps: 0,
        totalSubSteps: 0
    }),
    stepProgress: {}
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeStepDetails();
    setupEventListeners();
    calculateSubStepCounts();
});

// Initialize application
function initializeApp() {
    // Show home page by default
    showPage('home');
}

// Setup all event listeners
function setupEventListeners() {
    // App Picker
    const appPickerBtn = document.getElementById('app-picker-icon');
    const appPickerDropdown = document.getElementById('app-picker-dropdown');

    appPickerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        appPickerDropdown.classList.remove('show');
    });

    // App selection
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const app = this.dataset.app;
            selectApp(app);
        });
    });

    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.dataset.page;
            selectNavTab(page);
            showPage(page);
        });
    });

    // Left navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    navToggle.addEventListener('click', toggleLeftNav);

    // Left navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            showPage(page);
        });
    });

    // Solution tiles
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', function() {
            const targetPage = this.dataset.target;
            showPage(targetPage);
        });
    });

    // Step summary collapse
    const summaryCollapseBtn = document.getElementById('summary-collapse-btn');
    if (summaryCollapseBtn) {
        summaryCollapseBtn.addEventListener('click', toggleStepSummary);
    }

    // Summary step clicks
    document.querySelectorAll('.summary-step').forEach(step => {
        step.addEventListener('click', function() {
            const stepIndex = parseInt(this.dataset.step);
            scrollToStep(stepIndex);
            expandStep(stepIndex);
        });
    });

    // Step expand/collapse
    document.querySelectorAll('.step-detail-panel').forEach((panel, index) => {
        const expandBtn = panel.querySelector('.expand-btn');
        const header = panel.querySelector('.step-header');

        header.addEventListener('click', function(e) {
            if (!e.target.closest('.expand-btn')) {
                toggleStep(index);
            }
        });

        if (expandBtn) {
            expandBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleStep(index);
            });
        }
    });

    // Next Step buttons
    document.querySelectorAll('.next-step-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const currentStepIndex = parseInt(this.closest('.step-detail-panel').dataset.step);
            goToNextStep(currentStepIndex);
        });
    });

    // Substep checkboxes
    document.querySelectorAll('.substep-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateStepProgress();
        });
    });

    // Validate connection button
    const validateBtn = document.getElementById('validate-connection');
    if (validateBtn) {
        validateBtn.addEventListener('click', validateConnection);
    }

    // Entity checkboxes
    document.querySelectorAll('.entity-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateEntitySelection();
        });
    });

    // Resolution type radio buttons
    document.querySelectorAll('input[name="resolution-type"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updateResolutionType();
        });
    });

    // Preview buttons
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showPreviewNotification();
        });
    });

    // Action buttons with redirect
    document.querySelectorAll('.action-btn-small, .action-btn:not(#validate-connection):not(.preview-btn)').forEach(btn => {
        if (!btn.id && !btn.classList.contains('preview-btn')) {
            btn.addEventListener('click', function() {
                showRedirectNotification();
            });
        }
    });

    // Toggle switch for Identity Rules Schedule
    const toggleSwitch = document.getElementById('step6-sub4');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function() {
            updateStepProgress();
        });
    }
}

// Select app from dropdown
function selectApp(app) {
    appState.currentApp = app;

    // Update active state in dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.app === app) {
            item.classList.add('active');
        }
    });

    // Update app label
    const appLabel = document.getElementById('app-label');
    const appNames = {
        'sales': 'Sales',
        'service': 'Service',
        'marketing': 'Marketing',
        'commerce': 'Commerce',
        'data-360': 'Data 360'
    };
    appLabel.textContent = appNames[app] || 'Data 360';
}

// Select navigation tab
function selectNavTab(page) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.page === page) {
            tab.classList.add('active');
        }
    });
}

// Show specific page
function showPage(pageName) {
    appState.currentPage = pageName;

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const pageId = pageName + '-page';
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation states
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });

    // Update navigation tabs if switching to home or solution-manager
    if (pageName === 'home' || pageName === 'solution-manager') {
        selectNavTab(pageName);
    }
}

// Toggle left navigation
function toggleLeftNav() {
    const leftNav = document.getElementById('left-navigation');
    appState.leftNavExpanded = !appState.leftNavExpanded;

    if (appState.leftNavExpanded) {
        leftNav.classList.remove('collapsed');
    } else {
        leftNav.classList.add('collapsed');
    }
}

// Toggle step summary
function toggleStepSummary() {
    const stepSummary = document.getElementById('step-summary');
    appState.stepSummaryExpanded = !appState.stepSummaryExpanded;

    if (appState.stepSummaryExpanded) {
        stepSummary.classList.remove('collapsed');
    } else {
        stepSummary.classList.add('collapsed');
    }
}

// Initialize step details
function initializeStepDetails() {
    // Set total substeps for each step
    const substepCounts = [1, 1, 1, 1, 3, 1, 5, 1, 3];

    appState.stepStates = substepCounts.map(count => ({
        expanded: false,
        status: 'not-started',
        completedSubSteps: 0,
        totalSubSteps: count
    }));

    // Update UI
    updateAllStepSummaries();
}

// Calculate substep counts
function calculateSubStepCounts() {
    document.querySelectorAll('.step-detail-panel').forEach((panel, index) => {
        const checkboxes = panel.querySelectorAll('.substep-checkbox, .toggle-switch');
        const count = checkboxes.length;
        appState.stepStates[index].totalSubSteps = count;
        updateStepSummaryText(index);
    });
}

// Toggle step expansion
function toggleStep(index) {
    const panel = document.querySelectorAll('.step-detail-panel')[index];
    const isExpanded = panel.classList.contains('expanded');

    if (isExpanded) {
        panel.classList.remove('expanded');
        appState.stepStates[index].expanded = false;
    } else {
        panel.classList.add('expanded');
        appState.stepStates[index].expanded = true;
    }
}

// Expand specific step
function expandStep(index) {
    const panel = document.querySelectorAll('.step-detail-panel')[index];
    panel.classList.add('expanded');
    appState.stepStates[index].expanded = true;
}

// Scroll to step
function scrollToStep(index) {
    const panel = document.querySelectorAll('.step-detail-panel')[index];
    const pageArea = document.getElementById('page-area');

    // Calculate offset to show step header
    const offset = 100;
    const elementPosition = panel.offsetTop;
    const offsetPosition = elementPosition - offset;

    pageArea.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Go to next step
function goToNextStep(currentIndex) {
    const nextIndex = currentIndex + 1;
    const totalSteps = document.querySelectorAll('.step-detail-panel').length;

    if (nextIndex < totalSteps) {
        // Collapse current step
        const currentPanel = document.querySelectorAll('.step-detail-panel')[currentIndex];
        currentPanel.classList.remove('expanded');
        appState.stepStates[currentIndex].expanded = false;

        // Expand and scroll to next step
        expandStep(nextIndex);

        // Small delay to ensure DOM is updated before scrolling
        setTimeout(() => {
            scrollToStep(nextIndex);
        }, 100);
    } else {
        // Last step completed
        alert('Congratulations! You have completed all steps.');
    }
}

// Update step progress
function updateStepProgress() {
    document.querySelectorAll('.step-detail-panel').forEach((panel, index) => {
        const checkboxes = panel.querySelectorAll('.substep-checkbox');
        const toggles = panel.querySelectorAll('.toggle-switch');

        let completed = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) completed++;
        });
        toggles.forEach(toggle => {
            if (toggle.checked) completed++;
        });

        const total = checkboxes.length + toggles.length;

        appState.stepStates[index].completedSubSteps = completed;
        appState.stepStates[index].totalSubSteps = total;

        // Update status
        if (completed === 0) {
            appState.stepStates[index].status = 'not-started';
        } else if (completed < total) {
            appState.stepStates[index].status = 'in-progress';
        } else {
            appState.stepStates[index].status = 'completed';
        }

        updateStepSummaryText(index);
        updateStepStatusIcon(index);
    });
}

// Update step summary text
function updateStepSummaryText(index) {
    const panel = document.querySelectorAll('.step-detail-panel')[index];
    const summarySpan = panel.querySelector('.sub-steps-summary');
    const state = appState.stepStates[index];

    if (summarySpan) {
        summarySpan.textContent = `${state.completedSubSteps} out of ${state.totalSubSteps}`;
    }
}

// Update step status icon
function updateStepStatusIcon(index) {
    const summaryStep = document.querySelectorAll('.summary-step')[index];
    const statusIcon = summaryStep.querySelector('.step-status');
    const state = appState.stepStates[index];

    statusIcon.classList.remove('not-started', 'in-progress', 'completed');
    statusIcon.classList.add(state.status);

    // Update icon character
    if (state.status === 'not-started') {
        statusIcon.innerHTML = '&#9675;'; // Empty circle
    } else if (state.status === 'in-progress') {
        statusIcon.innerHTML = '&#9684;'; // Filled square (in progress)
    } else {
        statusIcon.innerHTML = '&#10003;'; // Checkmark
    }
}

// Update all step summaries
function updateAllStepSummaries() {
    document.querySelectorAll('.step-detail-panel').forEach((panel, index) => {
        updateStepSummaryText(index);
        updateStepStatusIcon(index);
    });
}

// Validate connection
function validateConnection() {
    const resultDiv = document.getElementById('validation-result');
    const connName = document.getElementById('conn-name').value;
    const tenantUrl = document.getElementById('tenant-url').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const existingConn = document.getElementById('existing-connection').value;

    // Show loading
    resultDiv.className = 'validation-result';
    resultDiv.innerHTML = '<span class="spinner"></span> Validating connection...';
    resultDiv.style.display = 'block';

    // Simulate validation
    setTimeout(() => {
        if (existingConn || (connName && tenantUrl && username && password)) {
            resultDiv.className = 'validation-result success';
            resultDiv.innerHTML = '✓ Connection validated successfully!';

            // Auto-check the substep
            const checkbox = document.getElementById('step0-sub0');
            if (checkbox && !checkbox.checked) {
                checkbox.checked = true;
                updateStepProgress();
            }
        } else {
            resultDiv.className = 'validation-result error';
            resultDiv.innerHTML = '✗ Please fill in all required fields or select an existing connection.';
        }
    }, 1500);
}

// Update entity selection
function updateEntitySelection() {
    const selectedEntities = document.querySelectorAll('.entity-checkbox:checked');
    const notification = document.getElementById('relationship-notification');

    if (selectedEntities.length > 1) {
        notification.style.display = 'block';
    } else {
        notification.style.display = 'none';
    }

    // Auto-check the substep if at least one entity is selected
    if (selectedEntities.length > 0) {
        const checkbox = document.getElementById('step1-sub0');
        if (checkbox && !checkbox.checked) {
            checkbox.checked = true;
            updateStepProgress();
        }
    }
}

// Update resolution type
function updateResolutionType() {
    const selectedType = document.querySelector('input[name="resolution-type"]:checked');

    if (selectedType) {
        const checkbox = document.getElementById('step2-sub0');
        if (checkbox && !checkbox.checked) {
            checkbox.checked = true;
            updateStepProgress();
        }
    }
}

// Show preview notification
function showPreviewNotification() {
    alert('This would open a preview window showing the data visualization. This is a demonstration interface.');
}

// Show redirect notification
function showRedirectNotification() {
    alert('This would redirect to the configuration page. This is a demonstration interface.');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + B to toggle left navigation
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleLeftNav();
    }
});

// Auto-save state to localStorage (optional feature)
function saveState() {
    localStorage.setItem('appState', JSON.stringify(appState));
}

function loadState() {
    const saved = localStorage.getItem('appState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(appState, parsed);
        } catch (e) {
            console.error('Failed to load saved state');
        }
    }
}

// Utility: Smooth scroll for page area
function smoothScrollTo(element, offset = 0) {
    const pageArea = document.getElementById('page-area');
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - offset;

    pageArea.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Export functions for debugging
window.appDebug = {
    state: appState,
    showPage,
    toggleStep,
    updateStepProgress,
    scrollToStep
};
