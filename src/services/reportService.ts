import axiosInstance from '../utils/axios';
import type {
    TransactionLog,
    FinancialReport,
    TaxReport,
    ReconciliationRecord,
    ReportQueryParams,
    RevenueBreakdown,
    CustomerPaymentHistory,
} from '../types/report';
import paymentService from './paymentService';

class ReportService {
    /**
     * Get transaction logs
     */
    async getTransactionLogs(params: ReportQueryParams = {}): Promise<TransactionLog[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<TransactionLog[]>('/reports/transactions', { params });
            // return response.data;

            return new Promise(async (resolve) => {
                setTimeout(async () => {
                    const payments = await paymentService.getPayments({ pageSize: 1000 });

                    const logs: TransactionLog[] = payments.data.map((payment) => ({
                        id: `log-${payment.id}`,
                        paymentId: payment.id,
                        userId: payment.userId,
                        userName: payment.userName,
                        type: payment.status === 'refunded' ? 'refund' : 'payment',
                        amount: payment.status === 'refunded' ? -(payment.refundAmount || payment.amount) : payment.amount,
                        currency: payment.currency,
                        status: payment.status,
                        description: `${payment.planName} - ${payment.paymentMethod}`,
                        metadata: {
                            planId: payment.planId,
                            esimId: payment.esimId,
                            transactionId: payment.transactionId,
                        },
                        createdAt: payment.createdAt,
                    }));

                    resolve(logs);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to fetch transaction logs');
        }
    }

    /**
     * Generate financial report
     */
    async generateFinancialReport(params: ReportQueryParams): Promise<FinancialReport> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.post<FinancialReport>('/reports/financial', params);
            // return response.data;

            return new Promise(async (resolve) => {
                setTimeout(async () => {
                    const stats = await paymentService.getPaymentStats();

                    // Mock cost calculation (70% of revenue as cost)
                    const totalCost = stats.totalRevenue * 0.7;
                    const grossProfit = stats.totalRevenue - totalCost;
                    const netProfit = grossProfit - stats.refundedAmount;
                    const profitMargin = (netProfit / stats.totalRevenue) * 100;

                    const report: FinancialReport = {
                        id: `report-${Date.now()}`,
                        reportType: params.reportType as any || 'monthly',
                        startDate: params.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                        endDate: params.endDate || new Date().toISOString(),
                        totalRevenue: stats.totalRevenue,
                        totalCost,
                        grossProfit,
                        netProfit,
                        profitMargin,
                        transactions: stats.totalTransactions,
                        averageOrderValue: stats.averageTransactionValue,
                        generatedAt: new Date().toISOString(),
                        generatedBy: 'admin',
                    };

                    resolve(report);
                }, 800);
            });
        } catch (error) {
            throw new Error('Failed to generate financial report');
        }
    }

    /**
     * Generate tax report
     */
    async generateTaxReport(params: ReportQueryParams): Promise<TaxReport> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.post<TaxReport>('/reports/tax', params);
            // return response.data;

            return new Promise(async (resolve) => {
                setTimeout(async () => {
                    const stats = await paymentService.getPaymentStats();
                    const taxRate = 0.1; // 10% tax rate
                    const taxableAmount = stats.totalRevenue;
                    const taxCollected = taxableAmount * taxRate;

                    const report: TaxReport = {
                        id: `tax-${Date.now()}`,
                        period: 'Q4 2024',
                        startDate: params.startDate || new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
                        endDate: params.endDate || new Date().toISOString(),
                        totalSales: stats.totalRevenue,
                        taxableAmount,
                        taxCollected,
                        taxRate,
                        jurisdiction: 'US',
                        status: 'draft',
                    };

                    resolve(report);
                }, 800);
            });
        } catch (error) {
            throw new Error('Failed to generate tax report');
        }
    }

    /**
     * Get reconciliation records
     */
    async getReconciliationRecords(): Promise<ReconciliationRecord[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<ReconciliationRecord[]>('/reports/reconciliation');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const records: ReconciliationRecord[] = [];

                    for (let i = 0; i < 30; i++) {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        const expectedRevenue = 1000 + Math.random() * 500;
                        const actualRevenue = expectedRevenue + (Math.random() - 0.5) * 100;
                        const difference = actualRevenue - expectedRevenue;

                        records.push({
                            id: `recon-${i}`,
                            date: date.toISOString().split('T')[0],
                            expectedRevenue,
                            actualRevenue,
                            difference,
                            status: Math.abs(difference) < 10 ? 'matched' : 'discrepancy',
                            notes: Math.abs(difference) > 10 ? 'Requires investigation' : undefined,
                        });
                    }

                    resolve(records);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to fetch reconciliation records');
        }
    }

    /**
     * Get revenue breakdown
     */
    async getRevenueBreakdown(): Promise<RevenueBreakdown[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<RevenueBreakdown[]>('/reports/revenue-breakdown');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const breakdown: RevenueBreakdown[] = [
                        { category: 'Basic 1GB', amount: 2447.55, percentage: 7.2, transactions: 245 },
                        { category: 'Standard 5GB', amount: 15358.88, percentage: 45.1, transactions: 512 },
                        { category: 'Premium 10GB', amount: 9448.11, percentage: 27.7, transactions: 189 },
                        { category: 'Unlimited', amount: 6959.13, percentage: 20.0, transactions: 87 },
                    ];

                    resolve(breakdown);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch revenue breakdown');
        }
    }

    /**
     * Get customer payment history
     */
    async getCustomerPaymentHistory(userId: string): Promise<CustomerPaymentHistory> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<CustomerPaymentHistory>(`/reports/customer/${userId}`);
            // return response.data;

            return new Promise(async (resolve) => {
                setTimeout(async () => {
                    const payments = await paymentService.getPayments({ userId, pageSize: 1000 });
                    const completedPayments = payments.data.filter((p) => p.status === 'completed');

                    const totalSpent = completedPayments.reduce((sum, p) => sum + p.amount, 0);
                    const paymentMethods = [...new Set(completedPayments.map((p) => p.paymentMethod))];
                    const refundCount = payments.data.filter((p) => p.status === 'refunded').length;
                    const lastPayment = completedPayments[0];

                    const history: CustomerPaymentHistory = {
                        userId,
                        userName: lastPayment?.userName || 'Unknown',
                        totalSpent,
                        totalTransactions: completedPayments.length,
                        averageOrderValue: totalSpent / completedPayments.length,
                        lastPaymentDate: lastPayment?.createdAt || '',
                        paymentMethods,
                        refundCount,
                    };

                    resolve(history);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to fetch customer payment history');
        }
    }

    /**
     * Export report
     */
    async exportReport(format: 'csv' | 'pdf' | 'excel', data: any): Promise<Blob> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.post('/reports/export', { format, data }, { responseType: 'blob' });
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    // Mock blob creation
                    const content = JSON.stringify(data, null, 2);
                    const blob = new Blob([content], { type: 'text/plain' });
                    resolve(blob);
                }, 1000);
            });
        } catch (error) {
            throw new Error('Failed to export report');
        }
    }
}

export default new ReportService();
