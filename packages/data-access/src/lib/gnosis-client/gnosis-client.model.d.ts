import { Web3Clients } from '../web3-client';
export interface GnosisClientModel {
    web3: Web3Clients;
    getSafe: (safeAddress: string) => Promise<GnosisSafe | undefined>;
    verifySignature: (safeAddress: string, message: string, hash: string) => Promise<boolean>;
}
export interface GnosisSafe {
    address: string;
    nonce: number;
    threshold: number;
    owners: string[];
    masterCopy: string;
    modules: any;
    fallbackHandler: string;
    guard: string;
    version: string;
}
