import { HomePageSections } from 'components/sections/sectionTypes';
import Section from 'scripts/core/section';


export default class OurProducts extends Section {
    private isActivated: boolean;



    async setupSection() {
    }

    protected _activate() {
        if (this.isActivated) {
            return;
        }
    }

    protected _deactivate() {
        /* TODO */
    }
}

let ourProductsSection: OurProducts;

document.addEventListener('astro:page-load', () => {
    const el = document.getElementById(HomePageSections.OurProducts);

    if (!el) {
        return;
    }

    ourProductsSection = new OurProducts({ el });
    ourProductsSection.setup();
});

document.addEventListener('astro:before-preparation', () => {
    if (!ourProductsSection) {
        return;
    }
    ourProductsSection.unmount();
});


// Setup scripts for same sections.

// setupManyComponents(HeroSection, [
//     document.getElementById(HomePageSections.Hero),
//     document.getElementById(HomePageSections.Hero),
// ]);
