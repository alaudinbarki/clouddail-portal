import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
    CircularProgress,
    Alert,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';
import {
    Visibility as ViewIcon,
    Receipt as ReceiptIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import PaymentStatusBadge from '../../components/payments/PaymentStatusBadge';
import paymentService from '../../services/paymentService';
import type { Payment, PaymentQueryParams } from '../../types/payment';

const TransactionList: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<PaymentQueryParams>({
        page: 1,
        pageSize: 10,
        status: 'all',
        method: 'all',
    });

    useEffect(() => {
        loadPayments();
    }, [filters]);

    const loadPayments = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await paymentService.getPayments(filters);
            setPayments(response.data);
            setTotal(response.total);
        } catch (err) {
            setError('Failed to load payments');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (_: unknown, newPage: number) => {
        setFilters({ ...filters, page: newPage + 1 });
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, pageSize: parseInt(event.target.value, 10), page: 1 });
    };

    const handleFilterChange = (field: keyof PaymentQueryParams, value: any) => {
        setFilters({ ...filters, [field]: value, page: 1 });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Transactions
            </Typography>

            {/* Filters */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search by transaction ID..."
                            value={filters.search || ''}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filters.status || 'all'}
                                label="Status"
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <MenuItem value="all">All Status</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="failed">Failed</MenuItem>
                                <MenuItem value="refunded">Refunded</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Payment Method</InputLabel>
                            <Select
                                value={filters.method || 'all'}
                                label="Payment Method"
                                onChange={(e) => handleFilterChange('method', e.target.value)}
                            >
                                <MenuItem value="all">All Methods</MenuItem>
                                <MenuItem value="credit_card">Credit Card</MenuItem>
                                <MenuItem value="debit_card">Debit Card</MenuItem>
                                <MenuItem value="paypal">PayPal</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={loadPayments}
                            fullWidth
                        >
                            Refresh
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Transactions Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Transaction ID</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Plan</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Method</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : payments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography color="textSecondary">No transactions found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                payments.map((payment) => (
                                    <TableRow key={payment.id} hover>
                                        <TableCell>
                                            <Typography variant="body2" fontFamily="monospace">
                                                {payment.transactionId}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{payment.userName}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {payment.userEmail}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{payment.planName}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight="medium">
                                                ${payment.amount.toFixed(2)} {payment.currency}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize' }}>
                                            {payment.paymentMethod.replace('_', ' ')}
                                        </TableCell>
                                        <TableCell>
                                            <PaymentStatusBadge status={payment.status} />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="View Details">
                                                <IconButton size="small">
                                                    <ViewIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="View Invoice">
                                                <IconButton size="small">
                                                    <ReceiptIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={total}
                    page={(filters.page || 1) - 1}
                    onPageChange={handlePageChange}
                    rowsPerPage={filters.pageSize || 10}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </Paper>
        </Box>
    );
};

export default TransactionList;
