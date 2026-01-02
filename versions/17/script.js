// Application State
const appState = {
    currentApp: 'Data-360',
    currentPage: 'home',
    currentLeftNav: null,
    leftNavCollapsed: false,
    stepSummaryCollapsed: false,
    expandedSteps: new Set(),
    stepStatus: {
        1: 'not-started',
        2: 'not-started',
        3: 'not-started',
        4: 'not-started',
        5: 'not-started',
        6: 'not-started',
        7: 'not-started'
    },
    subStepCompletion: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {}
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupAppPicker();
    setupNavigation();
    setupLeftNavigation();
    loadPage('home');
}

// App Picker Functionality
function setupAppPicker() {
    const appPickerIcon = document.getElementById('appPickerIcon');
    const appPickerDropdown = document.getElementById('appPickerDropdown');
    const appLabel = document.getElementById('appLabel');

    appPickerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!appPickerIcon.contains(e.target)) {
            appPickerDropdown.classList.remove('show');
        }
    });

    appPickerDropdown.querySelectorAll('.app-option').forEach(option => {
        option.addEventListener('click', () => {
            const appName = option.dataset.app;
            appState.currentApp = appName;
            appLabel.textContent = appName === 'Data-360' ? 'Data 360' : appName;
            
            // Update active state
            appPickerDropdown.querySelectorAll('.app-option').forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active');
            
            appPickerDropdown.classList.remove('show');
        });
    });
}

// Navigation Setup
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.dataset.page;
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadPage(page);
        });
    });
}

// Left Navigation Setup
function setupLeftNavigation() {
    const navToggle = document.getElementById('navToggle');
    const leftNav = document.getElementById('leftNavigation');
    const navItems = document.querySelectorAll('.nav-item');

    navToggle.addEventListener('click', () => {
        appState.leftNavCollapsed = !appState.leftNavCollapsed;
        leftNav.classList.toggle('collapsed', appState.leftNavCollapsed);
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            appState.currentLeftNav = page;
            loadPage(page);
        });
    });
}

// Page Loading
function loadPage(pageName) {
    appState.currentPage = pageName;
    const mainPageArea = document.getElementById('mainPageArea');
    
    switch(pageName) {
        case 'home':
            mainPageArea.innerHTML = getHomePageHTML();
            break;
        case 'solution-manager':
            mainPageArea.innerHTML = getSolutionManagerPageHTML();
            setupSolutionManager();
            break;
        case 'integrate-business-entities':
            mainPageArea.innerHTML = getIntegrateBusinessEntitiesPageHTML();
            setupIntegratePage();
            break;
        default:
            mainPageArea.innerHTML = getEmptyStatePageHTML(pageName);
    }
}

// Page HTML Generators
function getHomePageHTML() {
    return '<div class="home-page">Welcome to Data 360</div>';
}

function getSolutionManagerPageHTML() {
    return `
        <div class="solution-manager-page">
            <h1 class="solution-manager-title">Solution Manager</h1>
            <div class="tiles-container">
                <div class="tile" data-tile="integrate-business-entities">
                    <div class="tile-title">Integrate Business Entities from Informatica in Data360</div>
                    <div class="tile-description">Realize the full potential of the curated and enriched business entities from Informatica directly in D360.</div>
                    <div class="tile-extended-description">In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360</div>
                </div>
            </div>
        </div>
    `;
}

function getEmptyStatePageHTML(pageName) {
    const pageLabels = {
        'connect-unify': 'Connect & Unify',
        'govern-data': 'Govern Data',
        'process-content': 'Process Content',
        'query-segment': 'Query & Segment',
        'analyze-predict': 'Analyze & Predict',
        'act-on-data': 'Act on Data',
        'build-share': 'Build & Share'
    };
    
    return `<div class="empty-state-page">${pageLabels[pageName] || pageName} - Coming Soon</div>`;
}

