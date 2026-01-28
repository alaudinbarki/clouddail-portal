import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
    Divider,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    Download as DownloadIcon,
    Receipt as ReceiptIcon,
} from '@mui/icons-material';
import paymentService from '../../services/paymentService';
import type { Payment } from '../../types/payment';

const TransactionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState<Payment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadTransaction(id);
        }
    }, [id]);

    const loadTransaction = async (transactionId: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await paymentService.getPaymentById(transactionId);
            setTransaction(data);
        } catch (err) {
            setError('Failed to load transaction');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !transaction) {
        return (
            <Box>
                <Alert severity="error">{error || 'Transaction not found'}</Alert>
                <Button startIcon={<BackIcon />} onClick={() => navigate('/payments/transactions')} sx={{ mt: 2 }}>
                    Back to Transactions
                </Button>
            </Box>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'success';
            case 'pending':
                return 'warning';
            case 'failed':
                return 'error';
            case 'refunded':
                return 'info';
            default:
                return 'default';
        }
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button startIcon={<BackIcon />} onClick={() => navigate('/payments/transactions')}>
                        Back
                    </Button>
                    <Typography variant="h4">Transaction Details</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" startIcon={<ReceiptIcon />}>
                        View Invoice
                    </Button>
                    <Button variant="outlined" startIcon={<DownloadIcon />}>
                        Download Receipt
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Transaction Information */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Transaction Information
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Transaction ID
                                </Typography>
                                <Typography variant="body1" fontFamily="monospace">
                                    {transaction.transactionId}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Status
                                </Typography>
                                <Chip
                                    label={transaction.status.toUpperCase()}
                                    color={getStatusColor(transaction.status)}
                                    size="small"
                                    sx={{ mt: 0.5 }}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Amount
                                </Typography>
                                <Typography variant="h5" color="primary.main">
                                    ${transaction.amount.toFixed(2)} {transaction.currency}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Payment Method
                                </Typography>
                                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                                    {transaction.paymentMethod.replace('_', ' ')}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 1 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Created
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(transaction.createdAt).toLocaleString()}
                                </Typography>
                            </Box>

                            {transaction.completedAt && (
                                <Box>
                                    <Typography variant="body2" color="textSecondary">
                                        Completed
                                    </Typography>
                                    <Typography variant="body2">
                                        {new Date(transaction.completedAt).toLocaleString()}
                                    </Typography>
                                </Box>
                            )}

                            {transaction.failedAt && (
                                <Box>
                                    <Typography variant="body2" color="textSecondary">
                                        Failed
                                    </Typography>
                                    <Typography variant="body2">
                                        {new Date(transaction.failedAt).toLocaleString()}
                                    </Typography>
                                    {transaction.failureReason && (
                                        <Alert severity="error" sx={{ mt: 1 }}>
                                            {transaction.failureReason}
                                        </Alert>
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Customer Information */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Customer Information
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Name
                                </Typography>
                                <Typography variant="body1">{transaction.userName}</Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Email
                                </Typography>
                                <Typography variant="body1">{transaction.userEmail}</Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    User ID
                                </Typography>
                                <Typography variant="body1" fontFamily="monospace">
                                    {transaction.userId}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Product Information */}
                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Product Information
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Plan
                                </Typography>
                                <Typography variant="body1">{transaction.planName}</Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Plan ID
                                </Typography>
                                <Typography variant="body1" fontFamily="monospace">
                                    {transaction.planId}
                                </Typography>
                            </Box>

                            {transaction.esimId && (
                                <Box>
                                    <Typography variant="body2" color="textSecondary">
                                        eSIM ID
                                    </Typography>
                                    <Typography variant="body1" fontFamily="monospace">
                                        {transaction.esimId}
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Refund Information */}
                {transaction.refundedAt && (
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Refund Information
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" color="textSecondary">
                                            Refund Amount
                                        </Typography>
                                        <Typography variant="h6">
                                            ${transaction.refundAmount?.toFixed(2) || '0.00'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" color="textSecondary">
                                            Refund Date
                                        </Typography>
                                        <Typography variant="body1">
                                            {new Date(transaction.refundedAt).toLocaleString()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" color="textSecondary">
                                            Reason
                                        </Typography>
                                        <Typography variant="body1">
                                            {transaction.refundReason || 'N/A'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

                {/* Actions */}
                {transaction.status === 'completed' && !transaction.refundedAt && (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Actions
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Button variant="contained" color="error">
                                Issue Refund
                            </Button>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default TransactionDetails;
