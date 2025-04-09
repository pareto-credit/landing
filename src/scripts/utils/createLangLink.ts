export const createLangLink = <T>(pathname: string, langCode: string, languages: T, defaultLang: string) => {
    let isLangcodeExist = false;
    const pathItems = pathname.split('/');
    const languageCodes = Object.keys(languages);

    const langLinkItems = pathItems.map(item => {
        if (languageCodes.includes(item)) {
            isLangcodeExist = true;
            return langCode;
        }
        return item;
    });

    if (!isLangcodeExist && langCode !== defaultLang) {
        langLinkItems.splice(1, 0, langCode);
    }
    if (isLangcodeExist && langCode === defaultLang) {
        langLinkItems.splice(1, 1);
    }

    return langLinkItems.join('/');
};
