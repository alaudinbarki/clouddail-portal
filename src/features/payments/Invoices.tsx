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
    TextField,
    MenuItem,
    InputAdornment,
} from '@mui/material';
import {
    Download as DownloadIcon,
    Email as EmailIcon,
    Visibility as ViewIcon,
    Search as SearchIcon,
} from '@mui/icons-material';

const Invoices: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const invoices = [
        {
            id: 'INV-001',
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            amount: 49.99,
            status: 'paid',
            issuedDate: new Date().toISOString(),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            items: 'Global 5GB Plan',
        },
        {
            id: 'INV-002',
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            amount: 99.99,
            status: 'pending',
            issuedDate: new Date().toISOString(),
            dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            items: 'Europe 10GB Plan',
        },
        {
            id: 'INV-003',
            customerName: 'Bob Johnson',
            customerEmail: 'bob@example.com',
            amount: 29.99,
            status: 'overdue',
            issuedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            items: 'Asia 3GB Plan',
        },
    ];

    const stats = {
        totalInvoices: 1250,
        paidInvoices: 1100,
        pendingInvoices: 120,
        overdueInvoices: 30,
        totalRevenue: 125000,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'success';
            case 'pending':
                return 'warning';
            case 'overdue':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Invoices
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Manage customer invoices and billing
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Invoices
                            </Typography>
                            <Typography variant="h4">{stats.totalInvoices.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Paid
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.paidInvoices.toLocaleString()}
                            </Typography>
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
                                {stats.pendingInvoices}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Overdue
                            </Typography>
                            <Typography variant="h4" color="error.main">
                                {stats.overdueInvoices}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filters */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            placeholder="Search invoices..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField fullWidth select label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <MenuItem value="all">All Status</MenuItem>
                            <MenuItem value="paid">Paid</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="overdue">Overdue</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button fullWidth variant="contained">
                            Generate Invoice
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Invoices Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Invoice #</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Items</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell>Issued</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="bold">
                                            {invoice.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{invoice.customerName}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {invoice.customerEmail}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">{invoice.items}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2" fontWeight="bold">
                                            ${invoice.amount.toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">{new Date(invoice.issuedDate).toLocaleDateString()}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">{new Date(invoice.dueDate).toLocaleDateString()}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={invoice.status.toUpperCase()} color={getStatusColor(invoice.status)} size="small" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" title="View">
                                            <ViewIcon />
                                        </IconButton>
                                        <IconButton size="small" title="Download">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton size="small" title="Email">
                                            <EmailIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default Invoices;
