// Integration TypeScript interfaces for Twilio and Data Providers

export interface TwilioConfig {
    id: string;
    accountSid: string;
    authToken: string;
    apiKey: string;
    apiSecret: string;
    enabled: boolean;
    syncInterval: number; // minutes
    webhookUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface TwilioSyncStatus {
    lastSync: string;
    status: 'success' | 'failed' | 'in_progress';
    esimsSync: number;
    errors?: string[];
    nextSync: string;
}

export interface TwilioUsageReport {
    period: string;
    totaleSIMs: number;
    activeSIMs: number;
    dataUsed: number; // GB
    cost: number;
    currency: string;
}

export interface DataProvider {
    id: string;
    name: string;
    type: 'primary' | 'secondary' | 'backup';
    apiEndpoint: string;
    apiKey: string;
    enabled: boolean;
    regions: string[];
    costPerGB: number;
    currency: string;
    reliability: number; // percentage
    createdAt: string;
    updatedAt: string;
}

export interface ProviderComparison {
    providerId: string;
    providerName: string;
    costPerGB: number;
    dataQuality: number;
    uptime: number;
    avgSpeed: number;
    totalCost: number;
}

export interface IntegrationWebhook {
    id: string;
    provider: 'twilio' | 'stripe' | 'custom';
    url: string;
    events: string[];
    secret: string;
    enabled: boolean;
    lastTriggered?: string;
    successCount: number;
    failureCount: number;
    createdAt: string;
}
