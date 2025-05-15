import { Contract } from 'web3';
import { AbiContract, AbiJsonParam, BlockNumber } from '../../core';
import { Web3CallData, Web3ClientModel, Web3ContractMethod, Web3ContractMethodParam, Web3DataParam } from '../../web3-client';
import { WalletContractData } from '../wallet.model';
export declare class WalletService {
    address: string;
    web3Client: Web3ClientModel;
    constructor(address: string, web3Client: Web3ClientModel);
    getBalance(contractAddress: string, blockNumber?: BlockNumber): Promise<WalletContractData>;
    getAllowance(tokenAddress: string, spenderAddress: string, blockNumber?: BlockNumber): Promise<WalletContractData>;
    /**
     * Parse method into Web3CallData
     * @param method - the contract method
     * @returns the web3CallData
     */
    protected makeMethodData(contract: Contract<AbiContract>, contractMethod: Web3ContractMethod, values?: any): Web3CallData;
    /**
     * Parse vault json param
     * @param vault - the vault
     * @param input - the ABI Json Param
     * @returns the vault data param
     */
    protected makeMethodParamData(input: AbiJsonParam, param?: Web3ContractMethodParam, values?: any): Web3DataParam;
    /**
     * Parse method param
     * @param param - the method param
     * @returns the value of the param
     */
    private parseMethodParam;
    /**
     * Parse Web3CallData into contract data
     * @param response - the response from web3call data
     * @returns the vault contract data
     */
    protected parseCallResponses(responses: Web3CallData[]): WalletContractData;
    /**
     * Parse call response
     * @param data - the already processed data
     * @param response - the call response
     * @returns the contract data
     */
    private parseCallResponse;
}
