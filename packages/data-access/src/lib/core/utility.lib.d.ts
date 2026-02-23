import { Locales, Period, UnitTime } from './utility.model';
import { ErrorObject } from 'ajv';
import { BigNumberValue } from './bigint.lib';
import BigNumber from 'bignumber.js';
/**
 * Escape Regular Expression for security reason
 * @param value - the string to excape
 * @returns the string excaped
 */
export declare function escapeRegExp(value: string): string;
/**
 * Stringify object with bigint check
 * @param s - the object to stringify
 * @returns the string of the object
 */
export declare function stringify(s: any): string;
/**
 * Convert value to number if defined
 * @param value the value to convert
 * @returns the number value or undefined
 */
export declare function toNumber(value?: number | string): number | undefined;
/**
 * Convert value to string if defined
 * @param value the value to convert
 * @returns the string value or undefined
 */
export declare function toString(value?: number | string): string | undefined;
/**
 * Compare two string
 * @param s1 - the string one
 * @param s2 - the string two
 * @returns true if equal
 */
export declare function compLower(s1: string, s2: string): boolean;
/**
 * Validate object against schema
 * @param schema schema.valueOf()
 * @param object object to validate
 * @returns object schema validation
 */
export declare function validateSchema(schema: any, object: any): {
    valid: boolean;
    errors?: null | ErrorObject[];
};
/**
 * Replace many assertion
 * @param str - the string
 * @param replacements - the replacements to use
 * @returns the new string
 */
export declare function replaceMany(str: string, replacements: Record<string, string>): string;
/**
 * Format a number using Internationalization API
 * @param amount - the amount
 * @param lang - the lang code
 * @param currency - the currency to use
 * @returns the number formatted
 */
export declare function numberFormat(amount: number | bigint, options?: Intl.NumberFormatOptions, lang?: 'en-US'): string;
/**
 * Format seconds in a human readable unit time
 * @param seconds the seconds amount
 * @returns the period data
 */
export declare function secondsToPeriod(seconds: number): Period;
/**
 * Format a period to seconds
 * @param duration - the duration
 * @param unit - the unit time
 * @returns the amount of seconds
 */
export declare function periodToSeconds(duration: number, unit: UnitTime): number;
/**
 * Split an amount of seconds into multiple periods
 * @param seconds the seconds amount
 * @returns the periods
 */
export declare function secondsToPeriods(seconds: any): string;
/**
 * Capitalize the first letter of a string
 * @param string - the string to modify
 * @returns the string capitalized
 */
export declare function capitalize(string: string): string;
/**
 * Format a string "Hello %{friend}" and params { 'friend': 'John' }
 * into a parsed string "Hello John"
 * @param template - the template string
 * @param params - the params
 * @returns the string formatted
 */
export declare function formatString(template: string, params?: {
    [key: string]: string | number;
}): string;
/**
 * Remove all falsy values from an object
 * @param obj - the object to clean
 * @return the object cleaned
 */
export declare function cleanObject<T extends object>(obj: T): Partial<T>;
/**
 * Make the difference between two arrays and returns
 * @param first - the first array data
 * @param second - the second array data
 * @returns the difference values between two arrays
 */
export declare function arrayDiff<T = string, K = string, R = string>(first: {
    items: T[];
    key?: keyof T;
}, second: {
    items: K[];
    key?: keyof K;
}): R[];
/**
 * Compound APR and return APY
 * @param apr APR
 * @param period compounding period
 * @returns Compounded APR
 */
export declare function apr2apy(apr: BigNumberValue, period?: number): BigNumber;
/**
 *  * Return an array of items (useful for route filters)
 * @param item item
 * @returns array of items
 */
export declare function arrayFy<T = any>(item: T | T[]): T[];
/**
 * Check if a string is a code
 * @paramc code - the code string to verify
 * @returns true if is a code
 */
export declare function isCode(code: string, minLength: number, maxLength: number): boolean;
/**
 * Generate a unique 6-character uppercase hexadecimal code from a wallet address
 * @param address - the wallet address
 * @param length - the length of the code
 * @returns a 6-character uppercase hexadecimal code
 */
export declare function generateHexCode(address: string, length?: number): string;
/**
 * Transform an array into a dictionary
 * @param array - the array of objects
 * @param key - the key to use as dictionary key
 * @returns the dictionary object
 */
export declare function arrayToDict<T extends object, K extends keyof T>(array: T[], key: K, keyValue?: K): Record<string, any>;
/**
 * Parse percentage value
 * @param value - the value to parse
 * @param decimals - the maximum decimals
 * @returns the value parsed
 */
export declare function parsePercentage(value: string | number, decimals?: number): string;
/**
 * Get locale string
 * @param locales - the locales object
 * @param defaultLabel - the placeholder string
 */
export declare function getLocale(locales?: Locales, language?: string, defaultLabel?: string): string | undefined;
