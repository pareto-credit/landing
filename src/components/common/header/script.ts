import Component, { type ComponentConfig } from 'scripts/core/component';
import { CommonComponents } from '../commonTypes';
import gsap from 'gsap';

class Header extends Component {
    constructor(config: ComponentConfig) {
        super(config);
    }

    doSetup() {
        // TODO
    }

    resize() {
        // TODO
    }

    public async show() {
        gsap.to(this.element, { autoAlpha: 1 });
    }

    public async hide() {
        gsap.to(this.element, { autoAlpha: 0 });
    }
}

new Header({ el: document.getElementById(CommonComponents.Header) }).setup();
