import { gsap } from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';

gsap.registerPlugin(CustomEase);

export function createCustomEase(name: string, points: string) {
    if (import.meta.env.SSR) {
        return null;
    }

    return CustomEase.create(name, points);
}
