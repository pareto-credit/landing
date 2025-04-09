import Component, { type ComponentConfig } from 'scripts/core/component';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BreakpointType, Breakpoints } from 'scripts/appBreakpoints';
import { ParallelQueue } from '@zajno/common/structures/queue/parallel';


export type SequenceConfig = ComponentConfig & {
    triggerElement: HTMLElement,
    canvasElement: HTMLCanvasElement,
    loopConfig?: {
        loopDuration: number,
        framesPerLoop: number,
        transitionStartScrollOffset: number,
        loopStartFrame: number,
        loopEndFrame: number,
        transitionDuration: number,
    }
    countPreloadFrames?: number,
    offsetVideoEnd?: {
        [BreakpointType.Desktop]: number,
        [BreakpointType.Tablet]: number,
        [BreakpointType.Mobile]: number
    },
    totalFrames: {
        [BreakpointType.Desktop]: number,
        [BreakpointType.Tablet]: number,
        [BreakpointType.Mobile]: number
    },
    animationTimeline?: {
        [BreakpointType.Desktop]: gsap.core.Timeline,
        [BreakpointType.Tablet]: gsap.core.Timeline,
        [BreakpointType.Mobile]: gsap.core.Timeline,
    }
};

export default class SequenceComponent extends Component<SequenceConfig> {
    private isActivated: boolean;
    private _currentFrame: { contents: number } = { contents: 1 };
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _frameImages: Map<number, HTMLImageElement> = new Map();


    private isLooping = false;
    private lastScrollPosition = 0;

    private scrollTrigger: globalThis.ScrollTrigger;
    private _rem: number;
    private animationTimeline: { Desktop: gsap.core.Timeline; Tablet: gsap.core.Timeline; Mobile: gsap.core.Timeline; };
    private triggerElement: HTMLElement;
    private _canvasElement: HTMLCanvasElement;
    private totalFrames: { Desktop: number; Tablet: number; Mobile: number; };
    private offsetVideoEnd: { Desktop: number; Tablet: number; Mobile: number; };
    private countPreloadFrames: number;
    private isLoopActive: boolean;
    private loopDuration: number;
    private framesPerLoop: number;
    private transitionStartScrollOffset: number;
    private loopStartFrame: number;
    private loopEndFrame: number;
    private transitionDuration: number;
    private idAnimation: number;
    private get _currentBreakpointType() { return Breakpoints.Current.breakpoint.name; }

    constructor(config: SequenceConfig) {

        const defOffsetVideoEnd = {
            [BreakpointType.Desktop]: 0,
            [BreakpointType.Tablet]: 0,
            [BreakpointType.Mobile]: 0,
        };

        const defCountPreloadFrames = 10;


        super(config);
        this.animationTimeline = config.animationTimeline;
        this.triggerElement = config.triggerElement;
        this._canvasElement = config.canvasElement;
        this.totalFrames = config.totalFrames ;
        this.offsetVideoEnd = config.offsetVideoEnd || defOffsetVideoEnd;
        this.countPreloadFrames = config.countPreloadFrames || defCountPreloadFrames;

        this.isLoopActive = config.loopConfig !== undefined;


        if (this.isLoopActive) {
            const loopConfig = config.loopConfig;
            this.loopDuration = loopConfig.loopDuration;
            this.framesPerLoop = loopConfig.framesPerLoop;
            this.transitionStartScrollOffset = loopConfig.transitionStartScrollOffset;
            this.loopStartFrame = loopConfig.loopStartFrame;
            this.loopEndFrame = loopConfig.loopEndFrame;
            this.transitionDuration = loopConfig.transitionDuration;
        }
    }

    public unmount() {
        if (this.scrollTrigger) {
            this.scrollTrigger.kill();
        }
        if (this._canvas) {
            this._canvas.remove();
        }
        if (this._ctx) {
            this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
        this._frameImages.clear();
        if (this.idAnimation) {
            cancelAnimationFrame(this.idAnimation);
        }
    }

    private async playLoop() {
        if(!this.isLoopActive) return;


        if (!this.isLooping) return;

        const startTime = Date.now();
        const animate = () => {
            if (!this.isLooping) return;
            const elapsed = (Date.now() - startTime) % (this.loopDuration * 1000);
            const progress = elapsed / (this.loopDuration * 1000);

            const frame = Math.round(this.loopStartFrame + (progress * this.framesPerLoop));
            if (frame !== this._currentFrame.contents) {
                this._currentFrame.contents = frame;
                this.renderFrame(this._currentFrame.contents);
            }

            this.idAnimation = requestAnimationFrame(animate);
        };

        await this.preloadFrames(this.loopStartFrame, this.loopEndFrame);
        animate();
    }

    private handleScrollTransition(scrollProgress: number) {
        if (!this.isLoopActive) return;

        if (this.isLooping && scrollProgress > 0) {
            this.isLooping = false;
            gsap.to(this._currentFrame, {
                onComplete: () => this.isLooping = false,
                duration: this.transitionDuration,
                contents: this.framesPerLoop - this.transitionStartScrollOffset,
                ease: 'power2.inOut',
                // onUpdate: () => this.renderFrame(Math.round(this._currentFrame.contents)),
            });
        } else if (!this.isLooping && scrollProgress === 0) {
            this.preloadFrames(this.loopStartFrame, this.loopEndFrame);
            this.isLooping = true;
            this.playLoop();
        }
    }

    private async loadFrame(frameNumber: number): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const paddedNumber = String(frameNumber).padStart(3, '0');
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.src = `/desktop/frame_${paddedNumber}.webp`;
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }


