// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepStates: {
        'integrate-business-entities-df': {},
        'integrate-business-entities-262': {}
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAppPicker();
    initializeTiles();
    initializeSolutionPages();

    // Show default home page
    showPage('home');
});

// ===== NAVIGATION FUNCTIONS =====
function initializeNavigation() {
    // Top navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);

            // Update active state
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Left navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);

            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Deactivate top nav tabs
            navTabs.forEach(t => t.classList.remove('active'));
        });
    });

    // Left navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const leftNav = document.getElementById('left-navigation');

    navToggle.addEventListener('click', function() {
        leftNav.classList.toggle('collapsed');
        leftNav.classList.toggle('expanded');
        appState.leftNavExpanded = !appState.leftNavExpanded;
    });
}

function showPage(pageId) {
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPage = pageId;
    }
}

// ===== APP PICKER FUNCTIONS =====
function initializeAppPicker() {
    const appPickerBtn = document.getElementById('app-picker-icon');
    const appDropdown = document.getElementById('app-dropdown');
    const appLabel = document.getElementById('app-label');

    appPickerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        appDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!appDropdown.contains(e.target) && e.target !== appPickerBtn) {
            appDropdown.classList.add('hidden');
        }
    });

    // App selection
    const appItems = document.querySelectorAll('.app-item');
    appItems.forEach(item => {
        item.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');

            // Update label
            appLabel.textContent = appName;

            // Update active state
            appItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Close dropdown
            appDropdown.classList.add('hidden');

            appState.currentApp = appName;
        });
    });
}

// ===== TILES FUNCTIONS =====
function initializeTiles() {
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const tileType = this.getAttribute('data-tile');

            if (tileType === 'integrate-business-entities') {
                // Show DF version by default
                showPage('integrate-business-entities-df');
            } else if (tileType === 'customer-households') {
                showPage('customer-households');
            }
        });
    });
}

// ===== SOLUTION PAGES INITIALIZATION =====
function initializeSolutionPages() {
    createIntegrateBusinessEntitiesDFPage();
    createIntegrateBusinessEntities262Page();
}

// ===== CREATE DF VERSION PAGE =====
function createIntegrateBusinessEntitiesDFPage() {
    const pageContainer = document.getElementById('integrate-business-entities-df-page');

    const steps = [
        {
            id: 'connect-informatica',
            title: 'Connect to Informatica System',
            headline: 'Establish trusted connection between D360 and Informatica tenants',
            subStepsTotal: 1
        },
        {
            id: 'choose-business-entity',
            title: 'Choose Business Entity',
            headline: 'Select Business from the connected tenant to integrate into Data 360',
            subStepsTotal: 2
        },
        {
            id: 'choose-identity-resolution',
            title: 'Choose Identity Resolution Type',
            headline: 'Choose between Direct Mapping or Golden Key-Ring modes',
            subStepsTotal: 1
        },
        {
            id: 'review-mappings',
            title: 'Review Mappings',
            headline: 'Review data objects and field mappings from Informatica',
            subStepsTotal: 2
        },
        {
            id: 'validate-connected-data',
            title: 'Validate Connected Data',
            headline: 'Preview and validate the integrated business entities',
            subStepsTotal: 3
        },
        {
            id: 'setup-identity-rules',
            title: 'Set up Identity Rules',
            headline: 'Configure match rules for identity resolution',
            subStepsTotal: 2
        },
        {
            id: 'validate-identity-data',
            title: 'Validate Identity Data',
            headline: 'Review identity resolution results',
            subStepsTotal: 5
        },
        {
            id: 'enable-sync-informatica',
            title: 'Enable sync to Informatica',
            headline: 'Configure synchronization with Informatica',
            subStepsTotal: 1
        },
        {
            id: 'setup-experiences',
            title: 'Setup Experiences',
            headline: 'Configure user experiences for business entities',
            subStepsTotal: 3
        }
    ];

    const content = createSolutionPageContent(
        'Integrate Business Entities from Informatica in Data 360',
        'Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360',
        steps,
        'df'
    );

    pageContainer.innerHTML = content;

    // Initialize step interactions
    initializeStepInteractions('df', steps);

    // Create specific step content
    createDFStepContent();
}

