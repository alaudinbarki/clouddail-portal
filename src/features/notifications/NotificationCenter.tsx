import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    Divider,
    Chip,
    Button,
    CircularProgress,
    Alert,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Notifications as NotificationIcon,
    CheckCircle as CheckIcon,
    Delete as DeleteIcon,
    Info as InfoIcon,
    Warning as WarningIcon,
    Error as ErrorIcon,
} from '@mui/icons-material';
import notificationService from '../../services/notificationService';
import type { Notification } from '../../types/notification';

const NotificationCenter: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    useEffect(() => {
        loadNotifications();
    }, [filter]);

    const loadNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await notificationService.getNotifications({
                page: 1,
                pageSize: 50,
                unreadOnly: filter === 'unread',
            });
            setNotifications(data.data);
        } catch (err) {
            setError('Failed to load notifications');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await notificationService.markAsRead(id);
            setNotifications(notifications.map(n =>
                n.id === id ? { ...n, read: true } : n
            ));
        } catch (err) {
            console.error('Failed to mark as read:', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await notificationService.deleteNotification(id);
            setNotifications(notifications.filter(n => n.id !== id));
        } catch (err) {
            console.error('Failed to delete notification:', err);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(notifications.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error('Failed to mark all as read:', err);
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckIcon color="success" />;
            case 'warning':
                return <WarningIcon color="warning" />;
            case 'error':
                return <ErrorIcon color="error" />;
            default:
                return <InfoIcon color="info" />;
        }
    };

    const filteredNotifications = notifications;
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">
                    Notifications
                    {unreadCount > 0 && (
                        <Chip
                            label={unreadCount}
                            color="primary"
                            size="small"
                            sx={{ ml: 2 }}
                        />
                    )}
                </Typography>
                <Button onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
                    Mark All as Read
                </Button>
            </Box>

            <Paper>
                <Tabs
                    value={filter}
                    onChange={(_, newValue) => setFilter(newValue)}
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tab label="All" value="all" />
                    <Tab label={`Unread (${unreadCount})`} value="unread" />
                </Tabs>

                {error && (
                    <Alert severity="error" sx={{ m: 2 }}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : filteredNotifications.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <NotificationIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                        <Typography color="textSecondary">
                            {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                        </Typography>
                    </Box>
                ) : (
                    <List>
                        {filteredNotifications.map((notification, index) => (
                            <React.Fragment key={notification.id}>
                                <ListItem
                                    sx={{
                                        bgcolor: notification.read ? 'transparent' : 'action.hover',
                                    }}
                                    secondaryAction={
                                        <Box>
                                            {!notification.read && (
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <CheckIcon />
                                                </IconButton>
                                            )}
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleDelete(notification.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'transparent' }}>
                                            {getNotificationIcon(notification.type)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body1" fontWeight={notification.read ? 'normal' : 'bold'}>
                                                    {notification.title}
                                                </Typography>
                                                {!notification.read && (
                                                    <Chip label="New" color="primary" size="small" />
                                                )}
                                            </Box>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="body2" color="text.secondary">
                                                    {notification.message}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(notification.createdAt).toLocaleString()}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                {index < filteredNotifications.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Paper>
        </Box>
    );
};

export default NotificationCenter;
