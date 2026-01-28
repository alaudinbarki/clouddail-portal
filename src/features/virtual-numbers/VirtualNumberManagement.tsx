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
    InputAdornment,
} from '@mui/material';
import {
    Add as AddIcon,
    Phone as PhoneIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
} from '@mui/icons-material';

const VirtualNumberManagement: React.FC = () => {
    const [numbers, setNumbers] = useState([
        {
            id: '1',
            phoneNumber: '+1 (555) 123-4567',
            provider: 'twilio',
            country: 'USA',
            type: 'local',
            capabilities: ['voice', 'sms'],
            status: 'active',
            userName: 'John Doe',
            monthlyCost: 1.0,
            sellingPrice: 2.5,
            purchasedAt: '2024-01-15',
        },
        {
            id: '2',
            phoneNumber: '+44 20 7123 4567',
            provider: 'telnyx',
            country: 'UK',
            type: 'local',
            capabilities: ['voice', 'sms', 'mms'],
            status: 'active',
            userName: 'Jane Smith',
            monthlyCost: 1.5,
            sellingPrice: 3.0,
            purchasedAt: '2024-02-01',
        },
        {
            id: '3',
            phoneNumber: '+1 (800) 555-9999',
            provider: 'twilio',
            country: 'USA',
            type: 'toll_free',
            capabilities: ['voice', 'sms'],
            status: 'active',
            monthlyCost: 2.0,
            sellingPrice: 5.0,
            purchasedAt: '2024-01-20',
        },
        {
            id: '4',
            phoneNumber: '+92 300 1234567',
            provider: 'telnyx',
            country: 'Pakistan',
            type: 'mobile',
            capabilities: ['sms'],
            status: 'available',
            monthlyCost: 0.5,
            sellingPrice: 1.5,
            purchasedAt: '2024-03-01',
        },
    ]);

    const [openDialog, setOpenDialog] = useState(false);

    const stats = {
        totalNumbers: 150,
        activeNumbers: 125,
        availableNumbers: 25,
        monthlyCost: 187.5,
        monthlyRevenue: 468.75,
        profit: 281.25,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'available':
                return 'info';
            case 'inactive':
                return 'error';
            case 'suspended':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'toll_free':
                return 'success';
            case 'mobile':
                return 'primary';
            case 'local':
                return 'default';
            default:
                return 'default';
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Virtual Number Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
                    Purchase Number
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Numbers
                            </Typography>
                            <Typography variant="h4">{stats.totalNumbers}</Typography>
                            <Typography variant="caption" color="success.main">
                                {stats.activeNumbers} Active
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Available
                            </Typography>
                            <Typography variant="h4">{stats.availableNumbers}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Ready to assign
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Monthly Revenue
                            </Typography>
                            <Typography variant="h4">${stats.monthlyRevenue.toFixed(2)}</Typography>
                            <Typography variant="caption" color="success.main">
                                Profit: ${stats.profit.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Monthly Cost
                            </Typography>
                            <Typography variant="h4">${stats.monthlyCost.toFixed(2)}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Provider fees
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Search */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            placeholder="Search by number..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField fullWidth select label="Provider" defaultValue="all">
                            <MenuItem value="all">All Providers</MenuItem>
                            <MenuItem value="twilio">Twilio</MenuItem>
                            <MenuItem value="telnyx">Telnyx</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField fullWidth select label="Type" defaultValue="all">
                            <MenuItem value="all">All Types</MenuItem>
                            <MenuItem value="local">Local</MenuItem>
                            <MenuItem value="mobile">Mobile</MenuItem>
                            <MenuItem value="toll_free">Toll Free</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField fullWidth select label="Status" defaultValue="all">
                            <MenuItem value="all">All Status</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="available">Available</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </Paper>

            {/* Numbers Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Provider</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Capabilities</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Assigned To</TableCell>
                                <TableCell align="right">Cost</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {numbers.map((number) => (
                                <TableRow key={number.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PhoneIcon fontSize="small" color="primary" />
                                            <Typography variant="body2" fontFamily="monospace" fontWeight="bold">
                                                {number.phoneNumber}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={number.provider.toUpperCase()} size="small" variant="outlined" />
                                    </TableCell>
                                    <TableCell>{number.country}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={number.type.replace('_', ' ').toUpperCase()}
                                            color={getTypeColor(number.type)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                            {number.capabilities.map((cap) => (
                                                <Chip key={cap} label={cap.toUpperCase()} size="small" variant="outlined" />
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={number.status.toUpperCase()}
                                            color={getStatusColor(number.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {number.userName ? (
                                            <Typography variant="caption">{number.userName}</Typography>
                                        ) : (
                                            <Typography variant="caption" color="text.secondary">
                                                Unassigned
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">${number.monthlyCost.toFixed(2)}/mo</TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2" fontWeight="bold" color="primary.main">
                                            ${number.sellingPrice.toFixed(2)}/mo
                                        </Typography>
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

            {/* Purchase Number Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Purchase Virtual Number</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField fullWidth select label="Provider">
                                <MenuItem value="twilio">Twilio</MenuItem>
                                <MenuItem value="telnyx">Telnyx</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth select label="Country">
                                <MenuItem value="us">United States</MenuItem>
                                <MenuItem value="uk">United Kingdom</MenuItem>
                                <MenuItem value="pk">Pakistan</MenuItem>
                                <MenuItem value="ca">Canada</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth select label="Number Type">
                                <MenuItem value="local">Local</MenuItem>
                                <MenuItem value="mobile">Mobile</MenuItem>
                                <MenuItem value="toll_free">Toll Free</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Area Code (Optional)"
                                placeholder="e.g., 555"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Monthly Cost"
                                type="number"
                                defaultValue={1.0}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Selling Price"
                                type="number"
                                defaultValue={2.5}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenDialog(false)}>
                        Purchase Number
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default VirtualNumberManagement;
