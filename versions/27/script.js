// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepStates: {},
    stepProgress: {}
};

// Initialize step states for all 9 steps
for (let i = 0; i < 9; i++) {
    appState.stepStates[i] = {
        status: 'not-started',
        expanded: false,
        substeps: {}
    };
}

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupAppPicker();
    setupNavigation();
    setupLeftNavigation();
    setupTiles();
    setupStepPanels();
    setupStepSummary();
    setupConnectionValidation();
    setupEntityPicker();
    setupIROptions();
    setupSubStepCheckboxes();
    setupIdentityScheduleToggle();

    // Set default page
    showPage('home');
}

// ==================== APP PICKER ====================
function setupAppPicker() {
    const appPickerIcon = document.getElementById('app-picker-icon');
    const appPickerDropdown = document.getElementById('app-picker-dropdown');
    const appLabel = document.getElementById('app-label');

    appPickerIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        appPickerDropdown.classList.remove('show');
    });

    // Handle app selection
    const appOptions = document.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedApp = this.getAttribute('data-app');
            appState.currentApp = selectedApp;
            appLabel.textContent = selectedApp;

            // Update active state
            appOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ==================== TOP NAVIGATION ====================
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');

            // Update active state
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding page
            showPage(page);
        });
    });
}

// ==================== LEFT NAVIGATION ====================
function setupLeftNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const leftNav = document.getElementById('left-navigation');
    const navItems = document.querySelectorAll('#left-navigation .nav-item');

    // Toggle collapse
    navToggle.addEventListener('click', function() {
        leftNav.classList.toggle('collapsed');
        appState.leftNavExpanded = !leftNav.classList.contains('collapsed');
    });

    // Handle nav item clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');

            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding page
            showPage(page);
        });
    });
}

// ==================== PAGE SWITCHING ====================
function showPage(pageName) {
    appState.currentPage = pageName;

    // Hide all pages
    const allPages = document.querySelectorAll('.page-content');
    allPages.forEach(page => page.classList.remove('active'));

    // Show the selected page
    let pageId = '';
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
        case 'customer-households':
            pageId = 'customer-households-page';
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
    }

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// ==================== TILES ====================
function setupTiles() {
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            showPage(target);

            // Update navigation tabs
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => tab.classList.remove('active'));
        });
    });
}

// ==================== STEP SUMMARY ====================
function setupStepSummary() {
    const collapseBtn = document.getElementById('summary-collapse-btn');
    const summaryContent = document.getElementById('summary-content');

    if (collapseBtn) {
        collapseBtn.addEventListener('click', function() {
            summaryContent.classList.toggle('collapsed');
            this.classList.toggle('collapsed');
        });
    }

    // Handle step item clicks
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        item.addEventListener('click', function() {
            const stepIndex = parseInt(this.getAttribute('data-step'));
            scrollToAndExpandStep(stepIndex);
        });
    });
}

function scrollToAndExpandStep(stepIndex) {
    const stepPanel = document.querySelector(`.step-panel[data-step-index="${stepIndex}"]`);
    if (stepPanel) {
        // Collapse all other panels
        document.querySelectorAll('.step-panel').forEach(panel => {
            panel.classList.remove('expanded');
            const expandBtn = panel.querySelector('.expand-btn');
            if (expandBtn) expandBtn.classList.remove('expanded');
        });

        // Expand the target panel
        stepPanel.classList.add('expanded');
        const expandBtn = stepPanel.querySelector('.expand-btn');
        if (expandBtn) expandBtn.classList.add('expanded');

        // Scroll to the panel
        stepPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Update step state
        if (appState.stepStates[stepIndex].status === 'not-started') {
            updateStepStatus(stepIndex, 'in-progress');
        }
    }
}

// ==================== STEP PANELS ====================
function setupStepPanels() {
    const stepHeaders = document.querySelectorAll('.step-header');

    stepHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const stepIndex = parseInt(this.getAttribute('data-step-index'));
            const stepPanel = this.closest('.step-panel');
            const expandBtn = this.querySelector('.expand-btn');

            // Toggle expanded state
            stepPanel.classList.toggle('expanded');
            expandBtn.classList.toggle('expanded');

            // Update step status if not started
            if (appState.stepStates[stepIndex].status === 'not-started') {
                updateStepStatus(stepIndex, 'in-progress');
            }
        });
    });

    // Setup Next Step buttons
    const nextStepBtns = document.querySelectorAll('.next-step-btn');
    nextStepBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-current'));
            const nextStep = currentStep + 1;

            if (nextStep < 9) {
                scrollToAndExpandStep(nextStep);
            }
        });
    });

    // Setup action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        if (!btn.classList.contains('validate-btn') && !btn.classList.contains('preview-btn')) {
            btn.addEventListener('click', function() {
                alert('This button would navigate to a configuration page.');
            });
        }
    });

    // Setup preview buttons
    const previewBtns = document.querySelectorAll('.preview-btn');
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Redirecting to preview page...');
        });
    });
}

