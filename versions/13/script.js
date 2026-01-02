// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavCollapsed: false,
    stepSummaryCollapsed: false,
    stepStatuses: {
        'connect-informatica': 'not-started',
        'choose-business-entity': 'not-started',
        'review-mappings': 'not-started',
        'validate-data': 'not-started',
        'setup-identity': 'not-started',
        'validate-identity': 'not-started',
        'enable-sync': 'not-started',
        'setup-experiences': 'not-started'
    },
    stepCheckboxes: {}
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupAppPicker();
    setupNavigationTabs();
    setupLeftNavigation();
    loadPage('home');
}

// App Picker Dropdown
function setupAppPicker() {
    const appPicker = document.getElementById('app-picker');
    const appDropdown = document.getElementById('app-dropdown');
    const appLabel = document.getElementById('app-label');

    if (!appPicker || !appDropdown || !appLabel) return;

    appPicker.addEventListener('click', function(e) {
        e.stopPropagation();
        appDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function() {
        appDropdown.classList.remove('show');
    });

    appDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    const appOptions = appDropdown.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            appState.currentApp = appName;
            appLabel.textContent = appName;
            
            // Update active state
            appOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            appDropdown.classList.remove('show');
        });
    });
}

// Navigation Tabs
function setupNavigationTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            loadPage(page);
        });
    });
}

// Left Navigation
function setupLeftNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const leftNav = document.getElementById('left-navigation');
    
    if (navToggle && leftNav) {
        navToggle.addEventListener('click', function() {
            appState.leftNavCollapsed = !appState.leftNavCollapsed;
            leftNav.classList.toggle('collapsed');
        });
    }

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            loadPage(page);
        });
    });
}

// Page Loading
function loadPage(pageName) {
    appState.currentPage = pageName;
    const mainPageArea = document.getElementById('main-page-area');
    
    if (!mainPageArea) {
        console.error('main-page-area element not found!');
        return;
    }
    
    switch(pageName) {
        case 'home':
            mainPageArea.innerHTML = getHomePageHTML();
            break;
        case 'solution-manager':
            mainPageArea.innerHTML = getSolutionManagerPageHTML();
            setupSolutionManager();
            break;
        case 'connect-unify':
        case 'govern-data':
        case 'process-content':
        case 'query-segment':
        case 'analyze-predict':
        case 'act-on-data':
        case 'build-share':
            mainPageArea.innerHTML = getPlaceholderPageHTML(pageName);
            break;
        default:
            mainPageArea.innerHTML = getHomePageHTML();
    }
}

function getHomePageHTML() {
    return `
        <div class="home-page">
            <i class="fas fa-home"></i>
            <p>Home Data 360 Page</p>
        </div>
    `;
}

function getPlaceholderPageHTML(pageName) {
    const pageLabels = {
        'connect-unify': 'Connect & Unify',
        'govern-data': 'Govern Data',
        'process-content': 'Process Content',
        'query-segment': 'Query & Segment',
        'analyze-predict': 'Analyze & Predict',
        'act-on-data': 'Act on Data',
        'build-share': 'Build & Share'
    };
    
    return `
        <div class="placeholder-page">
            <i class="fas fa-folder-open"></i>
            <p>${pageLabels[pageName] || pageName}</p>
        </div>
    `;
}

