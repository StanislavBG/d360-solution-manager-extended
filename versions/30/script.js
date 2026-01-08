// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepSummaryExpanded: true,
    stepStates: {},
    substepStates: {}
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLeftNav();
    initializeAppPicker();
    initializeSolutionTiles();
    initializeStepPanels();
    initializeStepSummary();
    initializeFormHandlers();
    initializeStepCompletion();
});

// Navigation Functions
function initializeNavigation() {
    // Top navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            navigateToPage(pageName);

            // Update active state
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Left navigation items
    const leftNavItems = document.querySelectorAll('.left-nav-item');
    leftNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            navigateToPage(pageName);

            // Update active state
            leftNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function navigateToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show the selected page
    const pageMap = {
        'home': 'home-page',
        'solution-manager': 'solution-manager-page',
        'integrate-business-entities': 'integrate-business-entities-page',
        'customer-households': 'customer-households-page',
        'connect-unify': 'connect-unify-page',
        'govern-data': 'govern-data-page',
        'process-content': 'process-content-page',
        'query-segment': 'query-segment-page',
        'analyze-predict': 'analyze-predict-page',
        'act-on-data': 'act-on-data-page',
        'build-share': 'build-share-page'
    };

    const pageId = pageMap[pageName];
    if (pageId) {
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
            appState.currentPage = pageName;
        }
    }
}

// Left Navigation Toggle
function initializeLeftNav() {
    const leftNav = document.getElementById('left-navigation');
    const toggleBtn = document.getElementById('left-nav-toggle');

    toggleBtn.addEventListener('click', function() {
        leftNav.classList.toggle('collapsed');
        appState.leftNavExpanded = !leftNav.classList.contains('collapsed');
    });
}

// App Picker Dropdown
function initializeAppPicker() {
    const appPickerBtn = document.getElementById('app-picker-btn');
    const dropdown = document.getElementById('app-dropdown');
    const appLabel = document.getElementById('app-label');

    appPickerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !appPickerBtn.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Handle app selection
    const appLinks = dropdown.querySelectorAll('a');
    appLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.getAttribute('data-app');

            // Update active state
            appLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Update app label
            appLabel.textContent = appName;
            appState.currentApp = appName;

            // Close dropdown
            dropdown.classList.remove('show');
        });
    });
}

// Solution Tiles
function initializeSolutionTiles() {
    const tiles = document.querySelectorAll('.solution-tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const pageName = this.getAttribute('data-page');
            navigateToPage(pageName);
        });
    });
}

// Step Panels
function initializeStepPanels() {
    const panels = document.querySelectorAll('.step-detail-panel');

    panels.forEach((panel, index) => {
        const stepNumber = index + 1;

        // Initialize as collapsed except first panel
        if (stepNumber !== 1) {
            panel.classList.add('collapsed');
        }

        // Initialize step state
        if (!appState.stepStates[stepNumber]) {
            appState.stepStates[stepNumber] = 'not-started';
        }

        // Header click to expand/collapse
        const header = panel.querySelector('.step-header');
        const expandBtn = panel.querySelector('.expand-btn');

        const togglePanel = () => {
            panel.classList.toggle('collapsed');

            // Scroll to panel when expanding
            if (!panel.classList.contains('collapsed')) {
                setTimeout(() => {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        };

        header.addEventListener('click', togglePanel);

        // Next Step button
        const nextBtn = panel.querySelector('.next-step-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();

                // Check if it's the last step
                if (this.textContent === 'Complete') {
                    alert('Congratulations! You have completed all steps.');
                    return;
                }

                // Collapse current panel
                panel.classList.add('collapsed');

                // Expand next panel
                const nextPanel = panels[index + 1];
                if (nextPanel) {
                    nextPanel.classList.remove('collapsed');

                    // Scroll to next panel
                    setTimeout(() => {
                        nextPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            });
        }
    });
}

// Step Summary
function initializeStepSummary() {
    const summaryToggle = document.getElementById('summary-toggle');
    const stepSummary = document.getElementById('step-summary');

    if (summaryToggle && stepSummary) {
        summaryToggle.addEventListener('click', function() {
            stepSummary.classList.toggle('collapsed');
            appState.stepSummaryExpanded = !stepSummary.classList.contains('collapsed');
        });
    }

    // Summary step clicks
    const summarySteps = document.querySelectorAll('.summary-step');
    summarySteps.forEach(summaryStep => {
        summaryStep.addEventListener('click', function() {
            const stepNum = parseInt(this.getAttribute('data-step'));

            // Find and expand the corresponding step panel
            const panels = document.querySelectorAll('.step-detail-panel');
            panels.forEach((panel, index) => {
                if (index + 1 === stepNum) {
                    panel.classList.remove('collapsed');
                    setTimeout(() => {
                        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                } else {
                    panel.classList.add('collapsed');
                }
            });
        });
    });
}

// Form Handlers
function initializeFormHandlers() {
    // Connection form
    const existingConnection = document.getElementById('existing-connection');
    const newConnectionForm = document.querySelector('.new-connection-form');

    if (existingConnection && newConnectionForm) {
        existingConnection.addEventListener('change', function() {
            if (this.value === 'new') {
                newConnectionForm.style.display = 'block';
            } else {
                newConnectionForm.style.display = 'none';
            }
        });
    }

    // Validate connection button
    const validateBtn = document.getElementById('validate-connection');
    if (validateBtn) {
        validateBtn.addEventListener('click', function() {
            const validationResult = document.querySelector('.validation-result');

            // Show spinner
            this.innerHTML = 'Validating... <span class="spinner"></span>';
            this.disabled = true;

            // Simulate validation
            setTimeout(() => {
                validationResult.style.display = 'block';
                validationResult.className = 'validation-result success';
                validationResult.textContent = '✓ Connection validated successfully!';

                this.innerHTML = 'Validate';
                this.disabled = false;

                // Auto-check the substep
                const checkbox = document.querySelector('[data-step="1"][data-substep="1"]');
                if (checkbox) {
                    checkbox.checked = true;
                    updateSubstepCompletion(1, 1);
                }
            }, 1500);
        });
    }

    // Entity checkboxes
    const entityCheckboxes = document.querySelectorAll('.entity-checkbox');
    const entityNotification = document.querySelector('.entity-notification');

    entityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.entity-checkbox:checked').length;

            if (checkedCount > 1 && entityNotification) {
                entityNotification.style.display = 'block';
            } else if (entityNotification) {
                entityNotification.style.display = 'none';
            }

            // Auto-check substep if at least one entity selected
            if (checkedCount > 0) {
                const checkbox = document.querySelector('[data-step="2"][data-substep="1"]');
                if (checkbox) {
                    checkbox.checked = true;
                    updateSubstepCompletion(2, 1);
                }
            }
        });
    });

    // Resolution type radio buttons
    const resolutionRadios = document.querySelectorAll('input[name="resolution-type"]');
    resolutionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const checkbox = document.querySelector('[data-step="3"][data-substep="1"]');
                if (checkbox) {
                    checkbox.checked = true;
                    updateSubstepCompletion(3, 1);
                }
            }
        });
    });

    // Match rule checkboxes
    const matchRuleCheckboxes = document.querySelectorAll('.match-rule-checkbox');
    matchRuleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.match-rule-checkbox:checked').length;

            if (checkedCount > 0) {
                const substepCheckbox = document.querySelector('[data-step="6"][data-substep="1"]');
                if (substepCheckbox) {
                    substepCheckbox.checked = true;
                    updateSubstepCompletion(6, 1);
                }
            }
        });
    });

    // Preview buttons - show redirect notification
    const previewBtns = document.querySelectorAll('.preview-btn');
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const previewType = this.getAttribute('data-preview') || 'preview';
            alert(`Redirecting to ${this.textContent}...`);
        });
    });

    // Action buttons - show redirect notification
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Skip if it's already handled by other event listeners
            if (this.classList.contains('preview-btn') || this.classList.contains('validate-btn')) {
                return;
            }
            alert(`Redirecting to: ${this.textContent}...`);
        });
    });
}

