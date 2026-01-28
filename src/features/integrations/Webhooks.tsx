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
    Switch,
    FormControlLabel,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Webhook as WebhookIcon,
} from '@mui/icons-material';

const Webhooks: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const webhooks = [
        {
            id: '1',
            name: 'Payment Success Webhook',
            url: 'https://yourapp.com/webhooks/payment-success',
            events: ['payment.success', 'payment.completed'],
            status: 'active',
            lastTriggered: new Date().toISOString(),
            successRate: 98.5,
        },
        {
            id: '2',
            name: 'eSIM Activation Webhook',
            url: 'https://yourapp.com/webhooks/esim-activation',
            events: ['esim.activated', 'esim.provisioned'],
            status: 'active',
            lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            successRate: 99.2,
        },
        {
            id: '3',
            name: 'User Registration Webhook',
            url: 'https://yourapp.com/webhooks/user-registered',
            events: ['user.registered', 'user.verified'],
            status: 'inactive',
            lastTriggered: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            successRate: 95.8,
        },
    ];

    const stats = {
        totalWebhooks: 12,
        activeWebhooks: 10,
        totalDeliveries: 15000,
        avgSuccessRate: 97.5,
    };

    const getStatusColor = (status: string) => {
        return status === 'active' ? 'success' : 'default';
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4">Webhooks</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Configure and manage webhook endpoints
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
                    Add Webhook
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Webhooks
                            </Typography>
                            <Typography variant="h4">{stats.totalWebhooks}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Active
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.activeWebhooks}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Deliveries
                            </Typography>
                            <Typography variant="h4">{stats.totalDeliveries.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Avg Success Rate
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.avgSuccessRate}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Webhooks Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>URL</TableCell>
                                <TableCell>Events</TableCell>
                                <TableCell>Success Rate</TableCell>
                                <TableCell>Last Triggered</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {webhooks.map((webhook) => (
                                <TableRow key={webhook.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <WebhookIcon fontSize="small" color="primary" />
                                            <Typography variant="body2" fontWeight="bold">
                                                {webhook.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" fontFamily="monospace">
                                            {webhook.url}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                            {webhook.events.map((event) => (
                                                <Chip key={event} label={event} size="small" variant="outlined" />
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color={webhook.successRate >= 95 ? 'success.main' : 'warning.main'}>
                                            {webhook.successRate}%
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">{new Date(webhook.lastTriggered).toLocaleString()}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={webhook.status.toUpperCase()} color={getStatusColor(webhook.status)} size="small" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Add Webhook Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Webhook</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Webhook Name" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Endpoint URL" placeholder="https://yourapp.com/webhooks/endpoint" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Secret Key" type="password" helperText="Used to verify webhook signatures" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Switch defaultChecked />} label="Active" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenDialog(false)}>
                        Create Webhook
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Webhooks;
