import { HeroTabs } from 'components/common/tabs/script';
import { HomePageSections } from 'components/sections/sectionTypes';
import { Breakpoints } from 'scripts/appBreakpoints';
import Section from 'scripts/core/section';
import SequenceComponent, { type SequenceConfig } from 'scripts/modules/sequence';


export default class MainScene extends Section {
    isActivated: boolean;
    seq: SequenceComponent;


    protected async setupSection() {
        HeroTabs.prototype.initializeHeroTabs();
        HeroTabs.prototype.loadVaults();
        this.setupSequence();
    }

    protected async _activate() {
        // this.seq.activate();
        if (this.isActivated) {
            return;
        }
    }

    private setupSequence() {
        if(Breakpoints.isMobile) return;

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sequenceConfig: SequenceConfig = {
            loopConfig:{
                loopDuration: 4.2,
                framesPerLoop: 126,
                transitionStartScrollOffset: 1,
                loopStartFrame: 0,
                loopEndFrame: 126,
                transitionDuration: 1,
            },
            el: this.element,
            triggerElement: this.element.querySelector('.timeline'),
            canvasElement: this.element.querySelector('.canvas'),
            totalFrames: {
                Desktop: 126,
                Tablet: 126,
                Mobile: 126,
            },
            countPreloadFrames: 30,
        };
        this.seq = new SequenceComponent(sequenceConfig);
        this.seq.setup();
    }

    protected _deactivate() {
        /* TODO */
    }


    public resize(width, height) {
        super.resize(width, height);

    }
}

let heroSection: MainScene;

document.addEventListener('astro:page-load', () => {
    const el = document.getElementById(HomePageSections.Hero);

    if (!el) {
        return;
    }

    heroSection = new MainScene({ el });
    heroSection.setup();
});

document.addEventListener('astro:before-preparation', () => {
    if (!heroSection) {
        return;
    }
    heroSection.unmount();
});
