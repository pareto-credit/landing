import { Transaction, Event } from 'ethers';
import { EthersEvent } from './ethers.model';
/**
 * Get Ethers topic
 * @returns the event topic
 */
export declare function getEthersTopicTransfer(): string;
/**
 * Parse ethers event
 * @param event - the contract event
 * @returns the ethers event object
 */
export declare function parseEthersEvent(event: Event): EthersEvent;
/**
 * Get transaction method signature
 * @param transaction - the ethers transaction
 * @returns the method signature of a
 */
export declare function getEthersTransactionSignature(transaction: Transaction): string;
/**
 * Decode SAFE transaction input and get data
 * @param transaction web3 transaction
 * @returns SAFE transaction input hex string
 */
export declare function getEthersTransactionInputData(transaction: Transaction): string | undefined;
/**
 * Normalize args in record values
 * @param args - the event args
 * @returns the event values object
 */
export declare function normalizeEthersArgs(args?: Event['args']): Record<string, any>;
