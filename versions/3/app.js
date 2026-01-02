// Page content templates
const pageTemplates = {
    'home-data-360': '<div class="placeholder-page">Home Data 360 Page</div>',
    'solution-manager': '<div class="placeholder-page">Solution Manager Page</div>',
    'connect-unify': '<div class="placeholder-page">Connect & Unify</div>',
    'govern-data': '<div class="placeholder-page">Govern Data</div>',
    'process-content': '<div class="placeholder-page">Process Content</div>',
    'query-segment': '<div class="placeholder-page">Query & Segment</div>',
    'analyze-predict': '<div class="placeholder-page">Analyze & Predict</div>',
    'act-on-data': '<div class="placeholder-page">Act on Data</div>',
    'build-share': '<div class="placeholder-page">Build & Share</div>'
};

// Current state
let currentApp = 'Data 360';
let currentPage = 'home-data-360';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAppPicker();
    initializeNavigation();
    initializeLeftNav();
    loadPage('home-data-360');
});

// App Picker functionality
function initializeAppPicker() {
    const appPicker = document.getElementById('appPicker');
    const dropdown = document.getElementById('appPickerDropdown');
    const appLabel = document.getElementById('appLabel');
    const appOptions = dropdown.querySelectorAll('.app-option');

    // Toggle dropdown
    appPicker.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    // Handle app selection
    appOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const selectedApp = this.getAttribute('data-app');
            
            // Update active state
            appOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update app label
            currentApp = selectedApp;
            appLabel.textContent = selectedApp;
            
            // Close dropdown
            dropdown.classList.remove('show');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!appPicker.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

// Navigation tabs functionality
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Update active state
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Load page
            loadPage(page);
            currentPage = page;
        });
    });
}

// Left Navigation functionality
function initializeLeftNav() {
    const navToggle = document.getElementById('navToggle');
    const leftNav = document.getElementById('leftNav');
    const navItems = leftNav.querySelectorAll('.nav-item');

    // Toggle collapse/expand
    navToggle.addEventListener('click', function() {
        leftNav.classList.toggle('collapsed');
    });

    // Handle navigation item clicks
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Remove active state from nav tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Load page
            loadPage(page);
            currentPage = page;
        });
    });
}

// Load page content
function loadPage(pageName) {
    const pageContent = document.getElementById('pageContent');
    
    if (pageTemplates[pageName]) {
        pageContent.innerHTML = pageTemplates[pageName];
    } else {
        pageContent.innerHTML = '<div class="placeholder-page">Page not found</div>';
    }
}

