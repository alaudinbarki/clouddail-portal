import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid2 as Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    LinearProgress,
} from '@mui/material';
import {
    SimCard,
    QrCode2,
    ShoppingCart,
    CheckCircle,
    AccountBalanceWallet,
    Download,
} from '@mui/icons-material';

// Mock data - will be replaced with real API
const mockPlans = [
    { id: 1, name: '1GB Europe', region: 'Europe', dataGb: 1, validityDays: 7, providerCost: 5.00, sellingPrice: 8.00, provider: 'Telna', countries: 30 },
    { id: 2, name: '5GB Europe', region: 'Europe', dataGb: 5, validityDays: 30, providerCost: 15.00, sellingPrice: 22.00, provider: 'Telna', countries: 30 },
    { id: 3, name: '10GB Global', region: 'Global', dataGb: 10, validityDays: 30, providerCost: 25.00, sellingPrice: 35.00, provider: 'Telna', countries: 120 },
    { id: 4, name: '3GB Asia', region: 'Asia', dataGb: 3, validityDays: 15, providerCost: 12.00, sellingPrice: 18.00, provider: 'Telna', countries: 15 },
    { id: 5, name: '20GB USA', region: 'United States', dataGb: 20, validityDays: 30, providerCost: 30.00, sellingPrice: 45.00, provider: 'Telna', countries: 1 },
];

const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'americas', label: 'Americas' },
    { value: 'global', label: 'Global' },
];

export default function EsimMarketplace() {
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [plans, setPlans] = useState(mockPlans);
    const [loading, setLoading] = useState(false);
    const [walletBalance] = useState(125.50); // Mock wallet balance
    const [purchaseDialog, setPurchaseDialog] = useState<any>(null);
    const [qrCodeDialog, setQrCodeDialog] = useState<any>(null);

    const handlePurchase = (plan: any) => {
        setPurchaseDialog(plan);
    };

    const confirmPurchase = async () => {
        // TODO: Implement real purchase logic
        console.log('Purchasing eSIM:', purchaseDialog);

        // Simulate QR code generation
        setQrCodeDialog({
            ...purchaseDialog,
            qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            iccid: '8901234567890123456',
            lpaString: 'LPA:1$smdp.example.com$activation-code',
        });
        setPurchaseDialog(null);
    };

    return (
        <Box>
            {/* Header */}
            <Box mb={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    eSIM Data Marketplace
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Purchase eSIM data plans for global connectivity
                </Typography>
            </Box>

            {/* Wallet Balance Alert */}
            <Alert
                icon={<AccountBalanceWallet />}
                severity="info"
                sx={{ mb: 3 }}
                action={
                    <Button size="small" variant="outlined">
                        Add Funds
                    </Button>
                }
            >
                Wallet Balance: <strong>${walletBalance.toFixed(2)}</strong>
            </Alert>

            {/* Region Filter */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Region</InputLabel>
                                <Select
                                    value={selectedRegion}
                                    label="Region"
                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                >
                                    {regions.map((region) => (
                                        <MenuItem key={region.value} value={region.value}>
                                            {region.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="body2" color="text.secondary">
                                Showing {plans.length} data plans
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Data Plans Grid */}
            <Grid container spacing={3}>
                {plans.map((plan) => (
                    <Grid key={plan.id} size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {plan.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {plan.region}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        icon={<SimCard />}
                                        label={`${plan.dataGb}GB`}
                                        color="primary"
                                        size="small"
                                    />
                                </Box>

                                <Box mb={2}>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Validity
                                        </Typography>
                                        <Typography variant="body2" fontWeight="medium">
                                            {plan.validityDays} days
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Coverage
                                        </Typography>
                                        <Typography variant="body2" fontWeight="medium">
                                            {plan.countries} countries
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Provider
                                        </Typography>
                                        <Typography variant="body2" fontWeight="medium">
                                            {plan.provider}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography variant="body2" color="text.secondary">
                                            Your Profit
                                        </Typography>
                                        <Typography variant="body2" fontWeight="medium" color="success.main">
                                            ${(plan.sellingPrice - plan.providerCost).toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    p={1.5}
                                    bgcolor="grey.50"
                                    borderRadius={1}
                                    mb={2}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        Price
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold" color="primary.main">
                                        ${plan.sellingPrice.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<ShoppingCart />}
                                    onClick={() => handlePurchase(plan)}
                                    disabled={walletBalance < plan.sellingPrice}
                                >
                                    {walletBalance < plan.sellingPrice ? 'Insufficient Balance' : 'Purchase eSIM'}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Purchase Confirmation Dialog */}
            <Dialog open={!!purchaseDialog} onClose={() => setPurchaseDialog(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Confirm eSIM Purchase</DialogTitle>
                <DialogContent>
                    {purchaseDialog && (
                        <Box>
                            <Alert severity="info" sx={{ mb: 2 }}>
                                This will deduct <strong>${purchaseDialog.sellingPrice.toFixed(2)}</strong> from your wallet
                            </Alert>
                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Data Plan
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    {purchaseDialog.name}
                                </Typography>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Data Amount
                                </Typography>
                                <Typography variant="body1">{purchaseDialog.dataGb}GB</Typography>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Validity
                                </Typography>
                                <Typography variant="body1">{purchaseDialog.validityDays} days</Typography>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Coverage
                                </Typography>
                                <Typography variant="body1">{purchaseDialog.countries} countries in {purchaseDialog.region}</Typography>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                p={2}
                                bgcolor="grey.50"
                                borderRadius={1}
                            >
                                <Typography variant="body2">Total Cost</Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    ${purchaseDialog.sellingPrice.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPurchaseDialog(null)}>Cancel</Button>
                    <Button variant="contained" onClick={confirmPurchase} startIcon={<CheckCircle />}>
                        Confirm Purchase
                    </Button>
                </DialogActions>
            </Dialog>

            {/* QR Code Dialog */}
            <Dialog open={!!qrCodeDialog} onClose={() => setQrCodeDialog(null)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Box display="flex" alignItems="center" gap={1}>
                        <QrCode2 />
                        eSIM Activation
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {qrCodeDialog && (
                        <Box textAlign="center">
                            <Alert severity="success" sx={{ mb: 3 }}>
                                eSIM purchased successfully! Scan the QR code below to activate.
                            </Alert>

                            {/* QR Code */}
                            <Box
                                sx={{
                                    bgcolor: 'white',
                                    p: 3,
                                    borderRadius: 2,
                                    border: '2px solid',
                                    borderColor: 'grey.300',
                                    mb: 3,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={qrCodeDialog.qrCode}
                                    alt="eSIM QR Code"
                                    sx={{ width: 200, height: 200, mx: 'auto' }}
                                />
                            </Box>

                            {/* Details */}
                            <Box textAlign="left" mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    ICCID
                                </Typography>
                                <Typography variant="body1" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                                    {qrCodeDialog.iccid}
                                </Typography>
                            </Box>
                            <Box textAlign="left" mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    LPA String
                                </Typography>
                                <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                                    {qrCodeDialog.lpaString}
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Download />}
                                sx={{ mt: 2 }}
                            >
                                Download QR Code
                            </Button>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setQrCodeDialog(null)} variant="contained">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
