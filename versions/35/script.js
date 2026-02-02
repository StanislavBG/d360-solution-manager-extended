// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    stepStatuses: {},
    stepSubSteps: {}
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadPage('home');
});

function initializeApp() {
    setupAppPicker();
    setupNavigation();
    setupLeftNavToggle();
}

// App Picker
function setupAppPicker() {
    const appPickerIcon = document.getElementById('app-picker-icon');
    const appDropdown = document.getElementById('app-dropdown');
    const appLabel = document.getElementById('app-label');

    appPickerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        appDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
        appDropdown.classList.add('hidden');
    });

    const appOptions = document.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedApp = option.dataset.app;
            appState.currentApp = selectedApp;
            appLabel.textContent = selectedApp;

            appOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            appDropdown.classList.add('hidden');
        });
    });
}

// Navigation
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.dataset.page;
            loadPage(page);

            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    const leftNavItems = document.querySelectorAll('.nav-item');
    leftNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            loadPage(page);

            leftNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Left Navigation Toggle
function setupLeftNavToggle() {
    const navToggle = document.getElementById('nav-toggle');
    const leftNav = document.getElementById('left-navigation');

    navToggle.addEventListener('click', () => {
        leftNav.classList.toggle('expanded');
        leftNav.classList.toggle('collapsed');
    });
}

// Page Loader
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
        case 'df-integrate-entities':
            renderDFIntegrateEntitiesPage();
            break;
        case '262-integrate-entities':
            render262IntegrateEntitiesPage();
            break;
        case 'customer-households':
            renderCustomerHouseholdsPage();
            break;
        default:
            pageArea.innerHTML = '<div class="empty-state">Page content will be displayed here</div>';
    }
}

// Solution Manager Page
function renderSolutionManagerPage() {
    const pageArea = document.getElementById('page-area');

    const html = `
        <div class="solution-manager-page">
            <h1 style="margin-bottom: 30px; font-size: 28px; color: #333;">Solution Manager</h1>
            <div class="tiles-container">
                <div class="tile" onclick="loadPage('262-integrate-entities')">
                    <div class="tile-title">Integrate Business Entities from Informatica in Data 360</div>
                    <div class="tile-description">
                        Realize the full potential of the curated and enriched business entities from
                        Informatica directly in D360. In this step by step guide, we will work though the steps
                        required to operationalize business entities created in Informatica in D360
                    </div>
                </div>

                <div class="tile" onclick="loadPage('df-integrate-entities')">
                    <div class="tile-title">Integrate Business Entities from Informatica in Data 360</div>
                    <div class="tile-description">
                        Realize the full potential of the curated and enriched business entities from
                        Informatica directly in D360. In this step by step guide, we will work though the steps
                        required to operationalize business entities created in Informatica in D360
                    </div>
                </div>

                <div class="tile" onclick="loadPage('customer-households')">
                    <div class="tile-title">Integrate and expand CRM Households in Data 360</div>
                    <div class="tile-description">
                        Enable Analytics, Marketing and Agentic experiences for your existing
                        Customer Households. Extend the Household profile with engagement data from other
                        systems though Unified Individuals and Household link Rules.
                    </div>
                </div>
            </div>
        </div>
    `;

    pageArea.innerHTML = html;
}

// Customer Households Page
function renderCustomerHouseholdsPage() {
    const pageArea = document.getElementById('page-area');
    pageArea.innerHTML = '<div class="work-in-progress">WORK IN PROGRESS</div>';
}

