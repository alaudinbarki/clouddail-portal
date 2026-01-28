import axiosInstance from '../utils/axios';
import type {
    Notification,
    NotificationPreferences,
    Alert,
    NotificationStats,
    NotificationQueryParams,
    BulkNotificationRequest,
} from '../types/notification';
import type { PaginatedResponse } from '../types/user';

// Mock notification data generator
const generateMockNotifications = (count: number, userId: string): Notification[] => {
    const notifications: Notification[] = [];
    const types: Array<'system' | 'payment' | 'esim' | 'user' | 'security' | 'marketing' | 'alert'> =
        ['system', 'payment', 'esim', 'user', 'security', 'marketing', 'alert'];
    const categories: Array<'info' | 'success' | 'warning' | 'error'> =
        ['info', 'success', 'warning', 'error'];

    const templates = [
        { type: 'payment', category: 'success', title: 'Payment Successful', message: 'Your payment of $29.99 has been processed successfully.' },
        { type: 'esim', category: 'info', title: 'eSIM Activated', message: 'Your eSIM has been activated and is ready to use.' },
        { type: 'system', category: 'warning', title: 'Maintenance Scheduled', message: 'System maintenance is scheduled for tonight at 2 AM.' },
        { type: 'alert', category: 'error', title: 'High Data Usage', message: 'You have used 90% of your data limit.' },
        { type: 'security', category: 'warning', title: 'New Login Detected', message: 'A new login was detected from New York, USA.' },
    ];

    for (let i = 1; i <= count; i++) {
        const template = templates[Math.floor(Math.random() * templates.length)];
        const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
        const isRead = Math.random() > 0.4;

        notifications.push({
            id: `notif-${i}`,
            userId,
            type: template.type as any,
            title: template.title,
            message: template.message,
            priority: Math.random() > 0.8 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
            status: isRead ? 'read' : 'unread',
            category: template.category as any,
            actionUrl: Math.random() > 0.5 ? '/dashboard' : undefined,
            actionLabel: Math.random() > 0.5 ? 'View Details' : undefined,
            createdAt: createdAt.toISOString(),
            readAt: isRead ? new Date(createdAt.getTime() + 3600000).toISOString() : undefined,
        });
    }

    return notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const MOCK_ALERTS: Alert[] = [
    {
        id: 'alert-1',
        type: 'low_inventory',
        severity: 'warning',
        title: 'Low eSIM Inventory',
        description: 'Available eSIM inventory is below 20%. Please provision more eSIMs.',
        affectedeSIMs: 15,
        status: 'active',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'alert-2',
        type: 'high_usage',
        severity: 'info',
        title: 'High Data Usage Detected',
        description: 'Multiple users are experiencing high data usage today.',
        affectedUsers: 25,
        status: 'active',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
];

class NotificationService {
    /**
     * Get notifications for a user
     */
    async getNotifications(userId: string, params: NotificationQueryParams = {}): Promise<PaginatedResponse<Notification>> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<PaginatedResponse<Notification>>(`/users/${userId}/notifications`, { params });
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    let notifications = generateMockNotifications(50, userId);

                    // Apply status filter
                    if (params.status && params.status !== 'all') {
                        notifications = notifications.filter((n) => n.status === params.status);
                    }

                    // Apply type filter
                    if (params.type && params.type !== 'all') {
                        notifications = notifications.filter((n) => n.type === params.type);
                    }

                    // Apply category filter
                    if (params.category && params.category !== 'all') {
                        notifications = notifications.filter((n) => n.category === params.category);
                    }

                    // Apply pagination
                    const page = params.page || 1;
                    const pageSize = params.pageSize || 10;
                    const startIndex = (page - 1) * pageSize;
                    const endIndex = startIndex + pageSize;
                    const paginatedNotifications = notifications.slice(startIndex, endIndex);

                    resolve({
                        data: paginatedNotifications,
                        total: notifications.length,
                        page,
                        pageSize,
                        totalPages: Math.ceil(notifications.length / pageSize),
                    });
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch notifications');
        }
    }

    /**
     * Mark notification as read
     */
    async markAsRead(notificationId: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.patch(`/notifications/${notificationId}/read`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`Notification ${notificationId} marked as read`);
                    resolve();
                }, 200);
            });
        } catch (error) {
            throw new Error('Failed to mark notification as read');
        }
    }

    /**
     * Mark all notifications as read
     */
    async markAllAsRead(userId: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.patch(`/users/${userId}/notifications/read-all`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`All notifications for user ${userId} marked as read`);
                    resolve();
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to mark all notifications as read');
        }
    }

    /**
     * Delete notification
     */
    async deleteNotification(notificationId: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.delete(`/notifications/${notificationId}`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`Notification ${notificationId} deleted`);
                    resolve();
                }, 200);
            });
        } catch (error) {
            throw new Error('Failed to delete notification');
        }
    }

    /**
     * Get notification preferences
     */
    async getPreferences(userId: string): Promise<NotificationPreferences> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<NotificationPreferences>(`/users/${userId}/notification-preferences`);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const preferences: NotificationPreferences = {
                        userId,
                        email: {
                            enabled: true,
                            frequency: 'instant',
                            types: ['payment', 'esim', 'security'],
                        },
                        sms: {
                            enabled: false,
                            types: ['security', 'alert'],
                        },
                        push: {
                            enabled: true,
                            types: ['payment', 'esim', 'alert'],
                        },
                        inApp: {
                            enabled: true,
                            sound: true,
                            desktop: true,
                            types: ['system', 'payment', 'esim', 'user', 'security', 'alert'],
                        },
                        updatedAt: new Date().toISOString(),
                    };

                    resolve(preferences);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch notification preferences');
        }
    }

    /**
     * Update notification preferences
     */
    async updatePreferences(userId: string, preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.patch<NotificationPreferences>(`/users/${userId}/notification-preferences`, preferences);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const updated: NotificationPreferences = {
                        userId,
                        ...preferences,
                        updatedAt: new Date().toISOString(),
                    } as NotificationPreferences;

                    resolve(updated);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to update notification preferences');
        }
    }

    /**
     * Get notification statistics
     */
    async getStats(userId: string): Promise<NotificationStats> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<NotificationStats>(`/users/${userId}/notification-stats`);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const notifications = generateMockNotifications(50, userId);
                    const unread = notifications.filter((n) => n.status === 'unread');

                    const byType: any = {};
                    const byCategory: any = {};

                    notifications.forEach((n) => {
                        byType[n.type] = (byType[n.type] || 0) + 1;
                        byCategory[n.category] = (byCategory[n.category] || 0) + 1;
                    });

                    resolve({
                        total: notifications.length,
                        unread: unread.length,
                        byType,
                        byCategory,
                    });
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch notification stats');
        }
    }

    /**
     * Get system alerts
     */
    async getAlerts(): Promise<Alert[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<Alert[]>('/alerts');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_ALERTS);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch alerts');
        }
    }

    /**
     * Resolve alert
     */
    async resolveAlert(alertId: string, resolvedBy: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.patch(`/alerts/${alertId}/resolve`, { resolvedBy });

            return new Promise((resolve) => {
                setTimeout(() => {
                    const alert = MOCK_ALERTS.find((a) => a.id === alertId);
                    if (alert) {
                        alert.status = 'resolved';
                        alert.resolvedAt = new Date().toISOString();
                        alert.resolvedBy = resolvedBy;
                    }
                    resolve();
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to resolve alert');
        }
    }

    /**
     * Send bulk notifications
     */
    async sendBulkNotification(request: BulkNotificationRequest): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.post('/notifications/bulk', request);

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`Bulk notification sent to ${request.userIds.length} users`);
                    resolve();
                }, 1000);
            });
        } catch (error) {
            throw new Error('Failed to send bulk notification');
        }
    }
}

export default new NotificationService();
