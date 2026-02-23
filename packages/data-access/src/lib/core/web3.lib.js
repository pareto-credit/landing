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
    checkWeb3Amount: function() {
        return checkWeb3Amount;
    },
    decodeAbiParameters: function() {
        return decodeAbiParameters;
    },
    isAddress: function() {
        return isAddress;
    },
    isTxHash: function() {
        return isTxHash;
    },
    makeHashLink: function() {
        return makeHashLink;
    },
    shortHash: function() {
        return shortHash;
    },
    shortWeb3Amount: function() {
        return shortWeb3Amount;
    },
    strip0x: function() {
        return strip0x;
    },
    waitForReceiptIndexed: function() {
        return waitForReceiptIndexed;
    }
});
const _web3ethabi = require("web3-eth-abi");
const _web3const = require("./web3.const");
const _bigintlib = require("./bigint.lib");
const _utilitylib = require("./utility.lib");
function strip0x(addr) {
    return addr.replace(/^0x/, '');
}
function isAddress(address) {
    return typeof address === 'string' && !!address.match(/^0x[a-fA-F0-9]{40}$/);
}
function isTxHash(hash) {
    return typeof hash === 'string' && !!hash.match(/^0x[a-fA-F0-9]{64}$/);
}
function decodeAbiParameters(inputs, bytes) {
    return (0, _web3ethabi.decodeParameters)(inputs, bytes);
}
function shortHash(hash, startLen = 7, endLen = 4) {
    const txStart = hash.slice(0, startLen);
    const txEnd = hash.slice(hash.length - endLen);
    return `${txStart}...${txEnd}`;
}
function makeHashLink(type, hash, chainID) {
    const hashLink = _web3const.WEB3_HASH_LINKS[chainID];
    return `${hashLink}/${type}/${hash}`;
}
function checkWeb3Amount(amount) {
    return amount !== '' && !(0, _bigintlib.BNify)(amount).isNaN() && (0, _bigintlib.BNgte)(amount, _web3const.WEB3_MIN_TOKEN_AMOUNT) && (0, _bigintlib.BNlte)(amount, _web3const.WEB3_MAX_TOKEN_AMOUNT);
}
function shortWeb3Amount(amount, fromDecimals, options = {
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short'
}) {
    return (0, _utilitylib.numberFormat)((0, _bigintlib.BNify)(amount).div(`1e${fromDecimals}`).toNumber(), options);
}
async function waitForReceiptIndexed(web3, txHash, { timeout = 30000, interval = 2000 } = {}) {
    if (!web3) return;
    const start = Date.now();
    while(Date.now() - start < timeout){
        try {
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            if (receipt) return receipt;
        } catch (err) {
            const errObj = err;
            const msg = err && typeof err === 'object' && 'message' in err && typeof errObj['message'] === 'string' ? errObj['message'] : String(err);
            if (!msg.includes('indexing')) {
                // if it's an unknown error, rethrow
                throw err;
            }
        // otherwise fallthrough and retry
        }
        await new Promise((r)=>setTimeout(r, interval));
    }
    // timeout
    return;
}

//# sourceMappingURL=web3.lib.js.map