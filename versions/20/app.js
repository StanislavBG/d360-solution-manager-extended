// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepSummaryExpanded: true,
    steps: [
        { id: 1, status: 'not-started', total: 5, completed: 0 },
        { id: 2, status: 'not-started', total: 1, completed: 0 },
        { id: 3, status: 'not-started', total: 1, completed: 0 },
        { id: 4, status: 'not-started', total: 1, completed: 0 },
        { id: 5, status: 'not-started', total: 2, completed: 0 },
        { id: 6, status: 'not-started', total: 1, completed: 0 },
        { id: 7, status: 'not-started', total: 3, completed: 0 }
    ],
    selectedEntity: null,
    connectionValidated: false
};

// DOM Elements
const appPicker = document.getElementById('app-picker');
const appDropdown = document.getElementById('app-dropdown');
const appLabel = document.getElementById('app-label');
const navToggle = document.getElementById('nav-toggle');
const leftNavigation = document.getElementById('left-navigation');
const navTabs = document.querySelectorAll('.nav-tab');
const navItems = document.querySelectorAll('.nav-item');
const summaryCollapseBtn = document.getElementById('summary-collapse-btn');
const stepSummary = document.getElementById('step-summary');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadPage('home');
});

// Event Listeners
function initializeEventListeners() {
    // App Picker
    appPicker.addEventListener('click', (e) => {
        e.stopPropagation();
        appDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!appPicker.contains(e.target)) {
            appDropdown.classList.remove('show');
        }
    });

    // App Selection
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedApp = e.target.dataset.app;
            switchApp(selectedApp);
        });
    });

    // Navigation Toggle
    navToggle.addEventListener('click', () => {
        appState.leftNavExpanded = !appState.leftNavExpanded;
        leftNavigation.classList.toggle('collapsed');
    });

    // Navigation Tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const page = e.target.dataset.page;
            navTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            loadPage(page);
        });
    });

    // Left Navigation Items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const page = e.currentTarget.dataset.page;
            navItems.forEach(i => i.classList.remove('active'));
            e.currentTarget.classList.add('active');
            navTabs.forEach(t => t.classList.remove('active'));
            loadPage(page);
        });
    });

    // Tile Click
    const integrateTile = document.getElementById('integrate-business-entities-tile');
    if (integrateTile) {
        integrateTile.addEventListener('click', () => {
            loadPage('integrate-business-entities');
        });
    }

    // Step Summary Collapse
    summaryCollapseBtn.addEventListener('click', () => {
        appState.stepSummaryExpanded = !appState.stepSummaryExpanded;
        stepSummary.classList.toggle('collapsed');
    });

    // Step Headers (Expand/Collapse)
    document.querySelectorAll('.step-header').forEach(header => {
        header.addEventListener('click', (e) => {
            const stepNum = e.currentTarget.dataset.step;
            const panel = document.querySelector(`.step-panel[data-step="${stepNum}"]`);
            panel.classList.toggle('collapsed');
        });
    });

    // Summary Step Click (Navigate to Step)
    document.querySelectorAll('.summary-step').forEach(step => {
        step.addEventListener('click', (e) => {
            const stepNum = e.currentTarget.dataset.step;
            scrollToStep(stepNum);
        });
    });

    // Next Step Buttons
    document.querySelectorAll('.next-step-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nextStep = e.target.dataset.next;
            if (nextStep) {
                scrollToStep(nextStep);
            }
        });
    });

    // Step 1: Connection Validation
    const validateBtn = document.getElementById('validate-connection');
    if (validateBtn) {
        validateBtn.addEventListener('click', validateConnection);
    }

    // Step 1: Input Checkboxes
    const connectionInputs = ['connection-name', 'tenant-url', 'username', 'password'];
    connectionInputs.forEach((inputId, index) => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', (e) => {
                const checkbox = document.getElementById(`step1-check${index + 1}`);
                if (e.target.value.trim() !== '') {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
                updateStepProgress(1);
            });
        }
    });

    // Step 2: Business Entity Picker
    const entityPicker = document.getElementById('business-entity-picker');
    if (entityPicker) {
        entityPicker.addEventListener('change', (e) => {
            if (e.target.value) {
                appState.selectedEntity = e.target.value;
                document.getElementById('step2-check1').checked = true;
                updateStepProgress(2);
                updateMappingsTable(e.target.value);
            }
        });
    }

    // Step 3: Review Mappings Button
    const reviewMappingsBtn = document.getElementById('review-mappings-btn');
    if (reviewMappingsBtn) {
        reviewMappingsBtn.addEventListener('click', () => {
            document.getElementById('step3-check1').checked = true;
            document.getElementById('step3-check1').disabled = false;
            updateStepProgress(3);
            alert('Mappings reviewed successfully!');
        });
    }

    // All Step Checkboxes
    document.querySelectorAll('.step-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const stepNum = parseInt(e.target.id.match(/step(\d+)/)[1]);
            updateStepProgress(stepNum);
        });
    });
}