// DF Integrate Business Entities Page
function renderDFIntegrateEntitiesPage() {
    const pageId = 'df-integrate-entities';
    initializePageState(pageId);

    const steps = [
        { id: 'connect-informatica', title: 'Connect to Informatica System', substeps: 1 },
        { id: 'choose-entity', title: 'Choose Business Entity', substeps: 2 },
        { id: 'identity-resolution', title: 'Choose Identity Resolution Type', substeps: 1 },
        { id: 'review-mappings', title: 'Review Mappings', substeps: 1 },
        { id: 'validate-data', title: 'Validate Connected Data', substeps: 3 },
        { id: 'identity-rules', title: 'Set up Identity Rules', substeps: 1 },
        { id: 'validate-identity', title: 'Validate Identity Data', substeps: 5 },
        { id: 'sync-informatica', title: 'Enable sync to Informatica', substeps: 1 },
        { id: 'setup-experiences', title: 'Setup Experiences', substeps: 3 }
    ];

    const pageArea = document.getElementById('page-area');
    const html = `
        <div class="solution-page" id="${pageId}">
            <div class="header-instructions">
                <h1>Integrate Business Entities from Informatica in Data 360</h1>
                <p>Realize the full potential of the curated and enriched business entities from
                Informatica directly in D360. In this step by step guide, we will work though the steps
                required to operationalize business entities created in Informatica in D360</p>
            </div>

            ${renderStepSummary(pageId, steps)}

            <div class="step-details-container">
                ${renderDFStepDetails(pageId)}
            </div>
        </div>
    `;

    pageArea.innerHTML = html;
    attachStepEventListeners(pageId, steps);
}

// 262 Integrate Business Entities Page
function render262IntegrateEntitiesPage() {
    const pageId = '262-integrate-entities';
    initializePageState(pageId);

    const steps = [
        { id: 'solution-guide', title: 'Solution Guide', substeps: 0 },
        { id: 'create-ingestion', title: 'Create Ingestion End-Point', substeps: 1 },
        { id: 'create-schema', title: 'Create Schema on D360-End-Point', substeps: 1 },
        { id: 'create-business-entity', title: 'Create Business Entity to Normalized-Lake', substeps: 1 },
        { id: 'publish-day0', title: 'Publish Day0', substeps: 1 },
        { id: 'publish-day1', title: 'Publish Day1', substeps: 1 },
        { id: 'byo-mdm', title: 'Bring Your Own MDM (MDS/IR)', substeps: 1 },
        { id: 'mdm-datakit', title: 'Data-360-MDM Datakit', substeps: 1 },
        { id: 'search-before-create', title: 'Search Before Create', substeps: 1 },
        { id: 'crm-enrichment', title: 'CRM Enrichment', substeps: 1 }
    ];

    const pageArea = document.getElementById('page-area');
    const html = `
        <div class="solution-page" id="${pageId}">
            <div class="header-instructions">
                <h1>Integrate Business Entities from Informatica in Data 360</h1>
                <p>Realize the full potential of the curated and enriched business entities from
                Informatica directly in D360. In this step by step guide, we will work though the steps
                required to operationalize business entities created in Informatica in D360</p>
            </div>

            ${renderStepSummary(pageId, steps)}

            <div class="step-details-container">
                ${render262StepDetails(pageId)}
            </div>
        </div>
    `;

    pageArea.innerHTML = html;
    attachStepEventListeners(pageId, steps);
}

// Initialize Page State
function initializePageState(pageId) {
    if (!appState.stepStatuses[pageId]) {
        appState.stepStatuses[pageId] = {};
    }
    if (!appState.stepSubSteps[pageId]) {
        appState.stepSubSteps[pageId] = {};
    }
}

