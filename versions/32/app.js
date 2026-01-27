// Application State
const appState = {
    currentPage: 'home',
    currentApp: 'Data 360',
    leftNavExpanded: true,
    stepStates: {},
    stepProgress: {}
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadPage('home');
});

function initializeApp() {
    // App picker toggle
    const appPicker = document.getElementById('app-picker-icon');
    const appDropdown = document.getElementById('app-dropdown');

    appPicker.addEventListener('click', function(e) {
        e.stopPropagation();
        appDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        appDropdown.classList.remove('show');
    });

    // App selection
    const appItems = document.querySelectorAll('.dropdown-item');
    appItems.forEach(item => {
        item.addEventListener('click', function() {
            const appName = this.dataset.app;
            selectApp(appName);
        });
    });

    // Navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.dataset.page;
            navigateToPage(page);
        });
    });

    // Left navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    navToggle.addEventListener('click', toggleLeftNav);

    // Left navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            navigateToPage(page);
        });
    });
}

function selectApp(appName) {
    appState.currentApp = appName;
    document.getElementById('app-label').textContent = appName;

    const appItems = document.querySelectorAll('.dropdown-item');
    appItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.app === appName) {
            item.classList.add('active');
        }
    });
}

function toggleLeftNav() {
    const leftNav = document.getElementById('left-navigation');
    leftNav.classList.toggle('expanded');
    appState.leftNavExpanded = !appState.leftNavExpanded;
}

function navigateToPage(pageName) {
    appState.currentPage = pageName;

    // Update nav tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.page === pageName) {
            tab.classList.add('active');
        }
    });

    // Update left nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });

    loadPage(pageName);
}

function loadPage(pageName) {
    const pageArea = document.getElementById('page-area');

    switch(pageName) {
        case 'home':
            pageArea.innerHTML = renderHomePage();
            break;
        case 'solution-manager':
            pageArea.innerHTML = renderSolutionManagerPage();
            attachTileHandlers();
            break;
        case 'integrate-business-entities':
            pageArea.innerHTML = renderIntegrateBusinessEntitiesPage();
            attachStepHandlers();
            break;
        case 'customer-households':
            pageArea.innerHTML = renderCustomerHouseholdsPage();
            break;
        case 'connect-unify':
        case 'govern-data':
        case 'process-content':
        case 'query-segment':
        case 'analyze-predict':
        case 'act-on-data':
        case 'build-share':
            pageArea.innerHTML = renderEmptyState();
            break;
        default:
            pageArea.innerHTML = renderEmptyState();
    }
}

// Page Renderers
function renderHomePage() {
    return `
        <div class="empty-state">
            <svg viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <h2>Welcome to Data 360</h2>
            <p>Select an option from the menu to get started</p>
        </div>
    `;
}

function renderEmptyState() {
    return `
        <div class="empty-state">
            <svg viewBox="0 0 24 24">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <h2>Page Content</h2>
            <p>This section is under development</p>
        </div>
    `;
}

function renderSolutionManagerPage() {
    return `
        <div class="solution-manager-page">
            <div class="page-header">
                <h1>Solution Manager</h1>
                <p>Browse guided solutions to help you accomplish complex tasks</p>
            </div>
            <div class="tiles-container">
                <div class="tile" data-page="integrate-business-entities">
                    <h3>Integrate Business Entities from Informatica in Data 360</h3>
                    <p>Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360</p>
                </div>
                <div class="tile" data-page="customer-households">
                    <h3>Integrate and expand CRM Households in Data 360</h3>
                    <p>Enable Analytics, Marketing and Agentic experiences for your existing Customer Households. Extend the Household profile with engagement data from other systems though Unified Individuals and Household link Rules.</p>
                </div>
            </div>
        </div>
    `;
}

function renderCustomerHouseholdsPage() {
    return `
        <div class="work-in-progress">
            <h2>WORK IN PROGRESS</h2>
            <p>This feature is currently under development</p>
        </div>
    `;
}

