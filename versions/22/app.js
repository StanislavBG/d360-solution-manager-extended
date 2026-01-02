// Application State
const state = {
    currentApp: 'Data 360',
    currentPage: 'home',
    leftNavExpanded: true,
    stepSummaryExpanded: true,
    stepStatuses: [
        { completed: 0, total: 1, status: 'not-started' },
        { completed: 0, total: 1, status: 'not-started' },
        { completed: 0, total: 1, status: 'not-started' },
        { completed: 0, total: 3, status: 'not-started' },
        { completed: 0, total: 1, status: 'not-started' },
        { completed: 0, total: 5, status: 'not-started' },
        { completed: 0, total: 1, status: 'not-started' },
        { completed: 0, total: 3, status: 'not-started' }
    ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeAppPicker();
    initializeLeftNavigation();
    initializeTiles();
    initializeStepSummary();
    initializeStepDetails();
    initializeValidation();
    initializeEntityPicker();
    initializePreviewButtons();
});

// Navigation Management
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.getAttribute('data-page');
            navigateToPage(page);
        });
    });

    const leftNavItems = document.querySelectorAll('.nav-item');
    leftNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

function navigateToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(`${pageName}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
        state.currentPage = pageName;
    }

    // Update active tab
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        if (tab.getAttribute('data-page') === pageName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// App Picker
function initializeAppPicker() {
    const appPickerIcon = document.getElementById('app-picker-icon');
    const appPickerDropdown = document.getElementById('app-picker-dropdown');
    const appLabel = document.getElementById('app-label');

    appPickerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
        appPickerDropdown.classList.add('hidden');
    });

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const appName = item.getAttribute('data-app');

            // Update active state
            dropdownItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update label
            appLabel.textContent = appName;
            state.currentApp = appName;

            // Close dropdown
            appPickerDropdown.classList.add('hidden');
        });
    });
}

// Left Navigation Toggle
function initializeLeftNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const leftNav = document.getElementById('left-navigation');

    navToggle.addEventListener('click', () => {
        leftNav.classList.toggle('collapsed');
        state.leftNavExpanded = !leftNav.classList.contains('collapsed');
    });
}

// Tiles
function initializeTiles() {
    const integrateTile = document.getElementById('integrate-business-entities-tile');
    if (integrateTile) {
        integrateTile.addEventListener('click', () => {
            navigateToPage('integrate-business-entities');
        });
    }
}

// Step Summary
function initializeStepSummary() {
    const summaryToggle = document.getElementById('summary-toggle');
    const stepSummary = document.getElementById('step-summary');

    if (summaryToggle) {
        summaryToggle.addEventListener('click', () => {
            stepSummary.classList.toggle('collapsed');
            state.stepSummaryExpanded = !stepSummary.classList.contains('collapsed');
        });
    }

    // Click on summary steps to navigate to step
    const summarySteps = document.querySelectorAll('.summary-step');
    summarySteps.forEach(step => {
        step.addEventListener('click', () => {
            const stepIndex = parseInt(step.getAttribute('data-step'));
            scrollToStep(stepIndex);
        });
    });
}

function scrollToStep(stepIndex) {
    const stepDetail = document.querySelector(`.step-detail[data-step="${stepIndex}"]`);
    if (stepDetail) {
        // Expand the step
        stepDetail.classList.add('expanded');

        // Scroll to step
        stepDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Step Details
function initializeStepDetails() {
    const stepDetails = document.querySelectorAll('.step-detail');

    stepDetails.forEach((stepDetail, index) => {
        const header = stepDetail.querySelector('.step-header');
        const expandToggle = stepDetail.querySelector('.expand-toggle');

        // Toggle expansion
        header.addEventListener('click', () => {
            stepDetail.classList.toggle('expanded');
        });

        // Next Step button
        const nextStepBtn = stepDetail.querySelector('.next-step-btn');
        if (nextStepBtn && !nextStepBtn.classList.contains('disabled')) {
            nextStepBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                // Collapse current step
                stepDetail.classList.remove('expanded');

                // Find next step
                const nextStep = document.querySelector(`.step-detail[data-step="${index + 1}"]`);
                if (nextStep) {
                    // Expand next step
                    nextStep.classList.add('expanded');

                    // Scroll to next step
                    setTimeout(() => {
                        nextStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            });
        }

        // Track checkbox changes
        const checkboxes = stepDetail.querySelectorAll('.substep-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateStepProgress(index);
            });
        });
    });
}

function updateStepProgress(stepIndex) {
    const stepDetail = document.querySelector(`.step-detail[data-step="${stepIndex}"]`);
    const checkboxes = stepDetail.querySelectorAll('.substep-checkbox');
    const totalCheckboxes = checkboxes.length;
    let completedCheckboxes = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            completedCheckboxes++;
        }
    });

    // Update state
    state.stepStatuses[stepIndex].completed = completedCheckboxes;
    state.stepStatuses[stepIndex].total = totalCheckboxes;

    // Determine status
    let status = 'not-started';
    if (completedCheckboxes === totalCheckboxes && totalCheckboxes > 0) {
        status = 'completed';
    } else if (completedCheckboxes > 0) {
        status = 'in-progress';
    }
    state.stepStatuses[stepIndex].status = status;

    // Update UI
    updateStepSummaryDisplay(stepIndex);
    updateStepSubstepsSummary(stepIndex, completedCheckboxes, totalCheckboxes);
}

function updateStepSummaryDisplay(stepIndex) {
    const summaryStep = document.querySelector(`.summary-step[data-step="${stepIndex}"]`);
    if (summaryStep) {
        const icon = summaryStep.querySelector('.step-icon');
        const status = state.stepStatuses[stepIndex].status;

        // Remove all status classes
        icon.classList.remove('not-started', 'in-progress', 'completed');

        // Update icon based on status
        if (status === 'completed') {
            icon.classList.add('completed');
            icon.textContent = '✓';
        } else if (status === 'in-progress') {
            icon.classList.add('in-progress');
            icon.textContent = '◐';
        } else {
            icon.classList.add('not-started');
            icon.textContent = '○';
        }
    }
}

function updateStepSubstepsSummary(stepIndex, completed, total) {
    const stepDetail = document.querySelector(`.step-detail[data-step="${stepIndex}"]`);
    if (stepDetail) {
        const summary = stepDetail.querySelector('.sub-steps-summary');
        if (summary) {
            summary.textContent = `${completed} out of ${total}`;
        }
    }
}

// Validation
function initializeValidation() {
    const validateBtn = document.getElementById('validate-connection');
    const validationResult = document.getElementById('validation-result');

    if (validateBtn) {
        validateBtn.addEventListener('click', () => {
            const connectionName = document.getElementById('connection-name').value;
            const tenantUrl = document.getElementById('tenant-url').value;
            const userName = document.getElementById('user-name').value;
            const password = document.getElementById('password').value;

            // Show loading
            validateBtn.disabled = true;
            validateBtn.innerHTML = '<span class="spinner"></span> Validating...';
            validationResult.classList.remove('hidden', 'success', 'error');

            // Simulate validation
            setTimeout(() => {
                if (connectionName && tenantUrl && userName && password) {
                    validationResult.classList.add('success');
                    validationResult.textContent = '✓ Connection validated successfully!';

                    // Mark step as complete
                    const stepDetail = document.querySelector('.step-detail[data-step="0"]');
                    const checkbox = stepDetail.querySelector('.substep-checkbox');
                    if (checkbox) {
                        checkbox.checked = true;
                        updateStepProgress(0);
                    }
                } else {
                    validationResult.classList.add('error');
                    validationResult.textContent = '✗ Please fill in all fields';
                }

                validationResult.classList.remove('hidden');
                validateBtn.disabled = false;
                validateBtn.innerHTML = 'Validate';
            }, 1500);
        });
    }
}

// Entity Picker
function initializeEntityPicker() {
    const entityCheckboxes = document.querySelectorAll('input[name="entity"]');
    const notification = document.getElementById('relationship-notification');

    if (entityCheckboxes.length > 0) {
        entityCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checkedCount = Array.from(entityCheckboxes).filter(cb => cb.checked).length;

                // Show notification if multiple selected
                if (checkedCount > 1) {
                    notification.classList.remove('hidden');
                } else {
                    notification.classList.add('hidden');
                }

                // Update step progress
                if (checkedCount > 0) {
                    updateStepProgress(1);
                }
            });
        });
    }
}

// Manual checkbox for mappings
function initializeMappingsCheckbox() {
    const mappingsCheckbox = document.getElementById('mappings-reviewed');
    if (mappingsCheckbox) {
        mappingsCheckbox.addEventListener('change', () => {
            if (mappingsCheckbox.checked) {
                updateStepProgress(2);
            }
        });
    }
}

// Initialize mappings checkbox when page loads
setTimeout(() => {
    initializeMappingsCheckbox();
}, 100);

// Preview Buttons
function initializePreviewButtons() {
    const previewButtons = document.querySelectorAll('.preview-btn');

    previewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();

            // Show redirect notification
            showNotification('Opening preview in new window...');

            // Find parent preview-item and check its checkbox
            const previewItem = button.closest('.preview-item');
            if (previewItem) {
                const checkbox = previewItem.querySelector('.substep-checkbox');
                if (checkbox && !checkbox.checked) {
                    checkbox.checked = true;

                    // Find which step this belongs to
                    const stepDetail = button.closest('.step-detail');
                    const stepIndex = parseInt(stepDetail.getAttribute('data-step'));
                    updateStepProgress(stepIndex);
                }
            }
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '10000';
    notification.style.padding = '16px 24px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Action buttons functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('action-btn') &&
        !e.target.id &&
        !e.target.classList.contains('small')) {
        showNotification('Opening configuration page...');
    }
});

// Initialize all checkboxes tracking on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial substep summaries
    document.querySelectorAll('.step-detail').forEach((stepDetail, index) => {
        const checkboxes = stepDetail.querySelectorAll('.substep-checkbox');
        updateStepSubstepsSummary(index, 0, checkboxes.length);
    });
});
