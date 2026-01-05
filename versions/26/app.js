// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepSummaryExpanded: true,
    stepStates: {
        'connect-informatica': { status: 'not-started', completedSubSteps: 0, totalSubSteps: 3 },
        'choose-business-entity': { status: 'not-started', completedSubSteps: 0, totalSubSteps: 1 },
        'review-mappings': { status: 'not-started', completedSubSteps: 0, totalSubSteps: 1 },
        'validate-data': { status: 'not-started', completedSubSteps: 0, totalSubSteps: 1 },
        'identity-rules': { status: 'not-started', completedSubSteps: 0, totalSubSteps: 1 },
        'validate-identity': { status: 'not-started', completedSubSteps: 0, totalSubSteps: 2 },
        'enable-sync': { status: 'not-started', completedSubSteps: 0, totalSubSteps: 1 },
        'setup-experiences': { status: 'not-started', completedSubSteps: 0, totalSubSteps: 3 }
    },
    expandedPanels: new Set()
};

// DOM Elements
let pageArea, leftNav, navToggleBtn, appPickerIcon, appPickerDropdown, appLabel;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    attachEventListeners();
    loadPage('home');
});

function initializeElements() {
    pageArea = document.getElementById('page-area');
    leftNav = document.getElementById('left-navigation');
    navToggleBtn = document.getElementById('nav-toggle-btn');
    appPickerIcon = document.getElementById('app-picker-icon');
    appPickerDropdown = document.getElementById('app-picker-dropdown');
    appLabel = document.getElementById('app-label');
}

function attachEventListeners() {
    // Left Navigation Toggle
    navToggleBtn.addEventListener('click', toggleLeftNav);

    // App Picker
    appPickerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        appPickerDropdown.classList.add('hidden');
    });

    // App Picker Items
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            selectApp(item.dataset.app);
        });
    });

    // Top Navigation Tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveTab(tab);
            loadPage(tab.dataset.page);
        });
    });

    // Left Navigation Items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            setActiveNavItem(item);
            loadPage(item.dataset.page);
        });
    });
}

function toggleLeftNav() {
    appState.leftNavExpanded = !appState.leftNavExpanded;
    leftNav.classList.toggle('collapsed');
}

function selectApp(appName) {
    appState.currentApp = appName;
    appLabel.textContent = appName;

    // Update active state in dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.app === appName) {
            item.classList.add('active');
        }
    });

    appPickerDropdown.classList.add('hidden');
}

function setActiveTab(activeTab) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    activeTab.classList.add('active');
}

