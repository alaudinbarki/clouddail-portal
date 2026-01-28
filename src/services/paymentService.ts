import axiosInstance from '../utils/axios';
import type {
    Payment,
    PaymentQueryParams,
    PaymentStats,
    Invoice,
    RefundRequest,
    PaymentMethodStats,
    RevenueByPeriod,
} from '../types/payment';
import type { PaginatedResponse } from '../types/user';

// Mock payment data generator
const generateMockPayments = (count: number): Payment[] => {
    const payments: Payment[] = [];
    const statuses: Array<'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled'> =
        ['pending', 'completed', 'failed', 'refunded', 'cancelled'];
    const methods: Array<'credit_card' | 'debit_card' | 'paypal' | 'stripe' | 'crypto'> =
        ['credit_card', 'debit_card', 'paypal', 'stripe', 'crypto'];
    const plans = ['Basic 1GB', 'Standard 5GB', 'Premium 10GB', 'Unlimited'];
    const amounts = [9.99, 29.99, 49.99, 79.99];

    for (let i = 1; i <= count; i++) {
        const status = i % 10 === 0 ? 'failed' : i % 15 === 0 ? 'refunded' : 'completed';
        const planIndex = Math.floor(Math.random() * plans.length);
        const createdAt = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);

        payments.push({
            id: `payment-${i}`,
            userId: `user-${Math.floor(Math.random() * 50) + 1}`,
            userName: `User ${Math.floor(Math.random() * 50) + 1}`,
            userEmail: `user${i}@example.com`,
            planId: `plan-${planIndex + 1}`,
            planName: plans[planIndex],
            esimId: `esim-${i}`,
            amount: amounts[planIndex],
            currency: 'USD',
            status,
            paymentMethod: methods[Math.floor(Math.random() * methods.length)],
            transactionId: `txn_${Date.now()}_${i}`,
            invoiceId: status === 'completed' ? `inv-${i}` : undefined,
            createdAt: createdAt.toISOString(),
            completedAt: status === 'completed' ? new Date(createdAt.getTime() + 5000).toISOString() : undefined,
            failedAt: status === 'failed' ? new Date(createdAt.getTime() + 3000).toISOString() : undefined,
            refundedAt: status === 'refunded' ? new Date(createdAt.getTime() + 86400000).toISOString() : undefined,
            refundReason: status === 'refunded' ? 'Customer request' : undefined,
            refundAmount: status === 'refunded' ? amounts[planIndex] : undefined,
            failureReason: status === 'failed' ? 'Insufficient funds' : undefined,
        });
    }

    return payments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const MOCK_PAYMENTS = generateMockPayments(200);

class PaymentService {
    /**
     * Get paginated list of payments
     */
    async getPayments(params: PaymentQueryParams = {}): Promise<PaginatedResponse<Payment>> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<PaginatedResponse<Payment>>('/payments', { params });
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    let filteredPayments = [...MOCK_PAYMENTS];

                    // Apply search filter
                    if (params.search) {
                        const search = params.search.toLowerCase();
                        filteredPayments = filteredPayments.filter(
                            (payment) =>
                                payment.transactionId.toLowerCase().includes(search) ||
                                payment.userName.toLowerCase().includes(search) ||
                                payment.userEmail.toLowerCase().includes(search)
                        );
                    }

                    // Apply status filter
                    if (params.status && params.status !== 'all') {
                        filteredPayments = filteredPayments.filter((payment) => payment.status === params.status);
                    }

                    // Apply payment method filter
                    if (params.paymentMethod && params.paymentMethod !== 'all') {
                        filteredPayments = filteredPayments.filter((payment) => payment.paymentMethod === params.paymentMethod);
                    }

                    // Apply date range filter
                    if (params.startDate) {
                        filteredPayments = filteredPayments.filter(
                            (payment) => new Date(payment.createdAt) >= new Date(params.startDate!)
                        );
                    }
                    if (params.endDate) {
                        filteredPayments = filteredPayments.filter(
                            (payment) => new Date(payment.createdAt) <= new Date(params.endDate!)
                        );
                    }

                    // Apply user filter
                    if (params.userId) {
                        filteredPayments = filteredPayments.filter((payment) => payment.userId === params.userId);
                    }

                    // Apply sorting
                    if (params.sortBy) {
                        filteredPayments.sort((a, b) => {
                            const aValue = a[params.sortBy as keyof Payment];
                            const bValue = b[params.sortBy as keyof Payment];
                            const order = params.sortOrder === 'desc' ? -1 : 1;
                            return aValue > bValue ? order : -order;
                        });
                    }

                    // Apply pagination
                    const page = params.page || 1;
                    const pageSize = params.pageSize || 10;
                    const startIndex = (page - 1) * pageSize;
                    const endIndex = startIndex + pageSize;
                    const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

