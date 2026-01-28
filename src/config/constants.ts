// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
};

// App Configuration
export const APP_CONFIG = {
    NAME: 'eSIM Admin Portal',
    VERSION: '1.0.0',
    DESCRIPTION: 'eSIM Reselling Management Platform',
    SUPPORT_EMAIL: 'support@esimadmin.com',
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

// Date Formats
export const DATE_FORMATS = {
    DISPLAY: 'MMM dd, yyyy',
    DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
    API: 'yyyy-MM-dd',
    API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
};

// User Roles
export const USER_ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    SUPPORT: 'support',
    CUSTOMER: 'customer',
} as const;

// User Status
export const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
} as const;

// KYC Status
export const KYC_STATUS = {
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
} as const;

// eSIM Status
export const ESIM_STATUS = {
    AVAILABLE: 'available',
    ACTIVE: 'active',
    SUSPENDED: 'suspended',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
} as const;

// Transaction Status
export const TRANSACTION_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    CANCELLED: 'cancelled',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
    CREDIT_CARD: 'credit_card',
    PAYPAL: 'paypal',
    CRYPTO: 'crypto',
    BANK_TRANSFER: 'bank_transfer',
} as const;

// Ticket Status
export const TICKET_STATUS = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
} as const;

// Ticket Priority
export const TICKET_PRIORITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
} as const;

// Chart Colors
export const CHART_COLORS = {
    PRIMARY: '#6366F1',
    SECONDARY: '#EC4899',
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    ERROR: '#EF4444',
    INFO: '#3B82F6',
    PURPLE: '#8B5CF6',
    TEAL: '#14B8A6',
    ORANGE: '#F97316',
    PINK: '#F472B6',
};

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data',
    THEME_MODE: 'theme_mode',
    SIDEBAR_STATE: 'sidebar_state',
} as const;

// File Upload
export const FILE_UPLOAD = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: {
        IMAGE: ['image/jpeg', 'image/png', 'image/jpg'],
        DOCUMENT: ['application/pdf', 'image/jpeg', 'image/png'],
    },
};

// Regex Patterns
export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[1-9]\d{1,14}$/,
    ICCID: /^\d{19,20}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
    GENERIC_ERROR: 'Something went wrong. Please try again.',
    VALIDATION_ERROR: 'Please check your input and try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
    SAVE_SUCCESS: 'Changes saved successfully.',
    DELETE_SUCCESS: 'Item deleted successfully.',
    UPDATE_SUCCESS: 'Updated successfully.',
    CREATE_SUCCESS: 'Created successfully.',
};
