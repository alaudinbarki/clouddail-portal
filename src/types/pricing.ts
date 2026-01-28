// Pricing & Plans TypeScript interfaces and types

export interface Plan {
    id: string;
    name: string;
    description: string;
    dataLimit: number; // MB
    validity: number; // days
    regions: string[];
    baseCost: number; // Cost from provider
    sellingPrice: number; // Price to customer
    markup: number; // Percentage
    profit: number; // Amount per sale
    currency: string;
    status: PlanStatus;
    isPromotional: boolean;
    promotionalPrice?: number;
    promotionalDiscount?: number; // Percentage
    promotionalStartDate?: string;
    promotionalEndDate?: string;
    salesCount: number;
    totalRevenue: number;
    createdAt: string;
    updatedAt: string;
}

export type PlanStatus = 'active' | 'inactive' | 'archived';

export interface CostEntry {
    id: string;
    provider: 'twilio' | 'other';
    providerName: string;
    region: string;
    dataUnit: number; // MB
    cost: number;
    currency: string;
    effectiveDate: string;
    notes?: string;
}

export interface PricingStrategy {
    id: string;
    name: string;
    description: string;
    defaultMarkup: number; // Percentage
    regionalMarkups: Record<string, number>; // Region -> markup %
    volumeDiscounts: VolumeDiscount[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface VolumeDiscount {
    minQuantity: number;
    maxQuantity?: number;
    discountPercentage: number;
}

export interface CreatePlanRequest {
    name: string;
    description: string;
    dataLimit: number;
    validity: number;
    regions: string[];
    baseCost: number;
    markup: number;
    currency?: string;
}

export interface PriceHistory {
    id: string;
    planId: string;
    planName: string;
    oldPrice: number;
    newPrice: number;
    changePercentage: number;
    reason: string;
    changedBy: string;
    changedAt: string;
}

export interface ProfitAnalysis {
    totalRevenue: number;
    totalCost: number;
    totalProfit: number;
    profitMargin: number; // Percentage
    averageMarkup: number;
    topPerformingPlans: Plan[];
}

export interface PromotionalOffer {
    id: string;
    name: string;
    description: string;
    planIds: string[];
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    usageCount: number;
    maxUsage?: number;
    createdAt: string;
}

export interface RegionalPricing {
    region: string;
    baseCost: number;
    markup: number;
    sellingPrice: number;
    currency: string;
}
