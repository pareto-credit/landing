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
    WALLET_FIELDS: function() {
        return WALLET_FIELDS;
    },
    WALLET_SORT_FIELDS: function() {
        return WALLET_SORT_FIELDS;
    },
    WalletErrorCodes: function() {
        return WalletErrorCodes;
    },
    WalletRoutes: function() {
        return WalletRoutes;
    },
    WalletsRoutingKey: function() {
        return WalletsRoutingKey;
    },
    sWallet: function() {
        return sWallet;
    },
    sWalletAccess: function() {
        return sWalletAccess;
    },
    sWalletAffiliate: function() {
        return sWalletAffiliate;
    },
    sWalletBody: function() {
        return sWalletBody;
    },
    sWalletCampaign: function() {
        return sWalletCampaign;
    },
    sWalletData: function() {
        return sWalletData;
    },
    sWalletPortfolioFilters: function() {
        return sWalletPortfolioFilters;
    },
    sWalletPortfolioQuery: function() {
        return sWalletPortfolioQuery;
    },
    sWalletReferred: function() {
        return sWalletReferred;
    },
    sWalletRole: function() {
        return sWalletRole;
    },
    sWalletSignature: function() {
        return sWalletSignature;
    },
    sWalletUserBody: function() {
        return sWalletUserBody;
    },
    sWalletVault: function() {
        return sWalletVault;
    },
    sWalletsSearchQuery: function() {
        return sWalletsSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _walletconst = require("./wallet.const");
const _core = require("../core");
const _vaults = require("../vaults");
function sWallet(isPartial) {
    return _fluentjsonschema.default.object().id('#wallet').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sWalletData(isPartial));
}
function sWalletData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('address', (0, _core.sBCAddress)()).required(isPartial ? [] : [
        'address'
    ]).extend(sWalletBody());
}
function sWalletBody() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('userId', (0, _core.sStringId)()).prop('ens', _fluentjsonschema.default.string()).prop('referralCode', _fluentjsonschema.default.string().minLength(6).maxLength(12)).prop('signatures', _fluentjsonschema.default.array().items(sWalletSignature())).prop('campaigns', _fluentjsonschema.default.array().items(sWalletCampaign())).prop('affiliates', _fluentjsonschema.default.array().items(sWalletAffiliate())).prop('referred', _fluentjsonschema.default.array().items(sWalletReferred()));
}
function sWalletUserBody() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name', _fluentjsonschema.default.string()).description('User name').prop('email', (0, _core.sEmail)()).description('User email').prop('telegram', _fluentjsonschema.default.string()).description('User telegram profile');
}
function sWalletSignature() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('_id', (0, _core.sStringId)()).required().prop('hash', (0, _core.sHexString)()).required().prop('signedOn', (0, _core.sDateString)()).required();
}
function sWalletCampaign() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('_id', (0, _core.sStringId)()).required().prop('referralCode', _fluentjsonschema.default.string()).required().prop('activatedOn', (0, _core.sDateString)()).required();
}
function sWalletAffiliate() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('_id', (0, _core.sStringId)()).required().prop('address', (0, _core.sBCAddress)()).required().prop('activatedOn', (0, _core.sDateString)()).required();
}
function sWalletReferred() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('referralCode', _fluentjsonschema.default.string().minLength(6).maxLength(12)).required().extend(sWalletAffiliate());
}
function sWalletPortfolioQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).extend((0, _vaults.sVaultsSearchQuery)()).extend(sWalletPortfolioFilters());
}
function sWalletPortfolioFilters() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('VaultID that must match').prop('block:gte', _fluentjsonschema.default.number()).description('Start block').prop('block:lte', _fluentjsonschema.default.number()).description('End Block').prop('timestamp:gte', _fluentjsonschema.default.number()).description('Start timestamp').prop('timestamp:lte', _fluentjsonschema.default.number()).description('End timestamp');
}
function sWalletAccess() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaults', _fluentjsonschema.default.array().items(sWalletVault())).required().prop('canAccessManager', _fluentjsonschema.default.boolean()).required();
}
function sWalletVault() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', (0, _core.sStringId)()).required().prop('contractType', (0, _vaults.sVaultContractType)()).required().prop('role', sWalletRole()).required();
}
function sWalletRole() {
    return _fluentjsonschema.default.string().enum([
        'MANAGER',
        'BORROWER'
    ]);
}
var WalletErrorCodes;
(function(WalletErrorCodes) {
    WalletErrorCodes["vaultsMissing"] = "VAULT_IDS_MISSING";
    WalletErrorCodes["alreadyExists"] = "WALLET_ALREADY_EXISTS";
    WalletErrorCodes["notDeletable"] = "WALLET_NOT_DELETABLE";
    WalletErrorCodes["malformed"] = "WALLET_ADDRESS_MALFORMED";
    WalletErrorCodes["notFound"] = "WALLET_NOT_FOUND";
})(WalletErrorCodes || (WalletErrorCodes = {}));
var WalletRoutes;
(function(WalletRoutes) {
    WalletRoutes[WalletRoutes["v1Access"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/:walletId/access`] = "v1Access";
    WalletRoutes[WalletRoutes["v1Create"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}`] = "v1Create";
    WalletRoutes[WalletRoutes["v1Delete"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/:walletId`] = "v1Delete";
    WalletRoutes[WalletRoutes["v1Ensure"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/ensure`] = "v1Ensure";
    WalletRoutes[WalletRoutes["v1Perform"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/:walletId/perform`] = "v1Perform";
    WalletRoutes[WalletRoutes["v1Portfolio"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/:walletId/portfolio`] = "v1Portfolio";
    WalletRoutes[WalletRoutes["v1Read"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/:walletId`] = "v1Read";
    WalletRoutes[WalletRoutes["v1Referral"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/:walletId/referral`] = "v1Referral";
    WalletRoutes[WalletRoutes["v1Search"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}`] = "v1Search";
    WalletRoutes[WalletRoutes["v1Update"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/:walletId`] = "v1Update";
    WalletRoutes[WalletRoutes["v1User"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/:walletId/user`] = "v1User";
    WalletRoutes[WalletRoutes["v1Vaults"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/:walletId/vaults`] = "v1Vaults";
    WalletRoutes[WalletRoutes["v1History"] = `v1/${_walletconst.WALLETS_ROUTES_KEY}/:walletId/history/:vaultId`] = "v1History";
})(WalletRoutes || (WalletRoutes = {}));
const WALLET_FIELDS = [
    '_id',
    'address',
    'userId',
    'ens',
    'signatures',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
const WALLET_SORT_FIELDS = [
    'address'
];
function sWalletsSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('address', (0, _core.sBCAddress)()).description('Wallet blockchain address').extend((0, _core.sPageSearchQuery)(WALLET_FIELDS, WALLET_SORT_FIELDS));
}
var WalletsRoutingKey;
(function(WalletsRoutingKey) {
    WalletsRoutingKey["paretoEvents"] = "pareto.wallet.*";
    WalletsRoutingKey["paretoPerform"] = "pareto.wallet.perform";
})(WalletsRoutingKey || (WalletsRoutingKey = {}));

//# sourceMappingURL=wallet.model.js.map