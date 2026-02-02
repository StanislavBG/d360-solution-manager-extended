// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    navExpanded: true,
    stepSummaryExpanded: true,
    stepStates: {},
    subStepStates: {}
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadPage('home');
}

// Event Listeners Setup
function setupEventListeners() {
    // App picker dropdown
    const appPickerBtn = document.getElementById('app-picker-icon');
    const appDropdown = document.getElementById('app-dropdown');

    appPickerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        appDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        appDropdown.classList.add('hidden');
    });

    // App selection
    const appOptions = document.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            selectApp(appName);
        });
    });

    // Navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            loadPage(page);
        });
    });

    // Left navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    navToggle.addEventListener('click', toggleNavigation);

    // Left navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });
}

function selectApp(appName) {
    appState.currentApp = appName;
    document.getElementById('app-label').textContent = appName;

    // Update selected state in dropdown
    const appOptions = document.querySelectorAll('.app-option');
    appOptions.forEach(opt => {
        if (opt.getAttribute('data-app') === appName) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
}

function toggleNavigation() {
    const leftNav = document.getElementById('left-navigation');
    appState.navExpanded = !appState.navExpanded;

    if (appState.navExpanded) {
        leftNav.classList.remove('collapsed');
        leftNav.classList.add('expanded');
    } else {
        leftNav.classList.add('collapsed');
        leftNav.classList.remove('expanded');
    }
}

// Page Loading
function loadPage(pageName) {
    appState.currentPage = pageName;
    const pageArea = document.getElementById('page-area');

    switch(pageName) {
        case 'home':
            pageArea.innerHTML = '<div class="empty-state">Welcome to Data 360</div>';
            break;
        case 'solution-manager':
            loadSolutionManagerPage();
            break;
        case 'df-integrate':
            loadDFIntegratePage();
            break;
        case '262-integrate':
            load262IntegratePage();
            break;
        case 'customer-households':
            loadCustomerHouseholdsPage();
            break;
        case 'connect-unify':
        case 'govern-data':
        case 'process-content':
        case 'query-segment':
        case 'analyze-predict':
        case 'act-on-data':
        case 'build-share':
            pageArea.innerHTML = '<div class="empty-state">Page: ' + pageName.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase()) + '</div>';
            break;
        default:
            pageArea.innerHTML = '<div class="empty-state">Page not found</div>';
    }
}

// Solution Manager Page with Tiles
function loadSolutionManagerPage() {
    const pageArea = document.getElementById('page-area');

    pageArea.innerHTML = `
        <div class="solution-tiles-container">
            <div class="solution-tile" onclick="loadPage('262-integrate')">
                <h3>[262] Integrate Business Entities from Informatica in Data 360</h3>
                <p>Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360</p>
            </div>

            <div class="solution-tile" onclick="loadPage('df-integrate')">
                <h3>[DF] Integrate Business Entities from Informatica in Data 360</h3>
                <p>Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360</p>
            </div>

            <div class="solution-tile" onclick="loadPage('customer-households')">
                <h3>Integrate and expand CRM Households in Data 360</h3>
                <p>Enable Analytics, Marketing and Agentic experiences for your existing Customer Households. Extend the Household profile with engagement data from other systems though Unified Individuals and Household link Rules.</p>
            </div>
        </div>
    `;
}

// Customer Households Page (placeholder)
function loadCustomerHouseholdsPage() {
    const pageArea = document.getElementById('page-area');
    pageArea.innerHTML = `
        <div class="work-in-progress">
            <h2>WORK IN PROGRESS</h2>
            <p>This feature is currently under development</p>
        </div>
    `;
}

// [DF] Integrate Business Entities Page
function loadDFIntegratePage() {
    const pageArea = document.getElementById('page-area');

    const steps = [
        { id: 'df-step-1', title: 'Connect to Informatica System', headline: 'Establish trusted connection between D360 and Informatica tenants', subSteps: 1 },
        { id: 'df-step-2', title: 'Choose Business Entity', headline: 'Select Business from the connected tenant to integrate into Data 360', subSteps: 2 },
        { id: 'df-step-3', title: 'Choose Identity Resolution Type', headline: 'Select integration mode for business entities', subSteps: 1 },
        { id: 'df-step-4', title: 'Review Mappings', headline: 'Review data objects and field mappings', subSteps: 1 },
        { id: 'df-step-5', title: 'Validate Connected Data', headline: 'Preview and validate mapped data', subSteps: 3 },
        { id: 'df-step-6', title: 'Set up Identity Rules', headline: 'Configure matching rules for entity resolution', subSteps: 1 },
        { id: 'df-step-7', title: 'Validate Identity Data', headline: 'Inspect identity resolution results', subSteps: 5 },
        { id: 'df-step-8', title: 'Enable Sync to Informatica', headline: 'Configure synchronization settings', subSteps: 1 },
        { id: 'df-step-9', title: 'Setup Experiences', headline: 'Configure user experiences', subSteps: 3 },
        { id: 'df-step-10', title: 'Fun at Tech Summit', headline: 'Additional resources and activities', subSteps: 0 }
    ];

    initializeStepStates('df', steps);

    pageArea.innerHTML = `
        <div class="solution-page">
            <div class="header-instructions">
                <h1>Integrate Business Entities from Informatica in Data 360</h1>
                <p>Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360</p>
            </div>

            ${createStepSummary(steps, 'df')}
            ${createDFStepDetails()}
        </div>
    `;

    attachStepEventListeners('df', steps);
}

// [262] Integrate Business Entities Page
function load262IntegratePage() {
    const pageArea = document.getElementById('page-area');

    const steps = [
        { id: '262-step-1', title: 'Create Ingestion End-Point', headline: 'Setup Ingestion-API end-point from D360-Setup', subSteps: 0 },
        { id: '262-step-2', title: 'Create Schema on D360-End-Point', headline: 'Register business entities with predefined schema', subSteps: 0 },
        { id: '262-step-3', title: 'Create Business Entity Mapping', headline: 'Install extensibility packages from Informatica', subSteps: 0 },
        { id: '262-step-4', title: 'Publish Day0', headline: 'Publish initial data load from Informatica to D360', subSteps: 0 },
        { id: '262-step-5', title: 'Publish Day1', headline: 'Enable change data capture feed', subSteps: 0 },
        { id: '262-step-6', title: 'Bring Your Own MDM', headline: 'Populate data from external MDM to Unified Profile', subSteps: 0 },
        { id: '262-step-7', title: 'Data-360-MDM Datakit', headline: 'Install mappings and BYO-MDM definitions', subSteps: 0 },
        { id: '262-step-8', title: 'Search Before Create', headline: 'Install Informatica component', subSteps: 0 },
        { id: '262-step-9', title: 'CRM Enrichment', headline: 'Configure Profile Component and Field Enrichment', subSteps: 0 }
    ];

    initializeStepStates('262', steps);

    pageArea.innerHTML = `
        <div class="solution-page">
            <div class="header-instructions">
                <h1>[262] Integrate Business Entities from Informatica in Data 360</h1>
                <p>Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360</p>
            </div>

            ${createStepSummary(steps, '262')}
            ${create262StepDetails()}
        </div>
    `;

    attachStepEventListeners('262', steps);
}

// Initialize step states
function initializeStepStates(prefix, steps) {
    steps.forEach(step => {
        if (!appState.stepStates[step.id]) {
            appState.stepStates[step.id] = {
                status: 'not-started',
                completed: 0,
                total: step.subSteps,
                expanded: false
            };
        }
    });
}

// Create Step Summary Component
function createStepSummary(steps, prefix) {
    const stepsHtml = steps.map(step => {
        const state = appState.stepStates[step.id] || { status: 'not-started', completed: 0, total: step.subSteps };
        const icon = getStatusIcon(state.status);
        return `
            <div class="step-item" onclick="scrollToStep('${step.id}')">
                <span class="step-status-icon">${icon}</span>
                <span class="step-item-label">${step.title}</span>
            </div>
        `;
    }).join('');

    return `
        <div class="step-summary ${appState.stepSummaryExpanded ? '' : 'collapsed'}">
            <div class="step-summary-header">
                <h2>Steps Overview</h2>
                <button class="collapse-btn" onclick="toggleStepSummary()">
                    ${appState.stepSummaryExpanded ? '▲' : '▼'}
                </button>
            </div>
            <div class="step-summary-content">
                <div class="steps-list">
                    ${stepsHtml}
                </div>
                <div class="video-placeholder">
                    <div>
                        <p>Video Tutorial Placeholder</p>
                        <p style="font-size: 12px; margin-top: 8px;">Link to documentation</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStatusIcon(status) {
    switch(status) {
        case 'completed':
            return '✅';
        case 'in-progress':
            return '🔄';
        case 'not-started':
        default:
            return '⭕';
    }
}

function toggleStepSummary() {
    appState.stepSummaryExpanded = !appState.stepSummaryExpanded;
    const summary = document.querySelector('.step-summary');
    const btn = summary.querySelector('.collapse-btn');

    if (appState.stepSummaryExpanded) {
        summary.classList.remove('collapsed');
        btn.textContent = '▲';
    } else {
        summary.classList.add('collapsed');
        btn.textContent = '▼';
    }
}

function scrollToStep(stepId) {
    const stepPanel = document.getElementById(stepId);
    if (stepPanel) {
        // Expand the step
        if (!stepPanel.classList.contains('expanded')) {
            toggleStepPanel(stepId);
        }
        // Scroll to it
        stepPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Create DF Step Details
function createDFStepDetails() {
    return `
        <div class="step-details-container">
            ${createDFStep1()}
            ${createDFStep2()}
            ${createDFStep3()}
            ${createDFStep4()}
            ${createDFStep5()}
            ${createDFStep6()}
            ${createDFStep7()}
            ${createDFStep8()}
            ${createDFStep9()}
            ${createDFStep10()}
        </div>
    `;
}

function createDFStep1() {
    return `
        <div id="df-step-1" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('df-step-1')">
                <div class="step-title">Connect to Informatica System</div>
                <div class="step-headline">Establish trusted connection between D360 and Informatica tenants</div>
                <div class="sub-steps-summary">0 out of 1</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Configure details for the Informatica tenant, so that a trusted connection between them can be provided. The important items are "User-Name" and "Password"
                </div>
                <div class="two-column-layout">
                    <div>
                        <h4 style="margin-bottom: 12px;">Existing Connection</h4>
                        <div class="form-group">
                            <label class="form-label">Connection Name</label>
                            <select class="form-select">
                                <option>Select existing connection...</option>
                                <option>Informatica Production</option>
                                <option>Informatica Staging</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 12px;">New Connection</h4>
                        <div class="form-group">
                            <label class="form-label">Connection Name</label>
                            <input type="text" class="form-input" placeholder="Enter connection name" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tenant URL</label>
                            <input type="text" class="form-input" placeholder="https://..." />
                        </div>
                        <div class="form-group">
                            <label class="form-label">User Name</label>
                            <input type="text" class="form-input" placeholder="Enter username" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" placeholder="Enter password" />
                        </div>
                        <button class="primary-btn" onclick="validateConnection('df-step-1')">Validate Connection</button>
                        <div id="df-step-1-validation" style="margin-top: 12px;"></div>
                    </div>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('df-step-1', 'df-step-2')">Next Step</button>
            </div>
        </div>
    `;
}

function createDFStep2() {
    return `
        <div id="df-step-2" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('df-step-2')">
                <div class="step-title">Choose Business Entity</div>
                <div class="step-headline">Select Business from the connected tenant to integrate into Data 360</div>
                <div class="sub-steps-summary">0 out of 2</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Select the Informatica tenant and business entities you want to integrate into Data 360.
                </div>
                <div class="step-list">
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-2')" />
                        <div class="step-instruction">
                            <div class="form-group">
                                <label class="form-label">Select Tenant</label>
                                <select class="form-select">
                                    <option>Select tenant...</option>
                                    <option>USA-1</option>
                                    <option>USA-2</option>
                                    <option>Europe-1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-2')" />
                        <div class="step-instruction">
                            <div class="form-group">
                                <label class="form-label">Select Business Entities (Multiple)</label>
                                <select class="form-select" multiple size="6">
                                    <option>Customer</option>
                                    <option>Organization</option>
                                    <option>Product</option>
                                    <option>Supplier</option>
                                    <option>Contact</option>
                                    <option>Account</option>
                                    <option>Location</option>
                                    <option>Asset</option>
                                    <option>Contract</option>
                                    <option>Invoice</option>
                                </select>
                            </div>
                            <div class="notification info" style="margin-top: 12px;">
                                Note: When multiple entities are selected, the relationships between the entities will also be included.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('df-step-2', 'df-step-3')">Next Step</button>
            </div>
        </div>
    `;
}

function createDFStep3() {
    return `
        <div id="df-step-3" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('df-step-3')">
                <div class="step-title">Choose Identity Resolution Type</div>
                <div class="step-headline">Select integration mode for business entities</div>
                <div class="sub-steps-summary">0 out of 1</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Choose between two modes of operation to complete this panel.
                </div>
                <div class="step-list">
                    <div class="step-list-item">
                        <input type="radio" name="resolution-type" class="step-checkbox" onchange="updateSubStepCount('df-step-3')" />
                        <div class="step-instruction">
                            <strong>Business Entity as Unified Profile (Direct Mapping)</strong> - Informatica compute only
                            <p style="margin-top: 8px; font-size: 13px; color: #666;">
                                In this mode the Business Entity completely replaces the Unified Profile by taking its place.
                                Customers must ensure that all profile data is being sent to Informatica as well. It will only
                                appear after it has been processed through Informatica.
                            </p>
                        </div>
                    </div>
                    <div class="step-list-item">
                        <input type="radio" name="resolution-type" class="step-checkbox" onchange="updateSubStepCount('df-step-3')" />
                        <div class="step-instruction">
                            <strong>Golden Key-Ring</strong> - D360 is MDM Aware
                            <p style="margin-top: 8px; font-size: 13px; color: #666;">
                                The Business Entity is the primary and most trusted record on the Key-Ring. The Unified Profile
                                is a superset of profile data in D360 and Informatica. Enables the Business Entity into the Real
                                Time ecosystem for personalization.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('df-step-3', 'df-step-4')">Next Step</button>
            </div>
        </div>
    `;
}

function createDFStep4() {
    return `
        <div id="df-step-4" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('df-step-4')">
                <div class="step-title">Review Mappings</div>
                <div class="step-headline">Review data objects and field mappings</div>
                <div class="sub-steps-summary">0 out of 1</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Based on selected business entities these are the data objects identified from Informatica that are being synced to Data 360.
                </div>
                <div class="notification warning">
                    We've detected extra fields beyond the standard. Below is the proposed list of modifications to Salesforce's DMO to add placeholders for these values.
                </div>
                <div class="table-list">
                    ${['Customer_Profile', 'Contact_Information', 'Address_Details', 'Phone_Numbers', 'Email_Addresses',
                       'Organization_Data', 'Product_Catalog', 'Supplier_Info', 'Account_Details', 'Transaction_History',
                       'Engagement_Metrics', 'Preference_Center'].map(table => `
                        <div class="table-item">
                            <div>
                                <div class="table-name">${table}</div>
                                <div class="fields-list">Fields: field_1, field_2, field_3, field_4, field_5</div>
                            </div>
                            <button class="secondary-btn">Review Mappings & Create Fields</button>
                        </div>
                    `).join('')}
                </div>
                <div class="step-list">
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-4')" />
                        <div class="step-instruction">Mappings and schema reviewed</div>
                    </div>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('df-step-4', 'df-step-5')">Next Step</button>
            </div>
        </div>
    `;
}

function createDFStep5() {
    return `
        <div id="df-step-5" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('df-step-5')">
                <div class="step-title">Validate Connected Data</div>
                <div class="step-headline">Preview and validate mapped data</div>
                <div class="sub-steps-summary">0 out of 3</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    By now we've integrated, mapped and transformed the Business Entities to the Standard Data Model.
                    The following previews are based on sample data to help validate correctness of mapping and field value population.
                </div>
                <div class="step-list">
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-5')" />
                        <div class="step-instruction">
                            View Individuals and Contact Points by Data Source
                            <button class="secondary-btn" style="margin-top: 8px;" onclick="showRedirectNotification()">Preview</button>
                        </div>
                    </div>
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-5')" />
                        <div class="step-instruction">
                            View Sample of Individuals and Contact Points
                            <button class="secondary-btn" style="margin-top: 8px;" onclick="showRedirectNotification()">Preview</button>
                        </div>
                    </div>
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-5')" />
                        <div class="step-instruction">
                            View Sample of Emails, Phones or Address
                            <button class="secondary-btn" style="margin-top: 8px;" onclick="showRedirectNotification()">Preview</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('df-step-5', 'df-step-6')">Next Step</button>
            </div>
        </div>
    `;
}

function createDFStep6() {
    return `
        <div id="df-step-6" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('df-step-6')">
                <div class="step-title">Set up Identity Rules</div>
                <div class="step-headline">Configure matching rules for entity resolution</div>
                <div class="sub-steps-summary">0 out of 1</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    In this section we are going to configure the rules that govern how to link new profile data to existing
                    business entities or form independent key-rings to be shared with Informatica-MDM. Integrity and precedence
                    of the Business Entities IDs is always preserved.
                </div>
                <p style="margin: 16px 0; font-weight: 600;">Based on the available mappings and data in Party Identifier and Identity Match we recommend to include the following match rules:</p>
                <div class="match-rules-list">
                    <div class="match-rule-item">
                        <input type="checkbox" />
                        <span class="match-rule-label">Fuzzy Name and Normalized Email</span>
                    </div>
                    <div class="match-rule-item">
                        <input type="checkbox" />
                        <span class="match-rule-label">Fuzzy Name and Normalized Phone</span>
                    </div>
                    <div class="match-rule-item">
                        <input type="checkbox" />
                        <span class="match-rule-label">Fuzzy Name and Normalized Address</span>
                    </div>
                    <div class="match-rule-item">
                        <input type="checkbox" />
                        <span class="match-rule-label">Party Identifiers: Person Identifier - MC Subscriber Key</span>
                    </div>
                    <div class="match-rule-item">
                        <input type="checkbox" />
                        <span class="match-rule-label">Party Identifiers: Person Identifier - 3rd Party Enrichment Ids</span>
                    </div>
                    <div class="match-rule-item">
                        <input type="checkbox" />
                        <span class="match-rule-label">Identity Match: Lead to Contact</span>
                    </div>
                    <div class="match-rule-item">
                        <input type="checkbox" />
                        <span class="match-rule-label">Identity Match: MDM Connection</span>
                    </div>
                </div>
                <p style="margin: 16px 0;">To modify the suggested match rules or include additional rules in the Identity Ruleset configuration:</p>
                <button class="secondary-btn">Configure Rules</button>
                <div class="step-list" style="margin-top: 20px;">
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-6')" />
                        <div class="step-instruction">At least one match rule selected</div>
                    </div>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('df-step-6', 'df-step-7')">Next Step</button>
            </div>
        </div>
    `;
}

function createDFStep7() {
    return `
        <div id="df-step-7" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('df-step-7')">
                <div class="step-title">Validate Identity Data</div>
                <div class="step-headline">Inspect identity resolution results</div>
                <div class="sub-steps-summary">0 out of 5</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    After Identity Resolution has finished processing, use the following sample data preview to inspect the data.
                </div>
                <div class="step-list">
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-7')" />
                        <div class="step-instruction">
                            Preview Sample Profile Data
                            <button class="secondary-btn" style="margin-top: 8px;" onclick="showRedirectNotification()">Preview</button>
                        </div>
                    </div>
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-7')" />
                        <div class="step-instruction">
                            Explore the outliers
                            <button class="secondary-btn" style="margin-top: 8px;" onclick="showRedirectNotification()">Explore</button>
                        </div>
                    </div>
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-7')" />
                        <div class="step-instruction">
                            Preview Identity Process Summary (Total Source Profiles, Total Unified Profiles, Consolidation Rate)
                            <button class="secondary-btn" style="margin-top: 8px;" onclick="showRedirectNotification()">Preview</button>
                        </div>
                    </div>
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-7')" />
                        <div class="step-instruction">
                            Preview Consolidation Rate by Data Source
                            <button class="secondary-btn" style="margin-top: 8px;" onclick="showRedirectNotification()">Preview</button>
                        </div>
                    </div>
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-7')" />
                        <div class="step-instruction">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span>Enable Identity Rules Schedule</span>
                                <label class="toggle-switch">
                                    <input type="checkbox">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('df-step-7', 'df-step-8')">Next Step</button>
            </div>
        </div>
    `;
}

function createDFStep8() {
    return `
        <div id="df-step-8" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('df-step-8')">
                <div class="step-title">Enable Sync to Informatica</div>
                <div class="step-headline">Configure synchronization settings</div>
                <div class="sub-steps-summary">0 out of 1</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Enable sync to Informatica for Key-Rings that do not contain a business entity.
                    Share the source records for enrichment and quality assurance.
                </div>
                <button class="primary-btn" style="margin: 16px 0;">Configure D360 Setup in Informatica</button>
                <div class="step-list">
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-8')" />
                        <div class="step-instruction">Configuration completed</div>
                    </div>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('df-step-8', 'df-step-9')">Next Step</button>
            </div>
        </div>
    `;
}

function createDFStep9() {
    return `
        <div id="df-step-9" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('df-step-9')">
                <div class="step-title">Setup Experiences</div>
                <div class="step-headline">Configure user experiences</div>
                <div class="sub-steps-summary">0 out of 3</div>
            </div>
            <div class="step-main">
                <div class="step-list">
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-9')" />
                        <div class="step-instruction">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong>Search Before Create</strong>
                                    <p style="font-size: 13px; color: #666; margin-top: 4px;">Prevent duplicate records from being created</p>
                                </div>
                                <a href="#" class="footer-link">View Trailhead for Setup</a>
                            </div>
                        </div>
                    </div>
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-9')" />
                        <div class="step-instruction">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong>Copy Field</strong>
                                    <p style="font-size: 13px; color: #666; margin-top: 4px;">Enrich operational records with enterprise attributes</p>
                                </div>
                                <a href="#" class="footer-link">View Trailhead for Setup</a>
                            </div>
                        </div>
                    </div>
                    <div class="step-list-item">
                        <input type="checkbox" class="step-checkbox" onchange="updateSubStepCount('df-step-9')" />
                        <div class="step-instruction">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong>Related List</strong>
                                    <p style="font-size: 13px; color: #666; margin-top: 4px;">Showcase any information related to the primary entity</p>
                                </div>
                                <a href="#" class="footer-link">View Trailhead for Setup</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('df-step-9', 'df-step-10')">Next Step</button>
            </div>
        </div>
    `;
}

function createDFStep10() {
    return `
        <div id="df-step-10" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('df-step-10')">
                <div class="step-title">Fun at Tech Summit</div>
                <div class="step-headline">Additional resources and activities</div>
                <div class="sub-steps-summary">Bonus Content</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Explore additional resources, participate in hands-on activities, and connect with the community at Tech Summit!
                </div>
                <div style="padding: 20px; text-align: center;">
                    <p style="font-size: 16px; color: #666;">More information coming soon...</p>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="alert('Congratulations! You have completed all steps.')">Complete</button>
            </div>
        </div>
    `;
}

// Create 262 Step Details
function create262StepDetails() {
    return `
        <div class="step-details-container">
            ${create262Step1()}
            ${create262Step2()}
            ${create262Step3()}
            ${create262Step4()}
            ${create262Step5()}
            ${create262Step6()}
            ${create262Step7()}
            ${create262Step8()}
            ${create262Step9()}
        </div>
    `;
}

function create262Step1() {
    return `
        <div id="262-step-1" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('262-step-1')">
                <div class="step-title">Create Ingestion End-Point</div>
                <div class="step-headline">Setup Ingestion-API end-point from D360-Setup</div>
                <div class="sub-steps-summary">Documentation Available</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Setup Ingestion-API end-point from D360-Setup to be able to receive the data.
                </div>
                <div class="notification info">
                    Note: Optionally customer can add additional fields on the Ingestion-API-Schema via D360-Setup after schema is registered.
                </div>
                <button class="primary-btn" style="margin-top: 16px;">Navigate to D360-Setup Page</button>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('262-step-1', '262-step-2')">Next Step</button>
            </div>
        </div>
    `;
}

function create262Step2() {
    return `
        <div id="262-step-2" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('262-step-2')">
                <div class="step-title">Create Schema on D360-End-Point</div>
                <div class="step-headline">Register business entities with predefined schema</div>
                <div class="sub-steps-summary">Documentation Available</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Register the business entities with predefined schema against the Ingestion end-point.
                </div>
                <button class="primary-btn" style="margin-top: 16px;">Navigate to Ingestion-API-Schema Page</button>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('262-step-2', '262-step-3')">Next Step</button>
            </div>
        </div>
    `;
}

function create262Step3() {
    return `
        <div id="262-step-3" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('262-step-3')">
                <div class="step-title">Create Business Entity to Normalized-Lake Business Entity</div>
                <div class="step-headline">Install extensibility packages from Informatica</div>
                <div class="sub-steps-summary">Documentation Available</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Install the extensibility packages from Informatica to help publish the business entity.
                </div>
                <button class="primary-btn" style="margin-top: 16px;">Navigate to Informatica Extensibility Packages</button>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('262-step-3', '262-step-4')">Next Step</button>
            </div>
        </div>
    `;
}

function create262Step4() {
    return `
        <div id="262-step-4" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('262-step-4')">
                <div class="step-title">Publish Day0</div>
                <div class="step-headline">Publish initial data load from Informatica to D360</div>
                <div class="sub-steps-summary">Documentation Available</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Publish initial data load from Informatica to D360.
                </div>
                <div class="notification info">
                    Maintenance: Maintain schema sync if changed from D360.
                </div>
                <button class="primary-btn" style="margin-top: 16px;">Navigate to Informatica Publishing Page</button>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('262-step-4', '262-step-5')">Next Step</button>
            </div>
        </div>
    `;
}

function create262Step5() {
    return `
        <div id="262-step-5" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('262-step-5')">
                <div class="step-title">Publish Day1</div>
                <div class="step-headline">Enable change data capture feed</div>
                <div class="sub-steps-summary">Documentation Available</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Change data capture feed is enabled and only changes to D360 are sent.
                </div>
                <button class="primary-btn" style="margin-top: 16px;">Navigate to CDC Configuration Page</button>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('262-step-5', '262-step-6')">Next Step</button>
            </div>
        </div>
    `;
}

function create262Step6() {
    return `
        <div id="262-step-6" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('262-step-6')">
                <div class="step-title">Bring Your Own MDM (MDS/IR)</div>
                <div class="step-headline">Populate data from external MDM to Unified Profile</div>
                <div class="sub-steps-summary">Documentation Available</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Ability for Customers to populate data mastered in external MDM to Unified Profile.
                </div>
                <button class="primary-btn" style="margin-top: 16px;">Navigate to Unified Profile Configuration</button>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('262-step-6', '262-step-7')">Next Step</button>
            </div>
        </div>
    `;
}

function create262Step7() {
    return `
        <div id="262-step-7" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('262-step-7')">
                <div class="step-title">Data-360-MDM Datakit</div>
                <div class="step-headline">Install mappings and BYO-MDM definitions</div>
                <div class="sub-steps-summary">Documentation Available</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Customer installs mappings and BYO-MDM definitions from MDM-Datakit.
                </div>
                <button class="primary-btn" style="margin-top: 16px;">Navigate to MDM-Datakit Page</button>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('262-step-7', '262-step-8')">Next Step</button>
            </div>
        </div>
    `;
}

function create262Step8() {
    return `
        <div id="262-step-8" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('262-step-8')">
                <div class="step-title">Search Before Create</div>
                <div class="step-headline">Install Informatica component</div>
                <div class="sub-steps-summary">Documentation Available</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Customer install existing Informatica component.
                </div>
                <button class="primary-btn" style="margin-top: 16px;">Navigate to Informatica Component Page</button>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="nextStep('262-step-8', '262-step-9')">Next Step</button>
            </div>
        </div>
    `;
}

function create262Step9() {
    return `
        <div id="262-step-9" class="step-detail-panel collapsed">
            <div class="step-header" onclick="toggleStepPanel('262-step-9')">
                <div class="step-title">CRM Enrichment</div>
                <div class="step-headline">Configure Profile Component and Field Enrichment</div>
                <div class="sub-steps-summary">Documentation Available</div>
            </div>
            <div class="step-main">
                <div class="step-description">
                    Profile Component, Field Enrichment, Related Lists are now available for configuration.
                </div>
                <button class="primary-btn" style="margin-top: 16px;">Navigate to CRM Configuration Page</button>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="primary-btn" onclick="alert('Congratulations! You have completed all steps.')">Complete</button>
            </div>
        </div>
    `;
}

// Attach event listeners to step panels
function attachStepEventListeners(prefix, steps) {
    // Event listeners are already attached via onclick in HTML
}

// Toggle step panel expansion
function toggleStepPanel(stepId) {
    const panel = document.getElementById(stepId);
    if (panel.classList.contains('expanded')) {
        panel.classList.remove('expanded');
        panel.classList.add('collapsed');
    } else {
        panel.classList.remove('collapsed');
        panel.classList.add('expanded');
    }
}

// Update sub-step count
function updateSubStepCount(stepId) {
    const panel = document.getElementById(stepId);
    const checkboxes = panel.querySelectorAll('.step-checkbox');
    const total = checkboxes.length;
    let completed = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) completed++;
    });

    const summaryEl = panel.querySelector('.sub-steps-summary');
    summaryEl.textContent = `${completed} out of ${total}`;

    // Update step state
    if (!appState.stepStates[stepId]) {
        appState.stepStates[stepId] = { status: 'not-started', completed: 0, total: total };
    }

    appState.stepStates[stepId].completed = completed;

    if (completed === 0) {
        appState.stepStates[stepId].status = 'not-started';
    } else if (completed === total) {
        appState.stepStates[stepId].status = 'completed';
    } else {
        appState.stepStates[stepId].status = 'in-progress';
    }

    // Update step summary if visible
    updateStepSummaryIcons();
}

function updateStepSummaryIcons() {
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        const stepId = item.getAttribute('onclick').match(/'([^']+)'/)[1];
        const state = appState.stepStates[stepId];
        if (state) {
            const icon = getStatusIcon(state.status);
            const iconEl = item.querySelector('.step-status-icon');
            if (iconEl) {
                iconEl.textContent = icon;
            }
        }
    });
}

// Next step navigation
function nextStep(currentStepId, nextStepId) {
    // Collapse current step
    const currentPanel = document.getElementById(currentStepId);
    if (currentPanel) {
        currentPanel.classList.remove('expanded');
        currentPanel.classList.add('collapsed');
    }

    // Expand and scroll to next step
    const nextPanel = document.getElementById(nextStepId);
    if (nextPanel) {
        nextPanel.classList.remove('collapsed');
        nextPanel.classList.add('expanded');

        // Scroll with offset to show header
        setTimeout(() => {
            const headerOffset = 20;
            const elementPosition = nextPanel.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 100);
    }
}

// Validate connection
function validateConnection(stepId) {
    const validationEl = document.getElementById(stepId + '-validation');
    validationEl.innerHTML = '<span class="spinner"></span> Validating connection...';

    setTimeout(() => {
        validationEl.innerHTML = '<div class="notification info">✓ Connection successful!</div>';

        // Mark step as in progress
        if (appState.stepStates[stepId]) {
            appState.stepStates[stepId].status = 'in-progress';
            updateStepSummaryIcons();
        }
    }, 1500);
}

// Show redirect notification
function showRedirectNotification() {
    alert('This would redirect to the preview page in a full implementation.');
}
