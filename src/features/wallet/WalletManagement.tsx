import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    InputAdornment,
    MenuItem,
    Tabs,
    Tab,
} from '@mui/material';
import {
    AccountBalanceWallet as WalletIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Visibility as ViewIcon,
    Search as SearchIcon,
} from '@mui/icons-material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

const WalletManagement: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<'credit' | 'debit'>('credit');

    const wallets = [
        {
            id: '1',
            userName: 'John Doe',
            userEmail: 'john@example.com',
            balance: 250.5,
            status: 'active',
        },
        {
            id: '2',
            userName: 'Jane Smith',
            userEmail: 'jane@example.com',
            balance: 1500.0,
            status: 'active',
        },
        {
            id: '3',
            userName: 'Bob Johnson',
            userEmail: 'bob@example.com',
            balance: 75.25,
            status: 'active',
        },
    ];

    const transactions = [
        {
            id: '1',
            userName: 'John Doe',
            type: 'credit',
            amount: 100.0,
            description: 'Wallet top-up via Stripe',
            status: 'completed',
            createdAt: new Date().toISOString(),
        },
        {
            id: '2',
            userName: 'Jane Smith',
            type: 'debit',
            amount: 50.0,
            description: 'eSIM purchase - Global 5GB',
            status: 'completed',
            createdAt: new Date().toISOString(),
        },
        {
            id: '3',
            userName: 'Bob Johnson',
            type: 'credit',
            amount: 75.0,
            description: 'Refund - Transaction #12345',
            status: 'completed',
            createdAt: new Date().toISOString(),
        },
    ];

    const stats = {
        totalWallets: 150,
        activeWallets: 142,
        totalBalance: 125000,
        totalCredits: 85000,
        totalDebits: 60000,
        avgBalance: 833.33,
    };

    const handleOpenDialog = (type: 'credit' | 'debit') => {
        setDialogType(type);
        setOpenDialog(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'suspended':
                return 'error';
            case 'frozen':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Wallet Management</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog('credit')}
                    >
                        Add Credit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<RemoveIcon />}
                        onClick={() => handleOpenDialog('debit')}
                    >
                        Deduct
                    </Button>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Wallets
                            </Typography>
                            <Typography variant="h4">{stats.totalWallets}</Typography>
                            <Typography variant="caption" color="success.main">
                                {stats.activeWallets} Active
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Balance
                            </Typography>
                            <Typography variant="h4">${stats.totalBalance.toLocaleString()}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Across all wallets
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Credits
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                +${stats.totalCredits.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                This month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Average Balance
                            </Typography>
                            <Typography variant="h4">${stats.avgBalance.toFixed(2)}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Per wallet
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Paper sx={{ mb: 3 }}>
                <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                    <Tab label="All Wallets" />
                    <Tab label="Transactions" />
                </Tabs>

                {/* Wallets Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ p: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Search by name or email..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell align="right">Balance</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {wallets.map((wallet) => (
                                        <TableRow key={wallet.id} hover>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="bold">
                                                    {wallet.userName}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {wallet.userEmail}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="h6" color="primary.main">
                                                    ${wallet.balance.toFixed(2)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={wallet.status.toUpperCase()}
                                                    color={getStatusColor(wallet.status)}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton size="small">
                                                    <ViewIcon />
                                                </IconButton>
                                                <IconButton size="small" color="success">
                                                    <AddIcon />
                                                </IconButton>
                                                <IconButton size="small" color="error">
                                                    <RemoveIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </TabPanel>

                {/* Transactions Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ p: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((tx) => (
                                        <TableRow key={tx.id} hover>
                                            <TableCell>
                                                <Typography variant="body2">{tx.userName}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={tx.type.toUpperCase()}
                                                    color={tx.type === 'credit' ? 'success' : 'error'}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    variant="body2"
                                                    color={tx.type === 'credit' ? 'success.main' : 'error.main'}
                                                    fontWeight="bold"
                                                >
                                                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">{tx.description}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={tx.status} color="success" size="small" />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {new Date(tx.createdAt).toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </TabPanel>
            </Paper>

            {/* Credit/Debit Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {dialogType === 'credit' ? 'Add Credit to Wallet' : 'Deduct from Wallet'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField fullWidth select label="Select User">
                                {wallets.map((wallet) => (
                                    <MenuItem key={wallet.id} value={wallet.id}>
                                        {wallet.userName} - ${wallet.balance.toFixed(2)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Amount"
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Description" multiline rows={3} />
                        </Grid>
                        {dialogType === 'credit' && (
                            <Grid item xs={12}>
                                <TextField fullWidth select label="Payment Method">
                                    <MenuItem value="stripe">Stripe</MenuItem>
                                    <MenuItem value="bank">Local Bank</MenuItem>
                                    <MenuItem value="manual">Manual</MenuItem>
                                </TextField>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        color={dialogType === 'credit' ? 'success' : 'error'}
                        onClick={() => setOpenDialog(false)}
                    >
                        {dialogType === 'credit' ? 'Add Credit' : 'Deduct'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default WalletManagement;
