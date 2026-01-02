// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepSummaryExpanded: true,
    steps: [
        { id: 'connect-informatica', status: 'not-started', completedSubSteps: 0, totalSubSteps: 5 },
        { id: 'choose-entity', status: 'not-started', completedSubSteps: 0, totalSubSteps: 1 },
        { id: 'review-mappings', status: 'not-started', completedSubSteps: 0, totalSubSteps: 2 },
        { id: 'validate-data', status: 'not-started', completedSubSteps: 0, totalSubSteps: 1 },
        { id: 'identity-rules', status: 'not-started', completedSubSteps: 0, totalSubSteps: 2 },
        { id: 'validate-identity', status: 'not-started', completedSubSteps: 0, totalSubSteps: 1 },
        { id: 'sync-informatica', status: 'not-started', completedSubSteps: 0, totalSubSteps: 2 },
        { id: 'setup-experiences', status: 'not-started', completedSubSteps: 0, totalSubSteps: 3 }
    ]
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadPage('home');
});

// Event Listeners
function initializeEventListeners() {
    // App picker
    const appPickerBtn = document.getElementById('app-picker-btn');
    const appPickerMenu = document.getElementById('app-picker-menu');

    appPickerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        appPickerMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        appPickerMenu.classList.remove('show');
    });

    // App selection
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const appName = e.target.dataset.app;
            selectApp(appName);
        });
    });

    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const page = e.target.dataset.page;
            selectNavTab(e.target);
            loadPage(page);
        });
    });

    // Left navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const page = e.currentTarget.dataset.page;
            selectNavItem(e.currentTarget);
            loadPage(page);
        });
    });

    // Left navigation collapse button
    const navCollapseBtn = document.getElementById('nav-collapse-btn');
    navCollapseBtn.addEventListener('click', () => {
        toggleLeftNav();
    });
}

// App Selection
function selectApp(appName) {
    appState.currentApp = appName;
    document.getElementById('app-label').textContent = appName;

    // Update active state
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.app === appName) {
            item.classList.add('active');
        }
    });
}

// Navigation Tab Selection
function selectNavTab(tab) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
}

// Left Nav Item Selection
function selectNavItem(item) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
}

// Toggle Left Navigation
function toggleLeftNav() {
    const leftNav = document.getElementById('left-navigation');
    appState.leftNavExpanded = !appState.leftNavExpanded;

    if (appState.leftNavExpanded) {
        leftNav.classList.remove('collapsed');
        leftNav.classList.add('expanded');
    } else {
        leftNav.classList.remove('expanded');
        leftNav.classList.add('collapsed');
    }
}

// Page Loading
function loadPage(pageName) {
    appState.currentPage = pageName;
    const mainPageArea = document.getElementById('main-page-area');

    switch(pageName) {
        case 'home':
            mainPageArea.innerHTML = getHomePage();
            break;
        case 'solution-manager':
            mainPageArea.innerHTML = getSolutionManagerPage();
            initializeSolutionManagerEvents();
            break;
        case 'integrate-business-entities':
            mainPageArea.innerHTML = getIntegrateBusinessEntitiesPage();
            initializeIntegratePageEvents();
            break;
        default:
            mainPageArea.innerHTML = getPlaceholderPage(pageName);
    }
}

// Home Page
function getHomePage() {
    return `
        <div class="empty-state">
            <h2>Welcome to Data 360</h2>
            <p>Select an option from the navigation to get started</p>
        </div>
    `;
}

// Placeholder Page
function getPlaceholderPage(pageName) {
    const pageNames = {
        'connect-unify': 'Connect & Unify',
        'govern-data': 'Govern Data',
        'process-content': 'Process Content',
        'query-segment': 'Query & Segment',
        'analyze-predict': 'Analyze & Predict',
        'act-on-data': 'Act on Data',
        'build-share': 'Build & Share'
    };

    return `
        <div class="empty-state">
            <h2>${pageNames[pageName] || 'Page'}</h2>
            <p>This page is under construction</p>
        </div>
    `;
}

