// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    stepStatuses: {
        'connect-informatica': { status: 'not-started', completed: 0, total: 1 },
        'choose-entities': { status: 'not-started', completed: 0, total: 1 },
        'review-mappings': { status: 'not-started', completed: 0, total: 1 },
        'validate-data': { status: 'not-started', completed: 0, total: 3 },
        'setup-identity': { status: 'not-started', completed: 0, total: 1 },
        'validate-identity': { status: 'not-started', completed: 0, total: 5 },
        'enable-sync': { status: 'not-started', completed: 0, total: 1 },
        'setup-experiences': { status: 'not-started', completed: 0, total: 3 }
    }
};

// Initialize app on load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadPage('home');
}

function setupEventListeners() {
    // App picker dropdown
    const appPicker = document.getElementById('app-picker-icon');
    const appDropdown = document.getElementById('app-picker-dropdown');

    appPicker.addEventListener('click', function(e) {
        e.stopPropagation();
        appDropdown.style.display = appDropdown.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', function() {
        appDropdown.style.display = 'none';
    });

    // App selection
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const appName = this.dataset.app;
            selectApp(appName);
        });
    });

    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.dataset.page;
            selectTab(this);
            loadPage(page);
        });
    });

    // Left navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            selectNavItem(this);
            loadPage(page);
        });
    });

    // Navigation toggle
    const navToggle = document.getElementById('nav-toggle-btn');
    const leftNav = document.getElementById('left-navigation');

    navToggle.addEventListener('click', function() {
        leftNav.classList.toggle('expanded');
        leftNav.classList.toggle('collapsed');
    });
}

function selectApp(appName) {
    appState.currentApp = appName;
    document.getElementById('app-label').textContent = appName;

    // Update active state in dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.app === appName) {
            item.classList.add('active');
        }
    });
}

function selectTab(tabElement) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    tabElement.classList.add('active');
}

function selectNavItem(navElement) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    navElement.classList.add('active');
}

function loadPage(pageName) {
    appState.currentPage = pageName;
    const pageArea = document.getElementById('page-area');

    switch(pageName) {
        case 'home':
            pageArea.innerHTML = '<div class="empty-state">Welcome to Data 360</div>';
            break;
        case 'solution-manager':
            renderSolutionManagerPage();
            break;
        case 'integrate-business-entities':
            renderIntegrateBusinessEntitiesPage();
            break;
        default:
            pageArea.innerHTML = '<div class="empty-state">This page is under construction</div>';
    }
}

function renderSolutionManagerPage() {
    const pageArea = document.getElementById('page-area');

    const html = `
        <div class="solution-tiles-container">
            <div class="solution-tile" onclick="loadPage('integrate-business-entities')">
                <h2>Integrate Business Entities from Informatica in Data360</h2>
                <p>Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360</p>
            </div>
        </div>
    `;

    pageArea.innerHTML = html;
}

function renderIntegrateBusinessEntitiesPage() {
    const pageArea = document.getElementById('page-area');

    const html = `
        <div class="integrate-page">
            ${renderHeaderInstructions()}
            ${renderStepSummary()}
            ${renderStepDetails()}
        </div>
    `;

    pageArea.innerHTML = html;
    setupIntegrationPageListeners();
}

function renderHeaderInstructions() {
    return `
        <div class="header-instructions">
            <h1>Integrate Business Entities from Informatica in Data360</h1>
            <p>Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360</p>
        </div>
    `;
}

