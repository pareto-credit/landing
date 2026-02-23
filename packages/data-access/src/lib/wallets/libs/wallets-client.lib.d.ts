import { Axios } from 'axios';
import { Wallet, WalletAccess, WalletPortfolioQuery, WalletUserBody, WalletsClientModel, WalletsSearchQuery, WalletVaultHistoryQuery } from '../wallet.model';
import { WalletPortfolio, WalletPosition, WalletVaultHistory } from '../../wallet-performances';
import { User } from '../../users';
import { ApiEntity, Page } from '../../core';
export declare class WalletsClient extends ApiEntity implements WalletsClientModel {
    constructor(axios: Axios);
    /**
     * Search wallets by params
     * @param searchParams - the filters to apply
     * @returns a wallets page
     */
    search(searchParams?: WalletsSearchQuery): Promise<Page<Wallet>>;
    /**
     * List wallets by params
     * @param searchParams - the filters to apply
     * @returns the wallets list
     */
    list(searchParams?: WalletsSearchQuery): Promise<Wallet[]>;
    /**
     * Find a wallet by params
     * @param searchParams - the filters to apply
     * @returns an optional wallet
     */
    findOne(searchParams?: WalletsSearchQuery): Promise<Wallet | undefined>;
    /**
     * Read a wallet by params
     * @param searchParams - the filters to apply
     * @returns the wallet
     */
    readOne(searchParams: WalletsSearchQuery): Promise<Wallet>;
    /**
     * Get wallet portfolio data
     * @param walletId - the wallet id
     * @param params - the portfolio filters
     * @returns the wallet portfolio
     */
    portfolio(walletId: string, params?: WalletPortfolioQuery): Promise<WalletPortfolio>;
    /**
     * Get wallet vault positions
     * @param walletId - the wallet id
     * @param searchParams - the portfolio filters
     * @returns the wallet positions
     */
    vaults(walletId: string, searchParams?: WalletPortfolioQuery): Promise<WalletPosition[]>;
    /**
     * Get wallet vault history
     * @param walletId - the wallet id
     * @param searchParams - the portfolio filters
     * @returns the wallet positions
     */
    vault(walletId: string, vaultId: string, params?: WalletVaultHistoryQuery): Promise<Page<WalletVaultHistory>>;
    /**
     * Ensure wallet existence by address
     * @param address - the wallet address
     * @returns the ensured wallet
     */
    ensure(address: string): Promise<Wallet>;
    /**
     * Attach a user profile to a wallet
     * @param walletId - the wallet id
     * @param body - the user payload
     * @returns the updated user
     */
    user(walletId: string, body: WalletUserBody): Promise<User>;
    /**
     * Register a referral for a wallet
     * @param walletId - the wallet id
     * @param referral - the referral code
     * @returns the updated wallet
     */
    referral(walletId: string, referral: string): Promise<Wallet>;
    /**
     * Read wallet access policies
     * @param walletId - the wallet id
     * @returns the wallet access object
     */
    access(walletId: string): Promise<WalletAccess>;
}