// Render Step Summary
function renderStepSummary(pageId, steps) {
    return `
        <div class="step-summary" id="step-summary-${pageId}">
            <div class="step-summary-header">
                <div class="step-summary-title">Steps Overview</div>
                <button class="collapse-btn" onclick="toggleStepSummary('${pageId}')">▼</button>
            </div>
            <div class="step-summary-content">
                <div class="steps-list">
                    ${steps.map(step => `
                        <div class="step-item" onclick="scrollToStep('${pageId}', '${step.id}')">
                            <span class="step-status-icon ${getStepStatusClass(pageId, step.id)}">
                                ${getStepStatusIcon(pageId, step.id)}
                            </span>
                            <span>${step.title}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="video-placeholder">
                    <div>📹 Video Tutorial</div>
                    <div style="margin-top: 10px;">
                        <a href="#" class="footer-link">View Documentation</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Toggle Step Summary
function toggleStepSummary(pageId) {
    const summary = document.getElementById(`step-summary-${pageId}`);
    summary.classList.toggle('collapsed');
}

// Scroll to Step
function scrollToStep(pageId, stepId) {
    const stepPanel = document.getElementById(`step-${pageId}-${stepId}`);
    if (stepPanel) {
        stepPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (!stepPanel.classList.contains('expanded')) {
            toggleStepPanel(pageId, stepId);
        }
    }
}

// Get Step Status
function getStepStatus(pageId, stepId) {
    return appState.stepStatuses[pageId]?.[stepId] || 'not-started';
}

function getStepStatusClass(pageId, stepId) {
    return getStepStatus(pageId, stepId);
}

function getStepStatusIcon(pageId, stepId) {
    const status = getStepStatus(pageId, stepId);
    switch(status) {
        case 'completed': return '✓';
        case 'in-progress': return '◐';
        default: return '○';
    }
}

// Update Step Status
function updateStepStatus(pageId, stepId, status) {
    appState.stepStatuses[pageId][stepId] = status;
    updateStepSummaryDisplay(pageId);
}

function updateStepSummaryDisplay(pageId) {
    const summary = document.getElementById(`step-summary-${pageId}`);
    if (summary) {
        const stepItems = summary.querySelectorAll('.step-item');
        stepItems.forEach(item => {
            const stepId = item.getAttribute('onclick').match(/'([^']+)'\)$/)[1];
            const icon = item.querySelector('.step-status-icon');
            const status = getStepStatus(pageId, stepId);
            icon.className = `step-status-icon ${status}`;
            icon.textContent = getStepStatusIcon(pageId, stepId);
        });
    }
}

// Toggle Step Panel
function toggleStepPanel(pageId, stepId) {
    const panel = document.getElementById(`step-${pageId}-${stepId}`);
    if (panel) {
        panel.classList.toggle('expanded');
        if (panel.classList.contains('expanded') && getStepStatus(pageId, stepId) === 'not-started') {
            updateStepStatus(pageId, stepId, 'in-progress');
        }
    }
}

// Track Substep Completion
function updateSubstepCount(pageId, stepId) {
    const panel = document.getElementById(`step-${pageId}-${stepId}`);
    if (!panel) return;

    const checkboxes = panel.querySelectorAll('.substep-checkbox');
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;

    const summary = panel.querySelector('.sub-steps-summary');
    if (summary) {
        summary.textContent = `${completed} out of ${total}`;
    }

    appState.stepSubSteps[pageId][stepId] = { completed, total };
}

// Next Step Handler
function handleNextStep(pageId, stepId, steps) {
    updateStepStatus(pageId, stepId, 'completed');

    const currentIndex = steps.findIndex(s => s.id === stepId);
    if (currentIndex < steps.length - 1) {
        const nextStep = steps[currentIndex + 1];
        toggleStepPanel(pageId, stepId);
        scrollToStep(pageId, nextStep.id);
    }
}

// Attach Event Listeners
function attachStepEventListeners(pageId, steps) {
    steps.forEach(step => {
        const panel = document.getElementById(`step-${pageId}-${step.id}`);
        if (!panel) return;

        const header = panel.querySelector('.step-header');
        header.addEventListener('click', () => {
            toggleStepPanel(pageId, step.id);
        });

        const checkboxes = panel.querySelectorAll('.substep-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateSubstepCount(pageId, step.id);
            });
        });

        const nextBtn = panel.querySelector('.next-step-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleNextStep(pageId, step.id, steps);
            });
        }
    });
}

