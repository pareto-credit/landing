import { BigNumberValue, iBigInt } from '../../core';
import { Token } from '../../tokens';
import { VaultBlock, VaultBlockData, VaultBlockPoolToken, VaultBlockPool } from '../../vault-blocks';
import { Vault, VaultPool, VaultPoolToken, VaultWalletPoolData, VaultWalletPoolTokenData } from '../../vaults';
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
export declare function getPoolWalletBalance(vaultPools: VaultBlockPool[], walletPools: VaultWalletPoolData[], walletPool: VaultWalletPoolData, vaultPoolData?: VaultBlockPool, vaultPool?: VaultPool, tokens?: VaultWalletPoolTokenData[]): iBigInt;
/**
 * Calculate wallet token balance inside a LP pool
 * @param vaultPool vault pool contract data
 * @param walletPool wallet pool contract data
 * @param tokenInfo pool token info
 * @param walletToken pool token wallet info
 * @param token token entity
 * @returns wallet token data
 */
export declare function makeWalletPoolTokenData(poolToken: VaultPoolToken, vaultPool: VaultBlockPool, walletPool: VaultWalletPoolData, vaultPools: VaultBlockPool[], walletPools: VaultWalletPoolData[], poolTokenData?: VaultBlockPoolToken, walletToken?: VaultWalletPoolTokenData, token?: Token): VaultWalletPoolTokenData | undefined;
/**
 * Make wallet pool tokens data
 * @param vaultPool global pool data
 * @param walletPool wallet pool specific data
 * @param poolsTokens pool tokens data
 * @returns wallet pool token data
 */
export declare function makeWalletPoolTokensData(vaultPool: VaultPool, vaultPoolData: VaultBlockPool, walletPool: VaultWalletPoolData, vaultPools: VaultBlockPool[], walletPools: VaultWalletPoolData[], poolsTokens?: Token[]): VaultWalletPoolTokenData[];
/**
 * Get wallet pendle token data
 * @param vaultPool vault pool
 * @param walletPool wallet pool
 * @param tokenInfo token info
 * @param walletToken wallet token data to extend
 * @param token token object
 * @returns wallet napier token data
 */
export declare function makePendleWalletPoolTokenData(poolToken: VaultPoolToken, vaultPools: VaultBlockPool[], walletPools: VaultWalletPoolData[], walletToken?: VaultWalletPoolTokenData): VaultWalletPoolTokenData;
/**
 * Get wallet pool token balance using pool exchange rate
 * @param vaultPool vault pool
 * @param walletPool wallet pool
 * @param tokenInfo token info
 * @param walletToken wallet token data to extend
 * @param token token object
 * @returns wallet pool token data
 */
export declare function getPoolTokenBalanceByRate(poolToken: VaultPoolToken, vaultPool: VaultBlockPool, walletPool: VaultWalletPoolData, walletToken?: VaultWalletPoolTokenData, token?: Token): VaultWalletPoolTokenData;
/**
 * Get wallet pool token data
 * @param vaultPool vault pool
 * @param walletPool wallet pool
 * @param tokenInfo token info
 * @param walletToken wallet token data to extend
 * @param token token object
 * @returns wallet pool token data
 */
export declare function calculateWalletPoolTokenData(poolToken: VaultPoolToken, vaultPool: VaultBlockPool, walletPool: VaultWalletPoolData, poolTokenData?: VaultBlockPoolToken, walletToken?: VaultWalletPoolTokenData): VaultWalletPoolTokenData;
/**
 * Get Pendle underlying token balance
 * @param vaultPools vault pools data
 * @param walletPools wallet pools data
 * @returns pendle underlying token balance
 */
export declare function getPendleWalletBalance(vaultPools: VaultBlockPool[], walletPools: VaultWalletPoolData[]): iBigInt;
/**
 * Get Pendle wallet balance grouped by ref to avoid double-counting
 * This function properly handles multiple Pendle pools with different maturity dates
 * that share the same underlying SY contract
 *
 * Uses pre-calculated balances from walletPools instead of computing from lpBalance/totalSupply
 *
 * @param vaultPools vault pools configuration
 * @param walletPools wallet pools data
 * @param tokenId optional token ID to filter balance by specific token
 * @param timestamp current timestamp for maturity filtering
 * @param options calculation options
 * - includeYT: whether to include YT balance (default: false for LP performance context)
 * - activeOnly: only include pools that haven't reached maturity (default: false)
 * @returns object with total balance and balance by ref
 */
