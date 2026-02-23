"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    pickClosestBoundary: function() {
        return pickClosestBoundary;
    },
    renderVaultTemplate: function() {
        return renderVaultTemplate;
    },
    roundEnd: function() {
        return roundEnd;
    },
    roundStart: function() {
        return roundStart;
    },
    sanitizeHtml: function() {
        return sanitizeHtml;
    }
});
const _extends = require("@swc/helpers/_/_extends");
function sanitizeHtml(input) {
    const htmlEscapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    const htmlEscapeRegex = /[&<>"']/g;
    return input.replace(htmlEscapeRegex, (char)=>{
        var _htmlEscapeMap_char;
        return (_htmlEscapeMap_char = htmlEscapeMap[char]) != null ? _htmlEscapeMap_char : char;
    });
}
function getParamValue(params, path) {
    let value = _extends._({}, params);
    let segmentStart = 0;
    for(let i = 0; i <= path.length; i++){
        if (i === path.length || path.charCodeAt(i) === 46) {
            const key = path.slice(segmentStart, i);
            segmentStart = i + 1;
            if (!key) return undefined;
            value = value == null ? void 0 : value[key];
            if (value === undefined) return undefined;
        }
    }
    return typeof value === 'string' ? value : undefined;
}
function renderVaultTemplate(template, params) {
    const templateParams = template.parser ? template.parser(params) : params;
    const unsafeFields = template.unsafeFields || [];
    const missingFields = template.requiredFields.filter((field)=>getParamValue(templateParams, field) === undefined);
    if (missingFields.length) {
        throw new Error(`Missing required template fields (${missingFields.join(', ')})`);
    }
    const content = unsafeFields.reduce((acc, field)=>{
        const placeholder = `%{${field}}`;
        const value = getParamValue(templateParams, field) || '';
        return acc.split(placeholder).join(value);
    }, template.content);
    return template.requiredFields.reduce((acc, field)=>{
        const placeholder = `%{${field}}`;
        const value = getParamValue(templateParams, field) || '';
        return acc.split(placeholder).join(sanitizeHtml(value));
    }, content);
}
function pickClosestBoundary(date, boundaries) {
    return boundaries.reduce((closest, boundary)=>{
        if (!boundary || !boundary.isValid()) return closest;
        if (!closest || Math.abs(date.diff(boundary)) < Math.abs(date.diff(closest))) {
            return boundary;
        }
        return closest;
    }, null);
}
function roundStart(date, startOf = 'month') {
    if (!date) return '';
    const candidates = [
        -1,
        0,
        1
    ].map((offset)=>date.clone().add(offset, startOf).startOf(startOf));
    const closestDate = pickClosestBoundary(date, candidates);
    return (closestDate == null ? void 0 : closestDate.format('MMMM Do, YYYY')) || date.format('MMMM Do, YYYY');
}
function roundEnd(date, endOf = 'month') {
    if (!date) return '';
    const candidates = [
        -1,
        0,
        1
    ].map((offset)=>date.clone().add(offset, endOf).endOf(endOf));
    const closestDate = pickClosestBoundary(date, candidates);
    return (closestDate == null ? void 0 : closestDate.format('MMMM Do, YYYY')) || date.format('MMMM Do, YYYY');
}

//# sourceMappingURL=vault-template.lib.js.map