// Render DF Step Details
function renderDFStepDetails(pageId) {
    return `
        ${renderStepPanel(pageId, 'connect-informatica',
            'Connect to Informatica System',
            'Establish trusted connection between D360 and Informatica tenants',
            `
                <div class="step-description">
                    Configure details for the Informatica tenant, so that a trusted connection between them can be provided.
                    The important items are "User-Name" and "Password"
                </div>
                <div class="form-columns">
                    <div>
                        <h4 style="margin-bottom: 15px;">Existing Connection</h4>
                        <div class="form-group">
                            <label class="form-label">Connection Name</label>
                            <select class="form-select">
                                <option>Select existing connection</option>
                                <option>Connection 1</option>
                                <option>Connection 2</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 15px;">New Connection</h4>
                        <div class="form-group">
                            <label class="form-label">Connection Name</label>
                            <input type="text" class="form-input" placeholder="Enter connection name">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tenant URL</label>
                            <input type="text" class="form-input" placeholder="Enter tenant URL">
                        </div>
                        <div class="form-group">
                            <label class="form-label">User Name</label>
                            <input type="text" class="form-input" placeholder="Enter username">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" placeholder="Enter password">
                        </div>
                    </div>
                </div>
                <div class="validation-section">
                    <button class="validation-button" onclick="validateConnection(this)">Validate</button>
                    <div class="validation-result"></div>
                </div>
            `,
            `<button class="action-button">Configure Connection</button>`
        )}

        ${renderStepPanel(pageId, 'choose-entity',
            'Choose Business Entity',
            'Select Business from the connected tenant to integrate into Data 360',
            `
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            <div class="form-group">
                                <label class="form-label">Select Tenant</label>
                                <select class="form-select">
                                    <option>USA-1</option>
                                    <option>USA-2</option>
                                    <option>Europe-1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            <div class="form-group">
                                <label class="form-label">Select Business Entities (multiple allowed)</label>
                                <div style="margin-top: 10px;">
                                    <label style="display: block; margin: 8px 0;">
                                        <input type="checkbox" /> Customer
                                    </label>
                                    <label style="display: block; margin: 8px 0;">
                                        <input type="checkbox" /> Organization
                                    </label>
                                    <label style="display: block; margin: 8px 0;">
                                        <input type="checkbox" /> Product
                                    </label>
                                    <label style="display: block; margin: 8px 0;">
                                        <input type="checkbox" /> Supplier
                                    </label>
                                    <label style="display: block; margin: 8px 0;">
                                        <input type="checkbox" /> Contact
                                    </label>
                                    <label style="display: block; margin: 8px 0;">
                                        <input type="checkbox" /> Account
                                    </label>
                                    <label style="display: block; margin: 8px 0;">
                                        <input type="checkbox" /> Lead
                                    </label>
                                    <label style="display: block; margin: 8px 0;">
                                        <input type="checkbox" /> Opportunity
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="notification">
                    When multiple entities are selected, the relationship between the entities will also be included
                </div>
            `,
            `<button class="action-button">Select Entities</button>`
        )}

        ${renderStepPanel(pageId, 'identity-resolution',
            'Choose Identity Resolution Type',
            'Choose between Business Entity as Unified Profile OR Golden Key-Ring',
            `
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            <label style="display: block; margin: 15px 0;">
                                <input type="radio" name="resolution-type" value="direct" style="margin-right: 10px;" />
                                <strong>Business Entity as Unified Profile (Direct Mapping)</strong>
                                <div style="margin-left: 30px; margin-top: 8px; color: #666; font-size: 13px;">
                                    In this mode the Business Entity completely replaces the Unified Profile by taking its place.
                                    Customers must ensure that all profile data is being sent to Informatica as well. It will only
                                    appear after it has been processed through Informatica.
                                </div>
                            </label>
                            <label style="display: block; margin: 15px 0;">
                                <input type="radio" name="resolution-type" value="keyring" style="margin-right: 10px;" />
                                <strong>Golden Key-Ring (D360 is MDM Aware)</strong>
                                <div style="margin-left: 30px; margin-top: 8px; color: #666; font-size: 13px;">
                                    The Business Entity is the primary and most trusted record on the Key-Ring. The Unified Profile
                                    is a superset of profile data in D360 and Informatica. Enables the Business Entity into the
                                    Real Time ecosystem for personalization.
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Choose Mode</button>`
        )}

        ${renderStepPanel(pageId, 'review-mappings',
            'Review Mappings',
            'Review data objects and field mappings from Informatica',
            `
                <div class="step-description">
                    Based on selected business entities these are the data objects identified from informatica that are
                    being synced to Data 360.
                </div>
                <div class="table-list">
                    ${generateTableList()}
                </div>
                <div class="notification">
                    We've detected extra fields beyond the standard. Below is the proposed list of modification to
                    Salesforce's DMO to add placeholders for these values
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" id="mappings-reviewed" />
                    <div class="substep-content">
                        <label for="mappings-reviewed" class="substep-text">Mappings and schema reviewed</label>
                    </div>
                </div>
            `,
            `<button class="action-button">Review All Mappings</button>`
        )}

        ${renderStepPanel(pageId, 'validate-data',
            'Validate Connected Data',
            'Preview and validate the integrated data',
            `
                <div class="step-description">
                    By now we've integrated, mapped and transformed the Business Entities to the Standard Data Model,
                    the following previews are based on sample data to help validate correctness of mapping and field value population
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">View Individuals and Contact Points by Data Source</div>
                    </div>
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">View Sample of Individuals and Contact Points</div>
                    </div>
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">View Sample of Emails, Phones or Address</div>
                    </div>
                </div>
            `,
            `
                <button class="action-button secondary">Preview Data Source</button>
                <button class="action-button secondary">Preview Individuals</button>
                <button class="action-button secondary">Preview Contact Points</button>
            `
        )}

        ${renderStepPanel(pageId, 'identity-rules',
            'Set up Identity Rules',
            'Configure rules to link profile data to business entities',
            `
                <div class="step-description">
                    In this section we are going to the rules that govern how to link new profile data to existing business
                    entities or form independent key-rings to be shared with Informatica-MDM. Integrity and precedence of the
                    Business Entities IDs is always preserved.
                </div>
                <p style="margin: 15px 0; font-weight: 600;">Based on the available mappings and data in Party Identifier and Identity Match we recommend to include the following match rules:</p>
                <ul class="match-rules-list">
                    <li class="match-rule-item">
                        <input type="checkbox" class="substep-checkbox" /> Fuzzy Name and Normalized Email
                    </li>
                    <li class="match-rule-item">
                        <input type="checkbox" class="substep-checkbox" /> Fuzzy Name and Normalized Phone
                    </li>
                    <li class="match-rule-item">
                        <input type="checkbox" class="substep-checkbox" /> Fuzzy Name and Normalized Address
                    </li>
                    <li class="match-rule-item">
                        <input type="checkbox" class="substep-checkbox" /> Party Identifiers: Person Identifier - MC Subscriber Key
                    </li>
                    <li class="match-rule-item">
                        <input type="checkbox" class="substep-checkbox" /> Party Identifiers: Person Identifier - 3rd Party Enrichment IDs
                    </li>
                    <li class="match-rule-item">
                        <input type="checkbox" class="substep-checkbox" /> Identity Match Rules: Lead to Contact
                    </li>
                    <li class="match-rule-item">
                        <input type="checkbox" class="substep-checkbox" /> Identity Match Rules: MDM Connection
                    </li>
                </ul>
                <p style="margin-top: 15px;">To modify the suggested match rules or include additional rules in the Identity Ruleset configuration</p>
            `,
            `<button class="action-button">Configure Rules</button>`
        )}

        ${renderStepPanel(pageId, 'validate-identity',
            'Validate Identity Data',
            'Preview identity resolution results and enable scheduling',
            `
                <div class="step-description">
                    After Identity Resolution has finished processing use the following sample data preview to inspect the data
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">Preview Sample Profile Data</div>
                    </div>
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">Explore the outliers</div>
                    </div>
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">Preview Identity Process Summary (Total Source Profiles, Total Unified Profiles, Consolidation Rate)</div>
                    </div>
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">Preview Consolidation Rate by Data Source</div>
                    </div>
                </div>
                <div class="substep-item" style="align-items: center;">
                    <div style="display: flex; align-items: center; gap: 15px; width: 100%;">
                        <label style="font-weight: 600;">Enable Identity Rules Schedule</label>
                        <div class="toggle-switch" onclick="toggleSwitch(this)">
                            <div class="toggle-knob"></div>
                        </div>
                    </div>
                </div>
            `,
            `
                <button class="action-button secondary">Preview Profiles</button>
                <button class="action-button secondary">View Summary</button>
            `
        )}

        ${renderStepPanel(pageId, 'sync-informatica',
            'Enable sync to Informatica',
            'Share Key-Rings without business entities to Informatica',
            `
                <div class="step-description">
                    Enable sync to Informatica for Key-Rings that do not contain a business entity.
                    Share the source records for enrichment and quality assurance.
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">Configuration completed in D360 Setup</div>
                    </div>
                </div>
            `,
            `<button class="action-button">Configure D360 Setup</button>`
        )}

        ${renderStepPanel(pageId, 'setup-experiences',
            'Setup Experiences',
            'Configure CRM experiences with Business Entity data',
            `
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            <strong>Search Before Create</strong> - prevent duplicate records from being created
                            <a href="#" class="substep-link">View Trailhead for Setup</a>
                        </div>
                    </div>
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            <strong>Copy field</strong> - enrich operational records with enterprise attributes
                            <a href="#" class="substep-link">View Trailhead for Setup</a>
                        </div>
                    </div>
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            <strong>Related List</strong> - showcase any information related to the primary entity
                            <a href="#" class="substep-link">View Trailhead for Setup</a>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Configure Experiences</button>`
        )}
    `;
}

