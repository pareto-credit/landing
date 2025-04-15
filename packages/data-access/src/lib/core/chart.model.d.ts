import { PortfolioChainAllocation, PortfolioTokenAllocation } from '../wallets';
export type DonutChartKey = string;
export interface DonutChartData {
    label: DonutChartKey;
    value: number;
    tokenAllocation?: PortfolioTokenAllocation;
    chainAllocation?: PortfolioChainAllocation;
}
export type DonutChartColors = Record<DonutChartKey, string | undefined>;
export interface DonutChartProps {
    data: DonutChartData[];
    colors: DonutChartColors;
}
export interface DonutChartSliceProps {
    icon?: string;
    value: string | number;
    label: string;
    colors?: {
        label?: string;
        value?: string;
    };
    fontSizes?: {
        label?: number;
        value?: number;
    };
}
export type ChartProps = DonutChartProps;
