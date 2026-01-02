// Global state
let currentPage = 'home';
let leftNavCollapsed = false;
let stepSummaryCollapsed = false;
let stepStates = {
    0: { status: 'not-started', subSteps: 0, totalSubSteps: 1 },
    1: { status: 'not-started', subSteps: 0, totalSubSteps: 1 },
    2: { status: 'not-started', subSteps: 0, totalSubSteps: 1 },
    3: { status: 'not-started', subSteps: 0, totalSubSteps: 1 },
    4: { status: 'not-started', subSteps: 0, totalSubSteps: 2 },
    5: { status: 'not-started', subSteps: 0, totalSubSteps: 1 },
    6: { status: 'not-started', subSteps: 0, totalSubSteps: 1 },
    7: { status: 'not-started', subSteps: 0, totalSubSteps: 3 }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // App Picker
    const appPickerIcon = document.getElementById('appPickerIcon');
    const appPickerDropdown = document.getElementById('appPickerDropdown');
    
    appPickerIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', function() {
        appPickerDropdown.classList.remove('show');
    });
    
    // App selection
    document.querySelectorAll('.app-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const appName = this.getAttribute('data-app');
            document.getElementById('appLabel').textContent = appName === 'Data-360' ? 'Data 360' : appName;
            document.querySelectorAll('.app-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            appPickerDropdown.classList.remove('show');
        });
    });
    
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Left Navigation toggle
    const navToggle = document.getElementById('navToggle');
    const leftNav = document.getElementById('leftNavigation');
    
    navToggle.addEventListener('click', function() {
        leftNavCollapsed = !leftNavCollapsed;
        leftNav.classList.toggle('collapsed', leftNavCollapsed);
    });
    
    // Left Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
    
    // Step Summary toggle
    const stepSummaryToggle = document.getElementById('stepSummaryToggle');
    const stepSummary = document.getElementById('stepSummary');
    
    stepSummaryToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        stepSummaryCollapsed = !stepSummaryCollapsed;
        stepSummary.classList.toggle('collapsed', stepSummaryCollapsed);
    });
    
    // Step Summary items click
    document.querySelectorAll('.step-summary-item').forEach(item => {
        item.addEventListener('click', function() {
            const step = parseInt(this.getAttribute('data-step'));
            navigateToPage('integrate-business-entities');
            setTimeout(() => {
                toggleStepPanel(step);
                scrollToStep(step);
            }, 100);
        });
    });
    
    // Solution Manager tile click
    const integrateTile = document.getElementById('integrate-business-entities-tile');
    if (integrateTile) {
        integrateTile.addEventListener('click', function() {
            navigateToPage('integrate-business-entities');
        });
    }
    
    // Initialize step panels as collapsed
    document.querySelectorAll('.step-details-panel').forEach(panel => {
        panel.classList.add('collapsed');
    });
}

function navigateToPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.style.display = 'block';
        currentPage = pageName;
    }
}

function toggleStepPanel(stepIndex) {
    const panel = document.querySelector(`.step-details-panel[data-step="${stepIndex}"]`);
    if (!panel) return;
    
    const isExpanded = panel.classList.contains('expanded');
    
    if (isExpanded) {
        panel.classList.remove('expanded');
        panel.classList.add('collapsed');
    } else {
        // Optionally collapse other panels
        document.querySelectorAll('.step-details-panel').forEach(p => {
            p.classList.remove('expanded');
            p.classList.add('collapsed');
        });
        
        panel.classList.remove('collapsed');
        panel.classList.add('expanded');
        
        // Scroll to panel
        setTimeout(() => {
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

function scrollToStep(stepIndex) {
    const panel = document.querySelector(`.step-details-panel[data-step="${stepIndex}"]`);
    if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function updateStepStatus(stepIndex, status) {
    stepStates[stepIndex].status = status;
    updateStepIcon(stepIndex, status);
    updateStepSummaryItem(stepIndex);
}

function updateStepIcon(stepIndex, status) {
    const stepItem = document.querySelector(`.step-summary-item[data-step="${stepIndex}"] .step-icon`);
    if (stepItem) {
        stepItem.setAttribute('data-status', status);
    }
}

function updateStepSummaryItem(stepIndex) {
    const state = stepStates[stepIndex];
    const stepItem = document.querySelector(`.step-summary-item[data-step="${stepIndex}"]`);
    if (stepItem) {
        const icon = stepItem.querySelector('.step-icon');
        if (icon) {
            icon.setAttribute('data-status', state.status);
        }
    }
}

function updateSubStepSummary(stepIndex) {
    const panel = document.querySelector(`.step-details-panel[data-step="${stepIndex}"]`);
    if (!panel) return;
    
    // Count checked checkboxes in this step
    const checkboxes = panel.querySelectorAll('input[type="checkbox"]');
    let checkedCount = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) checkedCount++;
    });
    
    stepStates[stepIndex].subSteps = checkedCount;
    
    // Update sub-steps summary display
    const summaryElement = panel.querySelector('.sub-steps-summary');
    if (summaryElement) {
        summaryElement.textContent = `${checkedCount} out of ${stepStates[stepIndex].totalSubSteps}`;
    }
    
    // Update step status
    if (checkedCount === 0) {
        updateStepStatus(stepIndex, 'not-started');
    } else if (checkedCount === stepStates[stepIndex].totalSubSteps) {
        updateStepStatus(stepIndex, 'completed');
    } else {
        updateStepStatus(stepIndex, 'in-progress');
    }
}

function validateConnection(stepIndex) {
    const tenantUrl = document.getElementById('tenantUrl').value;
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    
    if (!tenantUrl || !userName || !password) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show spinner
    const validationResult = document.getElementById(`validation-result-${stepIndex}`);
    validationResult.style.display = 'flex';
    validationResult.innerHTML = '<div class="spinner"></div><span>Validating connection...</span>';
    
    // Simulate validation
    setTimeout(() => {
        validationResult.innerHTML = '<i class="fas fa-check-circle" style="color: green;"></i><span>Connection created successfully!</span>';
        
        // Mark step as completed
        stepStates[stepIndex].subSteps = 1;
        updateSubStepSummary(stepIndex);
        updateStepStatus(stepIndex, 'completed');
    }, 1500);
}

function onEntitySelected(stepIndex) {
    const entitySelect = document.getElementById('businessEntity');
    if (entitySelect.value) {
        stepStates[stepIndex].subSteps = 1;
        updateSubStepSummary(stepIndex);
        updateStepStatus(stepIndex, 'completed');
    }
}

function goToNextStep(currentStepIndex) {
    const nextStepIndex = currentStepIndex + 1;
    
    // Check if current step is completed
    const currentState = stepStates[currentStepIndex];
    if (currentState.subSteps < currentState.totalSubSteps && currentState.status !== 'completed') {
        alert('Please complete all sub-steps before proceeding to the next step.');
        return;
    }
    
    // Navigate to next step
    if (nextStepIndex <= 7) {
        toggleStepPanel(currentStepIndex);
        setTimeout(() => {
            toggleStepPanel(nextStepIndex);
            scrollToStep(nextStepIndex);
        }, 300);
    } else {
        alert('All steps completed!');
    }
}

// Make functions available globally
window.toggleStepPanel = toggleStepPanel;
window.updateSubStepSummary = updateSubStepSummary;
window.validateConnection = validateConnection;
window.onEntitySelected = onEntitySelected;
window.goToNextStep = goToNextStep;

