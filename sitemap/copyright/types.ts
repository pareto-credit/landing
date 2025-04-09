
export const languages = Object.freeze({
    en: 'English',
});

export const defaultLang: Locales = 'en';

export type Locales = keyof typeof languages;

export type PageCopyright<T extends object> = Record<Locales, T>;


export const createStaticPathGetter = () => {
    const result = [];
    Object.keys(languages).forEach(locale => {
        if (locale !== defaultLang) {
            result.push({ params: { lang: locale } });
        }
    });

    return function () { return result; };
};

export const createPageAlterantes = (hostname: string, href: string, currentLocale: Locales) => {
    const pageAlternates = [];
    Object.keys(languages).forEach(locale => {
        if (locale === currentLocale) {
            return;
        }

        pageAlternates.push({
            lang: locale,
            url: `${hostname}/${locale}${href}`,
        });
    });

    return pageAlternates;
};
