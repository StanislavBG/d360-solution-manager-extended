// Router for handling page navigation
class Router {
    constructor() {
        this.currentPage = 'home-data360';
        this.pages = {};
        this.mainPageArea = document.getElementById('main-page-area');
    }

    registerPage(name, pageFunction) {
        this.pages[name] = pageFunction;
    }

    navigateTo(pageName) {
        if (this.pages[pageName]) {
            this.currentPage = pageName;
            this.mainPageArea.innerHTML = '';
            this.pages[pageName]();
        } else {
            console.warn(`Page ${pageName} not found`);
        }
    }

    getCurrentPage() {
        return this.currentPage;
    }
}

// Global router instance
const router = new Router();

