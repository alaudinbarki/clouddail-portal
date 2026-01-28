import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsDashboard: React.FC = () => {
    const [timeRange, setTimeRange] = useState('6months');

    const userGrowthData = [
        { month: 'Jul', users: 120, active: 95 },
        { month: 'Aug', users: 145, active: 118 },
        { month: 'Sep', users: 168, active: 142 },
        { month: 'Oct', users: 195, active: 165 },
        { month: 'Nov', users: 225, active: 192 },
        { month: 'Dec', users: 258, active: 220 },
    ];

    const revenueData = [
        { month: 'Jul', revenue: 45000, profit: 28000 },
        { month: 'Aug', revenue: 52000, profit: 33000 },
        { month: 'Sep', revenue: 48000, profit: 30000 },
        { month: 'Oct', revenue: 61000, profit: 39000 },
        { month: 'Nov', revenue: 55000, profit: 35000 },
        { month: 'Dec', revenue: 67000, profit: 43000 },
    ];

    const esimUsageData = [
        { region: 'North America', active: 85, inactive: 15 },
        { region: 'Europe', active: 72, inactive: 28 },
        { region: 'Asia', active: 68, inactive: 32 },
        { region: 'Global', active: 45, inactive: 55 },
    ];

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Analytics Dashboard</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Time Range</InputLabel>
                        <Select
                            value={timeRange}
                            label="Time Range"
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <MenuItem value="1month">Last Month</MenuItem>
                            <MenuItem value="3months">Last 3 Months</MenuItem>
                            <MenuItem value="6months">Last 6 Months</MenuItem>
                            <MenuItem value="1year">Last Year</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" startIcon={<DownloadIcon />}>
                        Export Report
                    </Button>
                </Box>
            </Box>

            {/* Key Metrics */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Users
                            </Typography>
                            <Typography variant="h4">258</Typography>
                            <Typography variant="body2" color="success.main">
                                +14.7% from last month
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
                            <Typography variant="h4">187</Typography>
                            <Typography variant="body2" color="success.main">
                                +8.2% from last month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Monthly Revenue
                            </Typography>
                            <Typography variant="h4">$67K</Typography>
                            <Typography variant="body2" color="success.main">
                                +21.8% from last month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Avg. Revenue/User
                            </Typography>
                            <Typography variant="h4">$259</Typography>
                            <Typography variant="body2" color="success.main">
                                +6.1% from last month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            User Growth Trend
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#8884d8" name="Total Users" />
                                <Line type="monotone" dataKey="active" stroke="#82ca9d" name="Active Users" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Revenue & Profit Trend
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                                <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            eSIM Usage by Region
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={esimUsageData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="region" type="category" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="active" fill="#82ca9d" name="Active" stackId="a" />
                                <Bar dataKey="inactive" fill="#8884d8" name="Inactive" stackId="a" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AnalyticsDashboard;
