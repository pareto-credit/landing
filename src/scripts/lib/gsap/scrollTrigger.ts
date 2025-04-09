import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

export const isTouchDevice = ScrollTrigger.isTouch === 1;
// ScrollTrigger.normalizeScroll(isTouchDevice);

export const createScrollTrigger = (vars: ScrollTrigger.StaticVars) => {
    return ScrollTrigger.create({
        anticipatePin: vars.pin ? 1 : 0,
        ...vars,
    });
};

export { ScrollTrigger };
