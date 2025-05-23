import logger from 'scripts/logger';
import { ParallelQueue } from '@zajno/common/structures/queue/parallel';
import Component, { type ComponentConfig } from 'scripts/core/component';

export const LazyClasses = {
    show: 'lazyLoaded',
    mainLoadedTemplate: priority => `lazy-loaded-priority-${priority}`,
};

interface ILazyLoadable extends Component {
    readonly priority: number;
    beginLoading(): void;
}

export interface LazyLoadConfig<TElement extends HTMLElement = HTMLElement> extends ComponentConfig<TElement> {
    lazyQueue: ParallelQueue;
    register?: boolean;
    priority?: number;
}

enum LoadingState {
    None = 0,
    Registered = 1,
    Loading = 2,
    Error = 4,
    Loaded = 5,
}

export abstract class LazyLoadComponent<TConfig extends LazyLoadConfig = LazyLoadConfig>
    extends Component<TConfig> implements ILazyLoadable {

    private _state: LoadingState = LoadingState.None;
    private _loadingPromise: Promise<void> = null;
    public _lazyQueue: ParallelQueue;

    protected _priority: number;
    private _loadClasses: string[];
    private _loggerName: string = null;

    public get state() { return this._state; }
    public get priority() { return this._priority || 0; }

    public withLogger(name: string | null | undefined) {
        this._loggerName = name === undefined
            ? null
            : (name === null ? `[Lazy:${this.constructor.name}]` : name);
        return this;
    }

    protected async doSetup(): Promise<void> {
        this._priority = this._config.priority ?? (+this.element.dataset.loadPriority || 0);
        this._lazyQueue = this._config.lazyQueue;

        this._loadClasses = [LazyClasses.show];
        this.populateAdditionalClasses();

        if (this._config.register) {
            this.register();
        }
    }

    protected register() {
        if (this._state >= LoadingState.Registered) {
            return;
        }

        this._state = LoadingState.Registered;
        this.log('registering...', this.priority, this._config);
        this._lazyQueue.enqueue(() => this.beginLoading(), this.priority);
    }

    protected populateAdditionalClasses() {
        const items = this.element.dataset.loadAddClass;

        if (items) {
            const customClasses = (items || '').split(',')
                .map(s => s.trim())
                .filter(s => s);

            this._loadClasses.push(...customClasses);
        }
    }

    public async beginLoading(): Promise<void> {
        if (this._state >= LoadingState.Loading) {
            return;
        }

        this._state = LoadingState.Loading;
        this.log('begin loading...', this.priority, this._config);

        this._loadingPromise = this._doLoading();

        return this._loadingPromise
            .then(() => this._finishLoading(true))
            .catch(err => this._finishLoading(false, err));
    }

    public waitForLoaded(): Promise<void> {
        return this._loadingPromise;
    }

    protected abstract _doLoading(): Promise<void>;

    private _finishLoading = (success: boolean, err?: Error) => {
        this._state = success ? LoadingState.Loaded : LoadingState.Error;

        this.log('finished loading, success =', success, err && ', ERROR =', err);
        this._loadingPromise = Promise.resolve();

        this.postLoading();
    };

    protected postLoading() {
        if (this.state === LoadingState.Loaded) {
            this._loadClasses.forEach(lc => this.element.classList.add(lc));
        }
    }

    protected log(...args: any[]) {
        if (this._loggerName) {
            logger.log(this._loggerName, ...args);
        }
    }
}
