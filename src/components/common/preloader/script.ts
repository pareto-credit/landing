import Component, { type ComponentConfig } from 'scripts/core/component';
import gsap from 'gsap';
import { PRELOADER_ACTIVE_CLASS } from 'scripts/utils/constants';
import { scrollToTop } from 'scripts/utils/scrollToTop';
import type Lenis from 'lenis';
import { getLenis } from 'scripts/modules/setupLenis';

export class Preloader extends Component {
    private _smoother: Lenis;

    constructor(config: ComponentConfig, smoother?: Lenis) {
        super(config);

        this._smoother = smoother || getLenis();
    }

    doSetup() {
        this.disableScroll();
    }

    public async show() {
        document.body.classList.add(PRELOADER_ACTIVE_CLASS);
        this.disableScroll();

        gsap.to(this.element, { autoAlpha: 1 });
    }

    public async hide() {
        // await gsap.set(this.element, { autoAlpha: 0 });
        this.enableScroll();
        document.body.classList.remove(PRELOADER_ACTIVE_CLASS);
    }

    private enableScroll = () => {
        this._smoother?.start();
    };

    private disableScroll = () => {
        this._smoother?.stop();
        scrollToTop();
    };
}
