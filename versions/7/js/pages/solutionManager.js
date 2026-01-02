// Solution Manager Page
function loadSolutionManagerPage() {
    const mainPageArea = document.getElementById('main-page-area');
    mainPageArea.innerHTML = `
        <div class="page solution-manager-page">
            <h1 class="object-home-title">Solution Manager</h1>
            <div class="tile-list">
                <div class="tile" id="integrate-business-entities-tile">
                    <div class="tile-title">Integrate Business Entities from Informatica in Data360</div>
                    <div class="tile-description">Set up integration between Informatica and Data360 to operationalize business entities.</div>
                </div>
            </div>
        </div>
    `;

    // Add click handler for the tile
    const tile = document.getElementById('integrate-business-entities-tile');
    if (tile) {
        tile.addEventListener('click', () => {
            router.navigateTo('integrate-business-entities');
        });
    }
}

