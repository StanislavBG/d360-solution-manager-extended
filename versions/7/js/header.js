// Header Component Logic
document.addEventListener('DOMContentLoaded', () => {
    const appPicker = document.getElementById('app-picker');
    const appPickerDropdown = document.getElementById('app-picker-dropdown');
    const appLabel = document.getElementById('app-label');
    const navTabs = document.getElementById('navigation-tabs');
    const navTabElements = navTabs.querySelectorAll('.nav-tab');

    let currentApp = 'data360';

    // App Picker Dropdown
    appPicker.addEventListener('click', (e) => {
        e.stopPropagation();
        appPickerDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!appPicker.contains(e.target)) {
            appPickerDropdown.classList.remove('show');
        }
    });

    // App selection
    const appOptions = appPickerDropdown.querySelectorAll('.app-option');
    appOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const appName = option.getAttribute('data-app');
            currentApp = appName;
            
            // Update active state
            appOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update app label
            const labelMap = {
                'sales': 'Sales',
                'service': 'Service',
                'marketing': 'Marketing',
                'commerce': 'Commerce',
                'data360': 'Data 360'
            };
            appLabel.textContent = labelMap[appName] || 'Data 360';
            
            // Show/hide navigation tabs based on app
            if (appName === 'data360') {
                navTabs.style.display = 'flex';
            } else {
                navTabs.style.display = 'none';
            }
            
            appPickerDropdown.classList.remove('show');
        });
    });

    // Navigation tabs
    navTabElements.forEach(tab => {
        tab.addEventListener('click', () => {
            const pageName = tab.getAttribute('data-page');
            
            // Update active state
            navTabElements.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Navigate to page
            router.navigateTo(pageName);
        });
    });

    // Application icons
    const appIcons = document.querySelectorAll('.app-icon');
    appIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const pageName = icon.getAttribute('data-page');
            if (pageName) {
                router.navigateTo(pageName);
            }
        });
    });
});

