import { AbiItem, ContractAbi, TransactionReceipt, Transaction as W3Transaction } from 'web3';
import { PayableMethodObject } from 'web3-eth-contract';
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
/**
 * Methods and transactions management
 */
export type Web3ExecutionMode = 'AUTOMATIC' | 'MANUAL';
export interface Web3MethodCta {
    buttonLabel: string;
    description?: string;
    helperText?: string;
}
export interface Web3MethodInfo {
    caption?: string;
    hint?: string;
    value?: string;
    highlight?: string;
}
export interface Web3Method {
    id?: string;
    method?: PayableMethodObject;
    tags?: (string | number)[];
    value?: string;
    info?: Web3MethodInfo;
    cta?: Web3MethodCta;
    data?: {
        [key: string]: any;
    };
    onSending?: Web3TransactionCallback;
    onCreation?: Web3TransactionCallback;
    onComplete?: Web3TransactionCallback;
    onSuccess?: Web3TransactionCallback;
    onFail?: Web3TransactionCallback;
    onError?: Web3TransactionErrorCallback;
}
export interface Web3MethodSendOptions {
    abi: ContractAbi;
    address: string;
    method: string;
    params?: any;
}
export interface Web3Transaction {
    methodId: string;
    status: Web3TransactionStatus;
    hash?: string;
    tags?: (string | number)[];
    receipt?: TransactionReceipt;
    transaction?: W3Transaction;
}
export type Web3TransactionSelector = (tag: string | string[]) => Web3Transaction | undefined;
export type Web3TransactionCallback = (transaction?: Partial<Web3Transaction>) => void;
export type Web3TransactionErrorCallback = (transactionError: {
    error?: any;
    transaction?: Partial<Web3Transaction>;
}) => void;
export type Web3TransactionStatus = 'SENDING' | 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';
export type Web3HashType = 'tx' | 'address' | 'token';
export declare enum Web3ErrorCodes {
    notFound = "WEB3_NOT_FOUND",
    blockNotFound = "BLOCK_NOT_FOUND"
}
