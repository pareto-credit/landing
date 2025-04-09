import { links } from '../links';

import twitterIcon from '/src/assets/img/footer/twitterIcon.svg?raw';
import discordIcon from '/src/assets/img/footer/discordIcon.svg?raw';
import telegramIcon from '/src/assets/img/footer/telegramIcon.svg?raw';
import linkedinIcon from '/src/assets/img/footer/linkedinIcon.svg?raw';
import paragraphIcon from '/src/assets/img/footer/paragraphIcon.svg?raw';


export const FooterEnCopy = {
    ResourcesTitle: 'Resources',
    ProductsTitle: 'Products',
    InputTitle: 'Subscribe to our newsletter',
    InputPlaceholder: 'Email',
    InputButton: 'Subscribe',
    Resources: [
        {
            title: 'Blog',
            link: links.blog,
        },
        {
            title: 'Documentation',
            link: links.documentation,
        },
        {
            title: 'Brand kit',
            link: links.brandKit,
        },
        {
            title: 'Governance',
            link: links.governance,
        },
    ],
    Products: [
        {
            title: 'Fas_USDC',
            link: links.Fas_USDC,
        },
        {
            title: 'BAS_USDT',
            link: links.BAS_USDT,
        },
        {
            title: 'FAL_USDC',
            link: links.FAL_USDC,
        },
    ],
    Social: [
        {
            icon : twitterIcon,
            title: 'Twitter',
            link: links.x,
        },
        {
            icon: discordIcon,
            title: 'Discord',
            link: links.discord,
        },
        {
            icon: telegramIcon,
            title: 'Telegram',
            link: links.telegram,
        },
        {
            icon: linkedinIcon,
            title: 'LinkedIn',
            link: links.linkedin,
        },
        {
            icon: paragraphIcon,
            title: 'Paragraph',
            link: links.paragraph,
        },
    ],
    PolicyLink:[
        {
            title: 'IPFS app',
            link: links.IPFSapp,
        },
        {
            title: 'Terms of Service',
            link: links.TermsofService,
        },
        {
            title: 'Privacy Policy',
            link: links.PrivacyPolicy,
        },
        {
            title: 'Cookie Policy',
            link: links.CookiePolicy,
        },
    ],
    Desc: 'All content available on this Website is general in nature, not directed or tailored to any particular person, and is for informational purposes only. Neither the Website nor any of its content is offered as investment advice and should not be deemed as investment advice or a recommendation to purchase or sell any specific security. The information contained herein reflects the opinions and projections of  Pareto as of the date hereof, which are subject to change without notice at any time. Pareto does not represent that any opinion or projection will be realized. Neither Pareto nor any of its advisers, officers, directors, or affiliates represents that the information presented on this Website is accurate, current, or complete, and such information is subject to change without notice. Any performance information must be considered in conjunction with applicable disclosures. Past performance is not a guarantee of future results. Neither this Website nor its contents should be construed as legal, tax, or other advice. Individuals are urged to consult with their own tax or legal advisers before entering into any advisory contract.',
};
