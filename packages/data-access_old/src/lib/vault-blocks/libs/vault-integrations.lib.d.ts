import { VaultIntegration, VaultIntegrationsData } from '../../vaults';
import { VaultContractCdoData } from '../vault-block.model';
export interface VaultIntegrationOptions {
    chainId?: number;
    tokenSymbol?: string;
    vaultType?: string;
    cdoData?: VaultContractCdoData;
}
/**
 * Get vault integrations data
 * @param integrations vault integrations
 * @returns vault integrations data
 */
export declare function getVaultIntegrationsData(integrations: VaultIntegration[], options?: VaultIntegrationOptions): Promise<VaultIntegrationsData>;
/**
 * Get tranche APR depending on tranche split ratio
 * @param strategyApr base strategy APR
 * @param trancheType AA | BB
 * @param cdoData cdo data from contract
 * @returns tranche APR
 */
export declare function getTrancheApr(strategyApr: number, trancheType: string, cdoData: VaultContractCdoData): number;
