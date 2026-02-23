"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "keepAlive", {
    enumerable: true,
    get: function() {
        return keepAlive;
    }
});
function keepAlive(fn, options = {}) {
    var _options_signal;
    var _options_minDelay;
    const minDelay = (_options_minDelay = options.minDelay) != null ? _options_minDelay : 1000;
    var _options_maxDelay;
    const maxDelay = (_options_maxDelay = options.maxDelay) != null ? _options_maxDelay : Number.POSITIVE_INFINITY;
    var _options_resetAfter;
    const resetAfter = (_options_resetAfter = options.resetAfter) != null ? _options_resetAfter : 30000;
    let tmDelay;
    let tmReset;
    let aborted = false;
    let attempts = 0;
    const stop = ()=>{
        if (tmDelay) {
            clearTimeout(tmDelay);
        }
        if (tmReset) {
            clearTimeout(tmReset);
        }
    };
    const handler = (err)=>{
        if (aborted) {
            return;
        }
        stop();
        if (options.onExit) {
            options.onExit(err);
        }
        tmDelay = setTimeout(()=>{
            fn().then(()=>handler(null)).catch(handler);
        }, Math.min(minDelay * Math.floor(Math.exp(attempts++)), maxDelay));
        tmReset = setTimeout(()=>{
            attempts = 0;
        }, resetAfter);
    };
    fn().then(()=>handler(null)).catch(handler);
    function abort() {
        aborted = true;
        stop();
    }
    (_options_signal = options.signal) == null ? void 0 : _options_signal.addEventListener('abort', abort);
    return abort;
}

//# sourceMappingURL=alive.lib.js.map