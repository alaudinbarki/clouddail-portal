import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
    CircularProgress,
    Alert,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import {
    Visibility as ViewIcon,
} from '@mui/icons-material';
import UserFilters from '../../components/users/UserFilters';
import UserStatusBadge from '../../components/users/UserStatusBadge';
import userService from '../../services/userService';
import type { User, UserQueryParams, UserStats } from '../../types/user';

const UserList: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<UserStats>({
        total: 0,
        active: 0,
        inactive: 0,
        suspended: 0,
        verified: 0,
        pending: 0,
        totalUsers: 0,
        activeUsers: 0,
        newUsersToday: 0,
        newUsersThisWeek: 0,
        newUsersThisMonth: 0,
        pendingKYC: 0,
        bannedUsers: 0,
    });

    const [filters, setFilters] = useState<UserQueryParams>({
        page: 1,
        pageSize: 10,
        status: 'all',
        role: 'all',
        kycStatus: 'all',
        search: '',
    });

    useEffect(() => {
        loadUsers();
        loadStats();
    }, [filters]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await userService.getUsers(filters);
            setUsers(response.data);
            setTotal(response.total);
        } catch (err) {
            setError('Failed to load users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const statsData = await userService.getUserStats();
            setStats(statsData);
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
    };

    const handlePageChange = (_: unknown, newPage: number) => {
        setFilters({ ...filters, page: newPage + 1 });
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, pageSize: parseInt(event.target.value, 10), page: 1 });
    };

    const handleViewUser = (userId: string) => {
        navigate(`/users/${userId}`);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                User Management
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Users
                            </Typography>
                            <Typography variant="h4">{stats.total}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Active Users
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.active}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Inactive Users
                            </Typography>
                            <Typography variant="h4" color="text.secondary">
                                {stats.inactive}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Suspended Users
                            </Typography>
                            <Typography variant="h4" color="error.main">
                                {stats.suspended}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filters */}
            <UserFilters filters={filters} onFilterChange={setFilters} />

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Users Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>KYC Status</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                        <Typography color="textSecondary">No users found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow key={user.id} hover>
                                        <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                {user.role.replace('_', ' ')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <UserStatusBadge status={user.status} />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                color={
                                                    user.kycStatus === 'verified'
                                                        ? 'success.main'
                                                        : user.kycStatus === 'rejected'
                                                            ? 'error.main'
                                                            : 'warning.main'
                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            >
                                                {user.kycStatus}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="View Details">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleViewUser(user.id)}
                                                >
                                                    <ViewIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={total}
                    page={(filters.page || 1) - 1}
                    onPageChange={handlePageChange}
                    rowsPerPage={filters.pageSize || 10}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </Paper>
        </Box>
    );
};

export default UserList;