// ===== CREATE 262 VERSION PAGE =====
function createIntegrateBusinessEntities262Page() {
    const pageContainer = document.getElementById('integrate-business-entities-262-page');

    const steps = [
        {
            id: 'create-ingestion-endpoint',
            title: 'Create Ingestion End-Point',
            headline: 'Setup Ingestion-API end-point from D360-Setup',
            subStepsTotal: 1
        },
        {
            id: 'create-schema',
            title: 'Create Schema on D360-End-Point',
            headline: 'Register the business entities with predefined schema',
            subStepsTotal: 1
        },
        {
            id: 'create-business-entity-mapping',
            title: 'Create Business Entity to Normalized-Lake',
            headline: 'Install extensibility packages from Informatica',
            subStepsTotal: 1
        },
        {
            id: 'publish-day0',
            title: 'Publish Day0',
            headline: 'Publish initial data load from Informatica to D360',
            subStepsTotal: 1
        },
        {
            id: 'publish-day1',
            title: 'Publish Day1',
            headline: 'Enable change data capture feed',
            subStepsTotal: 1
        },
        {
            id: 'bring-your-own-mdm',
            title: 'Bring Your Own MDM (MDS/IR)',
            headline: 'Populate data mastered in external MDM to Unified Profile',
            subStepsTotal: 1
        },
        {
            id: 'data-360-mdm-datakit',
            title: 'Data-360-MDM Datakit',
            headline: 'Install mappings and BYO-MDM definitions',
            subStepsTotal: 1
        },
        {
            id: 'search-before-create',
            title: 'Search Before Create',
            headline: 'Install existing Informatica component',
            subStepsTotal: 1
        },
        {
            id: 'crm-enrichment',
            title: 'CRM Enrichment',
            headline: 'Configure Profile Component and Field Enrichment',
            subStepsTotal: 1
        }
    ];

    const content = createSolutionPageContent(
        'Integrate Business Entities from Informatica in Data 360',
        'Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360',
        steps,
        '262'
    );

    pageContainer.innerHTML = content;

    // Initialize step interactions
    initializeStepInteractions('262', steps);

    // Create specific step content
    create262StepContent();
}

