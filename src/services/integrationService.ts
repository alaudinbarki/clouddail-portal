import axiosInstance from '../utils/axios';
import type {
    TwilioConfig,
    TwilioSyncStatus,
    TwilioUsageReport,
    DataProvider,
    ProviderComparison,
    IntegrationWebhook,
} from '../types/integration';

const MOCK_TWILIO_CONFIG: TwilioConfig = {
    id: 'twilio-1',
    accountSid: 'AC_xxxxxxxxxxxxx',
    authToken: 'xxxxxxxxxxxxx',
    apiKey: 'SK_xxxxxxxxxxxxx',
    apiSecret: 'xxxxxxxxxxxxx',
    enabled: true,
    syncInterval: 15,
    webhookUrl: 'https://admin.esim.com/webhooks/twilio',
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
};

const MOCK_DATA_PROVIDERS: DataProvider[] = [
    {
        id: 'provider-1',
        name: 'Twilio',
        type: 'primary',
        apiEndpoint: 'https://api.twilio.com',
        apiKey: 'xxxxx',
        enabled: true,
        regions: ['North America', 'Europe', 'Asia'],
        costPerGB: 5.0,
        currency: 'USD',
        reliability: 99.9,
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'provider-2',
        name: 'Alternative Provider',
        type: 'secondary',
        apiEndpoint: 'https://api.alternative.com',
        apiKey: 'xxxxx',
        enabled: true,
        regions: ['Europe', 'Asia'],
        costPerGB: 4.5,
        currency: 'USD',
        reliability: 98.5,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

class IntegrationService {
    /**
     * Get Twilio configuration
     */
    async getTwilioConfig(): Promise<TwilioConfig> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<TwilioConfig>('/integrations/twilio/config');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_TWILIO_CONFIG);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch Twilio configuration');
        }
    }

    /**
     * Update Twilio configuration
     */
    async updateTwilioConfig(config: Partial<TwilioConfig>): Promise<TwilioConfig> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.patch<TwilioConfig>('/integrations/twilio/config', config);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    Object.assign(MOCK_TWILIO_CONFIG, config, {
                        updatedAt: new Date().toISOString(),
                    });
                    resolve(MOCK_TWILIO_CONFIG);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to update Twilio configuration');
        }
    }

    /**
     * Get Twilio sync status
     */
    async getTwilioSyncStatus(): Promise<TwilioSyncStatus> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<TwilioSyncStatus>('/integrations/twilio/sync-status');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const status: TwilioSyncStatus = {
                        lastSync: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
                        status: 'success',
                        esimsSync: 100,
                        nextSync: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
                    };
                    resolve(status);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch Twilio sync status');
        }
    }

    /**
     * Trigger manual Twilio sync
     */
    async triggerTwilioSync(): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.post('/integrations/twilio/sync');

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Twilio sync triggered');
                    resolve();
                }, 1000);
            });
        } catch (error) {
            throw new Error('Failed to trigger Twilio sync');
        }
    }

    /**
     * Get Twilio usage reports
     */
    async getTwilioUsageReports(months: number = 6): Promise<TwilioUsageReport[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<TwilioUsageReport[]>('/integrations/twilio/usage', { params: { months } });
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const reports: TwilioUsageReport[] = [];
                    for (let i = months - 1; i >= 0; i--) {
                        const date = new Date();
                        date.setMonth(date.getMonth() - i);
                        reports.push({
                            period: date.toISOString().slice(0, 7),
                            totaleSIMs: 100 + Math.floor(Math.random() * 50),
                            activeSIMs: 80 + Math.floor(Math.random() * 20),
                            dataUsed: 500 + Math.random() * 200,
                            cost: 2500 + Math.random() * 1000,
                            currency: 'USD',
                        });
                    }
                    resolve(reports);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to fetch Twilio usage reports');
        }
    }

    /**
     * Get data providers
     */
    async getDataProviders(): Promise<DataProvider[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<DataProvider[]>('/integrations/providers');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_DATA_PROVIDERS);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch data providers');
        }
    }

    /**
     * Add data provider
     */
    async addDataProvider(provider: Omit<DataProvider, 'id' | 'createdAt' | 'updatedAt'>): Promise<DataProvider> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.post<DataProvider>('/integrations/providers', provider);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const newProvider: DataProvider = {
                        id: `provider-${MOCK_DATA_PROVIDERS.length + 1}`,
                        ...provider,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };
                    MOCK_DATA_PROVIDERS.push(newProvider);
                    resolve(newProvider);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to add data provider');
        }
    }

    /**
     * Compare providers
     */
    async compareProviders(): Promise<ProviderComparison[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<ProviderComparison[]>('/integrations/providers/compare');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const comparisons: ProviderComparison[] = MOCK_DATA_PROVIDERS.map((provider) => ({
                        providerId: provider.id,
                        providerName: provider.name,
                        costPerGB: provider.costPerGB,
                        dataQuality: 90 + Math.random() * 10,
                        uptime: provider.reliability,
                        avgSpeed: 50 + Math.random() * 50,
                        totalCost: provider.costPerGB * 1000,
                    }));
                    resolve(comparisons);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to compare providers');
        }
    }

    /**
     * Get webhooks
     */
    async getWebhooks(): Promise<IntegrationWebhook[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<IntegrationWebhook[]>('/integrations/webhooks');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const webhooks: IntegrationWebhook[] = [
                        {
                            id: 'webhook-1',
                            provider: 'twilio',
                            url: 'https://admin.esim.com/webhooks/twilio',
                            events: ['esim.activated', 'esim.deactivated', 'data.usage'],
                            secret: 'REDACTED_WHSEC_xxxxx',
                            enabled: true,
                            lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                            successCount: 1250,
                            failureCount: 5,
                            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
                        },
                        {
                            id: 'webhook-2',
                            provider: 'stripe',
                            url: 'https://admin.esim.com/webhooks/stripe',
                            events: ['payment.succeeded', 'payment.failed', 'refund.created'],
                            secret: 'REDACTED_WHSEC_yyyyy',
                            enabled: true,
                            lastTriggered: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                            successCount: 890,
                            failureCount: 2,
                            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                        },
                    ];
                    resolve(webhooks);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch webhooks');
        }
    }
}

export default new IntegrationService();
