import AccordionsList from 'components/common/accordionsList/script';
import { CommonComponents } from 'components/common/commonTypes';
import { HomePageSections } from 'components/sections/sectionTypes';
import gsap from 'gsap';
import Section from 'scripts/core/section';


export default class OurAdvantage extends Section {
    isActivated: boolean;


    protected async setupSection() {

        (async () => {
            const el = document.getElementById(CommonComponents.AccordionsList);
            if (!el) {
                return;
            }

            await new AccordionsList({ el }).setup();
        })();

    }

    protected async _activate() {
        if (this.isActivated) {
            return;
        }
    }

    protected _deactivate() {
        /* TODO */
    }


    public resize(width, height) {
        super.resize(width, height);

    }
}

let ourAdvantage: OurAdvantage;

document.addEventListener('astro:page-load', () => {
    const el = document.getElementById(HomePageSections.OurAdvantage);

    if (!el) {
        return;
    }

    ourAdvantage = new OurAdvantage({ el });
    ourAdvantage.setup();
});

document.addEventListener('astro:before-preparation', () => {
    if (!ourAdvantage) {
        return;
    }
    ourAdvantage.unmount();
});
