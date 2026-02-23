import { Axios } from 'axios';
import { Vault, VaultData, VaultPerformBody, VaultsClientModel, VaultsSearchQuery, VaultSyncBody, VaultBlockEventBody, VaultPositionQuery, VaultIntegrationsQuery, VaultSyncBlockBody, VaultsPerformancesQuery, VaultsPerformances, VaultIntegrationsData } from '../vault.model';
import { WalletPosition } from '../../wallet-performances';
import { ApiEntity } from '../../core';
export declare class VaultsClient extends ApiEntity implements VaultsClientModel {
    constructor(axios: Axios);
    /**
     * Create a vault
     * @param body - the vault data
     * @returns the created vault
     */
    create(body: VaultData): Promise<Vault>;
    /**
     * Search vaults by params
     * @param searchParams - the filters to apply
     * @returns a vaults page
     */
    search(searchParams?: VaultsSearchQuery): Promise<import("../../core").Page<Vault>>;
    /**
     * List vaults by params
     * @param searchParams - the filters to apply
     * @returns the vault list
     */
    list(searchParams?: VaultsSearchQuery): Promise<Vault[]>;
    /**
     * Find a vault by params
     * @param searchParams - the filters to apply
     * @returns an optional vault
     */
    findOne(searchParams: VaultsSearchQuery): Promise<Vault | undefined>;
    /**
     * Read a vault by params
     * @param searchParams - the filters to apply
     * @returns the vault
     */
    readOne(searchParams: VaultsSearchQuery): Promise<Vault>;
    /**
     * Get wallet position for a vault
     * @param vaultId - the vault id
     * @param searchParams - the position filters
     * @returns the wallet position
     */
    position(vaultId: string, searchParams: VaultPositionQuery): Promise<WalletPosition>;
    /**
     * Get performances breakdown
     * @param params - the performances filters
     * @returns the performances summary
     */
    performances(params: VaultsPerformancesQuery): Promise<VaultsPerformances>;
    /**
     * Get integrations data
     * @param vaultId - the vault id
     * @param searchParams - the integrations filters
     * @returns the integrations data
     */
    integrations(vaultId: string, searchParams: VaultIntegrationsQuery): Promise<VaultIntegrationsData>;
    /**
     * Sync vault state
     * @param vaultId - the vault id
     * @param body - the sync payload
     * @returns the synced block number
     */
    sync(vaultId: string, body: VaultSyncBody): Promise<number>;
    /**
     * Sync a specific block
     * @param vaultId - the vault id
     * @param body - the sync payload
     * @returns whether the sync happened
     */
    syncBlock(vaultId: string, body: VaultSyncBlockBody): Promise<boolean>;
    /**
     * Emit a block event
     * @param vaultId - the vault id
     * @param body - the event payload
     * @returns void
     */
    block(vaultId: string, body: VaultBlockEventBody): Promise<void>;
    /**
     * Perform a vault action
     * @param vaultId - the vault id
     * @param body - the perform payload
     * @returns void
     */
    perform(vaultId: string, body: VaultPerformBody): Promise<void>;
    /**
     * Cure a vault
     * @param vaultId - the vault id
     * @returns void
     */
    cure(vaultId: string): Promise<void>;
}
