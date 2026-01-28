import React, { useEffect, useState } from 'react';
import {
    Grid2 as Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    IconButton,
} from '@mui/material';
import {
    TrendingUp,
    AccountBalanceWallet,
    Phone,
    SimCard,
    Refresh,
    ArrowUpward,
    ArrowDownward,
} from '@mui/icons-material';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

// Mock data - will be replaced with real API calls
const mockData = {
    revenue: {
        today: 1250.50,
        week: 8750.25,
        month: 35420.75,
        growth: 12.5,
    },
    profit: {
        today: 625.25,
        week: 4375.13,
        month: 17710.38,
        margin: 50,
    },
    activeServices: {
        numbers: 145,
        esims: 89,
        packages: 34,
        users: 268,
    },
    walletBalance: 5420.50,
    recentTransactions: [
        { id: 1, type: 'Number Purchase', amount: -2.00, user: 'john@example.com', time: '2 min ago' },
        { id: 2, type: 'Wallet Recharge', amount: 50.00, user: 'jane@example.com', time: '15 min ago' },
        { id: 3, type: 'eSIM Purchase', amount: -15.00, user: 'bob@example.com', time: '1 hour ago' },
    ],
    providerCosts: [
        { name: 'Twilio', cost: 1250, revenue: 2500, profit: 1250 },
        { name: 'Telnyx', cost: 980, revenue: 1960, profit: 980 },
        { name: 'Telna', cost: 1500, revenue: 2250, profit: 750 },
    ],
    revenueChart: [
        { month: 'Jan', revenue: 4000, cost: 2400, profit: 1600 },
        { month: 'Feb', revenue: 3000, cost: 1800, profit: 1200 },
        { month: 'Mar', revenue: 5000, cost: 3000, profit: 2000 },
        { month: 'Apr', revenue: 4500, cost: 2700, profit: 1800 },
        { month: 'May', revenue: 6000, cost: 3600, profit: 2400 },
        { month: 'Jun', revenue: 5500, cost: 3300, profit: 2200 },
    ],
    serviceDistribution: [
        { name: 'Virtual Numbers', value: 45, color: '#3b82f6' },
        { name: 'eSIM Data', value: 35, color: '#10b981' },
        { name: 'Packages', value: 20, color: '#f59e0b' },
    ],
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'primary' }: any) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="bold">
                        {value}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <Typography variant="body2" color="text.secondary">
                            {subtitle}
                        </Typography>
                        {trend && (
                            <Chip
                                size="small"
                                icon={trend > 0 ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                                label={`${Math.abs(trend)}%`}
                                color={trend > 0 ? 'success' : 'error'}
                                sx={{ height: 20 }}
                            />
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        bgcolor: `${color}.lighter`,
                        borderRadius: 2,
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon sx={{ color: `${color}.main`, fontSize: 32 }} />
                </Box>
            </Box>
        </CardContent>
    </Card>
);

export default function ResellerDashboard() {
    const [data, setData] = useState(mockData);
    const [loading, setLoading] = useState(false);

    const handleRefresh = async () => {
        setLoading(true);
        // TODO: Fetch real data from API
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <Box>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Reseller Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Track your revenue, profit, and active services
                    </Typography>
                </Box>
                <IconButton onClick={handleRefresh} disabled={loading}>
                    <Refresh />
                </IconButton>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Monthly Revenue"
                        value={`$${data.revenue.month.toLocaleString()}`}
                        subtitle={`$${data.revenue.today.toFixed(2)} today`}
                        icon={TrendingUp}
                        trend={data.revenue.growth}
                        color="primary"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Monthly Profit"
                        value={`$${data.profit.month.toLocaleString()}`}
                        subtitle={`${data.profit.margin}% margin`}
                        icon={AccountBalanceWallet}
                        trend={data.revenue.growth}
                        color="success"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Active Numbers"
                        value={data.activeServices.numbers}
                        subtitle={`${data.activeServices.esims} eSIMs active`}
                        icon={Phone}
                        color="info"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Total Users"
                        value={data.activeServices.users}
                        subtitle={`${data.activeServices.packages} packages`}
                        icon={SimCard}
                        color="warning"
                    />
                </Grid>
            </Grid>

            {/* Charts Row */}
            <Grid container spacing={3} mb={3}>
                {/* Revenue vs Profit Chart */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Revenue vs Profit
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={data.revenueChart}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stackId="1"
                                        stroke="#3b82f6"
                                        fill="#3b82f6"
                                        fillOpacity={0.6}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="cost"
                                        stackId="2"
                                        stroke="#ef4444"
                                        fill="#ef4444"
                                        fillOpacity={0.6}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="profit"
                                        stackId="3"
                                        stroke="#10b981"
                                        fill="#10b981"
                                        fillOpacity={0.6}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Service Distribution */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Service Distribution
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={data.serviceDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.serviceDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Provider Cost Comparison & Recent Transactions */}
            <Grid container spacing={3}>
                {/* Provider Costs */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Provider Cost Comparison
                            </Typography>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={data.providerCosts}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="cost" fill="#ef4444" name="Provider Cost" />
                                    <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                                    <Bar dataKey="profit" fill="#10b981" name="Profit" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Transactions */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Recent Transactions
                            </Typography>
                            <Box>
                                {data.recentTransactions.map((tx) => (
                                    <Box
                                        key={tx.id}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        py={1.5}
                                        borderBottom="1px solid"
                                        borderColor="divider"
                                    >
                                        <Box>
                                            <Typography variant="body2" fontWeight="medium">
                                                {tx.type}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {tx.user} • {tx.time}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            color={tx.amount > 0 ? 'success.main' : 'error.main'}
                                        >
                                            {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
