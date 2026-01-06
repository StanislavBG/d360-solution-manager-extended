// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepStates: {},
    substepStates: {}
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadPage('home');
});

function initializeApp() {
    // Initialize step states for the Integrate Business Entities page
    for (let i = 1; i <= 9; i++) {
        appState.stepStates[i] = 'not-started';
        appState.substepStates[i] = {};
    }
}

function setupEventListeners() {
    // App Picker
    const appPickerBtn = document.getElementById('app-picker-btn');
    const appPickerDropdown = document.getElementById('app-picker-dropdown');

    appPickerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        appPickerDropdown.classList.remove('show');
    });

    // App Selection
    const appOptions = document.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedApp = this.getAttribute('data-app');
            switchApp(selectedApp);
        });
    });

    // Navigation Tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            loadPage(page);
            updateNavTabs(this);
        });
    });

    // Left Navigation Items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            loadPage(page);
            updateNavItems(this);
        });
    });

    // Left Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    navToggle.addEventListener('click', function() {
        toggleLeftNav();
    });

    // Tiles
    const integrateTile = document.getElementById('integrate-business-entities-tile');
    if (integrateTile) {
        integrateTile.addEventListener('click', function() {
            loadPage('integrate-business-entities');
        });
    }

    const householdsTile = document.getElementById('customer-households-tile');
    if (householdsTile) {
        householdsTile.addEventListener('click', function() {
            loadPage('customer-households');
        });
    }

    // Step Summary Toggle
    const summaryToggle = document.getElementById('summary-toggle');
    if (summaryToggle) {
        summaryToggle.addEventListener('click', function() {
            const summaryContent = document.querySelector('.summary-content');
            summaryContent.classList.toggle('collapsed');
            this.textContent = summaryContent.classList.contains('collapsed') ? '▼' : '▲';
        });
    }

    // Summary Steps - Click to navigate
    const summarySteps = document.querySelectorAll('.summary-step');
    summarySteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNumber = this.getAttribute('data-step');
            scrollToStep(stepNumber);
            expandStep(stepNumber);
        });
    });

    // Step Headers - Click to expand/collapse
    const stepPanels = document.querySelectorAll('.step-details-panel');
    stepPanels.forEach(panel => {
        const header = panel.querySelector('.step-header');
        header.addEventListener('click', function() {
            const stepNumber = panel.getAttribute('data-step');
            toggleStepPanel(stepNumber);
        });
    });

    // Next Step Buttons
    const nextStepButtons = document.querySelectorAll('.next-step-btn');
    nextStepButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const currentPanel = this.closest('.step-details-panel');
            const currentStep = parseInt(currentPanel.getAttribute('data-step'));
            goToNextStep(currentStep);
        });
    });

    // Substep Checkboxes
    const substepCheckboxes = document.querySelectorAll('.substep-checkbox');
    substepCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const step = this.getAttribute('data-step');
            const substep = this.getAttribute('data-substep');
            handleSubstepChange(step, substep, this.checked);
        });
    });

    // Connection Form
    const connectionNameSelect = document.getElementById('connection-name');
    if (connectionNameSelect) {
        connectionNameSelect.addEventListener('change', function() {
            const newConnectionForm = document.getElementById('new-connection-form');
            if (this.value === 'new') {
                newConnectionForm.style.display = 'block';
            } else {
                newConnectionForm.style.display = 'none';
            }
        });
    }

    // Validate Connection Button
    const validateBtn = document.getElementById('validate-connection');
    if (validateBtn) {
        validateBtn.addEventListener('click', function() {
            validateConnection();
        });
    }

    // Entity Options
    const entityOptions = document.querySelectorAll('.entity-option');
    entityOptions.forEach(option => {
        option.addEventListener('change', function() {
            handleEntitySelection();
        });
    });

    // IR Type Radio Buttons
    const irTypeRadios = document.querySelectorAll('input[name="ir-type"]');
    irTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const step = 3;
                const substep = 1;
                const checkbox = document.querySelector(`.substep-checkbox[data-step="${step}"][data-substep="${substep}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.checked = true;
                    handleSubstepChange(step, substep, true);
                }
            }
        });
    });

    // Preview Buttons
    const previewButtons = document.querySelectorAll('.preview-btn');
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            showRedirectNotification();
        });
    });

    // Action Buttons (Review Mappings, Configure, etc.)
    const actionButtons = document.querySelectorAll('.action-btn:not(.preview-btn)');
    actionButtons.forEach(button => {
        if (!button.classList.contains('validate-btn') && !button.classList.contains('next-step-btn')) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                showRedirectNotification();
            });
        }
    });

    // Identity Schedule Toggle
    const identityToggle = document.getElementById('identity-schedule-toggle');
    if (identityToggle) {
        identityToggle.addEventListener('change', function() {
            const step = 7;
            const substep = 5;
            const checkbox = document.querySelector(`.substep-checkbox[data-step="${step}"][data-substep="${substep}"]`);
            if (checkbox && !checkbox.checked && this.checked) {
                checkbox.checked = true;
                handleSubstepChange(step, substep, true);
            }
        });
    }
}

function switchApp(appName) {
    appState.currentApp = appName;
    document.getElementById('app-label').textContent = appName;

    // Update active state in dropdown
    const appOptions = document.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        if (option.getAttribute('data-app') === appName) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function loadPage(pageName) {
    appState.currentPage = pageName;

    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show the selected page
    const pageId = pageName + '-page';
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
}

function updateNavTabs(activeTab) {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');

    // Clear left nav active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
}

function updateNavItems(activeItem) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');

    // Clear nav tabs active state
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => tab.classList.remove('active'));
}

function toggleLeftNav() {
    appState.leftNavExpanded = !appState.leftNavExpanded;
    const leftNav = document.getElementById('left-navigation');

    if (appState.leftNavExpanded) {
        leftNav.classList.remove('collapsed');
    } else {
        leftNav.classList.add('collapsed');
    }
}

function scrollToStep(stepNumber) {
    const panel = document.querySelector(`.step-details-panel[data-step="${stepNumber}"]`);
    if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function expandStep(stepNumber) {
    const panel = document.querySelector(`.step-details-panel[data-step="${stepNumber}"]`);
    if (panel && !panel.classList.contains('expanded')) {
        panel.classList.add('expanded');
    }
}

function toggleStepPanel(stepNumber) {
    const panel = document.querySelector(`.step-details-panel[data-step="${stepNumber}"]`);
    if (panel) {
        panel.classList.toggle('expanded');

        // Update step state to in-progress when first expanded
        if (panel.classList.contains('expanded') && appState.stepStates[stepNumber] === 'not-started') {
            updateStepStatus(stepNumber, 'in-progress');
        }
    }
}

function goToNextStep(currentStep) {
    const nextStep = currentStep + 1;
    const nextPanel = document.querySelector(`.step-details-panel[data-step="${nextStep}"]`);

    if (nextPanel) {
        // Collapse current step
        const currentPanel = document.querySelector(`.step-details-panel[data-step="${currentStep}"]`);
        if (currentPanel) {
            currentPanel.classList.remove('expanded');
        }

        // Expand and scroll to next step
        nextPanel.classList.add('expanded');

        // Scroll so the header is visible
        setTimeout(() => {
            const header = nextPanel.querySelector('.step-header');
            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        // Update status
        if (appState.stepStates[nextStep] === 'not-started') {
            updateStepStatus(nextStep, 'in-progress');
        }
    }
}

function handleSubstepChange(step, substep, checked) {
    // Update substep state
    if (!appState.substepStates[step]) {
        appState.substepStates[step] = {};
    }
    appState.substepStates[step][substep] = checked;

    // Update sub-steps summary
    updateSubstepsSummary(step);

    // Check if all substeps are complete
    const panel = document.querySelector(`.step-details-panel[data-step="${step}"]`);
    const totalCheckboxes = panel.querySelectorAll('.substep-checkbox').length;
    const checkedCheckboxes = panel.querySelectorAll('.substep-checkbox:checked').length;

    if (checkedCheckboxes === totalCheckboxes && totalCheckboxes > 0) {
        updateStepStatus(step, 'completed');
    } else if (checkedCheckboxes > 0) {
        updateStepStatus(step, 'in-progress');
    } else {
        updateStepStatus(step, 'not-started');
    }
}

function updateSubstepsSummary(step) {
    const panel = document.querySelector(`.step-details-panel[data-step="${step}"]`);
    if (!panel) return;

    const totalCheckboxes = panel.querySelectorAll('.substep-checkbox').length;
    const checkedCheckboxes = panel.querySelectorAll('.substep-checkbox:checked').length;

    const summary = panel.querySelector('.sub-steps-summary');
    if (summary) {
        summary.textContent = `${checkedCheckboxes} out of ${totalCheckboxes}`;
    }
}

function updateStepStatus(step, status) {
    appState.stepStates[step] = status;

    // Update summary step status icon
    const summaryStep = document.querySelector(`.summary-step[data-step="${step}"] .step-status`);
    if (summaryStep) {
        summaryStep.classList.remove('not-started', 'in-progress', 'completed');
        summaryStep.classList.add(status);

        // Update icon
        if (status === 'not-started') {
            summaryStep.textContent = '○';
        } else if (status === 'in-progress') {
            summaryStep.textContent = '◐';
        } else if (status === 'completed') {
            summaryStep.textContent = '✓';
        }
    }
}

function validateConnection() {
    const resultDiv = document.getElementById('validation-result');
    const connectionName = document.getElementById('new-connection-name').value;
    const tenantUrl = document.getElementById('tenant-url').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!connectionName || !tenantUrl || !username || !password) {
        resultDiv.textContent = 'Please fill in all fields';
        resultDiv.className = 'validation-result';
        resultDiv.style.display = 'block';
        return;
    }

    // Show loading state
    resultDiv.textContent = 'Validating connection...';
    resultDiv.className = 'validation-result loading';
    resultDiv.style.display = 'block';

    // Simulate validation
    setTimeout(() => {
        resultDiv.textContent = '✓ Connection validated successfully!';
        resultDiv.className = 'validation-result success';

        // Mark substep as complete
        const checkbox = document.querySelector('.substep-checkbox[data-step="1"][data-substep="1"]');
        if (checkbox && !checkbox.checked) {
            checkbox.checked = true;
            handleSubstepChange(1, 1, true);
        }
    }, 1500);
}

function handleEntitySelection() {
    const selectedEntities = document.querySelectorAll('.entity-option:checked');
    const notification = document.getElementById('relationship-notification');

    if (selectedEntities.length > 1) {
        notification.style.display = 'block';
    } else {
        notification.style.display = 'none';
    }

    // Mark substep as complete if at least one entity is selected
    if (selectedEntities.length > 0) {
        const checkbox = document.querySelector('.substep-checkbox[data-step="2"][data-substep="1"]');
        if (checkbox && !checkbox.checked) {
            checkbox.checked = true;
            handleSubstepChange(2, 1, true);
        }
    } else {
        const checkbox = document.querySelector('.substep-checkbox[data-step="2"][data-substep="1"]');
        if (checkbox && checkbox.checked) {
            checkbox.checked = false;
            handleSubstepChange(2, 1, false);
        }
    }
}

function showRedirectNotification() {
    alert('This would redirect to another page in the full application.');
}

// Initialize substep summaries on load
window.addEventListener('load', function() {
    for (let i = 1; i <= 9; i++) {
        updateSubstepsSummary(i);
    }
});
