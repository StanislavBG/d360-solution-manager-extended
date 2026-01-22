// Application State
const state = {
    currentPage: 'home',
    currentApp: 'Data 360',
    leftNavCollapsed: false,
    stepSummaryCollapsed: false,
    stepStates: Array(10).fill('not-started'),
    stepProgress: Array(10).fill({ completed: 0, total: 0 })
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAppPicker();
    initializeLeftNav();
    initializeTiles();
    initializeStepPanels();
    initializeStepSummary();
    initializeFormInteractions();
});

// Navigation Initialization
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const pageName = this.dataset.page;
            navigateToPage(pageName);
        });
    });

    const leftNavItems = document.querySelectorAll('.nav-item');
    leftNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageName = this.dataset.page;
            navigateToPage(pageName);
        });
    });
}

// Navigate to Page
function navigateToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Remove active state from all nav items
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

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
            state.currentPage = pageName;

            // Update active nav items
            if (pageName === 'home' || pageName === 'solution-manager') {
                const tab = document.querySelector(`.nav-tab[data-page="${pageName}"]`);
                if (tab) tab.classList.add('active');
            } else {
                const navItem = document.querySelector(`.nav-item[data-page="${pageName}"]`);
                if (navItem) navItem.classList.add('active');
            }
        }
    }
}

// App Picker Initialization
function initializeAppPicker() {
    const appPickerBtn = document.getElementById('app-picker-icon');
    const appPickerDropdown = document.getElementById('app-picker-dropdown');
    const appLabel = document.getElementById('app-label');
    const appOptions = document.querySelectorAll('.app-option');

    appPickerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('hidden');
    });

    appOptions.forEach(option => {
        option.addEventListener('click', function() {
            const appName = this.dataset.app;
            appLabel.textContent = appName;
            state.currentApp = appName;
            appPickerDropdown.classList.add('hidden');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!appPickerBtn.contains(e.target) && !appPickerDropdown.contains(e.target)) {
            appPickerDropdown.classList.add('hidden');
        }
    });
}

// Left Navigation Collapse
function initializeLeftNav() {
    const collapseBtn = document.getElementById('collapse-btn');
    const leftNav = document.getElementById('left-navigation');

    collapseBtn.addEventListener('click', function() {
        leftNav.classList.toggle('collapsed');
        leftNav.classList.toggle('expanded');
        state.leftNavCollapsed = !state.leftNavCollapsed;
    });
}

// Tiles Initialization
function initializeTiles() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const pageName = this.dataset.page;
            navigateToPage(pageName);
        });
    });
}

// Step Panels Initialization
function initializeStepPanels() {
    const stepPanels = document.querySelectorAll('.step-panel');

    stepPanels.forEach((panel, index) => {
        const header = panel.querySelector('.step-header');
        const nextBtn = panel.querySelector('.next-step-btn');

        // Click header to expand/collapse
        header.addEventListener('click', function() {
            if (panel.classList.contains('collapsed')) {
                expandPanel(panel, index);
            } else {
                collapsePanel(panel);
            }
        });

        // Next Step button
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const nextIndex = index + 1;
                if (nextIndex < stepPanels.length) {
                    collapsePanel(panel);
                    const nextPanel = stepPanels[nextIndex];
                    expandPanel(nextPanel, nextIndex);

                    // Scroll to next panel
                    setTimeout(() => {
                        nextPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            });
        }

        // Initialize substep checkboxes
        const checkboxes = panel.querySelectorAll('.substep-checkbox, .rule-checkbox, .entity-checkbox, .resolution-radio');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateStepProgress(panel, index);
            });
        });
    });
}

// Expand Panel
function expandPanel(panel, index) {
    // Collapse all other panels
    document.querySelectorAll('.step-panel').forEach(p => {
        if (p !== panel) {
            collapsePanel(p);
        }
    });

    panel.classList.remove('collapsed');

    // Update step state to in-progress if not completed
    const stepIndex = parseInt(panel.dataset.step);
    if (state.stepStates[stepIndex] === 'not-started') {
        state.stepStates[stepIndex] = 'in-progress';
        updateStepSummaryStatus(stepIndex);
    }
}

// Collapse Panel
function collapsePanel(panel) {
    panel.classList.add('collapsed');
}

