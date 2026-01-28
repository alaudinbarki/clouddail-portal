import React, { useState, useEffect } from 'react';
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
    CircularProgress,
    Alert,
    Chip,
    TextField,
    Grid,
} from '@mui/material';
import settingsService from '../../services/settingsService';
import type { AuditLog } from '../../types/settings';

const AuditLogs: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadLogs();
    }, [page, pageSize, search]);

    const loadLogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await settingsService.getAuditLogs({ page, pageSize, search });
            setLogs(response.data);
            setTotal(response.total);
        } catch (err) {
            setError('Failed to load audit logs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1);
    };

    const getActionColor = (action: string) => {
        if (action.includes('create')) return 'success';
        if (action.includes('update')) return 'info';
        if (action.includes('delete')) return 'error';
        return 'default';
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Audit Logs
            </Typography>

            {/* Search */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search by user, action, or resource..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Logs Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Resource</TableCell>
                                <TableCell>IP Address</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : logs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                        <Typography color="textSecondary">No audit logs found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                logs.map((log) => (
                                    <TableRow key={log.id} hover>
                                        <TableCell>
                                            {new Date(log.timestamp).toLocaleString()}
                                        </TableCell>
                                        <TableCell>{log.userId}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={log.action}
                                                color={getActionColor(log.action) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{log.resourceType}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {log.resourceId}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontFamily="monospace">
                                                {log.ipAddress}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={log.status}
                                                color={log.status === 'success' ? 'success' : 'error'}
                                                size="small"
                                            />
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
                    page={page - 1}
                    onPageChange={handlePageChange}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </Paper>
        </Box>
    );
};

export default AuditLogs;