export declare function getPendleWalletBalanceByRef(vaultPools: VaultPool[], walletPools: VaultWalletPoolData[], tokenId?: string, timestamp?: number, options?: {
    includeYT?: boolean;
    activeOnly?: boolean;
}): {
    total: iBigInt;
    byRef: Map<string, iBigInt>;
    activeRefs: string[];
};
/**
 * Get Pendle pool token balance with filters
 * Handles multiple Pendle pools avoiding double-counting and applying filters
 *
 * @param tokenId token ID to get balance for
 * @param walletBlock wallet block
 * @param vaultPools vault pools for filtering and grouping by ref
 * @param poolsFilter specific pools to include
 * @param timestamp timestamp for maturity filtering
 * @param includeYT whether to include YT balance (default: false for LP performance, true for BALANCE_SUSP)
 * @returns total Pendle balance for the token
 */
export declare function getPendlePoolTokenBalance(tokenId: string, walletBlock: WalletBlock | WalletBlockData, vaultPools?: VaultPool[], poolsFilter?: VaultPool[], timestamp?: number, includeYT?: boolean): iBigInt;
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
export declare function getWalletPoolsTokenBalances(tokenId: string, walletPools: VaultWalletPoolData[]): iBigInt;
/**
 * Get pool token balance skipping protocol logics
 * @param token token object
 * @param walletBlock wallet block object
 * @param startBalance start balance
 * @param options calculation options
 * - vaultPools: vault pools for filtering
 * - protocols: filter by protocol
 * - poolsFilter: filter by pools
 * - timestamp: timestamp for maturity filtering
 * - includeYT: whether to include YT balance for Pendle (default: false)
 * @returns token balance in pools
 */
export declare function getWalletPoolTokenBalance(token: Token, walletBlock: WalletBlock | WalletBlockData, startBalance?: BigNumberValue, options?: {
    vaultPools?: VaultPool[];
    protocols?: Web3Protocol[];
    poolsFilter?: VaultPool[];
    timestamp?: number;
    includeYT?: boolean;
}): iBigInt;
/**
 * Get total amount of token balance for a specific wallet
 * @param tokenId token ID
 * @param walletBlock wallet block object
 * @param startBalance start balance
 * @param vaultPools vault pools for filtering
 * @param protocols filter by protocol
 * @param poolsFilter filter by pools
 * @param timestamp timestamp for maturity filtering
 * @param includeYT whether to include YT balance for Pendle (default: false)
 * @returns token total balance
 */
export declare function getWalletStakedTokenBalance(tokenId: string, walletBlock: WalletBlock | WalletBlockData, startBalance?: BigNumberValue, vaultPools?: VaultPool[], protocols?: Web3Protocol[], poolsFilter?: VaultPool[], timestamp?: number, includeYT?: boolean): iBigInt;
/**
 * Get wallet block token total balance
 * @param token token object
 * @param walletBlock wallet block object
 * @param vaultPools vault pools for filtering
 * @param includeYT whether to include YT balance for Pendle (default: false)
 * @returns token balance
 */
export declare function getWalletBlockTokenBalance(token: Token, walletBlock: WalletBlock, vaultPools?: VaultPool[], includeYT?: boolean): iBigInt;
export type WalletBlockBalanceField = 'tokenBalance' | 'uspPools' | 'uspBalance' | 'uspAggregated' | 'suspAggregated' | 'balance' | 'tokenAggregated' | 'poolTokenBalance' | 'poolsBalance';
/**
 * Wallet block balance based on vault type
 * @param walletBlock wallet block
 * @param balanceField balance field to retrieve
 * @param options
 * - token: token object
 * - timestamp: current timestamp for pool end date filtering
 * - protocols: filter by protocols
 * - vaultPools: vault pools data
 * - poolsFilter: filter by pools
 * - startBalance: starting balance
 * - includeYT: whether to include YT balance for Pendle (default: false)
 * @returns wallet block balance
 */
export declare function getWalletBlockBalance(walletBlock: WalletBlock | WalletBlockData, balanceField?: WalletBlockBalanceField, options?: {
    token?: Token;
    timestamp?: number;
    protocols?: Web3Protocol[];
    vaultPools?: VaultPool[];
    poolsFilter?: VaultPool[];
    startBalance?: BigNumberValue;
    includeYT?: boolean;
}): iBigInt;
