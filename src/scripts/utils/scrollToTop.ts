import { ScrollTrigger } from 'scripts/lib/gsap/scrollTrigger';
import { getLenis } from 'scripts/modules/setupLenis';

type Options = {
    smooth?: boolean;
    stylesForce?: boolean;
    triggersRefresh?: boolean;
};

const REFRESH_DELAY = 333;

export function scrollToTop(options?: Options) {
    const {
        smooth = false,
        stylesForce = false,
        triggersRefresh = false,
    } = options || {};

    let prevStyleBody: string, prevStyleHtml: string;
    if (stylesForce) {
        prevStyleBody = document.body.style.scrollBehavior;
        prevStyleHtml = document.documentElement.style.scrollBehavior;
        document.body.style.scrollBehavior = 'unset';
        document.documentElement.style.scrollBehavior = 'unset';
    }

    const smoother = getLenis();

    if (!smoother) {
        window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'instant' });
    } else {
        if (smooth) {
            smoother.scrollTo(0,{ duration: 1 });
        } else {
            smoother.scrollTo(0, { immediate: true, force: true });
        }
    }

    if (stylesForce) {
        setTimeout(() => {
            document.body.style.scrollBehavior = prevStyleBody;
            document.documentElement.style.scrollBehavior = prevStyleHtml;
        }, REFRESH_DELAY);
    }

    if (triggersRefresh) {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, REFRESH_DELAY);
    }
}
