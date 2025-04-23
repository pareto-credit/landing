
import { Breakpoints } from 'scripts/appBreakpoints';
import Section from 'scripts/core/section';
import { HomePageSections } from 'components/sections/sectionTypes';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { minWaitPreloader } from 'scripts/utils/constants';

export default class SecondSection extends Section {
    private _rem: number;
    scrollTrigger: globalThis.ScrollTrigger;
    scrollTrigger1: globalThis.ScrollTrigger;
    scrollTrigger2: globalThis.ScrollTrigger;
    scrollDirection: 1 | 0 | -1;


    private setupPinAnimation() {
        const tl = gsap.timeline({});
        tl
            .fromTo({ pause: 0 }, { pause: 0 }, { pause: 1, duration: 100, ease: 'none' })
            .fromTo('.lend .solution-item__futures', { opacity: 1, y: 0 }, { opacity: 0, y: -100, duration: 35, ease: 'none' }, 20)
            .fromTo('.borrow .solution-item__futures', { opacity: 0 }, { opacity: 1, y: 0, duration: 45, ease: 'none' }, 55)
            .fromTo('.lend .solution-item__card', { opacity: 1 }, { opacity: 0, duration: 5, ease: 'none' }, 95);
        const tl1 = gsap.timeline({});
        tl1
            .fromTo({ pause: 0 }, { pause: 0 }, { pause: 1, duration: 100, ease: 'none' })
            .fromTo('.borrow .solution-item__futures', { y: 0, opacity: 1 }, { opacity: 0, y: -100, duration: 35, ease: 'none' }, 20)
            .fromTo('.curate .solution-item__futures', { opacity: 0 }, { opacity: 1, duration: 45, ease: 'none' }, 55)
            .fromTo('.borrow .solution-item__card', { opacity: 1 }, { opacity: 0, duration: 5, ease: 'none' }, 95);
        const tl2 = gsap.timeline({});
        tl2
            .fromTo({ pause: 0 }, { pause: 0 }, { pause: 1, duration: 100, ease: 'none' })

        this.scrollTrigger1 = ScrollTrigger.create({
            trigger: '.borrow',
            start: 'top top+=15%',
            end: 'bottom top',
            pinSpacing: false,
            scrub: true,
            animation: tl1,
            pin: true,
            onUpdate: (self) => {
                const direction = Math.sign(self.getVelocity());
                if (direction !== 0) {
                    this.handleDirectionChange(direction);
                }
            },
        });
        this.scrollTrigger2 = ScrollTrigger.create({
            trigger: '.curate',
            start: 'top top+=15%',
            end: 'bottom center+=10%',
            scrub: true,
            animation: tl2,
            pin: true,
            onUpdate: (self) => {
                const direction = Math.sign(self.getVelocity());
                if (direction !== 0) {
                    this.handleDirectionChange(direction);
                }
            },
        });
        this.scrollTrigger = ScrollTrigger.create({
            trigger: '.lend',
            start: 'top top+=15%',
            end: 'bottom top',
            pinSpacing: false,
            scrub: true,
            animation: tl,
            pin: true,
            onUpdate: (self) => {
                const direction = Math.sign(self.getVelocity());
                if (direction !== 0) {
                    this.handleDirectionChange(direction);
                }
            },
        });
    }

    public unmount() {
        if (this.scrollTrigger) {
            this.scrollTrigger.kill();
        }
        if (this.scrollTrigger1) {
            this.scrollTrigger1.kill();
        }
        if (this.scrollTrigger2) {
            this.scrollTrigger2.kill();
        }
        super.unmount();
    }
    private handleDirectionChange(direction: number) {
        if (direction > 0) {
            this.scrollDirection = 1;
        } else if (direction < 0) {
            this.scrollDirection = -1;
        }
    }

    protected setupContactUsBtns(){
        const btns = document.querySelectorAll('.contact-us-btn');
        btns.forEach( btn => btn.addEventListener('click', function(){
            const parentId = this.attributes['data-parentid'].value;
            const el: HTMLElement = document.querySelector('[for="'+parentId+'"]');
            if (el){
                el.click();
            }
        }) );
    }

    async setupSection() {

        this.setupContactUsBtns();

        if (Breakpoints.isDesktop) {
            // PreloadEvent.on(() => {
            //     this.setupPinAnimation();
            // });

            setTimeout(() => {
                this.setupPinAnimation();
            }
            , minWaitPreloader);
        }
    }

    protected _activate() {
        // todo
    }

    protected _deactivate() {
        /* TODO */
    }

    public resize() {
        this._rem = Breakpoints.Current.rem;
    }
}

let secondSection: SecondSection;

document.addEventListener('astro:page-load', () => {
    const el = document.getElementById(HomePageSections.Solution);

    if (!el) {
        return;
    }

    secondSection = new SecondSection({ el });
    secondSection.setup();
});

document.addEventListener('astro:before-preparation', () => {
    if (!secondSection) {
        return;
    }
    secondSection.unmount();
});