function getIntegrateBusinessEntitiesPageHTML() {
    return `
        <div class="integrate-page">
            ${getHeaderInstructionsHTML()}
            ${getStepSummaryHTML()}
            ${getStepDetailsHTML(1, 'Connect to Informatica System', 'Establish trusted connection between D360 and Informatica tenants', getConnectToInformaticaStepContent())}
            ${getStepDetailsHTML(2, 'Choose Business Entity', 'Select Business from the connected tenant to integrate into Data 360', getChooseBusinessEntityStepContent())}
            ${getStepDetailsHTML(3, 'Review and Extend Mappings', 'Review the data objects identified from Informatica', getReviewMappingsStepContent())}
            ${getStepDetailsHTML(4, 'Validate Connected data and mappings', 'Preview sample data to validate correctness of mapping', getValidateDataStepContent())}
            ${getStepDetailsHTML(5, 'Set up Identity Rules', 'Review and optionally create new rules that help link operation records', getIdentityRulesStepContent())}
            ${getStepDetailsHTML(6, 'Validate Identity Data', 'Inspect the data after Identity Resolution has finished processing', getValidateIdentityStepContent())}
            ${getStepDetailsHTML(7, 'Enable sync to Informatica', 'Enable sync to Informatica for Key-Rings that do not contain a business entity', getEnableSyncStepContent())}
            ${getStepDetailsHTML(8, 'Setup Experiences', 'Configure experiences to enhance data operations', getSetupExperiencesStepContent())}
        </div>
    `;
}

function getHeaderInstructionsHTML() {
    return `
        <div class="header-instructions">
            <h1 class="header-instructions-title">Integrate Business Entities from Informatica in Data360</h1>
            <p class="header-instructions-description">
                Realize the full potential of the curated and enriched business entities from Informatica directly in D360. 
                In this step by step guide, we will work though the steps required to operationalize business entities 
                created in Informatica in D360
            </p>
        </div>
    `;
}

function getStepSummaryHTML() {
    const steps = [
        { num: 1, label: 'Connect to Informatica System' },
        { num: 2, label: 'Choose Business Entity' },
        { num: 3, label: 'Review and Extend Mappings' },
        { num: 4, label: 'Validate Connected data and mappings' },
        { num: 5, label: 'Set up Identity Rules' },
        { num: 6, label: 'Validate Identity Data' },
        { num: 7, label: 'Enable sync to Informatica' },
        { num: 8, label: 'Setup Experiences' }
    ];
    
    const stepsListHTML = steps.map(step => {
        const status = appState.stepStatus[step.num] || 'not-started';
        const statusIcon = getStatusIconHTML(status);
        return `
            <div class="step-summary-item">
                ${statusIcon}
                <span class="step-summary-label">${step.num}. ${step.label}</span>
            </div>
        `;
    }).join('');
    
    return `
        <div class="step-summary" id="stepSummary">
            <div class="step-summary-header">
                <h2 class="step-summary-title">Step Summary</h2>
                <div class="step-summary-toggle" id="stepSummaryToggle">
                    <i class="fas fa-chevron-up"></i>
                </div>
            </div>
            <div class="step-summary-content">
                <div class="steps-list">
                    ${stepsListHTML}
                </div>
                <div class="video-placeholder">
                    Video Tutorial Placeholder<br>
                    <a href="#" class="documentation-link">Link to documentation</a>
                </div>
            </div>
        </div>
    `;
}

function getStepDetailsHTML(stepNum, title, headline, content) {
    const status = appState.stepStatus[stepNum] || 'not-started';
    const isExpanded = appState.expandedSteps.has(stepNum);
    const subStepsCount = getSubStepsCount(stepNum);
    const completedCount = getCompletedSubStepsCount(stepNum);
    
    return `
        <div class="step-details ${isExpanded ? 'expanded' : 'collapsed'}" data-step="${stepNum}">
            <div class="step-details-header" onclick="toggleStepDetails(${stepNum})">
                <div class="step-details-header-left">
                    <div class="step-details-title">${stepNum}. ${title}</div>
                    <div class="step-details-headline">${headline}</div>
                    <div class="sub-steps-summary">${completedCount} out of ${subStepsCount}</div>
                </div>
                <div class="step-details-toggle">
                    <i class="fas fa-chevron-${isExpanded ? 'up' : 'down'}"></i>
                </div>
            </div>
            <div class="step-details-body">
                ${content}
            </div>
        </div>
    `;
}

