import { createScrollTrigger } from 'scripts/lib/gsap/scrollTrigger';

// const header = document.querySelector('.header');

export enum HeaderColorClass {
    Black = 'color-black',
}

function clearColorClasses(element) {
    element?.classList.forEach((className) => {
        if (className.startsWith('color-')) {
            element.classList.remove(className);
        }
    });
}

export function clearHeaderMenuColor() {
    clearColorClasses(document.querySelector('.header'));
}

export function checkHeaderMenuColor(color) {
    return document.querySelector('.header').classList.contains(color);
}

export function addHeaderMenuColor(className) {
    document.querySelector('.header').classList.add(className);
}

export type ChangeColorHeaderConfig = {
    element: HTMLElement | string;
    color?: HeaderColorClass;
    triggerVars?: ScrollTrigger.Vars;
};

export function setupTriggerChangeColorHeader(config: ChangeColorHeaderConfig) {

    const { element, color, triggerVars } = config;
    return createScrollTrigger({
        trigger: element,
        onEnter: () => updateHeaderMenuColor(color),
        onEnterBack: () => updateHeaderMenuColor(color),
        onLeave: () => updateHeaderMenuColor(),
        onLeaveBack: () => updateHeaderMenuColor(),
        ...triggerVars,
    });
}

function updateHeaderMenuColor(color?) {
    clearHeaderMenuColor();
    if (color) {
        addHeaderMenuColor(color);
    }
}
