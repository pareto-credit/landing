import { title } from 'process';
import { links } from '../links';

export const HeaderEnCopy = {
    appBtn:{
        title: 'Enter App',
        href: links.app,
    },
    links: [
        {
            title: 'Product',
            href: links.product,
            isAnchor: false,
        },
        {
            title: 'Features',
            href: links.features,
            isAnchor: true,
        },
        {
            title: 'Partners',
            href: links.partners,
            isAnchor: true,
        },
    ],
};