// Step Content Generators
function getConnectToInformaticaStepContent() {
    return `
        <div class="step-details-content">
            <div class="step-details-left">
                <div class="step-description">
                    Configure details for the Informatica tenant, so that a trusted connection between them can be provided. 
                    The important items are "User-Name" and "Password"
                </div>
                <div class="form-group">
                    <label class="form-label">Name for the Connection or Choose Existing</label>
                    <select class="form-select" id="connectionName">
                        <option value="">Create New Connection</option>
                        <option value="existing1">Existing Connection 1</option>
                        <option value="existing2">Existing Connection 2</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Tenant URL</label>
                    <input type="text" class="form-input" id="tenantUrl" placeholder="https://tenant.informatica.com">
                </div>
                <div class="form-group">
                    <label class="form-label">User Name</label>
                    <input type="text" class="form-input" id="userName" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-input" id="password" placeholder="Enter password">
                </div>
                <button class="action-button" onclick="validateConnection()">Create & Validate</button>
                <div id="connectionStatus" style="margin-top: 16px; display: none;"></div>
            </div>
            <div class="step-details-right">
                <div class="action-buttons">
                    <a href="#" class="documentation-link">View Documentation</a>
                    <a href="#" class="documentation-link">Tutorial Link</a>
                </div>
            </div>
        </div>
        <div class="step-footer">
            <button class="view-documentation-button">View Documentation</button>
            <button class="next-step-button" onclick="goToNextStep(1)">Next Step</button>
        </div>
    `;
}

function getChooseBusinessEntityStepContent() {
    return `
        <div class="step-details-content">
            <div class="step-details-left">
                <div class="step-description">
                    Select Business from the connected tenant to integrate into Data 360
                </div>
                <div class="form-group">
                    <label class="form-label">Select Business Entity</label>
                    <select class="form-select" id="businessEntity" onchange="onBusinessEntitySelected()">
                        <option value="">-- Select --</option>
                        <option value="customer">Customer</option>
                        <option value="organization">Organization</option>
                        <option value="product">Product</option>
                        <option value="supplier">Supplier</option>
                    </select>
                </div>
            </div>
            <div class="step-details-right">
                <div class="action-buttons">
                    <a href="#" class="documentation-link">View Documentation</a>
                    <a href="#" class="documentation-link">Tutorial Link</a>
                </div>
            </div>
        </div>
        <div class="step-footer">
            <button class="view-documentation-button">View Documentation</button>
            <button class="next-step-button" onclick="goToNextStep(2)">Next Step</button>
        </div>
    `;
}

function getReviewMappingsStepContent() {
    return `
        <div class="step-details-content">
            <div class="step-details-left">
                <div class="step-description">
                    Based on selected business entities these are the data objects identified from informatica that are being synced to Data 360.
                </div>
                <div class="scrollable-list" id="mappingsList">
                    <div class="list-item">Customer_Table</div>
                    <div class="list-item">Customer_Address_Table</div>
                    <div class="list-item">Customer_Contact_Table</div>
                </div>
                <div class="notification">
                    <div class="notification-text">
                        We've detected extra fields beyond the standard. Below is the proposed list of modification to Salesforce's DMO to add placeholders for these values
                    </div>
                </div>
                <button class="action-button" onclick="reviewMappings()">Review Mappings</button>
            </div>
            <div class="step-details-right">
                <div class="action-buttons">
                    <a href="#" class="documentation-link">View Documentation</a>
                    <a href="#" class="documentation-link">Tutorial Link</a>
                </div>
            </div>
        </div>
        <div class="step-footer">
            <button class="view-documentation-button">View Documentation</button>
            <button class="next-step-button" onclick="goToNextStep(3)">Next Step</button>
        </div>
    `;
}

function getValidateDataStepContent() {
    return `
        <div class="step-details-content">
            <div class="step-details-left">
                <div class="step-description">
                    By Now we've integrated, mapped and transformed the Business Entities to the Standard Data Model, 
                    the following previews are based on sample data to help validate correctness of mapping and field value population
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Customer ID</td>
                            <td>CUST001</td>
                            <td>✓</td>
                        </tr>
                        <tr>
                            <td>Customer Name</td>
                            <td>Acme Corp</td>
                            <td>✓</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>contact@acme.com</td>
                            <td>✓</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="step-details-right">
                <div class="action-buttons">
                    <a href="#" class="documentation-link">View Documentation</a>
                    <a href="#" class="documentation-link">Tutorial Link</a>
                </div>
            </div>
        </div>
        <div class="step-footer">
            <button class="view-documentation-button">View Documentation</button>
            <button class="next-step-button" onclick="goToNextStep(4)">Next Step</button>
        </div>
    `;
}