// Solution Manager Page
function getSolutionManagerPage() {
    return `
        <div class="tile-container">
            <div class="tile" data-tile="integrate-business-entities">
                <div class="tile-title">Integrate Business Entities from Informatica in Data360</div>
                <div class="tile-description">
                    Realize the full potential of the curated and enriched business entities from
                    Informatica directly in D360. In this step by step guide, we will work though
                    the steps required to operationalize business entities created in Informatica in D360.
                </div>
            </div>
        </div>
    `;
}

function initializeSolutionManagerEvents() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', (e) => {
            const tileName = e.currentTarget.dataset.tile;
            if (tileName === 'integrate-business-entities') {
                loadPage('integrate-business-entities');
            }
        });
    });
}

// Integrate Business Entities Page
function getIntegrateBusinessEntitiesPage() {
    return `
        <div class="integrate-page">
            <div class="header-instructions">
                <h1>Integrate Business Entities from Informatica in Data360</h1>
                <p>
                    Realize the full potential of the curated and enriched business entities from
                    Informatica directly in D360. In this step by step guide, we will work though
                    the steps required to operationalize business entities created in Informatica in D360.
                </p>
            </div>

            <div class="step-summary" id="step-summary">
                <div class="step-summary-header">
                    <div class="step-summary-title">Implementation Steps</div>
                    <button class="collapse-btn" id="summary-collapse-btn">▼</button>
                </div>
                <div class="step-summary-content">
                    <div class="steps-list">
                        ${getStepSummaryItems()}
                    </div>
                    <div class="video-placeholder">
                        <div>
                            <p style="margin-bottom: 0.5rem;">Video Tutorial</p>
                            <a href="#" class="link">View Documentation</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="step-details-container">
                ${getStepDetail1()}
                ${getStepDetail2()}
                ${getStepDetail3()}
                ${getStepDetail4()}
                ${getStepDetail5()}
                ${getStepDetail6()}
                ${getStepDetail7()}
                ${getStepDetail8()}
            </div>
        </div>
    `;
}

function getStepSummaryItems() {
    const stepLabels = [
        'Connect to Informatica System',
        'Choose Business Entity',
        'Review and Extend Mappings',
        'Validate Connected Data and Mappings',
        'Set up Identity Rules',
        'Validate Identity Data',
        'Enable Sync to Informatica',
        'Setup Experiences'
    ];

    return appState.steps.map((step, index) => {
        const icon = getStatusIcon(step.status);
        return `
            <div class="step-item">
                <div class="step-status-icon ${step.status}">
                    ${icon}
                </div>
                <span>${stepLabels[index]}</span>
            </div>
        `;
    }).join('');
}

function getStatusIcon(status) {
    switch(status) {
        case 'completed':
            return '✓';
        case 'in-progress':
            return '◐';
        default:
            return '○';
    }
}

