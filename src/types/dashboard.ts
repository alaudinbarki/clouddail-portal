// Dashboard TypeScript interfaces and types

export interface DashboardMetrics {
    revenue: MetricData;
    users: MetricData;
    esims: MetricData;
    payments: MetricData;
}

export interface MetricData {
    total: number;
    change: number;
    changePercent: number;
    trend: 'up' | 'down' | 'neutral';
    sparkline?: number[];
    subtitle?: string;
}

export interface ChartDataPoint {
    date: string;
    revenue: number;
    cost: number;
    profit: number;
    users: number;
    esims: number;
    newUsers?: number;
    activeUsers?: number;
}

export interface RevenueBreakdown {
    planType: string;
    amount: number;
    percentage: number;
    color: string;
}

export interface ActivityItem {
    id: string;
    type: 'user' | 'esim' | 'payment' | 'system';
    title: string;
    description: string;
    timestamp: string;
    icon?: string;
}

export interface TopPlan {
    id: string;
    name: string;
    sales: number;
    revenue: number;
    percentage: number;
}

export type DateRangePreset = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface DateRange {
    startDate: Date;
    endDate: Date;
    preset: DateRangePreset;
}

export interface ExportOptions {
    format: 'csv' | 'pdf' | 'excel';
    dateRange: DateRange;
    sections: string[];
}
