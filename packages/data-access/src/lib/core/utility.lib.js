import moment from 'moment';
import Ajv from 'ajv';
import { difference, identity, pickBy, uniq } from 'lodash';
import { BNify } from './bigint.lib';
import crypto from 'crypto';
/**
 * Escape Regular Expression for security reason
 * @param value - the string to excape
 * @returns the string excaped
 */ export function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
    ;
}
/**
 * Stringify object with bigint check
 * @param s - the object to stringify
 * @returns the string of the object
 */ export function stringify(s) {
    return JSON.stringify(s, (_, v)=>typeof v === 'bigint' ? v.toString() : v);
}
/**
 * Compare two string
 * @param s1 - the string one
 * @param s2 - the string two
 * @returns true if equal
 */ export function compLower(s1, s2) {
    return s1.toLowerCase() === s2.toLowerCase();
}
/**
 * Validate object against schema
 * @param schema schema.valueOf()
 * @param object object to validate
 * @returns object schema validation
 */ export function validateSchema(schema, object) {
    try {
        const ajv = new Ajv({
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
/**
 * Replace many assertion
 * @param str - the string
 * @param replacements - the replacements to use
 * @returns the new string
 */ export function replaceMany(str, replacements) {
    return Object.entries(replacements).reduce((acc, [key, value])=>{
        return acc.replace(key, value);
    }, str);
}
/**
 * Format a number using Internationalization API
 * @param amount - the amount
 * @param lang - the lang code
 * @param currency - the currency to use
 * @returns the number formatted
 */ export function numberFormat(amount, options, lang = 'en-US') {
    const formatter = new Intl.NumberFormat(lang, options);
    return formatter.format(amount);
}
/**
 * Format seconds in a human readable unit time
 * @param seconds the seconds amount
 * @returns the period data
 */ export function secondsToPeriod(seconds) {
    const duration = seconds || 0;
    const unit = duration < 120 ? 'seconds' : duration < 3600 ? 'minutes' : duration < 86400 ? 'hours' : 'days';
    return {
        duration: +moment.duration(seconds || 0, 'seconds').as(unit).toFixed(2),
        unit
    };
}
/**
 * Format a period to seconds
 * @param duration - the duration
 * @param unit - the unit time
 * @returns the amount of seconds
 */ export function periodToSeconds(duration, unit) {
    return Math.floor(moment.duration(duration, unit).asSeconds());
}
/**
 * Split an amount of seconds into multiple periods
 * @param seconds the seconds amount
 * @returns the periods
 */ export function secondsToPeriods(seconds) {
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
/**
 * Capitalize the first letter of a string
 * @param string - the string to modify
 * @returns the string capitalized
 */ export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
/**
 * Format a string "Hello %{friend}" and params { 'friend': 'John' }
 * into a parsed string "Hello John"
 * @param template - the template string
 * @param params - the params
 * @returns the string formatted
 */ export function formatString(template, params = {}) {
    return template.includes('%{') ? template.replace(/%\{(.*?)\}/g, (match, key)=>{
        return params[key] !== undefined ? String(params[key]) : match;
    }) : template;
}
/**
 * Remove all falsy values from an object
 * @param obj - the object to clean
 * @return the object cleaned
 */ export function cleanObject(obj) {
    return pickBy(obj, identity);
}
/**
 * Make the difference between two arrays and returns
 * @param first - the first array data
 * @param second - the second array data
 * @returns the difference values between two arrays
 */ export function arrayDiff(first, second) {
    return difference(uniq(first.items.map((item)=>first.key ? item[first.key] : item).filter((value)=>value !== undefined)), uniq(second.items.map((sec)=>second.key ? sec[second.key] : sec).filter((value)=>value !== undefined)));
}
/**
 * Compound APR and return APY
 * @param apr APR
 * @param period compounding period
 * @returns Compounded APR
 */ export function apr2apy(apr, period = 365) {
    return BNify(BNify(1).plus(BNify(apr).div(period)).pow(period).minus(1).toFixed(18));
}
/**
 *  * Return an array of items (useful for route filters)
 * @param item item
 * @returns array of items
 */ export function arrayFy(item) {
    return Array.isArray(item) ? item : item ? [
        item
    ] : [];
}
/**
 * Check if a string is a code
 * @paramc code - the code string to verify
 * @returns true if is a code
 */ export function isCode(code, minLength, maxLength) {
    const regex = new RegExp(`^[a-zA-Z0-9]{${minLength},${maxLength}}$`);
    return !!code.match(regex);
}
/**
 * Generate a unique 6-character uppercase hexadecimal code from a wallet address
 * @param address - the wallet address
 * @param length - the length of the code
 * @returns a 6-character uppercase hexadecimal code
 */ export function generateHexCode(address, length = 6) {
    const hash = crypto.createHash('sha256').update(address).digest('hex');
    return hash.slice(0, length).toUpperCase();
}

//# sourceMappingURL=utility.lib.js.map