// Data Provider Management Types

export interface DataProvider {
    id: string;
    name: string;
    type: 'esim' | 'virtual_number';
    provider: 'airhub' | '1global' | 'telna' | 'twilio' | 'telnyx';
    status: 'active' | 'inactive' | 'testing';
    apiKey: string;
    apiSecret?: string;
    webhookUrl?: string;
    baseUrl: string;
    supportedRegions: string[];
    features: string[];
    createdAt: string;
    updatedAt: string;
    lastSyncAt?: string;
}

export interface DataProviderStats {
    totalProviders: number;
    activeProviders: number;
    totalDataPurchased: number; // in GB
    totalDataSold: number; // in GB
    totalRevenue: number;
    totalCost: number;
    profit: number;
    profitMargin: number;
}

export interface ProviderInventory {
    providerId: string;
    providerName: string;
    region: string;
    dataAvailable: number; // in GB
    basePricePerGB: number;
    ourPricePerGB: number;
    markup: number; // percentage
    lastUpdated: string;
}

export interface PricingMarkup {
    id: string;
    providerId: string;
    providerName: string;
    region: string;
    basePricePerGB: number;
    markupPercentage: number;
    sellingPricePerGB: number;
    minPurchase: number; // in GB
    maxPurchase: number; // in GB
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface VirtualNumber {
    id: string;
    phoneNumber: string;
    provider: 'twilio' | 'telnyx';
    country: string;
    type: 'local' | 'mobile' | 'toll_free';
    capabilities: ('voice' | 'sms' | 'mms')[];
    status: 'active' | 'inactive' | 'suspended';
    userId?: string;
    userName?: string;
    monthlyCost: number;
    sellingPrice: number;
    purchasedAt: string;
    expiresAt?: string;
}

export interface VirtualNumberPricing {
    id: string;
    provider: 'twilio' | 'telnyx';
    country: string;
    type: 'local' | 'mobile' | 'toll_free';
    baseMonthlyCost: number;
    baseSetupCost: number;
    voiceCostPerMinute: number;
    smsCostPerMessage: number;
    markupPercentage: number;
    sellingMonthlyCost: number;
    sellingSetupCost: number;
    sellingVoiceCost: number;
    sellingSMSCost: number;
    active: boolean;
}

export interface Wallet {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    balance: number;
    currency: string;
    status: 'active' | 'suspended' | 'frozen';
    createdAt: string;
    updatedAt: string;
}

export interface WalletTransaction {
    id: string;
    walletId: string;
    userId: string;
    type: 'credit' | 'debit';
    amount: number;
    currency: string;
    description: string;
    reference?: string;
    paymentMethod?: string;
    status: 'pending' | 'completed' | 'failed' | 'reversed';
    balanceBefore: number;
    balanceAfter: number;
    createdAt: string;
    completedAt?: string;
}

export interface PaymentGateway {
    id: string;
    name: string;
    type: 'stripe' | 'local_bank' | 'paypal' | 'crypto';
    status: 'active' | 'inactive' | 'testing';
    apiKey?: string;
    apiSecret?: string;
    webhookSecret?: string;
    supportedCurrencies: string[];
    transactionFee: number; // percentage
    fixedFee: number;
    minAmount: number;
    maxAmount: number;
    createdAt: string;
    updatedAt: string;
}

export interface DataProviderQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    type?: 'esim' | 'virtual_number' | 'all';
    provider?: string;
    status?: 'active' | 'inactive' | 'testing' | 'all';
}
