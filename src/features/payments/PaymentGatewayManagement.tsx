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
    MenuItem,
    Divider,
} from '@mui/material';
import {
    Add as AddIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';

const PaymentGatewayManagement: React.FC = () => {
    const [gateways, setGateways] = useState([
        {
            id: '1',
            name: 'Stripe',
            type: 'stripe',
            status: 'active',
            supportedCurrencies: ['USD', 'EUR', 'GBP'],
            transactionFee: 2.9,
            fixedFee: 0.3,
            totalTransactions: 1250,
            totalRevenue: 125000,
        },
        {
            id: '2',
            name: 'Local Bank - HBL',
            type: 'local_bank',
            status: 'active',
            supportedCurrencies: ['PKR'],
            transactionFee: 1.5,
            fixedFee: 0,
            totalTransactions: 450,
            totalRevenue: 45000,
        },
        {
            id: '3',
            name: 'Local Bank - Meezan',
            type: 'local_bank',
            status: 'active',
            supportedCurrencies: ['PKR'],
            transactionFee: 1.5,
            fixedFee: 0,
            totalTransactions: 320,
            totalRevenue: 32000,
        },
        {
            id: '4',
            name: 'PayPal',
            type: 'paypal',
            status: 'inactive',
            supportedCurrencies: ['USD', 'EUR'],
            transactionFee: 3.5,
            fixedFee: 0.5,
            totalTransactions: 0,
            totalRevenue: 0,
        },
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedGateway, setSelectedGateway] = useState<any>(null);

    const stats = {
        totalGateways: 4,
        activeGateways: 3,
        totalTransactions: 2020,
        totalRevenue: 202000,
        avgTransactionFee: 2.35,
    };

    const handleEditGateway = (gateway: any) => {
        setSelectedGateway(gateway);
        setOpenDialog(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'error';
            case 'testing':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Payment Gateway Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
                    Add Gateway
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Gateways
                            </Typography>
                            <Typography variant="h4">{stats.totalGateways}</Typography>
                            <Typography variant="caption" color="success.main">
                                {stats.activeGateways} Active
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Transactions
                            </Typography>
                            <Typography variant="h4">{stats.totalTransactions.toLocaleString()}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                All time
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Revenue
                            </Typography>
                            <Typography variant="h4">${stats.totalRevenue.toLocaleString()}</Typography>
                            <Typography variant="caption" color="success.main">
                                Via all gateways
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Avg Transaction Fee
                            </Typography>
                            <Typography variant="h4">{stats.avgTransactionFee}%</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Across gateways
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Gateways Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Gateway</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Currencies</TableCell>
                                <TableCell align="right">Fee %</TableCell>
                                <TableCell align="right">Fixed Fee</TableCell>
                                <TableCell align="right">Transactions</TableCell>
                                <TableCell align="right">Revenue</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gateways.map((gateway) => (
                                <TableRow key={gateway.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="bold">
                                            {gateway.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={gateway.type.replace('_', ' ')} size="small" variant="outlined" />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={gateway.status.toUpperCase()}
                                            color={getStatusColor(gateway.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                            {gateway.supportedCurrencies.map((currency) => (
                                                <Chip key={currency} label={currency} size="small" variant="outlined" />
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">{gateway.transactionFee}%</TableCell>
                                    <TableCell align="right">${gateway.fixedFee.toFixed(2)}</TableCell>
                                    <TableCell align="right">{gateway.totalTransactions.toLocaleString()}</TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2" fontWeight="bold" color="primary.main">
                                            ${gateway.totalRevenue.toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleEditGateway(gateway)}>
                                            <SettingsIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Add/Edit Gateway Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>{selectedGateway ? 'Edit Gateway' : 'Add Payment Gateway'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Gateway Name"
                                defaultValue={selectedGateway?.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Gateway Type"
                                defaultValue={selectedGateway?.type || 'stripe'}
                            >
                                <MenuItem value="stripe">Stripe</MenuItem>
                                <MenuItem value="local_bank">Local Bank</MenuItem>
                                <MenuItem value="paypal">PayPal</MenuItem>
                                <MenuItem value="crypto">Cryptocurrency</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Status"
                                defaultValue={selectedGateway?.status || 'testing'}
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                                <MenuItem value="testing">Testing</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Supported Currencies"
                                placeholder="USD, EUR, PKR"
                                defaultValue={selectedGateway?.supportedCurrencies?.join(', ')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 1 }}>
                                <Typography variant="caption">API Configuration</Typography>
                            </Divider>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth label="API Key" type="password" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="API Secret" type="password" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Webhook Secret" type="password" />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 1 }}>
                                <Typography variant="caption">Fee Configuration</Typography>
                            </Divider>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Transaction Fee (%)"
                                type="number"
                                defaultValue={selectedGateway?.transactionFee}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Fixed Fee"
                                type="number"
                                defaultValue={selectedGateway?.fixedFee}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Min Amount"
                                type="number"
                                defaultValue={1}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Max Amount"
                                type="number"
                                defaultValue={10000}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenDialog(false)}>
                        Save Gateway
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PaymentGatewayManagement;
