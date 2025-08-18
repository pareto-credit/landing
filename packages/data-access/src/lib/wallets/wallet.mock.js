/**
 * Wallet Mock
 */ export function WalletMock(options) {
    var _options_signatures;
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'WALLET_ID',
        userId: options == null ? void 0 : options.userId,
        address: (options == null ? void 0 : options.address) || 'WALLET_ADDRESS',
        signatures: options == null ? void 0 : (_options_signatures = options.signatures) == null ? void 0 : _options_signatures.map((s)=>WalletSignatureMock(s)),
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}
export function WalletSignatureMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'SIGNATURE_ID',
        hash: (options == null ? void 0 : options.hash) || 'SIGNATURE_HASH',
        signedOn: (options == null ? void 0 : options.signedOn) || now
    };
}
export function WalletReferredMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'WALLET_ID',
        address: (options == null ? void 0 : options.address) || 'WALLET_ADDRESS',
        referralCode: (options == null ? void 0 : options.referralCode) || 'WALLET_REFERRAL_CODE',
        activatedOn: (options == null ? void 0 : options.activatedOn) || now
    };
}

//# sourceMappingURL=wallet.mock.js.map