function renderIntegrateBusinessEntitiesPage() {
    const steps = getIntegrationSteps();

    return `
        <div class="integrate-business-entities-page">
            ${renderHeaderInstructions()}
            ${renderStepSummary(steps)}
            ${renderStepDetails(steps)}
        </div>
    `;
}

function renderHeaderInstructions() {
    return `
        <div class="header-instructions">
            <h1>Integrate Business Entities from Informatica in Data 360</h1>
            <p>Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360</p>
        </div>
    `;
}

function renderStepSummary(steps) {
    const stepsHtml = steps.map((step, index) => {
        const status = getStepStatus(step.id);
        const iconHtml = renderStepIcon(status);

        return `
            <div class="step-item" data-step-id="${step.id}">
                ${iconHtml}
                <span>${step.title}</span>
            </div>
        `;
    }).join('');

    return `
        <div class="step-summary" id="step-summary">
            <div class="summary-header">
                <h2>Steps Overview</h2>
                <button class="collapse-toggle" onclick="toggleSummary()">
                    <svg viewBox="0 0 24 24">
                        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                    </svg>
                </button>
            </div>
            <div class="summary-content">
                <div class="steps-list">
                    ${stepsHtml}
                </div>
                <div class="video-placeholder">
                    <svg viewBox="0 0 24 24">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                    </svg>
                    <p><strong>Video Tutorial</strong></p>
                    <p>Watch a step-by-step walkthrough</p>
                    <a href="#">View Documentation</a>
                </div>
            </div>
        </div>
    `;
}

function renderStepIcon(status) {
    switch(status) {
        case 'completed':
            return `
                <svg class="step-icon completed" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
            `;
        case 'in-progress':
            return '<div class="step-icon in-progress"></div>';
        default:
            return '<div class="step-icon not-started"></div>';
    }
}

