import { BigNumberValue, iBigInt } from '../../core';
import { Token } from '../../tokens';
import { VaultBlock, VaultBlockData } from '../../vault-blocks';
import { Vault, VaultContractPoolData, VaultPool, VaultWalletPoolData, VaultWalletPoolTokenData } from '../../vaults';
import { Web3Protocol } from '../../web3-client';
import { WalletBlock, WalletBlockData } from '../wallet-block.model';
/**
 * Get the total amount of token held by a wallet in a pool
 * @param token token object
 * @param walletPool wallet pool object
 * @returns total amount
 */
export declare function getWalletPoolTokensBalance(tokenId: string, walletPool: VaultWalletPoolData): iBigInt;
/**
 * Get wallet balance converted in tokens including requests
 * @param walletBlock wallet block
 * @param vaultBlock vault block
 * @returns wallet vault balance in underlying
 */
export declare function getWalletBalanceWithRequests(walletBlock: WalletBlockData, vaultBlock: VaultBlockData): iBigInt;
/**
 * Calculate wallet pool balance using tokens or exchangeRate
 * @param walletPool wallet pool data
 * @param vaultPoolData vault pool data
 * @param vaultPool vault pool config
 * @param tokens tokens balances
 * @returns pool wallet balance
 */
export declare function getPoolWalletBalance(vaultPools: VaultContractPoolData[], walletPools: VaultWalletPoolData[], walletPool: VaultWalletPoolData, vaultPoolData?: VaultContractPoolData, vaultPool?: VaultPool, tokens?: VaultWalletPoolTokenData[]): iBigInt;
/**
 * Get Pendle underlying token balance
 * @param vaultPools vault pools data
 * @param walletPools wallet pools data
 * @returns pendle underlying token balance
 */
export declare function getPendleWalletBalance(vaultPools: VaultContractPoolData[], walletPools: VaultWalletPoolData[]): iBigInt;
/**
 * Convert pool token balance to USD
 * @param vault vault
 * @param vaultToken vault token
 * @param vaultBlock vault block
 * @param tokenId pool tokenID
 * @param balance pool token balance
 * @returns pool token balance in USD
 */
export declare function getWalletBlockPoolTokenBalanceUSD(vault: Vault, vaultToken: Token, vaultBlock: VaultBlock, tokenId: string, balance: iBigInt): iBigInt;
/**
 * Get pool token balance based on protocol
 * @param token token object
 * @param walletPool wallet pool
 * @returns pool token balance
 */
export declare function getWalletBlockPoolTokenBalance(tokenId: string, walletPool: VaultWalletPoolData): iBigInt;
/**
 * Get total amount of token balance for a specific wallet
 * @param token token object
 * @param walletBlock wallet block object
 * @returns token total balance
 */
export declare function getWalletBlockTokenBalance(token: Token, walletBlock: WalletBlock, startBalance?: BigNumberValue, protocols?: Web3Protocol[]): iBigInt;
export type WalletBlockBalanceField = 'tokenBalance' | 'uspPools' | 'uspBalance' | 'uspAggregated' | 'suspAggregated' | 'balance' | 'tokenAggregated';
/**
 * Wallet block balance based on vault type
 * @param vaultType vault contract type
 * @param walletBlock wallet block
 * @returns wallet block balance
 */
export declare function getWalletBlockBalance(walletBlock: WalletBlock, balanceField?: WalletBlockBalanceField, options?: {
    token?: Token;
    protocols?: Web3Protocol[];
}): iBigInt;
