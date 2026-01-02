// Page state management
const pageState = {
    currentPage: 'home-data-360',
    currentApp: 'Data 360',
    leftNavCollapsed: false,
    stepSummaryCollapsed: false,
    stepStatuses: {}
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
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
    const appPicker = document.getElementById('appPicker');
    const appPickerDropdown = document.getElementById('appPickerDropdown');
    const appLabel = document.getElementById('appLabel');

    appPicker.addEventListener('click', function(e) {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!appPicker.contains(e.target) && !appPickerDropdown.contains(e.target)) {
            appPickerDropdown.classList.remove('show');
        }
    });

    const appOptions = appPickerDropdown.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            appLabel.textContent = appName;
            
            // Update active state
            appOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            pageState.currentApp = appName;
            appPickerDropdown.classList.remove('show');
        });
    });
}

// Top Navigation Tabs
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Update active state
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            loadPage(page);
        });
    });
}

// Left Navigation
function setupLeftNavigation() {
    const navToggle = document.getElementById('navToggle');
    const leftNav = document.getElementById('leftNavigation');
    
    navToggle.addEventListener('click', function() {
        leftNav.classList.toggle('collapsed');
        pageState.leftNavCollapsed = !pageState.leftNavCollapsed;
    });

    const navItems = leftNav.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            loadPage(page);
        });
    });
}

// Page loading system
function loadPage(pageName) {
    const mainPageArea = document.getElementById('mainPageArea');
    pageState.currentPage = pageName;
    
    // Clear current content
    mainPageArea.innerHTML = '';
    
    // Load appropriate page
    switch(pageName) {
        case 'home-data-360':
            loadHomeData360Page(mainPageArea);
            break;
        case 'solution-manager':
            loadSolutionManagerPage(mainPageArea);
            break;
        case 'integrate-business-entities':
            loadIntegrateBusinessEntitiesPage(mainPageArea);
            break;
        case 'connect-unify':
        case 'govern-data':
        case 'process-content':
        case 'query-segment':
        case 'analyze-predict':
        case 'act-on-data':
        case 'build-share':
            loadPlaceholderPage(mainPageArea, pageName);
            break;
        default:
            loadPlaceholderPage(mainPageArea, pageName);
    }
}

function loadHomeData360Page(container) {
    container.innerHTML = `
        <div class="page home-data-360-page active">
            <div>Home - Data 360</div>
        </div>
    `;
}

