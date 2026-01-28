import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Divider,
    Switch,
    FormControlLabel,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const SystemSettings: React.FC = () => {
    const [settings, setSettings] = useState({
        siteName: 'eSIM Admin Portal',
        supportEmail: 'support@esimadmin.com',
        maintenanceMode: false,
        allowRegistration: true,
        requireEmailVerification: true,
        sessionTimeout: '30',
        maxLoginAttempts: '5',
    });

    const handleChange = (field: string, value: any) => {
        setSettings({ ...settings, [field]: value });
    };

    const handleSave = () => {
        console.log('Saving settings:', settings);
        // TODO: Implement save functionality
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                System Settings
            </Typography>

            <Grid container spacing={3}>
                {/* General Settings */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            General Settings
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Site Name"
                                    value={settings.siteName}
                                    onChange={(e) => handleChange('siteName', e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Support Email"
                                    type="email"
                                    value={settings.supportEmail}
                                    onChange={(e) => handleChange('supportEmail', e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.maintenanceMode}
                                            onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                                        />
                                    }
                                    label="Maintenance Mode"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.allowRegistration}
                                            onChange={(e) => handleChange('allowRegistration', e.target.checked)}
                                        />
                                    }
                                    label="Allow User Registration"
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Security Settings */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Security Settings
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.requireEmailVerification}
                                            onChange={(e) => handleChange('requireEmailVerification', e.target.checked)}
                                        />
                                    }
                                    label="Require Email Verification"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Session Timeout (minutes)"
                                    type="number"
                                    value={settings.sessionTimeout}
                                    onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Max Login Attempts"
                                    type="number"
                                    value={settings.maxLoginAttempts}
                                    onChange={(e) => handleChange('maxLoginAttempts', e.target.value)}
                                />
                            </Grid>
                        </Grid>
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

export default SystemSettings;
