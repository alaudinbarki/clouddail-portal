import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box,
    Divider,
} from '@mui/material';
import {
    Edit as EditIcon,
    Visibility as ViewIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import type { Plan } from '../../types/pricing';

interface PlanCardProps {
    plan: Plan;
    onEdit: (planId: string) => void;
    onView: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onEdit, onView }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h5" component="div">
                        {plan.name}
                    </Typography>
                    <Chip
                        label={plan.status}
                        color={plan.status === 'active' ? 'success' : 'default'}
                        size="small"
                    />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {plan.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" color="primary">
                        ${plan.sellingPrice}
                        <Typography component="span" variant="body2" color="text.secondary">
                            /{plan.validity} days
                        </Typography>
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            Data Limit:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                            {(plan.dataLimit / 1024).toFixed(0)} GB
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            Base Cost:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                            ${plan.baseCost}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            Markup:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium" color="success.main">
                            {plan.markup.toFixed(1)}%
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            Profit:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium" color="success.main">
                            ${plan.profit.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>

                {plan.isPromotional && (
                    <Chip
                        label="Promotional"
                        color="secondary"
                        size="small"
                        icon={<TrendingUpIcon />}
                        sx={{ mt: 2 }}
                    />
                )}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                        Sales: {plan.salesCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Revenue: ${plan.totalRevenue.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button size="small" startIcon={<ViewIcon />} onClick={() => onView(plan.id)}>
                    View
                </Button>
                <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(plan.id)}>
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
};

export default PlanCard;
