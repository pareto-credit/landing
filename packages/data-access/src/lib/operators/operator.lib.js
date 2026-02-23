"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOperatorIcon", {
    enumerable: true,
    get: function() {
        return getOperatorIcon;
    }
});
const _operatorconst = require("./operator.const");
function getOperatorIcon(operatorCode, square) {
    const operator = _operatorconst.OPERATORS.find((o)=>o.code === operatorCode);
    return square ? operator == null ? void 0 : operator.logoSquare : operator == null ? void 0 : operator.logo;
}

//# sourceMappingURL=operator.lib.js.map