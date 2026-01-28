import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Divider,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    Download as DownloadIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FinancialReports: React.FC = () => {
    const [period, setPeriod] = useState('monthly');

    // Mock data
    const revenueData = [
        { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
        { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
        { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
        { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
        { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
        { month: 'Jun', revenue: 67000, expenses: 40000, profit: 27000 },
    ];

    const topProducts = [
        { name: 'Global 5GB Plan', revenue: 45000, sales: 450 },
        { name: 'Europe 10GB Plan', revenue: 38000, sales: 380 },
        { name: 'Asia 3GB Plan', revenue: 28000, sales: 560 },
        { name: 'USA 15GB Plan', revenue: 25000, sales: 167 },
        { name: 'Regional 7GB Plan', revenue: 18000, sales: 257 },
    ];

    const stats = {
        totalRevenue: 328000,
        totalExpenses: 214000,
        netProfit: 114000,
        profitMargin: 34.8,
        revenueGrowth: 12.5,
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Financial Reports</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Period</InputLabel>
                        <Select value={period} label="Period" onChange={(e) => setPeriod(e.target.value)}>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="quarterly">Quarterly</MenuItem>
                            <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" startIcon={<DownloadIcon />}>
                        Export Report
                    </Button>
                </Box>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Revenue
                            </Typography>
                            <Typography variant="h4">${stats.totalRevenue.toLocaleString()}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5 }} />
                                <Typography variant="body2" color="success.main">
                                    +{stats.revenueGrowth}%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Expenses
                            </Typography>
                            <Typography variant="h4">${stats.totalExpenses.toLocaleString()}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TrendingDownIcon sx={{ color: 'error.main', mr: 0.5 }} />
                                <Typography variant="body2" color="error.main">
                                    +8.2%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Net Profit
                            </Typography>
                            <Typography variant="h4">${stats.netProfit.toLocaleString()}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5 }} />
                                <Typography variant="body2" color="success.main">
                                    +15.3%
                                </Typography>
                            </Box>
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
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5 }} />
                                <Typography variant="body2" color="success.main">
                                    +2.1%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Revenue Trend */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Revenue & Profit Trend
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#1976d2" strokeWidth={2} />
                        <Line type="monotone" dataKey="profit" stroke="#2e7d32" strokeWidth={2} />
                        <Line type="monotone" dataKey="expenses" stroke="#d32f2f" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>

            {/* Top Products */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Top Performing Products
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topProducts}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#1976d2" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>

            {/* Detailed Table */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Product Revenue Breakdown
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Sales</TableCell>
                                <TableCell align="right">Revenue</TableCell>
                                <TableCell align="right">Avg. Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {topProducts.map((product) => (
                                <TableRow key={product.name} hover>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell align="right">{product.sales}</TableCell>
                                    <TableCell align="right">${product.revenue.toLocaleString()}</TableCell>
                                    <TableCell align="right">${(product.revenue / product.sales).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default FinancialReports;
