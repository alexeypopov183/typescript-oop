import MainPage from "../main";
import SettingsPage from "../settings";
import Page from "../../core/templates/page";
import StatisticsPage from "../statistics";
import Header from "../../core/components/header";
import ErrorPage, {ErrorTypes} from "../error";

export const enum IdPages {
    MAIN_PAGE = 'main-page',
    SETTINGS_PAGE = 'settings-page',
    STATISTICS_PAGE = 'statistics-page',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageID: string = 'current-page';
    private initialPage: MainPage;
    private header: Header;

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageID}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        switch (idPage) {
            case IdPages.MAIN_PAGE:
                page = new MainPage(idPage);
                break;
            case IdPages.SETTINGS_PAGE:
                page = new SettingsPage(idPage);
                break;
            case IdPages.STATISTICS_PAGE:
                page = new StatisticsPage(idPage);
                break;
            default:
                page = new ErrorPage(idPage, ErrorTypes.ERROR_404);
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageID;
            App.container.append(pageHTML);
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', (e) => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
        })
    }

    constructor() {
        this.initialPage = new MainPage(IdPages.MAIN_PAGE);
        this.header = new Header('header', 'header-container');
    };

    run() {
        App.container.append(this.header.render());
        App.renderNewPage(IdPages.MAIN_PAGE);
        this.enableRouteChange();
    };
}

export default App;