import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    Divider,
    Switch,
    FormControlLabel,
    Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const APIConfiguration: React.FC = () => {
    const [saved, setSaved] = useState(false);
    const [twilioConfig, setTwilioConfig] = useState({
        accountSid: '',
        authToken: '',
        apiKey: '',
        apiSecret: '',
        enabled: true,
    });

    const [stripeConfig, setStripeConfig] = useState({
        publishableKey: '',
        secretKey: '',
        webhookSecret: '',
        enabled: true,
    });

    const handleSaveTwilio = () => {
        console.log('Saving Twilio config:', twilioConfig);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleSaveStripe = () => {
        console.log('Saving Stripe config:', stripeConfig);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                API Configuration
            </Typography>

            {saved && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Configuration saved successfully!
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Twilio Configuration */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">Twilio Configuration</Typography>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={twilioConfig.enabled}
                                        onChange={(e) => setTwilioConfig({ ...twilioConfig, enabled: e.target.checked })}
                                    />
                                }
                                label="Enabled"
                            />
                        </Box>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Account SID"
                                    value={twilioConfig.accountSid}
                                    onChange={(e) => setTwilioConfig({ ...twilioConfig, accountSid: e.target.value })}
                                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Auth Token"
                                    type="password"
                                    value={twilioConfig.authToken}
                                    onChange={(e) => setTwilioConfig({ ...twilioConfig, authToken: e.target.value })}
                                    placeholder="••••••••••••••••••••••••••••••••"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="API Key"
                                    value={twilioConfig.apiKey}
                                    onChange={(e) => setTwilioConfig({ ...twilioConfig, apiKey: e.target.value })}
                                    placeholder="SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="API Secret"
                                    type="password"
                                    value={twilioConfig.apiSecret}
                                    onChange={(e) => setTwilioConfig({ ...twilioConfig, apiSecret: e.target.value })}
                                    placeholder="••••••••••••••••••••••••••••••••"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSaveTwilio}
                                >
                                    Save Twilio Configuration
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Stripe Configuration */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">Stripe Configuration</Typography>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={stripeConfig.enabled}
                                        onChange={(e) => setStripeConfig({ ...stripeConfig, enabled: e.target.checked })}
                                    />
                                }
                                label="Enabled"
                            />
                        </Box>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Publishable Key"
                                    value={stripeConfig.publishableKey}
                                    onChange={(e) => setStripeConfig({ ...stripeConfig, publishableKey: e.target.value })}
                                    placeholder="REDACTED_PK_TEST_xxxxxxxxxxxxxxxxxxxxxxxx"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Secret Key"
                                    type="password"
                                    value={stripeConfig.secretKey}
                                    onChange={(e) => setStripeConfig({ ...stripeConfig, secretKey: e.target.value })}
                                    placeholder="REDACTED_SK_TEST_xxxxxxxxxxxxxxxxxxxxxxxx"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Webhook Secret"
                                    type="password"
                                    value={stripeConfig.webhookSecret}
                                    onChange={(e) => setStripeConfig({ ...stripeConfig, webhookSecret: e.target.value })}
                                    placeholder="REDACTED_WHSEC_xxxxxxxxxxxxxxxxxxxxxxxx"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSaveStripe}
                                >
                                    Save Stripe Configuration
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Connection Status */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Connection Status
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box
                                        sx={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: '50%',
                                            bgcolor: twilioConfig.enabled ? 'success.main' : 'grey.400',
                                        }}
                                    />
                                    <Typography>Twilio: {twilioConfig.enabled ? 'Connected' : 'Disabled'}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box
                                        sx={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: '50%',
                                            bgcolor: stripeConfig.enabled ? 'success.main' : 'grey.400',
                                        }}
                                    />
                                    <Typography>Stripe: {stripeConfig.enabled ? 'Connected' : 'Disabled'}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default APIConfiguration;
