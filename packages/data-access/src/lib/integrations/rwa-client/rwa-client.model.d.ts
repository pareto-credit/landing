import { BNify } from '../../core';
export type RwaDailySnapshot = {
    date: string;
    price: ReturnType<typeof BNify>;
    supply: ReturnType<typeof BNify>;
    tvlToken: ReturnType<typeof BNify>;
    tvlUSD: ReturnType<typeof BNify>;
    yieldToken: ReturnType<typeof BNify>;
    yieldUSD: ReturnType<typeof BNify>;
};
export type RwaMetrics = {
    net_asset_value: number;
    net_asset_value_dollar: number;
    net_yield_1d?: number;
    net_yield_1d_dollar?: number;
    token_supply_circulating: number;
    aum: number;
    aum_dollar: number;
};
export type RwaMetricsEntry = {
    id: string;
    metrics: RwaMetrics;
};
