import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid2 as Grid,
    Chip,
    LinearProgress,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {
    CardGiftcard,
    Cancel,
    Upgrade,
    TrendingUp,
    Phone,
    SimCard,
    Sms,
    DataUsage,
} from '@mui/icons-material';

// Mock data
const mockSubscriptions = [
    {
        id: 1,
        packageName: 'Business Pack',
        packageType: 'combo',
        price: 75.00,
        status: 'active',
        includedNumbers: 3,
        includedMinutes: 500,
        includedSms: 500,
        includedDataGb: 20,
        usedNumbers: 2,
        usedMinutes: 320,
        usedSms: 245,
        usedDataGb: 12.5,
        autoRenew: true,
        subscribedAt: '2024-11-01',
        expiresAt: '2025-02-01',
        validityDays: 90,
    },
    {
        id: 2,
        packageName: 'Starter Pack',
        packageType: 'combo',
        price: 25.00,
        status: 'active',
        includedNumbers: 1,
        includedMinutes: 100,
        includedSms: 100,
        includedDataGb: 5,
        usedNumbers: 1,
        usedMinutes: 85,
        usedSms: 92,
        usedDataGb: 4.2,
        autoRenew: false,
        subscribedAt: '2024-12-01',
        expiresAt: '2024-12-31',
        validityDays: 30,
    },
];