// Update Step Progress
function updateStepProgress(panel, panelIndex) {
    const stepIndex = parseInt(panel.dataset.step);
    const checkboxes = panel.querySelectorAll('.substep-checkbox:checked, .rule-checkbox:checked');
    const totalCheckboxes = panel.querySelectorAll('.substep-checkbox, .rule-checkbox').length;

    // For radio buttons
    const radioButtons = panel.querySelectorAll('.resolution-radio:checked, .entity-checkbox:checked');
    const hasRadioSelection = radioButtons.length > 0;

    let completed = checkboxes.length;
    let total = totalCheckboxes;

    // Special handling for different steps
    if (stepIndex === 1) { // Choose Business Entity
        // Auto-check the checkbox if at least one entity is selected
        const entityCheckboxes = panel.querySelectorAll('.entity-checkbox:checked');
        if (entityCheckboxes.length > 0) {
            const autoCheckbox = panel.querySelector('#step2-check1');
            if (autoCheckbox && !autoCheckbox.checked) {
                autoCheckbox.checked = true;
            }
            // Show multi-select notice if more than one selected
            const notice = panel.querySelector('.multi-select-notice');
            if (entityCheckboxes.length > 1) {
                notice.classList.remove('hidden');
            } else {
                notice.classList.add('hidden');
            }
        }
    }

    if (stepIndex === 2) { // Choose Identity Resolution Type
        // Auto-check the checkbox if a radio is selected
        const resolutionRadios = panel.querySelectorAll('.resolution-radio:checked');
        if (resolutionRadios.length > 0) {
            const autoCheckbox = panel.querySelector('#step3-check1');
            if (autoCheckbox && !autoCheckbox.checked) {
                autoCheckbox.checked = true;
            }
        }
    }

    if (stepIndex === 5) { // Set up Identity Rules
        // Auto-check the completion checkbox if at least one rule is selected
        const ruleCheckboxes = panel.querySelectorAll('.rule-checkbox:checked');
        if (ruleCheckboxes.length > 0) {
            const autoCheckbox = panel.querySelector('#step6-check1');
            if (autoCheckbox && !autoCheckbox.checked) {
                autoCheckbox.checked = true;
            }
        }
    }

    // Recalculate after auto-checks
    const updatedCheckboxes = panel.querySelectorAll('.substep-checkbox:checked, .rule-checkbox:checked');
    completed = updatedCheckboxes.length;

    // Update sub-steps summary
    const subStepsSummary = panel.querySelector('.sub-steps-summary');
    if (subStepsSummary) {
        subStepsSummary.textContent = `${completed} out of ${total} completed`;
    }

    // Update step state
    if (completed === total && total > 0) {
        state.stepStates[stepIndex] = 'completed';
    } else if (completed > 0) {
        state.stepStates[stepIndex] = 'in-progress';
    }

    updateStepSummaryStatus(stepIndex);
}

// Update Step Summary Status
function updateStepSummaryStatus(stepIndex) {
    const summaryStep = document.querySelector(`.summary-step[data-step="${stepIndex}"]`);
    if (summaryStep) {
        const statusIcon = summaryStep.querySelector('.step-status');
        const status = state.stepStates[stepIndex];

        statusIcon.classList.remove('not-started', 'in-progress', 'completed');
        statusIcon.classList.add(status);

        if (status === 'not-started') {
            statusIcon.textContent = '○';
        } else if (status === 'in-progress') {
            statusIcon.textContent = '◐';
        } else if (status === 'completed') {
            statusIcon.textContent = '✓';
        }
    }
}

// Step Summary Initialization
function initializeStepSummary() {
    const collapseSummaryBtn = document.querySelector('.collapse-summary-btn');
    const summaryContent = document.querySelector('.step-summary-content');

    if (collapseSummaryBtn && summaryContent) {
        collapseSummaryBtn.addEventListener('click', function() {
            summaryContent.classList.toggle('hidden');
            state.stepSummaryCollapsed = !state.stepSummaryCollapsed;

            if (state.stepSummaryCollapsed) {
                this.textContent = '▶ Expand';
            } else {
                this.textContent = '▼ Collapse';
            }
        });
    }

    // Click on summary steps to navigate to step panel
    const summarySteps = document.querySelectorAll('.summary-step');
    summarySteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepIndex = parseInt(this.dataset.step);
            const stepPanel = document.querySelector(`.step-panel[data-step="${stepIndex}"]`);
            if (stepPanel) {
                expandPanel(stepPanel, stepIndex);
                stepPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Form Interactions
function initializeFormInteractions() {
    // Validate Connection Button
    const validateBtns = document.querySelectorAll('.validate-btn');
    validateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const panel = this.closest('.step-panel');
            const validationMessage = panel.querySelector('.validation-message');

            if (validationMessage) {
                // Show loading
                validationMessage.textContent = '⏳ Validating connection...';
                validationMessage.classList.remove('hidden', 'success');

                // Simulate validation
                setTimeout(() => {
                    validationMessage.textContent = '✓ Successful connection is created';
                    validationMessage.classList.add('success');
                }, 1000);
            }
        });
    });

    // Review Mapping Buttons
    const reviewMappingBtns = document.querySelectorAll('.review-mapping-btn');
    reviewMappingBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('🔄 Redirecting to mapping configuration page...');
        });
    });

    // Action Buttons in Validate Connected Data
    const validateConnectedDataBtns = document.querySelectorAll('#integrate-business-entities-page .step-panel[data-step="4"] .action-btn');
    validateConnectedDataBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const panel = this.closest('.step-panel');
            const redirectNotice = panel.querySelector('.redirect-notice');

            if (redirectNotice) {
                redirectNotice.classList.remove('hidden');
                setTimeout(() => {
                    redirectNotice.classList.add('hidden');
                    alert('🔄 Redirecting to: ' + this.textContent);
                }, 1500);
            }
        });
    });

    // Configure Buttons
    const configureBtns = document.querySelectorAll('.action-btn');
    configureBtns.forEach(btn => {
        if (btn.textContent.includes('Configure')) {
            btn.addEventListener('click', function() {
                alert('🔄 Redirecting to configuration page...');
            });
        }
    });
}

// Utility function to scroll step into view with header visible
function scrollStepIntoView(stepPanel) {
    const headerHeight = document.getElementById('main-header').offsetHeight;
    const stepPosition = stepPanel.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

    window.scrollTo({
        top: stepPosition,
        behavior: 'smooth'
    });
}