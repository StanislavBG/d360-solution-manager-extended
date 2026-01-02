// App state
let currentApp = 'Data-360';
let currentPage = 'home-data-360';
let leftNavCollapsed = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // App picker functionality
    const appPicker = document.getElementById('appPicker');
    const appPickerDropdown = document.getElementById('appPickerDropdown');
    
    appPicker.addEventListener('click', function(e) {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!appPicker.contains(e.target)) {
            appPickerDropdown.classList.remove('show');
        }
    });
    
    // App selection
    const appOptions = document.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            selectApp(appName);
            appPickerDropdown.classList.remove('show');
        });
    });
    
    // Navigation tabs (only for Data-360 app)
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            selectPage(page);
        });
    });
    
    // Left navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            selectLeftNavPage(page);
        });
    });
    
    // Left navigation toggle
    const navToggle = document.getElementById('navToggle');
    navToggle.addEventListener('click', function() {
        toggleLeftNavigation();
    });
    
    // Load initial page
    loadPage('home-data-360');
}

function selectApp(appName) {
    currentApp = appName;
    const appLabel = document.getElementById('appLabel');
    appLabel.textContent = appName === 'Data-360' ? 'Data 360' : appName;
    
    // Update active state in dropdown
    document.querySelectorAll('.app-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-app') === appName) {
            option.classList.add('active');
        }
    });
    
    // Update navigation tabs visibility (only show for Data-360)
    const navTabs = document.querySelectorAll('.nav-tab');
    if (appName === 'Data-360') {
        navTabs.forEach(tab => {
            tab.style.display = 'block';
        });
        // Reset to home page for Data-360
        selectPage('home-data-360');
    } else {
        navTabs.forEach(tab => {
            tab.style.display = 'none';
        });
        // Show empty state for other apps
        loadPage('empty-app');
    }
}

function selectPage(page) {
    currentPage = page;
    
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-page') === page) {
            tab.classList.add('active');
        }
    });
    
    // Remove active state from left nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    loadPage(page);
}

function selectLeftNavPage(page) {
    currentPage = page;
    
    // Remove active state from nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Update active state in left nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        }
    });
    
    loadPage(page);
}

function loadPage(page) {
    const pageContent = document.getElementById('pageContent');
    
    const pageMap = {
        'home-data-360': {
            title: 'Home - Data 360',
            content: ''
        },
        'solution-manager': {
            title: 'Solution Manager',
            content: ''
        },
        'connect-unify': {
            title: 'Connect & Unify',
            content: ''
        },
        'govern-data': {
            title: 'Govern Data',
            content: ''
        },
        'process-content': {
            title: 'Process Content',
            content: ''
        },
        'query-segment': {
            title: 'Query & Segment',
            content: ''
        },
        'analyze-predict': {
            title: 'Analyze & Predict',
            content: ''
        },
        'act-on-data': {
            title: 'Act on Data',
            content: ''
        },
        'build-share': {
            title: 'Build & Share',
            content: ''
        },
        'empty-app': {
            title: '',
            content: ''
        }
    };
    
    const pageInfo = pageMap[page] || { title: '', content: '' };
    
    if (pageInfo.content === '') {
        pageContent.innerHTML = `<div class="empty-state">${pageInfo.title || ''}</div>`;
    } else {
        pageContent.innerHTML = pageInfo.content;
    }
}

function toggleLeftNavigation() {
    const leftNav = document.getElementById('leftNavigation');
    leftNavCollapsed = !leftNavCollapsed;
    
    if (leftNavCollapsed) {
        leftNav.classList.add('collapsed');
    } else {
        leftNav.classList.remove('collapsed');
    }
}

