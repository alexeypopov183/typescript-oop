import Component from "../../templates/components";
import {IdPages} from "../../../pages/app";

const Buttons = [
    {
        id: IdPages.MAIN_PAGE,
        text: 'MAIN_PAGE',
    },
    {
        id: IdPages.STATISTICS_PAGE,
        text: 'STATISTICS_PAGE',
    },
    {
        id: IdPages.SETTINGS_PAGE,
        text: 'SETTINGS_PAGE',
    }
]

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageButtons() {
        const pageButtons = document.createElement('div');
        Buttons.forEach((button) => {
            const buttonHTML = document.createElement('a');
            buttonHTML.href = `#${button.id}`;
            buttonHTML.innerText = button.text;
            pageButtons.append(buttonHTML);
        });
        this.container.append(pageButtons);
    }

    render() {
        this.renderPageButtons();
        return this.container;
    }
}

export default Header;