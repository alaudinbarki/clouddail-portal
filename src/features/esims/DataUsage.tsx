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
    LinearProgress,
    Chip,
    TextField,
    MenuItem,
} from '@mui/material';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DataUsage: React.FC = () => {
    const [period, setPeriod] = useState('week');

    const usageData = [
        { date: 'Mon', usage: 450 },
        { date: 'Tue', usage: 520 },
        { date: 'Wed', usage: 480 },
        { date: 'Thu', usage: 610 },
        { date: 'Fri', usage: 590 },
        { date: 'Sat', usage: 420 },
        { date: 'Sun', usage: 380 },
    ];

    const topUsers = [
        { name: 'John Doe', usage: 45.2, limit: 50, plan: 'Global 50GB' },
        { name: 'Jane Smith', usage: 38.5, limit: 50, plan: 'Europe 50GB' },
        { name: 'Bob Johnson', usage: 28.9, limit: 30, plan: 'Asia 30GB' },
    ];

    const stats = {
        totalUsage: 8500, // GB
        avgDaily: 280, // GB
        peakUsage: 610, // GB
        trend: 12.5, // percentage
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Data Usage Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Monitor and analyze eSIM data consumption
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Usage
                            </Typography>
                            <Typography variant="h4">{stats.totalUsage.toLocaleString()} GB</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TrendingUpIcon fontSize="small" color="success" />
                                <Typography variant="caption" color="success.main" sx={{ ml: 0.5 }}>
                                    +{stats.trend}% vs last period
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Avg Daily Usage
                            </Typography>
                            <Typography variant="h4">{stats.avgDaily} GB</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Peak Usage
                            </Typography>
                            <Typography variant="h4">{stats.peakUsage} GB</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Thursday
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Active eSIMs
                            </Typography>
                            <Typography variant="h4">1,250</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Usage Chart */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">Usage Trend</Typography>
                            <TextField select value={period} onChange={(e) => setPeriod(e.target.value)} size="small" sx={{ minWidth: 120 }}>
                                <MenuItem value="week">This Week</MenuItem>
                                <MenuItem value="month">This Month</MenuItem>
                                <MenuItem value="year">This Year</MenuItem>
                            </TextField>
                        </Box>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={usageData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="usage" stroke="#8884d8" strokeWidth={2} name="Usage (GB)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Top Users
                        </Typography>
                        {topUsers.map((user, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {user.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {user.usage} / {user.limit} GB
                                    </Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={(user.usage / user.limit) * 100} sx={{ mb: 0.5 }} />
                                <Typography variant="caption" color="text.secondary">
                                    {user.plan}
                                </Typography>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DataUsage;
