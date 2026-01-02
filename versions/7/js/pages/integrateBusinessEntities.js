// Integrate Business Entities Page
function loadIntegrateBusinessEntitiesPage() {
    const mainPageArea = document.getElementById('main-page-area');
    
    // Step data
    const steps = [
        {
            id: 'step-1',
            title: 'Connect to Informatica System',
            headline: 'Establish trusted connection between D360 and Informatica tenants',
            instructions: [
                'Configure details for the Informatica tenant, so that a trusted connection between them can be provided. The important items are "User-Name" and "Password"'
            ]
        },
        {
            id: 'step-2',
            title: 'Choose Business Entity',
            headline: 'Select the business entity to integrate',
            instructions: [
                'Navigate to the entity selection page',
                'Choose the appropriate business entity from the list',
                'Review entity details and confirm selection'
            ]
        },
        {
            id: 'step-3',
            title: 'Review and Extend Mappings',
            headline: 'Configure field mappings between systems',
            instructions: [
                'Review default field mappings',
                'Extend mappings for additional fields as needed',
                'Validate mapping configuration'
            ]
        },
        {
            id: 'step-4',
            title: 'Validate Connected Data',
            headline: 'Verify data connection and integrity',
            instructions: [
                'Run connection test',
                'Validate data sample',
                'Review connection logs'
            ]
        },
        {
            id: 'step-5',
            title: 'Set up Identity Rules',
            headline: 'Configure identity matching rules',
            instructions: [
                'Define identity matching criteria',
                'Configure matching rules',
                'Set up duplicate detection rules'
            ]
        },
        {
            id: 'step-6',
            title: 'Validate Identity Data',
            headline: 'Verify identity matching configuration',
            instructions: [
                'Test identity matching rules',
                'Review match results',
                'Adjust rules if necessary'
            ]
        },
        {
            id: 'step-7',
            title: 'Enable Sync to Informatica',
            headline: 'Activate synchronization between systems',
            instructions: [
                'Configure sync schedule',
                'Enable bidirectional sync',
                'Activate synchronization'
            ]
        },
        {
            id: 'step-8',
            title: 'Setup Experiences',
            headline: 'Configure user experiences',
            instructions: [
                'Search Before Create - prevent duplicate records from being created',
                'Copy field - enrich operational records with enterprise attributes',
                'Related List - showcase any information related to the primary entity'
            ]
        }
    ];

    // Initialize step states
    const stepStates = {};
    steps.forEach(step => {
        stepStates[step.id] = {
            status: 'not-started',
            completedInstructions: []
        };
    });

    // Create step summary HTML
    const stepSummaryHTML = steps.map((step, index) => {
        const state = stepStates[step.id];
        return `
            <div class="step-summary-item" data-step-id="${step.id}">
                <div class="step-status-icon ${state.status}"></div>
                <span class="step-summary-label">${index + 1}. ${step.title}</span>
            </div>
        `;
    }).join('');

    // Create step details HTML
    const stepDetailsHTML = steps.map((step, index) => {
        const state = stepStates[step.id];
        const allCompleted = state.completedInstructions.length === step.instructions.length;
        const someCompleted = state.completedInstructions.length > 0;
        const panelClass = allCompleted ? 'expanded' : (someCompleted ? 'expanded' : 'collapsed');
        
        const instructionsHTML = step.instructions.map((instruction, instIndex) => {
            const instructionId = `${step.id}-inst-${instIndex}`;
            const isCompleted = state.completedInstructions.includes(instIndex);
            return `
                <div class="instruction-item ${isCompleted ? 'completed' : ''}">
                    <span class="instruction-text">${instruction}</span>
                    <input type="checkbox" class="instruction-checkbox" 
                           data-step-id="${step.id}" 
                           data-instruction-index="${instIndex}"
                           ${isCompleted ? 'checked' : ''}>
                </div>
            `;
        }).join('');

        return `
            <div class="step-details-panel ${panelClass}" data-step-id="${step.id}">
                <div class="step-details-header">
                    <div class="step-details-title-section">
                        <div class="step-details-title">${step.title}</div>
                        <div class="step-details-headline">${step.headline}</div>
                    </div>
                    <button class="step-details-toggle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                        </svg>
                    </button>
                </div>
                <div class="step-details-body">
                    <div class="instruction-list">
                        ${instructionsHTML}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    mainPageArea.innerHTML = `
        <div class="page integrate-business-entities-page">
            <div class="header-instructions">
                <div class="header-instructions-text">
                    Realize the full potential of the curated and enriched business entities from Informatica directly in D360. In this step by step guide, we will work though the steps required to operationalize business entities created in Informatica in D360.
                </div>
            </div>
            <div class="step-summary-container" id="step-summary-container">
                <div class="step-summary-header">
                    <div class="step-summary-title">Step Summary</div>
                    <button class="step-summary-toggle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                        </svg>
                    </button>
                </div>
                <div class="step-summary-content">
                    ${stepSummaryHTML}
                </div>
            </div>
            <div class="step-details-container">
                ${stepDetailsHTML}
            </div>
        </div>
    `;

    // Initialize interactivity
    initializeIntegrateBusinessEntitiesPage(stepStates, steps);
}

function getStatusIcon(status) {
    // Status icons are handled via CSS pseudo-elements
    return '';
}

function updateStepStatus(stepId, stepStates, steps) {
    const state = stepStates[stepId];
    const step = steps.find(s => s.id === stepId);
    
    if (!step) return;
    
    const totalInstructions = step.instructions.length;
    const completedCount = state.completedInstructions.length;
    
    if (completedCount === 0) {
        state.status = 'not-started';
    } else if (completedCount === totalInstructions) {
        state.status = 'completed';
    } else {
        state.status = 'in-progress';
    }
    
    // Update UI
    updateStepSummaryUI(stepId, state.status);
    updateStepDetailsUI(stepId, state);
}

function updateStepSummaryUI(stepId, status) {
    const summaryItem = document.querySelector(`.step-summary-item[data-step-id="${stepId}"]`);
    if (summaryItem) {
        const statusIcon = summaryItem.querySelector('.step-status-icon');
        statusIcon.className = `step-status-icon ${status}`;
    }
}

function updateStepDetailsUI(stepId, state) {
    const panel = document.querySelector(`.step-details-panel[data-step-id="${stepId}"]`);
    if (panel) {
        const instructionItems = panel.querySelectorAll('.instruction-item');
        instructionItems.forEach((item, index) => {
            if (state.completedInstructions.includes(index)) {
                item.classList.add('completed');
                const checkbox = item.querySelector('.instruction-checkbox');
                if (checkbox) checkbox.checked = true;
            } else {
                item.classList.remove('completed');
                const checkbox = item.querySelector('.instruction-checkbox');
                if (checkbox) checkbox.checked = false;
            }
        });
    }
}

function initializeIntegrateBusinessEntitiesPage(stepStates, steps) {
    // Step summary toggle
    const stepSummaryContainer = document.getElementById('step-summary-container');
    const stepSummaryToggle = stepSummaryContainer.querySelector('.step-summary-toggle');
    
    stepSummaryToggle.addEventListener('click', () => {
        stepSummaryContainer.classList.toggle('collapsed');
    });

    // Step summary item clicks (scroll to step)
    const stepSummaryItems = document.querySelectorAll('.step-summary-item');
    stepSummaryItems.forEach(item => {
        item.addEventListener('click', () => {
            const stepId = item.getAttribute('data-step-id');
            const stepPanel = document.querySelector(`.step-details-panel[data-step-id="${stepId}"]`);
            if (stepPanel) {
                stepPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Expand the panel
                stepPanel.classList.add('expanded');
            }
        });
    });

    // Step details panel toggles
    const stepPanels = document.querySelectorAll('.step-details-panel');
    stepPanels.forEach(panel => {
        const toggle = panel.querySelector('.step-details-toggle');
        toggle.addEventListener('click', () => {
            panel.classList.toggle('expanded');
            panel.classList.toggle('collapsed');
        });
    });

    // Instruction checkboxes
    const checkboxes = document.querySelectorAll('.instruction-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const stepId = checkbox.getAttribute('data-step-id');
            const instructionIndex = parseInt(checkbox.getAttribute('data-instruction-index'));
            const state = stepStates[stepId];
            
            if (checkbox.checked) {
                if (!state.completedInstructions.includes(instructionIndex)) {
                    state.completedInstructions.push(instructionIndex);
                }
            } else {
                state.completedInstructions = state.completedInstructions.filter(i => i !== instructionIndex);
            }
            
            // Update step status
            updateStepStatus(stepId, stepStates, steps);
            
            // Update instruction item UI
            const instructionItem = checkbox.closest('.instruction-item');
            if (checkbox.checked) {
                instructionItem.classList.add('completed');
            } else {
                instructionItem.classList.remove('completed');
            }
        });
    });
}

