import Component, { type ComponentConfig } from 'scripts/core/component';
import { TabsComponent } from 'scripts/components/common/tabs';
import gsap from 'gsap';
import { Breakpoints } from 'scripts/appBreakpoints';
import { inFrames } from 'scripts/utils/inFrames';
import { customEaseIn, customEaseOut } from 'scripts/utils/tweenHelpers';
import { getApiClient } from 'scripts/utils/apiClient';
import { BNify } from '@idle-multiverse/data-access';

export class HeroTabs extends Component {
    private tabsComponent: TabsComponent;

    private get _tabs() { return this.element.querySelectorAll('.tabs-list__item') as unknown as NodeListOf<HTMLElement>; }
    private get _links() { return this.element.querySelectorAll('.tabs-links__item') as unknown as NodeListOf<HTMLElement>; }

    private touchStartX: number = 0;
    private touchEndX: number = 0;
    private minSwipeDistance: number = 50;

    constructor(config: ComponentConfig) {
        super(config);
    }

    async loadVaults() {
        const apiClient = getApiClient();
        const [vaults, performances, uspBlock] = await Promise.all([
          apiClient.vaults.search({
            status: 'READY',
            contractType: 'CDO_EPOCH',
            fields: ['_id', 'address', 'visibility', 'siblings'] as any,
          }),
          apiClient.vaults.performances({
            status: 'READY',
          }),
          // TODO: TO REMOVE THIS BULLSHIT ASAP
          apiClient.vaultLatestBlocks.readOne({ vaultAddress: '0x97cCC1C046d067ab945d3CF3CC6920D3b1E54c88' })
        ]);

        // Add Performances
        const tvlEl = document.querySelector('.hero-section__info-blocks-item[data-id="TVL"] p');
        if (tvlEl){
            const intlOptions: Intl.NumberFormatOptions = {
                maximumFractionDigits: 0,
                currency: 'USD',
                style: 'currency',
            };
            const formatter = new Intl.NumberFormat('en-US', intlOptions);
            const tvl = BNify(performances.TVL).minus(BNify(uspBlock.TVL.USD).div(1e6)).plus(BNify(uspBlock.totalSupply).div(1e18)).toNumber();

            tvlEl.innerHTML = formatter.format(tvl);
        }
        const creditExtendedEl = document.querySelector('.hero-section__info-blocks-item[data-id="CE"] p');
        if (creditExtendedEl){
            const intlOptions: Intl.NumberFormatOptions = {
                maximumFractionDigits: 0,
                currency: 'USD',
                style: 'currency',
            };
            const formatter = new Intl.NumberFormat('en-US', intlOptions);
            creditExtendedEl.innerHTML = formatter.format(Number(performances.creditExtended));
        }

        // Add product cards
        const vaultIds = vaults.data.reduce((acc, v) => {
            const siblingIds = v.siblings ? v.siblings.map(v => v._id) : [];
            return [
                ...acc,
                ...siblingIds,
                v._id,
            ];
        }, []);

        const vaultLatestBlocks = await apiClient.vaultLatestBlocks.search({
            vaultId: vaultIds,
        });

        vaults.data.filter(v => v.visibility === 'PUBLIC').forEach(v => {

            const tabEl = document.querySelector('.tabs-list__item[data-address="' + v.address + '"]');

            const vaultBlock = vaultLatestBlocks.data.find(b => b.vaultId === v._id);
            if (!tabEl || !vaultBlock) {
                return false;
            }


            const aprEl = tabEl.querySelector('.info-block__item[data-id="APY"] .value h4');
            if (aprEl) {
              aprEl.innerHTML = Number(vaultBlock.APYs.NET).toFixed(2) + '%';
            }

            const tvlEl = tabEl.querySelector('.info-block__item[data-id="TVL"] .value h4');

            if (tvlEl) {
              const intlOptions: Intl.NumberFormatOptions = {
                maximumFractionDigits: 1,
                notation: 'compact',
                currency: 'USD',
                style: 'currency',
                compactDisplay: 'short',
              };
              const formatter = new Intl.NumberFormat('en-US', intlOptions);

              let totalTvl = Number(vaultBlock.TVL.withRequestsUSD || vaultBlock.TVL.USD);

              v.siblings?.forEach(s => {
                const sBlock = vaultLatestBlocks.data.find((b) => b.vaultId === s._id);
                totalTvl += Number(sBlock.TVL.withRequestsUSD || sBlock.TVL.USD);
              });

              tvlEl.innerHTML = formatter.format(totalTvl / 1000000);
            }

        });
    }

