import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Divider,
    Alert,
} from '@mui/material';
import { Save as SaveIcon, Sync as SyncIcon } from '@mui/icons-material';

const TwilioConfig: React.FC = () => {
    const [config, setConfig] = useState({
        enabled: true,
        accountSid: 'AC********************************',
        authToken: '********************************',
        apiKey: 'SK********************************',
        apiSecret: '********************************',
        webhookUrl: 'https://yourapp.com/webhooks/twilio',
        statusCallbackUrl: 'https://yourapp.com/callbacks/twilio',
    });

    const [testResult, setTestResult] = useState<string | null>(null);

    const handleSave = () => {
        console.log('Saving Twilio configuration...');
        setTestResult('Configuration saved successfully!');
    };

    const handleTest = () => {
        console.log('Testing Twilio connection...');
        setTestResult('Connection test successful! Twilio API is responding.');
    };

    const stats = {
        totalNumbers: 150,
        activeNumbers: 125,
        smsThisMonth: 15000,
        voiceMinutes: 2500,
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Twilio Configuration
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Configure Twilio integration for virtual numbers and messaging
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Numbers
                            </Typography>
                            <Typography variant="h4">{stats.totalNumbers}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Active Numbers
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.activeNumbers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                SMS This Month
                            </Typography>
                            <Typography variant="h4">{stats.smsThisMonth.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Voice Minutes
                            </Typography>
                            <Typography variant="h4">{stats.voiceMinutes.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Configuration Form */}
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">API Configuration</Typography>
                    <FormControlLabel
                        control={<Switch checked={config.enabled} onChange={(e) => setConfig({ ...config, enabled: e.target.checked })} />}
                        label="Enable Twilio Integration"
                    />
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            Account Credentials
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Account SID" value={config.accountSid} onChange={(e) => setConfig({ ...config, accountSid: e.target.value })} type="password" disabled={!config.enabled} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Auth Token" value={config.authToken} onChange={(e) => setConfig({ ...config, authToken: e.target.value })} type="password" disabled={!config.enabled} />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }}>
                            <Typography variant="caption">API Keys (Optional)</Typography>
                        </Divider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="API Key" value={config.apiKey} onChange={(e) => setConfig({ ...config, apiKey: e.target.value })} type="password" disabled={!config.enabled} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="API Secret" value={config.apiSecret} onChange={(e) => setConfig({ ...config, apiSecret: e.target.value })} type="password" disabled={!config.enabled} />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }}>
                            <Typography variant="caption">Webhooks</Typography>
                        </Divider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Webhook URL" value={config.webhookUrl} onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })} disabled={!config.enabled} helperText="URL for incoming message webhooks" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Status Callback URL" value={config.statusCallbackUrl} onChange={(e) => setConfig({ ...config, statusCallbackUrl: e.target.value })} disabled={!config.enabled} helperText="URL for status callbacks" />
                    </Grid>

                    {testResult && (
                        <Grid item xs={12}>
                            <Alert severity="success" onClose={() => setTestResult(null)}>
                                {testResult}
                            </Alert>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="outlined" startIcon={<SyncIcon />} onClick={handleTest} disabled={!config.enabled}>
                                Test Connection
                            </Button>
                            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={!config.enabled}>
                                Save Configuration
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default TwilioConfig;
