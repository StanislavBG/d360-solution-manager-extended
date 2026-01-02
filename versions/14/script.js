// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavCollapsed: false,
    stepSummaryCollapsed: false,
    currentStep: null,
    stepStatuses: {
        'connect-informatica': 'not-started',
        'choose-entity': 'not-started',
        'review-mappings': 'not-started',
        'validate-data': 'not-started',
        'identity-rules': 'not-started',
        'validate-identity': 'not-started',
        'enable-sync': 'not-started',
        'setup-experiences': 'not-started'
    },
    completedSubsteps: new Set()
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadPage('home');
}

function setupEventListeners() {
    // App Picker
    const appPickerIcon = document.getElementById('appPickerIcon');
    const appPickerDropdown = document.getElementById('appPickerDropdown');
    
    appPickerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', (e) => {
        if (!appPickerIcon.contains(e.target) && !appPickerDropdown.contains(e.target)) {
            appPickerDropdown.classList.remove('show');
        }
    });
    
    // App Options
    document.querySelectorAll('.app-option').forEach(option => {
        option.addEventListener('click', () => {
            const appName = option.dataset.app;
            appState.currentApp = appName;
            document.getElementById('appLabel').textContent = appName;
            document.querySelectorAll('.app-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            appPickerDropdown.classList.remove('show');
        });
    });
    
    // Navigation Tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.dataset.page;
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadPage(page);
        });
    });
    
    // Left Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const leftNav = document.getElementById('leftNavigation');
    
    navToggle.addEventListener('click', () => {
        appState.leftNavCollapsed = !appState.leftNavCollapsed;
        leftNav.classList.toggle('collapsed');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-chevron-left');
        icon.classList.toggle('fa-chevron-right');
    });
    
    // Left Navigation Items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            loadPlaceholderPage(page);
        });
    });
}

function loadPage(pageName) {
    appState.currentPage = pageName;
    const mainPageArea = document.getElementById('mainPageArea');
    
    switch(pageName) {
        case 'home':
            mainPageArea.innerHTML = getHomePageHTML();
            break;
        case 'solution-manager':
            mainPageArea.innerHTML = getSolutionManagerPageHTML();
            setupSolutionManagerListeners();
            break;
        case 'integrate-business-entities':
            mainPageArea.innerHTML = getIntegrateBusinessEntitiesPageHTML();
            setupIntegratePageListeners();
            break;
        default:
            mainPageArea.innerHTML = getPlaceholderPageHTML(pageName);
    }
}

function getHomePageHTML() {
    return `
        <div class="home-page">
            <h2>Welcome to Data 360</h2>
            <p>Select a page from the navigation menu to get started.</p>
        </div>
    `;
}

