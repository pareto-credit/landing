import gsap from 'gsap';
import type Lenis from 'lenis';
import { getLenis } from 'scripts/modules/setupLenis';

export default class MobileMenu {

    private body: HTMLElement;

    private isOpen = false;
    private isAnim = false;
    private lenis: Lenis;
    menu: HTMLElement;
    btns: NodeListOf<HTMLElement>;
    show: () => void;
    hide: () => void;

    constructor(config: modalConfig) {
        this.menu = config.menu;
        this.btns = config.btns;
        this.show = config.show || (() => { /* */ });
        this.hide = config.hide || (() => { /* */ });
        this.body = document.querySelector('body');
        this.lenis = getLenis();

        this.setupBurger();
    }

    async open(manageCurtain?: boolean) {
        if (this.isOpen || this.isAnim) {
            return;
        }
        this.isAnim = true;

        this.lenis?.stop();
        this.menu.classList.add('opened');
        this.body.classList.add('mobile-menu-open');
        this.btns.forEach(b => {
            b.classList.add('active');
        });

        if(manageCurtain) {
        }

        await gsap.set(this.menu, { display: 'flex', visibility: 'visible' });
        await this.show();
        if(manageCurtain) {
        }

        this.isOpen = true;
        this.isAnim = false;
    }

    async close(manageCurtain?: boolean) {
        if (!this.isOpen || this.isAnim) {
            return;
        }

        this.isAnim = true;
        await this.hide();
        if(manageCurtain) {
        }

        await gsap.set(this.menu, { display: 'none', visibility: 'hidden' });
        this.menu.classList.remove('opened');
        this.body.classList.remove('mobile-menu-open');
        this.btns.forEach(b => {
            b.classList.remove('active');
        });
        this.lenis?.start();

        if(manageCurtain) {
        }

        this.isOpen = false;
        this.isAnim = false;

    }

    clearProps() {
        gsap.set(this.menu, { clearProps: 'all' });
    }

    setupBurger() {
        this.btns.forEach(b => {
            b.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleState(true);
            });
        });
    }

    toggleState = (manageCurtain?: boolean) => {
        if (this.isOpen) {
            this.close(manageCurtain);
        } else {
            this.open(manageCurtain);
        }
    };
}

type modalConfig = {
    menu: HTMLElement,
    btns: NodeListOf<HTMLElement>,
    curtain?: boolean,
    show?: () => void,
    hide?: () => void
};

export function createMobileMenu(config?: modalConfig) {
    return new MobileMenu(config);
}
