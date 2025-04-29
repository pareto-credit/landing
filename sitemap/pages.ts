import { HomeCopyright, type HomeCopyrightShape } from './copyright';
import { type SitePage } from './types';

export enum PagesRoutes {
    Home = '/',
    About = '/about',
    Error404 = '/404',
    NotSupported = '/not-supported',
    NoScript = '/no-script'
}

export const BaseMeta = {
    Title: 'Pareto | Radically transforming credit, on-chain',
    Description: 'Building a private credit marketplace that connects institutional lenders and borrowers, offering scalable yield opportunities',
};

export const HomePage: SitePage<HomeCopyrightShape> = {
    id: 'home',
    href: PagesRoutes.Home,
    title: 'Pareto | Radically transforming credit, on-chain',
    description: 'Building a private credit marketplace that connects institutional lenders and borrowers, offering scalable yield opportunities',
    copy: HomeCopyright,
};


export const Page404: SitePage = {
    id: '404',
    href: PagesRoutes.Error404,
    title: 'Page Not Found',
    description: '',
    copy: undefined,
    disableScripts: true,
};

export const NotSupported: SitePage = {
    id: 'not-supported',
    href: PagesRoutes.NotSupported,
    title: '',
    description: '',
    copy: undefined,
    disableScripts: true,
};

export const NoScript: SitePage = {
    id: 'no-script',
    href: PagesRoutes.NoScript,
    title: 'Enable JavaScript',
    description: 'This website requires scripts to be enabled/allowed in your browser.',
    copy: undefined,
    noIndex: true,
    disableScripts: 'force',
};

export const NoScriptId = NoScript.id;

const pages: SitePage[] = [
    HomePage,
    Page404,
    NotSupported,
    NoScript,
];

export default pages;
