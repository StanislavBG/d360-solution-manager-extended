// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize router with all pages
    router.registerPage('home-data360', () => {
        loadHomeData360Page();
    });

    router.registerPage('solution-manager', () => {
        loadSolutionManagerPage();
    });

    router.registerPage('integrate-business-entities', () => {
        loadIntegrateBusinessEntitiesPage();
    });

    // Left Navigation Pages
    router.registerPage('connect-unify', () => {
        loadEmptyStatePage('Connect & Unify');
    });

    router.registerPage('govern-data', () => {
        loadEmptyStatePage('Govern Data');
    });

    router.registerPage('process-content', () => {
        loadEmptyStatePage('Process Content');
    });

    router.registerPage('query-segment', () => {
        loadEmptyStatePage('Query & Segment');
    });

    router.registerPage('analyze-predict', () => {
        loadEmptyStatePage('Analyze & Predict');
    });

    router.registerPage('act-on-data', () => {
        loadEmptyStatePage('Act on Data');
    });

    router.registerPage('build-share', () => {
        loadEmptyStatePage('Build & Share');
    });

    // Load initial page
    router.navigateTo('home-data360');
});

// Helper function for empty state pages
function loadEmptyStatePage(title) {
    const mainPageArea = document.getElementById('main-page-area');
    mainPageArea.innerHTML = `
        <div class="page empty-state-page">
            <div>${title}</div>
        </div>
    `;
}