    private async preloadFrames(start: number, end: number) {
        if(start < 1) start = 1;
        if(end > this.totalFrames[this._currentBreakpointType]) end = this.totalFrames[this._currentBreakpointType];
        for (let i = start; i <= end; i++) {
            if (!this._frameImages.has(i)) {
                const img = await this.loadFrame(i);
                this._frameImages.set(i, img);
            }
        }
    }


    private loadFramesToHash() {
        const queue = new ParallelQueue();
        for (let i = this.countPreloadFrames; i <= this.totalFrames[this._currentBreakpointType]; i++) {
            queue.enqueue(async () => {
                const img = await this.loadFrame(i);
                this._frameImages.set(i, img);
            });
        }
        queue.start();
    }

    private renderFrame(frameNumber: number) {
        const img = this._frameImages.get(frameNumber);
        if (img && this._ctx) {
            this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
            const pixelRatio = window.devicePixelRatio || 1;

            const drawWidth = this._canvas.width;
            const drawHeight = this._canvas.height;

            if(Breakpoints.isTablet){
                this._ctx.drawImage(
                    img,
                    - drawWidth / pixelRatio * 0.2,
                    0,
                    drawWidth / pixelRatio * 1.4,
                    drawHeight / pixelRatio,
                );
                return;
            }
            this._ctx.drawImage(
                img,
                0,
                0,
                drawWidth / pixelRatio,
                drawHeight / pixelRatio,
            );
        }
    }

    async doSetup() {


        this._canvas = this._canvasElement;
        this._ctx = this._canvas.getContext('2d');

        this.isLooping = this.isLoopActive;
        this.playLoop();

        const updateCanvasSize = () => {
            const pixelRatio = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            this._canvas.style.width = width + 'px';
            this._canvas.style.height = height + 'px';

            this._canvas.width = width * pixelRatio;
            this._canvas.height = height * pixelRatio;
            this._ctx.scale(pixelRatio, pixelRatio);

            this.renderFrame(this._currentFrame.contents);
        };
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        await this.preloadFrames(1, this.countPreloadFrames);
        this.renderFrame(1);
        this.loadFramesToHash();
    }

    _containerSequenceUpdate = async (self: ScrollTrigger) => {
        const currentScroll = window.scrollY;
        const isScrollingUp = currentScroll < this.lastScrollPosition;
        this.lastScrollPosition = currentScroll;

        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const adjustedProgress = Math.min(1, currentScroll / (totalHeight - this.offsetVideoEnd[this._currentBreakpointType]));

        // Handle transition
        this.handleScrollTransition(self.progress);
        if (!this.isLooping) {
            const frame = Math.round(adjustedProgress * this.totalFrames[this._currentBreakpointType]);
            if (frame !== this._currentFrame.contents) {
                this._currentFrame.contents = frame;
                // Removed frame check to allow smooth transition
                const preloadAmount = 5;
                await this.preloadFrames(
                    frame + (isScrollingUp ? -preloadAmount : 1),
                    frame + (isScrollingUp ? -1 : preloadAmount),
                );
                this.renderFrame(frame);
            }
        }
    };

    public scrollToTween(tweenLabel: string) {
        if (!this.scrollTrigger) return;
        const position = this.scrollTrigger.labelToScroll(tweenLabel);
        if (position) {
            window.scrollTo({
                top: position,
                behavior: 'smooth',
            });
        }
    }


    private playSequenceOnScroll() {
        this.scrollTrigger = ScrollTrigger.create({
            trigger: this.triggerElement,
            markers: true,
            start: 'top top',
            end: 'bottom bottom',
            pinSpacing: false,
            animation: this.animationTimeline ? this.animationTimeline[this._currentBreakpointType] : gsap.timeline(),
            scrub: true,
            onUpdate: this._containerSequenceUpdate,
        });
    }

    public getLabelPosition(label: string) {
        if (!this.scrollTrigger) return;
        const position = this.scrollTrigger.labelToScroll(label);
        return position;
    }

    _activate() {

        this.playSequenceOnScroll();
    //    add event listeners
    }

    _deactivate() {

        // Remove event listeners
    }


}
