import { Web3ContractMethod } from './web3-client.model';
export declare const WEB3_DEFAULT_ADDR = "0x0000000000000000000000000000000000000000";
export declare const WEB3_DEFAULT_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
export declare const WEB3_DEFAULT_CHAIN_ID = 1;
export declare const WEB3_DEFAULT_BLOCK_PER_YEAR = 2613400;
export declare const WEB3_MULTICALL_CONTRACT_ADDR = "0xcA11bde05977b3631167028862bE2a173976CA11";
export declare const WEB3_MULTICALL_FIRST_BLOCK = 14353601;
export declare const WEB3_MULTICALL_METHOD_ABI = "aggregate3((address,bool,bytes)[])";
export declare const WEB3_MULTICALL_PARAM_ABI: {
    components: {
        type: string;
    }[];
    name: string;
    type: string;
}[];
export declare const WEB3_MULTICALL_RESPONSE_ABI: string[];
export declare const WEB3_CONTRACT_METHODS: Web3ContractMethod[];
