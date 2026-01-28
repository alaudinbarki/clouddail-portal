import React from 'react';
import {
    Paper,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import type { UserQueryParams, UserStatus, UserRole, KYCStatus } from '../../types/user';

interface UserFiltersProps {
    filters: UserQueryParams;
    onFilterChange: (filters: UserQueryParams) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ filters, onFilterChange }) => {
    const handleChange = (field: keyof UserQueryParams, value: any) => {
        onFilterChange({ ...filters, [field]: value, page: 1 });
    };

    const handleClear = () => {
        onFilterChange({
            page: 1,
            pageSize: filters.pageSize || 10,
            status: 'all',
            role: 'all',
            kycStatus: 'all',
            search: '',
        });
    };

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search users..."
                        value={filters.search || ''}
                        onChange={(e) => handleChange('search', e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={filters.status || 'all'}
                            label="Status"
                            onChange={(e) => handleChange('status', e.target.value)}
                        >
                            <MenuItem value="all">All Status</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                            <MenuItem value="suspended">Suspended</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={filters.role || 'all'}
                            label="Role"
                            onChange={(e) => handleChange('role', e.target.value)}
                        >
                            <MenuItem value="all">All Roles</MenuItem>
                            <MenuItem value="super_admin">Super Admin</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="support">Support</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>KYC Status</InputLabel>
                        <Select
                            value={filters.kycStatus || 'all'}
                            label="KYC Status"
                            onChange={(e) => handleChange('kycStatus', e.target.value)}
                        >
                            <MenuItem value="all">All KYC</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="verified">Verified</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ClearIcon />}
                            onClick={handleClear}
                            fullWidth
                        >
                            Clear Filters
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserFilters;
