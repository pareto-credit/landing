import logger from 'scripts/logger';
import createReadyPattern from 'scripts/utils/readyPattern';

import { LazyLoadComponent, type LazyLoadConfig } from './lazyLoadComponent';
import { ParallelQueue } from '@zajno/common/structures/queue/parallel';

const LOG_ENABLED = false;

function log(...args) {
    if (LOG_ENABLED) {
        logger.log(...args);
    }
}

export type ImageLazyLoadConfig = LazyLoadConfig<HTMLImageElement>;

export class ImageLazyLoadComponent extends LazyLoadComponent<ImageLazyLoadConfig> {
    private _picture: HTMLPictureElement;

    get image() {
        return this._config.el;
    }

    protected async doSetup() {
        this._picture = window.HTMLPictureElement && this.element.parentElement.tagName.toLowerCase() === 'picture'
            ? this.element.parentElement
            : null;

        if (!this.element.classList.contains('lazy')) {
            this.element.classList.add('lazy');
        }

        await super.doSetup();
    }

    _doImageLoading(): Promise<void> {
        const target = this.image;
        const targetSrc = target.dataset.src;
        log('[ImageLazyLoadComponent]', target.complete, targetSrc, target);

        if (!targetSrc && target.complete) {
            return Promise.resolve();
        }

        const onReady = createReadyPattern(target);

        return new Promise(resolve => {
            const resolveWrapper = ok => {
                log('resolve', ok, this.element);
                resolve();
            };

            if (targetSrc) {
                target.src = targetSrc;
            }

            onReady(resolveWrapper);
        });
    }

    _doPictureLoading(): Promise<void> {

        const target = this.image;

        const onReady = createReadyPattern(target);

        let hasTargetSrc = false;

        const sources = this._picture.querySelectorAll('source');
        sources.forEach(s => {
            if (s.dataset.srcset) {
                s.srcset = s.dataset.srcset;
                hasTargetSrc = true;
            }
        });

        if (!hasTargetSrc && target.complete) {
            return Promise.resolve();
        }

        return new Promise(resolve => {
            const resolveWrapper = ok => {
                log('picture resolve', ok, this.image.currentSrc, this.element);
                resolve();
            };

            onReady(resolveWrapper);
        });
    }

    protected _doLoading(): Promise<void> {
        return Promise.resolve(this._picture
            ? this._doPictureLoading()
            : this._doImageLoading());
    }

    static RegisterAll(lazyQueue: ParallelQueue, selector = 'img.lazy') {
        const arrImage = [...document.querySelectorAll<HTMLImageElement>(selector)];
        return Promise.all(arrImage
            .map(el => new ImageLazyLoadComponent({ el, register: true, lazyQueue }).setup()));
    }
}