function renderStepSummary() {
    const steps = [
        { id: 'connect-informatica', label: 'Connect to Informatica System' },
        { id: 'choose-entities', label: 'Choose Business Entity' },
        { id: 'review-mappings', label: 'Review Mappings' },
        { id: 'validate-data', label: 'Validate Connected Data' },
        { id: 'setup-identity', label: 'Set up Identity Rules' },
        { id: 'validate-identity', label: 'Validate Identity Data' },
        { id: 'enable-sync', label: 'Enable sync to Informatica' },
        { id: 'setup-experiences', label: 'Setup Experiences' }
    ];

    let stepsHtml = steps.map(step => {
        const status = appState.stepStatuses[step.id];
        const icon = getStatusIcon(status.status);
        return `
            <div class="step-item" onclick="scrollToStep('${step.id}')">
                <span class="step-status-icon">${icon}</span>
                <span class="step-item-label">${step.label}</span>
            </div>
        `;
    }).join('');

    return `
        <div class="step-summary" id="step-summary">
            <div class="step-summary-header">
                <h2>Implementation Steps</h2>
                <button class="collapse-btn" onclick="toggleStepSummary()">▲</button>
            </div>
            <div class="step-summary-content">
                <div class="steps-list">
                    ${stepsHtml}
                </div>
                <div class="video-placeholder">
                    <div style="text-align: center;">
                        <p style="margin-bottom: 10px;">📹 Video Tutorial</p>
                        <a href="#" class="footer-link">View Documentation</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderStepDetails() {
    return `
        <div class="step-details-container">
            ${renderConnectInformaticaPanel()}
            ${renderChooseBusinessEntityPanel()}
            ${renderReviewMappingsPanel()}
            ${renderValidateDataPanel()}
            ${renderSetupIdentityPanel()}
            ${renderValidateIdentityPanel()}
            ${renderEnableSyncPanel()}
            ${renderSetupExperiencesPanel()}
        </div>
    `;
}

function renderConnectInformaticaPanel() {
    return `
        <div class="step-panel collapsed" id="connect-informatica" data-step="connect-informatica">
            <div class="step-panel-header" onclick="togglePanel('connect-informatica')">
                <div class="step-panel-title">
                    <span class="expand-icon">▶</span>
                    Connect to Informatica System
                </div>
                <div class="step-panel-headline">Establish trusted connection between D360 and Informatica tenants</div>
                <div class="sub-steps-summary">0 out of 1 completed</div>
            </div>
            <div class="step-panel-body">
                <div class="step-body-content">
                    <div class="step-left">
                        <div class="step-description">
                            Configure details for the Informatica tenant, so that a trusted connection between them can be provided. The important items are "User-Name" and "Password"
                        </div>
                        <div class="form-columns">
                            <div>
                                <h4 style="margin-bottom: 15px;">Existing Connection</h4>
                                <div class="form-field">
                                    <label>Connection Name</label>
                                    <select id="existing-connection">
                                        <option value="">Select existing connection...</option>
                                        <option value="prod">Production - Informatica</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 15px;">New Connection</h4>
                                <div class="form-field">
                                    <label>Connection Name</label>
                                    <input type="text" id="connection-name" placeholder="Enter connection name">
                                </div>
                                <div class="form-field">
                                    <label>Tenant URL</label>
                                    <input type="text" id="tenant-url" placeholder="https://...">
                                </div>
                                <div class="form-field">
                                    <label>User Name</label>
                                    <input type="text" id="username" placeholder="Enter username">
                                </div>
                                <div class="form-field">
                                    <label>Password</label>
                                    <input type="password" id="password" placeholder="Enter password">
                                </div>
                                <button class="action-button" onclick="validateConnection()">Validate</button>
                                <div class="validation-result" id="connection-validation"></div>
                            </div>
                        </div>
                    </div>
                    <div class="step-right">
                        <h4>Resources</h4>
                    </div>
                </div>
            </div>
            <div class="step-panel-footer">
                <div class="footer-left">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="next-step-btn" onclick="goToNextStep('connect-informatica')">Next Step</button>
            </div>
        </div>
    `;
}

function renderChooseBusinessEntityPanel() {
    const entities = [
        'Customer', 'Organization', 'Product', 'Supplier', 'Employee',
        'Asset', 'Location', 'Contract', 'Invoice', 'Order'
    ];

    const entityOptions = entities.map(entity => `
        <div class="select-option">
            <input type="checkbox" id="entity-${entity}" value="${entity}" onchange="updateEntitySelection()">
            <label for="entity-${entity}">${entity}</label>
        </div>
    `).join('');

    return `
        <div class="step-panel collapsed" id="choose-entities" data-step="choose-entities">
            <div class="step-panel-header" onclick="togglePanel('choose-entities')">
                <div class="step-panel-title">
                    <span class="expand-icon">▶</span>
                    Choose Business Entity
                </div>
                <div class="step-panel-headline">Select Business from the connected tenant to integrate into Data 360</div>
                <div class="sub-steps-summary">0 out of 1 completed</div>
            </div>
            <div class="step-panel-body">
                <div class="step-body-content">
                    <div class="step-left">
                        <div class="step-description">
                            Select one or more business entities from Informatica's primary business entities to integrate into Data 360.
                        </div>
                        <div class="multi-select" id="entity-selector">
                            ${entityOptions}
                        </div>
                        <div class="notification info" id="relationship-notification" style="display: none; margin-top: 15px;">
                            When multiple entities are selected, the relationships between the entities will also be included.
                        </div>
                    </div>
                    <div class="step-right">
                        <h4>Resources</h4>
                    </div>
                </div>
            </div>
            <div class="step-panel-footer">
                <div class="footer-left">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="next-step-btn" onclick="goToNextStep('choose-entities')">Next Step</button>
            </div>
        </div>
    `;
}

function renderReviewMappingsPanel() {
    const tables = [
        { name: 'Customer_Profile', fields: ['FirstName', 'LastName', 'Email', 'Phone', 'DateOfBirth', 'CustomField1', 'CustomField2'] },
        { name: 'Customer_Address', fields: ['Street', 'City', 'State', 'PostalCode', 'Country'] },
        { name: 'Customer_Preferences', fields: ['Language', 'Currency', 'TimeZone', 'ContactPreference'] },
        { name: 'Organization_Details', fields: ['OrgName', 'Industry', 'Revenue', 'EmployeeCount'] },
        { name: 'Contact_Point', fields: ['ContactType', 'ContactValue', 'IsPrimary'] }
    ];

    const tableList = tables.map(table => `
        <div class="table-item">
            <div><strong>${table.name}</strong></div>
            <div class="field-list">
                ${table.fields.map(field => `<div class="field-item">• ${field}</div>`).join('')}
            </div>
            <button class="action-button secondary" style="margin-top: 10px;" onclick="showNotification('Redirecting to mapping editor...')">Review Mappings & Create Fields</button>
        </div>
    `).join('');

    return `
        <div class="step-panel collapsed" id="review-mappings" data-step="review-mappings">
            <div class="step-panel-header" onclick="togglePanel('review-mappings')">
                <div class="step-panel-title">
                    <span class="expand-icon">▶</span>
                    Review Mappings
                </div>
                <div class="step-panel-headline">Review and configure field mappings for selected business entities</div>
                <div class="sub-steps-summary">0 out of 1 completed</div>
            </div>
            <div class="step-panel-body">
                <div class="step-body-content">
                    <div class="step-left">
                        <div class="step-description">
                            Based on selected business entities, these are the data objects identified from Informatica that are being synced to Data 360.
                        </div>
                        <div class="table-list">
                            ${tableList}
                        </div>
                        <div class="notification" style="margin-top: 15px;">
                            We've detected extra fields beyond the standard. Below is the proposed list of modifications to Salesforce's DMO to add placeholders for these values.
                        </div>
                        <div style="margin-top: 15px;">
                            <input type="checkbox" id="mappings-reviewed" onchange="updateSubstep('review-mappings', 0, this.checked)">
                            <label for="mappings-reviewed">Mappings and schema reviewed</label>
                        </div>
                    </div>
                    <div class="step-right">
                        <h4>Resources</h4>
                    </div>
                </div>
            </div>
            <div class="step-panel-footer">
                <div class="footer-left">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="next-step-btn" onclick="goToNextStep('review-mappings')">Next Step</button>
            </div>
        </div>
    `;
}

function renderValidateDataPanel() {
    return `
        <div class="step-panel collapsed" id="validate-data" data-step="validate-data">
            <div class="step-panel-header" onclick="togglePanel('validate-data')">
                <div class="step-panel-title">
                    <span class="expand-icon">▶</span>
                    Validate Connected Data
                </div>
                <div class="step-panel-headline">Validate mapping and field value population with sample data</div>
                <div class="sub-steps-summary">0 out of 3 completed</div>
            </div>
            <div class="step-panel-body">
                <div class="step-body-content">
                    <div class="step-left">
                        <div class="step-description">
                            By now we've integrated, mapped and transformed the Business Entities to the Standard Data Model. The following previews are based on sample data to help validate correctness of mapping and field value population.
                        </div>
                        <div>
                            <div class="preview-item">
                                <span class="preview-label">View Individuals and Contact Points by Data Source</span>
                                <button class="action-button secondary" onclick="showPreview('individuals-by-source', 'validate-data', 0)">Preview</button>
                            </div>
                            <div class="preview-item">
                                <span class="preview-label">View Sample of Individuals and Contact Points</span>
                                <button class="action-button secondary" onclick="showPreview('individuals-sample', 'validate-data', 1)">Preview</button>
                            </div>
                            <div class="preview-item">
                                <span class="preview-label">View Sample of Emails, Phones or Address</span>
                                <button class="action-button secondary" onclick="showPreview('contact-sample', 'validate-data', 2)">Preview</button>
                            </div>
                        </div>
                    </div>
                    <div class="step-right">
                        <h4>Resources</h4>
                    </div>
                </div>
            </div>
            <div class="step-panel-footer">
                <div class="footer-left">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="next-step-btn" onclick="goToNextStep('validate-data')">Next Step</button>
            </div>
        </div>
    `;
}

function renderSetupIdentityPanel() {
    return `
        <div class="step-panel collapsed" id="setup-identity" data-step="setup-identity">
            <div class="step-panel-header" onclick="togglePanel('setup-identity')">
                <div class="step-panel-title">
                    <span class="expand-icon">▶</span>
                    Set up Identity Rules
                </div>
                <div class="step-panel-headline">Configure rules for linking new profile data to existing entities</div>
                <div class="sub-steps-summary">0 out of 1 completed</div>
            </div>
            <div class="step-panel-body">
                <div class="step-body-content">
                    <div class="step-left">
                        <div class="step-description">
                            In this section we are going to configure the rules that govern how to link new profile data to existing business entities.
                        </div>
                        <button class="action-button" onclick="showNotification('Opening Match and Reconciliation Rules configuration...')">Configure Match and Reconciliation Rules</button>
                    </div>
                    <div class="step-right">
                        <h4>Resources</h4>
                    </div>
                </div>
            </div>
            <div class="step-panel-footer">
                <div class="footer-left">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="next-step-btn" onclick="goToNextStep('setup-identity')">Next Step</button>
            </div>
        </div>
    `;
}

function renderValidateIdentityPanel() {
    return `
        <div class="step-panel collapsed" id="validate-identity" data-step="validate-identity">
            <div class="step-panel-header" onclick="togglePanel('validate-identity')">
                <div class="step-panel-title">
                    <span class="expand-icon">▶</span>
                    Validate Identity Data
                </div>
                <div class="step-panel-headline">Inspect identity resolution results with sample data</div>
                <div class="sub-steps-summary">0 out of 5 completed</div>
            </div>
            <div class="step-panel-body">
                <div class="step-body-content">
                    <div class="step-left">
                        <div class="step-description">
                            After Identity Resolution has finished processing, use the following sample data previews to inspect the data.
                        </div>
                        <div>
                            <div class="preview-item">
                                <span class="preview-label">Preview Sample Profile Data</span>
                                <button class="action-button secondary" onclick="showPreview('profile-data', 'validate-identity', 0)">Preview</button>
                            </div>
                            <div class="preview-item">
                                <span class="preview-label">Explore the outliers</span>
                                <button class="action-button secondary" onclick="showPreview('outliers', 'validate-identity', 1)">Preview</button>
                            </div>
                            <div class="preview-item">
                                <span class="preview-label">Preview Identity Process Summary (Total Source Profiles, Total Unified Profiles, Consolidation Rate)</span>
                                <button class="action-button secondary" onclick="showPreview('process-summary', 'validate-identity', 2)">Preview</button>
                            </div>
                            <div class="preview-item">
                                <span class="preview-label">Preview Consolidation Rate by Data Source</span>
                                <button class="action-button secondary" onclick="showPreview('consolidation-rate', 'validate-identity', 3)">Preview</button>
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <div class="toggle-switch">
                                <input type="checkbox" id="identity-schedule" onchange="updateSubstep('validate-identity', 4, this.checked)">
                                <label for="identity-schedule" class="toggle-label">Enable Identity Rules Schedule</label>
                            </div>
                        </div>
                    </div>
                    <div class="step-right">
                        <h4>Resources</h4>
                    </div>
                </div>
            </div>
            <div class="step-panel-footer">
                <div class="footer-left">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="next-step-btn" onclick="goToNextStep('validate-identity')">Next Step</button>
            </div>
        </div>
    `;
}

function renderEnableSyncPanel() {
    return `
        <div class="step-panel collapsed" id="enable-sync" data-step="enable-sync">
            <div class="step-panel-header" onclick="togglePanel('enable-sync')">
                <div class="step-panel-title">
                    <span class="expand-icon">▶</span>
                    Enable sync to Informatica
                </div>
                <div class="step-panel-headline">Share source records with Informatica for enrichment</div>
                <div class="sub-steps-summary">0 out of 1 completed</div>
            </div>
            <div class="step-panel-body">
                <div class="step-body-content">
                    <div class="step-left">
                        <div class="step-description">
                            Enable sync to Informatica for Key-Rings that do not contain a business entity. Share the source records for enrichment and quality assurance.
                        </div>
                        <button class="action-button" onclick="showNotification('Opening D360 Setup configuration in Informatica...')">Configure D360 Setup in Informatica</button>
                        <div style="margin-top: 15px;">
                            <input type="checkbox" id="sync-complete" onchange="updateSubstep('enable-sync', 0, this.checked)">
                            <label for="sync-complete">Sync configuration completed</label>
                        </div>
                    </div>
                    <div class="step-right">
                        <h4>Resources</h4>
                    </div>
                </div>
            </div>
            <div class="step-panel-footer">
                <div class="footer-left">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="next-step-btn" onclick="goToNextStep('enable-sync')">Next Step</button>
            </div>
        </div>
    `;
}

function renderSetupExperiencesPanel() {
    return `
        <div class="step-panel collapsed" id="setup-experiences" data-step="setup-experiences">
            <div class="step-panel-header" onclick="togglePanel('setup-experiences')">
                <div class="step-panel-title">
                    <span class="expand-icon">▶</span>
                    Setup Experiences
                </div>
                <div class="step-panel-headline">Configure user experiences and workflows</div>
                <div class="sub-steps-summary">0 out of 3 completed</div>
            </div>
            <div class="step-panel-body">
                <div class="step-body-content">
                    <div class="step-left">
                        <div class="substeps-list">
                            <div class="substep-item">
                                <input type="checkbox" class="substep-checkbox" id="search-before-create" onchange="updateSubstep('setup-experiences', 0, this.checked)">
                                <div class="substep-content">
                                    <div class="substep-label">Search Before Create</div>
                                    <div class="substep-description">Prevent duplicate records from being created</div>
                                    <a href="#" class="footer-link">View Trailhead for Setup</a>
                                </div>
                            </div>
                            <div class="substep-item">
                                <input type="checkbox" class="substep-checkbox" id="copy-field" onchange="updateSubstep('setup-experiences', 1, this.checked)">
                                <div class="substep-content">
                                    <div class="substep-label">Copy Field</div>
                                    <div class="substep-description">Enrich operational records with enterprise attributes</div>
                                    <a href="#" class="footer-link">View Trailhead for Setup</a>
                                </div>
                            </div>
                            <div class="substep-item">
                                <input type="checkbox" class="substep-checkbox" id="related-list" onchange="updateSubstep('setup-experiences', 2, this.checked)">
                                <div class="substep-content">
                                    <div class="substep-label">Related List</div>
                                    <div class="substep-description">Showcase any information related to the primary entity</div>
                                    <a href="#" class="footer-link">View Trailhead for Setup</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="step-right">
                        <h4>Resources</h4>
                    </div>
                </div>
            </div>
            <div class="step-panel-footer">
                <div class="footer-left">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="next-step-btn" onclick="goToNextStep('setup-experiences')">Complete</button>
            </div>
        </div>
    `;
}

// Event Handlers and Helper Functions
function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    panel.classList.toggle('collapsed');

    // Update step status to in-progress when opened for the first time
    if (!panel.classList.contains('collapsed') && appState.stepStatuses[panelId].status === 'not-started') {
        appState.stepStatuses[panelId].status = 'in-progress';
        updateStepSummary();
    }
}

function toggleStepSummary() {
    const stepSummary = document.getElementById('step-summary');
    stepSummary.classList.toggle('collapsed');
}

function scrollToStep(stepId) {
    const panel = document.getElementById(stepId);
    if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (panel.classList.contains('collapsed')) {
            panel.classList.remove('collapsed');
        }
    }
}

function goToNextStep(currentStepId) {
    const steps = ['connect-informatica', 'choose-entities', 'review-mappings', 'validate-data',
                   'setup-identity', 'validate-identity', 'enable-sync', 'setup-experiences'];
    const currentIndex = steps.indexOf(currentStepId);

    if (currentIndex < steps.length - 1) {
        const nextStep = steps[currentIndex + 1];
        const currentPanel = document.getElementById(currentStepId);
        const nextPanel = document.getElementById(nextStep);

        // Collapse current panel
        currentPanel.classList.add('collapsed');

        // Scroll to next panel and expand it
        setTimeout(() => {
            nextPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            nextPanel.classList.remove('collapsed');

            // Update status
            if (appState.stepStatuses[nextStep].status === 'not-started') {
                appState.stepStatuses[nextStep].status = 'in-progress';
                updateStepSummary();
            }
        }, 300);
    }
}

function updateSubstep(stepId, substepIndex, isCompleted) {
    const status = appState.stepStatuses[stepId];

    if (isCompleted) {
        status.completed = Math.min(status.completed + 1, status.total);
    } else {
        status.completed = Math.max(status.completed - 1, 0);
    }

    // Update status
    if (status.completed === 0) {
        status.status = 'in-progress';
    } else if (status.completed === status.total) {
        status.status = 'completed';
    } else {
        status.status = 'in-progress';
    }

    // Update UI
    updateStepPanel(stepId);
    updateStepSummary();
}

function updateStepPanel(stepId) {
    const panel = document.getElementById(stepId);
    const status = appState.stepStatuses[stepId];
    const summaryElement = panel.querySelector('.sub-steps-summary');

    if (summaryElement) {
        summaryElement.textContent = `${status.completed} out of ${status.total} completed`;
    }
}

function updateStepSummary() {
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        const stepId = item.getAttribute('onclick').match(/'([^']+)'/)[1];
        const status = appState.stepStatuses[stepId];
        const iconElement = item.querySelector('.step-status-icon');
        iconElement.textContent = getStatusIcon(status.status);
    });
}

function getStatusIcon(status) {
    switch(status) {
        case 'not-started':
            return '○';
        case 'in-progress':
            return '◐';
        case 'completed':
            return '✓';
        default:
            return '○';
    }
}

function validateConnection() {
    const validationResult = document.getElementById('connection-validation');
    validationResult.style.display = 'block';
    validationResult.className = 'validation-result';
    validationResult.innerHTML = '<div class="spinner"></div> Validating connection...';

    setTimeout(() => {
        validationResult.className = 'validation-result success';
        validationResult.innerHTML = '✓ Connection validated successfully!';
        updateSubstep('connect-informatica', 0, true);
    }, 1500);
}

function updateEntitySelection() {
    const checkboxes = document.querySelectorAll('#entity-selector input[type="checkbox"]');
    const selectedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const notification = document.getElementById('relationship-notification');

    if (selectedCount > 1) {
        notification.style.display = 'block';
    } else {
        notification.style.display = 'none';
    }

    if (selectedCount > 0) {
        updateSubstep('choose-entities', 0, true);
    } else {
        updateSubstep('choose-entities', 0, false);
    }
}

function showPreview(previewType, stepId, substepIndex) {
    showNotification(`Opening preview: ${previewType}...`);
    updateSubstep(stepId, substepIndex, true);
}

function showNotification(message) {
    alert(message);
}

function setupIntegrationPageListeners() {
    // Additional setup if needed
    updateStepSummary();
}
