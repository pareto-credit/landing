import type { PageCopyright } from './copyright';

export type SitePage<TCopy extends object = any> = {
    /** unique page ID */
	id: string | number;
    /** page's title, also used in meta */
	title?: string;
    /** page's description for meta */
	description?: string;
    /** page's meta image, relative to `assets/img` folder */
	image?: string;
    /** how this instance should be referenced via URL, relative path */
    href: string,
	// canonical?: string;
    /** page's copy, usually a structured object specific for this page type */
    copy: PageCopyright<TCopy>,
	noIndex?: boolean;
	disableScripts?: boolean | 'force';
};

