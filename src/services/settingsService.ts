import axiosInstance from '../utils/axios';
import type {
    SystemSettings,
    APIConfiguration,
    AdminPreferences,
    AuditLog,
} from '../types/settings';

const MOCK_SYSTEM_SETTINGS: SystemSettings = {
    id: 'settings-1',
    general: {
        siteName: 'eSIM Admin Portal',
        siteUrl: 'https://admin.esim.com',
        supportEmail: 'support@esim.com',
        supportPhone: '+1-800-ESIM-HELP',
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
        language: 'en',
        maintenanceMode: false,
    },
    security: {
        passwordMinLength: 8,
        passwordRequireUppercase: true,
        passwordRequireNumbers: true,
        passwordRequireSpecialChars: true,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        lockoutDuration: 15,
        twoFactorEnabled: false,
        ipWhitelist: [],
        allowedOrigins: ['http://localhost:5173', 'https://admin.esim.com'],
    },
    email: {
        provider: 'smtp',
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUsername: 'noreply@esim.com',
        fromEmail: 'noreply@esim.com',
        fromName: 'eSIM Admin',
        replyToEmail: 'support@esim.com',
        templates: [
            {
                id: 'tpl-1',
                name: 'Welcome Email',
                subject: 'Welcome to eSIM Admin',
                body: 'Hello {{name}}, welcome to our platform!',
                variables: ['name'],
                type: 'welcome',
            },
        ],
    },
    sms: {
        provider: 'twilio',
        fromNumber: '+1234567890',
        templates: [
            {
                id: 'sms-1',
                name: 'Verification Code',
                message: 'Your verification code is {{code}}',
                variables: ['code'],
                type: 'verification',
            },
        ],
    },
    payment: {
        provider: 'stripe',
        publicKey: 'REDACTED_PK_TEST_xxxxx',
        secretKey: 'REDACTED_SK_TEST_xxxxx',
        webhookSecret: 'REDACTED_WHSEC_xxxxx',
        currency: 'USD',
        testMode: true,
        allowedMethods: ['credit_card', 'debit_card', 'paypal'],
    },
    notifications: {
        enableEmail: true,
        enableSMS: false,
        enablePush: true,
        enableInApp: true,
        defaultFrequency: 'instant',
    },
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin',
};

const MOCK_API_CONFIGS: APIConfiguration[] = [
    {
        id: 'api-1',
        name: 'Twilio API',
        provider: 'Twilio',
        endpoint: 'https://api.twilio.com',
        apiKey: 'AC_xxxxx',
        apiSecret: 'xxxxx',
        enabled: true,
        rateLimit: 100,
        timeout: 30000,
        retryAttempts: 3,
        webhookUrl: 'https://admin.esim.com/webhooks/twilio',
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'api-2',
        name: 'Stripe API',
        provider: 'Stripe',
        endpoint: 'https://api.stripe.com',
        apiKey: 'REDACTED_PK_TEST_xxxxx',
        apiSecret: 'REDACTED_SK_TEST_xxxxx',
        enabled: true,
        rateLimit: 100,
        timeout: 30000,
        retryAttempts: 3,
        webhookUrl: 'https://admin.esim.com/webhooks/stripe',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

class SettingsService {
    /**
     * Get system settings
     */
    async getSystemSettings(): Promise<SystemSettings> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<SystemSettings>('/settings/system');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_SYSTEM_SETTINGS);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch system settings');
        }
    }

    /**
     * Update system settings
     */
    async updateSystemSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.patch<SystemSettings>('/settings/system', settings);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    Object.assign(MOCK_SYSTEM_SETTINGS, settings, {
                        updatedAt: new Date().toISOString(),
                    });
                    resolve(MOCK_SYSTEM_SETTINGS);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to update system settings');
        }
    }

    /**
     * Get API configurations
     */
    async getAPIConfigurations(): Promise<APIConfiguration[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<APIConfiguration[]>('/settings/api-configs');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_API_CONFIGS);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch API configurations');
        }
    }

    /**
     * Update API configuration
     */
    async updateAPIConfiguration(id: string, config: Partial<APIConfiguration>): Promise<APIConfiguration> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.patch<APIConfiguration>(`/settings/api-configs/${id}`, config);
            // return response.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const configIndex = MOCK_API_CONFIGS.findIndex((c) => c.id === id);
                    if (configIndex !== -1) {
                        MOCK_API_CONFIGS[configIndex] = {
                            ...MOCK_API_CONFIGS[configIndex],
                            ...config,
                            updatedAt: new Date().toISOString(),
                        };
                        resolve(MOCK_API_CONFIGS[configIndex]);
                    } else {
                        reject(new Error('API configuration not found'));
                    }
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to update API configuration');
        }
    }

    /**
     * Get admin preferences
     */
    async getAdminPreferences(userId: string): Promise<AdminPreferences> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<AdminPreferences>(`/users/${userId}/preferences`);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const preferences: AdminPreferences = {
                        userId,
                        theme: 'light',
                        language: 'en',
                        timezone: 'America/New_York',
                        dateFormat: 'MM/DD/YYYY',
                        itemsPerPage: 10,
                        defaultView: 'table',
                        notifications: {
                            email: true,
                            desktop: true,
                            sound: false,
                        },
                        dashboard: {
                            widgets: ['revenue', 'users', 'esims', 'payments'],
                            layout: 'default',
                        },
                    };
                    resolve(preferences);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch admin preferences');
        }
    }

    /**
     * Update admin preferences
     */
    async updateAdminPreferences(userId: string, preferences: Partial<AdminPreferences>): Promise<AdminPreferences> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.patch<AdminPreferences>(`/users/${userId}/preferences`, preferences);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const updated: AdminPreferences = {
                        userId,
                        ...preferences,
                    } as AdminPreferences;
                    resolve(updated);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to update admin preferences');
        }
    }

    /**
     * Get audit logs
     */
    async getAuditLogs(limit: number = 100): Promise<AuditLog[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<AuditLog[]>('/settings/audit-logs', { params: { limit } });
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const logs: AuditLog[] = [];
                    const actions = ['create', 'update', 'delete', 'login', 'logout'];
                    const resources = ['user', 'esim', 'payment', 'plan', 'ticket'];

                    for (let i = 1; i <= limit; i++) {
                        logs.push({
                            id: `log-${i}`,
                            userId: `user-${Math.floor(Math.random() * 10) + 1}`,
                            userName: `Admin ${Math.floor(Math.random() * 10) + 1}`,
                            action: actions[Math.floor(Math.random() * actions.length)],
                            resource: resources[Math.floor(Math.random() * resources.length)],
                            resourceId: `res-${i}`,
                            ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
                            userAgent: 'Mozilla/5.0',
                            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                        });
                    }

                    resolve(logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to fetch audit logs');
        }
    }
}

export default new SettingsService();
