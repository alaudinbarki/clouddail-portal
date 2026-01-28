import React, { useState, useEffect } from 'react';
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
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Switch,
    FormControlLabel,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Sync as SyncIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';

const DataProviderManagement: React.FC = () => {
    const [providers, setProviders] = useState([
        {
            id: '1',
            name: 'Airhub',
            type: 'esim',
            provider: 'airhub',
            status: 'active',
            supportedRegions: ['Global', 'Europe', 'Asia'],
            lastSyncAt: new Date().toISOString(),
        },
        {
            id: '2',
            name: '1Global',
            type: 'esim',
            provider: '1global',
            status: 'active',
            supportedRegions: ['Global', 'Americas'],
            lastSyncAt: new Date().toISOString(),
        },
        {
            id: '3',
            name: 'Telna',
            type: 'esim',
            provider: 'telna',
            status: 'testing',
            supportedRegions: ['Europe', 'Asia'],
            lastSyncAt: new Date().toISOString(),
        },
        {
            id: '4',
            name: 'Twilio',
            type: 'virtual_number',
            provider: 'twilio',
            status: 'active',
            supportedRegions: ['Global'],
            lastSyncAt: new Date().toISOString(),
        },
        {
            id: '5',
            name: 'Telnyx',
            type: 'virtual_number',
            provider: 'telnyx',
            status: 'active',
            supportedRegions: ['Global'],
            lastSyncAt: new Date().toISOString(),
        },
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<any>(null);

    const stats = {
        totalProviders: 5,
        activeProviders: 4,
        totalDataPurchased: 15000, // GB
        totalDataSold: 12000, // GB
        totalRevenue: 180000,
        totalCost: 120000,
        profit: 60000,
        profitMargin: 33.3,
    };

    const handleSync = (providerId: string) => {
        console.log('Syncing provider:', providerId);
        // Implement sync logic
    };

    const handleEditProvider = (provider: any) => {
        setSelectedProvider(provider);
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
                <Typography variant="h4">Data Provider Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
                    Add Provider
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Providers
                            </Typography>
                            <Typography variant="h4">{stats.totalProviders}</Typography>
                            <Typography variant="caption" color="success.main">
                                {stats.activeProviders} Active
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Data Purchased
                            </Typography>
                            <Typography variant="h4">{stats.totalDataPurchased} GB</Typography>
                            <Typography variant="caption" color="text.secondary">
                                From providers
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
                                Profit: ${stats.profit.toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Profit Margin
                            </Typography>
                            <Typography variant="h4">{stats.profitMargin}%</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Average markup
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Providers Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Provider</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Supported Regions</TableCell>
                                <TableCell>Last Sync</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {providers.map((provider) => (
                                <TableRow key={provider.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="bold">
                                            {provider.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {provider.provider}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={provider.type === 'esim' ? 'eSIM Data' : 'Virtual Number'}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={provider.status.toUpperCase()}
                                            color={getStatusColor(provider.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                            {provider.supportedRegions.map((region) => (
                                                <Chip key={region} label={region} size="small" variant="outlined" />
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">
                                            {new Date(provider.lastSyncAt).toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleSync(provider.id)} title="Sync">
                                            <SyncIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditProvider(provider)}
                                            title="Settings"
                                        >
                                            <SettingsIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Add/Edit Provider Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>{selectedProvider ? 'Edit Provider' : 'Add New Provider'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Provider Name"
                                defaultValue={selectedProvider?.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Provider Type"
                                defaultValue={selectedProvider?.type || 'esim'}
                            >
                                <MenuItem value="esim">eSIM Data</MenuItem>
                                <MenuItem value="virtual_number">Virtual Number</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Provider"
                                defaultValue={selectedProvider?.provider}
                            >
                                <MenuItem value="airhub">Airhub</MenuItem>
                                <MenuItem value="1global">1Global</MenuItem>
                                <MenuItem value="telna">Telna</MenuItem>
                                <MenuItem value="twilio">Twilio</MenuItem>
                                <MenuItem value="telnyx">Telnyx</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Status"
                                defaultValue={selectedProvider?.status || 'testing'}
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                                <MenuItem value="testing">Testing</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="API Key" type="password" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="API Secret" type="password" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Webhook URL" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Base URL" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenDialog(false)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DataProviderManagement;
