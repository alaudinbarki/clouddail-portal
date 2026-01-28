// Payment Management TypeScript interfaces and types

export interface Payment {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    planId: string;
    planName: string;
    esimId?: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentMethod: PaymentMethod;
    transactionId: string;
    invoiceId?: string;
    createdAt: string;
    completedAt?: string;
    failedAt?: string;
    refundedAt?: string;
    refundReason?: string;
    refundAmount?: number;
    failureReason?: string;
    metadata?: Record<string, any>;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled' | 'processing';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'stripe' | 'crypto' | 'bank_transfer';

export interface Invoice {
    id: string;
    paymentId: string;
    userId: string;
    userName: string;
    userEmail: string;
    invoiceNumber: string;
    amount: number;
    tax: number;
    discount: number;
    total: number;
    currency: string;
    status: InvoiceStatus;
    issuedDate: string;
    dueDate: string;
    paidDate?: string;
    items: InvoiceItem[];
    notes?: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface PaymentStats {
    totalRevenue: number;
    totalTransactions: number;
    successfulPayments: number;
    failedPayments: number;
    refundedPayments: number;
    refundedAmount: number;
    successRate: number;
    averageTransactionValue: number;
    revenueGrowth: number; // Percentage
    paymentMethodBreakdown?: Record<string, number>;
}

export interface PaymentQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: PaymentStatus | 'all';
    paymentMethod?: PaymentMethod | 'all';
    startDate?: string;
    endDate?: string;
    userId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface RefundRequest {
    paymentId: string;
    amount: number;
    reason: string;
    refundedBy: string;
}

export interface PaymentMethodStats {
    method: PaymentMethod;
    count: number;
    totalAmount: number;
    percentage: number;
}

export interface RevenueByPeriod {
    period: string; // Date string
    revenue: number;
    transactions: number;
    averageValue: number;
}

export interface ExportParams {
    format: 'csv' | 'pdf' | 'excel';
    startDate?: string;
    endDate?: string;
    status?: PaymentStatus;
}
