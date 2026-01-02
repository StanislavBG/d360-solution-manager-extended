// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    stepStates: {},
    stepSummaryCollapsed: false
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadPage('home');
});

function initializeApp() {
    // Initialize step states for the integrate page
    initializeStepStates();
}

function initializeStepStates() {
    const steps = [
        'connect-informatica',
        'choose-entity',
        'review-mappings',
        'validate-data',
        'setup-identity',
        'validate-identity',
        'enable-sync',
        'setup-experiences'
    ];

    steps.forEach(step => {
        appState.stepStates[step] = {
            status: 'not-started',
            completedSubsteps: 0,
            totalSubsteps: 0,
            expanded: false
        };
    });
}

function setupEventListeners() {
    // App picker dropdown
    const appPickerIcon = document.getElementById('app-picker-icon');
    const appDropdown = document.getElementById('app-dropdown');

    appPickerIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        appDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function() {
        appDropdown.classList.remove('show');
    });

    // App selection
    document.querySelectorAll('.app-option').forEach(option => {
        option.addEventListener('click', function() {
            const appName = this.dataset.app;
            selectApp(appName);
        });
    });

    // Top navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            selectNavTab(this);
            loadPage(page);
        });
    });

    // Left navigation
    document.getElementById('left-nav-collapse').addEventListener('click', function() {
        toggleLeftNavigation();
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            selectNavItem(this);
            loadPage(page);
        });
    });
}

function selectApp(appName) {
    appState.currentApp = appName;
    document.getElementById('app-label').textContent = appName;

    document.querySelectorAll('.app-option').forEach(opt => {
        opt.classList.remove('active');
    });

    document.querySelector(`[data-app="${appName}"]`).classList.add('active');
}

function selectNavTab(tab) {
    document.querySelectorAll('.nav-tab').forEach(t => {
        t.classList.remove('active');
    });
    tab.classList.add('active');
}

function selectNavItem(item) {
    document.querySelectorAll('.nav-item').forEach(i => {
        i.classList.remove('active');
    });
    item.classList.add('active');

    // Also clear nav tabs
    document.querySelectorAll('.nav-tab').forEach(t => {
        t.classList.remove('active');
    });
}

function toggleLeftNavigation() {
    const leftNav = document.getElementById('left-navigation');
    leftNav.classList.toggle('collapsed');
    leftNav.classList.toggle('expanded');
}

function loadPage(pageName) {
    appState.currentPage = pageName;
    const mainPageArea = document.getElementById('main-page-area');

    switch(pageName) {
        case 'home':
            mainPageArea.innerHTML = renderHomePage();
            break;
        case 'solution-manager':
            mainPageArea.innerHTML = renderSolutionManagerPage();
            setupSolutionManagerListeners();
            break;
        case 'integrate-business-entities':
            mainPageArea.innerHTML = renderIntegrateBusinessEntitiesPage();
            setupIntegratePageListeners();
            break;
        default:
            mainPageArea.innerHTML = renderEmptyState(pageName);
    }
}

function renderHomePage() {
    return `
        <div class="empty-state">
            <div class="empty-state-icon">🏠</div>
            <div class="empty-state-text">Welcome to Data 360</div>
        </div>
    `;
}

function renderSolutionManagerPage() {
    return `
        <div class="tile-grid">
            <div class="tile" data-tile="integrate-business-entities">
                <div class="tile-title">Integrate Business Entities from Informatica in Data360</div>
                <div class="tile-description">
                    Realize the full potential of the curated and enriched business entities from
                    Informatica directly in D360. In this step by step guide, we will work though the steps
                    required to operationalize business entities created in Informatica in D360
                </div>
            </div>
        </div>
    `;
}

function setupSolutionManagerListeners() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', function() {
            const tileName = this.dataset.tile;
            loadPage(tileName);
        });
    });
}

