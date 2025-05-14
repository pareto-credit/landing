import { HomePageSections } from 'components/sections/sectionTypes';
import Section from 'scripts/core/section';


export default class OurProducts extends Section {
    private isActivated: boolean;


    async setupSection() {
        new ProductsToggle();
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

export class ProductsToggle {
    private buttons: NodeListOf<HTMLButtonElement>;
    private slider: HTMLElement | null;
    private contents: NodeListOf<HTMLElement>;

    constructor() {
        this.buttons = document.querySelectorAll('.toggle-button');
        this.slider = document.querySelector('.toggle-slider');
        this.contents = document.querySelectorAll('[class*="content-item-"]');
        this.init();
    }

    private init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.handleToggle(button));
        });
        this.contents.forEach(content => {
            if (content.classList.contains('content-item-0')) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    }

    private handleToggle(clickedButton: HTMLButtonElement) {
        const targetId = clickedButton.dataset.id;

        this.buttons.forEach(button => {
            button.classList.remove('active');
        });
        clickedButton.classList.add('active');

        if (this.slider && targetId === '1') {
            this.slider.classList.add('slide');
        } else if (this.slider) {
            this.slider.classList.remove('slide');
        }

        this.contents.forEach(content => {
            if (content.classList.contains(`content-item-${targetId}`)) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    }
}


