import BigNumber from 'bignumber.js';
import { Token } from '../token.model';
import { BigNumberValue } from '../../core';
/**
 * Fix token price with correct decimals
 * @param token - the token entity
 * @param amount - the full digits amount
 * @returns the token price
 */
export declare function fixTokenAmount(token: Token, amount: BigNumber.Value): BigNumber;
/**
 * Fix amount with correct decimals
 * @param amount full digit amount
 * @param decimals decimals
 * @returns fixed amount
 */
export declare function fixAmount(amount: BigNumber.Value, decimals: number): BigNumber;
/**
 * Normalize an amount to minimum decimals
 * @param amount - the amount
 * @param decimals - decimals
 * @returns the normalized amount
 */
export declare function normalizeAmount(amount: BigNumber.Value, decimals: number): BigNumber;
/**
 * Normalize an amount to token minimum decimals
 * @param token - the token entity
 * @param amount - the amount to multiply
 * @returns the amount to show
 */
export declare function normalizeTokenAmount(token: Token, amount: BigNumber.Value): BigNumber;
/**
 * Get token price
 * @param token - the token entity
 * @param amount - the conversion amount
 * @returns the token price
 */
export declare function getTokenAmount(token: Token, amount?: BigNumberValue, decimals?: number): string;
/**
 * Parse amount into human readable string
 * @param token - the token entity
 * @param decimals - the decimals to parse
 * @returns the string to show
 */
export declare function parseAmount(amount?: BigNumber.Value, decimals?: number): string;
/**
 * Parse token amount into human readable string
 * @param token - the token entity
 * @param amount - the amount to parse
 * @returns the string to show
 */
export declare function parseTokenAmount(token: Token, amount?: BigNumber.Value): string;
/**
 * Return minimum token value
 * @param token - the token
 * @returns the minimum token value
 */
export declare function minTokenAmount(token: Token): BigNumber;
/**
 * Get token USD Amount
 * @param amount - the amount of tokens
 * @param price - the USDC price of the token
 * @returns the token USD amount
 */
export declare function getTokenUSDAmount(amount?: BigNumberValue, price?: BigNumberValue): string;
/**
 * Convert token amount from one token to another, considering decimals
 * @param sourceToken - the source token entity
 * @param destToken - the target token entity
 * @param amount - the fixed or normalized amount to convert
 * @param price - the conversion price
 * @returns the converted amount in the target token, normalized
 */
export declare function convertTokenAmount(sourceToken: Token, destToken: Token, amount: BigNumber.Value, options?: {
    price?: BigNumberValue;
    amountToken?: 'SOURCE' | 'DEST';
    amountType?: 'NORMALIZED' | 'FIXED';
    resultType?: 'NORMALIZED' | 'FIXED';
}): string;
/**
 * Convert token amounts keeping source and destination values aligned.
 * @param sourceToken - the source token entity
 * @param destToken - the destination token entity
 * @param options - partial amounts and optional price
 * @returns the normalized and fixed amounts for both tokens
 */
export declare function convertTokensAmounts(sourceToken: Token, destToken: Token, options?: {
    price?: BigNumberValue;
    sourceTokenAmount?: BigNumber.Value;
    sourceFixedAmount?: BigNumber.Value;
    destTokenAmount?: BigNumber.Value;
    destFixedAmount?: BigNumber.Value;
}): {
    sourceTokenAmount: string;
    sourceFixedAmount: string;
    destTokenAmount: string;
    destFixedAmount: string;
};
