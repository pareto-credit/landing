import { HomePageSections } from 'components/sections/sectionTypes';
import gsap from 'gsap';
import Section from 'scripts/core/section';


export default class NewsSection extends Section {
    isActivated: boolean;


    protected async setupSection() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
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

let news: NewsSection;

document.addEventListener('astro:page-load', () => {
    const el = document.getElementById(HomePageSections.News);

    if (!el) {
        return;
    }

    news = new NewsSection({ el });
    news.setup();
});

document.addEventListener('astro:before-preparation', () => {
    if (!news) {
        return;
    }
    news.unmount();
});