// Step Detail 1: Connect to Informatica System
function getStepDetail1() {
    const step = appState.steps[0];
    return `
        <div class="step-detail-panel" data-step-id="connect-informatica">
            <div class="step-detail-header">
                <div class="step-header-left">
                    <div class="step-number">STEP 1</div>
                    <div class="step-title">Connect to Informatica System</div>
                    <div class="step-headline">Establish trusted connection between D360 and Informatica tenants</div>
                    <div class="sub-steps-summary">${step.completedSubSteps} out of ${step.totalSubSteps}</div>
                </div>
                <div class="expand-icon">▼</div>
            </div>
            <div class="step-detail-body">
                <div class="step-body-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            Configure details for the Informatica tenant, so that a trusted connection
                            between them can be provided. The important items are "User-Name" and "Password".
                        </div>

                        <div class="form-group">
                            <label class="form-label">Connection Name</label>
                            <select class="form-select" data-substep="0">
                                <option value="">-- Create New Connection --</option>
                                <option value="existing1">Informatica Prod Connection</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Tenant URL</label>
                            <input type="text" class="form-input" placeholder="https://tenant.informatica.com" data-substep="1" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Username</label>
                            <input type="text" class="form-input" placeholder="Enter username" data-substep="2" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" placeholder="Enter password" data-substep="3" />
                        </div>

                        <button class="btn btn-primary" data-substep="4" id="validate-connection-btn">
                            Create & Validate
                        </button>

                        <div class="spinner" id="connection-spinner"></div>
                        <div class="validation-message" id="connection-validation"></div>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-left">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                    <div class="footer-right">
                        <button class="btn btn-primary next-step-btn">Next Step</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Step Detail 2: Choose Business Entity
function getStepDetail2() {
    const step = appState.steps[1];
    return `
        <div class="step-detail-panel" data-step-id="choose-entity">
            <div class="step-detail-header">
                <div class="step-header-left">
                    <div class="step-number">STEP 2</div>
                    <div class="step-title">Choose Business Entity</div>
                    <div class="step-headline">Select Business Entity from the connected tenant to integrate into Data 360</div>
                    <div class="sub-steps-summary">${step.completedSubSteps} out of ${step.totalSubSteps}</div>
                </div>
                <div class="expand-icon">▼</div>
            </div>
            <div class="step-detail-body">
                <div class="step-body-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            Select the primary business entity from Informatica that you want to integrate
                            into Data 360. This will determine which data objects are synced.
                        </div>

                        <div class="form-group">
                            <label class="form-label">Business Entity</label>
                            <select class="form-select" id="business-entity-picker" data-substep="0">
                                <option value="">-- Select Business Entity --</option>
                                <option value="customer">Customer</option>
                                <option value="organization">Organization</option>
                                <option value="product">Product</option>
                                <option value="supplier">Supplier</option>
                            </select>
                        </div>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-left">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                    <div class="footer-right">
                        <button class="btn btn-primary next-step-btn">Next Step</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Step Detail 3: Review and Extend Mappings
function getStepDetail3() {
    const step = appState.steps[2];
    return `
        <div class="step-detail-panel" data-step-id="review-mappings">
            <div class="step-detail-header">
                <div class="step-header-left">
                    <div class="step-number">STEP 3</div>
                    <div class="step-title">Review and Extend Mappings</div>
                    <div class="step-headline">Review data objects and field mappings from Informatica</div>
                    <div class="sub-steps-summary">${step.completedSubSteps} out of ${step.totalSubSteps}</div>
                </div>
                <div class="expand-icon">▼</div>
            </div>
            <div class="step-detail-body">
                <div class="step-body-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            Based on selected business entities these are the data objects identified
                            from Informatica that are being synced to Data 360.
                        </div>

                        <div class="scrollable-list" id="table-names-list">
                            <div class="list-item">Customer_Profile</div>
                            <div class="list-item">Customer_Address</div>
                            <div class="list-item">Customer_Contact</div>
                            <div class="list-item">Customer_Preferences</div>
                            <div class="list-item">Customer_Transactions</div>
                        </div>

                        <div class="notification">
                            <div class="notification-text">
                                We've detected extra fields beyond the standard. Below is the proposed
                                list of modifications to Salesforce's DMO to add placeholders for these values.
                            </div>
                        </div>

                        <button class="btn btn-secondary" id="review-mappings-btn" data-substep="0">
                            Review Mappings
                        </button>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-left">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                    <div class="footer-right">
                        <button class="btn btn-primary next-step-btn">Next Step</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Step Detail 4: Validate Connected Data and Mappings
function getStepDetail4() {
    const step = appState.steps[3];
    return `
        <div class="step-detail-panel" data-step-id="validate-data">
            <div class="step-detail-header">
                <div class="step-header-left">
                    <div class="step-number">STEP 4</div>
                    <div class="step-title">Validate Connected Data and Mappings</div>
                    <div class="step-headline">Preview sample data to validate mapping correctness</div>
                    <div class="sub-steps-summary">${step.completedSubSteps} out of ${step.totalSubSteps}</div>
                </div>
                <div class="expand-icon">▼</div>
            </div>
            <div class="step-detail-body">
                <div class="step-body-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            By now we've integrated, mapped and transformed the Business Entities
                            to the Standard Data Model. The following previews are based on sample
                            data to help validate correctness of mapping and field value population.
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox" data-substep="0" />
                            <div class="sub-step-content">
                                <div class="sub-step-label">Review sample data preview</div>
                            </div>
                        </div>

                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>C-001</td>
                                    <td>John Doe</td>
                                    <td>john.doe@example.com</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>C-002</td>
                                    <td>Jane Smith</td>
                                    <td>jane.smith@example.com</td>
                                    <td>Active</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-left">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                    <div class="footer-right">
                        <button class="btn btn-primary next-step-btn">Next Step</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Step Detail 5: Set up Identity Rules
function getStepDetail5() {
    const step = appState.steps[4];
    return `
        <div class="step-detail-panel" data-step-id="identity-rules">
            <div class="step-detail-header">
                <div class="step-header-left">
                    <div class="step-number">STEP 5</div>
                    <div class="step-title">Set up Identity Rules</div>
                    <div class="step-headline">Configure match and reconciliation rules for business entities</div>
                    <div class="sub-steps-summary">${step.completedSubSteps} out of ${step.totalSubSteps}</div>
                </div>
                <div class="expand-icon">▼</div>
            </div>
            <div class="step-detail-body">
                <div class="step-body-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            In this section we are going to review and optionally create new rules
                            that help link operational records to your business entities.
                        </div>

                        <button class="btn btn-secondary" data-substep="0">
                            Configure Match and Reconciliation Rules
                        </button>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox" data-substep="1" />
                            <div class="sub-step-content">
                                <div class="sub-step-label">Enable Identity Rules Schedule</div>
                            </div>
                        </div>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-left">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                    <div class="footer-right">
                        <button class="btn btn-primary next-step-btn">Next Step</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Step Detail 6: Validate Identity Data
function getStepDetail6() {
    const step = appState.steps[5];
    return `
        <div class="step-detail-panel" data-step-id="validate-identity">
            <div class="step-detail-header">
                <div class="step-header-left">
                    <div class="step-number">STEP 6</div>
                    <div class="step-title">Validate Identity Data</div>
                    <div class="step-headline">Inspect identity resolution results</div>
                    <div class="sub-steps-summary">${step.completedSubSteps} out of ${step.totalSubSteps}</div>
                </div>
                <div class="expand-icon">▼</div>
            </div>
            <div class="step-detail-body">
                <div class="step-body-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            After Identity Resolution has finished processing, use the following
                            sample data preview to inspect the data.
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox" data-substep="0" />
                            <div class="sub-step-content">
                                <div class="sub-step-label">Review identity resolution results</div>
                            </div>
                        </div>

                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Entity ID</th>
                                    <th>Matched Records</th>
                                    <th>Confidence Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>E-001</td>
                                    <td>3</td>
                                    <td>95%</td>
                                </tr>
                                <tr>
                                    <td>E-002</td>
                                    <td>2</td>
                                    <td>88%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-left">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                    <div class="footer-right">
                        <button class="btn btn-primary next-step-btn">Next Step</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Step Detail 7: Enable Sync to Informatica
function getStepDetail7() {
    const step = appState.steps[6];
    return `
        <div class="step-detail-panel" data-step-id="sync-informatica">
            <div class="step-detail-header">
                <div class="step-header-left">
                    <div class="step-number">STEP 7</div>
                    <div class="step-title">Enable Sync to Informatica</div>
                    <div class="step-headline">Share source records for enrichment and quality assurance</div>
                    <div class="sub-steps-summary">${step.completedSubSteps} out of ${step.totalSubSteps}</div>
                </div>
                <div class="expand-icon">▼</div>
            </div>
            <div class="step-detail-body">
                <div class="step-body-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            Enable sync to Informatica for Key-Rings that do not contain a business
                            entity. Share the source records for enrichment and quality assurance.
                        </div>

                        <button class="btn btn-secondary" data-substep="0">
                            Configure D360 Setup in Informatica
                        </button>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox" data-substep="1" />
                            <div class="sub-step-content">
                                <div class="sub-step-label">Mark as complete when sync is configured</div>
                            </div>
                        </div>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-left">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                    <div class="footer-right">
                        <button class="btn btn-primary next-step-btn">Next Step</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Step Detail 8: Setup Experiences
function getStepDetail8() {
    const step = appState.steps[7];
    return `
        <div class="step-detail-panel" data-step-id="setup-experiences">
            <div class="step-detail-header">
                <div class="step-header-left">
                    <div class="step-number">STEP 8</div>
                    <div class="step-title">Setup Experiences</div>
                    <div class="step-headline">Configure user experiences for Data 360</div>
                    <div class="sub-steps-summary">${step.completedSubSteps} out of ${step.totalSubSteps}</div>
                </div>
                <div class="expand-icon">▼</div>
            </div>
            <div class="step-detail-body">
                <div class="step-body-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            Configure enhanced user experiences to leverage your integrated business entities.
                        </div>

                        <div class="multi-column-steps">
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" data-substep="0" />
                                <div class="sub-step-content">
                                    <div class="sub-step-label">Search Before Create</div>
                                    <p style="font-size: 12px; color: #706e6b; margin-top: 0.25rem;">
                                        Prevent duplicate records from being created
                                    </p>
                                    <a href="#" class="link">View Trailhead for Setup</a>
                                </div>
                            </div>

                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" data-substep="1" />
                                <div class="sub-step-content">
                                    <div class="sub-step-label">Copy Field</div>
                                    <p style="font-size: 12px; color: #706e6b; margin-top: 0.25rem;">
                                        Enrich operational records with enterprise attributes
                                    </p>
                                    <a href="#" class="link">View Trailhead for Setup</a>
                                </div>
                            </div>

                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" data-substep="2" />
                                <div class="sub-step-content">
                                    <div class="sub-step-label">Related List</div>
                                    <p style="font-size: 12px; color: #706e6b; margin-top: 0.25rem;">
                                        Showcase information related to the primary entity
                                    </p>
                                    <a href="#" class="link">View Trailhead for Setup</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-left">
                        <a href="#" class="link">View Documentation</a>
                        <a href="#" class="link">Check out Tutorial</a>
                    </div>
                    <div class="footer-right">
                        <button class="btn btn-primary" disabled>Complete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize Integrate Page Events
function initializeIntegratePageEvents() {
    // Step summary collapse
    const summaryCollapseBtn = document.getElementById('summary-collapse-btn');
    const stepSummary = document.getElementById('step-summary');

    summaryCollapseBtn.addEventListener('click', () => {
        stepSummary.classList.toggle('collapsed');
    });

    // Step panel expand/collapse
    document.querySelectorAll('.step-detail-panel').forEach(panel => {
        const header = panel.querySelector('.step-detail-header');
        header.addEventListener('click', () => {
            panel.classList.toggle('expanded');
        });
    });

    // Next Step buttons
    document.querySelectorAll('.next-step-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentPanel = e.target.closest('.step-detail-panel');
            const nextPanel = currentPanel.nextElementSibling;

            if (nextPanel && nextPanel.classList.contains('step-detail-panel')) {
                currentPanel.classList.remove('expanded');
                nextPanel.classList.add('expanded');
                nextPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Checkbox handling
    document.querySelectorAll('.sub-step-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const panel = e.target.closest('.step-detail-panel');
            const stepId = panel.dataset.stepId;
            const substepIndex = parseInt(e.target.dataset.substep);

            updateStepProgress(stepId, substepIndex, e.target.checked);
        });
    });

    // Step 1: Validate Connection
    const validateBtn = document.getElementById('validate-connection-btn');
    if (validateBtn) {
        validateBtn.addEventListener('click', () => {
            validateConnection();
        });
    }

    // Step 2: Business Entity Picker
    const entityPicker = document.getElementById('business-entity-picker');
    if (entityPicker) {
        entityPicker.addEventListener('change', (e) => {
            if (e.target.value) {
                updateStepProgress('choose-entity', 0, true);
                updateStepStatus('choose-entity', 'completed');
            }
        });
    }

    // Step 3: Review Mappings Button
    const reviewMappingsBtn = document.getElementById('review-mappings-btn');
    if (reviewMappingsBtn) {
        reviewMappingsBtn.addEventListener('click', () => {
            updateStepProgress('review-mappings', 0, true);
            updateStepStatus('review-mappings', 'completed');
            alert('Mappings review page would open here (simulated)');
        });
    }

    // Input field tracking for Step 1
    document.querySelectorAll('#main-page-area .form-input, #main-page-area .form-select').forEach(input => {
        input.addEventListener('input', (e) => {
            const substep = e.target.dataset.substep;
            if (substep !== undefined) {
                const panel = e.target.closest('.step-detail-panel');
                const stepId = panel.dataset.stepId;
                if (e.target.value) {
                    updateStepProgress(stepId, parseInt(substep), true);
                }
            }
        });
    });
}

// Validate Connection (Step 1)
function validateConnection() {
    const spinner = document.getElementById('connection-spinner');
    const validation = document.getElementById('connection-validation');

    spinner.classList.add('show');
    validation.classList.remove('show');

    setTimeout(() => {
        spinner.classList.remove('show');
        validation.textContent = 'Connection successfully established!';
        validation.classList.add('success', 'show');

        updateStepProgress('connect-informatica', 4, true);
        updateStepStatus('connect-informatica', 'completed');
    }, 1500);
}

// Update Step Progress
function updateStepProgress(stepId, substepIndex, completed) {
    const stepIndex = appState.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return;

    const step = appState.steps[stepIndex];

    // Track completed substeps
    if (completed) {
        step.completedSubSteps = Math.min(step.completedSubSteps + 1, step.totalSubSteps);
    } else {
        step.completedSubSteps = Math.max(step.completedSubSteps - 1, 0);
    }

    // Update status
    if (step.completedSubSteps === 0) {
        step.status = 'not-started';
    } else if (step.completedSubSteps === step.totalSubSteps) {
        step.status = 'completed';
    } else {
        step.status = 'in-progress';
    }

    // Update UI
    updateStepSummaryUI(stepIndex);
    updateSubStepsSummary(stepId);
}

// Update Step Status
function updateStepStatus(stepId, status) {
    const stepIndex = appState.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return;

    appState.steps[stepIndex].status = status;
    updateStepSummaryUI(stepIndex);
}

// Update Step Summary UI
function updateStepSummaryUI(stepIndex) {
    const stepItems = document.querySelectorAll('.step-item');
    if (stepItems[stepIndex]) {
        const step = appState.steps[stepIndex];
        const iconElement = stepItems[stepIndex].querySelector('.step-status-icon');

        iconElement.className = `step-status-icon ${step.status}`;
        iconElement.textContent = getStatusIcon(step.status);
    }
}

// Update Sub Steps Summary
function updateSubStepsSummary(stepId) {
    const panel = document.querySelector(`[data-step-id="${stepId}"]`);
    if (panel) {
        const step = appState.steps.find(s => s.id === stepId);
        const summary = panel.querySelector('.sub-steps-summary');
        if (summary) {
            summary.textContent = `${step.completedSubSteps} out of ${step.totalSubSteps}`;
        }
    }
}
