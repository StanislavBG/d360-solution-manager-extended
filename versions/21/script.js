// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepSummaryExpanded: true,
    selectedBusinessEntity: null,
    stepsCompletion: {
        1: { completed: 0, total: 1 },
        2: { completed: 0, total: 1 },
        3: { completed: 0, total: 1 },
        4: { completed: 0, total: 1 },
        5: { completed: 0, total: 1 },
        6: { completed: 0, total: 5 },
        7: { completed: 0, total: 1 },
        8: { completed: 0, total: 3 }
    }
};

// Initialize app on load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigationListeners();
    setupAppPickerListeners();
    setupLeftNavigation();
    setupStepSummary();
    setupStepCheckboxes();
    setupConnectionForm();
    setupBusinessEntitySelect();
    setupIdentityToggle();

    // Set default page
    showPage('home');
}

// Navigation Setup
function setupNavigationListeners() {
    // Top navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;

            // Update active state
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding page
            showPage(page);
        });
    });

    // Solution Manager tile
    const tile = document.getElementById('integrate-business-entities-tile');
    if (tile) {
        tile.addEventListener('click', function() {
            showPage('integrate-business-entities');
        });
    }

    // Left navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;

            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding page
            showPage(page);
        });
    });
}

function showPage(pageName) {
    appState.currentPage = pageName;

    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const pageMap = {
        'home': 'home-page',
        'solution-manager': 'solution-manager-page',
        'integrate-business-entities': 'integrate-business-entities-page',
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
        }
    }
}

// App Picker Setup
function setupAppPickerListeners() {
    const appPickerLinks = document.querySelectorAll('#app-picker-menu a');
    const appLabel = document.getElementById('app-label');

    appPickerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.dataset.app;

            // Update active state
            appPickerLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Update app label
            appLabel.textContent = appName;
            appState.currentApp = appName;
        });
    });
}

// Left Navigation Toggle
function setupLeftNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const leftNav = document.getElementById('left-navigation');

    navToggle.addEventListener('click', function() {
        leftNav.classList.toggle('collapsed');
        leftNav.classList.toggle('expanded');
        appState.leftNavExpanded = !appState.leftNavExpanded;
    });
}

// Step Summary Setup
function setupStepSummary() {
    const summaryToggleBtn = document.querySelector('.summary-toggle-btn');
    const stepSummary = document.getElementById('step-summary');

    if (summaryToggleBtn && stepSummary) {
        summaryToggleBtn.addEventListener('click', function() {
            stepSummary.classList.toggle('collapsed');
            stepSummary.classList.toggle('expanded');
            appState.stepSummaryExpanded = !appState.stepSummaryExpanded;

            // Update button icon
            this.textContent = appState.stepSummaryExpanded ? '▼' : '▶';
        });
    }

    // Step summary click to navigate
    const summarySteps = document.querySelectorAll('.summary-step');
    summarySteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNumber = parseInt(this.dataset.step);
            scrollToStep(stepNumber);
            toggleStep(stepNumber);
        });
    });
}

function scrollToStep(stepNumber) {
    const stepPanel = document.querySelector(`.step-panel[data-step="${stepNumber}"]`);
    if (stepPanel) {
        stepPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Toggle Step Panel
function toggleStep(stepNumber) {
    const stepPanel = document.querySelector(`.step-panel[data-step="${stepNumber}"]`);
    if (stepPanel) {
        const wasExpanded = stepPanel.classList.contains('expanded');

        // Collapse all panels
        document.querySelectorAll('.step-panel').forEach(panel => {
            panel.classList.remove('expanded');
        });

        // Expand clicked panel if it wasn't expanded
        if (!wasExpanded) {
            stepPanel.classList.add('expanded');
        }
    }
}

// Step Checkboxes Setup
function setupStepCheckboxes() {
    const checkboxes = document.querySelectorAll('.step-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const stepNumber = parseInt(this.dataset.step);
            updateStepCompletion(stepNumber);
        });
    });
}

function updateStepCompletion(stepNumber) {
    // Count completed checkboxes for this step
    const checkboxes = document.querySelectorAll(`.step-checkbox[data-step="${stepNumber}"]`);
    let completedCount = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) {
            completedCount++;
        }
    });

    // Update state
    appState.stepsCompletion[stepNumber].completed = completedCount;

    // Update sub-steps summary in step header
    const stepPanel = document.querySelector(`.step-panel[data-step="${stepNumber}"]`);
    if (stepPanel) {
        const summary = stepPanel.querySelector('.sub-steps-summary');
        if (summary) {
            const total = appState.stepsCompletion[stepNumber].total;
            summary.textContent = `${completedCount} out of ${total} completed`;
        }
    }

    // Update step status in summary
    updateStepStatus(stepNumber);
}

function updateStepStatus(stepNumber) {
    const summaryStep = document.querySelector(`.summary-step[data-step="${stepNumber}"]`);
    if (!summaryStep) return;

    const statusIcon = summaryStep.querySelector('.step-status');
    const completed = appState.stepsCompletion[stepNumber].completed;
    const total = appState.stepsCompletion[stepNumber].total;

    // Remove all status classes
    statusIcon.classList.remove('not-started', 'in-progress', 'completed');

    // Add appropriate class
    if (completed === 0) {
        statusIcon.classList.add('not-started');
    } else if (completed < total) {
        statusIcon.classList.add('in-progress');
    } else {
        statusIcon.classList.add('completed');
    }
}

