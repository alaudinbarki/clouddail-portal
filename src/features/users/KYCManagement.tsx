import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Tabs,
    Tab,
} from '@mui/material';
import {
    CheckCircle as ApproveIcon,
    Cancel as RejectIcon,
    Visibility as ViewIcon,
    Download as DownloadIcon,
} from '@mui/icons-material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;
    return <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>;
}

const KYCManagement: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const pendingKYC = [
        {
            id: '1',
            userName: 'John Doe',
            email: 'john@example.com',
            submittedAt: new Date().toISOString(),
            documentType: 'Passport',
            status: 'pending',
        },
        {
            id: '2',
            userName: 'Jane Smith',
            email: 'jane@example.com',
            submittedAt: new Date().toISOString(),
            documentType: 'Driver License',
            status: 'pending',
        },
    ];

    const verifiedKYC = [
        {
            id: '3',
            userName: 'Bob Johnson',
            email: 'bob@example.com',
            verifiedAt: new Date().toISOString(),
            documentType: 'Passport',
            status: 'verified',
        },
    ];

    const rejectedKYC = [
        {
            id: '4',
            userName: 'Alice Brown',
            email: 'alice@example.com',
            rejectedAt: new Date().toISOString(),
            documentType: 'ID Card',
            status: 'rejected',
            reason: 'Document not clear',
        },
    ];

    const stats = {
        pending: 15,
        verified: 142,
        rejected: 8,
        total: 165,
    };

    const handleViewKYC = (user: any) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleApprove = (userId: string) => {
        console.log('Approving KYC for user:', userId);
        setOpenDialog(false);
    };

    const handleReject = (userId: string) => {
        console.log('Rejecting KYC for user:', userId);
        setOpenDialog(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'verified':
                return 'success';
            case 'pending':
                return 'warning';
            case 'rejected':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                KYC Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Manage user identity verification and KYC documents
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Pending Review
                            </Typography>
                            <Typography variant="h4" color="warning.main">
                                {stats.pending}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Verified
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.verified}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Rejected
                            </Typography>
                            <Typography variant="h4" color="error.main">
                                {stats.rejected}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Submissions
                            </Typography>
                            <Typography variant="h4">{stats.total}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Paper>
                <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                    <Tab label={`Pending (${stats.pending})`} />
                    <Tab label={`Verified (${stats.verified})`} />
                    <Tab label={`Rejected (${stats.rejected})`} />
                </Tabs>

                {/* Pending Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ p: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Document Type</TableCell>
                                        <TableCell>Submitted</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pendingKYC.map((kyc) => (
                                        <TableRow key={kyc.id} hover>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="bold">
                                                    {kyc.userName}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {kyc.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{kyc.documentType}</TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {new Date(kyc.submittedAt).toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={kyc.status.toUpperCase()} color={getStatusColor(kyc.status)} size="small" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton size="small" onClick={() => handleViewKYC(kyc)} title="View Documents">
                                                    <ViewIcon />
                                                </IconButton>
                                                <IconButton size="small" color="success" onClick={() => handleApprove(kyc.id)} title="Approve">
                                                    <ApproveIcon />
                                                </IconButton>
                                                <IconButton size="small" color="error" onClick={() => handleReject(kyc.id)} title="Reject">
                                                    <RejectIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </TabPanel>

                {/* Verified Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ p: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Document Type</TableCell>
                                        <TableCell>Verified</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {verifiedKYC.map((kyc) => (
                                        <TableRow key={kyc.id} hover>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="bold">
                                                    {kyc.userName}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {kyc.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{kyc.documentType}</TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {new Date(kyc.verifiedAt).toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={kyc.status.toUpperCase()} color={getStatusColor(kyc.status)} size="small" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton size="small" onClick={() => handleViewKYC(kyc)}>
                                                    <ViewIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </TabPanel>

                {/* Rejected Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ p: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Document Type</TableCell>
                                        <TableCell>Rejected</TableCell>
                                        <TableCell>Reason</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rejectedKYC.map((kyc) => (
                                        <TableRow key={kyc.id} hover>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="bold">
                                                    {kyc.userName}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {kyc.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{kyc.documentType}</TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {new Date(kyc.rejectedAt).toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption" color="error.main">
                                                    {kyc.reason}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={kyc.status.toUpperCase()} color={getStatusColor(kyc.status)} size="small" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton size="small" onClick={() => handleViewKYC(kyc)}>
                                                    <ViewIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </TabPanel>
            </Paper>

            {/* View KYC Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>KYC Document Review</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">User Information</Typography>
                                <Typography variant="body2">Name: {selectedUser.userName}</Typography>
                                <Typography variant="body2">Email: {selectedUser.email}</Typography>
                                <Typography variant="body2">Document Type: {selectedUser.documentType}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        border: '1px dashed',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        p: 3,
                                        textAlign: 'center',
                                        bgcolor: 'grey.50',
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        Document Preview Area
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        (Document images would be displayed here)
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Button startIcon={<DownloadIcon />} variant="outlined" size="small">
                                            Download Document
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            {selectedUser.status === 'pending' && (
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Rejection Reason (if rejecting)" multiline rows={3} />
                                </Grid>
                            )}
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Close</Button>
                    {selectedUser?.status === 'pending' && (
                        <>
                            <Button color="error" onClick={() => handleReject(selectedUser.id)}>
                                Reject
                            </Button>
                            <Button variant="contained" color="success" onClick={() => handleApprove(selectedUser.id)}>
                                Approve
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default KYCManagement;
