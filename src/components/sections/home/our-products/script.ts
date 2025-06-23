import { HomePageSections } from 'components/sections/sectionTypes';
import Section from 'scripts/core/section';
import { getApiClient } from 'scripts/utils/apiClient';


export default class OurProducts extends Section {
    private isActivated: boolean;


    async setupSection() {
        new ProductsToggle();
        await this.loadData();
    }

    protected _activate() {
        if (this.isActivated) {
            return;
        }
    }

    protected _deactivate() {
        /* TODO */
    }

    async loadData(){
        const apiClient = getApiClient();
        const vaultBlock = await apiClient.vaultLatestBlocks.readOne({
            vaultId: '68026ee6905992e056c85a75',
        });
        // console.log({vaultBlock});
        if (vaultBlock){
            const sUSPapr = document.querySelectorAll('[data-id="SUSP-apy"] .info-item__value > p');
            if (sUSPapr.length){
                sUSPapr.forEach( item => item.innerHTML = Number(vaultBlock.APYs.NET).toFixed(2)+'%');
            }

            const uspTVLs = document.querySelectorAll('[data-id="USP-tvl"] .info-item__value > p');
            if (uspTVLs.length){
                const intlOptions: Intl.NumberFormatOptions = {
                    maximumFractionDigits: 1,
                    notation: 'compact',
                    currency: 'USD',
                    style: 'currency',
                    compactDisplay: 'short',
                };
                const formatter = new Intl.NumberFormat('en-US', intlOptions);
                uspTVLs.forEach( item => item.innerHTML = formatter.format(Number(vaultBlock.totalSupply)/1e18));
            }

            const suspTVLs = document.querySelectorAll('[data-id="SUSP-tvl"] .info-item__value > p');
            if (suspTVLs.length){
                const intlOptions: Intl.NumberFormatOptions = {
                    maximumFractionDigits: 1,
                    notation: 'compact',
                    currency: 'USD',
                    style: 'currency',
                    compactDisplay: 'short',
                };
                const formatter = new Intl.NumberFormat('en-US', intlOptions);
                suspTVLs.forEach( item => item.innerHTML = formatter.format(Number(vaultBlock.paretoDollar.staking.totalAssets)/1e18));
            }

            const uspPrice = document.querySelectorAll('[data-id="USP-price"] .info-item__value > p');
            if (uspPrice.length){
                const intlOptions: Intl.NumberFormatOptions = {
                    maximumFractionDigits: 2,
                    currency: 'USD',
                    style: 'currency',
                };
                const formatter = new Intl.NumberFormat('en-US', intlOptions);
                uspPrice.forEach( item => item.innerHTML = formatter.format(1));
            }

            const suspPrice = document.querySelectorAll('[data-id="SUSP-price"] .info-item__value > p');
            if (suspPrice.length){
                const intlOptions: Intl.NumberFormatOptions = {
                    maximumFractionDigits: 2,
                    currency: 'USD',
                    style: 'currency',
                };
                const formatter = new Intl.NumberFormat('en-US', intlOptions);
                suspPrice.forEach( item => item.innerHTML = formatter.format(Number(vaultBlock.price)/1e18));
            }
        }
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


