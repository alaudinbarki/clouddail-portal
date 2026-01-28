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
    MenuItem,
    Chip,
    InputAdornment,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Save as SaveIcon,
} from '@mui/icons-material';

const PricingMarkupManagement: React.FC = () => {
    const [pricingRules, setPricingRules] = useState([
        {
            id: '1',
            providerName: 'Airhub',
            region: 'Global',
            basePricePerGB: 5.0,
            markupPercentage: 40,
            sellingPricePerGB: 7.0,
            active: true,
        },
        {
            id: '2',
            providerName: '1Global',
            region: 'Europe',
            basePricePerGB: 4.5,
            markupPercentage: 45,
            sellingPricePerGB: 6.53,
            active: true,
        },
        {
            id: '3',
            providerName: 'Telna',
            region: 'Asia',
            basePricePerGB: 6.0,
            markupPercentage: 35,
            sellingPricePerGB: 8.1,
            active: true,
        },
        {
            id: '4',
            providerName: 'Twilio',
            region: 'USA',
            basePricePerGB: 0.05,
            markupPercentage: 100,
            sellingPricePerGB: 0.1,
            active: true,
            type: 'SMS',
        },
        {
            id: '5',
            providerName: 'Telnyx',
            region: 'Global',
            basePricePerGB: 0.004,
            markupPercentage: 150,
            sellingPricePerGB: 0.01,
            active: true,
            type: 'Voice/Min',
        },
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingRule, setEditingRule] = useState<any>(null);

    const handleEditRule = (rule: any) => {
        setEditingRule(rule);
        setOpenDialog(true);
    };

    const calculateSellingPrice = (basePrice: number, markup: number) => {
        return (basePrice * (1 + markup / 100)).toFixed(2);
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Pricing & Markup Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
                    Add Pricing Rule
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Active Rules
                            </Typography>
                            <Typography variant="h4">{pricingRules.filter((r) => r.active).length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Avg Markup
                            </Typography>
                            <Typography variant="h4">
                                {(
                                    pricingRules.reduce((sum, r) => sum + r.markupPercentage, 0) / pricingRules.length
                                ).toFixed(1)}
                                %
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Providers
                            </Typography>
                            <Typography variant="h4">
                                {new Set(pricingRules.map((r) => r.providerName)).size}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Regions Covered
                            </Typography>
                            <Typography variant="h4">
                                {new Set(pricingRules.map((r) => r.region)).size}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Pricing Rules Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Provider</TableCell>
                                <TableCell>Region</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell align="right">Base Price</TableCell>
                                <TableCell align="right">Markup %</TableCell>
                                <TableCell align="right">Selling Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pricingRules.map((rule) => (
                                <TableRow key={rule.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="bold">
                                            {rule.providerName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{rule.region}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={rule.type || 'Data/GB'}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        ${rule.basePricePerGB.toFixed(2)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Chip
                                            label={`${rule.markupPercentage}%`}
                                            color={rule.markupPercentage > 50 ? 'success' : 'warning'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2" fontWeight="bold" color="primary.main">
                                            ${rule.sellingPricePerGB.toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={rule.active ? 'Active' : 'Inactive'}
                                            color={rule.active ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleEditRule(rule)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingRule ? 'Edit Pricing Rule' : 'Add Pricing Rule'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Provider"
                                defaultValue={editingRule?.providerName}
                            >
                                <MenuItem value="Airhub">Airhub</MenuItem>
                                <MenuItem value="1Global">1Global</MenuItem>
                                <MenuItem value="Telna">Telna</MenuItem>
                                <MenuItem value="Twilio">Twilio</MenuItem>
                                <MenuItem value="Telnyx">Telnyx</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Region"
                                defaultValue={editingRule?.region}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Type"
                                defaultValue={editingRule?.type || 'Data/GB'}
                            >
                                <MenuItem value="Data/GB">Data/GB</MenuItem>
                                <MenuItem value="SMS">SMS</MenuItem>
                                <MenuItem value="Voice/Min">Voice/Min</MenuItem>
                                <MenuItem value="Monthly">Monthly</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Base Price"
                                type="number"
                                defaultValue={editingRule?.basePricePerGB}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Markup Percentage"
                                type="number"
                                defaultValue={editingRule?.markupPercentage}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Selling Price (Auto-calculated)"
                                type="number"
                                disabled
                                value={calculateSellingPrice(
                                    editingRule?.basePricePerGB || 0,
                                    editingRule?.markupPercentage || 0
                                )}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" startIcon={<SaveIcon />} onClick={() => setOpenDialog(false)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PricingMarkupManagement;
