import React from 'react';
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
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CostManagement: React.FC = () => {
    const costData = [
        { month: 'Jan', cost: 12000, revenue: 45000 },
        { month: 'Feb', cost: 13500, revenue: 52000 },
        { month: 'Mar', cost: 12800, revenue: 48000 },
        { month: 'Apr', cost: 15200, revenue: 61000 },
        { month: 'May', cost: 14100, revenue: 55000 },
        { month: 'Jun', cost: 16800, revenue: 67000 },
    ];

    const providerCosts = [
        { provider: 'Airhub', monthlyCost: 5200, dataVolume: 2500, costPerGB: 2.08 },
        { provider: '1Global', monthlyCost: 4800, dataVolume: 2000, costPerGB: 2.4 },
        { provider: 'Telna', monthlyCost: 3600, dataVolume: 1500, costPerGB: 2.4 },
        { provider: 'Twilio', monthlyCost: 2200, dataVolume: 0, costPerGB: 0 },
    ];

    const stats = {
        totalCosts: 84000,
        avgMonthlyCost: 14000,
        profitMargin: 72.5,
        costTrend: -3.2,
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Cost Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Track and analyze provider costs and margins
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Costs
                            </Typography>
                            <Typography variant="h4">${stats.totalCosts.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Avg Monthly Cost
                            </Typography>
                            <Typography variant="h4">${stats.avgMonthlyCost.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Profit Margin
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.profitMargin}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Cost Trend
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TrendingDown color="success" />
                                <Typography variant="h4" color="success.main" sx={{ ml: 1 }}>
                                    {Math.abs(stats.costTrend)}%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Cost Trend Chart */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Cost vs Revenue Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={costData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="cost" stroke="#ff7300" strokeWidth={2} name="Cost ($)" />
                        <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} name="Revenue ($)" />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>

            {/* Provider Costs Table */}
            <Paper>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Provider Cost Breakdown
                    </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Provider</TableCell>
                                <TableCell align="right">Monthly Cost</TableCell>
                                <TableCell align="right">Data Volume (GB)</TableCell>
                                <TableCell align="right">Cost per GB</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {providerCosts.map((provider) => (
                                <TableRow key={provider.provider} hover>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="bold">
                                            {provider.provider}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2">${provider.monthlyCost.toLocaleString()}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2">{provider.dataVolume.toLocaleString()} GB</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2">${provider.costPerGB.toFixed(2)}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default CostManagement;
