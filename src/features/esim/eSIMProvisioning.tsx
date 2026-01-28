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
} from '@mui/material';
import { ArrowBack as BackIcon, QrCode as QrCodeIcon } from '@mui/icons-material';
import esimService from '../../services/esimService';

const eSIMProvisioning: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        userId: '',
        planId: '',
        region: '',
    });

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            await esimService.provisioneSIM({
                userId: formData.userId,
                planId: formData.planId,
                region: formData.region,
            });

            setSuccess(true);
            setTimeout(() => {
                navigate('/esims');
            }, 2000);
        } catch (err) {
            setError('Failed to provision eSIM');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button startIcon={<BackIcon />} onClick={() => navigate('/esims')}>
                    Back
                </Button>
                <Typography variant="h4">Provision New eSIM</Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            eSIM Details
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                eSIM provisioned successfully! Redirecting...
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="User ID"
                                        value={formData.userId}
                                        onChange={(e) => handleChange('userId', e.target.value)}
                                        required
                                        helperText="Enter the user ID to assign this eSIM"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Plan</InputLabel>
                                        <Select
                                            value={formData.planId}
                                            label="Plan"
                                            onChange={(e) => handleChange('planId', e.target.value)}
                                        >
                                            <MenuItem value="plan-1">Standard 5GB - $29.99</MenuItem>
                                            <MenuItem value="plan-2">Premium 10GB - $49.99</MenuItem>
                                            <MenuItem value="plan-3">Business 20GB - $89.99</MenuItem>
                                            <MenuItem value="plan-4">Enterprise 50GB - $199.99</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Region</InputLabel>
                                        <Select
                                            value={formData.region}
                                            label="Region"
                                            onChange={(e) => handleChange('region', e.target.value)}
                                        >
                                            <MenuItem value="North America">North America</MenuItem>
                                            <MenuItem value="Europe">Europe</MenuItem>
                                            <MenuItem value="Asia">Asia</MenuItem>
                                            <MenuItem value="Global">Global</MenuItem>
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
                                        startIcon={<QrCodeIcon />}
                                    >
                                        {loading ? 'Provisioning...' : 'Provision eSIM'}
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
                                Provisioning Info
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Provisioning a new eSIM will:
                            </Typography>
                            <ul style={{ marginTop: 0, paddingLeft: 20 }}>
                                <li>
                                    <Typography variant="body2">Generate a unique ICCID</Typography>
                                </li>
                                <li>
                                    <Typography variant="body2">Create QR code for activation</Typography>
                                </li>
                                <li>
                                    <Typography variant="body2">Assign to selected user</Typography>
                                </li>
                                <li>
                                    <Typography variant="body2">Send activation email</Typography>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default eSIMProvisioning;
