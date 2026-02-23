/**
 * Transform an object params in URLParameters
 * @param params - the object to transform
 * @returns
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "uriFy", {
    enumerable: true,
    get: function() {
        return uriFy;
    }
});
function uriFy(params) {
    return Object.keys(params).map((k)=>{
        if (Array.isArray(params[k])) {
            const filterParams = params[k].map((subData)=>encodeURIComponent(subData)).join(',');
            return encodeURIComponent(k) + '=' + filterParams;
        } else if ([
            'string',
            'number',
            'boolean'
        ].includes(typeof params[k])) {
            const value = typeof params[k] === 'boolean' ? String(params[k]) : params[k];
            return encodeURIComponent(k) + '=' + encodeURIComponent(value);
        }
        return '';
    }).join('&');
}

//# sourceMappingURL=http.lib.js.map