import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
    CircularProgress,
    Alert,
    Grid,
    Card,
    CardContent,
    Button,
    LinearProgress,
} from '@mui/material';
import {
    Visibility as ViewIcon,
    Add as AddIcon,
    QrCode as QrCodeIcon,
} from '@mui/icons-material';
import eSIMStatusBadge from '../../components/esim/eSIMStatusBadge';
import esimService from '../../services/esimService';
import type { eSIM } from '../../types/esim';

const eSIMInventory: React.FC = () => {
    const navigate = useNavigate();
    const [esims, seteSIMs] = useState<eSIM[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        suspended: 0,
        lowInventory: false,
    });

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        loadeSIMs();
        loadStats();
    }, [page, pageSize]);

    const loadeSIMs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await esimService.geteSIMs({ page, pageSize });
            seteSIMs(response.data);
            setTotal(response.total);
        } catch (err) {
            setError('Failed to load eSIMs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const statsData = await esimService.geteSIMStats();
            setStats(statsData);
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
    };

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1);
    };

    const handleVieweSIM = (esimId: string) => {
        navigate(`/esims/${esimId}`);
    };

    const getDataUsagePercent = (used: number, limit: number) => {
        return (used / limit) * 100;
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">eSIM Inventory</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/esims/provision')}
                >
                    Provision eSIM
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total eSIMs
                            </Typography>
                            <Typography variant="h4">{stats.total}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Active eSIMs
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.active}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Inactive eSIMs
                            </Typography>
                            <Typography variant="h4" color="text.secondary">
                                {stats.inactive}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Suspended eSIMs
                            </Typography>
                            <Typography variant="h4" color="warning.main">
                                {stats.suspended}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Low Inventory Alert */}
            {stats.lowInventory && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    Low inventory alert! Available eSIMs are below 20%.
                </Alert>
            )}

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* eSIMs Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ICCID</TableCell>
                                <TableCell>Plan</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Region</TableCell>
                                <TableCell>Data Usage</TableCell>
                                <TableCell>Provider</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : esims.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography color="textSecondary">No eSIMs found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                esims.map((esim) => {
                                    const usagePercent = getDataUsagePercent(esim.dataUsed, esim.dataLimit);
                                    return (
                                        <TableRow key={esim.id} hover>
                                            <TableCell>
                                                <Typography variant="body2" fontFamily="monospace">
                                                    {esim.iccid.slice(0, 15)}...
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{esim.planName}</TableCell>
                                            <TableCell>
                                                <eSIMStatusBadge status={esim.status} />
                                            </TableCell>
                                            <TableCell>{esim.region}</TableCell>
                                            <TableCell>
                                                <Box sx={{ width: 150 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                        <Typography variant="caption">
                                                            {(esim.dataUsed / 1024).toFixed(2)} GB / {(esim.dataLimit / 1024).toFixed(2)} GB
                                                        </Typography>
                                                        <Typography variant="caption">
                                                            {usagePercent.toFixed(0)}%
                                                        </Typography>
                                                    </Box>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={usagePercent}
                                                        color={usagePercent > 90 ? 'error' : usagePercent > 70 ? 'warning' : 'primary'}
                                                    />
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ textTransform: 'capitalize' }}>{esim.provider}</TableCell>
                                            <TableCell>
                                                {new Date(esim.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="View Details">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleVieweSIM(esim.id)}
                                                    >
                                                        <ViewIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="View QR Code">
                                                    <IconButton size="small">
                                                        <QrCodeIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={total}
                    page={page - 1}
                    onPageChange={handlePageChange}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </Paper>
        </Box>
    );
};

export default eSIMInventory;