function renderEmptyState(pageName) {
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
            <div class="empty-state-icon">📋</div>
            <div class="empty-state-text">${pageNames[pageName] || 'Page'}</div>
        </div>
    `;
}

function renderIntegrateBusinessEntitiesPage() {
    return `
        <div class="integrate-page">
            <div class="header-instructions">
                <h1>Integrate Business Entities from Informatica in Data360</h1>
                <p>Realize the full potential of the curated and enriched business entities from
                Informatica directly in D360. In this step by step guide, we will work though the steps
                required to operationalize business entities created in Informatica in D360</p>
            </div>

            <div class="step-summary expanded" id="step-summary">
                <div class="step-summary-header" onclick="toggleStepSummary()">
                    <span class="step-summary-title">Setup Steps</span>
                    <span class="collapse-icon">▼</span>
                </div>
                <div class="step-summary-content">
                    <div class="step-list">
                        ${renderStepList()}
                    </div>
                    <div class="video-placeholder">
                        Video Tutorial & Documentation
                    </div>
                </div>
            </div>

            <div class="step-details-container">
                ${renderAllStepPanels()}
            </div>
        </div>
    `;
}

function renderStepList() {
    const steps = [
        { id: 'connect-informatica', label: 'Connect to Informatica System' },
        { id: 'choose-entity', label: 'Choose Business Entity' },
        { id: 'review-mappings', label: 'Review and Extend Mappings' },
        { id: 'validate-data', label: 'Validate Connected Data and Mappings' },
        { id: 'setup-identity', label: 'Set up Identity Rules' },
        { id: 'validate-identity', label: 'Validate Identity Data' },
        { id: 'enable-sync', label: 'Enable sync to Informatica' },
        { id: 'setup-experiences', label: 'Setup Experiences' }
    ];

    return steps.map((step, index) => {
        const state = appState.stepStates[step.id];
        const icon = getStepIcon(state.status);

        return `
            <div class="step-item" data-step="${step.id}" onclick="scrollToStep('${step.id}')">
                <span class="step-icon">${icon}</span>
                <span>${index + 1}. ${step.label}</span>
            </div>
        `;
    }).join('');
}

function getStepIcon(status) {
    switch(status) {
        case 'completed':
            return '✅';
        case 'in-progress':
            return '🔄';
        default:
            return '⚪';
    }
}

function renderAllStepPanels() {
    return `
        ${renderConnectInformaticaPanel()}
        ${renderChooseEntityPanel()}
        ${renderReviewMappingsPanel()}
        ${renderValidateDataPanel()}
        ${renderSetupIdentityPanel()}
        ${renderValidateIdentityPanel()}
        ${renderEnableSyncPanel()}
        ${renderSetupExperiencesPanel()}
    `;
}

function renderConnectInformaticaPanel() {
    return `
        <div class="step-panel collapsed" id="step-connect-informatica" data-step="connect-informatica">
            <div class="step-panel-header" onclick="toggleStepPanel('connect-informatica')">
                <div class="step-panel-header-content">
                    <div class="step-panel-header-left">
                        <div class="step-panel-title">Connect to Informatica System</div>
                        <div class="step-panel-headline">Establish trusted connection between D360 and Informatica tenants</div>
                        <div class="step-panel-progress">0 out of 5 completed</div>
                    </div>
                    <div class="step-panel-expand-icon">▼</div>
                </div>
            </div>
            <div class="step-panel-body">
                <div class="step-panel-content">
                    <div class="step-panel-left">
                        <div class="step-description">
                            Configure details for the Informatica tenant, so that a trusted connection between them can be provided.
                            The important items are "User-Name" and "Password"
                        </div>

                        <div class="form-group">
                            <label class="form-label">Connection Name</label>
                            <select class="form-select" id="connection-name" onchange="updateStepProgress('connect-informatica')">
                                <option value="">Choose existing or create new...</option>
                                <option value="new">Create New Connection</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Tenant URL</label>
                            <input type="text" class="form-input" id="tenant-url" placeholder="https://your-tenant.informatica.com" onchange="updateStepProgress('connect-informatica')">
                        </div>

                        <div class="form-group">
                            <label class="form-label">Username</label>
                            <input type="text" class="form-input" id="username" placeholder="Enter username" onchange="updateStepProgress('connect-informatica')">
                        </div>

                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" id="password" placeholder="Enter password" onchange="updateStepProgress('connect-informatica')">
                        </div>

                        <button class="action-button" onclick="validateConnection('connect-informatica')">Create & Validate</button>
                        <div id="validation-result-connect-informatica"></div>
                    </div>
                    <div class="step-panel-right">
                        <a href="#" class="doc-link">View Documentation</a>
                        <a href="#" class="doc-link">Tutorial Video</a>
                    </div>
                </div>
                <div class="step-footer">
                    <button class="action-button secondary" onclick="nextStep('connect-informatica')">Next Step</button>
                    <a href="#" class="doc-link">View Documentation</a>
                </div>
            </div>
        </div>
    `;
}

function renderChooseEntityPanel() {
    return `
        <div class="step-panel collapsed" id="step-choose-entity" data-step="choose-entity">
            <div class="step-panel-header" onclick="toggleStepPanel('choose-entity')">
                <div class="step-panel-header-content">
                    <div class="step-panel-header-left">
                        <div class="step-panel-title">Choose Business Entity</div>
                        <div class="step-panel-headline">Select Business Entity to integrate into Data 360</div>
                        <div class="step-panel-progress">0 out of 1 completed</div>
                    </div>
                    <div class="step-panel-expand-icon">▼</div>
                </div>
            </div>
            <div class="step-panel-body">
                <div class="step-panel-content">
                    <div class="step-panel-left">
                        <div class="step-description">
                            Select Business from the connected tenant to integrate into Data 360
                        </div>

                        <div class="form-group">
                            <label class="form-label">Business Entity</label>
                            <select class="form-select" id="business-entity" onchange="selectBusinessEntity(this.value)">
                                <option value="">Select a business entity...</option>
                                <option value="customer">Customer</option>
                                <option value="organization">Organization</option>
                                <option value="product">Product</option>
                                <option value="supplier">Supplier</option>
                            </select>
                        </div>
                    </div>
                    <div class="step-panel-right">
                        <a href="#" class="doc-link">View Documentation</a>
                        <a href="#" class="doc-link">Business Entity Guide</a>
                    </div>
                </div>
                <div class="step-footer">
                    <button class="action-button secondary" onclick="nextStep('choose-entity')">Next Step</button>
                    <a href="#" class="doc-link">View Documentation</a>
                </div>
            </div>
        </div>
    `;
}

function renderReviewMappingsPanel() {
    return `
        <div class="step-panel collapsed" id="step-review-mappings" data-step="review-mappings">
            <div class="step-panel-header" onclick="toggleStepPanel('review-mappings')">
                <div class="step-panel-header-content">
                    <div class="step-panel-header-left">
                        <div class="step-panel-title">Review and Extend Mappings</div>
                        <div class="step-panel-headline">Review data objects and field mappings</div>
                        <div class="step-panel-progress">0 out of 1 completed</div>
                    </div>
                    <div class="step-panel-expand-icon">▼</div>
                </div>
            </div>
            <div class="step-panel-body">
                <div class="step-panel-content">
                    <div class="step-panel-left">
                        <div class="step-description">
                            Based on selected business entities these are the data objects identified from Informatica
                            that are being synced to Data 360. Show a scrollable list of table names associated with
                            the respected business entity once the user has selected it.
                        </div>

                        <div id="mapping-tables">
                            <p style="color: #9ca3af; font-style: italic;">Select a business entity to view mappings</p>
                        </div>

                        <div class="notification-box">
                            We've detected extra fields beyond the standard. Below is the proposed list of modification
                            to Salesforce's DMO to add placeholders for these values.
                        </div>

                        <button class="action-button" onclick="reviewMappings()">Review Mappings</button>
                    </div>
                    <div class="step-panel-right">
                        <a href="#" class="doc-link">Mapping Documentation</a>
                        <a href="#" class="doc-link">DMO Schema Guide</a>
                    </div>
                </div>
                <div class="step-footer">
                    <button class="action-button secondary" onclick="nextStep('review-mappings')">Next Step</button>
                    <a href="#" class="doc-link">View Documentation</a>
                </div>
            </div>
        </div>
    `;
}

function renderValidateDataPanel() {
    return `
        <div class="step-panel collapsed" id="step-validate-data" data-step="validate-data">
            <div class="step-panel-header" onclick="toggleStepPanel('validate-data')">
                <div class="step-panel-header-content">
                    <div class="step-panel-header-left">
                        <div class="step-panel-title">Validate Connected Data and Mappings</div>
                        <div class="step-panel-headline">Review sample data to validate mappings</div>
                        <div class="step-panel-progress">Review sample data</div>
                    </div>
                    <div class="step-panel-expand-icon">▼</div>
                </div>
            </div>
            <div class="step-panel-body">
                <div class="step-panel-content">
                    <div class="step-panel-left">
                        <div class="step-description">
                            By now we've integrated, mapped and transformed the Business Entities to the Standard Data Model,
                            the following previews are based on sample data to help validate correctness of mapping and
                            field value population.
                        </div>

                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Field Name</th>
                                    <th>Sample Value</th>
                                    <th>Mapping Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Customer ID</td>
                                    <td>CUST-001</td>
                                    <td>✅ Mapped</td>
                                </tr>
                                <tr>
                                    <td>Customer Name</td>
                                    <td>Acme Corporation</td>
                                    <td>✅ Mapped</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>contact@acme.com</td>
                                    <td>✅ Mapped</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="step-panel-right">
                        <a href="#" class="doc-link">Data Validation Guide</a>
                        <a href="#" class="doc-link">Sample Data Reference</a>
                    </div>
                </div>
                <div class="step-footer">
                    <button class="action-button secondary" onclick="nextStep('validate-data')">Next Step</button>
                    <a href="#" class="doc-link">View Documentation</a>
                </div>
            </div>
        </div>
    `;
}

function renderSetupIdentityPanel() {
    return `
        <div class="step-panel collapsed" id="step-setup-identity" data-step="setup-identity">
            <div class="step-panel-header" onclick="toggleStepPanel('setup-identity')">
                <div class="step-panel-header-content">
                    <div class="step-panel-header-left">
                        <div class="step-panel-title">Set up Identity Rules</div>
                        <div class="step-panel-headline">Configure match and reconciliation rules</div>
                        <div class="step-panel-progress">0 out of 2 completed</div>
                    </div>
                    <div class="step-panel-expand-icon">▼</div>
                </div>
            </div>
            <div class="step-panel-body">
                <div class="step-panel-content">
                    <div class="step-panel-left">
                        <div class="step-description">
                            In this section we are going to review and optionally create new rules that help link
                            operation records to your business entities.
                        </div>

                        <div class="step-substeps">
                            <div class="substep-item">
                                <input type="checkbox" class="substep-checkbox" id="substep-identity-1" onchange="updateSubstepProgress('setup-identity', 2)">
                                <label class="substep-text" for="substep-identity-1">
                                    Configure Match and Reconciliation Rules
                                </label>
                            </div>
                            <div class="substep-item">
                                <input type="checkbox" class="substep-checkbox" id="substep-identity-2" onchange="updateSubstepProgress('setup-identity', 2)">
                                <label class="substep-text" for="substep-identity-2">
                                    Enable Identity Rules Schedule
                                </label>
                            </div>
                        </div>

                        <button class="action-button" style="margin-top: 16px;">Configure Match and Reconciliation Rules</button>
                    </div>
                    <div class="step-panel-right">
                        <a href="#" class="doc-link">Identity Resolution Guide</a>
                        <a href="#" class="doc-link">Match Rules Documentation</a>
                    </div>
                </div>
                <div class="step-footer">
                    <button class="action-button secondary" onclick="nextStep('setup-identity')">Next Step</button>
                    <a href="#" class="doc-link">View Documentation</a>
                </div>
            </div>
        </div>
    `;
}

function renderValidateIdentityPanel() {
    return `
        <div class="step-panel collapsed" id="step-validate-identity" data-step="validate-identity">
            <div class="step-panel-header" onclick="toggleStepPanel('validate-identity')">
                <div class="step-panel-header-content">
                    <div class="step-panel-header-left">
                        <div class="step-panel-title">Validate Identity Data</div>
                        <div class="step-panel-headline">Inspect identity resolution results</div>
                        <div class="step-panel-progress">Review identity data</div>
                    </div>
                    <div class="step-panel-expand-icon">▼</div>
                </div>
            </div>
            <div class="step-panel-body">
                <div class="step-panel-content">
                    <div class="step-panel-left">
                        <div class="step-description">
                            After Identity Resolution has finished processing use the following sample data preview
                            to inspect the data.
                        </div>

                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Record ID</th>
                                    <th>Matched Entity</th>
                                    <th>Confidence Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>REC-001</td>
                                    <td>BE-CUST-001</td>
                                    <td>95%</td>
                                </tr>
                                <tr>
                                    <td>REC-002</td>
                                    <td>BE-CUST-002</td>
                                    <td>88%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="step-panel-right">
                        <a href="#" class="doc-link">Identity Data Guide</a>
                        <a href="#" class="doc-link">Resolution Reports</a>
                    </div>
                </div>
                <div class="step-footer">
                    <button class="action-button secondary" onclick="nextStep('validate-identity')">Next Step</button>
                    <a href="#" class="doc-link">View Documentation</a>
                </div>
            </div>
        </div>
    `;
}

function renderEnableSyncPanel() {
    return `
        <div class="step-panel collapsed" id="step-enable-sync" data-step="enable-sync">
            <div class="step-panel-header" onclick="toggleStepPanel('enable-sync')">
                <div class="step-panel-header-content">
                    <div class="step-panel-header-left">
                        <div class="step-panel-title">Enable sync to Informatica</div>
                        <div class="step-panel-headline">Configure bi-directional data synchronization</div>
                        <div class="step-panel-progress">0 out of 1 completed</div>
                    </div>
                    <div class="step-panel-expand-icon">▼</div>
                </div>
            </div>
            <div class="step-panel-body">
                <div class="step-panel-content">
                    <div class="step-panel-left">
                        <div class="step-description">
                            Enable sync to Informatica for Key-Rings that do not contain a business entity.
                            Share the source records for enrichment and quality assurance.
                        </div>

                        <div class="step-substeps">
                            <div class="substep-item">
                                <input type="checkbox" class="substep-checkbox" id="substep-sync-1" onchange="updateSubstepProgress('enable-sync', 1)">
                                <label class="substep-text" for="substep-sync-1">
                                    Configure synchronization settings
                                </label>
                            </div>
                        </div>

                        <button class="action-button" style="margin-top: 16px;">Configure D360 Setup in Informatica</button>
                    </div>
                    <div class="step-panel-right">
                        <a href="#" class="doc-link">Sync Configuration Guide</a>
                        <a href="#" class="doc-link">Informatica Setup</a>
                    </div>
                </div>
                <div class="step-footer">
                    <button class="action-button secondary" onclick="nextStep('enable-sync')">Next Step</button>
                    <a href="#" class="doc-link">View Documentation</a>
                </div>
            </div>
        </div>
    `;
}

function renderSetupExperiencesPanel() {
    return `
        <div class="step-panel collapsed" id="step-setup-experiences" data-step="setup-experiences">
            <div class="step-panel-header" onclick="toggleStepPanel('setup-experiences')">
                <div class="step-panel-header-content">
                    <div class="step-panel-header-left">
                        <div class="step-panel-title">Setup Experiences</div>
                        <div class="step-panel-headline">Configure user interface experiences</div>
                        <div class="step-panel-progress">0 out of 3 completed</div>
                    </div>
                    <div class="step-panel-expand-icon">▼</div>
                </div>
            </div>
            <div class="step-panel-body">
                <div class="step-panel-content">
                    <div class="step-panel-left">
                        <div class="step-description">
                            Configure user experiences to maximize the value of integrated business entities.
                        </div>

                        <div class="step-substeps">
                            <div class="substep-item">
                                <input type="checkbox" class="substep-checkbox" id="substep-exp-1" onchange="updateSubstepProgress('setup-experiences', 3)">
                                <div class="substep-text">
                                    <label for="substep-exp-1"><strong>Search Before Create</strong> - prevent duplicate records from being created</label>
                                    <div><a href="#" class="doc-link">View Trailhead for Setup</a></div>
                                </div>
                            </div>
                            <div class="substep-item">
                                <input type="checkbox" class="substep-checkbox" id="substep-exp-2" onchange="updateSubstepProgress('setup-experiences', 3)">
                                <div class="substep-text">
                                    <label for="substep-exp-2"><strong>Copy field</strong> - enrich operational records with enterprise attributes</label>
                                    <div><a href="#" class="doc-link">View Trailhead for Setup</a></div>
                                </div>
                            </div>
                            <div class="substep-item">
                                <input type="checkbox" class="substep-checkbox" id="substep-exp-3" onchange="updateSubstepProgress('setup-experiences', 3)">
                                <div class="substep-text">
                                    <label for="substep-exp-3"><strong>Related List</strong> - showcase any information related to the primary entity</label>
                                    <div><a href="#" class="doc-link">View Trailhead for Setup</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="step-panel-right">
                        <a href="#" class="doc-link">Experience Setup Guide</a>
                        <a href="#" class="doc-link">UI Configuration</a>
                    </div>
                </div>
                <div class="step-footer">
                    <button class="action-button secondary" onclick="completeSetup()">Complete Setup</button>
                    <a href="#" class="doc-link">View Documentation</a>
                </div>
            </div>
        </div>
    `;
}

function toggleStepSummary() {
    const stepSummary = document.getElementById('step-summary');
    stepSummary.classList.toggle('collapsed');
    stepSummary.classList.toggle('expanded');
    appState.stepSummaryCollapsed = stepSummary.classList.contains('collapsed');
}

function toggleStepPanel(stepId) {
    const panel = document.getElementById(`step-${stepId}`);
    const wasExpanded = panel.classList.contains('expanded');

    // Collapse all panels
    document.querySelectorAll('.step-panel').forEach(p => {
        p.classList.remove('expanded');
        p.classList.add('collapsed');
    });

    // Expand clicked panel if it was collapsed
    if (!wasExpanded) {
        panel.classList.remove('collapsed');
        panel.classList.add('expanded');
        appState.stepStates[stepId].expanded = true;

        // Update status to in-progress if not started
        if (appState.stepStates[stepId].status === 'not-started') {
            appState.stepStates[stepId].status = 'in-progress';
            updateStepList();
        }
    } else {
        appState.stepStates[stepId].expanded = false;
    }
}

function scrollToStep(stepId) {
    const panel = document.getElementById(`step-${stepId}`);
    if (panel) {
        // Expand the panel
        document.querySelectorAll('.step-panel').forEach(p => {
            p.classList.remove('expanded');
            p.classList.add('collapsed');
        });
        panel.classList.remove('collapsed');
        panel.classList.add('expanded');

        // Scroll to the panel
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function nextStep(currentStepId) {
    const steps = [
        'connect-informatica',
        'choose-entity',
        'review-mappings',
        'validate-data',
        'setup-identity',
        'validate-identity',
        'enable-sync',
        'setup-experiences'
    ];

    const currentIndex = steps.indexOf(currentStepId);
    if (currentIndex < steps.length - 1) {
        const nextStepId = steps[currentIndex + 1];
        scrollToStep(nextStepId);
    }
}

function updateStepProgress(stepId) {
    // This would update based on form completion
    // For now, just a placeholder
}

function updateSubstepProgress(stepId, totalSubsteps) {
    const checkboxes = document.querySelectorAll(`#step-${stepId} .substep-checkbox`);
    const completedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

    appState.stepStates[stepId].completedSubsteps = completedCount;
    appState.stepStates[stepId].totalSubsteps = totalSubsteps;

    // Update progress text
    const progressElement = document.querySelector(`#step-${stepId} .step-panel-progress`);
    if (progressElement) {
        progressElement.textContent = `${completedCount} out of ${totalSubsteps} completed`;
    }

    // Update status
    if (completedCount === totalSubsteps && totalSubsteps > 0) {
        appState.stepStates[stepId].status = 'completed';
    } else if (completedCount > 0) {
        appState.stepStates[stepId].status = 'in-progress';
    }

    updateStepList();
}

