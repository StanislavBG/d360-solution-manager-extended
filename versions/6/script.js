// Page templates mapping
const pageTemplates = {
    'home-data-360': 'home-data-360-page',
    'solution-manager': 'solution-manager-page',
    'integrate-business-entities': 'integrate-business-entities-page',
    'connect-unify': 'connect-unify-page',
    'govern-data': 'govern-data-page',
    'process-content': 'process-content-page',
    'query-segment': 'query-segment-page',
    'analyze-predict': 'analyze-predict-page',
    'act-on-data': 'act-on-data-page',
    'build-share': 'build-share-page'
};

// App names mapping
const appNames = {
    'Sales': 'Sales',
    'Service': 'Service',
    'Marketing': 'Marketing',
    'Commerce': 'Commerce',
    'Data 360': 'Data 360'
};

// Current state
let currentApp = 'Data 360';
let currentPage = 'home-data-360';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load default page
    loadPage('home-data-360');
    
    // Setup event listeners
    setupAppPicker();
    setupNavigationTabs();
    setupLeftNavigation();
    setupStepDetailsPanels();
    setupTiles();
}

// Load page into main page area
function loadPage(pageId) {
    const mainPageArea = document.getElementById('mainPageArea');
    const templateId = pageTemplates[pageId];
    
    if (!templateId) {
        console.error(`Page template not found for: ${pageId}`);
        return;
    }
    
    const template = document.getElementById(templateId);
    if (!template) {
        console.error(`Template element not found: ${templateId}`);
        return;
    }
    
    // Clone and insert template content
    const content = template.content.cloneNode(true);
    mainPageArea.innerHTML = '';
    mainPageArea.appendChild(content);
    
    currentPage = pageId;
    
    // Re-initialize page-specific functionality
    if (pageId === 'integrate-business-entities') {
        setupStepDetailsPanels();
    }
    
    // Update active nav tab
    updateActiveNavTab();
}

// Setup app picker dropdown
function setupAppPicker() {
    const appPicker = document.getElementById('appPicker');
    const dropdown = document.getElementById('appPickerDropdown');
    const appLabel = document.getElementById('appLabel');
    
    appPicker.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!appPicker.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    // Handle app selection
    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const appName = item.getAttribute('data-app');
            currentApp = appName;
            
            // Update active state
            dropdown.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Update app label
            appLabel.textContent = appName;
            
            // Close dropdown
            dropdown.classList.remove('show');
        });
    });
}

// Setup navigation tabs
function setupNavigationTabs() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const pageId = tab.getAttribute('data-page');
            loadPage(pageId);
        });
    });
}

// Update active navigation tab
function updateActiveNavTab() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        const pageId = tab.getAttribute('data-page');
        if (pageId === currentPage) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Setup left navigation
function setupLeftNavigation() {
    const leftNav = document.getElementById('leftNav');
    const navToggle = document.getElementById('navToggle');
    
    // Toggle collapse
    navToggle.addEventListener('click', () => {
        leftNav.classList.toggle('collapsed');
    });
    
    // Handle nav item clicks
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.getAttribute('data-page');
            loadPage(pageId);
        });
    });
}

// Setup step details panels (for integrate-business-entities page)
function setupStepDetailsPanels() {
    const panels = document.querySelectorAll('.step-details-panel');
    
    panels.forEach(panel => {
        const header = panel.querySelector('.step-details-header');
        
        if (header) {
            header.addEventListener('click', () => {
                const isExpanded = panel.classList.contains('expanded');
                
                if (isExpanded) {
                    panel.classList.remove('expanded');
                    panel.classList.add('collapsed');
                } else {
                    panel.classList.remove('collapsed');
                    panel.classList.add('expanded');
                }
            });
        }
        
        // Initialize as collapsed
        if (!panel.classList.contains('expanded')) {
            panel.classList.add('collapsed');
        }
    });
    
    // Setup step items in summary to scroll to and expand corresponding panels
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        item.addEventListener('click', () => {
            const stepIndex = item.getAttribute('data-step');
            const panel = document.querySelector(`.step-details-panel[data-step="${stepIndex}"]`);
            
            if (panel) {
                // Expand the panel if collapsed
                if (panel.classList.contains('collapsed')) {
                    panel.classList.remove('collapsed');
                    panel.classList.add('expanded');
                }
                
                // Scroll to the panel
                panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Setup tiles (for solution manager page)
function setupTiles() {
    document.addEventListener('click', (e) => {
        const tile = e.target.closest('.tile');
        if (tile) {
            const pageId = tile.getAttribute('data-page');
            if (pageId) {
                loadPage(pageId);
            }
        }
    });
}

// Setup application icons
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const pageId = icon.getAttribute('data-page');
        if (pageId) {
            loadPage(pageId);
        }
    });
});

