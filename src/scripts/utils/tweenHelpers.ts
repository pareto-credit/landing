
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

const customEase = CustomEase.create('customEase', 'M0,0 C0.17,0.17 0.22,1 1,1 ');
export const customEase43 = CustomEase.create('custom43', 'M0,0 C0.17,0.17 0.43,1 1,1 ');


export const customEaseOut = CustomEase.create('customOut', 'M0,0 C0.57,0 0.83,0.83 1,1 ');
export const customEaseIn = CustomEase.create('customIn', 'M0,0 C0.17,0.17 0.43,1 1,1');

function hideElements(elements) {
    gsap.set(elements, { autoAlpha: 0 });
}

function clearTweens(elements) {
    gsap.killTweensOf(elements);
}

export default {
    customEase,
    customEase43,
    hideElements,
    clearTweens,
};
