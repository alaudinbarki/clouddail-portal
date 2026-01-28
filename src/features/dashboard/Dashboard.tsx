import React from 'react';
import {
    Grid2 as Grid,
    Card,
    CardContent,
    Typography,
    Box,
    LinearProgress,
} from '@mui/material';
import {
    TrendingUpOutlined,
    PeopleOutlined,
    SimCardOutlined,
    PaymentOutlined,
    ArrowUpwardOutlined,
    ArrowDownwardOutlined,
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
} from 'recharts';
import { CHART_COLORS } from '../../config/constants';

// Mock data
const revenueData = [
    { name: 'Jan', revenue: 4000, cost: 2400, profit: 1600 },
    { name: 'Feb', revenue: 3000, cost: 1398, profit: 1602 },
    { name: 'Mar', revenue: 2000, cost: 9800, profit: -7800 },
    { name: 'Apr', revenue: 2780, cost: 3908, profit: -1128 },
    { name: 'May', revenue: 1890, cost: 4800, profit: -2910 },
    { name: 'Jun', revenue: 2390, cost: 3800, profit: -1410 },
    { name: 'Jul', revenue: 3490, cost: 4300, profit: -810 },
];

const salesData = [
    { name: 'Mon', sales: 12 },
    { name: 'Tue', sales: 19 },
    { name: 'Wed', sales: 15 },
    { name: 'Thu', sales: 25 },
    { name: 'Fri', sales: 22 },
    { name: 'Sat', sales: 30 },
    { name: 'Sun', sales: 28 },
];

interface MetricCardProps {
    title: string;
    value: string;
    change: number;
    icon: React.ReactNode;
    color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, color }) => {
    const isPositive = change >= 0;

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                            {value}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {isPositive ? (
                                <ArrowUpwardOutlined sx={{ fontSize: 16, color: 'success.main' }} />
                            ) : (
                                <ArrowDownwardOutlined sx={{ fontSize: 16, color: 'error.main' }} />
                            )}
                            <Typography
                                variant="body2"
                                sx={{ color: isPositive ? 'success.main' : 'error.main', fontWeight: 600 }}
                            >
                                {Math.abs(change)}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                vs last month
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: color + '15',
                            color: color,
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

const Dashboard: React.FC = () => {
    return (
        <Box sx={{ px: { xs: 0, sm: 1, md: 2 } }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Welcome back! Here's what's happening with your eSIM business today.
            </Typography>

            {/* Key Metrics */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Total Revenue"
                        value="$45,231"
                        change={12.5}
                        icon={<TrendingUpOutlined sx={{ fontSize: 28 }} />}
                        color={CHART_COLORS.PRIMARY}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Total Users"
                        value="1,234"
                        change={8.2}
                        icon={<PeopleOutlined sx={{ fontSize: 28 }} />}
                        color={CHART_COLORS.SUCCESS}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Active eSIMs"
                        value="892"
                        change={-3.1}
                        icon={<SimCardOutlined sx={{ fontSize: 28 }} />}
                        color={CHART_COLORS.INFO}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Pending Payments"
                        value="$12,450"
                        change={5.7}
                        icon={<PaymentOutlined sx={{ fontSize: 28 }} />}
                        color={CHART_COLORS.WARNING}
                    />
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                {/* Revenue Chart */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Revenue Overview
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Monthly revenue, cost, and profit trends
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={CHART_COLORS.PRIMARY} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={CHART_COLORS.PRIMARY} stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={CHART_COLORS.ERROR} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={CHART_COLORS.ERROR} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <XAxis dataKey="name" stroke="#6B7280" />
                                    <YAxis stroke="#6B7280" />
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke={CHART_COLORS.PRIMARY}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="cost"
                                        stroke={CHART_COLORS.ERROR}
                                        fillOpacity={1}
                                        fill="url(#colorCost)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sales Chart */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Weekly Sales
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                eSIM sales this week
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <XAxis dataKey="name" stroke="#6B7280" />
                                    <YAxis stroke="#6B7280" />
                                    <Tooltip />
                                    <Bar dataKey="sales" fill={CHART_COLORS.SUCCESS} radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Activity */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Recent Activity
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                {[
                                    { user: 'John Doe', action: 'purchased 5GB plan', time: '2 minutes ago' },
                                    { user: 'Jane Smith', action: 'activated eSIM', time: '15 minutes ago' },
                                    { user: 'Bob Johnson', action: 'requested refund', time: '1 hour ago' },
                                    { user: 'Alice Williams', action: 'purchased 10GB plan', time: '2 hours ago' },
                                ].map((activity, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            py: 1.5,
                                            borderBottom: index < 3 ? '1px solid' : 'none',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body2" fontWeight={500}>
                                                {activity.user}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {activity.action}
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            {activity.time}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Top Plans */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Top Selling Plans
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                {[
                                    { name: '5GB Global', sales: 245, percentage: 85 },
                                    { name: '10GB Europe', sales: 189, percentage: 65 },
                                    { name: '3GB USA', sales: 156, percentage: 54 },
                                    { name: 'Unlimited Asia', sales: 98, percentage: 34 },
                                ].map((plan, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body2" fontWeight={500}>
                                                {plan.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {plan.sales} sales
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={plan.percentage}
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: 'grey.200',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 3,
                                                    backgroundColor: CHART_COLORS.PRIMARY,
                                                },
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
