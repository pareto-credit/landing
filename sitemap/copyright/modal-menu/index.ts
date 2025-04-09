import type { PageCopyright } from '../types';
import { modalMenuEnCopy } from './en';

export type ModalMenuCopyrightShape = typeof modalMenuEnCopy;

export const ModalMenuCopyright: PageCopyright<ModalMenuCopyrightShape> = {
    en: modalMenuEnCopy,
};