export default function MySubscriptions() {
    const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
    const [cancelDialog, setCancelDialog] = useState<any>(null);
    const [upgradeDialog, setUpgradeDialog] = useState<any>(null);

    const handleToggleAutoRenew = (subId: number) => {
        setSubscriptions(subscriptions.map(sub =>
            sub.id === subId ? { ...sub, autoRenew: !sub.autoRenew } : sub
        ));
    };

    const handleCancel = async () => {
        // TODO: Implement cancel logic
        console.log('Cancelling subscription:', cancelDialog);
        setSubscriptions(subscriptions.map(sub =>
            sub.id === cancelDialog.id ? { ...sub, status: 'cancelled', autoRenew: false } : sub
        ));
        setCancelDialog(null);
    };

    const calculateUsagePercentage = (used: number, total: number) => {
        return Math.min((used / total) * 100, 100);
    };

    const daysUntilExpiry = (expiresAt: string) => {
        const days = Math.ceil((new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return days;
    };

    return (
        <Box>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        My Subscriptions
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your package subscriptions
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<CardGiftcard />} href="/marketplace/packages">
                    Browse Packages
                </Button>
            </Box>

            {/* Subscriptions Grid */}
            <Grid container spacing={3}>
                {subscriptions.map((sub) => {
                    const daysLeft = daysUntilExpiry(sub.expiresAt);
                    const isExpiringSoon = daysLeft <= 7;
                    const minutesPercentage = calculateUsagePercentage(sub.usedMinutes, sub.includedMinutes);
                    const smsPercentage = calculateUsagePercentage(sub.usedSms, sub.includedSms);
                    const dataPercentage = calculateUsagePercentage(sub.usedDataGb, sub.includedDataGb);

                    return (
                        <Grid key={sub.id} size={{ xs: 12 }}>
                            <Card>
                                <CardContent>
                                    {/* Header */}
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold">
                                                {sub.packageName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {sub.validityDays} days validity
                                            </Typography>
                                        </Box>
                                        <Box display="flex" gap={1}>
                                            <Chip
                                                label={sub.status}
                                                size="small"
                                                color={sub.status === 'active' ? 'success' : 'default'}
                                            />
                                            <Chip
                                                label={`$${sub.price.toFixed(2)}/period`}
                                                size="small"
                                                color="primary"
                                            />
                                        </Box>
                                    </Box>

                                    {/* Expiry Warning */}
                                    {isExpiringSoon && sub.status === 'active' && (
                                        <Alert severity="warning" sx={{ mb: 2 }}>
                                            {sub.autoRenew
                                                ? `Will auto-renew in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`
                                                : `Expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''} - Enable auto-renew to continue`
                                            }
                                        </Alert>
                                    )}

                                    {/* Usage Grid */}
                                    <Grid container spacing={2} mb={2}>
                                        {/* Numbers */}
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                            <Box>
                                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                    <Phone fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        Virtual Numbers
                                                    </Typography>
                                                </Box>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {sub.usedNumbers} / {sub.includedNumbers}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        {/* Minutes */}
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                            <Box>
                                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                    <TrendingUp fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        Minutes
                                                    </Typography>
                                                </Box>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {sub.usedMinutes} / {sub.includedMinutes}
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={minutesPercentage}
                                                    color={minutesPercentage >= 80 ? 'warning' : 'primary'}
                                                    sx={{ height: 4, borderRadius: 1, mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid>

                                        {/* SMS */}
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                            <Box>
                                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                    <Sms fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        SMS
                                                    </Typography>
                                                </Box>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {sub.usedSms} / {sub.includedSms}
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={smsPercentage}
                                                    color={smsPercentage >= 80 ? 'warning' : 'primary'}
                                                    sx={{ height: 4, borderRadius: 1, mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid>

                                        {/* Data */}
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                            <Box>
                                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                    <DataUsage fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        Data
                                                    </Typography>
                                                </Box>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {sub.usedDataGb.toFixed(1)}GB / {sub.includedDataGb}GB
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={dataPercentage}
                                                    color={dataPercentage >= 80 ? 'warning' : 'primary'}
                                                    sx={{ height: 4, borderRadius: 1, mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {/* Info */}
                                    <Box bgcolor="grey.50" borderRadius={1} p={1.5} mb={2}>
                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <Typography variant="caption" color="text.secondary">
                                                    Subscribed
                                                </Typography>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {new Date(sub.subscribedAt).toLocaleDateString()}
                                                </Typography>
                                            </Grid>
                                            <Grid size={6}>
                                                <Typography variant="caption" color="text.secondary">
                                                    {sub.autoRenew ? 'Next Renewal' : 'Expires'}
                                                </Typography>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {new Date(sub.expiresAt).toLocaleDateString()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    {/* Actions */}
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Switch
                                                checked={sub.autoRenew}
                                                onChange={() => handleToggleAutoRenew(sub.id)}
                                                size="small"
                                                disabled={sub.status !== 'active'}
                                            />
                                            <Typography variant="caption">Auto-renew</Typography>
                                        </Box>
                                        <Box display="flex" gap={1}>
                                            <Button
                                                size="small"
                                                startIcon={<Upgrade />}
                                                onClick={() => setUpgradeDialog(sub)}
                                                disabled={sub.status !== 'active'}
                                            >
                                                Upgrade
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                startIcon={<Cancel />}
                                                onClick={() => setCancelDialog(sub)}
                                                disabled={sub.status !== 'active'}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Empty State */}
            {subscriptions.length === 0 && (
                <Card>
                    <CardContent sx={{ textAlign: 'center', py: 8 }}>
                        <CardGiftcard sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            No Active Subscriptions
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Subscribe to a package to get started
                        </Typography>
                        <Button variant="contained" href="/marketplace/packages">
                            Browse Packages
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Cancel Confirmation Dialog */}
            <Dialog open={!!cancelDialog} onClose={() => setCancelDialog(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Cancel Subscription</DialogTitle>
                <DialogContent>
                    {cancelDialog && (
                        <Box>
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                Are you sure you want to cancel this subscription?
                            </Alert>
                            <Typography variant="h6" gutterBottom>
                                {cancelDialog.packageName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                Your subscription will remain active until {new Date(cancelDialog.expiresAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You can resubscribe anytime.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancelDialog(null)}>Keep Subscription</Button>
                    <Button variant="contained" color="error" onClick={handleCancel}>
                        Cancel Subscription
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Upgrade Dialog */}
            <Dialog open={!!upgradeDialog} onClose={() => setUpgradeDialog(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Upgrade Subscription</DialogTitle>
                <DialogContent>
                    {upgradeDialog && (
                        <Box>
                            <Alert severity="info" sx={{ mb: 2 }}>
                                Upgrade to a higher tier package
                            </Alert>
                            <Typography variant="h6" gutterBottom>
                                Current: {upgradeDialog.packageName}
                            </Typography>
                            {/* Add upgrade options here */}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setUpgradeDialog(null)}>Cancel</Button>
                    <Button variant="contained">
                        Upgrade Now
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
