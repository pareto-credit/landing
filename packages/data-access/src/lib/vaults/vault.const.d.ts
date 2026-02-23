import { TransactionType } from '../transactions';
export declare const VAULTS_ROUTES_KEY = "vaults";
export declare const VAULTS_PARETO_QUEUE = "PARETO_VAULTS";
export declare const VAULTS_BC_QUEUE = "BC_VAULTS";
export declare const VAULT_SIGNATURES: {
    CDO_EPOCH: {
        startEpoch: string;
        stopEpoch: string;
        stopEpochWithDuration: string;
        getInstantWithdrawFunds: string;
        claimWithdraw: string;
        claimInstantWithdraw: string;
        requestDeposit: string;
        deleteDepositRequest: string;
        processDeposits: string;
        claimDepositRequest: string;
        requestWithdraw: string;
        deleteWithdrawRequest: string;
        processWithdrawRequests: string;
        processWithdrawClaims: string;
        claimWithdrawRequest: string;
        requestWriteOff: string;
        deleteWriteOffRequest: string;
        fulfillWriteOffRequest: string;
        writeOffDeposit: string;
    };
};
export declare const VAULT_SIGNATURES_TYPE: {
    [signature: string]: TransactionType;
};
/**
 * Pareto
 */
export declare const sUSDS_ADDRESS = "0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD";
export declare const sUSDS_SWAPPER_ADDRESS = "0xA188EEC8F81263234dA3622A406892F3D630f98c";
