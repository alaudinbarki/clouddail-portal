// Advanced Analytics TypeScript interfaces and types

export interface CustomReport {
    id: string;
    name: string;
    description: string;
    type: 'revenue' | 'users' | 'esims' | 'payments' | 'custom';
    metrics: ReportMetric[];
    filters: ReportFilter[];
    groupBy: 'day' | 'week' | 'month' | 'quarter' | 'year';
    dateRange: {
        start: string;
        end: string;
    };
    visualization: 'table' | 'line' | 'bar' | 'pie' | 'area';
    createdBy: string;
    createdAt: string;
    lastRun?: string;
}

export interface ReportMetric {
    id: string;
    name: string;
    field: string;
    aggregation: 'sum' | 'avg' | 'count' | 'min' | 'max';
    format?: 'currency' | 'percentage' | 'number';
}

export interface ReportFilter {
    field: string;
    operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
    value: any;
}

export interface TrendAnalysis {
    metric: string;
    period: string;
    currentValue: number;
    previousValue: number;
    change: number;
    changePercent: number;
    trend: 'up' | 'down' | 'stable';
    forecast?: number[];
}

export interface PredictiveAnalytics {
    metric: string;
    historical: DataPoint[];
    predictions: DataPoint[];
    confidence: number; // 0-100
    model: 'linear' | 'exponential' | 'seasonal';
}

export interface DataPoint {
    date: string;
    value: number;
}

export interface Cohort {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    userCount: number;
    retention: RetentionData[];
}

export interface RetentionData {
    period: number; // days/weeks/months
    retained: number;
    retentionRate: number;
}

export interface Funnel {
    id: string;
    name: string;
    steps: FunnelStep[];
    conversionRate: number;
}

export interface FunnelStep {
    name: string;
    users: number;
    conversionRate: number;
    dropoffRate: number;
}

export interface Segment {
    id: string;
    name: string;
    criteria: SegmentCriteria[];
    userCount: number;
    revenue: number;
    avgOrderValue: number;
}

export interface SegmentCriteria {
    field: string;
    operator: string;
    value: any;
}

export interface Benchmark {
    metric: string;
    yourValue: number;
    industryAverage: number;
    topPerformers: number;
    percentile: number;
}
