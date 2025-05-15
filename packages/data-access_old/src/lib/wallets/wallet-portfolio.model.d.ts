import { Chain } from '../chains';
import { iBigInt } from '../core';
import { Token } from '../tokens';
export interface PortfolioTokenAllocation {
    token: Token;
    USD: iBigInt;
    percentage: number;
}
export interface PortfolioChainAllocation {
    chain: Chain;
    USD: iBigInt;
    percentage: number;
}
