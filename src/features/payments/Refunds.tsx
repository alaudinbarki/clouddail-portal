import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { Visibility as ViewIcon, Undo as UndoIcon } from '@mui/icons-material';

const Refunds: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRefund, setSelectedRefund] = useState<any>(null);

    const refunds = [
        {
            id: 'REF-001',
            transactionId: 'TXN-12345',
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            amount: 49.99,
            reason: 'Service not satisfactory',
            status: 'completed',
            requestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            processedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'REF-002',
            transactionId: 'TXN-12346',
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            amount: 99.99,
            reason: 'Duplicate charge',
            status: 'pending',
            requestedAt: new Date().toISOString(),
        },
        {
            id: 'REF-003',
            transactionId: 'TXN-12347',
            customerName: 'Bob Johnson',
            customerEmail: 'bob@example.com',
            amount: 29.99,
            reason: 'Changed mind',
            status: 'rejected',
            requestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            processedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            rejectionReason: 'Outside refund window',
        },
    ];

    const stats = {
        totalRefunds: 85,
        pendingRefunds: 12,
        completedRefunds: 68,
        rejectedRefunds: 5,
        totalAmount: 4250.5,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'success';
            case 'pending':
                return 'warning';
            case 'rejected':
                return 'error';
            default:
                return 'default';
        }
    };

    const handleViewRefund = (refund: any) => {
        setSelectedRefund(refund);
        setOpenDialog(true);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Refunds
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Manage refund requests and processing
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Refunds
                            </Typography>
                            <Typography variant="h4">{stats.totalRefunds}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Pending
                            </Typography>
                            <Typography variant="h4" color="warning.main">
                                {stats.pendingRefunds}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Completed
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.completedRefunds}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Amount
                            </Typography>
                            <Typography variant="h4">${stats.totalAmount.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Refunds Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Refund ID</TableCell>
                                <TableCell>Transaction</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell>Reason</TableCell>
                                <TableCell>Requested</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {refunds.map((refund) => (
                                <TableRow key={refund.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="bold">
                                            {refund.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" fontFamily="monospace">
                                            {refund.transactionId}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{refund.customerName}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {refund.customerEmail}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2" fontWeight="bold" color="error.main">
                                            -${refund.amount.toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">{refund.reason}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">{new Date(refund.requestedAt).toLocaleDateString()}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={refund.status.toUpperCase()} color={getStatusColor(refund.status)} size="small" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleViewRefund(refund)} title="View Details">
                                            <ViewIcon />
                                        </IconButton>
                                        {refund.status === 'pending' && (
                                            <IconButton size="small" color="primary" title="Process Refund">
                                                <UndoIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* View Refund Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Refund Details</DialogTitle>
                <DialogContent>
                    {selectedRefund && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Refund ID:</Typography>
                                <Typography variant="body2">{selectedRefund.id}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Transaction ID:</Typography>
                                <Typography variant="body2">{selectedRefund.transactionId}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Customer:</Typography>
                                <Typography variant="body2">
                                    {selectedRefund.customerName} ({selectedRefund.customerEmail})
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Amount:</Typography>
                                <Typography variant="h6" color="error.main">
                                    ${selectedRefund.amount.toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Reason:</Typography>
                                <Typography variant="body2">{selectedRefund.reason}</Typography>
                            </Grid>
                            {selectedRefund.status === 'pending' && (
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Admin Notes" multiline rows={3} />
                                </Grid>
                            )}
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Close</Button>
                    {selectedRefund?.status === 'pending' && (
                        <>
                            <Button color="error">Reject</Button>
                            <Button variant="contained" color="success">
                                Approve Refund
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Refunds;
