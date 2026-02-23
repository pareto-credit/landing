"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getEthersTopicTransfer: function() {
        return getEthersTopicTransfer;
    },
    getEthersTransactionInputData: function() {
        return getEthersTransactionInputData;
    },
    getEthersTransactionSignature: function() {
        return getEthersTransactionSignature;
    },
    normalizeEthersArgs: function() {
        return normalizeEthersArgs;
    },
    parseEthersEvent: function() {
        return parseEthersEvent;
    }
});
const _ethers = require("ethers");
const _core = require("../core");
function getEthersTopicTransfer() {
    return _ethers.utils.id('Transfer(address,address,uint256)');
}
function parseEthersEvent(event) {
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
function getEthersTransactionSignature(transaction) {
    const transactionData = getEthersTransactionInputData(transaction);
    return transactionData ? transactionData.slice(0, 10) : '';
}
function getEthersTransactionInputData(transaction) {
    var _transaction_data;
    const isSafe = transaction.data.slice(0, 10) === '0x6a761202';
    if (!isSafe) {
        return String(transaction.data);
    }
    const txData = (_transaction_data = transaction.data) == null ? void 0 : _transaction_data.slice(10);
    if (!txData) {
        return;
    }
    const inputParams = (0, _core.decodeAbiParameters)([
        'address',
        'uint256',
        'bytes',
        'uint8',
        'uint256',
        'uint256',
        'uint256',
        'address',
        'address',
        'bytes'
    ], txData);
    return String(inputParams[2]);
}
function normalizeEthersArgs(args = []) {
    const result = {};
    for(const key in args){
        result[key] = parseEthersArg(args[key]);
    }
    return result;
}
function parseEthersArg(arg) {
    if (_ethers.BigNumber.isBigNumber(arg)) {
        return arg.toString();
    }
    return arg;
}

//# sourceMappingURL=ethers.lib.js.map