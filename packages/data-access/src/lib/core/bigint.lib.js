import BigNumber from 'bignumber.js';
/**
 * Transform a value to BigNumber
 * @param value - the value to transform
 * @returns the big number
 */ export function BNify(value = 0) {
    return new BigNumber(typeof value === 'bigint' ? value.toString() : typeof value === 'object' ? value : String(value));
}
/**
 * Divide num by dev avoiding NaN
 * @param num numerator
 * @param den denominator
 * @returns num/den
 */ export function BNSafeDiv(num, den) {
    if (BNeq(den)) return BNify(0);
    return BNify(num).div(BNify(den));
}
/**
 * Transform a value to BigNumber string
 * @param value - the value to transform
 * @returns the big number as string
 */ export function BNstring(value) {
    return BNify(value).toString();
}
/**
 * Transform a value to BigNumber fixed to specified decimals
 * @param value - the value to transform
 * @returns the big number as fixed string
 */ export function BNFixed(value = 0, decimals = 0) {
    return BNify(value).toFixed(decimals);
}
/**
 * Is BigInt greather than
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true if greater
 */ export function BNgt(bigInt = 0, value = 0) {
    return BNify(bigInt).gt(BNify(value));
}
/**
 * Is BigInt greather than or equal
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true if greater
 */ export function BNgte(bigInt = 0, value = 0) {
    return BNify(bigInt).gte(BNify(value));
}
/**
 * Is BigInt less than
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true is less than
 */ export function BNlt(bigInt = 0, value = 0) {
    return BNify(bigInt).lt(BNify(value));
}
/**
 * Is BigInt less than or equal
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true is less than or equal
 */ export function BNlte(bigInt = 0, value = 0) {
    return BNify(bigInt).lte(BNify(value));
}
/**
 * Is BigInt equal
 * @param bigInt - the bigint string
 * @param value - the value to compare
 * @returns true if equal
 */ export function BNeq(bigInt = 0, value = 0) {
    return BNify(bigInt).eq(BNify(value));
}
/**
 * Remove all decimals from bigNumberValue
 * @param value - the value to parse
 * @returns the string of the value
 */ export function BNint(value = 0) {
    return BNify(value).integerValue(BigNumber.ROUND_FLOOR).toFixed(0);
}

//# sourceMappingURL=bigint.lib.js.map