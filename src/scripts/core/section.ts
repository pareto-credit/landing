import { Breakpoints } from 'scripts/appBreakpoints';
import Component, { type ComponentConfig } from './component';

import { ScrollTrigger, createScrollTrigger } from 'scripts/lib/gsap/scrollTrigger';
import { PreloadEvent } from 'scripts/modules/pageEvents';

export type SectionConfig = ComponentConfig;

export class Section<TConfig extends SectionConfig = SectionConfig> extends Component<TConfig> {
    private _sectionTrigger: ScrollTrigger = null;

    // set this if needed during setupSection
    protected _activationTriggerProps: Omit<ScrollTrigger.StaticVars, 'onEnter' | 'onEnterBack' | 'onLeave' | 'onLeaveBack'> = null;

    get sectionTrigger() { return this._sectionTrigger; }

    constructor(config: TConfig) {
        super(config);
    }

    protected async doSetup() {
        Breakpoints.resizeEvent.on((sizes) => this.resize(sizes.width, sizes.height));

        if (this.element && this.element.style) {
            this.element.style.visibility = 'visible';
        }

        await this.setupSection();

        // console.log(this.element, 'before trigger setup');

        if (this.element) {
            PreloadEvent.on(async () => { this._setupScrollTrigger(); });
        }
        this.resize(Breakpoints.Current.width, Breakpoints.Current.height);
    }

    private _setupScrollTrigger() {
        // console.log(this.element, 'setup trigger');
        this._sectionTrigger = createScrollTrigger({
            trigger: this.element,
            start: 'top bottom-=10%',
            end: 'bottom top-=10%',
            ...this._activationTriggerProps,
            onEnter: () => this.activate({ direction: 1 }),
            onEnterBack: () => this.activate({ direction: -1 }),
            onLeave: () => this.deactivate({ direction: 1 }),
            onLeaveBack: () => this.deactivate({ direction: -1 }),
            markers: false,
        });
    }

    public start(): Promise<void> | void {
        /* override me */
    }

    protected setupSection(): Promise<void> | void {
        /* override me */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public resize(width: number, height: number) {
        /* override me */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public wheel(deltaY: number, wheelDirection: number) {
        /* override me */
    }

    public unmount() {
        this.sectionTrigger.kill();
    }
}

export default Section;
