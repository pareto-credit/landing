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
    VAULT_BLOCKS_ROUTES_KEY: function() {
        return VAULT_BLOCKS_ROUTES_KEY;
    },
    VAULT_CDO_EPOCH_INITIAL_STATE: function() {
        return VAULT_CDO_EPOCH_INITIAL_STATE;
    }
});
const VAULT_BLOCKS_ROUTES_KEY = 'vault-blocks';
const VAULT_CDO_EPOCH_INITIAL_STATE = {
    apr: 0,
    lastInterest: '0',
    expectedInterest: '0',
    deposits: '0',
    duration: 0,
    unclaimedFees: '0',
    status: 'WAITING'
};

//# sourceMappingURL=vault-block.const.js.map