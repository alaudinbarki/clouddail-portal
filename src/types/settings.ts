// Settings & Configuration TypeScript interfaces and types

export interface SystemSettings {
    id: string;
    general: GeneralSettings;
    security: SecuritySettings;
    email: EmailSettings;
    sms: SMSSettings;
    payment: PaymentSettings;
    notifications: NotificationSettings;
    updatedAt: string;
    updatedBy: string;
}

export interface GeneralSettings {
    siteName: string;
    siteUrl: string;
    supportEmail: string;
    supportPhone: string;
    timezone: string;
    dateFormat: string;
    currency: string;
    language: string;
    maintenanceMode: boolean;
    maintenanceMessage?: string;
}

export interface SecuritySettings {
    passwordMinLength: number;
    passwordRequireUppercase: boolean;
    passwordRequireNumbers: boolean;
    passwordRequireSpecialChars: boolean;
    sessionTimeout: number; // minutes
    maxLoginAttempts: number;
    lockoutDuration: number; // minutes
    twoFactorEnabled: boolean;
    ipWhitelist: string[];
    allowedOrigins: string[];
}

export interface EmailSettings {
    provider: 'smtp' | 'sendgrid' | 'ses' | 'mailgun';
    smtpHost?: string;
    smtpPort?: number;
    smtpUsername?: string;
    smtpPassword?: string;
    fromEmail: string;
    fromName: string;
    replyToEmail: string;
    apiKey?: string;
    templates: EmailTemplate[];
}

export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    body: string;
    variables: string[];
    type: 'welcome' | 'password_reset' | 'payment_receipt' | 'esim_activation' | 'custom';
}

export interface SMSSettings {
    provider: 'twilio' | 'nexmo' | 'sns';
    accountSid?: string;
    authToken?: string;
    fromNumber: string;
    apiKey?: string;
    apiSecret?: string;
    templates: SMSTemplate[];
}

export interface SMSTemplate {
    id: string;
    name: string;
    message: string;
    variables: string[];
    type: 'verification' | 'alert' | 'notification' | 'custom';
}

export interface PaymentSettings {
    provider: 'stripe' | 'paypal' | 'square';
    publicKey: string;
    secretKey: string;
    webhookSecret: string;
    currency: string;
    testMode: boolean;
    allowedMethods: string[];
}

export interface NotificationSettings {
    enableEmail: boolean;
    enableSMS: boolean;
    enablePush: boolean;
    enableInApp: boolean;
    defaultFrequency: 'instant' | 'daily' | 'weekly';
}

export interface APIConfiguration {
    id: string;
    name: string;
    provider: string;
    endpoint: string;
    apiKey: string;
    apiSecret?: string;
    enabled: boolean;
    rateLimit: number;
    timeout: number;
    retryAttempts: number;
    webhookUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminPreferences {
    userId: string;
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    dateFormat: string;
    itemsPerPage: number;
    defaultView: 'grid' | 'list' | 'table';
    notifications: {
        email: boolean;
        desktop: boolean;
        sound: boolean;
    };
    dashboard: {
        widgets: string[];
        layout: 'default' | 'compact' | 'expanded';
    };
}

export interface AuditLog {
    id: string;
    userId: string;
    userName: string;
    action: string;
    resource: string;
    resourceId?: string;
    changes?: Record<string, any>;
    ipAddress: string;
    userAgent: string;
    timestamp: string;
}
