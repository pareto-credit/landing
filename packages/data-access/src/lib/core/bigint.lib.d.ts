import BigNumber from 'bignumber.js';
import { iBigInt } from './utility.model';
export type BigNumberValue = BigNumber.Value | bigint;
/**
 * Transform a value to BigNumber
 * @param value - the value to transform
 * @returns the big number
 */
export declare function BNify(value?: BigNumberValue): BigNumber;
/**
 * Sum two bigInt values
 * @param a - the first value
 * @param b - the second value
 * @returns the sum as string
 */
export declare function BNsum(a?: iBigInt, b?: iBigInt): iBigInt;
/**
 * Divide num by dev avoiding NaN
 * @param num numerator
 * @param den denominator
 * @returns num/den
 */
export declare function BNSafeDiv(num: BigNumberValue, den: BigNumberValue): BigNumber;
/**
 * Transform a value to BigNumber string
 * @param value - the value to transform
 * @returns the big number as string
 */
export declare function BNstring(value: BigNumberValue): iBigInt;
/**
 * Transform a value to BigNumber fixed to specified decimals
 * @param value - the value to transform
 * @returns the big number as fixed string
 */
export declare function BNFixed(value?: BigNumberValue, decimals?: number): iBigInt;
/**
 * Is BigInt greather than
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true if greater
 */
export declare function BNgt(value1?: BigNumberValue, value2?: BigNumberValue): boolean;
/**
 * Is BigInt greather than or equal
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true if greater
 */
export declare function BNgte(value1?: BigNumberValue, value2?: BigNumberValue): boolean;
/**
 * Is BigInt less than
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true is less than
 */
export declare function BNlt(value1?: BigNumberValue, value2?: BigNumberValue): boolean;
/**
 * Is BigInt less than or equal
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true is less than or equal
 */
export declare function BNlte(value1?: BigNumberValue, value2?: BigNumberValue): boolean;
/**
 * Is BigInt equal
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true if equal
 */
export declare function BNeq(value1?: BigNumberValue, value2?: BigNumberValue): boolean;
/**
 * Remove all decimals from bigNumberValue
 * @param value - the value to parse
 * @returns the string of the value
 */
export declare function BNint(value?: BigNumberValue): string;
/**
 * Return a number with the maximum number of significant decimals
 * @param value value to fix
 * @param decimals max decimals
 * @returns
 */
export declare function BNFloat(value?: BigNumberValue, decimals?: number): string;
/**
 * Return a number rounded up to a specific number of decimals
 * @param value value
 * @param decimals decimals
 * @returns rounded number
 */
export declare function BNRoundUpTo(value: BigNumber.Value, decimals: number): number;
