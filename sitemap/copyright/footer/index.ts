import type { PageCopyright } from '../types';
import { FooterEnCopy } from './en';

export type FooterCopyrightShape = typeof FooterEnCopy;

export const FooterCopyright: PageCopyright<FooterCopyrightShape> = {
    en: FooterEnCopy,
};
