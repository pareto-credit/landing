import { decodeParameters } from 'web3-eth-abi';
import { WEB3_HASH_LINKS } from './web3.const';
/**
 * Remove initial '0x' from an address
 * @param addr - the address to strip
 * @returns the address stripped
 */ export function strip0x(addr) {
    return addr.replace(/^0x/, '');
}
/**
 * Check if a string is a blockchain address
 * @param address - the address string to verify
 * @returns true if is an address
 */ export function isAddress(address) {
    return !!address.match(/^0x[a-fA-F0-9]{40}$/);
}
/**
 * Check if a string is a blockchain transaction
 * @param hash - the hash string to verify
 * @returns true if is a tx hash
 */ export function isTxHash(hash) {
    return !!hash.match(/^0x[a-fA-F0-9]{64}$/);
}
/**
 * Decode ABI parameters
 * @param inputs abi inputs
 * @param bytes hex string
 * @returns decoded parameters
 */ export function decodeAbiParameters(inputs, bytes) {
    return decodeParameters(inputs, bytes);
}
/**
 * Reduce the length of an hash
 * @param hash - the hash to short
 * @param startLen - the start length
 * @param endLen - the end length
 * @returns the hash shorted
 */ export function shortHash(hash, startLen = 7, endLen = 4) {
    const txStart = hash.slice(0, startLen);
    const txEnd = hash.slice(hash.length - endLen);
    return `${txStart}...${txEnd}`;
}
/**
 * Make hash link
 * @param hash - the hash
 * @param chainID - the chain ID
 * @returns the link to the transaction/address hash
 */ export function makeHashLink(type, hash, chainID) {
    const hashLink = WEB3_HASH_LINKS[chainID];
    return `${hashLink}/${type}/${hash}`;
}

//# sourceMappingURL=web3.lib.js.map