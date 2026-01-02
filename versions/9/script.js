// Application state
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home-data-360',
    leftNavCollapsed: false,
    stepSummaryCollapsed: false,
    stepStatuses: {
        'connect-informatica': 'not-started',
        'choose-business-entity': 'not-started',
        'review-extend-mappings': 'not-started',
        'validate-connected-data': 'not-started',
        'set-up-identity-rules': 'not-started',
        'validate-identity-data': 'not-started',
        'enable-sync': 'not-started'
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
    loadPage('home-data-360');
}

// App Picker functionality
function setupAppPicker() {
    const appPickerIcon = document.getElementById('appPickerIcon');
    const appPickerDropdown = document.getElementById('appPickerDropdown');
    const appLabel = document.getElementById('appLabel');

    appPickerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!appPickerIcon.contains(e.target) && !appPickerDropdown.contains(e.target)) {
            appPickerDropdown.classList.remove('show');
        }
    });

    const appOptions = document.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', () => {
            const appName = option.getAttribute('data-app');
            appState.currentApp = appName;
            appLabel.textContent = appName;
            
            // Update active state
            appOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update navigation menu based on app
            updateNavigationMenu(appName);
            
            appPickerDropdown.classList.remove('show');
        });
    });
}

function updateNavigationMenu(appName) {
    const navMenu = document.getElementById('navigationMenu');
    navMenu.innerHTML = '';
    
    if (appName === 'Data 360') {
        navMenu.innerHTML = `
            <span class="nav-tab active" data-page="home-data-360">Home</span>
            <span class="nav-tab" data-page="solution-manager">Solution Manager</span>
        `;
    } else {
        navMenu.innerHTML = '<span class="nav-tab active">Home</span>';
    }
    
    setupNavigation();
}

// Navigation functionality
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.getAttribute('data-page');
            if (page) {
                navTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                loadPage(page);
            }
        });
    });

    const appIcons = document.querySelectorAll('.app-icon');
    appIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const page = icon.getAttribute('data-page');
            if (page) {
                loadPage(page);
            }
        });
    });
}

// Left Navigation functionality
function setupLeftNavigation() {
    const navToggle = document.getElementById('navToggle');
    const leftNav = document.getElementById('leftNavigation');
    
    navToggle.addEventListener('click', () => {
        leftNav.classList.toggle('collapsed');
        appState.leftNavCollapsed = !appState.leftNavCollapsed;
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page) {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                loadPage(page);
            }
        });
    });
}

// Page loading functionality
function loadPage(pageName) {
    appState.currentPage = pageName;
    const mainPageArea = document.getElementById('mainPageArea');
    
    switch(pageName) {
        case 'home-data-360':
            mainPageArea.innerHTML = createHomeData360Page();
            break;
        case 'solution-manager':
            mainPageArea.innerHTML = createSolutionManagerPage();
            break;
        case 'integrate-business-entities':
            mainPageArea.innerHTML = createIntegrateBusinessEntitiesPage();
            setupIntegrateBusinessEntitiesPage();
            break;
        case 'connect-unify':
        case 'govern-data':
        case 'process-content':
        case 'query-segment':
        case 'analyze-predict':
        case 'act-on-data':
        case 'build-share':
            mainPageArea.innerHTML = createPlaceholderPage(pageName);
            break;
        default:
            mainPageArea.innerHTML = createPlaceholderPage('default');
    }
    
    // Scroll to top
    mainPageArea.scrollTop = 0;
}

function createHomeData360Page() {
    return '<div class="page-placeholder">Home - Data 360</div>';
}

function createPlaceholderPage(pageName) {
    const pageLabels = {
        'connect-unify': 'Connect & Unify',
        'govern-data': 'Govern Data',
        'process-content': 'Process Content',
        'query-segment': 'Query & Segment',
        'analyze-predict': 'Analyze & Predict',
        'act-on-data': 'Act on Data',
        'build-share': 'Build & Share'
    };
    
    const label = pageLabels[pageName] || 'Page';
    return `<div class="page-placeholder">${label} - Empty State</div>`;
}

