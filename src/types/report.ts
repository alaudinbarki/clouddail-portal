// Reports & Analytics TypeScript interfaces and types

export interface TransactionLog {
    id: string;
    paymentId: string;
    userId: string;
    userName: string;
    type: 'payment' | 'refund' | 'chargeback' | 'adjustment';
    amount: number;
    currency: string;
    status: string;
    description: string;
    metadata: Record<string, any>;
    createdAt: string;
}

export interface FinancialReport {
    id: string;
    reportType: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
    startDate: string;
    endDate: string;
    totalRevenue: number;
    totalCost: number;
    grossProfit: number;
    netProfit: number;
    profitMargin: number;
    transactions: number;
    averageOrderValue: number;
    generatedAt: string;
    generatedBy: string;
}

export interface TaxReport {
    id: string;
    period: string;
    startDate: string;
    endDate: string;
    totalSales: number;
    taxableAmount: number;
    taxCollected: number;
    taxRate: number;
    jurisdiction: string;
    status: 'draft' | 'filed' | 'paid';
    filedDate?: string;
    paidDate?: string;
}

export interface ReconciliationRecord {
    id: string;
    date: string;
    expectedRevenue: number;
    actualRevenue: number;
    difference: number;
    status: 'matched' | 'discrepancy' | 'pending';
    notes?: string;
    resolvedBy?: string;
    resolvedAt?: string;
}

export interface ReportQueryParams {
    reportType?: string;
    startDate?: string;
    endDate?: string;
    groupBy?: 'day' | 'week' | 'month' | 'year';
}

export interface ExportReportParams {
    format: 'csv' | 'pdf' | 'excel';
    reportType: string;
    startDate: string;
    endDate: string;
    includeCharts?: boolean;
}

export interface RevenueBreakdown {
    category: string;
    amount: number;
    percentage: number;
    transactions: number;
}

export interface CustomerPaymentHistory {
    userId: string;
    userName: string;
    totalSpent: number;
    totalTransactions: number;
    averageOrderValue: number;
    lastPaymentDate: string;
    paymentMethods: string[];
    refundCount: number;
}
