import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
    title: string;
    value: string | number;
    change: number;
    changePercent: number;
    trend: 'up' | 'down' | 'neutral';
    icon: React.ReactNode;
    color: string;
    sparkline?: number[];
    subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    change,
    changePercent,
    trend,
    icon,
    color,
    sparkline,
    subtitle,
}) => {
    const getTrendIcon = () => {
        switch (trend) {
            case 'up':
                return <TrendingUp sx={{ fontSize: 16 }} />;
            case 'down':
                return <TrendingDown sx={{ fontSize: 16 }} />;
            default:
                return <TrendingFlat sx={{ fontSize: 16 }} />;
        }
    };

    const getTrendColor = () => {
        switch (trend) {
            case 'up':
                return 'success.main';
            case 'down':
                return 'error.main';
            default:
                return 'text.secondary';
        }
    };

    return (
        <Card
            sx={{
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                },
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography variant="caption" color="text.secondary">
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `${color}15`,
                            color: color,
                        }}
                    >
                        {icon}
                    </Box>
                </Box>

                {/* Sparkline */}
                {sparkline && sparkline.length > 0 && (
                    <Box sx={{ height: 40, mb: 1 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sparkline.map((value, index) => ({ value, index }))}>
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={color}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                )}

                {/* Change Indicator */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                        icon={getTrendIcon()}
                        label={`${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(1)}%`}
                        size="small"
                        sx={{
                            backgroundColor: `${getTrendColor()}15`,
                            color: getTrendColor(),
                            fontWeight: 600,
                            '& .MuiChip-icon': {
                                color: getTrendColor(),
                            },
                        }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        vs last period
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MetricCard;
