// App State
let currentApp = 'Data 360';
let currentPage = 'home';
let isNavCollapsed = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // App Picker functionality
    setupAppPicker();
    
    // Navigation tabs
    setupNavigationTabs();
    
    // Left navigation
    setupLeftNavigation();
    
    // Application icons
    setupApplicationIcons();
    
    // Load initial page
    loadPage('home');
}

// App Picker Dropdown
function setupAppPicker() {
    const appPickerIcon = document.getElementById('appPickerIcon');
    const appDropdown = document.getElementById('appDropdown');
    const appLabel = document.getElementById('appLabel');
    
    appPickerIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        appDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!appPickerIcon.contains(e.target) && !appDropdown.contains(e.target)) {
            appDropdown.classList.remove('show');
        }
    });
    
    // Handle app selection
    const appOptions = appDropdown.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedApp = this.getAttribute('data-app');
            
            // Update active state
            appOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update app label
            currentApp = selectedApp;
            appLabel.textContent = selectedApp;
            
            // Close dropdown
            appDropdown.classList.remove('show');
        });
    });
}

// Navigation Tabs (Home, Solution Manager)
function setupNavigationTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Update active state
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Load page
            loadPage(page);
        });
    });
}

// Left Navigation
function setupLeftNavigation() {
    const navToggle = document.getElementById('navToggle');
    const leftNav = document.getElementById('leftNavigation');
    
    // Toggle collapse/expand
    navToggle.addEventListener('click', function() {
        isNavCollapsed = !isNavCollapsed;
        leftNav.classList.toggle('collapsed');
    });
    
    // Handle navigation item clicks
    const navItems = document.querySelectorAll('.left-navigation .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Remove active from nav tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Load page
            loadPage(page);
        });
    });
}

// Application Icons
function setupApplicationIcons() {
    const appIcons = document.querySelectorAll('.app-icon');
    
    appIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                loadPage(page);
            }
        });
    });
}

// Page Loading
function loadPage(pageName) {
    currentPage = pageName;
    const mainPageArea = document.getElementById('mainPageArea');
    const pageContent = document.getElementById('pageContent');
    
    // Clear current content
    pageContent.innerHTML = '';
    
    // Load appropriate page content
    let content = '';
    
    switch(pageName) {
        case 'home':
            content = `
                <div class="page-home">
                    <h1>Home</h1>
                    <p>Welcome to ${currentApp}. This is the home page.</p>
                </div>
            `;
            break;
        case 'solution-manager':
            content = `
                <div class="page-placeholder">
                    <div class="empty-state">
                        <h2>Solution Manager</h2>
                        <p>This page is currently empty.</p>
                    </div>
                </div>
            `;
            break;
        case 'connect-unify':
            content = `
                <div class="page-placeholder">
                    <div class="empty-state">
                        <h2>Connect & Unify</h2>
                        <p>This page is currently empty.</p>
                    </div>
                </div>
            `;
            break;
        case 'govern-data':
            content = `
                <div class="page-placeholder">
                    <div class="empty-state">
                        <h2>Govern Data</h2>
                        <p>This page is currently empty.</p>
                    </div>
                </div>
            `;
            break;
        case 'process-content':
            content = `
                <div class="page-placeholder">
                    <div class="empty-state">
                        <h2>Process Content</h2>
                        <p>This page is currently empty.</p>
                    </div>
                </div>
            `;
            break;
        case 'query-segment':
            content = `
                <div class="page-placeholder">
                    <div class="empty-state">
                        <h2>Query & Segment</h2>
                        <p>This page is currently empty.</p>
                    </div>
                </div>
            `;
            break;
        case 'analyze-predict':
            content = `
                <div class="page-placeholder">
                    <div class="empty-state">
                        <h2>Analyze & Predict</h2>
                        <p>This page is currently empty.</p>
                    </div>
                </div>
            `;
            break;
        case 'act-on-data':
            content = `
                <div class="page-placeholder">
                    <div class="empty-state">
                        <h2>Act on Data</h2>
                        <p>This page is currently empty.</p>
                    </div>
                </div>
            `;
            break;
        case 'build-share':
            content = `
                <div class="page-placeholder">
                    <div class="empty-state">
                        <h2>Build & Share</h2>
                        <p>This page is currently empty.</p>
                    </div>
                </div>
            `;
            break;
        default:
            content = `
                <div class="empty-state">
                    <h2>Page Not Found</h2>
                    <p>Select an option from the navigation to get started.</p>
                </div>
            `;
    }
    
    pageContent.innerHTML = content;
}

