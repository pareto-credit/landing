import { HomePageSections } from 'components/sections/sectionTypes';
import gsap from 'gsap';
import { Breakpoints } from 'scripts/appBreakpoints';
import Section from 'scripts/core/section';
import { type ChangeColorHeaderConfig, HeaderColorClass, setupTriggerChangeColorHeader } from 'scripts/modules/changeHeaderColor';
import { minWaitPreloader } from 'scripts/utils/constants';


export default class Transparent extends Section {
    isActivated: boolean;
    protected direction: 1 | 0 | -1;
    private trigger: ScrollTrigger;
    private trigger1: ScrollTrigger;


    protected async setupSection() {
        setTimeout(() => {
            this._setupChangeColorHeader();
            this.trigger.refresh();
            if (this.trigger1) {
                this.trigger1.refresh();
                this.trigger1.update();
            }
        }, minWaitPreloader);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
    }

    private _setupChangeColorHeader() {

        const colorConfigBlack: ChangeColorHeaderConfig = {
            element: document.querySelector('.transparent-section') as unknown as HTMLElement,
            color: HeaderColorClass.Black,
            triggerVars: {
                start: 'top top+=10%',
                end: 'bottom top+=10%',
                onUpdate: (event) => {
                    this.direction = event.direction as 1 | 0 | -1;
                },
            },
        };

        this.trigger = setupTriggerChangeColorHeader(colorConfigBlack);
        if (Breakpoints.isMobile) {

            const colorConfigBlack: ChangeColorHeaderConfig = {
                element: document.querySelector('.footer') as unknown as HTMLElement,
                color: HeaderColorClass.Black,
                triggerVars: {
                    start: 'top top+=10%',
                    end: 'bottom top+=10%',
                    onUpdate: (event) => {
                        this.direction = event.direction as 1 | 0 | -1;
                    },
                },
            };

            this.trigger1 = setupTriggerChangeColorHeader(colorConfigBlack);
        }

    }

    protected async _activate() {
        if (this.isActivated) {
            return;
        }
    }

    public unmount(): void {
        this.trigger.kill();
        if (this.trigger1) {
            this.trigger1.kill();
        }
        super.unmount();
    }

    protected _deactivate() {
        /* TODO */
    }


    public resize(width, height) {
        super.resize(width, height);

    }
}

let transparent: Transparent;

document.addEventListener('astro:page-load', () => {
    const el = document.getElementById(HomePageSections.Transparent);
    if (!el) {
        return;
    }
    transparent = new Transparent({ el });
    transparent.setup();
});

document.addEventListener('astro:before-preparation', () => {
    if (!transparent) {
        return;
    }
    transparent.unmount();
});