function getIdentityRulesStepContent() {
    return `
        <div class="step-details-content">
            <div class="step-details-left">
                <div class="step-description">
                    In this section we are going to review and optionally create new rules that help link operation records to your business entities.
                </div>
                <div class="sub-step-item">
                    <input type="checkbox" class="sub-step-checkbox" data-step="5" data-substep="1" onchange="updateSubStep(5, 1, this.checked)">
                    <div class="sub-step-instructions">
                        Configure Match and Reconciliation Rules
                        <a href="#" class="sub-step-link">Configure Match and Reconciliation Rules</a>
                    </div>
                </div>
                <div class="sub-step-item">
                    <input type="checkbox" class="sub-step-checkbox" data-step="5" data-substep="2" onchange="updateSubStep(5, 2, this.checked)">
                    <div class="sub-step-instructions">
                        Enable Identity Rules Schedule
                    </div>
                </div>
            </div>
            <div class="step-details-right">
                <div class="action-buttons">
                    <a href="#" class="documentation-link">View Documentation</a>
                    <a href="#" class="documentation-link">Tutorial Link</a>
                </div>
            </div>
        </div>
        <div class="step-footer">
            <button class="view-documentation-button">View Documentation</button>
            <button class="next-step-button" onclick="goToNextStep(5)">Next Step</button>
        </div>
    `;
}

function getValidateIdentityStepContent() {
    return `
        <div class="step-details-content">
            <div class="step-details-left">
                <div class="step-description">
                    After Identity Resolution has finished processing use the following sample data preview to inspect the data
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Record ID</th>
                            <th>Matched Records</th>
                            <th>Confidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>REC001</td>
                            <td>3</td>
                            <td>95%</td>
                        </tr>
                        <tr>
                            <td>REC002</td>
                            <td>2</td>
                            <td>88%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="step-details-right">
                <div class="action-buttons">
                    <a href="#" class="documentation-link">View Documentation</a>
                    <a href="#" class="documentation-link">Tutorial Link</a>
                </div>
            </div>
        </div>
        <div class="step-footer">
            <button class="view-documentation-button">View Documentation</button>
            <button class="next-step-button" onclick="goToNextStep(6)">Next Step</button>
        </div>
    `;
}

function getEnableSyncStepContent() {
    return `
        <div class="step-details-content">
            <div class="step-details-left">
                <div class="step-description">
                    Enable sync to Informatica for Key-Rings that do not contain a business entity. 
                    Share the source records for enrichment and quality assurance.
                </div>
                <div class="sub-step-item">
                    <input type="checkbox" class="sub-step-checkbox" data-step="7" data-substep="1" onchange="updateSubStep(7, 1, this.checked)">
                    <div class="sub-step-instructions">
                        Configure D360 Setup in Informatica
                        <a href="#" class="sub-step-link">Configure D360 Setup</a>
                    </div>
                </div>
            </div>
            <div class="step-details-right">
                <div class="action-buttons">
                    <a href="#" class="documentation-link">View Documentation</a>
                    <a href="#" class="documentation-link">Tutorial Link</a>
                </div>
            </div>
        </div>
        <div class="step-footer">
            <button class="view-documentation-button">View Documentation</button>
            <button class="next-step-button" onclick="goToNextStep(7)">Next Step</button>
        </div>
    `;
}