// Render 262 Step Details
function render262StepDetails(pageId) {
    return `
        ${renderStepPanel(pageId, 'solution-guide',
            'Solution Guide',
            'View required steps and supporting documentation',
            `
                <div class="step-description">
                    Customer can view the required steps and supporting documentation in D360
                </div>
                <div class="notification">
                    This guide provides a comprehensive overview of the integration process with detailed documentation and reference links for each step.
                </div>
            `,
            `<button class="action-button">View Complete Guide</button>`,
            false
        )}

        ${renderStepPanel(pageId, 'create-ingestion',
            'Create Ingestion End-Point',
            'Setup Ingestion-API end-point from D360-Setup',
            `
                <div class="step-description">
                    Setup Ingestion-API end-point from D360-Setup to be able to receive the data.
                    Optionally customer can add additional fields on the Ingestion-API-Schema via D360-Setup after schema is registered.
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            Configure Ingestion API endpoint
                            <a href="#" class="substep-link">Navigate to D360-Setup page</a>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Open D360 Setup</button>`
        )}

        ${renderStepPanel(pageId, 'create-schema',
            'Create Schema on D360-End-Point',
            'Register business entities with predefined schema',
            `
                <div class="step-description">
                    Register the business entities with predefined schema against the Ingestion end-point.
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            Register schema for business entities
                            <a href="#" class="substep-link">Navigate to Ingestion-API-Schema page</a>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Configure Schema</button>`
        )}

        ${renderStepPanel(pageId, 'create-business-entity',
            'Create Business Entity to Normalized-Lake',
            'Install extensibility packages from Informatica',
            `
                <div class="step-description">
                    Install the extensibility packages from Informatica to help publish the business entity.
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            Install and configure extensibility packages
                            <a href="#" class="substep-link">Navigate to Informatica Extensibility Packages page</a>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Install Packages</button>`
        )}

        ${renderStepPanel(pageId, 'publish-day0',
            'Publish Day0',
            'Publish initial data load from Informatica to D360',
            `
                <div class="step-description">
                    Publish initial data load from Informatica to D360. Maintain schema sync if changed from D360.
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            Execute initial data load and verify
                            <a href="#" class="substep-link">Navigate to Informatica Publishing page</a>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Start Initial Load</button>`
        )}

        ${renderStepPanel(pageId, 'publish-day1',
            'Publish Day1',
            'Enable change data capture feed',
            `
                <div class="step-description">
                    Change data capture feed is enabled and only changes to D360 are sent.
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            Configure CDC feed
                            <a href="#" class="substep-link">Navigate to CDC Configuration page</a>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Configure CDC</button>`
        )}

        ${renderStepPanel(pageId, 'byo-mdm',
            'Bring Your Own MDM (MDS/IR)',
            'Populate data mastered in external MDM to Unified Profile',
            `
                <div class="step-description">
                    Ability for Customers to populate data mastered in external MDM to Unified Profile.
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            Configure external MDM integration
                            <a href="#" class="substep-link">Navigate to Unified Profile configuration page</a>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Configure MDM</button>`
        )}

        ${renderStepPanel(pageId, 'mdm-datakit',
            'Data-360-MDM Datakit',
            'Install mappings and BYO-MDM definitions',
            `
                <div class="step-description">
                    Customer installs mappings and BYO-MDM definitions from MDM-Datakit.
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            Install MDM Datakit
                            <a href="#" class="substep-link">Navigate to MDM-Datakit page</a>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Install Datakit</button>`
        )}

        ${renderStepPanel(pageId, 'search-before-create',
            'Search Before Create',
            'Install existing Informatica component',
            `
                <div class="step-description">
                    Customer install existing Informatica component.
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            Install Search Before Create component
                            <a href="#" class="substep-link">Navigate to Informatica Component page</a>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Install Component</button>`
        )}

        ${renderStepPanel(pageId, 'crm-enrichment',
            'CRM Enrichment',
            'Configure Profile Component, Field Enrichment, Related Lists',
            `
                <div class="step-description">
                    Profile Component, Field Enrichment, Related Lists are now available for configuration.
                </div>
                <div class="substep-item">
                    <input type="checkbox" class="substep-checkbox" />
                    <div class="substep-content">
                        <div class="substep-text">
                            Configure CRM enrichment features
                            <a href="#" class="substep-link">Navigate to CRM Configuration page</a>
                        </div>
                    </div>
                </div>
            `,
            `<button class="action-button">Configure CRM</button>`
        )}
    `;
}

