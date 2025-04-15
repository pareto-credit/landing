export declare const VAULTS_ROUTES_KEY = "vaults";
export declare const VAULTS_IDLE_QUEUE = "IDLE_VAULTS";
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
    };
};
export declare const ERC20_ABI: ({
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    constant?: undefined;
    outputs?: undefined;
    payable?: undefined;
    stateMutability?: undefined;
} | {
    constant: boolean;
    inputs: {
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        name: string;
        type: string;
    }[];
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
