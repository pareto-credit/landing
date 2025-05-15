/**
 * Transform an object params in URLParameters
 * @param params - the object to transform
 * @returns
 */ export function uriFy(params) {
    return Object.keys(params).map((k)=>{
        if (Array.isArray(params[k])) {
            const filterParams = params[k].map((subData)=>encodeURIComponent(subData)).join(',');
            return encodeURIComponent(k) + '=' + filterParams;
        } else if ([
            'string',
            'number'
        ].includes(typeof params[k])) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
        }
        return '';
    }).join('&');
}

//# sourceMappingURL=http.lib.js.map