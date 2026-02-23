import { DeepPartial } from '../core';
import { Chain, ChainRpc } from './chain.model';
/**
 * Chain Mock
 */
export declare function ChainMock(options?: DeepPartial<Chain>): Chain;
export declare function ChainRPCMock(options?: Partial<ChainRpc>): ChainRpc;
