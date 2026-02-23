import { Chain } from '../chains';
import { iBigInt } from '../core';
import { Operator } from '../operators';
import { Token } from '../tokens';
export interface PortfolioTokenAllocation {
    token: Token;
    USD: iBigInt;
    percentage: number;
    operator?: Operator;
}
export interface PortfolioChainAllocation {
    chain: Chain;
    USD: iBigInt;
    percentage: number;
}
