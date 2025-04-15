import { OPERATORS } from './operator.const';
/**
 * Get operator icon
 * @param operator - the operator
 * @returns the operator icon if present
 */ export function getOperatorIcon(operatorCode, square) {
    const operator = OPERATORS.find((o)=>o.code === operatorCode);
    return square ? operator == null ? void 0 : operator.logoSquare : operator == null ? void 0 : operator.logo;
}

//# sourceMappingURL=operator.lib.js.map