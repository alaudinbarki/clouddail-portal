import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Switch,
    FormControlLabel,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Lock as LockIcon,
} from '@mui/icons-material';

const AdminUsers: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const adminUsers = [
        {
            id: '1',
            name: 'Super Admin',
            email: 'admin@clouddail.com',
            role: 'super_admin',
            status: 'active',
            lastLogin: new Date().toISOString(),
            createdAt: '2024-01-01',
        },
        {
            id: '2',
            name: 'John Manager',
            email: 'john.manager@clouddail.com',
            role: 'admin',
            status: 'active',
            lastLogin: new Date().toISOString(),
            createdAt: '2024-02-15',
        },
        {
            id: '3',
            name: 'Jane Support',
            email: 'jane.support@clouddail.com',
            role: 'support',
            status: 'active',
            lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: '2024-03-01',
        },
    ];

    const stats = {
        totalAdmins: 8,
        activeAdmins: 7,
        superAdmins: 2,
        supportStaff: 3,
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'super_admin':
                return 'error';
            case 'admin':
                return 'primary';
            case 'support':
                return 'info';
            default:
                return 'default';
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'active' ? 'success' : 'default';
    };

    const handleEditUser = (user: any) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4">Admin Users</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage administrative users and permissions
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
                    Add Admin User
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Admins
                            </Typography>
                            <Typography variant="h4">{stats.totalAdmins}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Active
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.activeAdmins}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Super Admins
                            </Typography>
                            <Typography variant="h4">{stats.superAdmins}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Support Staff
                            </Typography>
                            <Typography variant="h4">{stats.supportStaff}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Admin Users Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Last Login</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminUsers.map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="bold">
                                            {user.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{user.email}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.role.replace('_', ' ').toUpperCase()}
                                            color={getRoleColor(user.role)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={user.status.toUpperCase()} color={getStatusColor(user.status)} size="small" />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">{new Date(user.lastLogin).toLocaleString()}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">{new Date(user.createdAt).toLocaleDateString()}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleEditUser(user)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" color="warning">
                                            <LockIcon />
                                        </IconButton>
                                        <IconButton size="small" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Add/Edit Admin Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedUser ? 'Edit Admin User' : 'Add Admin User'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Full Name" defaultValue={selectedUser?.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email" type="email" defaultValue={selectedUser?.email} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth select label="Role" defaultValue={selectedUser?.role || 'support'}>
                                <MenuItem value="super_admin">Super Admin</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="support">Support</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Switch defaultChecked={selectedUser?.status === 'active'} />}
                                label="Active"
                            />
                        </Grid>
                        {!selectedUser && (
                            <Grid item xs={12}>
                                <TextField fullWidth label="Temporary Password" type="password" />
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenDialog(false)}>
                        {selectedUser ? 'Update' : 'Create'} User
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminUsers;
