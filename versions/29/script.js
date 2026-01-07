// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavCollapsed: false,
    stepSummaryCollapsed: false,
    stepStates: {
        'connect-informatica': { status: 'not-started', substeps: {} },
        'choose-business-entity': { status: 'not-started', substeps: {} },
        'choose-identity-resolution': { status: 'not-started', substeps: {} },
        'review-mappings': { status: 'not-started', substeps: {} },
        'validate-connected-data': { status: 'not-started', substeps: {} },
        'setup-identity-rules': { status: 'not-started', substeps: {} },
        'validate-identity-data': { status: 'not-started', substeps: {} },
        'enable-sync-informatica': { status: 'not-started', substeps: {} },
        'setup-experiences': { status: 'not-started', substeps: {} }
    }
};

// DOM Elements
const appPickerBtn = document.getElementById('appPickerBtn');
const appDropdown = document.getElementById('appDropdown');
const appLabel = document.getElementById('appLabel');
const leftNav = document.getElementById('leftNav');
const collapseBtn = document.getElementById('collapseBtn');
const pageArea = document.getElementById('pageArea');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadPage('home');
});

// Event Listeners Setup
function setupEventListeners() {
    // App Picker
    appPickerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        appDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        appDropdown.classList.remove('active');
    });

    document.querySelectorAll('.app-option').forEach(option => {
        option.addEventListener('click', () => {
            const appName = option.dataset.app;
            appState.currentApp = appName;
            appLabel.textContent = appName;
            document.querySelectorAll('.app-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // Navigation Tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.dataset.page;
            loadPage(page);
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Left Navigation Collapse
    collapseBtn.addEventListener('click', () => {
        leftNav.classList.toggle('collapsed');
        appState.leftNavCollapsed = !appState.leftNavCollapsed;
    });

    // Left Navigation Items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            loadPage(page);
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Page Loading
function loadPage(pageName) {
    appState.currentPage = pageName;
    let content = '';

    switch(pageName) {
        case 'home':
            content = getHomePageContent();
            break;
        case 'solution-manager':
            content = getSolutionManagerContent();
            break;
        case 'integrate-business-entities':
            content = getIntegrateBusinessEntitiesContent();
            break;
        case 'customer-households':
            content = getCustomerHouseholdsContent();
            break;
        case 'connect-unify':
        case 'govern-data':
        case 'process-content':
        case 'query-segment':
        case 'analyze-predict':
        case 'act-on-data':
        case 'build-share':
            content = getEmptyStateContent();
            break;
        default:
            content = getEmptyStateContent();
    }

    pageArea.innerHTML = content;
    attachPageEventListeners(pageName);
}

// Page Content Generators
function getHomePageContent() {
    return '<div class="empty-state"></div>';
}

function getSolutionManagerContent() {
    return `
        <div class="tile-grid">
            <div class="tile" onclick="loadPage('integrate-business-entities')">
                <div class="tile-title">Integrate Business Entities from Informatica in Data 360</div>
                <div class="tile-description">
                    Realize the full potential of the curated and enriched business entities from
                    Informatica directly in D360. In this step by step guide, we will work though the
                    steps required to operationalize business entities created in Informatica in D360
                </div>
            </div>
            <div class="tile" onclick="loadPage('customer-households')">
                <div class="tile-title">Integrate and expand CRM Households in Data 360</div>
                <div class="tile-description">
                    Enable Analytics, Marketing and Agentic experiences for your existing Customer
                    Households. Extend the Household profile with engagement data from other systems
                    though Unified Individuals and Household link Rules.
                </div>
            </div>
        </div>
    `;
}

function getCustomerHouseholdsContent() {
    return '<div class="work-in-progress">WORK IN PROGRESS</div>';
}

function getEmptyStateContent() {
    return '<div class="empty-state"></div>';
}

function getIntegrateBusinessEntitiesContent() {
    return `
        <div class="header-instructions">
            <h1>Integrate Business Entities from Informatica in Data 360</h1>
            <p>
                Realize the full potential of the curated and enriched business entities from
                Informatica directly in D360. In this step by step guide, we will work though the
                steps required to operationalize business entities created in Informatica in D360
            </p>
        </div>

        <div class="step-summary" id="stepSummary">
            <div class="step-summary-header">
                <div class="step-summary-title">Implementation Steps</div>
                <button class="collapse-step-summary" onclick="toggleStepSummary()">▲</button>
            </div>
            <div class="step-summary-content">
                <div class="step-list" id="stepList">
                    ${getStepListItems()}
                </div>
                <div class="video-placeholder">
                    Video Tutorial Placeholder
                </div>
            </div>
        </div>

        <div class="step-details-container">
            ${getConnectInformaticaPanel()}
            ${getChooseBusinessEntityPanel()}
            ${getChooseIdentityResolutionPanel()}
            ${getReviewMappingsPanel()}
            ${getValidateConnectedDataPanel()}
            ${getSetupIdentityRulesPanel()}
            ${getValidateIdentityDataPanel()}
            ${getEnableSyncInformaticaPanel()}
            ${getSetupExperiencesPanel()}
        </div>
    `;
}

// Step List Items
function getStepListItems() {
    const steps = [
        { id: 'connect-informatica', label: 'Connect to Informatica System' },
        { id: 'choose-business-entity', label: 'Choose Business Entity' },
        { id: 'choose-identity-resolution', label: 'Choose Identity Resolution Type' },
        { id: 'review-mappings', label: 'Review Mappings' },
        { id: 'validate-connected-data', label: 'Validate Connected Data' },
        { id: 'setup-identity-rules', label: 'Set up Identity Rules' },
        { id: 'validate-identity-data', label: 'Validate Identity Data' },
        { id: 'enable-sync-informatica', label: 'Enable Sync to Informatica' },
        { id: 'setup-experiences', label: 'Setup Experiences' }
    ];

    return steps.map(step => {
        const status = appState.stepStates[step.id].status;
        const icon = getStatusIcon(status);
        return `
            <div class="step-item" onclick="scrollToStep('${step.id}')">
                <span class="step-status-icon">${icon}</span>
                <span class="step-item-label">${step.label}</span>
            </div>
        `;
    }).join('');
}

function getStatusIcon(status) {
    switch(status) {
        case 'completed': return '✅';
        case 'in-progress': return '🔄';
        default: return '⭕';
    }
}

// Step Detail Panels
function getConnectInformaticaPanel() {
    return `
        <div class="step-detail-panel" id="step-connect-informatica">
            <div class="step-detail-header" onclick="toggleStepPanel('connect-informatica')">
                <div class="step-detail-title">Connect to Informatica System</div>
                <div class="step-detail-headline">Establish trusted connection between D360 and Informatica tenants</div>
                <div class="sub-steps-summary" id="substeps-connect-informatica">0 out of 1</div>
            </div>
            <div class="step-detail-main">
                <div class="main-content-grid">
                    <div class="main-instructions">
                        <div class="step-detail-description">
                            Configure details for the Informatica tenant, so that a trusted connection between them can be provided.
                            The important items are "User-Name" and "Password"
                        </div>

                        <div class="two-column-layout">
                            <div>
                                <h4 style="margin-bottom: 12px; font-size: 14px;">Existing Connection</h4>
                                <div class="form-group">
                                    <label class="form-label">Connection Name</label>
                                    <select class="form-select" id="existingConnection">
                                        <option value="">Select existing connection...</option>
                                        <option value="prod-connection">Production Connection</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 12px; font-size: 14px;">New Connection</h4>
                                <div class="form-group">
                                    <label class="form-label">Connection Name</label>
                                    <input type="text" class="form-input" id="newConnectionName" placeholder="My Informatica Connection">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Tenant URL</label>
                                    <input type="text" class="form-input" id="tenantUrl" placeholder="https://tenant.informaticacloud.com">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">User Name</label>
                                    <input type="text" class="form-input" id="userName" placeholder="admin@company.com">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input type="password" class="form-input" id="password" placeholder="••••••••">
                                </div>
                                <button class="btn btn-secondary" onclick="validateConnection()">Validate</button>
                                <div id="validationResult"></div>
                            </div>
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('connect-informatica', 'configured', this.checked)">
                            <div class="sub-step-text">Connection configured and validated successfully</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-detail-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="btn btn-primary" onclick="goToNextStep('connect-informatica')">Next Step</button>
            </div>
        </div>
    `;
}

function getChooseBusinessEntityPanel() {
    const entities = [
        'Customer', 'Organization', 'Product', 'Supplier',
        'Employee', 'Location', 'Asset', 'Contract',
        'Invoice', 'Shipment'
    ];

    return `
        <div class="step-detail-panel" id="step-choose-business-entity">
            <div class="step-detail-header" onclick="toggleStepPanel('choose-business-entity')">
                <div class="step-detail-title">Choose Business Entity</div>
                <div class="step-detail-headline">Select Business from the connected tenant to integrate into Data 360</div>
                <div class="sub-steps-summary" id="substeps-choose-business-entity">0 out of 1</div>
            </div>
            <div class="step-detail-main">
                <div class="main-content-grid">
                    <div class="main-instructions">
                        <div class="step-detail-description">
                            Select one or more business entities from Informatica's primary business entities to integrate into Data 360.
                        </div>

                        <div class="checkbox-group" id="businessEntityList">
                            ${entities.map(entity => `
                                <div class="checkbox-item">
                                    <input type="checkbox" id="entity-${entity}"
                                           onchange="handleEntitySelection()">
                                    <label for="entity-${entity}">${entity}</label>
                                </div>
                            `).join('')}
                        </div>

                        <div id="multipleEntityNotification"></div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox" id="entity-selection-complete"
                                   onchange="updateSubstep('choose-business-entity', 'selected', this.checked)">
                            <div class="sub-step-text">At least one business entity selected</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-detail-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="btn btn-primary" onclick="goToNextStep('choose-business-entity')">Next Step</button>
            </div>
        </div>
    `;
}

function getChooseIdentityResolutionPanel() {
    return `
        <div class="step-detail-panel" id="step-choose-identity-resolution">
            <div class="step-detail-header" onclick="toggleStepPanel('choose-identity-resolution')">
                <div class="step-detail-title">Choose Identity Resolution Type</div>
                <div class="step-detail-headline">Select the identity resolution mode for your business entities</div>
                <div class="sub-steps-summary" id="substeps-choose-identity-resolution">0 out of 1</div>
            </div>
            <div class="step-detail-main">
                <div class="main-content-grid">
                    <div class="main-instructions">
                        <div class="step-detail-description">
                            Choose between "Business Entity as Unified Profile (Direct Mapping)" (Informatica compute only)
                            OR "Golden Key-Ring" (D360 is MDM Aware)
                        </div>

                        <div class="radio-group">
                            <div class="radio-option" onclick="selectResolutionType('direct-mapping')">
                                <div class="radio-header">
                                    <input type="radio" name="resolutionType" id="direct-mapping"
                                           onchange="handleResolutionTypeChange()">
                                    <label class="radio-title" for="direct-mapping">
                                        Business Entity as Unified Profile (Direct Mapping)
                                    </label>
                                </div>
                                <div class="radio-details">
                                    In this mode the Business Entity completely replaces the Unified Profile by taking its place.
                                    Customers must ensure that all profile data is being sent to Informatica as well.
                                    It will only appear after it has been processed through Informatica.
                                </div>
                            </div>

                            <div class="radio-option" onclick="selectResolutionType('golden-keyring')">
                                <div class="radio-header">
                                    <input type="radio" name="resolutionType" id="golden-keyring"
                                           onchange="handleResolutionTypeChange()">
                                    <label class="radio-title" for="golden-keyring">
                                        Golden Key-Ring
                                    </label>
                                </div>
                                <div class="radio-details">
                                    The Business Entity is the primary and most trusted record on the Key-Ring.
                                    The Unified Profile is a superset of profile data in D360 and Informatica.
                                    Enables the Business Entity into the Real Time ecosystem for personalization.
                                </div>
                            </div>
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox" id="resolution-type-complete"
                                   onchange="updateSubstep('choose-identity-resolution', 'selected', this.checked)">
                            <div class="sub-step-text">Identity resolution type selected</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-detail-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="btn btn-primary" onclick="goToNextStep('choose-identity-resolution')">Next Step</button>
            </div>
        </div>
    `;
}

function getReviewMappingsPanel() {
    const tables = [
        { name: 'Customer_Profile', fields: ['customer_id', 'first_name', 'last_name', 'email', 'phone'] },
        { name: 'Customer_Address', fields: ['address_id', 'street', 'city', 'state', 'postal_code'] },
        { name: 'Customer_Preferences', fields: ['preference_id', 'category', 'opt_in_status', 'update_date'] },
        { name: 'Contact_Points', fields: ['contact_id', 'type', 'value', 'verified'] },
        { name: 'Party_Identifier', fields: ['identifier_id', 'type', 'value', 'source'] },
        { name: 'Customer_Segments', fields: ['segment_id', 'segment_name', 'start_date', 'end_date'] },
        { name: 'Engagement_History', fields: ['engagement_id', 'channel', 'timestamp', 'outcome'] },
        { name: 'Product_Ownership', fields: ['ownership_id', 'product_id', 'purchase_date', 'status'] },
        { name: 'Customer_Metrics', fields: ['metric_id', 'metric_type', 'value', 'calculation_date'] },
        { name: 'Communication_Log', fields: ['log_id', 'communication_type', 'sent_date', 'response'] }
    ];

    return `
        <div class="step-detail-panel" id="step-review-mappings">
            <div class="step-detail-header" onclick="toggleStepPanel('review-mappings')">
                <div class="step-detail-title">Review Mappings</div>
                <div class="step-detail-headline">Review data object mappings from Informatica to Data 360</div>
                <div class="sub-steps-summary" id="substeps-review-mappings">0 out of 1</div>
            </div>
            <div class="step-detail-main">
                <div class="main-content-grid">
                    <div class="main-instructions">
                        <div class="step-detail-description">
                            Based on selected business entities these are the data objects identified from Informatica
                            that are being synced to Data 360.
                        </div>

                        <div class="scrollable-list">
                            ${tables.map(table => `
                                <div class="list-item">
                                    <strong>${table.name}</strong>
                                    <div class="field-list">
                                        Fields: ${table.fields.join(', ')}
                                    </div>
                                    <button class="btn btn-secondary btn-small"
                                            onclick="showRedirectNotification()"
                                            style="margin-top: 8px;">
                                        Review Mappings & Create Fields
                                    </button>
                                </div>
                            `).join('')}
                        </div>

                        <div class="notification">
                            We've detected extra fields beyond the standard. Below is the proposed list of
                            modifications to Salesforce's DMO to add placeholders for these values.
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('review-mappings', 'reviewed', this.checked)">
                            <div class="sub-step-text">Mappings and schema reviewed</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-detail-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="btn btn-primary" onclick="goToNextStep('review-mappings')">Next Step</button>
            </div>
        </div>
    `;
}

function getValidateConnectedDataPanel() {
    return `
        <div class="step-detail-panel" id="step-validate-connected-data">
            <div class="step-detail-header" onclick="toggleStepPanel('validate-connected-data')">
                <div class="step-detail-title">Validate Connected Data</div>
                <div class="step-detail-headline">Preview and validate the integrated business entity data</div>
                <div class="sub-steps-summary" id="substeps-validate-connected-data">0 out of 3</div>
            </div>
            <div class="step-detail-main">
                <div class="main-content-grid">
                    <div class="main-instructions">
                        <div class="step-detail-description">
                            By now we've integrated, mapped and transformed the Business Entities to the Standard
                            Data Model. The following previews are based on sample data to help validate correctness
                            of mapping and field value population.
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('validate-connected-data', 'view-by-source', this.checked)">
                            <div class="sub-step-text">
                                View Individuals and Contact Points by Data Source
                                <button class="btn btn-secondary btn-small"
                                        onclick="showRedirectNotification()"
                                        style="margin-top: 8px;">
                                    Preview
                                </button>
                            </div>
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('validate-connected-data', 'view-sample', this.checked)">
                            <div class="sub-step-text">
                                View Sample of Individuals and Contact Points
                                <button class="btn btn-secondary btn-small"
                                        onclick="showRedirectNotification()"
                                        style="margin-top: 8px;">
                                    Preview
                                </button>
                            </div>
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('validate-connected-data', 'view-contact-details', this.checked)">
                            <div class="sub-step-text">
                                View Sample of Emails, Phones or Address
                                <button class="btn btn-secondary btn-small"
                                        onclick="showRedirectNotification()"
                                        style="margin-top: 8px;">
                                    Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-detail-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="btn btn-primary" onclick="goToNextStep('validate-connected-data')">Next Step</button>
            </div>
        </div>
    `;
}

function getSetupIdentityRulesPanel() {
    const matchRules = [
        { id: 'fuzzy-email', label: 'Fuzzy Name and Normalized Email' },
        { id: 'fuzzy-phone', label: 'Fuzzy Name and Normalized Phone' },
        { id: 'fuzzy-address', label: 'Fuzzy Name and Normalized Address' },
        { id: 'party-mc', label: 'Party Identifiers: Person Identifier - MC Subscriber Key' },
        { id: 'party-enrichment', label: 'Party Identifiers: Person Identifier - 3rd Party Enrichment Ids' },
        { id: 'lead-contact', label: 'Identity Match Rules: Lead to Contact' },
        { id: 'mdm-connection', label: 'Identity Match Rules: MDM Connection' }
    ];

    return `
        <div class="step-detail-panel" id="step-setup-identity-rules">
            <div class="step-detail-header" onclick="toggleStepPanel('setup-identity-rules')">
                <div class="step-detail-title">Set up Identity Rules</div>
                <div class="step-detail-headline">Configure match rules for identity resolution</div>
                <div class="sub-steps-summary" id="substeps-setup-identity-rules">0 out of 1</div>
            </div>
            <div class="step-detail-main">
                <div class="main-content-grid">
                    <div class="main-instructions">
                        <div class="step-detail-description">
                            In this section we are going to configure the rules that govern how to link new profile
                            data to existing business entities or form independent key-rings to be shared with
                            Informatica-MDM. Integrity and precedence of the Business Entities IDs is always preserved.
                        </div>

                        <p style="font-size: 14px; color: #333; margin-bottom: 12px;">
                            Based on the available mappings and data in Party Identifier and Identity Match we
                            recommend to include the following match rules:
                        </p>

                        <div class="checkbox-group" id="matchRulesList">
                            ${matchRules.map(rule => `
                                <div class="checkbox-item">
                                    <input type="checkbox" id="rule-${rule.id}"
                                           onchange="handleMatchRuleSelection()">
                                    <label for="rule-${rule.id}">${rule.label}</label>
                                </div>
                            `).join('')}
                        </div>

                        <p style="font-size: 13px; color: #666; margin: 16px 0;">
                            To modify the suggested match rules or include additional rules in the Identity Ruleset configuration:
                        </p>

                        <button class="btn btn-secondary" onclick="showRedirectNotification()">
                            Configure Identity Ruleset
                        </button>

                        <div class="sub-step-item" style="margin-top: 16px;">
                            <input type="checkbox" class="sub-step-checkbox" id="match-rules-complete"
                                   onchange="updateSubstep('setup-identity-rules', 'configured', this.checked)">
                            <div class="sub-step-text">At least one match rule selected</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-detail-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="btn btn-primary" onclick="goToNextStep('setup-identity-rules')">Next Step</button>
            </div>
        </div>
    `;
}

function getValidateIdentityDataPanel() {
    return `
        <div class="step-detail-panel" id="step-validate-identity-data">
            <div class="step-detail-header" onclick="toggleStepPanel('validate-identity-data')">
                <div class="step-detail-title">Validate Identity Data</div>
                <div class="step-detail-headline">Review identity resolution results and enable scheduling</div>
                <div class="sub-steps-summary" id="substeps-validate-identity-data">0 out of 5</div>
            </div>
            <div class="step-detail-main">
                <div class="main-content-grid">
                    <div class="main-instructions">
                        <div class="step-detail-description">
                            After Identity Resolution has finished processing, use the following sample data preview
                            to inspect the data and verify the results.
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('validate-identity-data', 'preview-profile', this.checked)">
                            <div class="sub-step-text">
                                Preview Sample Profile Data
                                <button class="btn btn-secondary btn-small"
                                        onclick="showRedirectNotification()"
                                        style="margin-top: 8px;">
                                    Preview
                                </button>
                            </div>
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('validate-identity-data', 'explore-outliers', this.checked)">
                            <div class="sub-step-text">
                                Explore the outliers
                                <button class="btn btn-secondary btn-small"
                                        onclick="showRedirectNotification()"
                                        style="margin-top: 8px;">
                                    Preview
                                </button>
                            </div>
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('validate-identity-data', 'process-summary', this.checked)">
                            <div class="sub-step-text">
                                Preview Identity Process Summary (Total Source Profiles, Total Unified Profiles, Consolidation Rate)
                                <button class="btn btn-secondary btn-small"
                                        onclick="showRedirectNotification()"
                                        style="margin-top: 8px;">
                                    Preview
                                </button>
                            </div>
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('validate-identity-data', 'consolidation-rate', this.checked)">
                            <div class="sub-step-text">
                                Preview Consolidation Rate by Data Source
                                <button class="btn btn-secondary btn-small"
                                        onclick="showRedirectNotification()"
                                        style="margin-top: 8px;">
                                    Preview
                                </button>
                            </div>
                        </div>

                        <div class="toggle-container">
                            <span class="toggle-label">Enable Identity Rules Schedule</span>
                            <div class="toggle-switch" id="identityRulesToggle" onclick="toggleIdentityRules()">
                                <div class="toggle-slider"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-detail-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="btn btn-primary" onclick="goToNextStep('validate-identity-data')">Next Step</button>
            </div>
        </div>
    `;
}

function getEnableSyncInformaticaPanel() {
    return `
        <div class="step-detail-panel" id="step-enable-sync-informatica">
            <div class="step-detail-header" onclick="toggleStepPanel('enable-sync-informatica')">
                <div class="step-detail-title">Enable Sync to Informatica</div>
                <div class="step-detail-headline">Configure data synchronization from D360 to Informatica</div>
                <div class="sub-steps-summary" id="substeps-enable-sync-informatica">0 out of 1</div>
            </div>
            <div class="step-detail-main">
                <div class="main-content-grid">
                    <div class="main-instructions">
                        <div class="step-detail-description">
                            Enable sync to Informatica for Key-Rings that do not contain a business entity.
                            Share the source records for enrichment and quality assurance.
                        </div>

                        <button class="btn btn-secondary" onclick="showRedirectNotification()">
                            Configure D360 Setup in Informatica
                        </button>

                        <div class="sub-step-item" style="margin-top: 16px;">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('enable-sync-informatica', 'configured', this.checked)">
                            <div class="sub-step-text">Sync to Informatica configured and enabled</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-detail-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="btn btn-primary" onclick="goToNextStep('enable-sync-informatica')">Next Step</button>
            </div>
        </div>
    `;
}

function getSetupExperiencesPanel() {
    return `
        <div class="step-detail-panel" id="step-setup-experiences">
            <div class="step-detail-header" onclick="toggleStepPanel('setup-experiences')">
                <div class="step-detail-title">Setup Experiences</div>
                <div class="step-detail-headline">Configure user experiences for business entities</div>
                <div class="sub-steps-summary" id="substeps-setup-experiences">0 out of 3</div>
            </div>
            <div class="step-detail-main">
                <div class="main-content-grid">
                    <div class="main-instructions">
                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('setup-experiences', 'search-before-create', this.checked)">
                            <div class="sub-step-text">
                                <strong>Search Before Create</strong> - Prevent duplicate records from being created
                                <div style="margin-top: 8px;">
                                    <a href="#" class="footer-link">View Trailhead for Setup</a>
                                    <a href="#" class="footer-link" style="margin-left: 12px;">View Documentation</a>
                                </div>
                            </div>
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('setup-experiences', 'copy-field', this.checked)">
                            <div class="sub-step-text">
                                <strong>Copy Field</strong> - Enrich operational records with enterprise attributes
                                <div style="margin-top: 8px;">
                                    <a href="#" class="footer-link">View Trailhead for Setup</a>
                                    <a href="#" class="footer-link" style="margin-left: 12px;">View Documentation</a>
                                </div>
                            </div>
                        </div>

                        <div class="sub-step-item">
                            <input type="checkbox" class="sub-step-checkbox"
                                   onchange="updateSubstep('setup-experiences', 'related-list', this.checked)">
                            <div class="sub-step-text">
                                <strong>Related List</strong> - Showcase any information related to the primary entity
                                <div style="margin-top: 8px;">
                                    <a href="#" class="footer-link">View Trailhead for Setup</a>
                                    <a href="#" class="footer-link" style="margin-left: 12px;">View Documentation</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-detail-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                <button class="btn btn-primary" onclick="alert('All steps completed!')">Complete</button>
            </div>
        </div>
    `;
}

// Page-Specific Event Listeners
function attachPageEventListeners(pageName) {
    if (pageName === 'integrate-business-entities') {
        updateStepList();
    }
}

// Interactive Functions
function toggleStepSummary() {
    const stepSummary = document.getElementById('stepSummary');
    stepSummary.classList.toggle('collapsed');
    appState.stepSummaryCollapsed = !appState.stepSummaryCollapsed;
}

function toggleStepPanel(stepId) {
    const panel = document.getElementById(`step-${stepId}`);
    panel.classList.toggle('expanded');

    // Update status to in-progress when first opened
    if (panel.classList.contains('expanded') && appState.stepStates[stepId].status === 'not-started') {
        appState.stepStates[stepId].status = 'in-progress';
        updateStepList();
    }
}

function scrollToStep(stepId) {
    const panel = document.getElementById(`step-${stepId}`);
    if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (!panel.classList.contains('expanded')) {
            panel.classList.add('expanded');
        }
        if (appState.stepStates[stepId].status === 'not-started') {
            appState.stepStates[stepId].status = 'in-progress';
            updateStepList();
        }
    }
}

function goToNextStep(currentStepId) {
    const steps = Object.keys(appState.stepStates);
    const currentIndex = steps.indexOf(currentStepId);

    if (currentIndex < steps.length - 1) {
        const nextStepId = steps[currentIndex + 1];
        scrollToStep(nextStepId);
    }
}

function updateSubstep(stepId, substepId, checked) {
    if (!appState.stepStates[stepId].substeps) {
        appState.stepStates[stepId].substeps = {};
    }

    appState.stepStates[stepId].substeps[substepId] = checked;
    updateSubstepSummary(stepId);
    updateStepStatus(stepId);
    updateStepList();
}

function updateSubstepSummary(stepId) {
    const substeps = appState.stepStates[stepId].substeps;
    const total = Object.keys(substeps).length;
    const completed = Object.values(substeps).filter(v => v).length;

    const summaryElement = document.getElementById(`substeps-${stepId}`);
    if (summaryElement) {
        summaryElement.textContent = `${completed} out of ${total}`;
    }
}

function updateStepStatus(stepId) {
    const substeps = appState.stepStates[stepId].substeps;
    const total = Object.keys(substeps).length;
    const completed = Object.values(substeps).filter(v => v).length;

    if (completed === total && total > 0) {
        appState.stepStates[stepId].status = 'completed';
    } else if (completed > 0) {
        appState.stepStates[stepId].status = 'in-progress';
    }
}

function updateStepList() {
    const stepList = document.getElementById('stepList');
    if (stepList) {
        stepList.innerHTML = getStepListItems();
    }
}

function validateConnection() {
    const resultDiv = document.getElementById('validationResult');
    resultDiv.innerHTML = '<span class="spinner"></span>';

    setTimeout(() => {
        resultDiv.innerHTML = '<div class="validation-success">✓ Connection validated successfully!</div>';
        document.querySelector('#step-connect-informatica input[type="checkbox"]').checked = true;
        updateSubstep('connect-informatica', 'configured', true);
    }, 1500);
}

function handleEntitySelection() {
    const checkboxes = document.querySelectorAll('#businessEntityList input[type="checkbox"]');
    const selectedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const notification = document.getElementById('multipleEntityNotification');
    const completeCheckbox = document.getElementById('entity-selection-complete');

    if (selectedCount > 1) {
        notification.innerHTML = '<div class="notification info">Multiple entities selected. Relationships between entities will also be included.</div>';
    } else {
        notification.innerHTML = '';
    }

    if (selectedCount > 0) {
        completeCheckbox.checked = true;
        updateSubstep('choose-business-entity', 'selected', true);
    } else {
        completeCheckbox.checked = false;
        updateSubstep('choose-business-entity', 'selected', false);
    }
}

function handleResolutionTypeChange() {
    const directMapping = document.getElementById('direct-mapping').checked;
    const goldenKeyring = document.getElementById('golden-keyring').checked;
    const completeCheckbox = document.getElementById('resolution-type-complete');

    if (directMapping || goldenKeyring) {
        completeCheckbox.checked = true;
        updateSubstep('choose-identity-resolution', 'selected', true);
    }
}

function selectResolutionType(typeId) {
    document.getElementById(typeId).checked = true;
    handleResolutionTypeChange();

    document.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
}

function handleMatchRuleSelection() {
    const checkboxes = document.querySelectorAll('#matchRulesList input[type="checkbox"]');
    const selectedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const completeCheckbox = document.getElementById('match-rules-complete');

    if (selectedCount > 0) {
        completeCheckbox.checked = true;
        updateSubstep('setup-identity-rules', 'configured', true);
    } else {
        completeCheckbox.checked = false;
        updateSubstep('setup-identity-rules', 'configured', false);
    }
}

function toggleIdentityRules() {
    const toggle = document.getElementById('identityRulesToggle');
    toggle.classList.toggle('active');

    if (toggle.classList.contains('active')) {
        updateSubstep('validate-identity-data', 'toggle-enabled', true);
    }
}

function showRedirectNotification() {
    alert('This would redirect to the configuration page in the actual application.');
}
