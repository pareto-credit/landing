export interface EtherscanTokenTransfer {
    blockNumber: string;
    from: string;
    to: string;
    value: string;
}
export interface EtherscanResponse<T> {
    status: string;
    message: string;
    result: T | string;
}
export interface EtherscanClientOptions {
    apiKey?: string;
    baseURL?: string;
    chainId?: number;
    defaultPageSize?: number;
}
export interface GetTokenTransfersOptions {
    blockNumber?: number;
    pageSize?: number;
}
