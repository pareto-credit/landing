import Component, { type ComponentConfig } from 'scripts/core/component';
import { CommonComponents } from '../commonTypes';

enum visibility {
    VISIBLE = 'true',
    HIDDEN = 'false',
}

export default class AccordionsList extends Component {
    constructor(config: ComponentConfig) {
        super(config);
    }

    async doSetup() {


        const accordionButtons = document.querySelectorAll('.accordion button');

        const toggleAccordion = (event: MouseEvent) => {
            const currentTarget = event.currentTarget as HTMLElement;
            const itemToggle = currentTarget.getAttribute('aria-expanded');
            accordionButtons.forEach(el => {
                el.setAttribute('aria-expanded', visibility.HIDDEN);
            });
            if (itemToggle == 'false') {
                currentTarget.setAttribute('aria-expanded', visibility.VISIBLE);
            }
        };

        accordionButtons.forEach(item => item.addEventListener('click', toggleAccordion));

    }
}
