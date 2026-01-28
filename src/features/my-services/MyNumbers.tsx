import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid2 as Grid,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Switch,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Tabs,
    Tab,
    LinearProgress,
} from '@mui/material';
import {
    Phone,
    Delete,
    Refresh,
    CallMade,
    CallReceived,
    Sms,
    TrendingUp,
    Settings,
} from '@mui/icons-material';

// Mock data
const mockNumbers = [
    {
        id: 1,
        phoneNumber: '+1 (415) 555-0123',
        country: 'United States',
        region: 'San Francisco, CA',
        type: 'local',
        provider: 'Telnyx',
        monthlyCost: 2.00,
        status: 'active',
        autoRenew: true,
        purchasedAt: '2024-11-01',
        expiresAt: '2024-12-01',
        usage: {
            callsIn: 45,
            callsOut: 32,
            smsIn: 120,
            smsOut: 85,
            totalCost: 12.50,
        },
    },
    {
        id: 2,
        phoneNumber: '+1 (800) 555-0100',
        country: 'United States',
        region: 'United States',
        type: 'toll_free',
        provider: 'Twilio',
        monthlyCost: 4.00,
        status: 'active',
        autoRenew: false,
        purchasedAt: '2024-10-15',
        expiresAt: '2024-11-15',
        usage: {
            callsIn: 120,
            callsOut: 0,
            smsIn: 45,
            smsOut: 0,
            totalCost: 28.75,
        },
    },
];

const mockCallRecords = [
    { id: 1, direction: 'inbound', from: '+1234567890', to: '+14155550123', duration: '5:23', cost: 0.85, date: '2024-12-09 10:30 AM' },
    { id: 2, direction: 'outbound', from: '+14155550123', to: '+1987654321', duration: '2:15', cost: 0.45, date: '2024-12-09 09:15 AM' },
    { id: 3, direction: 'inbound', from: '+1555555555', to: '+14155550123', duration: '8:42', cost: 1.35, date: '2024-12-08 03:20 PM' },
];

const mockSmsRecords = [
    { id: 1, direction: 'inbound', from: '+1234567890', to: '+14155550123', message: 'Hello, is this available?', cost: 0.00, date: '2024-12-09 11:00 AM' },
    { id: 2, direction: 'outbound', from: '+14155550123', to: '+1234567890', message: 'Yes, how can I help?', cost: 0.10, date: '2024-12-09 11:02 AM' },
];