function validateConnection(stepId) {
    const resultDiv = document.getElementById('validation-result-' + stepId);

    // Check if all fields are filled
    const connectionName = document.getElementById('connection-name').value;
    const tenantUrl = document.getElementById('tenant-url').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!connectionName || !tenantUrl || !username || !password) {
        resultDiv.innerHTML = '<div class="validation-message error">Please fill in all required fields</div>';
        return;
    }

    // Show loading
    resultDiv.innerHTML = '<div class="validation-message loading"><div class="spinner"></div> Validating connection...</div>';

    // Simulate validation
    setTimeout(() => {
        resultDiv.innerHTML = '<div class="validation-message success">✅ Connection validated successfully!</div>';
        appState.stepStates[stepId].status = 'completed';
        appState.stepStates[stepId].completedSubsteps = 5;
        appState.stepStates[stepId].totalSubsteps = 5;

        const progressElement = document.querySelector(`#step-${stepId} .step-panel-progress`);
        if (progressElement) {
            progressElement.textContent = '5 out of 5 completed';
        }

        updateStepList();
    }, 1500);
}

function selectBusinessEntity(value) {
    if (value) {
        appState.stepStates['choose-entity'].status = 'completed';
        appState.stepStates['choose-entity'].completedSubsteps = 1;
        appState.stepStates['choose-entity'].totalSubsteps = 1;

        const progressElement = document.querySelector('#step-choose-entity .step-panel-progress');
        if (progressElement) {
            progressElement.textContent = '1 out of 1 completed';
        }

        updateStepList();

        // Update mappings panel
        const mappingTables = document.getElementById('mapping-tables');
        if (mappingTables) {
            const tables = getMappingTablesForEntity(value);
            mappingTables.innerHTML = `
                <h4 style="margin-bottom: 12px;">Data Objects:</h4>
                <ul style="list-style: none; padding: 0;">
                    ${tables.map(table => `<li style="padding: 8px; background: #f9fafb; margin-bottom: 4px; border-radius: 4px;">${table}</li>`).join('')}
                </ul>
            `;
        }
    }
}

