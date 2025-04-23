import { HomePageSections } from 'components/sections/sectionTypes';
import Section from 'scripts/core/section';
import { parse } from 'rss-to-json';

export default class NewsSection extends Section {
    isActivated: boolean;


    protected async setupSection() {
        this.populateNewsSection();
    }

    protected async populateNewsSection() {
        const feedUrl = 'https://api.paragraph.com/blogs/rss/@pareto';
        try {
            const feed = await parse(feedUrl);
            const items = document.querySelectorAll('.news-section__list__item');

            feed.items.slice(0, items.length).forEach((item, index) => {
                const container = items[index];
                const link: HTMLAnchorElement = container.querySelector('a.news-section__list__item__link');
                const img: HTMLImageElement = container.querySelector('.news-section__list__item__img img');
                const title = container.querySelector('h4.title-h3');
                const desc = container.querySelector('p.desc-2');
                const btnText = container.querySelector('.btn-secondary .nav');

                link.href = item.link;
                title.textContent = item.title || 'No title';
                desc.textContent = item.description || 'No description';

                let imageUrl = '';
                if (item.enclosures?.length) {
                    imageUrl = item.enclosures[0].url;
                } else {
                    const match = item.content?.match(/<img[^>]+src="([^">]+)"/);
                    if (match) {
                        imageUrl = match[1];
                    }
                }

                if (imageUrl) {
                    img.src = imageUrl;
                    img.setAttribute('data-src', imageUrl);
                    img.alt = item.title || 'Blog image';
                }


                btnText.textContent = 'Read more';
            });

        } catch (error) {
            console.error('Error loading RSS feed:', error);
        }
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
