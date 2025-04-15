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
export declare function BNgt(bigInt?: BigNumberValue, value?: BigNumberValue): boolean;
/**
 * Is BigInt greather than or equal
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true if greater
 */
export declare function BNgte(bigInt?: BigNumberValue, value?: BigNumberValue): boolean;
/**
 * Is BigInt less than
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true is less than
 */
export declare function BNlt(bigInt?: BigNumberValue, value?: BigNumberValue): boolean;
/**
 * Is BigInt less than or equal
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true is less than or equal
 */
export declare function BNlte(bigInt?: BigNumberValue, value?: BigNumberValue): boolean;
/**
 * Is BigInt equal
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true if equal
 */
export declare function BNeq(bigInt?: BigNumberValue, value?: BigNumberValue): boolean;
/**
 * Remove all decimals from bigNumberValue
 * @param value - the value to parse
 * @returns the string of the value
 */
export declare function BNint(value?: BigNumberValue): string;