                    resolve({
                        data: paginatedPayments,
                        total: filteredPayments.length,
                        page,
                        pageSize,
                        totalPages: Math.ceil(filteredPayments.length / pageSize),
                    });
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to fetch payments');
        }
    }

    /**
     * Get payment by ID
     */
    async getPaymentById(id: string): Promise<Payment> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<Payment>(`/payments/${id}`);
            // return response.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const payment = MOCK_PAYMENTS.find((p) => p.id === id);
                    if (payment) {
                        resolve(payment);
                    } else {
                        reject(new Error('Payment not found'));
                    }
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch payment');
        }
    }

    /**
     * Process refund
     */
    async processRefund(request: RefundRequest): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.post(`/payments/${request.paymentId}/refund`, request);

            return new Promise((resolve) => {
                setTimeout(() => {
                    const paymentIndex = MOCK_PAYMENTS.findIndex((p) => p.id === request.paymentId);
                    if (paymentIndex !== -1) {
                        MOCK_PAYMENTS[paymentIndex].status = 'refunded';
                        MOCK_PAYMENTS[paymentIndex].refundedAt = new Date().toISOString();
                        MOCK_PAYMENTS[paymentIndex].refundReason = request.reason;
                        MOCK_PAYMENTS[paymentIndex].refundAmount = request.amount;
                    }
                    resolve();
                }, 1000);
            });
        } catch (error) {
            throw new Error('Failed to process refund');
        }
    }

    /**
     * Generate invoice
     */
    async generateInvoice(paymentId: string): Promise<Invoice> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.post<Invoice>(`/payments/${paymentId}/invoice`);
            // return response.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const payment = MOCK_PAYMENTS.find((p) => p.id === paymentId);
                    if (!payment) {
                        reject(new Error('Payment not found'));
                        return;
                    }

                    const invoice: Invoice = {
                        id: `inv-${Date.now()}`,
                        paymentId: payment.id,
                        userId: payment.userId,
                        userName: payment.userName,
                        userEmail: payment.userEmail,
                        invoiceNumber: `INV-${Date.now()}`,
                        amount: payment.amount,
                        tax: payment.amount * 0.1,
                        discount: 0,
                        total: payment.amount * 1.1,
                        currency: payment.currency,
                        status: payment.status === 'completed' ? 'paid' : 'sent',
                        issuedDate: payment.createdAt,
                        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                        paidDate: payment.completedAt,
                        items: [
                            {
                                id: '1',
                                description: payment.planName,
                                quantity: 1,
                                unitPrice: payment.amount,
                                total: payment.amount,
                            },
                        ],
                    };

                    resolve(invoice);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to generate invoice');
        }
    }

    /**
     * Get payment statistics
     */
    async getPaymentStats(): Promise<PaymentStats> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<PaymentStats>('/payments/stats');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const completed = MOCK_PAYMENTS.filter((p) => p.status === 'completed');
                    const failed = MOCK_PAYMENTS.filter((p) => p.status === 'failed');
                    const refunded = MOCK_PAYMENTS.filter((p) => p.status === 'refunded');

                    const totalRevenue = completed.reduce((sum, p) => sum + p.amount, 0);
                    const refundedAmount = refunded.reduce((sum, p) => sum + (p.refundAmount || 0), 0);
                    const successRate = (completed.length / MOCK_PAYMENTS.length) * 100;
                    const averageTransactionValue = totalRevenue / completed.length;

                    resolve({
                        totalRevenue,
                        totalTransactions: MOCK_PAYMENTS.length,
                        successfulPayments: completed.length,
                        failedPayments: failed.length,
                        refundedPayments: refunded.length,
                        refundedAmount,
                        successRate,
                        averageTransactionValue,
                        revenueGrowth: 12.5, // Mock growth percentage
                    });
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch payment stats');
        }
    }

    /**
     * Get payment method statistics
     */
    async getPaymentMethodStats(): Promise<PaymentMethodStats[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<PaymentMethodStats[]>('/payments/method-stats');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const methodMap = new Map<string, { count: number; total: number }>();
                    const completedPayments = MOCK_PAYMENTS.filter((p) => p.status === 'completed');

                    completedPayments.forEach((payment) => {
                        const existing = methodMap.get(payment.paymentMethod) || { count: 0, total: 0 };
                        methodMap.set(payment.paymentMethod, {
                            count: existing.count + 1,
                            total: existing.total + payment.amount,
                        });
                    });

                    const totalAmount = completedPayments.reduce((sum, p) => sum + p.amount, 0);

                    const stats: PaymentMethodStats[] = Array.from(methodMap.entries()).map(([method, data]) => ({
                        method: method as any,
                        count: data.count,
                        totalAmount: data.total,
                        percentage: (data.total / totalAmount) * 100,
                    }));

                    resolve(stats);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch payment method stats');
        }
    }

    /**
     * Get revenue by period
     */
    async getRevenueByPeriod(days: number = 30): Promise<RevenueByPeriod[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<RevenueByPeriod[]>('/payments/revenue-by-period', { params: { days } });
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const revenue: RevenueByPeriod[] = [];
                    const now = new Date();

                    for (let i = days - 1; i >= 0; i--) {
                        const date = new Date(now);
                        date.setDate(date.getDate() - i);
                        const dateStr = date.toISOString().split('T')[0];

                        const dayPayments = MOCK_PAYMENTS.filter(
                            (p) =>
                                p.status === 'completed' &&
                                p.createdAt.split('T')[0] === dateStr
                        );

                        const dayRevenue = dayPayments.reduce((sum, p) => sum + p.amount, 0);

                        revenue.push({
                            period: dateStr,
                            revenue: dayRevenue,
                            transactions: dayPayments.length,
                            averageValue: dayPayments.length > 0 ? dayRevenue / dayPayments.length : 0,
                        });
                    }

                    resolve(revenue);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch revenue by period');
        }
    }
}

export default new PaymentService();
