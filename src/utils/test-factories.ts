// Mock Data Factories for Testing

import type { User } from '../types/user';
import type { eSIM } from '../types/esim';
import type { Payment } from '../types/payment';
import type { Plan } from '../types/pricing';
import type { Ticket } from '../types/support';

/**
 * Create a mock user
 */
export function createMockUser(overrides: Partial<User> = {}): User {
    return {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        status: 'active',
        phone: '+1234567890',
        kycStatus: 'verified',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        ...overrides,
    };
}

/**
 * Create a mock eSIM
 */
export function createMockeSIM(overrides: Partial<eSIM> = {}): eSIM {
    return {
        id: 'esim-1',
        iccid: '8901410312345678901',
        planId: 'plan-1',
        planName: 'Standard 5GB',
        status: 'active',
        dataLimit: 5120,
        dataUsed: 2048,
        qrCode: 'LPA:1$smdp.example.com$ACTIVATION-CODE-1',
        activationCode: 'ACTIVATION-CODE-1',
        region: 'North America',
        country: 'USA',
        provider: 'twilio',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...overrides,
    };
}

/**
 * Create a mock payment
 */
export function createMockPayment(overrides: Partial<Payment> = {}): Payment {
    return {
        id: 'payment-1',
        userId: 'user-1',
        userName: 'Test User',
        userEmail: 'test@example.com',
        planId: 'plan-1',
        planName: 'Standard 5GB',
        amount: 29.99,
        currency: 'USD',
        status: 'completed',
        paymentMethod: 'credit_card',
        transactionId: 'txn_123456',
        createdAt: new Date().toISOString(),
        ...overrides,
    };
}

/**
 * Create a mock plan
 */
export function createMockPlan(overrides: Partial<Plan> = {}): Plan {
    return {
        id: 'plan-1',
        name: 'Standard 5GB',
        description: '5GB data for 30 days',
        dataLimit: 5120,
        validity: 30,
        regions: ['North America', 'Europe'],
        baseCost: 15,
        sellingPrice: 29.99,
        markup: 99.93,
        profit: 14.99,
        currency: 'USD',
        status: 'active',
        isPromotional: false,
        salesCount: 0,
        totalRevenue: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...overrides,
    };
}

/**
 * Create a mock ticket
 */
export function createMockTicket(overrides: Partial<Ticket> = {}): Ticket {
    return {
        id: 'ticket-1',
        ticketNumber: 'TKT-000001',
        userId: 'user-1',
        userName: 'Test User',
        userEmail: 'test@example.com',
        subject: 'Test Support Request',
        description: 'This is a test ticket',
        category: 'technical',
        priority: 'medium',
        status: 'open',
        tags: [],
        attachments: [],
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...overrides,
    };
}

/**
 * Create multiple mock items
 */
export function createMockList<T>(
    factory: (overrides?: any) => T,
    count: number,
    overrides: (index: number) => Partial<T> = () => ({})
): T[] {
    return Array.from({ length: count }, (_, i) => factory(overrides(i)));
}