export default function MyNumbers() {
    const [numbers, setNumbers] = useState(mockNumbers);
    const [selectedNumber, setSelectedNumber] = useState<any>(null);
    const [detailsDialog, setDetailsDialog] = useState(false);
    const [releaseDialog, setReleaseDialog] = useState<any>(null);
    const [activeTab, setActiveTab] = useState(0);

    const handleToggleAutoRenew = (numberId: number) => {
        setNumbers(numbers.map(num =>
            num.id === numberId ? { ...num, autoRenew: !num.autoRenew } : num
        ));
    };

    const handleViewDetails = (number: any) => {
        setSelectedNumber(number);
        setDetailsDialog(true);
    };

    const handleReleaseNumber = async () => {
        // TODO: Implement release logic
        console.log('Releasing number:', releaseDialog);
        setNumbers(numbers.filter(num => num.id !== releaseDialog.id));
        setReleaseDialog(null);
    };

    const daysUntilExpiry = (expiresAt: string) => {
        const days = Math.ceil((new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return days;
    };

    return (
        <Box>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        My Virtual Numbers
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your purchased virtual numbers
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Phone />} href="/marketplace/numbers">
                    Buy New Number
                </Button>
            </Box>

            {/* Numbers Grid */}
            <Grid container spacing={3}>
                {numbers.map((number) => {
                    const daysLeft = daysUntilExpiry(number.expiresAt);
                    const isExpiringSoon = daysLeft <= 7;

                    return (
                        <Grid key={number.id} size={{ xs: 12, md: 6 }}>
                            <Card>
                                <CardContent>
                                    {/* Header */}
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold">
                                                {number.phoneNumber}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {number.region}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={number.type}
                                            size="small"
                                            color={number.type === 'toll_free' ? 'primary' : 'default'}
                                        />
                                    </Box>

                                    {/* Expiry Warning */}
                                    {isExpiringSoon && (
                                        <Alert severity="warning" sx={{ mb: 2 }}>
                                            Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
                                        </Alert>
                                    )}

                                    {/* Info Grid */}
                                    <Grid container spacing={2} mb={2}>
                                        <Grid size={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Provider
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {number.provider}
                                            </Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Monthly Cost
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                ${number.monthlyCost.toFixed(2)}
                                            </Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Status
                                            </Typography>
                                            <Chip
                                                label={number.status}
                                                size="small"
                                                color="success"
                                                sx={{ height: 20 }}
                                            />
                                        </Grid>
                                        <Grid size={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Expires
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {new Date(number.expiresAt).toLocaleDateString()}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    {/* Usage Stats */}
                                    <Box bgcolor="grey.50" borderRadius={1} p={1.5} mb={2}>
                                        <Typography variant="caption" color="text.secondary" gutterBottom>
                                            This Month's Usage
                                        </Typography>
                                        <Grid container spacing={1}>
                                            <Grid size={6}>
                                                <Box display="flex" alignItems="center" gap={0.5}>
                                                    <CallReceived fontSize="small" color="action" />
                                                    <Typography variant="body2">{number.usage.callsIn} in</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={6}>
                                                <Box display="flex" alignItems="center" gap={0.5}>
                                                    <CallMade fontSize="small" color="action" />
                                                    <Typography variant="body2">{number.usage.callsOut} out</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={6}>
                                                <Box display="flex" alignItems="center" gap={0.5}>
                                                    <Sms fontSize="small" color="action" />
                                                    <Typography variant="body2">{number.usage.smsIn + number.usage.smsOut} SMS</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={6}>
                                                <Box display="flex" alignItems="center" gap={0.5}>
                                                    <TrendingUp fontSize="small" color="success" />
                                                    <Typography variant="body2" color="success.main">
                                                        ${number.usage.totalCost.toFixed(2)}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    {/* Actions */}
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Switch
                                                checked={number.autoRenew}
                                                onChange={() => handleToggleAutoRenew(number.id)}
                                                size="small"
                                            />
                                            <Typography variant="caption">Auto-renew</Typography>
                                        </Box>
                                        <Box display="flex" gap={1}>
                                            <Button size="small" onClick={() => handleViewDetails(number)}>
                                                View Details
                                            </Button>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => setReleaseDialog(number)}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Empty State */}
            {numbers.length === 0 && (
                <Card>
                    <CardContent sx={{ textAlign: 'center', py: 8 }}>
                        <Phone sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            No Virtual Numbers Yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Purchase your first virtual number to get started
                        </Typography>
                        <Button variant="contained" href="/marketplace/numbers">
                            Browse Numbers
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Details Dialog */}
            <Dialog open={detailsDialog} onClose={() => setDetailsDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    Number Details: {selectedNumber?.phoneNumber}
                </DialogTitle>
                <DialogContent>
                    {selectedNumber && (
                        <Box>
                            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 2 }}>
                                <Tab label="Call History" />
                                <Tab label="SMS History" />
                                <Tab label="Settings" />
                            </Tabs>

                            {/* Call History Tab */}
                            {activeTab === 0 && (
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Direction</TableCell>
                                                <TableCell>From</TableCell>
                                                <TableCell>To</TableCell>
                                                <TableCell>Duration</TableCell>
                                                <TableCell>Cost</TableCell>
                                                <TableCell>Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {mockCallRecords.map((record) => (
                                                <TableRow key={record.id}>
                                                    <TableCell>
                                                        <Chip
                                                            icon={record.direction === 'inbound' ? <CallReceived /> : <CallMade />}
                                                            label={record.direction}
                                                            size="small"
                                                            color={record.direction === 'inbound' ? 'success' : 'primary'}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{record.from}</TableCell>
                                                    <TableCell>{record.to}</TableCell>
                                                    <TableCell>{record.duration}</TableCell>
                                                    <TableCell>${record.cost.toFixed(2)}</TableCell>
                                                    <TableCell>{record.date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}

                            {/* SMS History Tab */}
                            {activeTab === 1 && (
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Direction</TableCell>
                                                <TableCell>From</TableCell>
                                                <TableCell>To</TableCell>
                                                <TableCell>Message</TableCell>
                                                <TableCell>Cost</TableCell>
                                                <TableCell>Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {mockSmsRecords.map((record) => (
                                                <TableRow key={record.id}>
                                                    <TableCell>
                                                        <Chip
                                                            label={record.direction}
                                                            size="small"
                                                            color={record.direction === 'inbound' ? 'success' : 'primary'}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{record.from}</TableCell>
                                                    <TableCell>{record.to}</TableCell>
                                                    <TableCell>{record.message}</TableCell>
                                                    <TableCell>${record.cost.toFixed(2)}</TableCell>
                                                    <TableCell>{record.date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}

                            {/* Settings Tab */}
                            {activeTab === 2 && (
                                <Box>
                                    <Alert severity="info" sx={{ mb: 2 }}>
                                        Configure settings for {selectedNumber.phoneNumber}
                                    </Alert>
                                    {/* Add settings controls here */}
                                </Box>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDetailsDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Release Confirmation Dialog */}
            <Dialog open={!!releaseDialog} onClose={() => setReleaseDialog(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Release Number</DialogTitle>
                <DialogContent>
                    {releaseDialog && (
                        <Box>
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                Are you sure you want to release this number? This action cannot be undone.
                            </Alert>
                            <Typography variant="h6" gutterBottom>
                                {releaseDialog.phoneNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You will lose access to this number immediately.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setReleaseDialog(null)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleReleaseNumber}>
                        Release Number
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
