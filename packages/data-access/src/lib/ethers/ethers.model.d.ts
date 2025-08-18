import { Contract, EventFilter, providers } from 'ethers';
import { TransactionType } from '../transactions';
export interface EthersRPC {
    chain: {
        _id: string;
        name: string;
        chainID: number;
    };
    provider: providers.Provider;
}
export interface EthersApiKeys {
    ALCHEMY: string;
}
export interface EthersEventOptions {
    contract: Contract;
    filter: EventFilter | string;
    type: TransactionType;
}
export interface EthersEvent {
    address: string;
    topics: string[];
    data: string;
    blockHash: string;
    blockNumber: number;
    transactionHash: string;
    transactionIndex: number;
    event?: string;
    eventSignature?: string;
    values: any;
}