function getSetupExperiencesStepContent() {
    return `
        <div class="step-details-content">
            <div class="step-details-left">
                <div class="step-description">
                    Configure experiences to enhance data operations
                </div>
                <div class="sub-step-item">
                    <input type="checkbox" class="sub-step-checkbox" data-step="8" data-substep="1" onchange="updateSubStep(8, 1, this.checked)">
                    <div class="sub-step-instructions">
                        "Search Before Create" - prevent duplicate records from being created.
                        <a href="#" class="sub-step-link">View Trailhead for Setup</a>
                    </div>
                </div>
                <div class="sub-step-item">
                    <input type="checkbox" class="sub-step-checkbox" data-step="8" data-substep="2" onchange="updateSubStep(8, 2, this.checked)">
                    <div class="sub-step-instructions">
                        "Copy field" - enrich operational records with enterprise attributes.
                        <a href="#" class="sub-step-link">View Trailhead for Setup</a>
                    </div>
                </div>
                <div class="sub-step-item">
                    <input type="checkbox" class="sub-step-checkbox" data-step="8" data-substep="3" onchange="updateSubStep(8, 3, this.checked)">
                    <div class="sub-step-instructions">
                        "Related List" - showcase any information related to the primary entity.
                        <a href="#" class="sub-step-link">View Trailhead for Setup</a>
                    </div>
                </div>
            </div>
            <div class="step-details-right">
                <div class="action-buttons">
                    <a href="#" class="documentation-link">View Documentation</a>
                    <a href="#" class="documentation-link">Tutorial Link</a>
                </div>
            </div>
        </div>
        <div class="step-footer">
            <button class="view-documentation-button">View Documentation</button>
        </div>
    `;
}

// Setup Functions
function setupSolutionManager() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const tileType = tile.dataset.tile;
            if (tileType === 'integrate-business-entities') {
                loadPage('integrate-business-entities');
            }
        });
    });
}

function setupIntegratePage() {
    // Setup step summary toggle
    const stepSummaryToggle = document.getElementById('stepSummaryToggle');
    if (stepSummaryToggle) {
        stepSummaryToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleStepSummary();
        });
    }
    
    // Restore expanded steps
    appState.expandedSteps.forEach(stepNum => {
        const stepElement = document.querySelector(`[data-step="${stepNum}"]`);
        if (stepElement) {
            stepElement.classList.add('expanded');
        }
    });
    
    // Restore checkbox states
    Object.keys(appState.subStepCompletion).forEach(stepNum => {
        Object.keys(appState.subStepCompletion[stepNum]).forEach(subStepNum => {
            if (appState.subStepCompletion[stepNum][subStepNum]) {
                const checkbox = document.querySelector(
                    `[data-step="${stepNum}"][data-substep="${subStepNum}"]`
                );
                if (checkbox) {
                    checkbox.checked = true;
                }
            }
        });
    });
}

// Step Management Functions
function toggleStepDetails(stepNum) {
    const stepElement = document.querySelector(`[data-step="${stepNum}"]`);
    if (!stepElement) return;
    
    const isExpanded = stepElement.classList.contains('expanded');
    const toggleIcon = stepElement.querySelector('.step-details-toggle i');
    
    if (isExpanded) {
        stepElement.classList.remove('expanded');
        appState.expandedSteps.delete(stepNum);
        if (toggleIcon) toggleIcon.className = 'fas fa-chevron-down';
    } else {
        stepElement.classList.add('expanded');
        appState.expandedSteps.add(stepNum);
        if (toggleIcon) toggleIcon.className = 'fas fa-chevron-up';
    }
    
    updateStepStatus(stepNum);
}

function toggleStepSummary() {
    const stepSummary = document.getElementById('stepSummary');
    if (!stepSummary) return;
    
    appState.stepSummaryCollapsed = !appState.stepSummaryCollapsed;
    stepSummary.classList.toggle('collapsed', appState.stepSummaryCollapsed);
    
    const toggleIcon = stepSummary.querySelector('#stepSummaryToggle i');
    if (toggleIcon) {
        toggleIcon.className = appState.stepSummaryCollapsed 
            ? 'fas fa-chevron-down' 
            : 'fas fa-chevron-up';
    }
}

function updateSubStep(stepNum, subStepNum, completed) {
    if (!appState.subStepCompletion[stepNum]) {
        appState.subStepCompletion[stepNum] = {};
    }
    appState.subStepCompletion[stepNum][subStepNum] = completed;
    updateStepStatus(stepNum);
    updateStepSummaryDisplay();
}

function updateStepStatus(stepNum) {
    const subSteps = appState.subStepCompletion[stepNum] || {};
    const subStepKeys = Object.keys(subSteps);
    const completedCount = subStepKeys.filter(key => subSteps[key]).length;
    const totalCount = subStepKeys.length;
    
    let status = 'not-started';
    if (completedCount > 0 && completedCount < totalCount) {
        status = 'in-progress';
    } else if (completedCount === totalCount && totalCount > 0) {
        status = 'completed';
    }
    
    appState.stepStatus[stepNum] = status;
    updateStepSummaryDisplay();
    updateStepDetailsDisplay(stepNum);
}

