import type { PageCopyright } from '../types';
import { HeaderEnCopy } from './en';

export type HeaderCopyrightShape = typeof HeaderEnCopy;

export const HeaderCopyright: PageCopyright<HeaderCopyrightShape> = {
    en: HeaderEnCopy,
};
