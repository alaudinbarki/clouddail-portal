import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
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
} from '@mui/material';
import {
    Phone,
    Search,
    ShoppingCart,
    CheckCircle,
    AccountBalanceWallet,
} from '@mui/icons-material';

// Mock data - will be replaced with real API
const mockNumbers = [
    { phoneNumber: '+1 (415) 555-0123', region: 'San Francisco, CA', type: 'local', providerCost: 1.15, sellingPrice: 2.00, provider: 'Telnyx' },
    { phoneNumber: '+1 (415) 555-0124', region: 'San Francisco, CA', type: 'local', providerCost: 1.20, sellingPrice: 2.00, provider: 'Twilio' },
    { phoneNumber: '+1 (415) 555-0125', region: 'San Francisco, CA', type: 'local', providerCost: 1.15, sellingPrice: 2.00, provider: 'Telnyx' },
    { phoneNumber: '+1 (800) 555-0100', region: 'United States', type: 'toll_free', providerCost: 2.50, sellingPrice: 4.00, provider: 'Twilio' },
    { phoneNumber: '+1 (800) 555-0101', region: 'United States', type: 'toll_free', providerCost: 2.45, sellingPrice: 4.00, provider: 'Telnyx' },
];

const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
];

export default function NumberMarketplace() {
    const [selectedCountry, setSelectedCountry] = useState('US');
    const [numberType, setNumberType] = useState('all');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [walletBalance] = useState(125.50); // Mock wallet balance
    const [purchaseDialog, setPurchaseDialog] = useState<any>(null);

    const handleSearch = async () => {
        setLoading(true);
        // TODO: Replace with real API call
        setTimeout(() => {
            setSearchResults(mockNumbers);
            setLoading(false);
        }, 1000);
    };

    const handlePurchase = (number: any) => {
        setPurchaseDialog(number);
    };

    const confirmPurchase = async () => {
        // TODO: Implement real purchase logic
        console.log('Purchasing:', purchaseDialog);
        setPurchaseDialog(null);
        // Show success message
    };

    return (
        <Box>
            {/* Header */}
            <Box mb={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Virtual Number Marketplace
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Browse and purchase virtual numbers from multiple providers
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

            {/* Search Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    value={selectedCountry}
                                    label="Country"
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                >
                                    {countries.map((country) => (
                                        <MenuItem key={country.code} value={country.code}>
                                            {country.flag} {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Number Type</InputLabel>
                                <Select
                                    value={numberType}
                                    label="Number Type"
                                    onChange={(e) => setNumberType(e.target.value)}
                                >
                                    <MenuItem value="all">All Types</MenuItem>
                                    <MenuItem value="local">Local</MenuItem>
                                    <MenuItem value="toll_free">Toll-Free</MenuItem>
                                    <MenuItem value="mobile">Mobile</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                startIcon={loading ? <CircularProgress size={20} /> : <Search />}
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                Search Numbers
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Available Numbers ({searchResults.length})
                    </Typography>
                    <Grid container spacing={2}>
                        {searchResults.map((number, index) => (
                            <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
                                <Card>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                            <Box>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {number.phoneNumber}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {number.region}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={number.type}
                                                size="small"
                                                color={number.type === 'toll_free' ? 'primary' : 'default'}
                                            />
                                        </Box>

                                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Provider
                                                </Typography>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {number.provider}
                                                </Typography>
                                            </Box>
                                            <Box textAlign="right">
                                                <Typography variant="caption" color="text.secondary">
                                                    Your Profit
                                                </Typography>
                                                <Typography variant="body2" fontWeight="medium" color="success.main">
                                                    ${(number.sellingPrice - number.providerCost).toFixed(2)}/mo
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
                                                Monthly Cost
                                            </Typography>
                                            <Typography variant="h6" fontWeight="bold" color="primary.main">
                                                ${number.sellingPrice.toFixed(2)}
                                            </Typography>
                                        </Box>

                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<ShoppingCart />}
                                            onClick={() => handlePurchase(number)}
                                            disabled={walletBalance < number.sellingPrice}
                                        >
                                            {walletBalance < number.sellingPrice ? 'Insufficient Balance' : 'Purchase Number'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {/* Empty State */}
            {searchResults.length === 0 && !loading && (
                <Card>
                    <CardContent sx={{ textAlign: 'center', py: 8 }}>
                        <Phone sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Search for Virtual Numbers
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Select a country and click "Search Numbers" to see available options
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {/* Purchase Confirmation Dialog */}
            <Dialog open={!!purchaseDialog} onClose={() => setPurchaseDialog(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Confirm Purchase</DialogTitle>
                <DialogContent>
                    {purchaseDialog && (
                        <Box>
                            <Alert severity="info" sx={{ mb: 2 }}>
                                This will deduct <strong>${purchaseDialog.sellingPrice.toFixed(2)}</strong> from your wallet
                            </Alert>
                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Phone Number
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    {purchaseDialog.phoneNumber}
                                </Typography>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Region
                                </Typography>
                                <Typography variant="body1">{purchaseDialog.region}</Typography>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Provider
                                </Typography>
                                <Typography variant="body1">{purchaseDialog.provider}</Typography>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                p={2}
                                bgcolor="grey.50"
                                borderRadius={1}
                            >
                                <Typography variant="body2">Monthly Cost</Typography>
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
        </Box>
    );
}
