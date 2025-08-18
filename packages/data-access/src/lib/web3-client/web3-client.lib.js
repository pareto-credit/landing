import Web3, { WebSocketProvider, HttpProvider } from 'web3';
import BigNumber from 'bignumber.js';
import { BNify } from '../core';
/**
 * Get Web3 Https Provider
 * @param providers - the web3 providers
 * @param tokens - the provider tokens
 * @returns the Web3 provider data
 */ export function getWeb3HttpsProvider(providers, tokens) {
    const connection = providers.find((c)=>!!c.https);
    if (!(connection == null ? void 0 : connection.https)) {
        throw new Error(`No HTTPS provider available`);
    }
    // Get web3 provider
    const { provider, https } = connection;
    const token = getWeb3ProviderToken(provider, tokens);
    const web3Provider = new HttpProvider(https + token);
    const web3 = new Web3(web3Provider);
    return {
        provider,
        web3
    };
}
/**
 * Get Web3 Socket Provider
 * @param providers - the web3 providers
 * @param tokens - the provider tokens
 * @returns the Web3 provider data
 */ export async function getWeb3SocketProvider(providers, tokens) {
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
    const web3Provider = new WebSocketProvider(wss + token, {}, {
        delay: 500,
        autoReconnect: true,
        maxAttempts: 10000
    });
    const web3 = new Web3(web3Provider);
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
/**
 * Get Web3 provider token
 * @param provider - the provider
 * @param tokens - the provider tokens
 * @returns the token string
 */ export function getWeb3ProviderToken(provider, tokens) {
    let token;
    switch(provider){
        case 'INFURA':
            token = tokens.INFURA;
            break;
        case 'ALCHEMY':
            token = tokens.ALCHEMY;
            break;
        default:
            break;
    }
    if (!token) {
        throw new Error('Token provider not provided');
    }
    return token;
}
/**
 * Get Web3 Payable Options
 * @param web3
 * @param walletAddress
 * @returns the payable options to use for wallet transactions
 */ export async function getWeb3PaypableOptions(web3, { method, from, value, toleranceBearing = 5 }) {
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
/**
 * Get Web3 Gas Limit
 * @param method - the method to simulate for the gas estimation
 * @param callOptions - the call options
 * @param toleranceBearing - the tolerance bearing percentage to add to the estimation
 * @param minGasLimit - the minimum gas limit
 * @returns the gas limit of the method to call
 */ export async function getWeb3GasLimit(method, callOptions = {}, toleranceBearing = 0, minGasLimit = 0) {
    /**
   * Here try to estimate the GAS Limit
   */ const gas = await method.estimateGas(callOptions);
    let gasLimit = BigNumber.maximum(BNify(gas), BNify(minGasLimit));
    // Add tolerance percentage bearing if necessary
    if (toleranceBearing > 0) {
        const tolerancePercentage = BNify(toleranceBearing).div(100);
        gasLimit = gasLimit.plus(gasLimit.times(tolerancePercentage));
    }
    return gasLimit.integerValue(BigNumber.ROUND_FLOOR).toString();
}
/**
 * Get Web3 Transaction Gas price
 * @param web3 - the web3 instance
 * @returns the gas price to use for transaction
 */ export async function getWeb3FeeData(web3) {
    const { gasPrice, maxFeePerGas, maxPriorityFeePerGas, baseFeePerGas } = await web3.eth.calculateFeeData();
    return {
        gasPrice: gasPrice == null ? void 0 : gasPrice.toString(),
        maxFeePerGas: maxFeePerGas == null ? void 0 : maxFeePerGas.toString(),
        maxPriorityFeePerGas: maxPriorityFeePerGas == null ? void 0 : maxPriorityFeePerGas.toString(),
        baseFeePerGas: baseFeePerGas == null ? void 0 : baseFeePerGas.toString()
    };
}
/**
 * Get Web3 Gas Price
 * @param web3 - the web3 instance
 * @returns the gas price to use for transaction
 */ export async function getWeb3GasPrice(web3) {
    const gasPrice = await web3.eth.getGasPrice();
    return BNify(gasPrice).div(1e9);
}
/**
 * Get web3 transaction fee
 * @param web3 - the web3 instance
 * @param method - the payable method
 * @param walletAddress - the wallet address
 * @param ETHPrice - the ETH Price
 * @returns
 */ export async function getWeb3TransactionFee(web3, method, walletAddress, options = {}) {
    const { ETHPrice, toleranceBearing = 5 } = options;
    // Load gas prices
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await getWeb3GasLimit(method, {
        from: walletAddress
    }, toleranceBearing);
    const gasETH = BNify(gasLimit).times(BNify(gasPrice)).div(1e18);
    const gasUSD = ETHPrice ? gasETH.times(ETHPrice || 0) : undefined;
    return {
        ETH: gasETH.toString(),
        USD: gasUSD == null ? void 0 : gasUSD.toString()
    };
}

//# sourceMappingURL=web3-client.lib.js.map