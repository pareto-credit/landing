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
    VAULTS_BC_QUEUE: function() {
        return VAULTS_BC_QUEUE;
    },
    VAULTS_PARETO_QUEUE: function() {
        return VAULTS_PARETO_QUEUE;
    },
    VAULTS_ROUTES_KEY: function() {
        return VAULTS_ROUTES_KEY;
    },
    VAULT_SIGNATURES: function() {
        return VAULT_SIGNATURES;
    },
    VAULT_SIGNATURES_TYPE: function() {
        return VAULT_SIGNATURES_TYPE;
    },
    sUSDS_ADDRESS: function() {
        return sUSDS_ADDRESS;
    },
    sUSDS_SWAPPER_ADDRESS: function() {
        return sUSDS_SWAPPER_ADDRESS;
    }
});
const VAULTS_ROUTES_KEY = 'vaults';
const VAULTS_PARETO_QUEUE = 'PARETO_VAULTS';
const VAULTS_BC_QUEUE = 'BC_VAULTS';
const VAULT_SIGNATURES = {
    CDO_EPOCH: {
        // Epochs management
        startEpoch: '0xa2c8b177',
        stopEpoch: '0xd48099ad',
        stopEpochWithDuration: '0xb4ecd47f',
        getInstantWithdrawFunds: '0xcfa56567',
        claimWithdraw: '0x33986ffa',
        claimInstantWithdraw: '0x991052b7',
        // Deposit requests
        requestDeposit: '0x0d1e6667',
        deleteDepositRequest: '0xe9a21bcd',
        processDeposits: '0x33cd5dc9',
        claimDepositRequest: '0xb975b387',
        // Withdraw requests
        requestWithdraw: '0x745400c9',
        deleteWithdrawRequest: '0xdc7137c3',
        processWithdrawRequests: '0xaa9d3a60',
        processWithdrawClaims: '0x9abf0d55',
        claimWithdrawRequest: '0xd2233918',
        // Write-off requests
        requestWriteOff: '0xcc49fc2f',
        deleteWriteOffRequest: '0x4926d6b0',
        fulfillWriteOffRequest: '0x3adc134c',
        writeOffDeposit: '0xdee7c2cb'
    }
};
const VAULT_SIGNATURES_TYPE = {
    /**
   * CDO_EPOCH
   */ '0xa2c8b177': 'START_EPOCH',
    // Stop epoch && Stop epoch with duration
    '0xd48099ad': 'STOP_EPOCH',
    '0xb4ecd47f': 'STOP_EPOCH',
    '0xcfa56567': 'GET_INSTANT_WITHDRAWS',
    '0x33986ffa': 'CLAIM_WITHDRAW',
    '0x991052b7': 'CLAIM_INSTANT_WITHDRAW',
    // Deposit requests
    '0x0d1e6667': 'REQUEST_DEPOSIT',
    '0xe9a21bcd': 'DELETE_DEPOSIT_REQUEST',
    '0x33cd5dc9': 'PROCESS_DEPOSIT_QUEUE',
    '0xb975b387': 'CLAIM_DEPOSIT_REQUEST',
    // Withdraw requests
    '0x745400c9': 'REQUEST_WITHDRAW',
    '0xdc7137c3': 'DELETE_WITHDRAW_REQUEST',
    '0xaa9d3a60': 'PROCESS_WITHDRAW_QUEUE',
    '0x9abf0d55': 'PROCESS_WITHDRAW_CLAIMS',
    '0xd2233918': 'CLAIM_WITHDRAW_REQUEST',
    /**
   * USP
   */ '0x91217151': 'REDEEM_YIELD_SOURCE'
};
const sUSDS_ADDRESS = '0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD';
const sUSDS_SWAPPER_ADDRESS = '0xA188EEC8F81263234dA3622A406892F3D630f98c';

//# sourceMappingURL=vault.const.js.map