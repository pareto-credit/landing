import { AbiInput, HexString } from 'web3';
import { Web3HashType } from './web3.model';
/**
 * Remove initial '0x' from an address
 * @param addr - the address to strip
 * @returns the address stripped
 */
export declare function strip0x(addr: string): string;
/**
 * Check if a string is a blockchain address
 * @param address - the address string to verify
 * @returns true if is an address
 */
export declare function isAddress(address: string): boolean;
/**
 * Check if a string is a blockchain transaction
 * @param hash - the hash string to verify
 * @returns true if is a tx hash
 */
export declare function isTxHash(hash: string): boolean;
/**
 * Decode ABI parameters
 * @param inputs abi inputs
 * @param bytes hex string
 * @returns decoded parameters
 */
export declare function decodeAbiParameters(inputs: AbiInput[], bytes: HexString): any;
/**
 * Reduce the length of an hash
 * @param hash - the hash to short
 * @param startLen - the start length
 * @param endLen - the end length
 * @returns the hash shorted
 */
export declare function shortHash(hash: string, startLen?: number, endLen?: number): string;
/**
 * Make hash link
 * @param hash - the hash
 * @param chainID - the chain ID
 * @returns the link to the transaction/address hash
 */
export declare function makeHashLink(type: Web3HashType, hash: string, chainID: string): string;
