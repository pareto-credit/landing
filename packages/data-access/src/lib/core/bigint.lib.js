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
    BNFixed: function() {
        return BNFixed;
    },
    BNFloat: function() {
        return BNFloat;
    },
    BNRoundUpTo: function() {
        return BNRoundUpTo;
    },
    BNSafeDiv: function() {
        return BNSafeDiv;
    },
    BNeq: function() {
        return BNeq;
    },
    BNgt: function() {
        return BNgt;
    },
    BNgte: function() {
        return BNgte;
    },
    BNify: function() {
        return BNify;
    },
    BNint: function() {
        return BNint;
    },
    BNlt: function() {
        return BNlt;
    },
    BNlte: function() {
        return BNlte;
    },
    BNstring: function() {
        return BNstring;
    },
    BNsum: function() {
        return BNsum;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _bignumber = /*#__PURE__*/ _interop_require_default._(require("bignumber.js"));
function BNify(value = 0) {
    return new _bignumber.default(typeof value === 'bigint' ? value.toString() : typeof value === 'object' ? value : String(value));
}
function BNsum(a, b) {
    return BNify(a || 0).plus(BNify(b || 0)).toFixed(0);
}
function BNSafeDiv(num, den) {
    if (BNeq(den)) return BNify(0);
    return BNify(num).div(BNify(den));
}
function BNstring(value) {
    return BNify(value).toString();
}
function BNFixed(value = 0, decimals = 0) {
    return BNify(value).toFixed(decimals);
}
function BNgt(value1 = 0, value2 = 0) {
    return BNify(value1).gt(BNify(value2));
}
function BNgte(value1 = 0, value2 = 0) {
    return BNify(value1).gte(BNify(value2));
}
function BNlt(value1 = 0, value2 = 0) {
    return BNify(value1).lt(BNify(value2));
}
function BNlte(value1 = 0, value2 = 0) {
    return BNify(value1).lte(BNify(value2));
}
function BNeq(value1 = 0, value2 = 0) {
    return BNify(value1).eq(BNify(value2));
}
function BNint(value = 0) {
    return BNify(value).integerValue(_bignumber.default.ROUND_FLOOR).toFixed(0);
}
function BNFloat(value = 0, decimals = 8) {
    return parseFloat(BNify(value).toFixed(decimals)).toString();
}
function BNRoundUpTo(value, decimals) {
    return BNify(value).decimalPlaces(decimals, _bignumber.default.ROUND_CEIL).toNumber();
}

//# sourceMappingURL=bigint.lib.js.map