// Step Completion Tracking
function initializeStepCompletion() {
    const substepCheckboxes = document.querySelectorAll('.substep-checkbox');

    substepCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const stepNum = parseInt(this.getAttribute('data-step'));
            const substepNum = parseInt(this.getAttribute('data-substep'));

            updateSubstepCompletion(stepNum, substepNum);
        });
    });
}

function updateSubstepCompletion(stepNum, substepNum) {
    // Initialize substep states for this step if needed
    if (!appState.substepStates[stepNum]) {
        appState.substepStates[stepNum] = {};
    }

    // Get checkbox state
    const checkbox = document.querySelector(`[data-step="${stepNum}"][data-substep="${substepNum}"]`);
    if (checkbox) {
        appState.substepStates[stepNum][substepNum] = checkbox.checked;
    }

    // Count completed substeps for this step
    const stepPanel = document.querySelector(`.step-detail-panel[data-step="${stepNum}"]`);
    if (stepPanel) {
        const totalSubsteps = stepPanel.querySelectorAll('.substep-checkbox').length;
        const completedSubsteps = stepPanel.querySelectorAll('.substep-checkbox:checked').length;

        // Update sub-steps-summary
        const summary = stepPanel.querySelector('.sub-steps-summary');
        if (summary) {
            summary.textContent = `${completedSubsteps} out of ${totalSubsteps}`;
        }

        // Update step status
        let stepStatus = 'not-started';
        if (completedSubsteps === totalSubsteps && totalSubsteps > 0) {
            stepStatus = 'completed';
        } else if (completedSubsteps > 0) {
            stepStatus = 'in-progress';
        }

        appState.stepStates[stepNum] = stepStatus;

        // Update summary panel icon
        updateSummaryStepIcon(stepNum, stepStatus);
    }
}

function updateSummaryStepIcon(stepNum, status) {
    const summaryStep = document.querySelector(`.summary-step[data-step="${stepNum}"]`);
    if (summaryStep) {
        const statusIcon = summaryStep.querySelector('.step-status');
        if (statusIcon) {
            // Remove all status classes
            statusIcon.classList.remove('not-started', 'in-progress', 'completed');
            statusIcon.classList.add(status);

            // Update icon
            switch(status) {
                case 'not-started':
                    statusIcon.textContent = '○';
                    break;
                case 'in-progress':
                    statusIcon.textContent = '◐';
                    break;
                case 'completed':
                    statusIcon.textContent = '●';
                    break;
            }
        }
    }
}

// Utility function to get total substeps for a step
function getTotalSubsteps(stepNum) {
    const stepPanel = document.querySelector(`.step-detail-panel[data-step="${stepNum}"]`);
    if (stepPanel) {
        return stepPanel.querySelectorAll('.substep-checkbox').length;
    }
    return 0;
}

// Initialize all step panels with correct substep counts
document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.step-detail-panel');
    panels.forEach((panel, index) => {
        const stepNum = index + 1;
        const totalSubsteps = panel.querySelectorAll('.substep-checkbox').length;
        const summary = panel.querySelector('.sub-steps-summary');
        if (summary && totalSubsteps > 0) {
            summary.textContent = `0 out of ${totalSubsteps}`;
        }
    });
});
