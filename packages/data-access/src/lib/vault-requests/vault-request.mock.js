"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultRequestMock", {
    enumerable: true,
    get: function() {
        return VaultRequestMock;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _web3client = require("../web3-client");
const _vaultblocks = require("../vault-blocks");
function VaultRequestMock(options) {
    const request = (0, _vaultblocks.VaultBlockRequestMock)(options);
    return _extends._({}, request, {
        vaultId: (options == null ? void 0 : options.vaultId) || request.vaultId || 'VAULT_ID',
        vaultAddress: (options == null ? void 0 : options.vaultAddress) || request.vaultAddress || _web3client.WEB3_DEFAULT_ADDR
    });
}

//# sourceMappingURL=vault-request.mock.js.map