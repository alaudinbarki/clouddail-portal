import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Card,
    CardContent,
    Divider,
    Chip,
} from '@mui/material';
import { ArrowBack as BackIcon, Save as SaveIcon } from '@mui/icons-material';
import pricingService from '../../services/pricingService';

const PlanBuilder: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        dataLimit: '',
        validity: '',
        baseCost: '',
        sellingPrice: '',
        regions: [] as string[],
        status: 'active' as 'active' | 'inactive',
    });

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const calculateMarkup = () => {
        const base = parseFloat(formData.baseCost) || 0;
        const selling = parseFloat(formData.sellingPrice) || 0;
        if (base === 0) return 0;
        return ((selling - base) / base) * 100;
    };

    const calculateProfit = () => {
        const base = parseFloat(formData.baseCost) || 0;
        const selling = parseFloat(formData.sellingPrice) || 0;
        return selling - base;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            await pricingService.createPlan({
                name: formData.name,
                description: formData.description,
                dataLimit: parseInt(formData.dataLimit),
                validity: parseInt(formData.validity),
                baseCost: parseFloat(formData.baseCost),
                sellingPrice: parseFloat(formData.sellingPrice),
                regions: formData.regions,
                status: formData.status,
            });

            setSuccess(true);
            setTimeout(() => {
                navigate('/plans');
            }, 2000);
        } catch (err) {
            setError('Failed to create plan');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const markup = calculateMarkup();
    const profit = calculateProfit();

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button startIcon={<BackIcon />} onClick={() => navigate('/plans')}>
                    Back
                </Button>
                <Typography variant="h4">Create New Plan</Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Plan Details
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Plan created successfully! Redirecting...
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Plan Name"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        value={formData.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        multiline
                                        rows={3}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Data Limit (MB)"
                                        type="number"
                                        value={formData.dataLimit}
                                        onChange={(e) => handleChange('dataLimit', e.target.value)}
                                        required
                                        helperText={`${(parseFloat(formData.dataLimit) / 1024 || 0).toFixed(2)} GB`}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Validity (Days)"
                                        type="number"
                                        value={formData.validity}
                                        onChange={(e) => handleChange('validity', e.target.value)}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Base Cost ($)"
                                        type="number"
                                        value={formData.baseCost}
                                        onChange={(e) => handleChange('baseCost', e.target.value)}
                                        required
                                        inputProps={{ step: '0.01' }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Selling Price ($)"
                                        type="number"
                                        value={formData.sellingPrice}
                                        onChange={(e) => handleChange('sellingPrice', e.target.value)}
                                        required
                                        inputProps={{ step: '0.01' }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Regions</InputLabel>
                                        <Select
                                            multiple
                                            value={formData.regions}
                                            label="Regions"
                                            onChange={(e) => handleChange('regions', e.target.value)}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} size="small" />
                                                    ))}
                                                </Box>
                                            )}
                                        >
                                            <MenuItem value="North America">North America</MenuItem>
                                            <MenuItem value="Europe">Europe</MenuItem>
                                            <MenuItem value="Asia">Asia</MenuItem>
                                            <MenuItem value="Global">Global</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            value={formData.status}
                                            label="Status"
                                            onChange={(e) => handleChange('status', e.target.value)}
                                        >
                                            <MenuItem value="active">Active</MenuItem>
                                            <MenuItem value="inactive">Inactive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        disabled={loading}
                                        startIcon={<SaveIcon />}
                                    >
                                        {loading ? 'Creating...' : 'Create Plan'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Pricing Calculator
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Base Cost
                                    </Typography>
                                    <Typography variant="h6">
                                        ${parseFloat(formData.baseCost) || 0}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Selling Price
                                    </Typography>
                                    <Typography variant="h6">
                                        ${parseFloat(formData.sellingPrice) || 0}
                                    </Typography>
                                </Box>

                                <Divider />

                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Markup
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        {markup.toFixed(2)}%
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Profit per Sale
                                    </Typography>
                                    <Typography variant="h6" color="success.main">
                                        ${profit.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PlanBuilder;
