import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Divider,
} from '@mui/material';
import {
    Settings as SettingsIcon,
    Security as SecurityIcon,
    History as HistoryIcon,
    Api as ApiIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SettingsHub: React.FC = () => {
    const navigate = useNavigate();

    const settingsCategories = [
        {
            title: 'System Settings',
            description: 'General configuration and preferences',
            icon: <SettingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            path: '/settings/system',
        },
        {
            title: 'Security',
            description: 'Security and authentication settings',
            icon: <SecurityIcon sx={{ fontSize: 40, color: 'error.main' }} />,
            path: '/settings/security',
        },
        {
            title: 'API Configuration',
            description: 'Twilio, Stripe, and third-party integrations',
            icon: <ApiIcon sx={{ fontSize: 40, color: 'success.main' }} />,
            path: '/settings/api',
        },
        {
            title: 'Audit Logs',
            description: 'View system activity and changes',
            icon: <HistoryIcon sx={{ fontSize: 40, color: 'info.main' }} />,
            path: '/settings/audit',
        },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>

            <Grid container spacing={3}>
                {settingsCategories.map((category) => (
                    <Grid item xs={12} sm={6} md={3} key={category.title}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ mb: 2 }}>{category.icon}</Box>
                                <Typography variant="h6" gutterBottom>
                                    {category.title}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {category.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate(category.path)}>
                                    Configure
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SettingsHub;