    initializeHeroTabs() {
        new HeroTabs({
            el: document.querySelector('.tabs'),
        }).setup();
    }

    async doSetup() {

        this.tabsComponent = new TabsComponent({
            el: this.element,
            tabs: Array.from(this._tabs) as unknown as NodeListOf<HTMLElement>,
            links: Array.from(this._links) as unknown as NodeListOf<HTMLElement>,
            syncActivate: true,
            clicksEnabled: true,
            hoversEnabled: true,
            onChanging: (prev, next, direction) => {
                if (!prev) {
                    gsap.set(next.tabs[0].element, { opacity: 1, zIndex: 1 });
                    return;
                }
                if (Breakpoints.isMobile) {
                    const tl = gsap.timeline();
                    if (direction > 0) {
                        tl
                            .set('.tabs-list__placeholder', { opacity: 0, zIndex: 0 })
                            .fromTo(prev.tabs[0].element, { opacity: 1, xPercent: 0 }, { opacity: 0, xPercent: -30, zIndex: 0, duration: 0.3 })
                            .fromTo(next.tabs[0].element, { opacity: 0, xPercent: 30 }, { opacity: 1, xPercent: 0, zIndex: 1, duration: 0.3 }, '<')
                            .fromTo('.tabs-list__placeholder', { zIndex: 0, xPercent: 30 }, { xPercent: 0, zIndex: 1, duration: 0.3 }, '<');
                        return;
                    } else {
                        tl
                            .set('.tabs-list__placeholder', { opacity: 0, zIndex: 0 })
                            .fromTo(prev.tabs[0].element, { opacity: 1, xPercent: 0 }, { opacity: 0, xPercent: 30, zIndex: 0, duration: 0.3 })
                            .fromTo(next.tabs[0].element, { opacity: 0, xPercent: -30 }, { opacity: 1, xPercent: 0, zIndex: 1, duration: 0.3 }, '<')
                            .fromTo('.tabs-list__placeholder', { zIndex: 0, xPercent: -30 }, { xPercent: 0, zIndex: 1, duration: 0.3 }, '<');
                        return;
                    }
                }
                const tl = gsap.timeline();
                // tl
                //     .fromTo(prev.tabs[0].element, { opacity: 1 }, { opacity: 0, zIndex:0, duration: 1 })
                //     .fromTo(next.tabs[0].element, { opacity: 0 }, { opacity: 1, zIndex: 1, duration: 1 }, '<');
                tl
                    .fromTo(prev.tabs[0].element, { opacity: 1 }, { opacity: 0, zIndex: 0, duration: inFrames(20), ease: customEaseOut })
                    .fromTo(next.tabs[0].element, { opacity: 0 }, { opacity: 1, zIndex: 1, duration: inFrames(20), ease: customEaseIn }, '<+=0.1999');
            },

        });

        await this.tabsComponent.setup();
        this.tabsComponent.setActiveIndex(0);
        if (Breakpoints.isMobile) {
            this.initializeSwipeHandlers();
        }

    }


    private initializeSwipeHandlers() {
        const tabsElement = this.element;

        tabsElement.addEventListener('touchstart', (e: TouchEvent) => {
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });

        tabsElement.addEventListener('touchend', (e: TouchEvent) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        }, { passive: true });
    }

    private handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        const currentIndex = this.tabsComponent.currentIndex;
        const totalTabs = this._tabs.length;

        if (Math.abs(swipeDistance) >= this.minSwipeDistance) {
            if (swipeDistance > 0) {
                // swipe right - previous tab
                const newIndex = currentIndex === 0 ? totalTabs - 1 : currentIndex - 1;
                this.tabsComponent.setActiveIndex(newIndex);
            } else if (swipeDistance < 0) {
                // swipe left - next tab
                const newIndex = currentIndex === totalTabs - 1 ? 0 : currentIndex + 1;
                this.tabsComponent.setActiveIndex(newIndex);
            }
        }
    }

}


