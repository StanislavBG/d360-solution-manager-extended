// Left Navigation Logic
document.addEventListener('DOMContentLoaded', () => {
    const leftNav = document.getElementById('left-navigation');
    const navToggle = document.getElementById('nav-toggle');
    const navItems = leftNav.querySelectorAll('.nav-item');

    // Toggle navigation collapse/expand
    navToggle.addEventListener('click', () => {
        leftNav.classList.toggle('expanded');
        leftNav.classList.toggle('collapsed');
    });

    // Navigation item clicks
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageName = item.getAttribute('data-page');
            
            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Navigate to page
            router.navigateTo(pageName);
        });
    });
});

