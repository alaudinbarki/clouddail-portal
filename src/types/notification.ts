// Notifications & Alerts TypeScript interfaces and types

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'unread' | 'read' | 'archived';
    category: NotificationCategory;
    actionUrl?: string;
    actionLabel?: string;
    metadata?: Record<string, any>;
    createdAt: string;
    readAt?: string;
    expiresAt?: string;
}

export type NotificationType =
    | 'system'
    | 'payment'
    | 'esim'
    | 'user'
    | 'security'
    | 'marketing'
    | 'alert';

export type NotificationCategory =
    | 'info'
    | 'success'
    | 'warning'
    | 'error';

export interface NotificationPreferences {
    userId: string;
    email: EmailPreferences;
    sms: SMSPreferences;
    push: PushPreferences;
    inApp: InAppPreferences;
    updatedAt: string;
}

export interface EmailPreferences {
    enabled: boolean;
    frequency: 'instant' | 'daily' | 'weekly';
    types: NotificationType[];
}

export interface SMSPreferences {
    enabled: boolean;
    phoneNumber?: string;
    types: NotificationType[];
}

export interface PushPreferences {
    enabled: boolean;
    types: NotificationType[];
}

export interface InAppPreferences {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
    types: NotificationType[];
}

export interface Alert {
    id: string;
    type: AlertType;
    severity: 'info' | 'warning' | 'critical';
    title: string;
    description: string;
    affectedUsers?: number;
    affectedeSIMs?: number;
    status: 'active' | 'resolved' | 'dismissed';
    createdAt: string;
    resolvedAt?: string;
    resolvedBy?: string;
}

export type AlertType =
    | 'system_outage'
    | 'high_usage'
    | 'payment_failure'
    | 'security_breach'
    | 'low_inventory'
    | 'expiring_esims';

export interface NotificationStats {
    total: number;
    unread: number;
    byType: Record<NotificationType, number>;
    byCategory: Record<NotificationCategory, number>;
}

export interface NotificationQueryParams {
    page?: number;
    pageSize?: number;
    status?: 'unread' | 'read' | 'archived' | 'all';
    type?: NotificationType | 'all';
    category?: NotificationCategory | 'all';
    startDate?: string;
    endDate?: string;
}

export interface BulkNotificationRequest {
    userIds: string[];
    type: NotificationType;
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: NotificationCategory;
    actionUrl?: string;
    actionLabel?: string;
}
