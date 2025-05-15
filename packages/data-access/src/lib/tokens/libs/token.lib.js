import { BNify, numberFormat } from '../../core';
/**
 * Fix token price with correct decimals
 * @param token - the token entity
 * @param amount - the full digits amount
 * @returns the token price
 */ export function fixTokenAmount(token, amount) {
    return fixAmount(amount, token.decimals);
}
/**
 * Fix amount with correct decimals
 * @param amount full digit amount
 * @param decimals decimals
 * @returns fixed amount
 */ export function fixAmount(amount, decimals) {
    return BNify(amount).div(10 ** decimals);
}
/**
 * Normalize an amount to token minimum decimals
 * @param token - the token entity
 * @param amount - the amount to multiply
 * @returns the amount to show
 */ export function normalizeTokenAmount(token, amount) {
    return BNify(BNify(amount).times(10 ** token.decimals).toFixed(0));
}
/**
 * Parse token amount into human readable string
 * @param token - the token entity
 * @param amount - the amount to parse
 * @returns the string to show
 */ export function parseTokenAmount(token, amount = 0) {
    const fixedValue = fixTokenAmount(token, amount);
    return numberFormat(Number(fixedValue.toNumber()), {
        minimumFractionDigits: token.decimals
    });
}
/**
 * Return minimum token value
 * @param token - the token
 * @returns the minimum token value
 */ export function minTokenAmount(token) {
    return fixTokenAmount(token, 1);
}
/**
 * Get token USD Amount
 * @param amount - the amount of tokens
 * @param price - the USDC price of the token
 * @returns the token USD amount
 */ export function getTokenUSDAmount(amount = 1, price = 1000000) {
    // Format token price
    const tokenPrice = BNify(price).div(10 ** 6);
    return BNify(amount).times(tokenPrice).toString();
}
/**
 * Convert token amount from one token to another, considering decimals
 * @param sourceToken - the source token entity
 * @param destToken - the target token entity
 * @param amount - the normalize amount of the source token
 * @returns the converted amount in the target token, normalized
 */ export function convertTokenAmount(sourceToken, destToken, amount) {
    const fixedAmount = fixTokenAmount(sourceToken, amount);
    return normalizeTokenAmount(destToken, fixedAmount);
}

//# sourceMappingURL=token.lib.js.map