function createSolutionManagerPage() {
    return `
        <div class="solution-manager-page">
            <h1>Solution Manager</h1>
            <div class="tile-list">
                <div class="tile-template" data-page="integrate-business-entities">
                    <div class="tile-title">Integrate Business Entities from Informatica in Data360</div>
                    <div class="tile-description">Realize the full potential of the curated and enriched business entities from Informatica directly in D360.</div>
                    <div class="tile-extended-description">In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360</div>
                </div>
            </div>
        </div>
    `;
}

function createIntegrateBusinessEntitiesPage() {
    return `
        <div class="integrate-business-entities-page">
            <div class="header-instructions">
                <div class="header-instructions-title">Integrate Business Entities from Informatica in Data360</div>
                <div class="header-instructions-description">
                    Realize the full potential of the curated and enriched business entities from Informatica directly in D360. 
                    In this step by step guide, we will work though the steps required to operationalize business entities 
                    created in Informatica in D360.
                </div>
            </div>
            
            <div class="step-summary" id="stepSummary">
                <div class="step-summary-header" id="stepSummaryHeader">
                    <span class="step-summary-toggle">▼</span>
                    <span class="step-summary-title">Step Summary</span>
                </div>
                <div class="step-summary-content">
                    <div class="step-summary-item" data-step="connect-informatica">
                        <span class="step-status-icon not-started" id="status-connect-informatica">○</span>
                        <span class="step-summary-label">Connect to Informatica System</span>
                    </div>
                    <div class="step-summary-item" data-step="choose-business-entity">
                        <span class="step-status-icon not-started" id="status-choose-business-entity">○</span>
                        <span class="step-summary-label">Choose Business Entity</span>
                    </div>
                    <div class="step-summary-item" data-step="review-extend-mappings">
                        <span class="step-status-icon not-started" id="status-review-extend-mappings">○</span>
                        <span class="step-summary-label">Review and Extend Mappings</span>
                    </div>
                    <div class="step-summary-item" data-step="validate-connected-data">
                        <span class="step-status-icon not-started" id="status-validate-connected-data">○</span>
                        <span class="step-summary-label">Validate Connected data</span>
                    </div>
                    <div class="step-summary-item" data-step="set-up-identity-rules">
                        <span class="step-status-icon not-started" id="status-set-up-identity-rules">○</span>
                        <span class="step-summary-label">Set up Identity Rules</span>
                    </div>
                    <div class="step-summary-item" data-step="validate-identity-data">
                        <span class="step-status-icon not-started" id="status-validate-identity-data">○</span>
                        <span class="step-summary-label">Validate Identity Data</span>
                    </div>
                    <div class="step-summary-item" data-step="enable-sync">
                        <span class="step-status-icon not-started" id="status-enable-sync">○</span>
                        <span class="step-summary-label">Enable sync to Informatica</span>
                    </div>
                </div>
            </div>
            
            <div class="step-details-container" id="stepDetailsContainer">
                ${createStepDetails('connect-informatica', 
                    'Connect to Informatica System',
                    'Establish trusted connection between D360 and Informatica tenants',
                    [
                        'Configure details for the Informatica tenant, so that a trusted connection between them can be provided. The important items are "User-Name" and "Password"'
                    ])}
                ${createStepDetails('choose-business-entity',
                    'Choose Business Entity',
                    'Select the business entity to integrate',
                    [
                        'Navigate to the business entity selection page',
                        'Choose the appropriate business entity from the list',
                        'Review entity details and confirm selection'
                    ])}
                ${createStepDetails('review-extend-mappings',
                    'Review and Extend Mappings',
                    'Configure field mappings between systems',
                    [
                        'Review default field mappings',
                        'Extend mappings for additional fields',
                        'Validate mapping configuration'
                    ])}
                ${createStepDetails('validate-connected-data',
                    'Validate Connected data',
                    'Verify data connection and integrity',
                    [
                        'Run connection test',
                        'Validate data sample',
                        'Review connection status'
                    ])}
                ${createStepDetails('set-up-identity-rules',
                    'Set up Identity Rules',
                    'Configure identity matching rules',
                    [
                        'Define identity matching criteria',
                        'Configure matching rules',
                        'Test identity matching logic'
                    ])}
                ${createStepDetails('validate-identity-data',
                    'Validate Identity Data',
                    'Verify identity data quality',
                    [
                        'Run identity validation',
                        'Review identity matches',
                        'Resolve any identity conflicts'
                    ])}
                ${createStepDetails('enable-sync',
                    'Enable sync to Informatica',
                    'Activate synchronization between systems',
                    [
                        'Configure sync schedule',
                        'Enable bidirectional sync',
                        'Monitor sync status'
                    ])}
            </div>
        </div>
    `;
}

