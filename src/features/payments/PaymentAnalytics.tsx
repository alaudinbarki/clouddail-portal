import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
} from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PaymentAnalytics: React.FC = () => {
    const paymentMethodData = [
        { name: 'Credit Card', value: 45 },
        { name: 'Stripe', value: 30 },
        { name: 'Local Bank', value: 15 },
        { name: 'Wallet', value: 10 },
    ];

    const revenueData = [
        { month: 'Jan', revenue: 45000, transactions: 450 },
        { month: 'Feb', revenue: 52000, transactions: 520 },
        { month: 'Mar', revenue: 48000, transactions: 480 },
        { month: 'Apr', revenue: 61000, transactions: 610 },
        { month: 'May', revenue: 55000, transactions: 550 },
        { month: 'Jun', revenue: 67000, transactions: 670 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const stats = {
        totalRevenue: 328000,
        avgTransactionValue: 100,
        successRate: 98.5,
        totalTransactions: 3280,
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Payment Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Comprehensive payment insights and trends
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Revenue
                            </Typography>
                            <Typography variant="h4">${stats.totalRevenue.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Avg Transaction
                            </Typography>
                            <Typography variant="h4">${stats.avgTransactionValue}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Success Rate
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.successRate}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Transactions
                            </Typography>
                            <Typography variant="h4">{stats.totalTransactions.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Revenue Trend
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} name="Revenue ($)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Payment Methods
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={paymentMethodData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name} ${entry.value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                                    {paymentMethodData.map((entry, index) => (
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
                            Transaction Volume
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="transactions" fill="#82ca9d" name="Transactions" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PaymentAnalytics;
