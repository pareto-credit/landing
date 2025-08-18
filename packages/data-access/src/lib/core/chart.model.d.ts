export type DonutChartKey = string;
export interface DonutChartData<T = any> {
    key: string;
    label: string;
    value: number;
    percentage?: number;
    color?: string;
    data?: T;
}
export type DonutChartColors = Record<DonutChartKey, string | undefined>;
export interface DonutChartProps<AllocationData = any> {
    data: DonutChartData<AllocationData>[];
    colors: DonutChartColors;
}
export interface DonutChartSliceProps {
    icon?: string;
    value: string | number;
    label: string;
    subLabel?: string;
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
