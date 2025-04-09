import { HomePageSections } from 'components/sections/sectionTypes';
import gsap from 'gsap';
import Section from 'scripts/core/section';
import Reeller from 'reeller';
import { RunningLineComponent } from 'components/common/runningLine/script';
import { Breakpoints } from 'scripts/appBreakpoints';


export default class Ecosystem extends Section {
    isActivated: boolean;
    line: RunningLineComponent;


    protected async setupSection() {

        if( !Breakpoints.isDesktop){

            this.line = await new RunningLineComponent({ el: document.getElementById('ticker-container') }).setup();
            this.line.show();
        }

        // const reeller = new Reeller({
        //     container: '.my-reel',
        //     wrapper: '.my-reel-wrap',
        //     itemSelector: '.my-reel-item',
        //     speed: 25,
        // });
    }


    protected async _activate() {

        if (this.isActivated) {
            return;
        }
    }

    protected _deactivate() {
        /* TODO */
    }


    public resize(width, height) {
        super.resize(width, height);

    }
}

let ecosystem: Ecosystem;

document.addEventListener('astro:page-load', () => {
    const el = document.getElementById(HomePageSections.Ecosystem);

    if (!el) {
        return;
    }

    ecosystem = new Ecosystem({ el });
    ecosystem.setup();
});

document.addEventListener('astro:before-preparation', () => {
    if (!ecosystem) {
        return;
    }
    ecosystem.unmount();
});