function getSolutionManagerPageHTML() {
    return `
        <div class="solution-manager-page">
            <h1 class="page-title">Solution Manager</h1>
            <div class="tiles-container">
                <div class="tile" data-tile="integrate-business-entities">
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
}

function setupSolutionManagerListeners() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', () => {
            const page = tile.dataset.tile;
            if (page === 'integrate-business-entities') {
                loadPage('integrate-business-entities');
                // Update navigation tab
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                // Keep solution manager active or add logic to handle this
            }
        });
    });
}

function getIntegrateBusinessEntitiesPageHTML() {
    return `
        <div class="integrate-page">
            <div class="header-instructions">
                <div class="header-instructions-title">Integrate Business Entities from Informatica in Data360</div>
                <div class="header-instructions-description">
                    Realize the full potential of the curated and enriched business entities from Informatica directly in D360. 
                    In this step by step guide, we will work though the steps required to operationalize business entities 
                    created in Informatica in D360
                </div>
            </div>
            
            <div class="step-summary" id="stepSummary">
                <div class="step-summary-toggle" id="stepSummaryToggle">
                    <i class="fas fa-chevron-up"></i>
                </div>
                <div class="step-summary-content">
                    <div class="steps-list" id="stepsList">
                        ${getStepSummaryItemsHTML()}
                    </div>
                    <div class="video-placeholder">
                        Video Tutorial Placeholder<br>
                        <small>Link to documentation</small>
                    </div>
                </div>
            </div>
            
            <div class="step-details-container" id="stepDetailsContainer">
                ${getAllStepDetailsHTML()}
            </div>
        </div>
    `;
}

function getStepSummaryItemsHTML() {
    const steps = [
        { id: 'connect-informatica', label: 'Connect to Informatica System' },
        { id: 'choose-entity', label: 'Choose Business Entity' },
        { id: 'review-mappings', label: 'Review and Extend Mappings' },
        { id: 'validate-data', label: 'Validate Connected data and mappings' },
        { id: 'identity-rules', label: 'Set up Identity Rules' },
        { id: 'validate-identity', label: 'Validate Identity Data' },
        { id: 'enable-sync', label: 'Enable sync to Informatica' },
        { id: 'setup-experiences', label: 'Setup Experiences' }
    ];
    
    return steps.map(step => {
        const status = appState.stepStatuses[step.id] || 'not-started';
        const statusIcon = getStatusIconHTML(status);
        return `
            <div class="step-summary-item" data-step="${step.id}">
                ${statusIcon}
                <span class="step-summary-label">${step.label}</span>
            </div>
        `;
    }).join('');
}

function getStatusIconHTML(status) {
    const icons = {
        'not-started': '<i class="fas fa-circle"></i>',
        'in-progress': '<i class="fas fa-spinner fa-spin"></i>',
        'completed': '<i class="fas fa-check-circle"></i>'
    };
    return `<div class="step-status-icon ${status}">${icons[status] || icons['not-started']}</div>`;
}

function getAllStepDetailsHTML() {
    return `
        ${getConnectInformaticaStepHTML()}
        ${getChooseEntityStepHTML()}
        ${getReviewMappingsStepHTML()}
        ${getValidateDataStepHTML()}
        ${getIdentityRulesStepHTML()}
        ${getValidateIdentityStepHTML()}
        ${getEnableSyncStepHTML()}
        ${getSetupExperiencesStepHTML()}
    `;
}

function getConnectInformaticaStepHTML() {
    return `
        <div class="step-details-panel collapsed" data-step="connect-informatica">
            <div class="step-details-header">
                <div class="step-header-content">
                    <div class="step-title">Connect to Informatica System</div>
                    <div class="step-headline">Establish trusted connection between D360 and Informatica tenants</div>
                </div>
                <div class="step-toggle-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="step-details-body">
                <div class="step-description">
                    Configure details for the Informatica tenant, so that a trusted connection between them can be provided. 
                    The important items are "User-Name" and "Password"
                </div>
                <div class="step-content-wrapper">
                    <div class="step-instructions">
                        <div class="instruction-item">
                            <input type="checkbox" class="instruction-checkbox" data-substep="connection-name">
                            <div class="instruction-text">Provide Name for the Connection or Choose Existing if available from dropdown</div>
                        </div>
                        <div class="form-group" style="margin-top: 15px;">
                            <label>Connection Name</label>
                            <select id="connectionName">
                                <option value="">Select or enter new...</option>
                                <option value="existing1">Existing Connection 1</option>
                                <option value="existing2">Existing Connection 2</option>
                            </select>
                        </div>
                        <div class="instruction-item">
                            <input type="checkbox" class="instruction-checkbox" data-substep="tenant-url">
                            <div class="instruction-text">Provide Tenant URL</div>
                        </div>
                        <div class="form-group">
                            <label>Tenant URL</label>
                            <input type="text" id="tenantUrl" placeholder="https://your-tenant.informatica.com">
                        </div>
                        <div class="instruction-item">
                            <input type="checkbox" class="instruction-checkbox" data-substep="username">
                            <div class="instruction-text">Provide UserName</div>
                        </div>
                        <div class="form-group">
                            <label>User Name</label>
                            <input type="text" id="userName" placeholder="Enter username">
                        </div>
                        <div class="instruction-item">
                            <input type="checkbox" class="instruction-checkbox" data-substep="password">
                            <div class="instruction-text">Provide Password</div>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="password" placeholder="Enter password">
                        </div>
                    </div>
                    <div class="step-actions">
                        <button class="action-button" id="createValidateBtn">Create & Validate</button>
                        <div id="connectionStatus"></div>
                        <a href="#" class="action-link">Documentation</a>
                        <a href="#" class="action-link">Tutorial</a>
                    </div>
                </div>
                <button class="next-step-button" data-next-step="choose-entity">Next Step</button>
            </div>
        </div>
    `;
}

function getChooseEntityStepHTML() {
    return `
        <div class="step-details-panel collapsed" data-step="choose-entity">
            <div class="step-details-header">
                <div class="step-header-content">
                    <div class="step-title">Choose Business Entity</div>
                    <div class="step-headline">Select Business from the connected tenant to integrate into Data 360</div>
                </div>
                <div class="step-toggle-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="step-details-body">
                <div class="step-description">
                    Select Business from the connected tenant to integrate into Data 360
                </div>
                <div class="step-content-wrapper">
                    <div class="step-instructions">
                        <div class="form-group">
                            <label>Select Business Entity</label>
                            <select id="businessEntity" style="width: 100%;">
                                <option value="">-- Select an entity --</option>
                                <option value="customer">Customer</option>
                                <option value="organization">Organization</option>
                                <option value="product">Product</option>
                                <option value="supplier">Supplier</option>
                            </select>
                        </div>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="action-link">Documentation Links</a>
                        <a href="#" class="action-link">Tutorial</a>
                    </div>
                </div>
                <button class="next-step-button" data-next-step="review-mappings">Next Step</button>
            </div>
        </div>
    `;
}

function getReviewMappingsStepHTML() {
    return `
        <div class="step-details-panel collapsed" data-step="review-mappings">
            <div class="step-details-header">
                <div class="step-header-content">
                    <div class="step-title">Review and Extend Mappings</div>
                    <div class="step-headline">Review data objects and mappings from Informatica to Data 360</div>
                </div>
                <div class="step-toggle-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="step-details-body">
                <div class="step-description">
                    Based on selected business entities these are the data objects identified from informatica that are being synced to Data 360.
                </div>
                <div class="step-content-wrapper">
                    <div class="step-instructions">
                        <div class="table-list" id="tableList">
                            <div class="table-list-item">customer_table_1</div>
                            <div class="table-list-item">customer_table_2</div>
                            <div class="table-list-item">customer_attributes</div>
                            <div class="table-list-item">customer_relationships</div>
                        </div>
                        <div class="notification-box" style="margin-top: 15px;">
                            We've detected extra fields beyond the standard. Below is the proposed list of modification to Salesforce's DMO to add placeholders for these values
                        </div>
                    </div>
                    <div class="step-actions">
                        <button class="action-button">Review Mappings</button>
                        <a href="#" class="action-link">Documentation</a>
                    </div>
                </div>
                <button class="next-step-button" data-next-step="validate-data">Next Step</button>
            </div>
        </div>
    `;
}

function getValidateDataStepHTML() {
    return `
        <div class="step-details-panel collapsed" data-step="validate-data">
            <div class="step-details-header">
                <div class="step-header-content">
                    <div class="step-title">Validate Connected data and mappings</div>
                    <div class="step-headline">Preview sample data to validate correctness</div>
                </div>
                <div class="step-toggle-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="step-details-body">
                <div class="step-description">
                    By Now we've integrated, mapped and transformed the Business Entities to the Standard Data Model, 
                    the following previews are based on sample data to help validate correctness of mapping and field value population
                </div>
                <div class="step-content-wrapper">
                    <div class="step-instructions">
                        <div class="validation-section">
                            <strong>Sample Data Preview:</strong><br>
                            Preview data will be displayed here once mappings are configured.
                        </div>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="action-link">View Sample Data</a>
                    </div>
                </div>
                <button class="next-step-button" data-next-step="identity-rules">Next Step</button>
            </div>
        </div>
    `;
}

function getIdentityRulesStepHTML() {
    return `
        <div class="step-details-panel collapsed" data-step="identity-rules">
            <div class="step-details-header">
                <div class="step-header-content">
                    <div class="step-title">Set up Identity Rules</div>
                    <div class="step-headline">Review and optionally create new rules for linking records</div>
                </div>
                <div class="step-toggle-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="step-details-body">
                <div class="step-description">
                    In this section we are going to review and optionally create new rules that help link operation records to your business entities.
                </div>
                <div class="step-content-wrapper">
                    <div class="step-instructions">
                        <div class="instruction-item">
                            <input type="checkbox" class="instruction-checkbox" data-substep="identity-rules-setup">
                            <div class="instruction-text">Configure Match and Reconciliation Rules</div>
                        </div>
                    </div>
                    <div class="step-actions">
                        <button class="action-button">Configure Match and Reconciliation Rules</button>
                        <a href="#" class="action-link">Documentation</a>
                    </div>
                </div>
                <button class="next-step-button" data-next-step="validate-identity">Next Step</button>
            </div>
        </div>
    `;
}

function getValidateIdentityStepHTML() {
    return `
        <div class="step-details-panel collapsed" data-step="validate-identity">
            <div class="step-details-header">
                <div class="step-header-content">
                    <div class="step-title">Validate Identity Data</div>
                    <div class="step-headline">Inspect data after Identity Resolution processing</div>
                </div>
                <div class="step-toggle-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="step-details-body">
                <div class="step-description">
                    After Identity Resolution has finished processing use the following sample data preview to inspect the data
                </div>
                <div class="step-content-wrapper">
                    <div class="step-instructions">
                        <div class="validation-section">
                            <strong>Identity Resolution Results:</strong><br>
                            Sample data preview will be displayed here after processing completes.
                        </div>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="action-link">View Results</a>
                    </div>
                </div>
                <button class="next-step-button" data-next-step="enable-sync">Next Step</button>
            </div>
        </div>
    `;
}

function getEnableSyncStepHTML() {
    return `
        <div class="step-details-panel collapsed" data-step="enable-sync">
            <div class="step-details-header">
                <div class="step-header-content">
                    <div class="step-title">Enable sync to Informatica</div>
                    <div class="step-headline">Share source records for enrichment and quality assurance</div>
                </div>
                <div class="step-toggle-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="step-details-body">
                <div class="step-description">
                    Enable sync to Informatica for Key-Rings that do not contain a business entity. 
                    Share the source records for enrichment and quality assurance.
                </div>
                <div class="step-content-wrapper">
                    <div class="step-instructions">
                        <div class="instruction-item">
                            <input type="checkbox" class="instruction-checkbox" data-substep="enable-sync-config">
                            <div class="instruction-text">Configure D360 Setup in Informatica</div>
                        </div>
                    </div>
                    <div class="step-actions">
                        <button class="action-button">Configure D360 Setup</button>
                        <a href="#" class="action-link">Documentation</a>
                    </div>
                </div>
                <button class="next-step-button" data-next-step="setup-experiences">Next Step</button>
            </div>
        </div>
    `;
}

function getSetupExperiencesStepHTML() {
    return `
        <div class="step-details-panel collapsed" data-step="setup-experiences">
            <div class="step-details-header">
                <div class="step-header-content">
                    <div class="step-title">Setup Experiences</div>
                    <div class="step-headline">Configure user experiences for business entities</div>
                </div>
                <div class="step-toggle-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="step-details-body">
                <div class="step-content-wrapper">
                    <div class="step-instructions">
                        <div class="instruction-item">
                            <input type="checkbox" class="instruction-checkbox" data-substep="search-before-create">
                            <div class="instruction-text">
                                <strong>Search Before Create</strong> - prevent duplicate records from being created.
                            </div>
                        </div>
                        <div class="instruction-item">
                            <input type="checkbox" class="instruction-checkbox" data-substep="copy-field">
                            <div class="instruction-text">
                                <strong>Copy field</strong> - enrich operational records with enterprise attributes.
                            </div>
                        </div>
                        <div class="instruction-item">
                            <input type="checkbox" class="instruction-checkbox" data-substep="related-list">
                            <div class="instruction-text">
                                <strong>Related List</strong> - showcase any information related to the primary entity.
                            </div>
                        </div>
                    </div>
                    <div class="step-actions">
                        <a href="#" class="action-link">View Trailhead for Setup - Search Before Create</a>
                        <a href="#" class="action-link">View Trailhead for Setup - Copy field</a>
                        <a href="#" class="action-link">View Trailhead for Setup - Related List</a>
                        <a href="#" class="action-link" style="margin-top: 10px;">Documentation</a>
                        <a href="#" class="action-link">Tutorial</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupIntegratePageListeners() {
    // Step Summary Toggle
    const stepSummaryToggle = document.getElementById('stepSummaryToggle');
    const stepSummary = document.getElementById('stepSummary');
    
    if (stepSummaryToggle) {
        stepSummaryToggle.addEventListener('click', () => {
            appState.stepSummaryCollapsed = !appState.stepSummaryCollapsed;
            stepSummary.classList.toggle('collapsed');
            const icon = stepSummaryToggle.querySelector('i');
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
        });
    }
    
    // Step Summary Item Clicks
    document.querySelectorAll('.step-summary-item').forEach(item => {
        item.addEventListener('click', () => {
            const stepId = item.dataset.step;
            scrollToStep(stepId);
            expandStep(stepId);
        });
    });
    
    // Step Details Panel Toggles
    document.querySelectorAll('.step-details-panel').forEach(panel => {
        const header = panel.querySelector('.step-details-header');
        header.addEventListener('click', () => {
            const isExpanded = panel.classList.contains('expanded');
            if (isExpanded) {
                panel.classList.remove('expanded');
                panel.classList.add('collapsed');
            } else {
                // Collapse all other panels
                document.querySelectorAll('.step-details-panel').forEach(p => {
                    p.classList.remove('expanded');
                    p.classList.add('collapsed');
                });
                // Expand this panel
                panel.classList.remove('collapsed');
                panel.classList.add('expanded');
                appState.currentStep = panel.dataset.step;
                updateStepStatus(panel.dataset.step, 'in-progress');
            }
        });
    });
    
    // Checkboxes
    document.querySelectorAll('.instruction-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const substep = checkbox.dataset.substep;
            const instructionText = checkbox.closest('.instruction-item').querySelector('.instruction-text');
            
            if (checkbox.checked) {
                appState.completedSubsteps.add(substep);
                instructionText.classList.add('completed');
            } else {
                appState.completedSubsteps.delete(substep);
                instructionText.classList.remove('completed');
            }
            
            checkStepCompletion();
        });
    });
    
    // Create & Validate Button
    const createValidateBtn = document.getElementById('createValidateBtn');
    if (createValidateBtn) {
        createValidateBtn.addEventListener('click', () => {
            const connectionStatus = document.getElementById('connectionStatus');
            const tenantUrl = document.getElementById('tenantUrl')?.value;
            const userName = document.getElementById('userName')?.value;
            const password = document.getElementById('password')?.value;
            
            if (!tenantUrl || !userName || !password) {
                alert('Please fill in all required fields');
                return;
            }
            
            createValidateBtn.disabled = true;
            createValidateBtn.innerHTML = '<span class="loading-spinner"></span>Validating...';
            
            setTimeout(() => {
                createValidateBtn.disabled = false;
                createValidateBtn.innerHTML = 'Create & Validate';
                connectionStatus.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        Connection created successfully!
                    </div>
                `;
                updateStepStatus('connect-informatica', 'completed');
            }, 1500);
        });
    }
    
    // Business Entity Selection
    const businessEntity = document.getElementById('businessEntity');
    if (businessEntity) {
        businessEntity.addEventListener('change', (e) => {
            if (e.target.value) {
                updateStepStatus('choose-entity', 'completed');
            }
        });
    }
    
    // Next Step Buttons
    document.querySelectorAll('.next-step-button').forEach(button => {
        button.addEventListener('click', () => {
            const nextStepId = button.dataset.nextStep;
            if (nextStepId) {
                scrollToStep(nextStepId);
                expandStep(nextStepId);
            }
        });
    });
    
    // Expand first step by default
    const firstStep = document.querySelector('.step-details-panel');
    if (firstStep) {
        firstStep.classList.remove('collapsed');
        firstStep.classList.add('expanded');
        appState.currentStep = firstStep.dataset.step;
        updateStepStatus(firstStep.dataset.step, 'in-progress');
    }
}

function scrollToStep(stepId) {
    const stepPanel = document.querySelector(`[data-step="${stepId}"]`);
    if (stepPanel) {
        stepPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function expandStep(stepId) {
    const stepPanel = document.querySelector(`.step-details-panel[data-step="${stepId}"]`);
    if (stepPanel) {
        document.querySelectorAll('.step-details-panel').forEach(p => {
            p.classList.remove('expanded');
            p.classList.add('collapsed');
        });
        stepPanel.classList.remove('collapsed');
        stepPanel.classList.add('expanded');
        appState.currentStep = stepId;
        updateStepStatus(stepId, 'in-progress');
    }
}

function updateStepStatus(stepId, status) {
    appState.stepStatuses[stepId] = status;
    const stepSummaryItem = document.querySelector(`.step-summary-item[data-step="${stepId}"]`);
    if (stepSummaryItem) {
        const statusIcon = stepSummaryItem.querySelector('.step-status-icon');
        statusIcon.className = `step-status-icon ${status}`;
        const icons = {
            'not-started': '<i class="fas fa-circle"></i>',
            'in-progress': '<i class="fas fa-spinner fa-spin"></i>',
            'completed': '<i class="fas fa-check-circle"></i>'
        };
        statusIcon.innerHTML = icons[status] || icons['not-started'];
    }
}

function checkStepCompletion() {
    // Check if all substeps in current step are completed
    const currentStepPanel = document.querySelector(`.step-details-panel[data-step="${appState.currentStep}"]`);
    if (currentStepPanel) {
        const checkboxes = currentStepPanel.querySelectorAll('.instruction-checkbox');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        if (allChecked && checkboxes.length > 0) {
            updateStepStatus(appState.currentStep, 'completed');
        }
    }
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
            <h2>${pageLabels[pageName] || pageName}</h2>
            <p>This page is currently empty.</p>
        </div>
    `;
}

function loadPlaceholderPage(pageName) {
    loadPage(pageName);
}