// ==================== CONNECTION VALIDATION ====================
function setupConnectionValidation() {
    const validateBtn = document.getElementById('validate-connection');
    const validationResult = document.getElementById('validation-result');

    if (validateBtn) {
        validateBtn.addEventListener('click', function() {
            const connName = document.getElementById('new-conn-name').value;
            const tenantUrl = document.getElementById('tenant-url').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!connName || !tenantUrl || !username || !password) {
                validationResult.textContent = 'Please fill in all fields.';
                validationResult.className = 'validation-result';
                validationResult.style.display = 'block';
                validationResult.style.backgroundColor = '#ffebee';
                validationResult.style.color = '#c62828';
                validationResult.style.border = '1px solid #ef5350';
                return;
            }

            // Show loading
            validationResult.textContent = 'Validating connection...';
            validationResult.className = 'validation-result loading';

            // Simulate validation
            setTimeout(() => {
                validationResult.textContent = '✓ Connection validated successfully!';
                validationResult.className = 'validation-result success';

                // Mark substep as complete
                const checkbox = document.querySelector('.sub-step-checkbox[data-step="0"][data-substep="0"]');
                if (checkbox) {
                    checkbox.checked = true;
                    updateSubStepProgress(0);
                }
            }, 1500);
        });
    }
}

// ==================== ENTITY PICKER ====================
function setupEntityPicker() {
    const entityCheckboxes = document.querySelectorAll('.entity-checkbox');
    const entityNotification = document.getElementById('entity-notification');

    if (entityCheckboxes.length > 0) {
        entityCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const selectedCount = document.querySelectorAll('.entity-checkbox:checked').length;

                // Show notification if multiple selected
                if (selectedCount > 1) {
                    entityNotification.textContent = `ℹ️ You have selected ${selectedCount} entities. The relationships between these entities will also be included.`;
                    entityNotification.classList.add('show');
                } else {
                    entityNotification.classList.remove('show');
                }

                // Mark substep as complete if at least one selected
                if (selectedCount > 0) {
                    const checkbox = document.querySelector('.sub-step-checkbox[data-step="1"][data-substep="0"]');
                    if (checkbox) {
                        checkbox.checked = true;
                        updateSubStepProgress(1);
                    }
                }
            });
        });
    }
}

// ==================== IR OPTIONS ====================
function setupIROptions() {
    const irRadios = document.querySelectorAll('.ir-radio');

    if (irRadios.length > 0) {
        irRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                // Mark substep as complete when an option is selected
                const checkbox = document.querySelector('.sub-step-checkbox[data-step="2"][data-substep="0"]');
                if (checkbox) {
                    checkbox.checked = true;
                    updateSubStepProgress(2);
                }
            });
        });
    }
}

// ==================== SUB-STEP CHECKBOXES ====================
function setupSubStepCheckboxes() {
    const allCheckboxes = document.querySelectorAll('.sub-step-checkbox');

    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const stepIndex = parseInt(this.getAttribute('data-step'));
            updateSubStepProgress(stepIndex);
        });
    });
}

function updateSubStepProgress(stepIndex) {
    const stepPanel = document.querySelector(`.step-panel[data-step-index="${stepIndex}"]`);
    if (!stepPanel) return;

    const allCheckboxes = stepPanel.querySelectorAll('.sub-step-checkbox');
    const checkedCheckboxes = stepPanel.querySelectorAll('.sub-step-checkbox:checked');

    const total = allCheckboxes.length;
    const completed = checkedCheckboxes.length;

    // Update sub-steps summary
    const summary = stepPanel.querySelector('.sub-steps-summary');
    if (summary) {
        summary.textContent = `${completed} out of ${total}`;
    }

    // Update step status
    if (completed === 0) {
        updateStepStatus(stepIndex, 'not-started');
    } else if (completed === total) {
        updateStepStatus(stepIndex, 'completed');
    } else {
        updateStepStatus(stepIndex, 'in-progress');
    }
}

function updateStepStatus(stepIndex, status) {
    appState.stepStates[stepIndex].status = status;

    // Update step item in summary
    const stepItem = document.querySelector(`.step-item[data-step="${stepIndex}"]`);
    if (stepItem) {
        const statusIcon = stepItem.querySelector('.step-status');
        statusIcon.className = 'step-status ' + status;

        switch(status) {
            case 'not-started':
                statusIcon.textContent = '○';
                break;
            case 'in-progress':
                statusIcon.textContent = '◐';
                break;
            case 'completed':
                statusIcon.textContent = '✓';
                break;
        }
    }
}

// ==================== IDENTITY SCHEDULE TOGGLE ====================
function setupIdentityScheduleToggle() {
    const toggle = document.querySelector('.identity-schedule-toggle');

    if (toggle) {
        toggle.addEventListener('change', function() {
            const checkbox = document.querySelector('.sub-step-checkbox[data-step="6"][data-substep="4"]');
            if (checkbox) {
                checkbox.checked = this.checked;
                updateSubStepProgress(6);
            }
        });
    }
}

// ==================== UTILITY FUNCTIONS ====================

// Initialize all steps on page load
function initializeStepProgress() {
    for (let i = 0; i < 9; i++) {
        updateSubStepProgress(i);
    }
}

// Call initialization
setTimeout(initializeStepProgress, 100);
