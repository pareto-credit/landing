
import Component, { type ComponentConfig } from 'scripts/core/component';
import gsap from 'gsap';
import { inFrames } from 'scripts/utils/inFrames';
import { Breakpoints, BreakpointType } from 'scripts/appBreakpoints';


const speed = {
    [BreakpointType.Desktop]: 0,
    [BreakpointType.Tablet]: 150,
    [BreakpointType.Mobile]: 200,
};

const tickerClass = 'ticker-items';


export class RunningLineComponent extends Component {
    private tickerWidth: number;
    tickerAnim: gsap.core.Tween;

    private get tickerElement() { return this.element.querySelectorAll('.ticker'); }


    constructor(config: ComponentConfig) {
        super(config);
    }

    async doSetup() {


        const target = document.querySelectorAll('.text-js');
        target.forEach((element) => {
            this.setupTickerLine(element as HTMLElement, tickerClass);
        });

        this.tickerWidth = (target[0] as HTMLElement).offsetWidth;
    }

    private setupTickerLine(element: HTMLElement, tickerClass: string) {
        const original_htmlRev = element.innerHTML;
        const new_htmlRev = `<div class='${tickerClass}'>` + original_htmlRev + '</div>';
        element.innerHTML = new_htmlRev;
        element.innerHTML += new_htmlRev;
    }

    public stop(){
        this.tickerAnim.kill();
    }

    private get breakpointType () {
        return Breakpoints.Current.breakpoint.name;
    }


    public activate = async () => {
        const initDuration = this.tickerWidth / speed[this.breakpointType];
        this.tickerAnim = gsap.fromTo(`.${tickerClass}`, {
            xPercent: -100,
        }, {
            duration: initDuration,
            xPercent: 0,
            ease: 'none',
            repeat: -1,
        });

    };

    public deactivate = async () => {
        this.tickerAnim.kill();
    };

    public show = async () => {
        gsap.set(this.element, { autoAlpha: 1 });
        return gsap.timeline()
            .add(() => { this.activate(); }, inFrames(10));
    };


    public hide = async () => {
        return gsap.timeline()
            .add(() =>{ this.deactivate(); } , inFrames(20))
        ;
    };
}

