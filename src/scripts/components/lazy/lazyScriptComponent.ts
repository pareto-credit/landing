import type { ParallelQueue } from '@zajno/common/structures/queue/parallel';
import { LazyLoadComponent, type LazyLoadConfig } from './lazyLoadComponent';

type ScriptLazyConfig = LazyLoadConfig<HTMLScriptElement>;

export class LazyScriptComponent extends LazyLoadComponent<ScriptLazyConfig> {

    protected _doLoading(): Promise<void> {

        const target = this.element as HTMLScriptElement;
        const targetSrc = target.dataset.src;
        if (targetSrc) {
            target.src = targetSrc;
            target.dataset.src = '';
        }

        // TODO wait for script to load ?
        return Promise.resolve();
    }

    public static RegisterAll(lazyQueue: ParallelQueue, selector = 'script[data-lazy]') {
        const arrImage = [...document.querySelectorAll<HTMLScriptElement>(selector)];
        return Promise.all(arrImage
            .map(el => new LazyScriptComponent({ el, register: true, lazyQueue }).setup()));
    }
}
