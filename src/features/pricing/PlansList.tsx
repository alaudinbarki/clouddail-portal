import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Button,
    CircularProgress,
    Alert,
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PlanCard from '../../components/pricing/PlanCard';
import pricingService from '../../services/pricingService';
import type { Plan } from '../../types/pricing';

const PlansList: React.FC = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            setLoading(true);
            setError(null);
            const plansData = await pricingService.getPlans();
            setPlans(plansData);
        } catch (err) {
            setError('Failed to load plans');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: 'all' | 'active' | 'inactive' | null) => {
        if (newFilter !== null) {
            setFilter(newFilter);
        }
    };

    const filteredPlans = plans.filter((plan) => {
        if (filter === 'all') return true;
        return plan.status === filter;
    });

    const handleEditPlan = (planId: string) => {
        navigate(`/plans/${planId}/edit`);
    };

    const handleViewPlan = (planId: string) => {
        navigate(`/plans/${planId}`);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Pricing Plans</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/plans/create')}
                >
                    Create Plan
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ mb: 3 }}>
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={handleFilterChange}
                    aria-label="plan filter"
                >
                    <ToggleButton value="all">All Plans</ToggleButton>
                    <ToggleButton value="active">Active</ToggleButton>
                    <ToggleButton value="inactive">Inactive</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {filteredPlans.length === 0 ? (
                <Alert severity="info">No plans found</Alert>
            ) : (
                <Grid container spacing={3}>
                    {filteredPlans.map((plan) => (
                        <Grid item xs={12} sm={6} md={4} key={plan.id}>
                            <PlanCard
                                plan={plan}
                                onEdit={handleEditPlan}
                                onView={handleViewPlan}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default PlansList;
