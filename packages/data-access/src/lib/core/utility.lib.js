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
    apr2apy: function() {
        return apr2apy;
    },
    arrayDiff: function() {
        return arrayDiff;
    },
    arrayFy: function() {
        return arrayFy;
    },
    arrayToDict: function() {
        return arrayToDict;
    },
    capitalize: function() {
        return capitalize;
    },
    cleanObject: function() {
        return cleanObject;
    },
    compLower: function() {
        return compLower;
    },
    escapeRegExp: function() {
        return escapeRegExp;
    },
    formatString: function() {
        return formatString;
    },
    generateHexCode: function() {
        return generateHexCode;
    },
    getLocale: function() {
        return getLocale;
    },
    isCode: function() {
        return isCode;
    },
    numberFormat: function() {
        return numberFormat;
    },
    parsePercentage: function() {
        return parsePercentage;
    },
    periodToSeconds: function() {
        return periodToSeconds;
    },
    replaceMany: function() {
        return replaceMany;
    },
    secondsToPeriod: function() {
        return secondsToPeriod;
    },
    secondsToPeriods: function() {
        return secondsToPeriods;
    },
    stringify: function() {
        return stringify;
    },
    toNumber: function() {
        return toNumber;
    },
    toString: function() {
        return toString;
    },
    validateSchema: function() {
        return validateSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
const _ajv = /*#__PURE__*/ _interop_require_default._(require("ajv"));
const _lodash = require("lodash");
const _bigintlib = require("./bigint.lib");
const _crypto = /*#__PURE__*/ _interop_require_default._(require("crypto"));
function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
    ;
}
function stringify(s) {
    return JSON.stringify(s, (_, v)=>typeof v === 'bigint' ? v.toString() : v);
}
function toNumber(value) {
    return value === undefined ? undefined : Number(value);
}
function toString(value) {
    return value === undefined ? undefined : String(value);
}
function compLower(s1, s2) {
    return s1.toLowerCase() === s2.toLowerCase();
}
function validateSchema(schema, object) {
    try {
        const ajv = new _ajv.default({
            strict: false
        });
        const validate = ajv.compile(schema);
        const valid = validate(object);
        return {
            valid,
            errors: validate.errors
        };
    } catch (err) {
        return {
            valid: false,
            errors: [
                err
            ]
        };
    }
}
function replaceMany(str, replacements) {
    return Object.entries(replacements).reduce((acc, [key, value])=>{
        return acc.replace(key, value);
    }, str);
}
function numberFormat(amount, options, lang = 'en-US') {
    const formatter = new Intl.NumberFormat(lang, options);
    return formatter.format(amount);
}
function secondsToPeriod(seconds) {
    const duration = seconds || 0;
    const unit = duration < 120 ? 'seconds' : duration < 3600 ? 'minutes' : duration < 86400 ? 'hours' : 'days';
    return {
        duration: +_moment.default.duration(seconds || 0, 'seconds').as(unit).toFixed(2),
        unit
    };
}
function periodToSeconds(duration, unit) {
    return Math.floor(_moment.default.duration(duration, unit).asSeconds());
}
function secondsToPeriods(seconds) {
    const units = [
        {
            label: 'year',
            seconds: 31536000
        },
        {
            label: 'day',
            seconds: 86400
        },
        {
            label: 'hour',
            seconds: 3600
        },
        {
            label: 'minute',
            seconds: 60
        },
        {
            label: 'second',
            seconds: 1
        }
    ];
    let timeString = '';
    for (const unit of units){
        const unitValue = Math.floor(seconds / unit.seconds);
        if (unitValue > 0) {
            timeString += `${unitValue} ${unit.label}${unitValue > 1 ? 's' : ''} `;
            seconds %= unit.seconds;
        }
    }
    return timeString.trim();
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function formatString(template, params = {}) {
    return template.includes('%{') ? template.replace(/%\{(.*?)\}/g, (match, key)=>{
        return params[key] !== undefined ? String(params[key]) : match;
    }) : template;
}
function cleanObject(obj) {
    return (0, _lodash.pickBy)(obj, (value)=>{
        if (value === null || value === undefined || value === '') return false;
        if (Array.isArray(value) && value.length === 0) return false;
        if (typeof value === 'object' && Object.keys(value).length === 0) return false;
        return true;
    });
}
function arrayDiff(first, second) {
    return (0, _lodash.difference)((0, _lodash.uniq)(first.items.map((item)=>first.key ? item[first.key] : item).filter((value)=>value !== undefined)), (0, _lodash.uniq)(second.items.map((sec)=>second.key ? sec[second.key] : sec).filter((value)=>value !== undefined)));
}
function apr2apy(apr, period = 365) {
    return (0, _bigintlib.BNify)((0, _bigintlib.BNify)(1).plus((0, _bigintlib.BNify)(apr).div(period)).pow(period).minus(1).toFixed(18));
}
function arrayFy(item) {
    return Array.isArray(item) ? item : item ? [
        item
    ] : [];
}
function isCode(code, minLength, maxLength) {
    const regex = new RegExp(`^[a-zA-Z0-9]{${minLength},${maxLength}}$`);
    return !!code.match(regex);
}
function generateHexCode(address, length = 6) {
    const hash = _crypto.default.createHash('sha256').update(address).digest('hex');
    return hash.slice(0, length).toUpperCase();
}
function arrayToDict(array, key, keyValue) {
    return array.reduce((acc, item)=>{
        const k = String(item[key]);
        const value = keyValue ? (0, _lodash.get)(item, keyValue) : item;
        return _extends._({}, acc, {
            [k]: value
        });
    }, {});
}
function parsePercentage(value, decimals = 2) {
    return numberFormat(Number(value) / 100, {
        style: 'percent',
        maximumFractionDigits: decimals
    });
}
function getLocale(locales, language = 'en', defaultLabel) {
    return locales ? locales[language] : defaultLabel;
}

//# sourceMappingURL=utility.lib.js.map