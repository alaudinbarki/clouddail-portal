import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    Assessment as ReportIcon,
    TrendingUp as TrendIcon,
    Download as DownloadIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';

const ReportsHub: React.FC = () => {
    const reportCategories = [
        {
            title: 'Financial Reports',
            description: 'Revenue, profit & loss, tax reports',
            icon: <ReportIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            path: '/reports/financial',
            count: 12,
        },
        {
            title: 'User Analytics',
            description: 'User growth, retention, engagement',
            icon: <TrendIcon sx={{ fontSize: 40, color: 'success.main' }} />,
            path: '/analytics',
            count: 8,
        },
        {
            title: 'Transaction Logs',
            description: 'Payment history and reconciliation',
            icon: <ReportIcon sx={{ fontSize: 40, color: 'info.main' }} />,
            path: '/reports/transactions',
            count: 15,
        },
    ];

    const recentReports = [
        { name: 'Monthly Revenue Report - November 2024', date: '2024-12-01', type: 'Financial' },
        { name: 'User Growth Analysis - Q4 2024', date: '2024-11-28', type: 'Analytics' },
        { name: 'Tax Report - November 2024', date: '2024-11-25', type: 'Financial' },
        { name: 'Payment Reconciliation - Week 48', date: '2024-11-22', type: 'Transaction' },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Reports Hub
            </Typography>

            {/* Report Categories */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {reportCategories.map((category) => (
                    <Grid item xs={12} md={4} key={category.title}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    {category.icon}
                                    <Chip label={`${category.count} reports`} size="small" />
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    {category.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {category.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" href={category.path}>
                                    View Reports
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                {/* Recent Reports */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Reports
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            {recentReports.map((report, index) => (
                                <React.Fragment key={index}>
                                    <ListItem
                                        secondaryAction={
                                            <Button size="small" startIcon={<DownloadIcon />}>
                                                Download
                                            </Button>
                                        }
                                    >
                                        <ListItemText
                                            primary={report.name}
                                            secondary={
                                                <>
                                                    <Chip label={report.type} size="small" sx={{ mr: 1 }} />
                                                    {new Date(report.date).toLocaleDateString()}
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    {index < recentReports.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Scheduled Reports */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Scheduled Reports
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Monthly Financial Summary"
                                    secondary="Runs on 1st of every month"
                                />
                                <ScheduleIcon color="action" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText
                                    primary="Weekly Transaction Report"
                                    secondary="Runs every Monday at 9:00 AM"
                                />
                                <ScheduleIcon color="action" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText
                                    primary="Quarterly Analytics Report"
                                    secondary="Runs at end of each quarter"
                                />
                                <ScheduleIcon color="action" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ReportsHub;
