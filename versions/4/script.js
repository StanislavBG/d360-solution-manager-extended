// App Picker Dropdown
const appPicker = document.getElementById('appPicker');
const appDropdown = document.getElementById('appDropdown');
const appLabel = document.getElementById('appLabel');

appPicker.addEventListener('click', (e) => {
    e.stopPropagation();
    appDropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!appPicker.contains(e.target)) {
        appDropdown.classList.remove('show');
    }
});

// Handle app selection
document.querySelectorAll('.app-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const appName = option.getAttribute('data-app');
        
        // Update active state
        document.querySelectorAll('.app-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Update app label (remove "-App" suffix if present)
        const displayName = appName.replace('-App', '').replace('-', ' ');
        appLabel.textContent = displayName;
        
        // Close dropdown
        appDropdown.classList.remove('show');
    });
});

// Left Navigation Toggle
const leftNav = document.getElementById('leftNav');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
    leftNav.classList.toggle('collapsed');
});

// Navigation functionality
function navigateToPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
    
    // Update active nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Update active nav tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Set active state
    const activeNavItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    const activeNavTab = document.querySelector(`.nav-tab[data-page="${pageId}"]`);
    if (activeNavTab) {
        activeNavTab.classList.add('active');
    }
}

// Left Navigation Items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const pageId = item.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

// Top Navigation Tabs
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const pageId = tab.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

// Step Details Panels - Collapsible functionality
document.querySelectorAll('.step-details-header').forEach(header => {
    header.addEventListener('click', () => {
        const panel = header.closest('.step-details-panel');
        panel.classList.toggle('expanded');
    });
});

// Initialize: Show home page by default
navigateToPage('home-data-360');