// Next Step Navigation
function nextStep(currentStep) {
    const nextStepNumber = currentStep + 1;

    // Check if there's a next step
    if (nextStepNumber <= 8) {
        // Collapse current step
        const currentPanel = document.querySelector(`.step-panel[data-step="${currentStep}"]`);
        if (currentPanel) {
            currentPanel.classList.remove('expanded');
        }

        // Scroll to and expand next step
        scrollToStep(nextStepNumber);

        setTimeout(() => {
            toggleStep(nextStepNumber);
        }, 300);
    } else {
        // All steps completed
        alert('Congratulations! You have completed all steps.');
    }
}

// Connection Form Setup
function setupConnectionForm() {
    const connectionSelect = document.getElementById('connection-select');
    const newConnectionForm = document.getElementById('new-connection-form');

    if (connectionSelect && newConnectionForm) {
        connectionSelect.addEventListener('change', function() {
            if (this.value === 'new') {
                newConnectionForm.style.display = 'block';
            } else {
                newConnectionForm.style.display = 'none';
            }
        });
    }
}

function validateConnection() {
    const connName = document.getElementById('conn-name').value;
    const tenantUrl = document.getElementById('tenant-url').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const validationResult = document.getElementById('validation-result');

    // Check if all fields are filled
    if (!connName || !tenantUrl || !username || !password) {
        validationResult.className = 'error';
        validationResult.textContent = 'Please fill in all fields';
        return;
    }

    // Show loading spinner
    validationResult.className = '';
    validationResult.innerHTML = '<span class="spinner"></span> Validating connection...';

    // Simulate validation delay
    setTimeout(() => {
        validationResult.className = 'success';
        validationResult.textContent = '✓ Connection validated successfully!';

        // Auto-check the checkbox
        const checkbox = document.getElementById('step1-sub1');
        if (checkbox) {
            checkbox.checked = true;
            updateStepCompletion(1);
        }
    }, 1500);
}

// Business Entity Selection
function setupBusinessEntitySelect() {
    const businessEntitySelect = document.getElementById('business-entity-select');

    if (businessEntitySelect) {
        businessEntitySelect.addEventListener('change', function() {
            if (this.value) {
                appState.selectedBusinessEntity = this.value;

                // Auto-check the checkbox
                const checkbox = document.getElementById('step2-sub1');
                if (checkbox) {
                    checkbox.checked = true;
                    updateStepCompletion(2);
                }

                // Update mapping tables
                updateMappingTables(this.value);
            }
        });
    }
}

function selectBusinessEntity() {
    const select = document.getElementById('business-entity-select');
    if (select && select.value) {
        appState.selectedBusinessEntity = select.value;

        // Auto-check the checkbox
        const checkbox = document.getElementById('step2-sub1');
        if (checkbox) {
            checkbox.checked = true;
            updateStepCompletion(2);
        }

        // Update mapping tables
        updateMappingTables(select.value);
    }
}

function updateMappingTables(entityType) {
    const mappingDisplay = document.getElementById('mapping-tables');
    if (!mappingDisplay) return;

    const tablesByEntity = {
        'customer': [
            'Customer_Profile',
            'Customer_Contact_Info',
            'Customer_Address',
            'Customer_Preferences',
            'Customer_Interactions'
        ],
        'organization': [
            'Organization_Profile',
            'Organization_Hierarchy',
            'Organization_Contact',
            'Organization_Location'
        ],
        'product': [
            'Product_Catalog',
            'Product_Details',
            'Product_Pricing',
            'Product_Inventory'
        ],
        'supplier': [
            'Supplier_Profile',
            'Supplier_Contact',
            'Supplier_Products',
            'Supplier_Performance'
        ]
    };

    const tables = tablesByEntity[entityType] || [];

    if (tables.length > 0) {
        let html = '<h4>Data Objects to be Synced:</h4>';
        html += '<ul class="mapping-list">';
        tables.forEach(table => {
            html += `<li>${table}</li>`;
        });
        html += '</ul>';
        mappingDisplay.innerHTML = html;
    }
}

function reviewMappings() {
    // Mark step as completed when Review Mappings is clicked
    const checkbox = document.getElementById('step3-sub1');
    if (checkbox) {
        checkbox.checked = true;
        updateStepCompletion(3);
    }

    alert('Opening Review Mappings page...');
}

// Identity Toggle Setup
function setupIdentityToggle() {
    const toggle = document.getElementById('identity-schedule-toggle');
    const label = toggle ? toggle.parentElement.nextElementSibling : null;

    if (toggle && label) {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                label.textContent = 'On';
                label.style.color = '#4bca81';
            } else {
                label.textContent = 'Off';
                label.style.color = '#666';
            }
        });
    }
}

// Make functions globally available
window.toggleStep = toggleStep;
window.nextStep = nextStep;
window.validateConnection = validateConnection;
window.selectBusinessEntity = selectBusinessEntity;
window.reviewMappings = reviewMappings;
