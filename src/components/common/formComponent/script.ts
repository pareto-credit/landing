import Component, { type ComponentConfig } from 'scripts/core/component';
import { Breakpoints } from 'scripts/appBreakpoints';
import gsap from 'gsap';

export class FormComponent extends Component {
    private roleSections: Record<string, NodeListOf<HTMLElement>>;
    private roleRadios: NodeListOf<HTMLInputElement>;

    constructor(config: ComponentConfig) {
        super(config);
    }

    async doSetup() {
        this.setupRoleRadios();
    }

    private setupRoleRadios() {
        this.roleRadios = document.querySelectorAll('input[type="radio"][name="role"]');
        this.roleSections = {
            lender: document.querySelectorAll('.form-list-item--deposit'),
            borrower: document.querySelectorAll('.form-list-item--borrow'),
            curator: document.querySelectorAll('.form-list-item--focus'),
        };

        if (!this.roleRadios.length) return;

        this.roleRadios.forEach(radio =>
            radio.addEventListener('change', () => this.updateVisibleSection()),
        );

        this.updateVisibleSection();
    }

    private updateVisibleSection() {
        Object.values(this.roleSections).forEach(group => {
            gsap.set(group, { display: 'none' });
        });

        const selectedRole = this.getSelectedRole();

        if (selectedRole) {
            gsap.set(this.roleSections[selectedRole], { display: 'flex' });
        }
    }

    private getSelectedRole(): string | null {
        const selectedRadio = Array.from(this.roleRadios).find(radio => radio.checked);
        return selectedRadio ? selectedRadio.value : null;
    }

    private get currentBreakpoint() {
        return Breakpoints.Current.breakpoint.name;
    }
}
