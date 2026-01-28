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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Chip,
} from '@mui/material';
import {
    Visibility as ViewIcon,
} from '@mui/icons-material';
import TicketStatusBadge from '../../components/support/TicketStatusBadge';
import supportService from '../../services/supportService';
import type { Ticket } from '../../types/support';

const TicketList: React.FC = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState({
        page: 1,
        pageSize: 10,
        status: 'all',
        priority: 'all',
        category: 'all',
    });

    useEffect(() => {
        loadTickets();
    }, [filters]);

    const loadTickets = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await supportService.getTickets(filters);
            setTickets(response.data);
            setTotal(response.total);
        } catch (err) {
            setError('Failed to load tickets');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (_: unknown, newPage: number) => {
        setFilters({ ...filters, page: newPage + 1 });
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, pageSize: parseInt(event.target.value, 10), page: 1 });
    };

    const handleFilterChange = (field: string, value: any) => {
        setFilters({ ...filters, [field]: value, page: 1 });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical':
                return 'error';
            case 'high':
                return 'warning';
            case 'medium':
                return 'info';
            case 'low':
                return 'default';
            default:
                return 'default';
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Support Tickets</Typography>
            </Box>

            {/* Filters */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search tickets..."
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filters.status}
                                label="Status"
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <MenuItem value="all">All Status</MenuItem>
                                <MenuItem value="open">Open</MenuItem>
                                <MenuItem value="in_progress">In Progress</MenuItem>
                                <MenuItem value="resolved">Resolved</MenuItem>
                                <MenuItem value="closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={filters.priority}
                                label="Priority"
                                onChange={(e) => handleFilterChange('priority', e.target.value)}
                            >
                                <MenuItem value="all">All Priorities</MenuItem>
                                <MenuItem value="critical">Critical</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="low">Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={filters.category}
                                label="Category"
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <MenuItem value="all">All Categories</MenuItem>
                                <MenuItem value="technical">Technical</MenuItem>
                                <MenuItem value="billing">Billing</MenuItem>
                                <MenuItem value="account">Account</MenuItem>
                                <MenuItem value="general">General</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Tickets Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ticket #</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Priority</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : tickets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography color="textSecondary">No tickets found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tickets.map((ticket) => (
                                    <TableRow key={ticket.id} hover>
                                        <TableCell>
                                            <Typography variant="body2" fontFamily="monospace">
                                                {ticket.ticketNumber}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight="medium">
                                                {ticket.subject}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{ticket.userName}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {ticket.userEmail}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize' }}>
                                            {ticket.category}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={ticket.priority.toUpperCase()}
                                                color={getPriorityColor(ticket.priority) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TicketStatusBadge status={ticket.status} />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(ticket.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="View Details">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => navigate(`/support/tickets/${ticket.id}`)}
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
                    page={filters.page - 1}
                    onPageChange={handlePageChange}
                    rowsPerPage={filters.pageSize}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </Paper>
        </Box>
    );
};

export default TicketList;
