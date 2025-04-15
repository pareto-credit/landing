import { DeepPartial } from '../core';
import { Wallet, WalletSignature } from './wallet.model';
/**
 * Wallet Mock
 */
export declare function WalletMock(options?: DeepPartial<Wallet>): Wallet;
export declare function WalletSignatureMock(options?: Partial<WalletSignature>): WalletSignature;
