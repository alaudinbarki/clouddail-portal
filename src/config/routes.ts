export const ROUTES = {
    // Auth
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',

    // Dashboard
    DASHBOARD: '/',

    // Users
    USERS: '/users',
    USER_DETAIL: '/users/:id',
    USER_CREATE: '/users/create',
    KYC_MANAGEMENT: '/users/kyc',

    // eSIM Management
    ESIM: '/esim',
    ESIM_INVENTORY: '/esim/inventory',
    ESIM_ACTIVE: '/esim/active',
    ESIM_PROVISIONING: '/esim/provisioning',
    ESIM_DETAIL: '/esim/:id',
    ESIM_QR_CODES: '/esim/qr-codes',
    ESIM_DATA_USAGE: '/esim/data-usage',

    // Pricing & Plans
    PRICING: '/pricing',
    PLANS: '/pricing/plans',
    PLAN_CREATE: '/pricing/plans/create',
    PLAN_EDIT: '/pricing/plans/:id',
    COST_MANAGEMENT: '/pricing/costs',
    PROMOTIONAL_PRICING: '/pricing/promotions',
    PRICE_HISTORY: '/pricing/history',

    // Payments
    PAYMENTS: '/payments',
    PAYMENT_DASHBOARD: '/payments/dashboard',
    TRANSACTIONS: '/payments/transactions',
    TRANSACTION_DETAIL: '/payments/transactions/:id',
    INVOICES: '/payments/invoices',
    REFUNDS: '/payments/refunds',
    PAYMENT_ANALYTICS: '/payments/analytics',

    // Reports
    REPORTS: '/reports',
    TRANSACTION_LOGS: '/reports/transactions',
    FINANCIAL_REPORTS: '/reports/financial',
    TAX_REPORTS: '/reports/tax',
    SALES_REPORTS: '/reports/sales',
    USER_GROWTH: '/reports/user-growth',
    DATA_USAGE_REPORTS: '/reports/data-usage',
    CUSTOM_REPORTS: '/reports/custom',

    // Integrations
    INTEGRATIONS: '/integrations',
    TWILIO_CONFIG: '/integrations/twilio',
    DATA_PROVIDERS: '/integrations/data-providers',
    WEBHOOKS: '/integrations/webhooks',

    // Notifications
    NOTIFICATIONS: '/notifications',
    EMAIL_TEMPLATES: '/notifications/email-templates',
    SMS_NOTIFICATIONS: '/notifications/sms',
    PUSH_NOTIFICATIONS: '/notifications/push',
    BULK_MESSAGING: '/notifications/bulk',
    AUTOMATED_ALERTS: '/notifications/alerts',

    // Support
    SUPPORT: '/support',
    TICKETS: '/support/tickets',
    TICKET_DETAIL: '/support/tickets/:id',
    KNOWLEDGE_BASE: '/support/knowledge-base',
    KB_ARTICLE: '/support/knowledge-base/:slug',

    // Settings
    SETTINGS: '/settings',
    ADMIN_USERS: '/settings/admin-users',
    SYSTEM_SETTINGS: '/settings/system',
    API_KEYS: '/settings/api-keys',
    BRANDING: '/settings/branding',
    COMPLIANCE: '/settings/compliance',

    // Profile
    PROFILE: '/profile',
    PROFILE_SETTINGS: '/profile/settings',
} as const;

// Navigation Menu Structure
export const NAVIGATION_MENU = [
    {
        title: 'Dashboard',
        path: ROUTES.DASHBOARD,
        icon: 'DashboardOutlined',
    },
    {
        title: 'User Management',
        icon: 'PeopleOutlined',
        children: [
            { title: 'All Users', path: '/users' },
            { title: 'KYC Management', path: ROUTES.KYC_MANAGEMENT },
        ],
    },
    {
        title: 'eSIM Management',
        icon: 'SimCardOutlined',
        children: [
            { title: 'Inventory', path: '/esims' },
            { title: 'Active eSIMs', path: ROUTES.ESIM_ACTIVE },
            { title: 'Provision eSIM', path: '/esims/provision' },
            { title: 'QR Codes', path: ROUTES.ESIM_QR_CODES },
            { title: 'Data Usage', path: ROUTES.ESIM_DATA_USAGE },
        ],
    },
    {
        title: 'Pricing & Plans',
        icon: 'AttachMoneyOutlined',
        children: [
            { title: 'All Plans', path: '/plans' },
            { title: 'Create Plan', path: '/plans/create' },
            { title: 'Cost Management', path: ROUTES.COST_MANAGEMENT },
            { title: 'Promotions', path: ROUTES.PROMOTIONAL_PRICING },
            { title: 'Price History', path: ROUTES.PRICE_HISTORY },
        ],
    },
    {
        title: 'Payments',
        icon: 'PaymentOutlined',
        children: [
            { title: 'Dashboard', path: '/payments' },
            { title: 'Transactions', path: '/payments/transactions' },
            { title: 'Invoices', path: ROUTES.INVOICES },
            { title: 'Refunds', path: ROUTES.REFUNDS },
            { title: 'Analytics', path: ROUTES.PAYMENT_ANALYTICS },
        ],
    },
    {
        title: 'Reports & Analytics',
        icon: 'AssessmentOutlined',
        children: [
            { title: 'Reports Hub', path: '/reports' },
            { title: 'Analytics', path: '/analytics' },
            { title: 'Financial Reports', path: ROUTES.FINANCIAL_REPORTS },
            { title: 'Sales Reports', path: ROUTES.SALES_REPORTS },
            { title: 'Transaction Logs', path: ROUTES.TRANSACTION_LOGS },
            { title: 'Tax Reports', path: ROUTES.TAX_REPORTS },
            { title: 'User Growth', path: ROUTES.USER_GROWTH },
            { title: 'Data Usage', path: ROUTES.DATA_USAGE_REPORTS },
            { title: 'Custom Reports', path: ROUTES.CUSTOM_REPORTS },
        ],
    },
    {
        title: 'Integrations',
        icon: 'IntegrationInstructionsOutlined',
        children: [
            { title: 'Twilio', path: ROUTES.TWILIO_CONFIG },
            { title: 'Data Providers', path: ROUTES.DATA_PROVIDERS },
            { title: 'Webhooks', path: ROUTES.WEBHOOKS },
        ],
    },
    {
        title: 'Notifications',
        icon: 'NotificationsOutlined',
        children: [
            { title: 'Email Templates', path: ROUTES.EMAIL_TEMPLATES },
            { title: 'SMS', path: ROUTES.SMS_NOTIFICATIONS },
            { title: 'Push Notifications', path: ROUTES.PUSH_NOTIFICATIONS },
            { title: 'Bulk Messaging', path: ROUTES.BULK_MESSAGING },
            { title: 'Automated Alerts', path: ROUTES.AUTOMATED_ALERTS },
        ],
    },
    {
        title: 'Support',
        icon: 'SupportAgentOutlined',
        children: [
            { title: 'Tickets', path: ROUTES.TICKETS },
            { title: 'Knowledge Base', path: ROUTES.KNOWLEDGE_BASE },
        ],
    },
    {
        title: 'Settings',
        icon: 'SettingsOutlined',
        children: [
            { title: 'Admin Users', path: ROUTES.ADMIN_USERS },
            { title: 'System Settings', path: ROUTES.SYSTEM_SETTINGS },
            { title: 'API Keys', path: ROUTES.API_KEYS },
            { title: 'Branding', path: ROUTES.BRANDING },
            { title: 'Compliance', path: ROUTES.COMPLIANCE },
        ],
    },
];