function setActiveNavItem(activeItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

function loadPage(pageName) {
    appState.currentPage = pageName;

    switch(pageName) {
        case 'home':
            renderHomePage();
            break;
        case 'solution-manager':
            renderSolutionManagerPage();
            break;
        case 'integrate-business-entities':
            renderIntegrateBusinessEntitiesPage();
            break;
        default:
            renderPlaceholderPage(pageName);
    }
}

function renderHomePage() {
    pageArea.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">🏠</div>
            <div class="empty-state-text">Welcome to Data 360</div>
        </div>
    `;
}

function renderSolutionManagerPage() {
    pageArea.innerHTML = `
        <div class="solution-manager-page">
            <div class="page-header">
                <h1 class="page-title">Solution Manager</h1>
            </div>
            <div class="tiles-container">
                <div class="tile" onclick="loadPage('integrate-business-entities')">
                    <div class="tile-title">Integrate Business Entities from Informatica in Data360</div>
                    <div class="tile-description">
                        Realize the full potential of the curated and enriched business entities from
                        Informatica directly in D360. In this step by step guide, we will work through
                        the steps required to operationalize business entities created in Informatica in D360.
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPlaceholderPage(pageName) {
    const pageTitle = pageName.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    pageArea.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">📄</div>
            <div class="empty-state-text">${pageTitle}</div>
            <div style="margin-top: 10px; color: #ccc; font-size: 14px;">Coming Soon</div>
        </div>
    `;
}

function renderIntegrateBusinessEntitiesPage() {
    pageArea.innerHTML = `
        <div class="integrate-page">
            ${renderHeaderInstructions()}
            ${renderStepSummary()}
            <div id="step-details-container">
                ${renderConnectInformaticaPanel()}
                ${renderChooseBusinessEntityPanel()}
                ${renderReviewMappingsPanel()}
                ${renderValidateDataPanel()}
                ${renderIdentityRulesPanel()}
                ${renderValidateIdentityPanel()}
                ${renderEnableSyncPanel()}
                ${renderSetupExperiencesPanel()}
            </div>
        </div>
    `;

    attachStepEventListeners();
}

function renderHeaderInstructions() {
    return `
        <div class="header-instructions">
            <h1 class="header-instructions-title">Integrate Business Entities from Informatica in Data360</h1>
            <p class="header-instructions-description">
                Realize the full potential of the curated and enriched business entities from
                Informatica directly in D360. In this step by step guide, we will work through
                the steps required to operationalize business entities created in Informatica in D360.
            </p>
        </div>
    `;
}

function renderStepSummary() {
    const steps = [
        { id: 'connect-informatica', label: 'Connect to Informatica System' },
        { id: 'choose-business-entity', label: 'Choose Business Entity' },
        { id: 'review-mappings', label: 'Review Mappings' },
        { id: 'validate-data', label: 'Validate Connected Data' },
        { id: 'identity-rules', label: 'Set up Identity Rules' },
        { id: 'validate-identity', label: 'Validate Identity Data' },
        { id: 'enable-sync', label: 'Enable Sync to Informatica' },
        { id: 'setup-experiences', label: 'Setup Experiences' }
    ];

    const stepItems = steps.map(step => {
        const state = appState.stepStates[step.id];
        const icon = getStatusIcon(state.status);
        return `
            <div class="step-item" onclick="scrollToStep('${step.id}')">
                <span class="step-status-icon">${icon}</span>
                <span class="step-item-label">${step.label}</span>
            </div>
        `;
    }).join('');

    return `
        <div class="step-summary ${appState.stepSummaryExpanded ? '' : 'collapsed'}" id="step-summary">
            <div class="step-summary-header">
                <div class="step-summary-title">Implementation Steps</div>
                <div class="step-summary-toggle" onclick="toggleStepSummary()">
                    ${appState.stepSummaryExpanded ? '▼ Collapse' : '▶ Expand'}
                </div>
            </div>
            <div class="step-summary-content">
                <div class="steps-list">
                    ${stepItems}
                </div>
                <div class="video-placeholder">
                    <div class="video-placeholder-icon">📹</div>
                    <div class="video-placeholder-text">
                        <strong>Video Tutorial</strong><br>
                        Learn how to integrate business entities<br>
                        <a href="#" class="footer-link mt-10">Watch Tutorial</a><br>
                        <a href="#" class="footer-link">View Documentation</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStatusIcon(status) {
    switch(status) {
        case 'completed': return '✅';
        case 'in-progress': return '🔄';
        default: return '⭕';
    }
}

function renderConnectInformaticaPanel() {
    const stepId = 'connect-informatica';
    const state = appState.stepStates[stepId];
    const isExpanded = appState.expandedPanels.has(stepId);

    return `
        <div class="step-details-panel ${isExpanded ? '' : 'collapsed'}" id="panel-${stepId}">
            <div class="step-details-header" onclick="togglePanel('${stepId}')">
                <div class="step-details-title">1. Connect to Informatica System</div>
                <div class="step-details-headline">Establish trusted connection between D360 and Informatica tenants</div>
                <div class="sub-steps-summary">${state.completedSubSteps} out of ${state.totalSubSteps} completed</div>
            </div>
            <div class="step-details-body">
                <div class="step-main-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            Configure details for the Informatica tenant, so that a trusted connection between
                            them can be provided. The important items are "User-Name" and "Password".
                        </div>

                        <div class="form-columns">
                            <div>
                                <h4>Existing Connection</h4>
                                <div class="form-group">
                                    <label class="form-label">Connection Name</label>
                                    <select class="form-select" id="existing-connection">
                                        <option value="">Select a connection...</option>
                                        <option value="prod-connection">Production Connection</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <h4>New Connection</h4>
                                <div class="form-group">
                                    <label class="form-label">Connection Name</label>
                                    <input type="text" class="form-input" id="connection-name" placeholder="Enter connection name">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Tenant URL</label>
                                    <input type="text" class="form-input" id="tenant-url" placeholder="https://tenant.informatica.com">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">User Name</label>
                                    <input type="text" class="form-input" id="username" placeholder="Enter username">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input type="password" class="form-input" id="password" placeholder="Enter password">
                                </div>
                                <button class="action-button" onclick="validateConnection()">Validate Connection</button>
                                <div id="validation-result"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-links">
                        <a href="#" class="footer-link">View Documentation</a>
                        <a href="#" class="footer-link">Check out Tutorial</a>
                    </div>
                    <button class="next-step-button" onclick="goToNextStep('${stepId}')">Next Step</button>
                </div>
            </div>
        </div>
    `;
}

function renderChooseBusinessEntityPanel() {
    const stepId = 'choose-business-entity';
    const state = appState.stepStates[stepId];
    const isExpanded = appState.expandedPanels.has(stepId);

    return `
        <div class="step-details-panel ${isExpanded ? '' : 'collapsed'}" id="panel-${stepId}">
            <div class="step-details-header" onclick="togglePanel('${stepId}')">
                <div class="step-details-title">2. Choose Business Entity</div>
                <div class="step-details-headline">Select Business from the connected tenant to integrate into Data 360</div>
                <div class="sub-steps-summary">${state.completedSubSteps} out of ${state.totalSubSteps} completed</div>
            </div>
            <div class="step-details-body">
                <div class="step-main-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            Select Business entities from the connected tenant to integrate into Data 360.
                        </div>

                        <div class="form-group">
                            <label class="form-label">Business Entities</label>
                            <select class="form-select" id="business-entities" multiple size="10" onchange="updateBusinessEntitySelection()">
                                <option value="customer">Customer</option>
                                <option value="organization">Organization</option>
                                <option value="product">Product</option>
                                <option value="supplier">Supplier</option>
                                <option value="employee">Employee</option>
                                <option value="partner">Partner</option>
                                <option value="location">Location</option>
                                <option value="asset">Asset</option>
                                <option value="contract">Contract</option>
                                <option value="project">Project</option>
                            </select>
                        </div>

                        <div id="entity-relationship-notification" class="notification info hidden">
                            Note: Relationships between the selected entities will also be included.
                        </div>

                        <div class="sub-steps-list">
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" id="entity-selected"
                                    onchange="updateSubStepCompletion('${stepId}', 'entity-selected')">
                                <div class="sub-step-text">Select at least one business entity</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-links">
                        <a href="#" class="footer-link">View Documentation</a>
                        <a href="#" class="footer-link">Check out Tutorial</a>
                    </div>
                    <button class="next-step-button" onclick="goToNextStep('${stepId}')">Next Step</button>
                </div>
            </div>
        </div>
    `;
}

function renderReviewMappingsPanel() {
    const stepId = 'review-mappings';
    const state = appState.stepStates[stepId];
    const isExpanded = appState.expandedPanels.has(stepId);

    return `
        <div class="step-details-panel ${isExpanded ? '' : 'collapsed'}" id="panel-${stepId}">
            <div class="step-details-header" onclick="togglePanel('${stepId}')">
                <div class="step-details-title">3. Review Mappings</div>
                <div class="step-details-headline">Review and configure field mappings from Informatica to Data 360</div>
                <div class="sub-steps-summary">${state.completedSubSteps} out of ${state.totalSubSteps} completed</div>
            </div>
            <div class="step-details-body">
                <div class="step-main-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            Based on selected business entities these are the data objects identified from
                            Informatica that are being synced to Data 360.
                        </div>

                        <div class="scrollable-list">
                            <div class="list-item">
                                <strong>Customer_Profile</strong>
                                <button class="action-button secondary" style="float: right; padding: 5px 10px; font-size: 12px;"
                                    onclick="showRedirectNotification()">Review Mappings & Create Fields</button>
                                <div class="field-list">
                                    <div class="field-item">• customer_id (String)</div>
                                    <div class="field-item">• first_name (String)</div>
                                    <div class="field-item">• last_name (String)</div>
                                    <div class="field-item">• email_address (String)</div>
                                </div>
                            </div>
                            <div class="list-item">
                                <strong>Customer_Address</strong>
                                <button class="action-button secondary" style="float: right; padding: 5px 10px; font-size: 12px;"
                                    onclick="showRedirectNotification()">Review Mappings & Create Fields</button>
                                <div class="field-list">
                                    <div class="field-item">• address_line1 (String)</div>
                                    <div class="field-item">• address_line2 (String)</div>
                                    <div class="field-item">• city (String)</div>
                                </div>
                            </div>
                            <div class="list-item">
                                <strong>Customer_Contact</strong>
                                <button class="action-button secondary" style="float: right; padding: 5px 10px; font-size: 12px;"
                                    onclick="showRedirectNotification()">Review Mappings & Create Fields</button>
                                <div class="field-list">
                                    <div class="field-item">• phone_number (String)</div>
                                    <div class="field-item">• mobile_number (String)</div>
                                </div>
                            </div>
                        </div>

                        <div class="notification info">
                            We've detected extra fields beyond the standard. Below is the proposed list of
                            modifications to Salesforce's DMO to add placeholders for these values.
                        </div>

                        <div class="sub-steps-list">
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" id="mappings-reviewed"
                                    onchange="updateSubStepCompletion('${stepId}', 'mappings-reviewed')">
                                <div class="sub-step-text">Mappings and schema reviewed</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-links">
                        <a href="#" class="footer-link">View Documentation</a>
                        <a href="#" class="footer-link">Check out Tutorial</a>
                    </div>
                    <button class="next-step-button" onclick="goToNextStep('${stepId}')">Next Step</button>
                </div>
            </div>
        </div>
    `;
}

function renderValidateDataPanel() {
    const stepId = 'validate-data';
    const state = appState.stepStates[stepId];
    const isExpanded = appState.expandedPanels.has(stepId);

    return `
        <div class="step-details-panel ${isExpanded ? '' : 'collapsed'}" id="panel-${stepId}">
            <div class="step-details-header" onclick="togglePanel('${stepId}')">
                <div class="step-details-title">4. Validate Connected Data</div>
                <div class="step-details-headline">Preview and validate the integrated data</div>
                <div class="sub-steps-summary">${state.completedSubSteps} out of ${state.totalSubSteps} completed</div>
            </div>
            <div class="step-details-body">
                <div class="step-main-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            By now we've integrated, mapped and transformed the Business Entities to the
                            Standard Data Model. The following previews are based on sample data to help
                            validate correctness of mapping and field value population.
                        </div>

                        <div class="sub-steps-list">
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" id="preview-data-source"
                                    onchange="updateSubStepCompletion('${stepId}', 'preview-data-source')">
                                <div class="sub-step-text">View Individuals and Contact Points by Data Source</div>
                                <button class="action-button secondary" style="margin-left: auto; padding: 8px 16px;"
                                    onclick="showRedirectNotification()">Preview</button>
                            </div>
                            <div class="sub-step-item">
                                <div class="sub-step-text" style="flex: 1;">View Sample of Individuals and Contact Points</div>
                                <button class="action-button secondary" style="padding: 8px 16px;"
                                    onclick="showRedirectNotification()">Preview</button>
                            </div>
                            <div class="sub-step-item">
                                <div class="sub-step-text" style="flex: 1;">View Sample of Emails, Phones or Address</div>
                                <button class="action-button secondary" style="padding: 8px 16px;"
                                    onclick="showRedirectNotification()">Preview</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-links">
                        <a href="#" class="footer-link">View Documentation</a>
                        <a href="#" class="footer-link">Check out Tutorial</a>
                    </div>
                    <button class="next-step-button" onclick="goToNextStep('${stepId}')">Next Step</button>
                </div>
            </div>
        </div>
    `;
}

function renderIdentityRulesPanel() {
    const stepId = 'identity-rules';
    const state = appState.stepStates[stepId];
    const isExpanded = appState.expandedPanels.has(stepId);

    return `
        <div class="step-details-panel ${isExpanded ? '' : 'collapsed'}" id="panel-${stepId}">
            <div class="step-details-header" onclick="togglePanel('${stepId}')">
                <div class="step-details-title">5. Set up Identity Rules</div>
                <div class="step-details-headline">Configure rules that govern how to link new profile data</div>
                <div class="sub-steps-summary">${state.completedSubSteps} out of ${state.totalSubSteps} completed</div>
            </div>
            <div class="step-details-body">
                <div class="step-main-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            In this section we are going to configure the rules that govern how to link new
                            profile data to existing business entities.
                        </div>

                        <div class="sub-steps-list">
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" id="identity-rules-configured"
                                    onchange="updateSubStepCompletion('${stepId}', 'identity-rules-configured')">
                                <div class="sub-step-text">Configure Match and Reconciliation Rules</div>
                                <button class="action-button" style="margin-left: auto;"
                                    onclick="showRedirectNotification()">Configure Match and Reconciliation Rules</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-links">
                        <a href="#" class="footer-link">View Documentation</a>
                        <a href="#" class="footer-link">Check out Tutorial</a>
                    </div>
                    <button class="next-step-button" onclick="goToNextStep('${stepId}')">Next Step</button>
                </div>
            </div>
        </div>
    `;
}

function renderValidateIdentityPanel() {
    const stepId = 'validate-identity';
    const state = appState.stepStates[stepId];
    const isExpanded = appState.expandedPanels.has(stepId);

    return `
        <div class="step-details-panel ${isExpanded ? '' : 'collapsed'}" id="panel-${stepId}">
            <div class="step-details-header" onclick="togglePanel('${stepId}')">
                <div class="step-details-title">6. Validate Identity Data</div>
                <div class="step-details-headline">Inspect identity resolution results and enable scheduling</div>
                <div class="sub-steps-summary">${state.completedSubSteps} out of ${state.totalSubSteps} completed</div>
            </div>
            <div class="step-details-body">
                <div class="step-main-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            After Identity Resolution has finished processing, use the following sample data
                            previews to inspect the data.
                        </div>

                        <div class="sub-steps-list">
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" id="preview-profile-data"
                                    onchange="updateSubStepCompletion('${stepId}', 'preview-profile-data')">
                                <div class="sub-step-text">Preview Sample Profile Data</div>
                                <button class="action-button secondary" style="margin-left: auto; padding: 8px 16px;"
                                    onclick="showRedirectNotification()">Preview</button>
                            </div>
                            <div class="sub-step-item">
                                <div class="sub-step-text" style="flex: 1;">Explore the Outliers</div>
                                <button class="action-button secondary" style="padding: 8px 16px;"
                                    onclick="showRedirectNotification()">Preview</button>
                            </div>
                            <div class="sub-step-item">
                                <div class="sub-step-text" style="flex: 1;">Preview Identity Process Summary</div>
                                <button class="action-button secondary" style="padding: 8px 16px;"
                                    onclick="showRedirectNotification()">Preview</button>
                                <div class="preview-stats mt-10" style="width: 100%;">
                                    <div class="stat-item">
                                        <div class="stat-label">Total Source Profiles</div>
                                        <div class="stat-value">125,430</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-label">Total Unified Profiles</div>
                                        <div class="stat-value">98,250</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-label">Consolidation Rate</div>
                                        <div class="stat-value">78.3%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="sub-step-item">
                                <div class="sub-step-text" style="flex: 1;">Preview Consolidation Rate by Data Source</div>
                                <button class="action-button secondary" style="padding: 8px 16px;"
                                    onclick="showRedirectNotification()">Preview</button>
                            </div>
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" id="enable-schedule"
                                    onchange="updateSubStepCompletion('${stepId}', 'enable-schedule')">
                                <div class="sub-step-text">Enable Identity Rules Schedule</div>
                                <div class="toggle-switch" onclick="toggleSchedule(this)" style="margin-left: auto;">
                                    <span style="margin-right: 10px;">Off</span>
                                    <div class="toggle-slider"></div>
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
                    <button class="next-step-button" onclick="goToNextStep('${stepId}')">Next Step</button>
                </div>
            </div>
        </div>
    `;
}

function renderEnableSyncPanel() {
    const stepId = 'enable-sync';
    const state = appState.stepStates[stepId];
    const isExpanded = appState.expandedPanels.has(stepId);

    return `
        <div class="step-details-panel ${isExpanded ? '' : 'collapsed'}" id="panel-${stepId}">
            <div class="step-details-header" onclick="togglePanel('${stepId}')">
                <div class="step-details-title">7. Enable Sync to Informatica</div>
                <div class="step-details-headline">Configure data synchronization back to Informatica</div>
                <div class="sub-steps-summary">${state.completedSubSteps} out of ${state.totalSubSteps} completed</div>
            </div>
            <div class="step-details-body">
                <div class="step-main-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            Enable sync to Informatica for Key-Rings that do not contain a business entity.
                            Share the source records for enrichment and quality assurance.
                        </div>

                        <div class="sub-steps-list">
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" id="sync-configured"
                                    onchange="updateSubStepCompletion('${stepId}', 'sync-configured')">
                                <div class="sub-step-text">Configure D360 Setup in Informatica</div>
                                <button class="action-button" style="margin-left: auto;"
                                    onclick="showRedirectNotification()">Configure D360 Setup</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-links">
                        <a href="#" class="footer-link">View Documentation</a>
                        <a href="#" class="footer-link">Check out Tutorial</a>
                    </div>
                    <button class="next-step-button" onclick="goToNextStep('${stepId}')">Next Step</button>
                </div>
            </div>
        </div>
    `;
}

function renderSetupExperiencesPanel() {
    const stepId = 'setup-experiences';
    const state = appState.stepStates[stepId];
    const isExpanded = appState.expandedPanels.has(stepId);

    return `
        <div class="step-details-panel ${isExpanded ? '' : 'collapsed'}" id="panel-${stepId}">
            <div class="step-details-header" onclick="togglePanel('${stepId}')">
                <div class="step-details-title">8. Setup Experiences</div>
                <div class="step-details-headline">Configure user experiences for the integrated data</div>
                <div class="sub-steps-summary">${state.completedSubSteps} out of ${state.totalSubSteps} completed</div>
            </div>
            <div class="step-details-body">
                <div class="step-main-content">
                    <div class="step-instructions">
                        <div class="step-description">
                            Configure user experiences to leverage the integrated business entities.
                        </div>

                        <div class="sub-steps-list">
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" id="search-before-create"
                                    onchange="updateSubStepCompletion('${stepId}', 'search-before-create')">
                                <div class="sub-step-text">
                                    <strong>Search Before Create</strong> - Prevent duplicate records from being created
                                </div>
                                <a href="#" class="footer-link" style="margin-left: auto;">View Trailhead for Setup</a>
                            </div>
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" id="copy-field"
                                    onchange="updateSubStepCompletion('${stepId}', 'copy-field')">
                                <div class="sub-step-text">
                                    <strong>Copy Field</strong> - Enrich operational records with enterprise attributes
                                </div>
                                <a href="#" class="footer-link" style="margin-left: auto;">View Trailhead for Setup</a>
                            </div>
                            <div class="sub-step-item">
                                <input type="checkbox" class="sub-step-checkbox" id="related-list"
                                    onchange="updateSubStepCompletion('${stepId}', 'related-list')">
                                <div class="sub-step-text">
                                    <strong>Related List</strong> - Showcase any information related to the primary entity
                                </div>
                                <a href="#" class="footer-link" style="margin-left: auto;">View Trailhead for Setup</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-footer">
                    <div class="footer-links">
                        <a href="#" class="footer-link">View Documentation</a>
                        <a href="#" class="footer-link">Check out Tutorial</a>
                    </div>
                    <button class="next-step-button" disabled style="opacity: 0.5; cursor: not-allowed;">
                        Implementation Complete
                    </button>
                </div>
            </div>
        </div>
    `;
}

function attachStepEventListeners() {
    // Event listeners are attached via inline onclick handlers in the HTML
    // This function can be used for any additional setup needed
}

function toggleStepSummary() {
    appState.stepSummaryExpanded = !appState.stepSummaryExpanded;
    renderIntegrateBusinessEntitiesPage();
}

function togglePanel(stepId) {
    if (appState.expandedPanels.has(stepId)) {
        appState.expandedPanels.delete(stepId);
    } else {
        appState.expandedPanels.add(stepId);
    }
    renderIntegrateBusinessEntitiesPage();
}

function scrollToStep(stepId) {
    // Expand the panel if collapsed
    if (!appState.expandedPanels.has(stepId)) {
        appState.expandedPanels.add(stepId);
        renderIntegrateBusinessEntitiesPage();
    }

    // Scroll to the panel
    setTimeout(() => {
        const panel = document.getElementById(`panel-${stepId}`);
        if (panel) {
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

function goToNextStep(currentStepId) {
    const stepOrder = [
        'connect-informatica',
        'choose-business-entity',
        'review-mappings',
        'validate-data',
        'identity-rules',
        'validate-identity',
        'enable-sync',
        'setup-experiences'
    ];

    const currentIndex = stepOrder.indexOf(currentStepId);
    if (currentIndex < stepOrder.length - 1) {
        const nextStepId = stepOrder[currentIndex + 1];
        scrollToStep(nextStepId);
    }
}

function updateSubStepCompletion(stepId, checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    const state = appState.stepStates[stepId];

    if (checkbox.checked) {
        state.completedSubSteps++;
    } else {
        state.completedSubSteps--;
    }

    // Update status
    if (state.completedSubSteps === state.totalSubSteps) {
        state.status = 'completed';
    } else if (state.completedSubSteps > 0) {
        state.status = 'in-progress';
    } else {
        state.status = 'not-started';
    }

    // Re-render to update the UI
    renderIntegrateBusinessEntitiesPage();
}

function updateBusinessEntitySelection() {
    const select = document.getElementById('business-entities');
    const notification = document.getElementById('entity-relationship-notification');
    const checkbox = document.getElementById('entity-selected');

    const selectedCount = Array.from(select.selectedOptions).length;

    if (selectedCount > 1) {
        notification.classList.remove('hidden');
    } else {
        notification.classList.add('hidden');
    }

    if (selectedCount > 0 && !checkbox.checked) {
        checkbox.checked = true;
        updateSubStepCompletion('choose-business-entity', 'entity-selected');
    }
}

function validateConnection() {
    const resultDiv = document.getElementById('validation-result');

    // Show loading state
    resultDiv.innerHTML = `
        <div class="validation-indicator loading">
            <div class="spinner"></div>
            <span>Validating connection...</span>
        </div>
    `;

    // Simulate validation
    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="validation-indicator success">
                ✓ Connection validated successfully
            </div>
        `;

        // Mark step as in progress
        const state = appState.stepStates['connect-informatica'];
        if (state.status === 'not-started') {
            state.status = 'in-progress';
            state.completedSubSteps = 1;
            renderIntegrateBusinessEntitiesPage();
        }
    }, 1500);
}

function toggleSchedule(element) {
    element.classList.toggle('active');
    const checkbox = document.getElementById('enable-schedule');

    if (element.classList.contains('active')) {
        element.querySelector('span').textContent = 'On';
        if (!checkbox.checked) {
            checkbox.checked = true;
            updateSubStepCompletion('validate-identity', 'enable-schedule');
        }
    } else {
        element.querySelector('span').textContent = 'Off';
        if (checkbox.checked) {
            checkbox.checked = false;
            updateSubStepCompletion('validate-identity', 'enable-schedule');
        }
    }
}

function showRedirectNotification() {
    alert('This would redirect to the configuration page in the actual application.');
}
