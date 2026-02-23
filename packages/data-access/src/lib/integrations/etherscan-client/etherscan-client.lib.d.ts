import type { EtherscanClientOptions, EtherscanTokenTransfer, GetTokenTransfersOptions } from './etherscan-client.model';
export declare class EtherscanClient {
    private readonly axios;
    private readonly apiKey?;
    private readonly defaultPageSize;
    constructor(options?: EtherscanClientOptions);
    getTokenTransfers(contractAddress: string, options?: GetTokenTransfersOptions): Promise<EtherscanTokenTransfer[]>;
}
