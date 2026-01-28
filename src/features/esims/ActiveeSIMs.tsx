import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    TextField,
    MenuItem,
    InputAdornment,
} from '@mui/material';
import { Search as SearchIcon, SignalCellularAlt as SignalIcon } from '@mui/icons-material';

const ActiveeSIMs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRegion, setFilterRegion] = useState('all');

    const activeeSIMs = [
        {
            id: '1',
            iccid: '89012345678901234567',
            userName: 'John Doe',
            userEmail: 'john@example.com',
            planName: 'Global 5GB',
            region: 'Global',
            dataUsed: 2.5,
            dataLimit: 5,
            activatedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: '2',
            iccid: '89012345678901234568',
            userName: 'Jane Smith',
            userEmail: 'jane@example.com',
            planName: 'Europe 10GB',
            region: 'Europe',
            dataUsed: 7.2,
            dataLimit: 10,
            activatedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];

    const stats = {
        totalActive: 1250,
        dataConsumed: 8500, // GB
        avgUsagePereSIM: 6.8, // GB
        expiringIn7Days: 45,
    };

    const getUsagePercentage = (used: number, limit: number) => {
        return ((used / limit) * 100).toFixed(1);
    };

    const getUsageColor = (percentage: number) => {
        if (percentage >= 90) return 'error';
        if (percentage >= 70) return 'warning';
        return 'success';
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Active eSIMs
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Monitor all currently active eSIM connections
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Active
                            </Typography>
                            <Typography variant="h4">{stats.totalActive.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Data Consumed
                            </Typography>
                            <Typography variant="h4">{stats.dataConsumed.toLocaleString()} GB</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Avg Usage/eSIM
                            </Typography>
                            <Typography variant="h4">{stats.avgUsagePereSIM} GB</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Expiring in 7 Days
                            </Typography>
                            <Typography variant="h4" color="warning.main">
                                {stats.expiringIn7Days}
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
                            placeholder="Search by ICCID or user..."
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
                        <TextField
                            fullWidth
                            select
                            label="Region"
                            value={filterRegion}
                            onChange={(e) => setFilterRegion(e.target.value)}
                        >
                            <MenuItem value="all">All Regions</MenuItem>
                            <MenuItem value="global">Global</MenuItem>
                            <MenuItem value="europe">Europe</MenuItem>
                            <MenuItem value="asia">Asia</MenuItem>
                            <MenuItem value="americas">Americas</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </Paper>

            {/* Active eSIMs Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ICCID</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Plan</TableCell>
                                <TableCell>Region</TableCell>
                                <TableCell>Data Usage</TableCell>
                                <TableCell>Activated</TableCell>
                                <TableCell>Expires</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activeeSIMs.map((esim) => {
                                const usagePercentage = parseFloat(getUsagePercentage(esim.dataUsed, esim.dataLimit));
                                return (
                                    <TableRow key={esim.id} hover>
                                        <TableCell>
                                            <Typography variant="body2" fontFamily="monospace" fontSize="0.75rem">
                                                {esim.iccid}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight="bold">
                                                {esim.userName}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {esim.userEmail}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{esim.planName}</TableCell>
                                        <TableCell>
                                            <Chip label={esim.region} size="small" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <SignalIcon fontSize="small" color={getUsageColor(usagePercentage)} />
                                                <Box>
                                                    <Typography variant="body2">
                                                        {esim.dataUsed} / {esim.dataLimit} GB
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {usagePercentage}% used
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption">{new Date(esim.activatedAt).toLocaleDateString()}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption">{new Date(esim.expiresAt).toLocaleDateString()}</Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default ActiveeSIMs;