function loadSolutionManagerPage(container) {
    container.innerHTML = `
        <div class="page solution-manager-page active">
            <div class="solution-manager-title">Solution Manager</div>
            <div class="tiles-container">
                <div class="tile" data-page="integrate-business-entities">
                    <div class="tile-title">Integrate Business Entities from Informatica in Data360</div>
                    <div class="tile-description">
                        Realize the full potential of the curated and enriched business entities from Informatica directly in D360. 
                        In this step by step guide, we will work though the steps required to operationalize business entities 
                        created in Informatica in D360
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add click handler for tile
    const tile = container.querySelector('.tile');
    tile.addEventListener('click', function() {
        loadPage('integrate-business-entities');
    });
}

function loadIntegrateBusinessEntitiesPage(container) {
    container.innerHTML = `
        <div class="page integrate-business-entities-page active">
            <div class="header-instructions">
                <div class="header-instructions-title">Integrate Business Entities from Informatica in Data360</div>
                <div class="header-instructions-description">
                    Realize the full potential of the curated and enriched business entities from Informatica directly in D360. 
                    In this step by step guide, we will work though the steps required to operationalize business entities 
                    created in Informatica in D360
                </div>
            </div>
            <div class="step-summary" id="stepSummary">
                <div class="step-summary-header">
                    <div class="step-summary-title">Steps</div>
                    <div class="step-summary-toggle" id="stepSummaryToggle">
                        <span>Collapse</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 14l5-5 5 5z"/>
                        </svg>
                    </div>
                </div>
                <div class="step-summary-content">
                    <div class="step-summary-item" data-step="0">
                        <div class="step-status-icon not-started" data-status="not-started"></div>
                        <div class="step-summary-label">Connect to Informatica System</div>
                    </div>
                    <div class="step-summary-item" data-step="1">
                        <div class="step-status-icon not-started" data-status="not-started"></div>
                        <div class="step-summary-label">Choose Business Entity</div>
                    </div>
                    <div class="step-summary-item" data-step="2">
                        <div class="step-status-icon not-started" data-status="not-started"></div>
                        <div class="step-summary-label">Review and Extend Mappings</div>
                    </div>
                    <div class="step-summary-item" data-step="3">
                        <div class="step-status-icon not-started" data-status="not-started"></div>
                        <div class="step-summary-label">Validate Connected data</div>
                    </div>
                    <div class="step-summary-item" data-step="4">
                        <div class="step-status-icon not-started" data-status="not-started"></div>
                        <div class="step-summary-label">Set up Identity Rules</div>
                    </div>
                    <div class="step-summary-item" data-step="5">
                        <div class="step-status-icon not-started" data-status="not-started"></div>
                        <div class="step-summary-label">Validate Identity Data</div>
                    </div>
                    <div class="step-summary-item" data-step="6">
                        <div class="step-status-icon not-started" data-status="not-started"></div>
                        <div class="step-summary-label">Enable sync to Informatica</div>
                    </div>
                    <div class="step-summary-item" data-step="7">
                        <div class="step-status-icon not-started" data-status="not-started"></div>
                        <div class="step-summary-label">Setup Experiences</div>
                    </div>
                </div>
            </div>
            <div class="steps-container" id="stepsContainer">
                ${generateStepPanels()}
            </div>
        </div>
    `;
    
    setupStepSummary();
    setupStepPanels();
}

function generateStepPanels() {
    const steps = [
        {
            title: "Connect to Informatica System",
            headline: "Establish trusted connection between D360 and Informatica tenants",
            instructions: [
                "Configure details for the Informatica tenant, so that a trusted connection between them can be provided. The important items are \"User-Name\" and \"Password\""
            ]
        },
        {
            title: "Choose Business Entity",
            headline: "Select the business entity to integrate",
            instructions: [
                "Navigate to the Informatica tenant",
                "Select the business entity you want to integrate",
                "Review the entity structure and attributes"
            ]
        },
        {
            title: "Review and Extend Mappings",
            headline: "Map Informatica entity fields to D360 fields",
            instructions: [
                "Review the default field mappings",
                "Extend mappings for additional fields as needed",
                "Verify mapping accuracy"
            ]
        },
        {
            title: "Validate Connected data",
            headline: "Ensure data quality and completeness",
            instructions: [
                "Run data validation checks",
                "Review validation results",
                "Address any data quality issues"
            ]
        },
        {
            title: "Set up Identity Rules",
            headline: "Configure identity matching rules",
            instructions: [
                "Define identity matching criteria",
                "Configure matching rules",
                "Set up confidence thresholds"
            ]
        },
        {
            title: "Validate Identity Data",
            headline: "Verify identity resolution accuracy",
            instructions: [
                "Run identity resolution",
                "Review resolved identities",
                "Validate match quality"
            ]
        },
        {
            title: "Enable sync to Informatica",
            headline: "Activate bidirectional synchronization",
            instructions: [
                "Configure sync settings",
                "Enable sync to Informatica",
                "Test sync functionality"
            ]
        },
        {
            title: "Setup Experiences",
            headline: "Configure user experiences",
            instructions: [
                "Enable \"Search Before Create\" - prevent duplicate records from being created",
                "Enable \"Copy field\" - enrich operational records with enterprise attributes",
                "Enable \"Related List\" - showcase any information related to the primary entity"
            ]
        }
    ];
    
    return steps.map((step, index) => `
        <div class="step-details-panel collapsed" data-step="${index}">
            <div class="step-details-header">
                <div class="step-details-header-content">
                    <div class="step-details-title">${step.title}</div>
                    <div class="step-details-headline">${step.headline}</div>
                </div>
                <div class="step-details-toggle">
                    <span>Expand</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                </div>
            </div>
            <div class="step-details-body">
                <ul class="instruction-list">
                    ${step.instructions.map(instruction => `
                        <li class="instruction-item">
                            <div class="instruction-checkbox" data-step="${index}"></div>
                            <div class="instruction-text">${instruction}</div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function setupStepSummary() {
    const stepSummaryToggle = document.getElementById('stepSummaryToggle');
    const stepSummary = document.getElementById('stepSummary');
    
    stepSummaryToggle.addEventListener('click', function() {
        stepSummary.classList.toggle('collapsed');
        const isCollapsed = stepSummary.classList.contains('collapsed');
        this.querySelector('span').textContent = isCollapsed ? 'Expand' : 'Collapse';
        
        // Update icon
        const icon = this.querySelector('svg');
        icon.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    });
    
    // Step summary item click handlers
    const stepItems = stepSummary.querySelectorAll('.step-summary-item');
    stepItems.forEach(item => {
        item.addEventListener('click', function() {
            const stepIndex = parseInt(this.getAttribute('data-step'));
            scrollToStep(stepIndex);
        });
    });
}

function setupStepPanels() {
    const stepPanels = document.querySelectorAll('.step-details-panel');
    
    stepPanels.forEach(panel => {
        const header = panel.querySelector('.step-details-header');
        const toggle = panel.querySelector('.step-details-toggle');
        
        header.addEventListener('click', function() {
            const isExpanded = panel.classList.contains('expanded');
            panel.classList.toggle('expanded');
            panel.classList.toggle('collapsed');
            
            toggle.querySelector('span').textContent = isExpanded ? 'Expand' : 'Collapse';
            
            // Update icon
            const icon = toggle.querySelector('svg');
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        });
        
        // Setup checkboxes
        const checkboxes = panel.querySelectorAll('.instruction-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('checked');
                updateStepStatus(panel);
            });
        });
    });
}

function updateStepStatus(panel) {
    const stepIndex = parseInt(panel.getAttribute('data-step'));
    const checkboxes = panel.querySelectorAll('.instruction-checkbox');
    const checkedCount = panel.querySelectorAll('.instruction-checkbox.checked').length;
    const totalCount = checkboxes.length;
    
    let status = 'not-started';
    if (checkedCount === totalCount && totalCount > 0) {
        status = 'completed';
    } else if (checkedCount > 0) {
        status = 'in-progress';
    }
    
    // Update step summary status
    const stepSummaryItem = document.querySelector(`.step-summary-item[data-step="${stepIndex}"]`);
    if (stepSummaryItem) {
        const statusIcon = stepSummaryItem.querySelector('.step-status-icon');
        statusIcon.className = `step-status-icon ${status}`;
        statusIcon.setAttribute('data-status', status);
    }
    
    pageState.stepStatuses[stepIndex] = status;
}

function scrollToStep(stepIndex) {
    const panel = document.querySelector(`.step-details-panel[data-step="${stepIndex}"]`);
    if (panel) {
        // Expand the panel if collapsed
        if (panel.classList.contains('collapsed')) {
            panel.classList.remove('collapsed');
            panel.classList.add('expanded');
            const toggle = panel.querySelector('.step-details-toggle');
            toggle.querySelector('span').textContent = 'Collapse';
            const icon = toggle.querySelector('svg');
            icon.style.transform = 'rotate(180deg)';
        }
        
        // Scroll to the panel
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function loadPlaceholderPage(container, pageName) {
    const pageLabels = {
        'connect-unify': 'Connect & Unify',
        'govern-data': 'Govern Data',
        'process-content': 'Process Content',
        'query-segment': 'Query & Segment',
        'analyze-predict': 'Analyze & Predict',
        'act-on-data': 'Act on Data',
        'build-share': 'Build & Share'
    };
    
    const label = pageLabels[pageName] || pageName;
    
    container.innerHTML = `
        <div class="page placeholder-page active">
            <div>${label} - Empty State</div>
        </div>
    `;
}