function updateStepSummaryDisplay() {
    const stepSummary = document.getElementById('stepSummary');
    if (!stepSummary) return;
    
    const stepsList = stepSummary.querySelector('.steps-list');
    if (!stepsList) return;
    
    const steps = [1, 2, 3, 4, 5, 6, 7, 8];
    const stepLabels = [
        'Connect to Informatica System',
        'Choose Business Entity',
        'Review and Extend Mappings',
        'Validate Connected data and mappings',
        'Set up Identity Rules',
        'Validate Identity Data',
        'Enable sync to Informatica',
        'Setup Experiences'
    ];
    
    stepsList.innerHTML = steps.map((stepNum, index) => {
        const status = appState.stepStatus[stepNum] || 'not-started';
        const statusIcon = getStatusIconHTML(status);
        return `
            <div class="step-summary-item">
                ${statusIcon}
                <span class="step-summary-label">${stepNum}. ${stepLabels[index]}</span>
            </div>
        `;
    }).join('');
}

function updateStepDetailsDisplay(stepNum) {
    const stepElement = document.querySelector(`[data-step="${stepNum}"]`);
    if (!stepElement) return;
    
    const subStepsSummary = stepElement.querySelector('.sub-steps-summary');
    if (subStepsSummary) {
        const subStepsCount = getSubStepsCount(stepNum);
        const completedCount = getCompletedSubStepsCount(stepNum);
        subStepsSummary.textContent = `${completedCount} out of ${subStepsCount}`;
    }
}

function getSubStepsCount(stepNum) {
    const stepElement = document.querySelector(`[data-step="${stepNum}"]`);
    if (!stepElement) return 0;
    
    const checkboxes = stepElement.querySelectorAll('.sub-step-checkbox');
    return checkboxes.length || 1; // Default to 1 if no checkboxes
}

function getCompletedSubStepsCount(stepNum) {
    const subSteps = appState.subStepCompletion[stepNum] || {};
    return Object.values(subSteps).filter(completed => completed).length;
}

function getStatusIconHTML(status) {
    const icons = {
        'not-started': '<i class="fas fa-circle" style="color: #706e6b;"></i>',
        'in-progress': '<i class="fas fa-clock" style="color: #ffb75d;"></i>',
        'completed': '<i class="fas fa-check-circle" style="color: #2e844a;"></i>'
    };
    return `<span class="step-status-icon ${status}">${icons[status] || icons['not-started']}</span>`;
}

// Action Functions
function validateConnection() {
    const statusDiv = document.getElementById('connectionStatus');
    if (!statusDiv) return;
    
    statusDiv.style.display = 'block';
    statusDiv.innerHTML = '<span class="spinner"></span> Validating connection...';
    
    setTimeout(() => {
        statusDiv.innerHTML = '<span style="color: #2e844a;">✓ Connection created successfully!</span>';
        updateStepStatus(1);
    }, 1500);
}

function onBusinessEntitySelected() {
    const select = document.getElementById('businessEntity');
    if (select && select.value) {
        updateStepStatus(2);
    }
}

function reviewMappings() {
    alert('Redirecting to Review Mappings page...');
    updateStepStatus(3);
}

function goToNextStep(currentStepNum) {
    const nextStepNum = currentStepNum + 1;
    const nextStepElement = document.querySelector(`[data-step="${nextStepNum}"]`);
    
    if (nextStepElement) {
        // Expand the next step if collapsed
        if (!appState.expandedSteps.has(nextStepNum)) {
            toggleStepDetails(nextStepNum);
        }
        
        // Scroll to the next step
        setTimeout(() => {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const stepHeader = nextStepElement.querySelector('.step-details-header');
            if (stepHeader) {
                const offsetTop = stepHeader.offsetTop - headerHeight - 20;
                document.querySelector('.main-page-area').scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}

// Make functions globally available
window.toggleStepDetails = toggleStepDetails;
window.updateSubStep = updateSubStep;
window.validateConnection = validateConnection;
window.onBusinessEntitySelected = onBusinessEntitySelected;
window.reviewMappings = reviewMappings;
window.goToNextStep = goToNextStep;

