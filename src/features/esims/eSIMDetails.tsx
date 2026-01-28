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
    LinearProgress,
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    QrCode2 as QrCodeIcon,
    Download as DownloadIcon,
} from '@mui/icons-material';
import esimService from '../../services/esimService';
import type { eSIM } from '../../types/esim';

const eSIMDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [esim, setEsim] = useState<eSIM | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadeSIM(id);
        }
    }, [id]);

    const loadeSIM = async (esimId: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await esimService.geteSIMById(esimId);
            setEsim(data);
        } catch (err) {
            setError('Failed to load eSIM details');
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

    if (error || !esim) {
        return (
            <Box>
                <Alert severity="error">{error || 'eSIM not found'}</Alert>
                <Button startIcon={<BackIcon />} onClick={() => navigate('/esims')} sx={{ mt: 2 }}>
                    Back to Inventory
                </Button>
            </Box>
        );
    }

    const dataUsagePercentage = (esim.dataUsed / esim.dataLimit) * 100;

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button startIcon={<BackIcon />} onClick={() => navigate('/esims')}>
                        Back
                    </Button>
                    <Typography variant="h4">eSIM Details</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" startIcon={<QrCodeIcon />}>
                        View QR Code
                    </Button>
                    <Button variant="outlined" startIcon={<DownloadIcon />}>
                        Download Config
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* eSIM Information */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                eSIM Information
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    ICCID
                                </Typography>
                                <Typography variant="body1" fontFamily="monospace">
                                    {esim.iccid}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Status
                                </Typography>
                                <Chip
                                    label={esim.status.toUpperCase()}
                                    color={
                                        esim.status === 'active'
                                            ? 'success'
                                            : esim.status === 'suspended'
                                                ? 'error'
                                                : 'default'
                                    }
                                    size="small"
                                    sx={{ mt: 0.5 }}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Plan
                                </Typography>
                                <Typography variant="body1">{esim.planName}</Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Region
                                </Typography>
                                <Typography variant="body1">{esim.region}</Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    User
                                </Typography>
                                <Typography variant="body1">{esim.userName}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {esim.userEmail}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 1 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Activated
                                </Typography>
                                <Typography variant="body2">
                                    {esim.activatedAt ? new Date(esim.activatedAt).toLocaleString() : 'Not activated'}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    Expires
                                </Typography>
                                <Typography variant="body2">
                                    {esim.expiresAt ? new Date(esim.expiresAt).toLocaleString() : 'No expiration'}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Data Usage */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Data Usage
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        Used
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {(esim.dataUsed / 1024).toFixed(2)} GB / {(esim.dataLimit / 1024).toFixed(2)} GB
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={Math.min(dataUsagePercentage, 100)}
                                    sx={{ height: 10, borderRadius: 5 }}
                                    color={dataUsagePercentage > 90 ? 'error' : dataUsagePercentage > 70 ? 'warning' : 'primary'}
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                    {dataUsagePercentage.toFixed(1)}% used
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                        <Typography variant="body2" color="textSecondary">
                                            Data Used
                                        </Typography>
                                        <Typography variant="h6">{(esim.dataUsed / 1024).toFixed(2)} GB</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                        <Typography variant="body2" color="textSecondary">
                                            Remaining
                                        </Typography>
                                        <Typography variant="h6">
                                            {((esim.dataLimit - esim.dataUsed) / 1024).toFixed(2)} GB
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* QR Code Card */}
                    <Card sx={{ mt: 3 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Activation QR Code
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Box
                                sx={{
                                    width: 200,
                                    height: 200,
                                    bgcolor: 'grey.100',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    borderRadius: 2,
                                }}
                            >
                                <QrCodeIcon sx={{ fontSize: 80, color: 'grey.400' }} />
                            </Box>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                                Scan to activate eSIM
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default eSIMDetails;
