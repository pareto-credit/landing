import { utils, BigNumber } from 'ethers';
/**
 * Get Ethers topic
 * @returns the event topic
 */ export function getEthersTopicTransfer() {
    return utils.id('Transfer(address,address,uint256)');
}
/**
 * Parse ethers event
 * @param event - the contract event
 * @returns the ethers event object
 */ export function parseEthersEvent(event) {
    return {
        address: event['address'],
        topics: event['topics'],
        data: event['data'],
        blockHash: event['blockHash'],
        blockNumber: event['blockNumber'],
        transactionHash: event['transactionHash'],
        transactionIndex: event['transactionIndex'],
        event: event['event'],
        eventSignature: event['eventSignature'],
        values: normalizeEthersArgs(event['args'])
    };
}
/**
 * Get transaction method signature
 * @param transaction - the ethers transaction
 * @returns the method signature of a
 */ export function getEthersTransactionSignature(transaction) {
    return transaction.data.slice(0, 10);
}
/**
 * Normalize args in record values
 * @param args - the event args
 * @returns the event values object
 */ export function normalizeEthersArgs(args = []) {
    const result = {};
    for(const key in args){
        result[key] = parseEthersArg(args[key]);
    }
    return result;
}
function parseEthersArg(arg) {
    if (BigNumber.isBigNumber(arg)) {
        return arg.toString();
    }
    return arg;
}

//# sourceMappingURL=ethers.lib.js.map