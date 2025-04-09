import { FormComponent } from 'components/common/formComponent/script';
import { HomePageSections } from 'components/sections/sectionTypes';
import gsap from 'gsap';
import Section from 'scripts/core/section';


export default class GetInTouch extends Section {
    isActivated: boolean;
    private _form: FormComponent;


    protected async setupSection() {

        this._form = new FormComponent({ el: this.element.querySelector('.form') });
        this._form.setup();
    }

    protected async _activate() {
        if (this.isActivated) {
            return;
        }
    }

    protected _deactivate() {
        /* TODO */
    }


    public resize(width, height) {
        super.resize(width, height);

    }
}

let getInTouch: GetInTouch;

document.addEventListener('astro:page-load', () => {
    const el = document.getElementById(HomePageSections.GetInTouch);

    if (!el) {
        return;
    }

    getInTouch = new GetInTouch({ el });
    getInTouch.setup();
});

document.addEventListener('astro:before-preparation', () => {
    if (!getInTouch) {
        return;
    }
    getInTouch.unmount();
});
