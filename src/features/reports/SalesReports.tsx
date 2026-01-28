import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    TextField,
    MenuItem,
    Button,
} from '@mui/material';
import { Download as DownloadIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SalesReports: React.FC = () => {
    const [period, setPeriod] = useState('month');

    const salesData = [
        { month: 'Jan', sales: 45000, orders: 450 },
        { month: 'Feb', sales: 52000, orders: 520 },
        { month: 'Mar', sales: 48000, orders: 480 },
        { month: 'Apr', sales: 61000, orders: 610 },
        { month: 'May', sales: 55000, orders: 550 },
        { month: 'Jun', sales: 67000, orders: 670 },
    ];

    const productSales = [
        { name: 'Global 5GB', value: 35 },
        { name: 'Europe 10GB', value: 25 },
        { name: 'Asia 3GB', value: 20 },
        { name: 'Americas 7GB', value: 20 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const stats = {
        totalSales: 328000,
        totalOrders: 3280,
        avgOrderValue: 100,
        growth: 15.5,
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4">Sales Reports</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Comprehensive sales analytics and insights
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<DownloadIcon />}>
                    Export Report
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Sales
                            </Typography>
                            <Typography variant="h4">${stats.totalSales.toLocaleString()}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TrendingUpIcon fontSize="small" color="success" />
                                <Typography variant="caption" color="success.main" sx={{ ml: 0.5 }}>
                                    +{stats.growth}% vs last period
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Orders
                            </Typography>
                            <Typography variant="h4">{stats.totalOrders.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Avg Order Value
                            </Typography>
                            <Typography variant="h4">${stats.avgOrderValue}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Growth Rate
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                +{stats.growth}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">Sales Trend</Typography>
                            <TextField select value={period} onChange={(e) => setPeriod(e.target.value)} size="small" sx={{ minWidth: 120 }}>
                                <MenuItem value="week">This Week</MenuItem>
                                <MenuItem value="month">This Month</MenuItem>
                                <MenuItem value="year">This Year</MenuItem>
                            </TextField>
                        </Box>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} name="Sales ($)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Product Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={productSales} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={80} fill="#8884d8" dataKey="value">
                                    {productSales.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Monthly Comparison
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="orders" fill="#8884d8" name="Orders" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SalesReports;
