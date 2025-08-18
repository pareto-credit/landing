import { DeepPartial } from '../core';
import { Wallet, WalletReferred, WalletSignature } from './wallet.model';
/**
 * Wallet Mock
 */
export declare function WalletMock(options?: DeepPartial<Wallet>): Wallet;
export declare function WalletSignatureMock(options?: Partial<WalletSignature>): WalletSignature;
export declare function WalletReferredMock(options?: Partial<WalletReferred>): WalletReferred;