// ===== CREATE SOLUTION PAGE CONTENT =====
function createSolutionPageContent(title, description, steps, version) {
    return `
        <div class="solution-page-content">
            <div class="header-instructions">
                <h1 class="header-instructions-title">${title}</h1>
                <p class="header-instructions-description">${description}</p>
            </div>

            <div class="step-summary" id="step-summary-${version}">
                <div class="step-summary-header">
                    <h2 class="step-summary-title">Steps Overview</h2>
                    <button class="step-summary-toggle" onclick="toggleStepSummary('${version}')">▼</button>
                </div>
                <div class="step-summary-content">
                    <div class="step-list">
                        ${steps.map((step, index) => `
                            <div class="step-item" data-step-id="${step.id}" onclick="scrollToStep('${version}', '${step.id}')">
                                <span class="step-status-icon" id="status-${version}-${step.id}">⭕</span>
                                <span class="step-item-label">${index + 1}. ${step.title}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="video-placeholder">
                        <div>
                            <p>Video Tutorial Placeholder</p>
                            <p style="margin-top: 0.5rem; font-size: 0.85rem;">
                                <a href="#" class="footer-link">View Documentation</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="step-details-container" id="steps-${version}">
                ${steps.map((step, index) => createStepDetailPanel(step, index, version, steps.length)).join('')}
            </div>
        </div>
    `;
}

// ===== CREATE STEP DETAIL PANEL =====
function createStepDetailPanel(step, index, version, totalSteps) {
    const isLast = index === totalSteps - 1;

    return `
        <div class="step-details-panel collapsed" id="panel-${version}-${step.id}" data-step-id="${step.id}">
            <div class="step-details-header" onclick="toggleStepPanel('${version}', '${step.id}')">
                <h3 class="step-details-title">${index + 1}. ${step.title}</h3>
                <p class="step-details-headline">${step.headline}</p>
                <p class="sub-steps-summary" id="summary-${version}-${step.id}">
                    <span id="completed-${version}-${step.id}">0</span> out of ${step.subStepsTotal}
                </p>
            </div>

            <div class="step-details-main">
                <div class="step-details-left" id="content-${version}-${step.id}">
                    <!-- Content will be populated by specific functions -->
                </div>
                <div class="step-details-right" id="actions-${version}-${step.id}">
                    <!-- Actions will be populated by specific functions -->
                </div>
            </div>

            <div class="step-details-footer">
                <div class="footer-links">
                    <a href="#" class="footer-link">View Documentation</a>
                    <a href="#" class="footer-link">Check out Tutorial</a>
                </div>
                ${!isLast ? `<button class="action-button" onclick="goToNextStep('${version}', ${index})">Next Step</button>` : ''}
            </div>
        </div>
    `;
}

// ===== STEP INTERACTION FUNCTIONS =====
function initializeStepInteractions(version, steps) {
    // Initialize step states
    steps.forEach(step => {
        if (!appState.stepStates[`integrate-business-entities-${version}`][step.id]) {
            appState.stepStates[`integrate-business-entities-${version}`][step.id] = {
                completed: 0,
                total: step.subStepsTotal,
                status: 'not-started'
            };
        }
    });
}

function toggleStepSummary(version) {
    const summary = document.getElementById(`step-summary-${version}`);
    summary.classList.toggle('collapsed');
}

function toggleStepPanel(version, stepId) {
    const panel = document.getElementById(`panel-${version}-${stepId}`);
    panel.classList.toggle('collapsed');
}

function scrollToStep(version, stepId) {
    const panel = document.getElementById(`panel-${version}-${stepId}`);
    if (panel) {
        panel.classList.remove('collapsed');
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function goToNextStep(version, currentIndex) {
    const container = document.getElementById(`steps-${version}`);
    const panels = container.querySelectorAll('.step-details-panel');

    if (currentIndex < panels.length - 1) {
        const nextPanel = panels[currentIndex + 1];
        nextPanel.classList.remove('collapsed');
        nextPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateStepProgress(version, stepId) {
    const stepState = appState.stepStates[`integrate-business-entities-${version}`][stepId];
    const completedSpan = document.getElementById(`completed-${version}-${stepId}`);

    if (completedSpan) {
        completedSpan.textContent = stepState.completed;
    }

    // Update status icon
    const statusIcon = document.getElementById(`status-${version}-${stepId}`);
    if (statusIcon) {
        if (stepState.completed === 0) {
            statusIcon.textContent = '⭕';
            stepState.status = 'not-started';
        } else if (stepState.completed < stepState.total) {
            statusIcon.textContent = '🔄';
            stepState.status = 'in-progress';
        } else {
            statusIcon.textContent = '✅';
            stepState.status = 'completed';
        }
    }
}

function handleSubStepChange(version, stepId, checkbox) {
    const stepState = appState.stepStates[`integrate-business-entities-${version}`][stepId];

    if (checkbox.checked) {
        stepState.completed++;
    } else {
        stepState.completed--;
    }

    updateStepProgress(version, stepId);
}

// ===== DF STEP CONTENT CREATION =====
function createDFStepContent() {
    const version = 'df';

    // Step 1: Connect to Informatica System
    document.getElementById(`content-${version}-connect-informatica`).innerHTML = `
        <p class="step-description">Configure details for the Informatica tenant, so that a trusted connection between them can be provided. The important items are "User-Name" and "Password".</p>

        <div class="form-columns">
            <div>
                <h4 style="margin-bottom: 1rem; font-size: 0.95rem;">Existing Connection</h4>
                <div class="form-group">
                    <label class="form-label">Connection Name</label>
                    <select class="form-select" id="existing-connection-${version}">
                        <option value="">Select existing connection...</option>
                        <option value="conn1">Informatica Production</option>
                        <option value="conn2">Informatica Staging</option>
                    </select>
                </div>
            </div>
            <div>
                <h4 style="margin-bottom: 1rem; font-size: 0.95rem;">New Connection</h4>
                <div class="form-group">
                    <label class="form-label">Connection Name</label>
                    <input type="text" class="form-input" id="new-conn-name-${version}" placeholder="Enter connection name" />
                </div>
                <div class="form-group">
                    <label class="form-label">Tenant URL</label>
                    <input type="text" class="form-input" id="tenant-url-${version}" placeholder="https://..." />
                </div>
                <div class="form-group">
                    <label class="form-label">User Name</label>
                    <input type="text" class="form-input" id="username-${version}" placeholder="Enter username" />
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-input" id="password-${version}" placeholder="Enter password" />
                </div>
            </div>
        </div>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'connect-informatica', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Connection configured and validated</div>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-connect-informatica`).innerHTML = `
        <button class="action-button" onclick="validateConnection('${version}')">Validate Connection</button>
        <div id="validation-result-${version}" style="margin-top: 1rem;"></div>
    `;

    // Step 2: Choose Business Entity
    document.getElementById(`content-${version}-choose-business-entity`).innerHTML = `
        <p class="step-description">Select Business from the connected tenant to integrate into Data 360.</p>

        <div class="form-group">
            <label class="form-label">Select Tenant</label>
            <select class="form-select" id="tenant-select-${version}">
                <option value="">Select tenant...</option>
                <option value="usa1">USA-1</option>
                <option value="usa2">USA-2</option>
                <option value="europe1">Europe-1</option>
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">Select Business Entities (Multiple)</label>
            <div class="checkbox-group">
                <div class="checkbox-item">
                    <input type="checkbox" id="entity-customer-${version}" onchange="handleEntitySelection('${version}')" />
                    <label for="entity-customer-${version}">Customer</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="entity-organization-${version}" onchange="handleEntitySelection('${version}')" />
                    <label for="entity-organization-${version}">Organization</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="entity-product-${version}" onchange="handleEntitySelection('${version}')" />
                    <label for="entity-product-${version}">Product</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="entity-supplier-${version}" onchange="handleEntitySelection('${version}')" />
                    <label for="entity-supplier-${version}">Supplier</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="entity-contact-${version}" onchange="handleEntitySelection('${version}')" />
                    <label for="entity-contact-${version}">Contact</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="entity-account-${version}" onchange="handleEntitySelection('${version}')" />
                    <label for="entity-account-${version}">Account</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="entity-asset-${version}" onchange="handleEntitySelection('${version}')" />
                    <label for="entity-asset-${version}">Asset</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="entity-location-${version}" onchange="handleEntitySelection('${version}')" />
                    <label for="entity-location-${version}">Location</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="entity-employee-${version}" onchange="handleEntitySelection('${version}')" />
                    <label for="entity-employee-${version}">Employee</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="entity-partner-${version}" onchange="handleEntitySelection('${version}')" />
                    <label for="entity-partner-${version}">Partner</label>
                </div>
            </div>
        </div>

        <div class="notification info hidden" id="entity-notification-${version}">
            When multiple entities are selected, the relationships between the entities will also be included.
        </div>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" id="tenant-selected-${version}" onchange="handleSubStepChange('${version}', 'choose-business-entity', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Tenant selected</div>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" id="entity-selected-${version}" onchange="handleSubStepChange('${version}', 'choose-business-entity', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">At least one business entity selected</div>
            </div>
        </div>
    `;

    // Step 3: Choose Identity Resolution Type
    document.getElementById(`content-${version}-choose-identity-resolution`).innerHTML = `
        <p class="step-description">Choose between "Business Entity as Unified Profile (Direct Mapping)" (Informatica compute only) OR "Golden Key-Ring" (D360 is MDM Aware).</p>

        <div class="radio-group">
            <div class="radio-item" id="radio-direct-${version}" onclick="selectRadio('${version}', 'direct')">
                <div class="radio-header">
                    <input type="radio" name="identity-type-${version}" id="identity-direct-${version}" onchange="handleIdentityTypeChange('${version}', this)" />
                    <label class="radio-label" for="identity-direct-${version}">Business Entity as Unified Profile (Direct Mapping)</label>
                </div>
                <p class="radio-description">In this mode the Business Entity completely replaces the Unified Profile by taking its place. Customers must ensure that all profile data is being sent to Informatica as well. It will only appear after it has been processed through Informatica.</p>
            </div>

            <div class="radio-item" id="radio-keyring-${version}" onclick="selectRadio('${version}', 'keyring')">
                <div class="radio-header">
                    <input type="radio" name="identity-type-${version}" id="identity-keyring-${version}" onchange="handleIdentityTypeChange('${version}', this)" />
                    <label class="radio-label" for="identity-keyring-${version}">Golden Key-Ring</label>
                </div>
                <p class="radio-description">The Business Entity is the primary and most trusted record on the Key-Ring. The Unified Profile is a superset of profile data in D360 and Informatica. Enables the Business Entity into the Real Time ecosystem for personalization.</p>
            </div>
        </div>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" id="identity-type-selected-${version}" onchange="handleSubStepChange('${version}', 'choose-identity-resolution', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Identity resolution type selected</div>
            </div>
        </div>
    `;

    // Step 4: Review Mappings
    document.getElementById(`content-${version}-review-mappings`).innerHTML = `
        <p class="step-description">Based on selected business entities these are the data objects identified from informatica that are being synced to Data 360.</p>

        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Table Name</th>
                        <th>Business Entity</th>
                        <th>Record Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>customer_master</td>
                        <td>Customer</td>
                        <td>125,430</td>
                        <td><button class="preview-button" onclick="showNotification('Redirecting to mapping details...')">Review Mappings & Create Fields</button></td>
                    </tr>
                    <tr>
                        <td>customer_address</td>
                        <td>Customer</td>
                        <td>98,230</td>
                        <td><button class="preview-button" onclick="showNotification('Redirecting to mapping details...')">Review Mappings & Create Fields</button></td>
                    </tr>
                    <tr>
                        <td>customer_contact</td>
                        <td>Customer</td>
                        <td>145,678</td>
                        <td><button class="preview-button" onclick="showNotification('Redirecting to mapping details...')">Review Mappings & Create Fields</button></td>
                    </tr>
                    <tr>
                        <td>organization_master</td>
                        <td>Organization</td>
                        <td>23,456</td>
                        <td><button class="preview-button" onclick="showNotification('Redirecting to mapping details...')">Review Mappings & Create Fields</button></td>
                    </tr>
                    <tr>
                        <td>product_catalog</td>
                        <td>Product</td>
                        <td>67,890</td>
                        <td><button class="preview-button" onclick="showNotification('Redirecting to mapping details...')">Review Mappings & Create Fields</button></td>
                    </tr>
                    <tr>
                        <td>product_pricing</td>
                        <td>Product</td>
                        <td>67,890</td>
                        <td><button class="preview-button" onclick="showNotification('Redirecting to mapping details...')">Review Mappings & Create Fields</button></td>
                    </tr>
                    <tr>
                        <td>supplier_master</td>
                        <td>Supplier</td>
                        <td>5,432</td>
                        <td><button class="preview-button" onclick="showNotification('Redirecting to mapping details...')">Review Mappings & Create Fields</button></td>
                    </tr>
                    <tr>
                        <td>customer_preferences</td>
                        <td>Customer</td>
                        <td>89,234</td>
                        <td><button class="preview-button" onclick="showNotification('Redirecting to mapping details...')">Review Mappings & Create Fields</button></td>
                    </tr>
                    <tr>
                        <td>customer_transaction</td>
                        <td>Customer</td>
                        <td>456,789</td>
                        <td><button class="preview-button" onclick="showNotification('Redirecting to mapping details...')">Review Mappings & Create Fields</button></td>
                    </tr>
                    <tr>
                        <td>organization_hierarchy</td>
                        <td>Organization</td>
                        <td>12,345</td>
                        <td><button class="preview-button" onclick="showNotification('Redirecting to mapping details...')">Review Mappings & Create Fields</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="notification" style="margin-top: 1.5rem;">
            We've detected extra fields beyond the standard. Below is the proposed list of modification to Salesforce's DMO to add placeholders for these values.
        </div>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'review-mappings', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Reviewed data objects and tables</div>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'review-mappings', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Mappings and schema reviewed</div>
            </div>
        </div>
    `;

    // Step 5: Validate Connected Data
    document.getElementById(`content-${version}-validate-connected-data`).innerHTML = `
        <p class="step-description">By now we've integrated, mapped and transformed the Business Entities to the Standard Data Model, the following previews are based on sample data to help validate correctness of mapping and field value population.</p>

        <div class="preview-list">
            <div class="preview-item">
                <span class="preview-label">View Individuals and Contact Points by Data Source</span>
                <button class="preview-button" onclick="showNotification('Redirecting to preview page...')">Preview</button>
            </div>
            <div class="preview-item">
                <span class="preview-label">View Sample of Individuals and Contact Points</span>
                <button class="preview-button" onclick="showNotification('Redirecting to preview page...')">Preview</button>
            </div>
            <div class="preview-item">
                <span class="preview-label">View Sample of Emails, Phones or Address</span>
                <button class="preview-button" onclick="showNotification('Redirecting to preview page...')">Preview</button>
            </div>
        </div>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'validate-connected-data', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Previewed Individuals and Contact Points by Data Source</div>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'validate-connected-data', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Previewed Sample of Individuals and Contact Points</div>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'validate-connected-data', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Previewed Sample of Emails, Phones or Address</div>
            </div>
        </div>
    `;

    // Step 6: Set up Identity Rules
    document.getElementById(`content-${version}-setup-identity-rules`).innerHTML = `
        <p class="step-description">In this section we are going to configure the rules that govern how to link new profile data to existing business entities or form independent key-rings to be shared with Informatica-MDM. Integrity and precedence of the Business Entities IDs is always preserved.</p>

        <p style="margin-top: 1rem; margin-bottom: 0.75rem; font-weight: 600; font-size: 0.9rem;">Based on the available mappings and data in Party Identifier and Identity Match we recommend to include the following match rules:</p>

        <div class="checkbox-group match-rules-list">
            <div class="checkbox-item">
                <input type="checkbox" id="rule-fuzzy-email-${version}" onchange="handleMatchRuleChange('${version}')" />
                <label for="rule-fuzzy-email-${version}">Fuzzy Name and Normalized Email</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="rule-fuzzy-phone-${version}" onchange="handleMatchRuleChange('${version}')" />
                <label for="rule-fuzzy-phone-${version}">Fuzzy Name and Normalized Phone</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="rule-fuzzy-address-${version}" onchange="handleMatchRuleChange('${version}')" />
                <label for="rule-fuzzy-address-${version}">Fuzzy Name and Normalized Address</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="rule-party-mc-${version}" onchange="handleMatchRuleChange('${version}')" />
                <label for="rule-party-mc-${version}">Party Identifier: MC Subscriber Key</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="rule-party-3rd-${version}" onchange="handleMatchRuleChange('${version}')" />
                <label for="rule-party-3rd-${version}">Party Identifier: 3rd Party Enrichment Ids</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="rule-lead-contact-${version}" onchange="handleMatchRuleChange('${version}')" />
                <label for="rule-lead-contact-${version}">Identity Match: Lead to Contact</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="rule-mdm-connection-${version}" onchange="handleMatchRuleChange('${version}')" />
                <label for="rule-mdm-connection-${version}">Identity Match: MDM Connection</label>
            </div>
        </div>

        <p style="margin-top: 1.5rem; font-size: 0.9rem; color: #706e6b;">To modify the suggested match rules or include additional rules in the Identity Ruleset configuration:</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'setup-identity-rules', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Reviewed and selected recommended match rules</div>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'setup-identity-rules', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Identity Ruleset configured</div>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-setup-identity-rules`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to Identity Ruleset configuration...')">Configure</button>
    `;

    // Step 7: Validate Identity Data
    document.getElementById(`content-${version}-validate-identity-data`).innerHTML = `
        <p class="step-description">After Identity Resolution has finished processing use the following sample data preview to inspect the data.</p>

        <div class="preview-list">
            <div class="preview-item">
                <span class="preview-label">Preview Sample Profile Data</span>
                <button class="preview-button" onclick="showNotification('Redirecting to preview page...')">Preview</button>
            </div>
            <div class="preview-item">
                <span class="preview-label">Explore the outliers</span>
                <button class="preview-button" onclick="showNotification('Redirecting to outliers analysis...')">Preview</button>
            </div>
            <div class="preview-item">
                <span class="preview-label">Preview Identity Process Summary</span>
                <button class="preview-button" onclick="showNotification('Showing: Total Source Profiles, Total Unified Profiles, Consolidation Rate')">Preview</button>
            </div>
            <div class="preview-item">
                <span class="preview-label">Preview Consolidation Rate by Data Source</span>
                <button class="preview-button" onclick="showNotification('Redirecting to consolidation rate analysis...')">Preview</button>
            </div>
        </div>

        <div class="toggle-container" style="margin-top: 1.5rem;">
            <label class="toggle-switch">
                <input type="checkbox" id="identity-schedule-${version}" onchange="handleIdentityScheduleToggle('${version}', this)" />
                <span class="toggle-slider"></span>
            </label>
            <span class="toggle-label">Enable Identity Rules Schedule</span>
        </div>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'validate-identity-data', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Previewed Sample Profile Data</div>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'validate-identity-data', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Explored outliers</div>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'validate-identity-data', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Reviewed Identity Process Summary</div>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'validate-identity-data', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Reviewed Consolidation Rate by Data Source</div>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" id="schedule-configured-${version}" onchange="handleSubStepChange('${version}', 'validate-identity-data', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Identity Rules Schedule configured</div>
            </div>
        </div>
    `;

    // Step 8: Enable sync to Informatica
    document.getElementById(`content-${version}-enable-sync-informatica`).innerHTML = `
        <p class="step-description">Enable sync to Informatica for Key-Rings that do not contain a business entity. Share the source records for enrichment and quality assurance.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'enable-sync-informatica', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">D360 Setup configured in Informatica</div>
                <p class="sub-step-details">Configure the synchronization settings to enable data flow from D360 to Informatica for enrichment.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-enable-sync-informatica`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to D360 Setup in Informatica...')">Configure D360 Setup</button>
    `;

    // Step 9: Setup Experiences
    document.getElementById(`content-${version}-setup-experiences`).innerHTML = `
        <p class="step-description">Configure user experiences to leverage the integrated business entities.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'setup-experiences', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Search Before Create</div>
                <p class="sub-step-details">Prevent duplicate records from being created by searching for existing records before creating new ones.</p>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'setup-experiences', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Copy field</div>
                <p class="sub-step-details">Enrich operational records with enterprise attributes from business entities.</p>
            </div>
        </div>

        <div class="sub-step-item">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'setup-experiences', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Related List</div>
                <p class="sub-step-details">Showcase any information related to the primary entity in a related list component.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-setup-experiences`).innerHTML = `
        <button class="action-button secondary" onclick="window.open('https://trailhead.salesforce.com', '_blank')">View Trailhead for Setup</button>
    `;
}

// ===== 262 STEP CONTENT CREATION =====
function create262StepContent() {
    const version = '262';

    // Step 1: Create Ingestion End-Point
    document.getElementById(`content-${version}-create-ingestion-endpoint`).innerHTML = `
        <p class="step-description">Setup Ingestion-API end-point from D360-Setup to be able to receive the data. Note - Optionally customer can add additional fields on the Ingestion-API-Schema via D360-Setup after schema is registered.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'create-ingestion-endpoint', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Ingestion-API end-point created</div>
                <p class="sub-step-details">Navigate to D360-Setup and configure the Ingestion-API end-point for receiving business entity data.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-create-ingestion-endpoint`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to D360-Setup page...')">Navigate to D360-Setup</button>
    `;

    // Step 2: Create Schema
    document.getElementById(`content-${version}-create-schema`).innerHTML = `
        <p class="step-description">Register the business entities with predefined schema against the Ingestion end-point.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'create-schema', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Schema registered on Ingestion-API</div>
                <p class="sub-step-details">Register the business entity schemas to define the structure of incoming data.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-create-schema`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to Ingestion-API-Schema page...')">Navigate to Ingestion-API-Schema</button>
    `;

    // Step 3: Create Business Entity Mapping
    document.getElementById(`content-${version}-create-business-entity-mapping`).innerHTML = `
        <p class="step-description">Install the extensibility packages from Informatica to help publish the business entity.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'create-business-entity-mapping', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Extensibility packages installed</div>
                <p class="sub-step-details">Install the required extensibility packages from Informatica for business entity publishing.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-create-business-entity-mapping`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to Informatica Extensibility Packages page...')">Navigate to Informatica Packages</button>
    `;

    // Step 4: Publish Day0
    document.getElementById(`content-${version}-publish-day0`).innerHTML = `
        <p class="step-description">Publish initial data load from Informatica to D360. Maintenance - Maintain schema sync if changed from D360.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'publish-day0', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Initial data load published</div>
                <p class="sub-step-details">Execute the Day0 data load process to publish the initial set of business entities from Informatica to D360.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-publish-day0`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to Informatica Publishing page...')">Navigate to Publishing</button>
    `;

    // Step 5: Publish Day1
    document.getElementById(`content-${version}-publish-day1`).innerHTML = `
        <p class="step-description">Change data capture feed is enabled and only changes to D360 are sent.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'publish-day1', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">CDC feed enabled</div>
                <p class="sub-step-details">Enable the Change Data Capture feed to continuously sync changes from Informatica to D360.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-publish-day1`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to CDC Configuration page...')">Navigate to CDC Config</button>
    `;

    // Step 6: Bring Your Own MDM
    document.getElementById(`content-${version}-bring-your-own-mdm`).innerHTML = `
        <p class="step-description">Ability for Customers to populate data mastered in external MDM to Unified Profile.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'bring-your-own-mdm', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">External MDM data configured</div>
                <p class="sub-step-details">Configure the integration to populate data from external MDM systems into the Unified Profile.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-bring-your-own-mdm`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to Unified Profile configuration...')">Navigate to Unified Profile</button>
    `;

    // Step 7: Data-360-MDM Datakit
    document.getElementById(`content-${version}-data-360-mdm-datakit`).innerHTML = `
        <p class="step-description">Customer installs mappings and BYO-MDM definitions from MDM-Datakit.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'data-360-mdm-datakit', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">MDM-Datakit installed</div>
                <p class="sub-step-details">Install the MDM-Datakit package containing pre-configured mappings and BYO-MDM definitions.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-data-360-mdm-datakit`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to MDM-Datakit page...')">Navigate to MDM-Datakit</button>
    `;

    // Step 8: Search Before Create
    document.getElementById(`content-${version}-search-before-create`).innerHTML = `
        <p class="step-description">Customer install existing Informatica component to enable search before create functionality.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'search-before-create', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">Informatica component installed</div>
                <p class="sub-step-details">Install the Informatica component that enables search before create functionality to prevent duplicates.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-search-before-create`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to Informatica Component page...')">Navigate to Components</button>
    `;

    // Step 9: CRM Enrichment
    document.getElementById(`content-${version}-crm-enrichment`).innerHTML = `
        <p class="step-description">Profile Component, Field Enrichment, Related Lists are now available for configuration.</p>

        <div class="sub-step-item" style="margin-top: 1.5rem;">
            <input type="checkbox" class="sub-step-checkbox" onchange="handleSubStepChange('${version}', 'crm-enrichment', this)" />
            <div class="sub-step-content">
                <div class="sub-step-label">CRM enrichment features configured</div>
                <p class="sub-step-details">Configure Profile Components, Field Enrichment, and Related Lists for CRM integration.</p>
            </div>
        </div>
    `;

    document.getElementById(`actions-${version}-crm-enrichment`).innerHTML = `
        <button class="action-button" onclick="showNotification('Redirecting to CRM Configuration page...')">Navigate to CRM Config</button>
    `;
}

// ===== UTILITY FUNCTIONS =====
function validateConnection(version) {
    const resultDiv = document.getElementById(`validation-result-${version}`);
    resultDiv.innerHTML = '<span class="validation-spinner"></span> Validating connection...';

    setTimeout(() => {
        resultDiv.innerHTML = '<div class="validation-result success">✓ Connection validated successfully!</div>';
    }, 2000);
}

function handleEntitySelection(version) {
    const checkboxes = document.querySelectorAll(`[id^="entity-"][id$="-${version}"]`);
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

    const notification = document.getElementById(`entity-notification-${version}`);
    if (checkedCount > 1) {
        notification.classList.remove('hidden');
    } else {
        notification.classList.add('hidden');
    }

    // Auto-check the entity selected substep
    const entitySelectedCheckbox = document.getElementById(`entity-selected-${version}`);
    if (checkedCount > 0 && entitySelectedCheckbox && !entitySelectedCheckbox.checked) {
        entitySelectedCheckbox.checked = true;
        handleSubStepChange(version, 'choose-business-entity', entitySelectedCheckbox);
    }
}

function selectRadio(version, type) {
    const directRadio = document.getElementById(`radio-direct-${version}`);
    const keyringRadio = document.getElementById(`radio-keyring-${version}`);
    const directInput = document.getElementById(`identity-direct-${version}`);
    const keyringInput = document.getElementById(`identity-keyring-${version}`);

    directRadio.classList.remove('selected');
    keyringRadio.classList.remove('selected');

    if (type === 'direct') {
        directRadio.classList.add('selected');
        directInput.checked = true;
    } else {
        keyringRadio.classList.add('selected');
        keyringInput.checked = true;
    }

    // Auto-check the substep
    const checkbox = document.getElementById(`identity-type-selected-${version}`);
    if (checkbox && !checkbox.checked) {
        checkbox.checked = true;
        handleSubStepChange(version, 'choose-identity-resolution', checkbox);
    }
}

function handleIdentityTypeChange(version, radio) {
    if (radio.checked) {
        const checkbox = document.getElementById(`identity-type-selected-${version}`);
        if (checkbox && !checkbox.checked) {
            checkbox.checked = true;
            handleSubStepChange(version, 'choose-identity-resolution', checkbox);
        }
    }
}

function handleMatchRuleChange(version) {
    const checkboxes = document.querySelectorAll(`[id^="rule-"][id$="-${version}"]`);
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

    // If at least one rule is selected, consider the first substep complete
    const firstSubStep = document.querySelector(`#content-${version}-setup-identity-rules .sub-step-item:first-of-type input[type="checkbox"]`);
    if (checkedCount > 0 && firstSubStep && !firstSubStep.checked) {
        firstSubStep.checked = true;
        handleSubStepChange(version, 'setup-identity-rules', firstSubStep);
    }
}

function handleIdentityScheduleToggle(version, toggle) {
    const checkbox = document.getElementById(`schedule-configured-${version}`);
    if (toggle.checked && checkbox && !checkbox.checked) {
        checkbox.checked = true;
        handleSubStepChange(version, 'validate-identity-data', checkbox);
    } else if (!toggle.checked && checkbox && checkbox.checked) {
        checkbox.checked = false;
        handleSubStepChange(version, 'validate-identity-data', checkbox);
    }
}

function showNotification(message) {
    alert(message);
}
