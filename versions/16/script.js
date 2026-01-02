// Application State
const appState = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavCollapsed: false,
    stepSummaryCollapsed: false,
    steps: {
        'integrate-business-entities': {
            completed: [false, false, false, false, false, false, false],
            substeps: [
                [false], // Step 1: Connect to Informatica
                [false], // Step 2: Choose Business Entity
                [false], // Step 3: Review and Extend Mappings
                [false], // Step 4: Validate Connected data
                [false], // Step 5: Set up Identity Rules
                [false], // Step 6: Validate Identity Data
                [false, false, false] // Step 7: Setup Experiences (3 substeps)
            ]
        }
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeLeftNavigation();
    initializeAppPicker();
    loadPage('home');
});

// Navigation Functions
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.getAttribute('data-page');
            setActiveTab(tab);
            loadPage(page);
        });
    });
}

function setActiveTab(activeTab) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    activeTab.classList.add('active');
}

function initializeLeftNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const leftNav = document.getElementById('left-navigation');
    
    navToggle.addEventListener('click', () => {
        leftNav.classList.toggle('collapsed');
        appState.leftNavCollapsed = !appState.leftNavCollapsed;
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            setActiveNavItem(item);
            loadPage(page);
        });
    });
}

function setActiveNavItem(activeItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

function initializeAppPicker() {
    const appOptions = document.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', () => {
            const appName = option.getAttribute('data-app');
            appState.currentApp = appName;
            document.getElementById('app-label').textContent = appName;
            
            appOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
}

// Page Loading Functions
function loadPage(pageName) {
    appState.currentPage = pageName;
    const mainPageArea = document.getElementById('main-page-area');
    
    switch(pageName) {
        case 'home':
            mainPageArea.innerHTML = generateHomePage();
            break;
        case 'solution-manager':
            mainPageArea.innerHTML = generateSolutionManagerPage();
            break;
        case 'integrate-business-entities':
            mainPageArea.innerHTML = generateIntegrateBusinessEntitiesPage();
            initializeStepDetails();
            break;
        default:
            mainPageArea.innerHTML = generateEmptyStatePage(pageName);
    }
    
    // Update active states
    updateActiveStates(pageName);
}

function updateActiveStates(pageName) {
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        if (tab.getAttribute('data-page') === pageName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update left nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-page') === pageName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Page Generators
function generateHomePage() {
    return `
        <div class="empty-state">
            <i class="fas fa-home"></i>
            <h2>Home</h2>
            <p>Welcome to Data 360</p>
        </div>
    `;
}

function generateSolutionManagerPage() {
    return `
        <div class="solution-manager-page">
            <h1 class="page-title">Solution Manager</h1>
            <div class="tile-list">
                <div class="tile" onclick="loadPage('integrate-business-entities')">
                    <div class="tile-title">Integrate Business Entities from Informatica in Data360</div>
                    <div class="tile-description">
                        Realize the full potential of the curated and enriched business entities from Informatica directly in D360. 
                        In this step by step guide, we will work though the steps required to operationalize business entities 
                        created in Informatica in D360.
                    </div>
                    <div class="tile-extended-description">
                        This solution template helps you integrate master data from Informatica into Salesforce Data 360, 
                        enabling seamless data flow and enrichment.
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateIntegrateBusinessEntitiesPage() {
    const steps = appState.steps['integrate-business-entities'];
    
    // Ensure we have the right number of steps
    if (steps.completed.length < 8) {
        steps.completed = steps.completed.concat(new Array(8 - steps.completed.length).fill(false));
    }
    if (steps.substeps.length < 8) {
        steps.substeps = steps.substeps.concat(new Array(8 - steps.substeps.length).fill([false]));
    }
    
    return `
        <div class="integrate-page">
            ${generateHeaderInstructions()}
            ${generateStepSummary(steps)}
            ${generateStepDetailsPanels(steps)}
        </div>
    `;
}

function generateHeaderInstructions() {
    return `
        <div class="header-instructions">
            <h1 class="header-instructions-title">Integrate Business Entities from Informatica in Data360</h1>
            <p class="header-instructions-description">
                Realize the full potential of the curated and enriched business entities from Informatica directly in D360. 
                In this step by step guide, we will work though the steps required to operationalize business entities 
                created in Informatica in D360.
            </p>
        </div>
    `;
}

function generateStepSummary(steps) {
    const stepLabels = [
        'Connect to Informatica System',
        'Choose Business Entity',
        'Review and Extend Mappings',
        'Validate Connected data and mappings',
        'Set up Identity Rules',
        'Validate Identity Data',
        'Enable sync to Informatica',
        'Setup Experiences'
    ];
    
    // Ensure steps array matches
    if (steps.completed.length < stepLabels.length) {
        steps.completed = steps.completed.concat(new Array(stepLabels.length - steps.completed.length).fill(false));
    }
    if (steps.substeps.length < stepLabels.length) {
        steps.substeps = steps.substeps.concat(new Array(stepLabels.length - steps.substeps.length).fill([false]));
    }
    
    let stepItemsHTML = stepLabels.map((label, index) => {
        const status = getStepStatus(index, steps);
        const statusIcon = getStatusIcon(status);
        return `
            <div class="step-item">
                <div class="step-status-icon ${status}">${statusIcon}</div>
                <div class="step-item-label">${label}</div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="step-summary" id="step-summary">
            <div class="step-summary-header">
                <h2 class="step-summary-title">Step Summary</h2>
                <div class="step-summary-toggle" onclick="toggleStepSummary()">
                    <i class="fas fa-chevron-up"></i>
                </div>
            </div>
            <div class="step-summary-content">
                <div class="step-list">
                    ${stepItemsHTML}
                </div>
                <div class="video-placeholder">
                    <i class="fas fa-video" style="font-size: 48px; color: #ccc;"></i>
                    <div style="margin-top: 10px;">Video Tutorial</div>
                </div>
            </div>
        </div>
    `;
}

function generateStepDetailsPanels(steps) {
    const stepDetails = [
        {
            title: 'Connect to Informatica System',
            headline: 'Establish trusted connection between D360 and Informatica tenants',
            description: 'Configure details for the Informatica tenant, so that a trusted connection between them can be provided. The important items are "User-Name" and "Password"',
            substeps: [
                { text: 'Configure details for the Informatica tenant, so that a trusted connection between them can be provided. The important items are "User-Name" and "Password"' }
            ],
            form: true,
            formFields: [
                { label: 'Connection Name', type: 'text', name: 'connectionName' },
                { label: 'Tenant URL', type: 'text', name: 'tenantUrl' },
                { label: 'User Name', type: 'text', name: 'userName' },
                { label: 'Password', type: 'password', name: 'password' }
            ],
            validationButton: true
        },
        {
            title: 'Choose Business Entity',
            headline: 'Select Business from the connected tenant to integrate into Data 360',
            description: 'Select the business entity you want to integrate',
            substeps: [
                { text: 'Select a business entity from the picker' }
            ],
            picker: true,
            pickerOptions: ['Customer', 'Organization', 'Product', 'Supplier']
        },
        {
            title: 'Review and Extend Mappings',
            headline: 'Review the data objects identified from Informatica',
            description: 'Based on selected business entities these are the data objects identified from informatica that are being synced to Data 360.',
            substeps: [
                { text: 'Review the proposed list of modifications to Salesforce\'s DMO' }
            ],
            reviewButton: true,
            notification: 'We\'ve detected extra fields beyond the standard. Below is the proposed list of modification to Salesforce\'s DMO to add placeholders for these values.',
            tableList: ['Customer_ID', 'Organization_Name', 'Product_Code', 'Supplier_Contact']
        },
        {
            title: 'Validate Connected data and mappings',
            headline: 'Validate correctness of mapping and field value population',
            description: 'By Now we\'ve integrated, mapped and transformed the Business Entities to the Standard Data Model, the following previews are based on sample data to help validate correctness of mapping and field value population.',
            substeps: [
                { text: 'Review the sample data preview' }
            ],
            dataPreview: true,
            previewData: [
                { field: 'Customer ID', value: 'CUST001', mapped: true },
                { field: 'Name', value: 'Acme Corp', mapped: true },
                { field: 'Email', value: 'contact@acme.com', mapped: true }
            ]
        },
        {
            title: 'Set up Identity Rules',
            headline: 'Review and optionally create new rules that help link operation records to your business entities',
            description: 'In this section we are going to review and optionally create new rules that help link operation records to your business entities.',
            substeps: [
                { text: 'Configure Match and Reconciliation Rules' },
                { text: 'Enable Identity Rules Schedule' }
            ],
            configureButton: true,
            scheduleCheckbox: true
        },
        {
            title: 'Validate Identity Data',
            headline: 'Inspect the data after Identity Resolution has finished processing',
            description: 'After Identity Resolution has finished processing use the following sample data preview to inspect the data.',
            substeps: [
                { text: 'Review the identity resolution results' }
            ],
            dataPreview: true,
            previewData: [
                { field: 'Resolved ID', value: 'RES001', status: 'Matched' },
                { field: 'Confidence', value: '95%', status: 'High' },
                { field: 'Source Records', value: '3', status: 'Linked' }
            ]
        },
        {
            title: 'Enable sync to Informatica',
            headline: 'Enable sync to Informatica for Key-Rings that do not contain a business entity',
            description: 'Enable sync to Informatica for Key-Rings that do not contain a business entity. Share the source records for enrichment and quality assurance.',
            substeps: [
                { text: 'Configure D360 Setup in Informatica' }
            ],
            configureButton: true,
            manualCheckbox: true
        },
        {
            title: 'Setup Experiences',
            headline: 'Configure user experiences for the integrated entities',
            description: 'Configure various user experiences to enhance data quality and usability.',
            substeps: [
                { text: 'Search Before Create - prevent duplicate records from being created', link: 'View Trailhead for Setup' },
                { text: 'Copy field - enrich operational records with enterprise attributes', link: 'View Trailhead for Setup' },
                { text: 'Related List - showcase any information related to the primary entity', link: 'View Trailhead for Setup' }
            ]
        }
    ];
    
    return stepDetails.map((step, index) => generateStepDetailsPanel(step, index, steps)).join('');
}

function generateStepDetailsPanel(step, index, steps) {
    const isCompleted = steps.completed[index];
    const status = getStepStatus(index, steps);
    const statusIcon = getStatusIcon(status);
    const substepsCompleted = steps.substeps[index] ? steps.substeps[index].filter(s => s).length : 0;
    const totalSubsteps = steps.substeps[index] ? steps.substeps[index].length : 0;
    
    let bodyContent = '';
    
    if (step.form) {
        bodyContent = generateFormContent(step);
    } else if (step.picker) {
        bodyContent = generatePickerContent(step, index);
    } else {
        bodyContent = generateSubstepsContent(step, index, steps);
    }
    
    return `
        <div class="step-details-panel" id="step-panel-${index}">
            <div class="step-details-header" onclick="toggleStepPanel(${index})">
                <div class="step-details-header-left">
                    <div class="step-details-title">
                        <span class="step-status-icon ${status}" style="margin-right: 10px;">${statusIcon}</span>
                        ${step.title}
                    </div>
                    <div class="step-details-headline">${step.headline}</div>
                    <div class="step-substeps-summary">${substepsCompleted} out of ${totalSubsteps}</div>
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

function generateFormContent(step) {
    let formFields = '';
    
    // First field should have "Choose Existing" option if it's the connection name
    if (step.formFields && step.formFields[0].label === 'Connection Name') {
        formFields += `
            <div class="form-group">
                <label class="form-label">${step.formFields[0].label}</label>
                <select class="form-select" name="${step.formFields[0].name}" onchange="handleConnectionNameChange(this.value)">
                    <option value="">-- Choose Existing or Enter New --</option>
                    <option value="existing1">Existing Connection 1</option>
                    <option value="existing2">Existing Connection 2</option>
                </select>
                <input type="text" class="form-input" name="${step.formFields[0].name}_new" placeholder="Or enter new connection name" style="margin-top: 10px; display: none;" id="new-connection-input">
            </div>
        `;
        formFields += step.formFields.slice(1).map(field => `
            <div class="form-group">
                <label class="form-label">${field.label}</label>
                <input type="${field.type}" class="form-input" name="${field.name}" placeholder="Enter ${field.label.toLowerCase()}">
            </div>
        `).join('');
    } else {
        formFields = step.formFields.map(field => `
            <div class="form-group">
                <label class="form-label">${field.label}</label>
                <input type="${field.type}" class="form-input" name="${field.name}" placeholder="Enter ${field.label.toLowerCase()}">
            </div>
        `).join('');
    }
    
    const validationButton = step.validationButton ? `
        <button class="validation-button" onclick="validateConnection(${step.formFields ? 0 : -1})">
            <span id="validation-spinner" style="display: none;" class="loading-spinner"></span>
            Create & Validate
        </button>
        <div id="validation-result"></div>
    ` : '';
    
    return `
        <div class="step-description">${step.description}</div>
        <div class="step-details-content">
            <div class="step-instructions">
                ${formFields}
                ${validationButton}
            </div>
            <div class="step-actions">
                ${step.reviewButton ? '<button class="action-button">Review Mappings</button>' : ''}
                ${step.configureButton ? '<button class="action-button">Configure Match and Reconciliation Rules</button>' : ''}
                ${step.manualCheckbox ? '<label style="display: flex; align-items: center; gap: 10px; margin-top: 15px;"><input type="checkbox" onchange="markStepComplete(6)"> Mark as complete when done</label>' : ''}
            </div>
        </div>
    `;
}

function generatePickerContent(step, index) {
    const options = step.pickerOptions.map(option => 
        `<option value="${option}">${option}</option>`
    ).join('');
    
    return `
        <div class="step-description">${step.description}</div>
        <div class="step-details-content">
            <div class="step-instructions">
                <div class="form-group">
                    <label class="form-label">Select Business Entity</label>
                    <select class="form-select" onchange="selectBusinessEntity(${index}, this.value)">
                        <option value="">-- Select --</option>
                        ${options}
                    </select>
                </div>
            </div>
            <div class="step-actions">
                <a href="#" class="documentation-link">Documentation</a>
            </div>
        </div>
    `;
}

function generateSubstepsContent(step, index, steps) {
    let contentHTML = `<div class="step-description">${step.description}</div>`;
    
    // Add notification if present
    if (step.notification) {
        contentHTML += `<div class="notification">${step.notification}</div>`;
    }
    
    // Add table/list if present
    if (step.tableList) {
        contentHTML += `
            <div class="scrollable-list">
                ${step.tableList.map(item => `<div class="list-item">${item}</div>`).join('')}
            </div>
        `;
    }
    
    // Add data preview if present
    if (step.dataPreview && step.previewData) {
        contentHTML += `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${step.previewData.map(row => `
                        <tr>
                            <td>${row.field}</td>
                            <td>${row.value}</td>
                            <td>${row.status || (row.mapped ? 'Mapped' : 'Not Mapped')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    const substeps = step.substeps.map((substep, subIndex) => {
        const isChecked = steps.substeps[index] && steps.substeps[index][subIndex];
        return `
            <div class="substep-item">
                <div class="substep-checkbox ${isChecked ? 'checked' : ''}" 
                     onclick="toggleSubstep(${index}, ${subIndex})"></div>
                <div class="substep-text">${substep.text}</div>
                ${substep.link ? `<a href="#" class="documentation-link" style="margin-left: auto;">${substep.link}</a>` : ''}
            </div>
        `;
    }).join('');
    
    let actionButtons = '';
    if (step.reviewButton) {
        actionButtons += '<button class="action-button" onclick="markStepComplete(2)">Review Mappings</button>';
    }
    if (step.configureButton && index === 4) {
        actionButtons += '<button class="action-button">Configure Match and Reconciliation Rules</button>';
        if (step.scheduleCheckbox) {
            actionButtons += '<label style="display: flex; align-items: center; gap: 10px; margin-top: 15px;"><input type="checkbox" onchange="toggleSubstep(4, 1)"> Enable Identity Rules Schedule</label>';
        }
    }
    if (step.configureButton && index === 6) {
        actionButtons += '<button class="action-button">Configure D360 Setup</button>';
    }
    
    return `
        ${contentHTML}
        <div class="step-details-content">
            <div class="step-instructions">
                <ul class="substep-list">
                    ${substeps}
                </ul>
                ${index < 7 ? `<button class="next-step-button" onclick="scrollToNextStep(${index})">Next Step</button>` : ''}
            </div>
            <div class="step-actions">
                ${actionButtons}
                <a href="#" class="documentation-link">Documentation</a>
            </div>
        </div>
    `;
}

// Step Management Functions
function getStepStatus(index, steps) {
    if (steps.completed[index]) {
        return 'completed';
    } else if (steps.substeps[index] && steps.substeps[index].some(s => s)) {
        return 'in-progress';
    } else {
        return 'not-started';
    }
}

function getStatusIcon(status) {
    switch(status) {
        case 'completed':
            return '✓';
        case 'in-progress':
            return '◐';
        default:
            return '○';
    }
}

function toggleStepPanel(index) {
    const panel = document.getElementById(`step-panel-${index}`);
    panel.classList.toggle('expanded');
    
    const toggle = panel.querySelector('.step-details-toggle i');
    if (panel.classList.contains('expanded')) {
        toggle.classList.remove('fa-chevron-down');
        toggle.classList.add('fa-chevron-up');
    } else {
        toggle.classList.remove('fa-chevron-up');
        toggle.classList.add('fa-chevron-down');
    }
}

function toggleSubstep(stepIndex, substepIndex) {
    const steps = appState.steps['integrate-business-entities'];
    if (!steps.substeps[stepIndex]) {
        steps.substeps[stepIndex] = [];
    }
    steps.substeps[stepIndex][substepIndex] = !steps.substeps[stepIndex][substepIndex];
    
    // Update step status
    updateStepStatus(stepIndex);
    
    // Reload page to reflect changes
    loadPage('integrate-business-entities');
}

function updateStepStatus(stepIndex) {
    const steps = appState.steps['integrate-business-entities'];
    const allSubstepsCompleted = steps.substeps[stepIndex] && 
        steps.substeps[stepIndex].every(s => s);
    
    if (allSubstepsCompleted) {
        steps.completed[stepIndex] = true;
    }
}

function markStepComplete(stepIndex) {
    const steps = appState.steps['integrate-business-entities'];
    steps.completed[stepIndex] = true;
    if (!steps.substeps[stepIndex]) {
        steps.substeps[stepIndex] = [true];
    } else {
        steps.substeps[stepIndex] = steps.substeps[stepIndex].map(() => true);
    }
    loadPage('integrate-business-entities');
}

function selectBusinessEntity(stepIndex, value) {
    if (value) {
        markStepComplete(stepIndex);
    }
}

function validateConnection(stepIndex) {
    const spinner = document.getElementById('validation-spinner');
    const result = document.getElementById('validation-result');
    
    spinner.style.display = 'inline-block';
    result.innerHTML = '';
    
    setTimeout(() => {
        spinner.style.display = 'none';
        result.innerHTML = '<div class="success-message">✓ Successful connection created</div>';
        markStepComplete(stepIndex);
    }, 1500);
}

function scrollToNextStep(currentIndex) {
    const nextIndex = currentIndex + 1;
    const nextPanel = document.getElementById(`step-panel-${nextIndex}`);
    
    if (nextPanel) {
        // Expand the next panel
        if (!nextPanel.classList.contains('expanded')) {
            toggleStepPanel(nextIndex);
        }
        
        // Scroll to it
        setTimeout(() => {
            nextPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
}

function toggleStepSummary() {
    const summary = document.getElementById('step-summary');
    summary.classList.toggle('collapsed');
    
    const toggle = summary.querySelector('.step-summary-toggle i');
    if (summary.classList.contains('collapsed')) {
        toggle.classList.remove('fa-chevron-up');
        toggle.classList.add('fa-chevron-down');
    } else {
        toggle.classList.remove('fa-chevron-down');
        toggle.classList.add('fa-chevron-up');
    }
}

function initializeStepDetails() {
    // Auto-expand first step
    const firstPanel = document.getElementById('step-panel-0');
    if (firstPanel) {
        firstPanel.classList.add('expanded');
    }
}

function handleConnectionNameChange(value) {
    const newInput = document.getElementById('new-connection-input');
    if (newInput) {
        if (value === '' || value.startsWith('existing')) {
            newInput.style.display = 'none';
        } else {
            newInput.style.display = 'block';
        }
    }
}

function generateEmptyStatePage(pageName) {
    const pageLabels = {
        'connect-unify': 'Connect & Unify',
        'govern-data': 'Govern Data',
        'process-content': 'Process Content',
        'query-segment': 'Query & Segment',
        'analyze-predict': 'Analyze & Predict',
        'act-on-data': 'Act on Data',
        'build-share': 'Build & Share'
    };
    
    const label = pageLabels[pageName] || pageName;
    const iconMap = {
        'connect-unify': 'fa-link',
        'govern-data': 'fa-shield-alt',
        'process-content': 'fa-cogs',
        'query-segment': 'fa-search',
        'analyze-predict': 'fa-chart-line',
        'act-on-data': 'fa-bolt',
        'build-share': 'fa-share-alt'
    };
    
    const icon = iconMap[pageName] || 'fa-folder';
    
    return `
        <div class="empty-state">
            <i class="fas ${icon}"></i>
            <h2>${label}</h2>
            <p>This page is coming soon</p>
        </div>
    `;
}

