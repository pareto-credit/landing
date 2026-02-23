export declare const GNOSIS_CLIENT_ENDPOINT = "https://safe-transaction-mainnet.safe.global/api/v1/safes/";
export declare const GNOSIS_SIGNATURE_VERIFICATION_CODE = "0x20c13b0b";
export declare const GNOSIS_SAFE_ABI: ({
    inputs: never[];
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    constant?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    payable?: undefined;
    stateMutability?: undefined;
    constant?: undefined;
    outputs?: undefined;
} | {
    payable: boolean;
    stateMutability: string;
    type: string;
    inputs?: undefined;
    anonymous?: undefined;
    name?: undefined;
    constant?: undefined;
    outputs?: undefined;
} | {
    constant: boolean;
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: never[];
    stateMutability: string;
    type: string;
    payable?: undefined;
    anonymous?: undefined;
    constant?: undefined;
})[];
