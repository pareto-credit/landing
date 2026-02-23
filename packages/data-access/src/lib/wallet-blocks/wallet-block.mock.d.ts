import { DeepPartial } from '../core';
import { WalletBlock } from './wallet-block.model';
import { VaultWalletParetoDollarData, VaultWalletPoolData, VaultWalletPoolTokenData } from '../vaults';
/**
 * WalletBlock Mock
 */
export declare function WalletBlockMock(options?: DeepPartial<WalletBlock>): WalletBlock;
export declare function WalletBlockParetoDollarMock(options?: Partial<VaultWalletParetoDollarData>): VaultWalletParetoDollarData;
export declare function WalletBlockPoolMock(options?: DeepPartial<VaultWalletPoolData>): VaultWalletPoolData;
export declare function WalletBlockPoolTokenMock(options?: Partial<VaultWalletPoolTokenData>): VaultWalletPoolTokenData;
