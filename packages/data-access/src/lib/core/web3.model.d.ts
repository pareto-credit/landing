import { AbiItem, ContractAbi, TransactionReceipt, Transaction as W3Transaction } from 'web3';
export type Abi = AbiItem[];
export type AbiContract = ContractAbi;
export interface AbiJsonInterface {
    name: string;
    constant: boolean;
    inputs: AbiJsonParam[];
    outputs: AbiJsonParam[];
    payable: boolean;
    stateMutability: string;
    type: 'function' | 'event';
    signature: string;
    methodNameWithInputs: string;
}
export interface AbiJsonParam {
    name: string;
    type: string;
    components?: any;
}
export interface Web3MethodOptions {
    abi: ContractAbi;
    address: string;
    method: string;
    params?: any;
}
export interface Web3Transaction {
    status: Web3TransactionStatus;
    tags?: string[];
    hash?: string;
    receipt?: TransactionReceipt;
    transaction?: W3Transaction;
}
export type Web3TransactionCallback = (tag: string | string[]) => Web3Transaction | undefined;
export type Web3TransactionStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';
export type Web3HashType = 'tx' | 'address' | 'token';
export declare enum Web3ErrorCodes {
    notFound = "WEB3_NOT_FOUND",
    blockNotFound = "BLOCK_NOT_FOUND"
}