function getSolutionManagerPageHTML() {
    return `
        <div class="solution-manager-page">
            <h1 class="solution-manager-title">Solution Manager</h1>
            <div class="tiles-container">
                <div class="tile" data-tile="integrate-business-entities">
                    <div class="tile-title">Integrate Business Entities from Informatica in Data360</div>
                    <div class="tile-description">
                        Realize the full potential of the curated and enriched business entities from Informatica directly in D360.
                    </div>
                    <div class="tile-extended-description">
                        In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupSolutionManager() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const tileType = this.getAttribute('data-tile');
            if (tileType === 'integrate-business-entities') {
                loadIntegrateBusinessEntitiesPage();
            }
        });
    });
}

function loadIntegrateBusinessEntitiesPage() {
    const mainPageArea = document.getElementById('main-page-area');
    if (!mainPageArea) return;
    
    mainPageArea.innerHTML = getIntegrateBusinessEntitiesPageHTML();
    setupIntegratePage();
    updateStepIcons();
}

function getIntegrateBusinessEntitiesPageHTML() {
    return `
        <div class="integrate-page">
            <div class="header-instructions">
                <h1 class="header-instructions-title">Integrate Business Entities from Informatica in Data360</h1>
                <p class="header-instructions-description">
                    Realize the full potential of the curated and enriched business entities from Informatica directly in D360.
                    In this step by step guide, we will work though the steps required to operationalize business entities 
                    created in Informatica in D360
                </p>
            </div>
            
            <div class="step-summary">
                <div class="step-summary-header">
                    <div class="step-summary-title">Step Summary</div>
                    <div class="step-summary-toggle">
                        <i class="fas fa-chevron-up"></i>
                    </div>
                </div>
                <div class="step-summary-content">
                    <div class="steps-list">
                        <div class="step-item" data-step="connect-informatica">
                            <div class="step-icon not-started"><i class="fas fa-circle"></i></div>
                            <div class="step-label">Connect to Informatica System</div>
                        </div>
                        <div class="step-item" data-step="choose-business-entity">
                            <div class="step-icon not-started"><i class="fas fa-circle"></i></div>
                            <div class="step-label">Choose Business Entity</div>
                        </div>
                        <div class="step-item" data-step="review-mappings">
                            <div class="step-icon not-started"><i class="fas fa-circle"></i></div>
                            <div class="step-label">Review and Extend Mappings</div>
                        </div>
                        <div class="step-item" data-step="validate-data">
                            <div class="step-icon not-started"><i class="fas fa-circle"></i></div>
                            <div class="step-label">Validate Connected data and mappings</div>
                        </div>
                        <div class="step-item" data-step="setup-identity">
                            <div class="step-icon not-started"><i class="fas fa-circle"></i></div>
                            <div class="step-label">Set up Identity Rules</div>
                        </div>
                        <div class="step-item" data-step="validate-identity">
                            <div class="step-icon not-started"><i class="fas fa-circle"></i></div>
                            <div class="step-label">Validate Identity Data</div>
                        </div>
                        <div class="step-item" data-step="enable-sync">
                            <div class="step-icon not-started"><i class="fas fa-circle"></i></div>
                            <div class="step-label">Enable sync to Informatica</div>
                        </div>
                        <div class="step-item" data-step="setup-experiences">
                            <div class="step-icon not-started"><i class="fas fa-circle"></i></div>
                            <div class="step-label">Setup Experiences</div>
                        </div>
                    </div>
                    <div class="video-placeholder">
                        Video Tutorial Placeholder
                    </div>
                </div>
            </div>
            
            <div class="step-details-container">
                ${getStepDetailsHTML('connect-informatica', 'Connect to Informatica System', 
                    'Establish trusted connection between D360 and Informatica tenants', 
                    getConnectInformaticaBody())}
                
                ${getStepDetailsHTML('choose-business-entity', 'Choose Business Entity', 
                    'Select Business from the connected tenant to integrate into Data 360', 
                    getChooseBusinessEntityBody())}
                
                ${getStepDetailsHTML('review-mappings', 'Review and Extend Mappings', 
                    'Review the data objects identified from Informatica', 
                    getReviewMappingsBody())}
                
                ${getStepDetailsHTML('validate-data', 'Validate Connected data and mappings', 
                    'Preview sample data to validate correctness of mapping', 
                    getValidateDataBody())}
                
                ${getStepDetailsHTML('setup-identity', 'Set up Identity Rules', 
                    'Review and optionally create new rules that help link operation records to your business entities', 
                    getSetupIdentityBody())}
                
                ${getStepDetailsHTML('validate-identity', 'Validate Identity Data', 
                    'Inspect the data after Identity Resolution has finished processing', 
                    getValidateIdentityBody())}
                
                ${getStepDetailsHTML('enable-sync', 'Enable sync to Informatica', 
                    'Enable sync to Informatica for Key-Rings that do not contain a business entity', 
                    getEnableSyncBody())}
                
                ${getStepDetailsHTML('setup-experiences', 'Setup Experiences', 
                    'Configure experiences to utilize the integrated business entities', 
                    getSetupExperiencesBody())}
            </div>
        </div>
    `;
}

function getStepDetailsHTML(stepId, title, headline, bodyContent) {
    return `
        <div class="step-details-panel collapsed" data-step="${stepId}">
            <div class="step-details-header">
                <div class="step-details-header-content">
                    <div class="step-details-title">${title}</div>
                    <div class="step-details-headline">${headline}</div>
                </div>
                <div class="step-details-toggle">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="step-details-body">
                ${bodyContent}
            </div>
        </div>
    `;
}

function getConnectInformaticaBody() {
    return `
        <div class="step-objective">
            Configure details for the Informatica tenant, so that a trusted connection between them can be provided.
            The important items are "User-Name" and "Password"
        </div>
        <ul class="step-instructions-list">
            <li class="step-instruction-item">
                <input type="checkbox" class="step-checkbox" data-step="connect-informatica" data-substep="1">
                <div class="step-instruction-content">
                    <div class="step-instruction-text">Substep-1: Provide Tenant URL</div>
                </div>
            </li>
            <li class="step-instruction-item">
                <input type="checkbox" class="step-checkbox" data-step="connect-informatica" data-substep="2">
                <div class="step-instruction-content">
                    <div class="step-instruction-text">Substep-2: Provide UserName / Password</div>
                </div>
            </li>
        </ul>
    `;
}

function getChooseBusinessEntityBody() {
    return `
        <div class="step-objective">
            Select Business from the connected tenant to integrate into Data 360
        </div>
        <div style="margin: 20px 0;">
            <select class="step-picker" id="business-entity-picker">
                <option value="">Select a business entity...</option>
                <option value="customer">Customer</option>
                <option value="organization">Organization</option>
                <option value="product">Product</option>
                <option value="supplier">Supplier</option>
            </select>
        </div>
        <div class="step-instruction-links" style="justify-content: flex-end; margin-top: 10px;">
            <a href="#" class="step-instruction-link">Documentation</a>
            <a href="#" class="step-instruction-link">Tutorial</a>
        </div>
    `;
}

function getReviewMappingsBody() {
    return `
        <div class="step-objective">
            Based on selected business entities these are the data objects identified from Informatica that are being synced to Data 360.
        </div>
        <div class="step-notification">
            We've detected extra fields beyond the standard. Below is the proposed list of modification to Salesforce's DMO to add placeholders for these values
        </div>
        <div class="step-table-list" id="mappings-table-list">
            <div class="step-table-item">Table 1: Customer_Base</div>
            <div class="step-table-item">Table 2: Customer_Extended</div>
            <div class="step-table-item">Table 3: Customer_Relations</div>
        </div>
        <div class="step-actions">
            <button class="step-action-button">Review Mappings</button>
        </div>
    `;
}

function getValidateDataBody() {
    return `
        <div class="step-objective">
            By Now we've integrated, mapped and transformed the Business Entities to the Standard Data Model, 
            the following previews are based on sample data to help validate correctness of mapping and field value population
        </div>
        <div class="step-validation">
            Validation criteria: Review the sample data preview to ensure mappings are correct
        </div>
    `;
}

function getSetupIdentityBody() {
    return `
        <div class="step-objective">
            In this section we are going to review and optionally create new rules that help link operation records to your business entities.
        </div>
        <div class="step-actions">
            <button class="step-action-button">Configure Match and Reconciliation Rules</button>
        </div>
        <ul class="step-instructions-list">
            <li class="step-instruction-item">
                <input type="checkbox" class="step-checkbox" data-step="setup-identity" data-substep="1">
                <div class="step-instruction-content">
                    <div class="step-instruction-text">Enable Identity Rules Schedule</div>
                </div>
            </li>
        </ul>
    `;
}

function getValidateIdentityBody() {
    return `
        <div class="step-objective">
            After Identity Resolution has finished processing use the following sample data preview to inspect the data
        </div>
        <div class="step-validation">
            Validation criteria: Review the identity resolution results
        </div>
    `;
}

function getEnableSyncBody() {
    return `
        <div class="step-objective">
            Enable sync to Informatica for Key-Rings that do not contain a business entity. 
            Share the source records for enrichment and quality assurance.
        </div>
        <div class="step-actions">
            <button class="step-action-button">Configure D360 Setup in Informatica</button>
        </div>
        <ul class="step-instructions-list">
            <li class="step-instruction-item">
                <input type="checkbox" class="step-checkbox" data-step="enable-sync" data-substep="1">
                <div class="step-instruction-content">
                    <div class="step-instruction-text">Mark manually as complete when done</div>
                </div>
            </li>
        </ul>
    `;
}

function getSetupExperiencesBody() {
    return `
        <div class="step-objective">
            Configure experiences to utilize the integrated business entities
        </div>
        <ul class="step-instructions-list">
            <li class="step-instruction-item">
                <input type="checkbox" class="step-checkbox" data-step="setup-experiences" data-substep="1">
                <div class="step-instruction-content">
                    <div class="step-instruction-text">Substep-1: "Search Before Create" - prevent duplicate records from being created.</div>
                    <div class="step-instruction-links">
                        <a href="#" class="step-instruction-link">View Trailhead for Setup</a>
                        <a href="#" class="step-instruction-link">Documentation</a>
                        <a href="#" class="step-instruction-link">Tutorial</a>
                    </div>
                </div>
            </li>
            <li class="step-instruction-item">
                <input type="checkbox" class="step-checkbox" data-step="setup-experiences" data-substep="2">
                <div class="step-instruction-content">
                    <div class="step-instruction-text">Substep-2: "Copy field" - enrich operational records with enterprise attributes.</div>
                    <div class="step-instruction-links">
                        <a href="#" class="step-instruction-link">View Trailhead for Setup</a>
                        <a href="#" class="step-instruction-link">Documentation</a>
                        <a href="#" class="step-instruction-link">Tutorial</a>
                    </div>
                </div>
            </li>
            <li class="step-instruction-item">
                <input type="checkbox" class="step-checkbox" data-step="setup-experiences" data-substep="3">
                <div class="step-instruction-content">
                    <div class="step-instruction-text">Substep-3: "Related List" - showcase any information related to the primary entity.</div>
                    <div class="step-instruction-links">
                        <a href="#" class="step-instruction-link">View Trailhead for Setup</a>
                        <a href="#" class="step-instruction-link">Documentation</a>
                        <a href="#" class="step-instruction-link">Tutorial</a>
                    </div>
                </div>
            </li>
        </ul>
    `;
}

function setupIntegratePage() {
    // Setup step summary toggle
    const stepSummaryHeader = document.querySelector('.step-summary-header');
    if (stepSummaryHeader) {
        stepSummaryHeader.addEventListener('click', function() {
            const stepSummary = document.querySelector('.step-summary');
            appState.stepSummaryCollapsed = !appState.stepSummaryCollapsed;
            stepSummary.classList.toggle('collapsed');
        });
    }

    // Setup step details panels
    const stepPanels = document.querySelectorAll('.step-details-panel');
    stepPanels.forEach(panel => {
        const header = panel.querySelector('.step-details-header');
        if (header) {
            header.addEventListener('click', function() {
                const isExpanded = panel.classList.contains('expanded');
                panel.classList.toggle('collapsed');
                panel.classList.toggle('expanded');
                
                const toggleIcon = panel.querySelector('.step-details-toggle i');
                if (toggleIcon) {
                    if (isExpanded) {
                        toggleIcon.className = 'fas fa-chevron-down';
                    } else {
                        toggleIcon.className = 'fas fa-chevron-up';
                    }
                }
            });
        }
    });

    // Setup step items in summary to scroll to panels
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        item.addEventListener('click', function() {
            const stepId = this.getAttribute('data-step');
            const panel = document.querySelector(`.step-details-panel[data-step="${stepId}"]`);
            if (panel) {
                panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (panel.classList.contains('collapsed')) {
                    panel.classList.remove('collapsed');
                    panel.classList.add('expanded');
                    const toggleIcon = panel.querySelector('.step-details-toggle i');
                    if (toggleIcon) {
                        toggleIcon.className = 'fas fa-chevron-up';
                    }
                }
            }
        });
    });

    // Setup checkboxes
    setupStepCheckboxes();

    // Setup business entity picker
    const businessEntityPicker = document.getElementById('business-entity-picker');
    if (businessEntityPicker) {
        businessEntityPicker.addEventListener('change', function() {
            if (this.value) {
                updateStepStatus('choose-business-entity', 'completed');
            }
        });
    }
}

function setupStepCheckboxes() {
    const checkboxes = document.querySelectorAll('.step-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const stepId = this.getAttribute('data-step');
            const substep = this.getAttribute('data-substep');
            const key = `${stepId}-${substep}`;
            
            if (this.checked) {
                appState.stepCheckboxes[key] = true;
            } else {
                delete appState.stepCheckboxes[key];
            }
            
            updateStepStatusFromCheckboxes(stepId);
        });
    });
}

function updateStepStatusFromCheckboxes(stepId) {
    const stepCheckboxes = document.querySelectorAll(`.step-checkbox[data-step="${stepId}"]`);
    const checkedCount = Array.from(stepCheckboxes).filter(cb => cb.checked).length;
    const totalCount = stepCheckboxes.length;
    
    if (checkedCount === 0) {
        updateStepStatus(stepId, 'not-started');
    } else if (checkedCount === totalCount) {
        updateStepStatus(stepId, 'completed');
    } else {
        updateStepStatus(stepId, 'in-progress');
    }
}

function updateStepStatus(stepId, status) {
    appState.stepStatuses[stepId] = status;
    updateStepIcons();
}

function updateStepIcons() {
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        const stepId = item.getAttribute('data-step');
        const status = appState.stepStatuses[stepId] || 'not-started';
        const icon = item.querySelector('.step-icon');
        
        if (icon) {
            icon.className = `step-icon ${status}`;
            
            let iconClass = 'fas fa-circle';
            if (status === 'completed') {
                iconClass = 'fas fa-check';
            } else if (status === 'in-progress') {
                iconClass = 'fas fa-clock';
            }
            
            icon.innerHTML = `<i class="${iconClass}"></i>`;
        }
    });
}

