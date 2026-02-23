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
    getWeb3FeeData: function() {
        return getWeb3FeeData;
    },
    getWeb3GasLimit: function() {
        return getWeb3GasLimit;
    },
    getWeb3GasPrice: function() {
        return getWeb3GasPrice;
    },
    getWeb3HttpsProvider: function() {
        return getWeb3HttpsProvider;
    },
    getWeb3PaypableOptions: function() {
        return getWeb3PaypableOptions;
    },
    getWeb3ProviderToken: function() {
        return getWeb3ProviderToken;
    },
    getWeb3SocketProvider: function() {
        return getWeb3SocketProvider;
    },
    getWeb3TransactionFee: function() {
        return getWeb3TransactionFee;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _web3 = /*#__PURE__*/ _interop_require_wildcard._(require("web3"));
const _bignumber = /*#__PURE__*/ _interop_require_default._(require("bignumber.js"));
const _core = require("../core");
function getWeb3HttpsProvider(providers, tokens) {
    const connection = providers.find((c)=>!!c.https);
    if (!(connection == null ? void 0 : connection.https)) {
        throw new Error(`No HTTPS provider available`);
    }
    // Get web3 provider
    const { provider, https } = connection;
    const token = getWeb3ProviderToken(provider, tokens);
    const web3Provider = new _web3.HttpProvider(https + token);
    const web3 = new _web3.default(web3Provider);
    return {
        provider,
        web3
    };
}
async function getWeb3SocketProvider(providers, tokens) {
    for (const connection of providers){
        try {
            const provider = await getSocketProvider(connection, tokens);
            return provider;
        } catch (error) {
            continue;
        }
    }
    throw new Error(`No WSS provider available`);
}
async function getSocketProvider({ wss, provider }, tokens) {
    if (!wss) {
        throw new Error(`No WSS provider available`);
    }
    // Get web3 provider
    const token = getWeb3ProviderToken(provider, tokens);
    const web3Provider = new _web3.WebSocketProvider(wss + token, {}, {
        delay: 500,
        autoReconnect: true,
        maxAttempts: 10000
    });
    const web3 = new _web3.default(web3Provider);
    // Check connection
    const networkId = await Promise.race([
        web3.eth.net.getId(),
        new Promise(function(resolve, reject) {
            setTimeout(function() {
                reject('Timeout');
            }, 2000);
        })
    ]);
    if (!networkId) {
        throw new Error(`WSS unreachable ${wss}`);
    }
    return {
        web3,
        provider
    };
}
function getWeb3ProviderToken(provider, tokens) {
    let token;
    switch(provider){
        case 'INFURA':
            token = tokens.INFURA;
            break;
        case 'ALCHEMY':
            token = tokens.ALCHEMY;
            break;
        case 'PUBLIC':
            return '';
        default:
            break;
    }
    if (!token) {
        throw new Error('Token provider not provided');
    }
    return token;
}
async function getWeb3PaypableOptions(web3, { method, from, value, toleranceBearing = 5 }) {
    // Get GAS info for the method call
    const chainID = await web3.eth.getChainId();
    const gas = await getWeb3GasLimit(method, {
        from
    }, toleranceBearing).catch(()=>undefined);
    /* const { maxFeePerGas, maxPriorityFeePerGas, gasPrice } = await getWeb3FeeData(
    web3
  ) */ // MainNET check
    if (chainID === 1n) {
        return {
            from,
            gas,
            value
        };
    }
    // Pass only the GAS PRICE
    return {
        /**
     * The address transaction should be made from
     */ from,
        /**
     * The maximum gas provided for a transaction (gas limit).
     */ gas,
        /**
     * The gas price in WEI to use for transactions.
     * Not necessary if maxFeePerGas is passed
     */ // gasPrice,
        value
    };
}
async function getWeb3GasLimit(method, callOptions = {}, toleranceBearing = 0, minGasLimit = 0) {
    /**
   * Here try to estimate the GAS Limit
   */ const gas = await method.estimateGas(callOptions);
    let gasLimit = _bignumber.default.maximum((0, _core.BNify)(gas), (0, _core.BNify)(minGasLimit));
    // Add tolerance percentage bearing if necessary
    if (toleranceBearing > 0) {
        const tolerancePercentage = (0, _core.BNify)(toleranceBearing).div(100);
        gasLimit = gasLimit.plus(gasLimit.times(tolerancePercentage));
    }
    return gasLimit.integerValue(_bignumber.default.ROUND_FLOOR).toString();
}
async function getWeb3FeeData(web3) {
    const { gasPrice, maxFeePerGas, maxPriorityFeePerGas, baseFeePerGas } = await web3.eth.calculateFeeData();
    return {
        gasPrice: gasPrice == null ? void 0 : gasPrice.toString(),
        maxFeePerGas: maxFeePerGas == null ? void 0 : maxFeePerGas.toString(),
        maxPriorityFeePerGas: maxPriorityFeePerGas == null ? void 0 : maxPriorityFeePerGas.toString(),
        baseFeePerGas: baseFeePerGas == null ? void 0 : baseFeePerGas.toString()
    };
}
async function getWeb3GasPrice(web3) {
    const gasPrice = await web3.eth.getGasPrice();
    return (0, _core.BNify)(gasPrice).div(1e9);
}
async function getWeb3TransactionFee(web3, method, walletAddress, options = {}) {
    const { ETHPrice, toleranceBearing = 5 } = options;
    // Load gas prices
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await getWeb3GasLimit(method, {
        from: walletAddress
    }, toleranceBearing);
    const gasETH = (0, _core.BNify)(gasLimit).times((0, _core.BNify)(gasPrice)).div(1e18);
    const gasUSD = ETHPrice ? gasETH.times(ETHPrice || 0) : undefined;
    return {
        ETH: gasETH.toString(),
        USD: gasUSD == null ? void 0 : gasUSD.toString()
    };
}

//# sourceMappingURL=web3-client.lib.js.map