function renderStepDetails(steps) {
    const stepsHtml = steps.map((step, index) => {
        const isCollapsed = appState.stepStates[step.id] !== false;
        const subStepsSummary = getSubStepsSummary(step.id, step.substeps || []);

        return `
            <div class="step-detail-panel ${isCollapsed ? 'collapsed' : ''}" id="step-${step.id}" data-step-id="${step.id}">
                <div class="step-header" onclick="toggleStepPanel('${step.id}')">
                    <h3>${step.title}</h3>
                    <div class="headline">${step.headline}</div>
                    <div class="sub-steps-summary">${subStepsSummary}</div>
                </div>
                <div class="step-main">
                    ${step.content}
                </div>
                <div class="step-footer">
                    <div class="footer-links">
                        <a href="#">View Documentation</a>
                        <a href="#">Check out Tutorial</a>
                    </div>
                    <button class="next-step-button" onclick="goToNextStep(${index})">Next Step</button>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="step-details-container">
            ${stepsHtml}
        </div>
    `;
}

// Step Definitions
function getIntegrationSteps() {
    return [
        {
            id: 'connect-informatica',
            title: 'Connect to Informatica System',
            headline: 'Establish trusted connection between D360 and Informatica tenants',
            substeps: ['configure-connection'],
            content: renderConnectInformaticaStep()
        },
        {
            id: 'choose-business-entity',
            title: 'Choose Business Entity',
            headline: 'Select Business from the connected tenant to integrate into Data 360',
            substeps: ['select-tenant', 'select-entities'],
            content: renderChooseBusinessEntityStep()
        },
        {
            id: 'choose-identity-resolution',
            title: 'Choose Identity Resolution Type',
            headline: 'Choose between Direct Mapping or Golden Key-Ring approach',
            substeps: ['select-resolution-type'],
            content: renderChooseIdentityResolutionStep()
        },
        {
            id: 'review-mappings',
            title: 'Review Mappings',
            headline: 'Review data objects and field mappings from Informatica',
            substeps: ['review-tables', 'review-fields', 'confirm-mappings'],
            content: renderReviewMappingsStep()
        },
        {
            id: 'validate-connected-data',
            title: 'Validate Connected Data',
            headline: 'Preview and validate the integrated business entities',
            substeps: ['preview-data'],
            content: renderValidateConnectedDataStep()
        },
        {
            id: 'setup-identity-rules',
            title: 'Set up Identity Rules',
            headline: 'Configure match rules for identity resolution',
            substeps: ['configure-match-rules'],
            content: renderSetupIdentityRulesStep()
        },
        {
            id: 'validate-identity-data',
            title: 'Validate Identity Data',
            headline: 'Preview identity resolution results and configure schedule',
            substeps: ['preview-results', 'configure-schedule'],
            content: renderValidateIdentityDataStep()
        },
        {
            id: 'enable-sync-informatica',
            title: 'Enable sync to Informatica',
            headline: 'Share Key-Rings with Informatica for enrichment',
            substeps: ['configure-sync'],
            content: renderEnableSyncStep()
        },
        {
            id: 'setup-experiences',
            title: 'Setup Experiences',
            headline: 'Configure user experiences for the integrated data',
            substeps: ['search-before-create', 'copy-field', 'related-list'],
            content: renderSetupExperiencesStep()
        }
    ];
}

// Step Content Renderers
function renderConnectInformaticaStep() {
    return `
        <div class="step-main-grid">
            <div class="step-instructions">
                <div class="instruction-item">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="connect-informatica" data-substep="configure-connection">
                    <div class="instruction-text">
                        <strong>Configure details for the Informatica tenant</strong>
                        <div class="form-grid" style="margin-top: 12px;">
                            <div>
                                <div class="form-group">
                                    <label>Connection Name (existing)</label>
                                    <select id="connection-select">
                                        <option value="">Select existing connection...</option>
                                        <option value="conn1">Informatica Production</option>
                                        <option value="conn2">Informatica Dev</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div class="form-group">
                                    <label>Connection Name (new)</label>
                                    <input type="text" placeholder="My Informatica Connection">
                                </div>
                                <div class="form-group">
                                    <label>Tenant URL</label>
                                    <input type="text" placeholder="https://tenant.informatica.com">
                                </div>
                                <div class="form-group">
                                    <label>User Name</label>
                                    <input type="text" placeholder="username@company.com">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" placeholder="••••••••">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-actions">
                <button class="action-button" onclick="validateConnection()">Validate Connection</button>
            </div>
        </div>
    `;
}

function renderChooseBusinessEntityStep() {
    return `
        <div class="step-main-grid">
            <div class="step-instructions">
                <div class="instruction-item">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="choose-business-entity" data-substep="select-tenant">
                    <div class="instruction-text">
                        <strong>Select Informatica Tenant</strong>
                        <div class="form-group" style="margin-top: 8px;">
                            <select id="tenant-select">
                                <option value="">Select tenant...</option>
                                <option value="usa1">USA-1</option>
                                <option value="usa2">USA-2</option>
                                <option value="europe1">Europe-1</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="instruction-item">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="choose-business-entity" data-substep="select-entities">
                    <div class="instruction-text">
                        <strong>Select Business Entities (can select multiple)</strong>
                        <div class="match-rules-list" style="margin-top: 8px;">
                            <div class="match-rule-item">
                                <input type="checkbox" id="entity-customer" onchange="checkMultipleEntities()">
                                <label for="entity-customer">Customer</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="entity-organization" onchange="checkMultipleEntities()">
                                <label for="entity-organization">Organization</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="entity-product" onchange="checkMultipleEntities()">
                                <label for="entity-product">Product</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="entity-supplier" onchange="checkMultipleEntities()">
                                <label for="entity-supplier">Supplier</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="entity-contract" onchange="checkMultipleEntities()">
                                <label for="entity-contract">Contract</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="entity-asset" onchange="checkMultipleEntities()">
                                <label for="entity-asset">Asset</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="entity-location" onchange="checkMultipleEntities()">
                                <label for="entity-location">Location</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="entity-account" onchange="checkMultipleEntities()">
                                <label for="entity-account">Account</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="entity-employee" onchange="checkMultipleEntities()">
                                <label for="entity-employee">Employee</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="entity-vendor" onchange="checkMultipleEntities()">
                                <label for="entity-vendor">Vendor</label>
                            </div>
                        </div>
                        <div id="multi-entity-notification" class="notification" style="display: none; margin-top: 12px;">
                            The relationships between the selected entities will also be included in the integration.
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-actions">
            </div>
        </div>
    `;
}

function renderChooseIdentityResolutionStep() {
    return `
        <div class="step-main-grid">
            <div class="step-instructions">
                <div class="instruction-item">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="choose-identity-resolution" data-substep="select-resolution-type">
                    <div class="instruction-text">
                        <strong>Select Identity Resolution Approach</strong>
                        <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 16px;">
                            <div style="border: 1px solid #e0e0e0; border-radius: 6px; padding: 16px; cursor: pointer;" onclick="selectResolutionType('direct')">
                                <input type="radio" name="resolution-type" id="resolution-direct" style="margin-right: 8px;">
                                <label for="resolution-direct" style="cursor: pointer; font-weight: 600;">Business Entity as Unified Profile (Direct Mapping)</label>
                                <p style="margin: 8px 0 0 26px; font-size: 13px; color: #706e6b;">
                                    In this mode the Business Entity completely replaces the Unified Profile by taking its place. Customers must ensure that all profile data is being sent to Informatica as well. It will only appear after it has been processed through Informatica.
                                </p>
                            </div>
                            <div style="border: 1px solid #e0e0e0; border-radius: 6px; padding: 16px; cursor: pointer;" onclick="selectResolutionType('keyring')">
                                <input type="radio" name="resolution-type" id="resolution-keyring" style="margin-right: 8px;">
                                <label for="resolution-keyring" style="cursor: pointer; font-weight: 600;">Golden Key-Ring (D360 is MDM Aware)</label>
                                <p style="margin: 8px 0 0 26px; font-size: 13px; color: #706e6b;">
                                    The Business Entity is the primary and most trusted record on the Key-Ring. The Unified Profile is a superset of profile data in D360 and Informatica. Enables the Business Entity into the Real Time ecosystem for personalization.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-actions">
            </div>
        </div>
    `;
}

function renderReviewMappingsStep() {
    const tables = ['Customer_Profile', 'Customer_Addresses', 'Customer_Phones', 'Customer_Emails', 'Customer_Preferences', 'Customer_Transactions', 'Customer_Segments', 'Customer_Households', 'Customer_Consents', 'Customer_Interactions', 'Customer_Products', 'Customer_Services'];

    return `
        <div class="step-main-grid">
            <div class="step-instructions">
                <div class="instruction-text">
                    <strong>Data Objects Identified from Informatica</strong>
                    <p style="margin: 8px 0; font-size: 13px; color: #706e6b;">
                        Based on selected business entities, these are the data objects that will be synced to Data 360.
                    </p>
                    <div class="data-list">
                        ${tables.map(table => `
                            <div class="data-list-item" style="display: flex; justify-content: space-between; align-items: center;">
                                <span>${table}</span>
                                <button class="preview-button" onclick="showMappingDetails('${table}')">Review Mappings & Create Fields</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="notification warning" style="margin-top: 16px;">
                    We've detected extra fields beyond the standard. Below is the proposed list of modifications to Salesforce's DMO to add placeholders for these values.
                </div>
                <div class="instruction-item" style="margin-top: 16px;">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="review-mappings" data-substep="confirm-mappings">
                    <div class="instruction-text">
                        <strong>Mappings and schema reviewed</strong>
                    </div>
                </div>
            </div>
            <div class="step-actions">
            </div>
        </div>
    `;
}

function renderValidateConnectedDataStep() {
    return `
        <div class="step-main-grid">
            <div class="step-instructions">
                <div class="instruction-text">
                    <strong>Preview Sample Data</strong>
                    <p style="margin: 8px 0; font-size: 13px; color: #706e6b;">
                        By now we've integrated, mapped and transformed the Business Entities to the Standard Data Model. The following previews are based on sample data to help validate correctness of mapping and field value population.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
                        <button class="preview-button" onclick="showPreview('individuals-by-source')">
                            Preview Individuals and Contact Points by Data Source
                        </button>
                        <button class="preview-button" onclick="showPreview('individuals-sample')">
                            Preview Sample of Individuals and Contact Points
                        </button>
                        <button class="preview-button" onclick="showPreview('contact-details')">
                            Preview Sample of Emails, Phones or Address
                        </button>
                    </div>
                </div>
            </div>
            <div class="step-actions">
            </div>
        </div>
    `;
}

function renderSetupIdentityRulesStep() {
    return `
        <div class="step-main-grid">
            <div class="step-instructions">
                <div class="instruction-text">
                    <strong>Configure Identity Match Rules</strong>
                    <p style="margin: 8px 0; font-size: 13px; color: #706e6b;">
                        In this section we are going to define the rules that govern how to link new profile data to existing business entities or form independent key-rings to be shared with Informatica-MDM. Integrity and precedence of the Business Entities IDs is always preserved.
                    </p>
                    <p style="margin: 8px 0; font-size: 13px; font-weight: 600;">
                        Based on the available mappings and data in Party Identifier and Identity Match, we recommend to include the following match rules:
                    </p>
                </div>
                <div class="instruction-item">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="setup-identity-rules" data-substep="configure-match-rules">
                    <div class="instruction-text">
                        <strong>Select Match Rules to Create</strong>
                        <div class="match-rules-list" style="margin-top: 8px;">
                            <div class="match-rule-item">
                                <input type="checkbox" id="rule-fuzzy-email">
                                <label for="rule-fuzzy-email">Fuzzy Name and Normalized Email</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="rule-fuzzy-phone">
                                <label for="rule-fuzzy-phone">Fuzzy Name and Normalized Phone</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="rule-fuzzy-address">
                                <label for="rule-fuzzy-address">Fuzzy Name and Normalized Address</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="rule-party-mc">
                                <label for="rule-party-mc">Party Identifier: MC Subscriber Key</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="rule-party-3rd">
                                <label for="rule-party-3rd">Party Identifier: 3rd Party Enrichment IDs</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="rule-lead-contact">
                                <label for="rule-lead-contact">Identity Match: Lead to Contact</label>
                            </div>
                            <div class="match-rule-item">
                                <input type="checkbox" id="rule-mdm">
                                <label for="rule-mdm">Identity Match: MDM Connection</label>
                            </div>
                        </div>
                        <p style="margin-top: 12px; font-size: 13px; color: #706e6b;">
                            To modify the suggested match rules or include additional rules in the Identity Ruleset configuration
                        </p>
                    </div>
                </div>
            </div>
            <div class="step-actions">
                <button class="action-button secondary">Configure Advanced Rules</button>
            </div>
        </div>
    `;
}

function renderValidateIdentityDataStep() {
    return `
        <div class="step-main-grid">
            <div class="step-instructions">
                <div class="instruction-text">
                    <strong>Preview Identity Resolution Results</strong>
                    <p style="margin: 8px 0; font-size: 13px; color: #706e6b;">
                        After Identity Resolution has finished processing, use the following sample data preview to inspect the data.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
                        <button class="preview-button" onclick="showPreview('profile-data')">
                            Preview Sample Profile Data
                        </button>
                        <button class="preview-button" onclick="showPreview('outliers')">
                            Explore the outliers
                        </button>
                        <button class="preview-button" onclick="showPreview('process-summary')">
                            Preview Identity Process Summary
                        </button>
                        <p style="margin: 8px 0; font-size: 12px; color: #706e6b; padding-left: 12px;">
                            (Total Source Profiles, Total Unified Profiles, Consolidation Rate)
                        </p>
                        <button class="preview-button" onclick="showPreview('consolidation-rate')">
                            Preview Consolidation Rate by Data Source
                        </button>
                    </div>
                </div>
                <div class="instruction-item" style="margin-top: 16px;">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="validate-identity-data" data-substep="configure-schedule">
                    <div class="instruction-text">
                        <strong>Enable Identity Rules Schedule</strong>
                        <div class="toggle-container">
                            <div class="toggle-switch" id="schedule-toggle" onclick="toggleSchedule()">
                                <div class="toggle-slider"></div>
                            </div>
                            <span class="toggle-label">Schedule is Off</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-actions">
            </div>
        </div>
    `;
}

function renderEnableSyncStep() {
    return `
        <div class="step-main-grid">
            <div class="step-instructions">
                <div class="instruction-text">
                    <strong>Enable Sync to Informatica</strong>
                    <p style="margin: 8px 0; font-size: 13px; color: #706e6b;">
                        Enable sync to Informatica for Key-Rings that do not contain a business entity. Share the source records for enrichment and quality assurance.
                    </p>
                </div>
                <div class="instruction-item">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="enable-sync-informatica" data-substep="configure-sync">
                    <div class="instruction-text">
                        <strong>Mark as complete when configuration is done</strong>
                    </div>
                </div>
            </div>
            <div class="step-actions">
                <button class="action-button">Configure D360 Setup in Informatica</button>
            </div>
        </div>
    `;
}

function renderSetupExperiencesStep() {
    return `
        <div class="step-main-grid">
            <div class="step-instructions">
                <div class="instruction-item">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="setup-experiences" data-substep="search-before-create">
                    <div class="instruction-text">
                        <strong>Search Before Create</strong>
                        <p style="margin: 4px 0; font-size: 13px; color: #706e6b;">
                            Prevent duplicate records from being created
                        </p>
                    </div>
                </div>
                <div class="instruction-item">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="setup-experiences" data-substep="copy-field">
                    <div class="instruction-text">
                        <strong>Copy Field</strong>
                        <p style="margin: 4px 0; font-size: 13px; color: #706e6b;">
                            Enrich operational records with enterprise attributes
                        </p>
                    </div>
                </div>
                <div class="instruction-item">
                    <input type="checkbox" class="instruction-checkbox" data-step-id="setup-experiences" data-substep="related-list">
                    <div class="instruction-text">
                        <strong>Related List</strong>
                        <p style="margin: 4px 0; font-size: 13px; color: #706e6b;">
                            Showcase any information related to the primary entity
                        </p>
                    </div>
                </div>
            </div>
            <div class="step-actions">
                <a href="#" class="action-button secondary" style="text-decoration: none; display: block; margin-bottom: 8px;">View Trailhead for Setup</a>
            </div>
        </div>
    `;
}

// Event Handlers
function attachTileHandlers() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const page = this.dataset.page;
            navigateToPage(page);
        });
    });
}

function attachStepHandlers() {
    // Step summary items click
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        item.addEventListener('click', function() {
            const stepId = this.dataset.stepId;
            scrollToStep(stepId);
        });
    });

    // Checkbox handlers
    const checkboxes = document.querySelectorAll('.instruction-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const stepId = this.dataset.stepId;
            const substep = this.dataset.substep;
            updateStepProgress(stepId, substep, this.checked);
        });
    });
}

function toggleSummary() {
    const summary = document.getElementById('step-summary');
    summary.classList.toggle('collapsed');
}

function toggleStepPanel(stepId) {
    const panel = document.getElementById(`step-${stepId}`);
    const wasCollapsed = panel.classList.contains('collapsed');
    panel.classList.toggle('collapsed');

    // Track state
    appState.stepStates[stepId] = wasCollapsed;

    // Update step status to in-progress if opening for first time
    if (wasCollapsed && getStepStatus(stepId) === 'not-started') {
        updateStepStatus(stepId, 'in-progress');
    }
}

function scrollToStep(stepId) {
    const panel = document.getElementById(`step-${stepId}`);
    if (panel) {
        // Expand the panel if collapsed
        if (panel.classList.contains('collapsed')) {
            toggleStepPanel(stepId);
        }

        // Scroll to the panel
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function goToNextStep(currentIndex) {
    const steps = getIntegrationSteps();
    const nextIndex = currentIndex + 1;

    if (nextIndex < steps.length) {
        const nextStepId = steps[nextIndex].id;
        scrollToStep(nextStepId);
    }
}

// State Management
function getStepStatus(stepId) {
    const progress = appState.stepProgress[stepId];
    if (!progress) return 'not-started';

    const steps = getIntegrationSteps().find(s => s.id === stepId);
    if (!steps) return 'not-started';

    const totalSubsteps = steps.substeps ? steps.substeps.length : 0;
    const completedSubsteps = Object.values(progress).filter(v => v).length;

    if (completedSubsteps === 0) return 'not-started';
    if (completedSubsteps === totalSubsteps) return 'completed';
    return 'in-progress';
}

function updateStepStatus(stepId, status) {
    // Update UI
    const stepItems = document.querySelectorAll(`.step-item[data-step-id="${stepId}"]`);
    stepItems.forEach(item => {
        const iconContainer = item.querySelector('.step-icon, svg');
        if (iconContainer) {
            iconContainer.outerHTML = renderStepIcon(status);
        }
    });
}

function updateStepProgress(stepId, substep, completed) {
    if (!appState.stepProgress[stepId]) {
        appState.stepProgress[stepId] = {};
    }

    appState.stepProgress[stepId][substep] = completed;

    // Update step status
    const newStatus = getStepStatus(stepId);
    updateStepStatus(stepId, newStatus);

    // Update sub-steps summary
    updateSubStepsSummary(stepId);
}

function getSubStepsSummary(stepId, substeps) {
    const progress = appState.stepProgress[stepId] || {};
    const completed = Object.values(progress).filter(v => v).length;
    const total = substeps.length;
    return `${completed} out of ${total}`;
}

function updateSubStepsSummary(stepId) {
    const panel = document.getElementById(`step-${stepId}`);
    if (panel) {
        const summaryElement = panel.querySelector('.sub-steps-summary');
        if (summaryElement) {
            const steps = getIntegrationSteps().find(s => s.id === stepId);
            if (steps) {
                summaryElement.textContent = getSubStepsSummary(stepId, steps.substeps || []);
            }
        }
    }
}

// Interactive Functions
function validateConnection() {
    const button = event.target;
    button.textContent = 'Validating...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Validated ✓';
        button.style.backgroundColor = '#2e844a';

        // Check the checkbox
        const checkbox = document.querySelector('[data-step-id="connect-informatica"][data-substep="configure-connection"]');
        if (checkbox) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        }

        setTimeout(() => {
            button.textContent = 'Validate Connection';
            button.style.backgroundColor = '';
            button.disabled = false;
        }, 2000);
    }, 1500);
}

function checkMultipleEntities() {
    const checkboxes = document.querySelectorAll('[id^="entity-"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked);
    const notification = document.getElementById('multi-entity-notification');

    if (checked.length > 1) {
        notification.style.display = 'block';
    } else {
        notification.style.display = 'none';
    }

    if (checked.length > 0) {
        const checkbox = document.querySelector('[data-step-id="choose-business-entity"][data-substep="select-entities"]');
        if (checkbox && !checkbox.checked) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        }
    }
}

function selectResolutionType(type) {
    const radio = document.getElementById(`resolution-${type}`);
    radio.checked = true;

    const checkbox = document.querySelector('[data-step-id="choose-identity-resolution"][data-substep="select-resolution-type"]');
    if (checkbox && !checkbox.checked) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
    }
}

function showMappingDetails(tableName) {
    alert(`Opening mapping details for ${tableName}...\n\nThis would navigate to a detailed mapping configuration page.`);
}

function showPreview(previewType) {
    alert(`Opening preview for ${previewType}...\n\nThis would show sample data in a modal or new page.`);
}

function toggleSchedule() {
    const toggle = document.getElementById('schedule-toggle');
    const label = toggle.nextElementSibling;

    toggle.classList.toggle('on');

    if (toggle.classList.contains('on')) {
        label.textContent = 'Schedule is On';
    } else {
        label.textContent = 'Schedule is Off';
    }

    const checkbox = document.querySelector('[data-step-id="validate-identity-data"][data-substep="configure-schedule"]');
    if (checkbox && toggle.classList.contains('on')) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
    }
}
