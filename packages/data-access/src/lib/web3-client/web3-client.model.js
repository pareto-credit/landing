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
    sAbiCode: function() {
        return sAbiCode;
    },
    sERC20Token: function() {
        return sERC20Token;
    },
    sGenericContract: function() {
        return sGenericContract;
    },
    sWeb3BaseContract: function() {
        return sWeb3BaseContract;
    },
    sWeb3Protocol: function() {
        return sWeb3Protocol;
    },
    sWeb3ProtocolContract: function() {
        return sWeb3ProtocolContract;
    },
    sWeb3ProviderConnection: function() {
        return sWeb3ProviderConnection;
    },
    sWeb3RPCProvider: function() {
        return sWeb3RPCProvider;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
function sERC20Token() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('decimals', _fluentjsonschema.default.number()).required().prop('symbol', _fluentjsonschema.default.string()).required().prop('name', _fluentjsonschema.default.string()).required().prop('address', (0, _core.sBCAddress)()).required();
}
function sWeb3Protocol() {
    return _fluentjsonschema.default.string().enum([
        'Idle',
        'Clearpool',
        'AaveV2',
        'Morpho',
        'Gearbox',
        'Compound',
        'Lido',
        'InstadApp',
        'Ethena',
        'UniswapV2',
        'UniswapV3',
        'Curve',
        'Sky',
        'Balancer',
        'BalancerGauge',
        'NapierPT',
        'NapierYT',
        'NapierLP',
        'PendlePT',
        'PendleLP',
        'PendleSY',
        'PendleYT',
        'Euler',
        'EulerSupply',
        'Penpie',
        'TermFinance'
    ]);
}
function sWeb3ProviderConnection() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('provider', sWeb3RPCProvider()).description('The RPC provider.').required().prop('https', _fluentjsonschema.default.string()).description('The RPC official https URL.').prop('wss', _fluentjsonschema.default.string()).description('The RPC official wss URL.');
}
function sWeb3RPCProvider() {
    return _fluentjsonschema.default.string().enum([
        'INFURA',
        'ALCHEMY',
        'PUBLIC'
    ]);
}
function sWeb3BaseContract() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('address', (0, _core.sBCAddress)()).required().prop('abi', (0, _core.sAbiContract)()).prop('abiCode', sAbiCode());
}
function sWeb3ProtocolContract() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('protocol', sWeb3Protocol()).prop('fromBlock', (0, _core.sBigInt)()).prop('operatorId', (0, _core.sStringId)()).extend(sWeb3BaseContract());
}
function sGenericContract() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('address', (0, _core.sBCAddress)()).required().prop('abi', (0, _core.sAbiContract)()).prop('abiCode', sAbiCode()).required();
}
function sAbiCode() {
    return _fluentjsonschema.default.string().enum([
        'ERC20',
        'CDO_MAIN_V1',
        'CDO_MAIN_V2',
        'CDO_MAIN_V3',
        'CDO_MAIN_V4',
        'CDO_STRATEGY_MAIN_V1',
        'CDO_STRATEGY_MAIN_V2',
        'CDO_STRATEGY_MAIN_V3',
        'BestYield_MAIN_V1',
        'BestYield_MAIN_V2',
        'CDO_EPOCH_MAIN_V1',
        'CDO_EPOCH_MAIN_V2',
        'CDO_EPOCH_MAIN_V3',
        'CDO_EPOCH_MAIN_V4',
        'CDO_EPOCH_DEPOSIT_QUEUE_V1',
        'CDO_EPOCH_DEPOSIT_QUEUE_V2',
        'CDO_EPOCH_STRATEGY_MAIN_V1',
        'CDO_EPOCH_STRATEGY_MAIN_V2',
        'CDO_EPOCH_WRITEOFF_V1',
        'PARETO_DOLLAR_MAIN_V1',
        'PARETO_DOLLAR_QUEUE_V1',
        'PARETO_DOLLAR_STAKING_V1',
        'ORACLE_AaveV2_V1',
        'ORACLE_Balancer_V1',
        'ORACLE_Clearpool_V1',
        'ORACLE_PendleSY_V1',
        'ORACLE_PendlePT_V1',
        'ORACLE_Euler_V1',
        'POOL_AaveV2_V1',
        'POOL_Balancer_V1',
        'POOL_BalancerGauge_V1',
        'POOL_Compound_V1',
        'POOL_Compound_V2',
        'POOL_Ethena_V1',
        'POOL_Gearbox_V1',
        'POOL_Idle_V1',
        'POOL_InstadApp_V1',
        'POOL_Morpho_V1',
        'POOL_NapierLP_V1',
        'POOL_NapierPT_V1',
        'POOL_NapierYT_V1',
        'POOL_PendleLP_V1',
        'POOL_PendlePT_V1',
        'POOL_PendleYT_V1',
        'POOL_Sky_V1',
        'POOL_Euler_V1',
        'POOL_TermFinance_V1'
    ]);
}

//# sourceMappingURL=web3-client.model.js.map