function getMappingTablesForEntity(entity) {
    const mappings = {
        'customer': ['Customer_Master', 'Customer_Address', 'Customer_Contact', 'Customer_Preferences'],
        'organization': ['Organization_Master', 'Organization_Hierarchy', 'Organization_Locations'],
        'product': ['Product_Master', 'Product_Attributes', 'Product_Pricing', 'Product_Inventory'],
        'supplier': ['Supplier_Master', 'Supplier_Contact', 'Supplier_Performance']
    };

    return mappings[entity] || [];
}

function reviewMappings() {
    appState.stepStates['review-mappings'].status = 'completed';
    appState.stepStates['review-mappings'].completedSubsteps = 1;
    appState.stepStates['review-mappings'].totalSubsteps = 1;

    const progressElement = document.querySelector('#step-review-mappings .step-panel-progress');
    if (progressElement) {
        progressElement.textContent = '1 out of 1 completed';
    }

    updateStepList();
    alert('Mapping review page would open in a new context');
}

function completeSetup() {
    alert('Setup completed! All steps have been configured.');
}

function updateStepList() {
    const stepList = document.querySelector('.step-list');
    if (stepList) {
        stepList.innerHTML = renderStepList();
    }
}

function setupIntegratePageListeners() {
    // Event listeners are set up via onclick attributes in the HTML
    // This function can be used for additional dynamic setup if needed
}
