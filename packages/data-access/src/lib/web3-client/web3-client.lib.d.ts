import Web3, { PayableCallOptions } from 'web3';
import { PayableMethodObject } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
import { Web3TransactionFee, Web3PayableOptionsParams, Web3Provider, Web3ProviderConnection, Web3RPCProvider, Web3Tokens } from './web3-client.model';
/**
 * Get Web3 Https Provider
 * @param providers - the web3 providers
 * @param tokens - the provider tokens
 * @returns the Web3 provider data
 */
export declare function getWeb3HttpsProvider(providers: Web3ProviderConnection[], tokens: Web3Tokens): Web3Provider;
/**
 * Get Web3 Socket Provider
 * @param providers - the web3 providers
 * @param tokens - the provider tokens
 * @returns the Web3 provider data
 */
export declare function getWeb3SocketProvider(providers: Web3ProviderConnection[], tokens: Web3Tokens): Promise<Web3Provider>;
/**
 * Get Web3 provider token
 * @param provider - the provider
 * @param tokens - the provider tokens
 * @returns the token string
 */
export declare function getWeb3ProviderToken(provider: Web3RPCProvider, tokens: Web3Tokens): string;
/**
 * Get Web3 Payable Options
 * @param web3
 * @param walletAddress
 * @returns the payable options to use for wallet transactions
 */
export declare function getWeb3PaypableOptions(web3: Web3, { method, from, value, toleranceBearing }: Web3PayableOptionsParams): Promise<PayableCallOptions>;
/**
 * Get Web3 Gas Limit
 * @param method - the method to simulate for the gas estimation
 * @param callOptions - the call options
 * @param toleranceBearing - the tolerance bearing percentage to add to the estimation
 * @param minGasLimit - the minimum gas limit
 * @returns the gas limit of the method to call
 */
export declare function getWeb3GasLimit(method: PayableMethodObject, callOptions?: PayableCallOptions, toleranceBearing?: number, minGasLimit?: number): Promise<string>;
/**
 * Get Web3 Transaction Gas price
 * @param web3 - the web3 instance
 * @returns the gas price to use for transaction
 */
export declare function getWeb3FeeData(web3: Web3): Promise<{
    gasPrice: string | undefined;
    maxFeePerGas: string | undefined;
    maxPriorityFeePerGas: string | undefined;
    baseFeePerGas: string | undefined;
}>;
/**
 * Get Web3 Gas Price
 * @param web3 - the web3 instance
 * @returns the gas price to use for transaction
 */
export declare function getWeb3GasPrice(web3: Web3): Promise<BigNumber>;
/**
 * Get web3 transaction fee
 * @param web3 - the web3 instance
 * @param method - the payable method
 * @param walletAddress - the wallet address
 * @param ETHPrice - the ETH Price
 * @returns
 */
export declare function getWeb3TransactionFee(web3: Web3, method: PayableMethodObject, walletAddress: string, options?: {
    ETHPrice?: string;
    toleranceBearing?: number;
}): Promise<Web3TransactionFee>;
