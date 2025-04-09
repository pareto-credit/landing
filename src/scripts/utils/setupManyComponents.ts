
export const setupManyComponents = (component, elements: HTMLElement[]) => {
    elements.forEach(s => new component({ el: s }).setup());
};