function createStepDetails(stepId, title, headline, instructions) {
    const instructionItems = instructions.map((instruction, index) => `
        <li class="step-instruction-item" data-step="${stepId}" data-instruction="${index}">
            <input type="checkbox" class="step-checkbox" id="checkbox-${stepId}-${index}">
            <span class="step-instruction-text">${instruction}</span>
        </li>
    `).join('');
    
    return `
        <div class="step-details-template collapsed" id="step-${stepId}" data-step="${stepId}">
            <div class="step-details-header">
                <span class="step-details-toggle">▶</span>
                <div class="step-details-title-section">
                    <div class="step-details-title">${title}</div>
                    <div class="step-details-headline">${headline}</div>
                </div>
            </div>
            <div class="step-details-body">
                <ul class="step-instruction-list">
                    ${instructionItems}
                </ul>
            </div>
        </div>
    `;
}

function setupIntegrateBusinessEntitiesPage() {
    // Step Summary toggle
    const stepSummary = document.getElementById('stepSummary');
    const stepSummaryHeader = document.getElementById('stepSummaryHeader');
    
    stepSummaryHeader.addEventListener('click', () => {
        stepSummary.classList.toggle('collapsed');
        appState.stepSummaryCollapsed = !appState.stepSummaryCollapsed;
    });
    
    // Step Details toggles
    const stepDetails = document.querySelectorAll('.step-details-template');
    stepDetails.forEach(step => {
        const header = step.querySelector('.step-details-header');
        header.addEventListener('click', () => {
            step.classList.toggle('expanded');
            step.classList.toggle('collapsed');
        });
    });
    
    // Checkbox functionality
    const checkboxes = document.querySelectorAll('.step-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const instructionItem = checkbox.closest('.step-instruction-item');
            const stepId = instructionItem.getAttribute('data-step');
            
            if (checkbox.checked) {
                instructionItem.classList.add('completed');
            } else {
                instructionItem.classList.remove('completed');
            }
            
            updateStepStatus(stepId);
        });
    });
    
    // Step Summary item clicks
    const stepSummaryItems = document.querySelectorAll('.step-summary-item');
    stepSummaryItems.forEach(item => {
        item.addEventListener('click', () => {
            const stepId = item.getAttribute('data-step');
            const stepElement = document.getElementById(`step-${stepId}`);
            if (stepElement) {
                stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (stepElement.classList.contains('collapsed')) {
                    stepElement.classList.remove('collapsed');
                    stepElement.classList.add('expanded');
                }
            }
        });
    });
    
    // Tile click handler for Solution Manager
    const tiles = document.querySelectorAll('.tile-template');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const page = tile.getAttribute('data-page');
            if (page) {
                loadPage(page);
            }
        });
    });
}

function updateStepStatus(stepId) {
    const stepElement = document.getElementById(`step-${stepId}`);
    if (!stepElement) return;
    
    const checkboxes = stepElement.querySelectorAll('.step-checkbox');
    const checkedBoxes = stepElement.querySelectorAll('.step-checkbox:checked');
    
    let status = 'not-started';
    if (checkedBoxes.length === 0) {
        status = 'not-started';
    } else if (checkedBoxes.length === checkboxes.length) {
        status = 'completed';
    } else {
        status = 'in-progress';
    }
    
    appState.stepStatuses[stepId] = status;
    
    // Update status icon
    const statusIcon = document.getElementById(`status-${stepId}`);
    if (statusIcon) {
        statusIcon.className = `step-status-icon ${status}`;
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