// Render Step Panel Template
function renderStepPanel(pageId, stepId, title, headline, content, actions, showValidation = true) {
    return `
        <div class="step-panel collapsed" id="step-${pageId}-${stepId}">
            <div class="step-header">
                <div class="step-header-title">${title}</div>
                <div class="step-header-headline">${headline}</div>
                <div class="sub-steps-summary">0 out of 0</div>
            </div>
            <div class="step-main">
                <div class="step-main-body">
                    <div class="step-content-left">
                        ${content}
                    </div>
                    <div class="step-content-right">
                        ${actions}
                    </div>
                </div>
            </div>
            <div class="step-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="next-step-btn">Next Step</button>
            </div>
        </div>
    `;
}

// Generate Table List
function generateTableList() {
    const tables = [
        { name: 'Customer_Profile', fields: ['customer_id', 'first_name', 'last_name', 'email', 'phone'] },
        { name: 'Customer_Address', fields: ['address_id', 'street', 'city', 'state', 'zip_code'] },
        { name: 'Customer_Preferences', fields: ['pref_id', 'language', 'timezone', 'currency'] },
        { name: 'Contact_Information', fields: ['contact_id', 'mobile', 'work_phone', 'home_phone'] },
        { name: 'Organization_Data', fields: ['org_id', 'org_name', 'industry', 'size', 'revenue'] },
        { name: 'Product_Catalog', fields: ['product_id', 'product_name', 'category', 'price'] },
        { name: 'Supplier_Info', fields: ['supplier_id', 'supplier_name', 'contact', 'location'] },
        { name: 'Account_Details', fields: ['account_id', 'account_name', 'type', 'status'] },
        { name: 'Lead_Information', fields: ['lead_id', 'lead_source', 'status', 'score'] },
        { name: 'Opportunity_Data', fields: ['opp_id', 'opp_name', 'stage', 'amount'] },
        { name: 'Engagement_History', fields: ['engagement_id', 'type', 'date', 'outcome'] },
        { name: 'Transaction_Records', fields: ['transaction_id', 'amount', 'date', 'type'] }
    ];

    return tables.map(table => `
        <div class="table-item">
            <div>
                <strong>${table.name}</strong>
                <div class="field-list">${table.fields.join(', ')}</div>
            </div>
            <button class="action-button secondary" style="white-space: nowrap;">Review Mappings & Create Fields</button>
        </div>
    `).join('');
}

// Validation Connection
function validateConnection(btn) {
    const resultDiv = btn.parentElement.querySelector('.validation-result');
    resultDiv.innerHTML = '<span class="spinner"></span>';

    setTimeout(() => {
        resultDiv.innerHTML = '<div class="validation-success">✓ Connection validated successfully!</div>';
    }, 1500);
}

// Toggle Switch
function toggleSwitch(element) {
    element.classList.toggle('on');
}
