import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    FormControlLabel,
    Switch,
    Divider,
    Button,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const NotificationSettings: React.FC = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: false,
        notifyOnNewUser: true,
        notifyOnPayment: true,
        notifyOnTicket: true,
        notifyOnLowInventory: true,
        notifyOnSystemError: true,
    });

    const handleChange = (field: string, value: boolean) => {
        setSettings({ ...settings, [field]: value });
    };

    const handleSave = () => {
        console.log('Saving notification settings:', settings);
        // TODO: Implement save functionality
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Notification Settings
            </Typography>

            <Grid container spacing={3}>
                {/* Delivery Methods */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Delivery Methods
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.emailNotifications}
                                    onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                                />
                            }
                            label="Email Notifications"
                        />
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4, mb: 2 }}>
                            Receive notifications via email
                        </Typography>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.pushNotifications}
                                    onChange={(e) => handleChange('pushNotifications', e.target.checked)}
                                />
                            }
                            label="Push Notifications"
                        />
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4, mb: 2 }}>
                            Receive browser push notifications
                        </Typography>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.smsNotifications}
                                    onChange={(e) => handleChange('smsNotifications', e.target.checked)}
                                />
                            }
                            label="SMS Notifications"
                        />
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4 }}>
                            Receive critical alerts via SMS
                        </Typography>
                    </Paper>
                </Grid>

                {/* Event Types */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Event Types
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.notifyOnNewUser}
                                    onChange={(e) => handleChange('notifyOnNewUser', e.target.checked)}
                                />
                            }
                            label="New User Registrations"
                        />
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4, mb: 2 }}>
                            Get notified when new users register
                        </Typography>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.notifyOnPayment}
                                    onChange={(e) => handleChange('notifyOnPayment', e.target.checked)}
                                />
                            }
                            label="Payment Transactions"
                        />
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4, mb: 2 }}>
                            Get notified about payment activities
                        </Typography>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.notifyOnTicket}
                                    onChange={(e) => handleChange('notifyOnTicket', e.target.checked)}
                                />
                            }
                            label="Support Tickets"
                        />
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4, mb: 2 }}>
                            Get notified about new support tickets
                        </Typography>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.notifyOnLowInventory}
                                    onChange={(e) => handleChange('notifyOnLowInventory', e.target.checked)}
                                />
                            }
                            label="Low Inventory Alerts"
                        />
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4, mb: 2 }}>
                            Get notified when eSIM inventory is low
                        </Typography>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.notifyOnSystemError}
                                    onChange={(e) => handleChange('notifyOnSystemError', e.target.checked)}
                                />
                            }
                            label="System Errors"
                        />
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4 }}>
                            Get notified about system errors
                        </Typography>
                    </Paper>
                </Grid>

                {/* Save Button */}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                    >
                        Save Settings
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NotificationSettings;
