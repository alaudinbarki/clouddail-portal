import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid2 as Grid,
    TextField,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Switch,
    FormControlLabel,
} from '@mui/material';
import {
    AccountBalanceWallet,
    Add,
    TrendingUp,
    TrendingDown,
    Settings,
    Download,
} from '@mui/icons-material';

// Mock data
const mockTransactions = [
    { id: 1, type: 'credit', amount: 50.00, description: 'Wallet Recharge via Stripe', balanceAfter: 125.50, date: '2024-12-09 10:30 AM' },
    { id: 2, type: 'debit', amount: 2.00, description: 'Virtual Number Purchase (+1 415-555-0123)', balanceAfter: 75.50, date: '2024-12-09 09:15 AM' },
    { id: 3, type: 'debit', amount: 15.00, description: 'eSIM Purchase (5GB Europe)', balanceAfter: 77.50, date: '2024-12-09 08:00 AM' },
    { id: 4, type: 'credit', amount: 100.00, description: 'Wallet Recharge via Stripe', balanceAfter: 92.50, date: '2024-12-08 03:20 PM' },
    { id: 5, type: 'debit', amount: 0.85, description: 'Voice Call Charges', balanceAfter: -7.50, date: '2024-12-08 02:10 PM' },
];

const quickAmounts = [10, 25, 50, 100, 250, 500];

export default function MyWallet() {
    const [balance] = useState(125.50);
    const [transactions] = useState(mockTransactions);
    const [addFundsDialog, setAddFundsDialog] = useState(false);
    const [settingsDialog, setSettingsDialog] = useState(false);
    const [customAmount, setCustomAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(50);
    const [autoRecharge, setAutoRecharge] = useState(false);
    const [autoRechargeThreshold, setAutoRechargeThreshold] = useState(10);
    const [autoRechargeAmount, setAutoRechargeAmount] = useState(50);

    const handleAddFunds = () => {
        // TODO: Implement Stripe payment
        console.log('Adding funds:', selectedAmount);
        setAddFundsDialog(false);
    };

    const handleSaveSettings = () => {
        // TODO: Save auto-recharge settings
        console.log('Saving settings:', { autoRecharge, autoRechargeThreshold, autoRechargeAmount });
        setSettingsDialog(false);
    };

    return (
        <Box>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        My Wallet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your wallet balance and transactions
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<Settings />}
                    onClick={() => setSettingsDialog(true)}
                >
                    Settings
                </Button>
            </Box>

            {/* Balance Card */}
            <Grid container spacing={3} mb={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        Current Balance
                                    </Typography>
                                    <Typography variant="h3" fontWeight="bold" mt={1}>
                                        ${balance.toFixed(2)}
                                    </Typography>
                                </Box>
                                <AccountBalanceWallet sx={{ fontSize: 48, opacity: 0.7 }} />
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<Add />}
                                onClick={() => setAddFundsDialog(true)}
                                sx={{
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    '&:hover': { bgcolor: 'grey.100' },
                                }}
                            >
                                Add Funds
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box
                                            sx={{
                                                bgcolor: 'success.lighter',
                                                borderRadius: 2,
                                                p: 1.5,
                                                display: 'flex',
                                            }}
                                        >
                                            <TrendingUp sx={{ color: 'success.main' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Total Credits
                                            </Typography>
                                            <Typography variant="h6" fontWeight="bold">
                                                $1,250.00
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={12}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box
                                            sx={{
                                                bgcolor: 'error.lighter',
                                                borderRadius: 2,
                                                p: 1.5,
                                                display: 'flex',
                                            }}
                                        >
                                            <TrendingDown sx={{ color: 'error.main' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Total Debits
                                            </Typography>
                                            <Typography variant="h6" fontWeight="bold">
                                                $1,124.50
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Auto-Recharge Alert */}
            {autoRecharge && (
                <Alert severity="info" sx={{ mb: 3 }}>
                    Auto-recharge is enabled. Your wallet will be automatically recharged with ${autoRechargeAmount} when balance falls below ${autoRechargeThreshold}.
                </Alert>
            )}

            {/* Transaction History */}
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">
                            Transaction History
                        </Typography>
                        <Button startIcon={<Download />} size="small">
                            Export CSV
                        </Button>
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Balance After</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell>{tx.description}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={tx.type}
                                                size="small"
                                                color={tx.type === 'credit' ? 'success' : 'default'}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                color={tx.type === 'credit' ? 'success.main' : 'error.main'}
                                            >
                                                {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            ${tx.balanceAfter.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Add Funds Dialog */}
            <Dialog open={addFundsDialog} onClose={() => setAddFundsDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add Funds to Wallet</DialogTitle>
                <DialogContent>
                    <Box mb={3}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Quick Amounts
                        </Typography>
                        <Grid container spacing={1}>
                            {quickAmounts.map((amount) => (
                                <Grid key={amount} size={4}>
                                    <Button
                                        fullWidth
                                        variant={selectedAmount === amount ? 'contained' : 'outlined'}
                                        onClick={() => {
                                            setSelectedAmount(amount);
                                            setCustomAmount('');
                                        }}
                                    >
                                        ${amount}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box mb={3}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Or Enter Custom Amount
                        </Typography>
                        <TextField
                            fullWidth
                            type="number"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={(e) => {
                                setCustomAmount(e.target.value);
                                setSelectedAmount(parseFloat(e.target.value) || 0);
                            }}
                            InputProps={{
                                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                            }}
                        />
                    </Box>
                    <Alert severity="info">
                        You will be charged <strong>${selectedAmount.toFixed(2)}</strong> via Stripe
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddFundsDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddFunds} disabled={selectedAmount <= 0}>
                        Proceed to Payment
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Settings Dialog */}
            <Dialog open={settingsDialog} onClose={() => setSettingsDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Wallet Settings</DialogTitle>
                <DialogContent>
                    <Box mb={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={autoRecharge}
                                    onChange={(e) => setAutoRecharge(e.target.checked)}
                                />
                            }
                            label="Enable Auto-Recharge"
                        />
                        <Typography variant="caption" color="text.secondary" display="block" ml={4}>
                            Automatically add funds when balance is low
                        </Typography>
                    </Box>
                    {autoRecharge && (
                        <>
                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Recharge When Balance Falls Below"
                                    value={autoRechargeThreshold}
                                    onChange={(e) => setAutoRechargeThreshold(parseFloat(e.target.value))}
                                    InputProps={{
                                        startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                                    }}
                                />
                            </Box>
                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Recharge Amount"
                                    value={autoRechargeAmount}
                                    onChange={(e) => setAutoRechargeAmount(parseFloat(e.target.value))}
                                    InputProps={{
                                        startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                                    }}
                                />
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSettingsDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveSettings}>
                        Save Settings
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
