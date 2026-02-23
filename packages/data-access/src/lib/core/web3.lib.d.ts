import Web3, { AbiInput, HexString } from 'web3';
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
/**
 * Check if the amount is formatted correctly for the contract
 * @param amount normalized amount
 * @returns true | false
 */
export declare function checkWeb3Amount(amount: number | string | undefined): boolean;
/**
 * Short Web3 amount utility
 * @param amount - the token amount to send
 * @param fromDecimals - the token decimals
 * @param options - the intl options
 * @returns the string to show to the user
 */
export declare function shortWeb3Amount(amount: string | undefined, fromDecimals: string | number, options?: Intl.NumberFormatOptions): string;
/**
 * Polling for getting the tx receipt
 * @param web3 - web3
 * @param txHash - the tx hash
 * @param timeoutParams -
 * @returns
 */
export declare function waitForReceiptIndexed(web3: Web3 | undefined, txHash: string, { timeout, interval }?: {
    timeout?: number | undefined;
    interval?: number | undefined;
}): Promise<{
    readonly transactionHash: string;
    readonly transactionIndex: bigint;
    readonly blockHash: string;
    readonly blockNumber: bigint;
    readonly from: import("web3").Address;
    readonly to: import("web3").Address;
    readonly cumulativeGasUsed: bigint;
    readonly gasUsed: bigint;
    readonly effectiveGasPrice?: bigint | undefined;
    readonly contractAddress?: import("web3").Address | undefined;
    readonly logs: {
        readonly id?: string | undefined;
        readonly removed?: boolean | undefined;
        readonly logIndex?: bigint | undefined;
        readonly transactionIndex?: bigint | undefined;
        readonly transactionHash?: string | undefined;
        readonly blockHash?: string | undefined;
        readonly blockNumber?: bigint | undefined;
        readonly address?: import("web3").Address | undefined;
        readonly data?: string | undefined;
        readonly topics?: string[] | undefined;
    }[];
    readonly logsBloom: string;
    readonly root: string;
    readonly status: bigint;
    readonly type?: bigint | undefined;
    events?: {
        [x: string]: {
            readonly event: string;
            readonly id?: string | undefined;
            readonly logIndex?: bigint | undefined;
            readonly transactionIndex?: bigint | undefined;
            readonly transactionHash?: import("web3").HexString32Bytes | undefined;
            readonly blockHash?: import("web3").HexString32Bytes | undefined;
            readonly blockNumber?: bigint | undefined;
            readonly address: string;
            readonly topics: import("web3-types").HexString[];
            readonly data: import("web3-types").HexString;
            readonly raw?: {
                data: string;
                topics: unknown[];
            } | undefined;
            readonly returnValues: {
                [x: string]: unknown;
            };
            readonly signature?: import("web3-types").HexString | undefined;
        };
    } | undefined;
} | undefined>;
