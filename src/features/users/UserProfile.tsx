import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
    Divider,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    Block as BlockIcon,
    CheckCircle as UnblockIcon,
    VpnKey as ResetPasswordIcon,
} from '@mui/icons-material';
import UserStatusBadge from '../../components/users/UserStatusBadge';
import userService from '../../services/userService';
import type { User } from '../../types/user';

const UserProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadUser(id);
        }
    }, [id]);

    const loadUser = async (userId: string) => {
        try {
            setLoading(true);
            setError(null);
            const userData = await userService.getUserById(userId);
            setUser(userData);
        } catch (err) {
            setError('Failed to load user');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBanUser = async () => {
        if (!user) return;
        try {
            await userService.banUser({
                userId: user.id, reason: 'Banned by admin',
                bannedBy: ''
            });
            await loadUser(user.id);
        } catch (err) {
            console.error('Failed to ban user:', err);
        }
    };

    const handleUnbanUser = async () => {
        if (!user) return;
        try {
            await userService.unbanUser(user.id);
            await loadUser(user.id);
        } catch (err) {
            console.error('Failed to unban user:', err);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !user) {
        return (
            <Box>
                <Alert severity="error">{error || 'User not found'}</Alert>
                <Button startIcon={<BackIcon />} onClick={() => navigate('/users')} sx={{ mt: 2 }}>
                    Back to Users
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button startIcon={<BackIcon />} onClick={() => navigate('/users')}>
                        Back
                    </Button>
                    <Typography variant="h4">User Profile</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {user.status === 'suspended' ? (
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<UnblockIcon />}
                            onClick={handleUnbanUser}
                        >
                            Unban User
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<BlockIcon />}
                            onClick={handleBanUser}
                        >
                            Ban User
                        </Button>
                    )}
                    <Button variant="outlined" startIcon={<ResetPasswordIcon />}>
                        Reset Password
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* User Information */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                User Information
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Name
                                </Typography>
                                <Typography variant="body1">{`${user.firstName} ${user.lastName}`}</Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Email
                                </Typography>
                                <Typography variant="body1">{user.email}</Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Phone
                                </Typography>
                                <Typography variant="body1">{user.phone || 'N/A'}</Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Role
                                </Typography>
                                <Chip
                                    label={user.role.replace('_', ' ').toUpperCase()}
                                    size="small"
                                    sx={{ mt: 0.5 }}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Status
                                </Typography>
                                <Box sx={{ mt: 0.5 }}>
                                    <UserStatusBadge status={user.status} />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    KYC Status
                                </Typography>
                                <Chip
                                    label={user.kycStatus.toUpperCase()}
                                    size="small"
                                    color={
                                        user.kycStatus === 'verified'
                                            ? 'success'
                                            : user.kycStatus === 'rejected'
                                                ? 'error'
                                                : 'warning'
                                    }
                                    sx={{ mt: 0.5 }}
                                />
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 1 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Created
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(user.createdAt).toLocaleString()}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    Last Login
                                </Typography>
                                <Typography variant="body2">
                                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Activity & Stats */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Activity Overview
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Purchases
                                    </Typography>
                                    <Typography variant="h5">0</Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="body2" color="textSecondary">
                                        Active eSIMs
                                    </Typography>
                                    <Typography variant="h5">0</Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Spent
                                    </Typography>
                                    <Typography variant="h5">$0.00</Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="body2" color="textSecondary">
                                        Support Tickets
                                    </Typography>
                                    <Typography variant="h5">0</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Recent Activity
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Activity</TableCell>
                                            <TableCell>Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                                                <Typography color="textSecondary">No recent activity</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserProfile;