// Switch Application
function switchApp(appName) {
    appState.currentApp = appName;
    appLabel.textContent = appName;

    // Update dropdown active state
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.app === appName) {
            item.classList.add('active');
        }
    });

    appDropdown.classList.remove('show');
}

// Load Page
function loadPage(pageName) {
    appState.currentPage = pageName;

    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const pageMap = {
        'home': 'home-page',
        'solution-manager': 'solution-manager-page',
        'connect-unify': 'connect-unify-page',
        'govern-data': 'govern-data-page',
        'process-content': 'process-content-page',
        'query-segment': 'query-segment-page',
        'analyze-predict': 'analyze-predict-page',
        'act-on-data': 'act-on-data-page',
        'build-share': 'build-share-page',
        'integrate-business-entities': 'integrate-business-entities-page'
    };

    const pageId = pageMap[pageName];
    if (pageId) {
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
        }
    }
}

// Scroll to Step
function scrollToStep(stepNum) {
    const panel = document.querySelector(`.step-panel[data-step="${stepNum}"]`);
    if (panel) {
        // Expand the panel
        panel.classList.remove('collapsed');

        // Scroll to the panel with offset
        const pageArea = document.getElementById('page-area');
        const panelTop = panel.offsetTop - 20; // 20px offset

        pageArea.scrollTo({
            top: panelTop,
            behavior: 'smooth'
        });
    }
}

// Update Step Progress
function updateStepProgress(stepNum) {
    const step = appState.steps[stepNum - 1];
    const checkboxes = document.querySelectorAll(`#integrate-business-entities-page .step-panel[data-step="${stepNum}"] .step-checkbox:not([disabled])`);

    let completed = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) completed++;
    });

    step.completed = completed;

    // Update status
    if (completed === 0) {
        step.status = 'not-started';
    } else if (completed < step.total) {
        step.status = 'in-progress';
    } else {
        step.status = 'completed';
    }

    // Update UI
    updateStepUI(stepNum);
}

// Update Step UI
function updateStepUI(stepNum) {
    const step = appState.steps[stepNum - 1];

    // Update summary step status
    const summaryStep = document.querySelector(`.summary-step[data-step="${stepNum}"]`);
    if (summaryStep) {
        const statusIcon = summaryStep.querySelector('.step-status');
        statusIcon.className = `step-status ${step.status}`;
    }

    // Update sub-steps summary
    const panel = document.querySelector(`.step-panel[data-step="${stepNum}"]`);
    if (panel) {
        const summary = panel.querySelector('.sub-steps-summary');
        if (summary) {
            summary.textContent = `${step.completed} out of ${step.total} complete`;
        }
    }
}

// Validate Connection
function validateConnection() {
    const connectionName = document.getElementById('connection-name').value;
    const tenantUrl = document.getElementById('tenant-url').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!connectionName || !tenantUrl || !username || !password) {
        alert('Please fill in all connection details');
        return;
    }

    const resultDiv = document.getElementById('validation-result');
    resultDiv.textContent = 'Validating connection...';
    resultDiv.className = 'validation-result loading';

    // Simulate validation
    setTimeout(() => {
        appState.connectionValidated = true;
        resultDiv.textContent = '✓ Connection validated successfully!';
        resultDiv.className = 'validation-result success';

        // Enable and check the validation checkbox
        const validationCheckbox = document.getElementById('step1-check5');
        validationCheckbox.disabled = false;
        validationCheckbox.checked = true;

        updateStepProgress(1);
    }, 1500);
}

// Update Mappings Table
function updateMappingsTable(entityType) {
    const mappingTables = document.getElementById('mapping-tables');

    const tableData = {
        'customer': [
            'Customer_Master',
            'Customer_Address',
            'Customer_Contact',
            'Customer_Preferences',
            'Customer_Attributes'
        ],
        'organization': [
            'Organization_Master',
            'Organization_Hierarchy',
            'Organization_Location',
            'Organization_Contacts'
        ],
        'product': [
            'Product_Master',
            'Product_Categories',
            'Product_Attributes',
            'Product_Pricing'
        ],
        'supplier': [
            'Supplier_Master',
            'Supplier_Contact',
            'Supplier_Products',
            'Supplier_Performance'
        ]
    };

    const tables = tableData[entityType] || [];

    if (tables.length > 0) {
        let html = '<h4>Data Objects to Sync:</h4><ul>';
        tables.forEach(table => {
            html += `<li>${table}</li>`;
        });
        html += '</ul>';
        mappingTables.innerHTML = html;
    } else {
        mappingTables.innerHTML = '<p>Select a business entity to view mappings</p>';
    }
}

// Initialize all steps as collapsed
document.querySelectorAll('.step-panel').forEach(panel => {
    panel.classList.add('collapsed');
});

// Initialize step progress
appState.steps.forEach((step, index) => {
    updateStepUI(index + 1);
});

// Smooth scrolling behavior for page area
document.getElementById('page-area').style.scrollBehavior = 'smooth';
