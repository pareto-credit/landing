/* eslint-disable no-console */
import type Lenis from 'lenis';
import gsap from 'gsap';
import { Breakpoints } from 'scripts/appBreakpoints';

export default function anchors(enableScroll: boolean, lenis?: Lenis, mobileMenu?) {
    const anchors: NodeListOf<HTMLElement> = document.querySelectorAll('.anchor-item');

    const calculateScrollPosition = (element) => {
        const top = element.getBoundingClientRect().y + window.scrollY;
        return top;
    };

    anchors.forEach((anchor) => {
        if (enableScroll) {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = anchor.dataset.anchor;
                if (!targetId) {
                    console.warn('Anchor dataset is missing "data-anchor" attribute');
                    return;
                }

                const element = document.querySelector(`#${targetId}`);
                if (!element) {
                    console.warn(`Element with id "${targetId}" not found`);
                    return;
                }

                const scrollPosition = window.scrollY;
                const elementPosition = element.getBoundingClientRect().y + scrollPosition;

                if (elementPosition - window.innerHeight === scrollPosition) {
                    return;
                }

                const top = calculateScrollPosition(element);
                const tl = gsap.timeline();
                if (lenis) {
                    if (!Breakpoints.isMobile) {
                        tl
                            .fromTo({ pause: 0 }, { pause: 0 }, { pause: 1, duration: 1 }, 0)
                            .fromTo('main', { opacity: 1 }, { opacity: 0, duration: 0.2 }, 0)
                            .add(() => { lenis.scrollTo(top, { duration: .3, easing: (t) => t }); }, 0.2)
                            .fromTo('main', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5);
                    } else {
                        window.scrollTo({
                            top,
                            behavior: 'smooth',
                        });
                    }

                } else {
                    tl
                        .fromTo({ pause: 0 }, { pause: 0 }, { pause: 1, duration: 1 }, 0)
                        .fromTo('main', { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0)
                        .fromTo('main', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.7);
                    window.scrollTo({
                        top,
                        behavior: 'smooth',
                    });
                }
                // window.scrollTo(0, top);
                if (mobileMenu?.isOpen) {
                    mobileMenu.toggleState();
                }
            });
        }
    });

}
