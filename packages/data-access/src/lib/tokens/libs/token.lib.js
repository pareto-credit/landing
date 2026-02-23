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
    convertTokenAmount: function() {
        return convertTokenAmount;
    },
    convertTokensAmounts: function() {
        return convertTokensAmounts;
    },
    fixAmount: function() {
        return fixAmount;
    },
    fixTokenAmount: function() {
        return fixTokenAmount;
    },
    getTokenAmount: function() {
        return getTokenAmount;
    },
    getTokenUSDAmount: function() {
        return getTokenUSDAmount;
    },
    minTokenAmount: function() {
        return minTokenAmount;
    },
    normalizeAmount: function() {
        return normalizeAmount;
    },
    normalizeTokenAmount: function() {
        return normalizeTokenAmount;
    },
    parseAmount: function() {
        return parseAmount;
    },
    parseTokenAmount: function() {
        return parseTokenAmount;
    }
});
const _core = require("../../core");
function fixTokenAmount(token, amount) {
    return fixAmount(amount, token.decimals);
}
function fixAmount(amount, decimals) {
    return (0, _core.BNify)(amount).div(10 ** decimals);
}
function normalizeAmount(amount, decimals) {
    return (0, _core.BNify)((0, _core.BNify)(amount).times(10 ** decimals).toFixed(0));
}
function normalizeTokenAmount(token, amount) {
    return normalizeAmount(amount, token.decimals);
}
function getTokenAmount(token, amount = 1, decimals) {
    return (0, _core.BNFixed)((0, _core.BNify)(amount).times(10 ** (decimals || token.decimals)));
}
function parseAmount(amount = 0, decimals = 2) {
    return (0, _core.numberFormat)(Number(amount), {
        minimumFractionDigits: decimals
    });
}
function parseTokenAmount(token, amount = 0) {
    const fixedValue = fixTokenAmount(token, amount);
    return (0, _core.numberFormat)(Number(fixedValue.toNumber()), {
        minimumFractionDigits: token.decimals
    });
}
function minTokenAmount(token) {
    return fixTokenAmount(token, 1);
}
function getTokenUSDAmount(amount = 1, price = 1000000) {
    // Format token price
    const tokenPrice = (0, _core.BNify)(price).div(10 ** 6);
    return (0, _core.BNify)(amount).times(tokenPrice).toString();
}
function convertTokenAmount(sourceToken, destToken, amount, options = {}) {
    const { price = 1, amountToken = 'SOURCE', amountType = 'NORMALIZED', resultType = 'NORMALIZED' } = options;
    const sourceBase = (0, _core.BNify)(`1e${sourceToken.decimals}`);
    const destBase = (0, _core.BNify)(`1e${destToken.decimals}`);
    const tokenPrice = (0, _core.BNify)(price);
    const getNormalizedAmount = (token, value)=>amountType === 'FIXED' ? normalizeTokenAmount(token, value) : (0, _core.BNify)(value);
    // Check token price
    if (tokenPrice.isZero()) {
        return '0';
    }
    // Dest token amount
    if (amountToken === 'DEST') {
        const destAmount = getNormalizedAmount(destToken, amount);
        const normalizedResult = destAmount.times(sourceBase).div(tokenPrice.times(destBase)).toFixed(0);
        return resultType === 'FIXED' ? fixTokenAmount(sourceToken, normalizedResult).toString() : normalizedResult;
    }
    const sourceAmount = getNormalizedAmount(sourceToken, amount);
    const normalizedResult = sourceAmount.times(tokenPrice).times(destBase).div(sourceBase).toFixed(0);
    return resultType === 'FIXED' ? fixTokenAmount(destToken, normalizedResult).toString() : normalizedResult;
}
function convertTokensAmounts(sourceToken, destToken, options = {}) {
    const { price = 1, sourceTokenAmount: sTokenAmount, sourceFixedAmount: sFixedAmount, destTokenAmount: dTokenAmount, destFixedAmount: dFixedAmount } = options;
    const zeroResult = {
        sourceTokenAmount: '0',
        sourceFixedAmount: '0',
        destTokenAmount: '0',
        destFixedAmount: '0'
    };
    const isDefined = (value)=>value !== undefined && value !== null && value !== '';
    // Check amounts
    if (!isDefined(sTokenAmount) && !isDefined(sFixedAmount) && !isDefined(dTokenAmount) && !isDefined(dFixedAmount)) {
        return zeroResult;
    }
    // Start from normalized amounts
    const normalizedSource = isDefined(sTokenAmount) ? (0, _core.BNify)(sTokenAmount).toFixed(0) : isDefined(sFixedAmount) ? convertTokenAmount(sourceToken, sourceToken, sFixedAmount || 0, {
        amountType: 'FIXED'
    }) : undefined;
    const normalizedDest = isDefined(dTokenAmount) ? (0, _core.BNify)(dTokenAmount).toFixed(0) : isDefined(dFixedAmount) ? convertTokenAmount(destToken, destToken, dFixedAmount || 0, {
        amountType: 'FIXED'
    }) : undefined;
    if (!normalizedSource && !normalizedDest) {
        return zeroResult;
    }
    const resolvedSource = normalizedSource != null ? normalizedSource : convertTokenAmount(sourceToken, destToken, normalizedDest || 0, {
        price,
        amountToken: 'DEST'
    });
    const resolvedDest = normalizedDest != null ? normalizedDest : convertTokenAmount(sourceToken, destToken, resolvedSource, {
        price
    });
    return {
        sourceTokenAmount: resolvedSource,
        sourceFixedAmount: convertTokenAmount(sourceToken, sourceToken, resolvedSource, {
            resultType: 'FIXED'
        }),
        destTokenAmount: resolvedDest,
        destFixedAmount: convertTokenAmount(destToken, destToken, resolvedDest, {
            resultType: 'FIXED'
        })
    };
}

//# sourceMappingURL=token.lib.js.map