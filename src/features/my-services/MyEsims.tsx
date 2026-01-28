import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid2 as Grid,
    Chip,
    LinearProgress,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Switch,
} from '@mui/material';
import {
    SimCard,
    QrCode2,
    Download,
    Refresh,
    Add,
    Delete,
    DataUsage,
} from '@mui/icons-material';

// Mock data
const mockEsims = [
    {
        id: 1,
        planName: '5GB Europe',
        region: 'Europe',
        dataGb: 5,
        dataUsedGb: 2.3,
        validityDays: 30,
        provider: 'Telna',
        status: 'active',
        iccid: '8901234567890123456',
        lpaString: 'LPA:1$smdp.example.com$activation-code-1',
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        activatedAt: '2024-11-15',
        expiresAt: '2024-12-15',
        autoRenew: true,
        cost: 22.00,
    },
    {
        id: 2,
        planName: '10GB Global',
        region: 'Global',
        dataGb: 10,
        dataUsedGb: 8.7,
        validityDays: 30,
        provider: 'Telna',
        status: 'active',
        iccid: '8901234567890123457',
        lpaString: 'LPA:1$smdp.example.com$activation-code-2',
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        activatedAt: '2024-11-01',
        expiresAt: '2024-12-01',
        autoRenew: false,
        cost: 35.00,
    },
];

export default function MyEsims() {
    const [esims, setEsims] = useState(mockEsims);
    const [qrDialog, setQrDialog] = useState<any>(null);
    const [topUpDialog, setTopUpDialog] = useState<any>(null);
    const [deleteDialog, setDeleteDialog] = useState<any>(null);

    const handleToggleAutoRenew = (esimId: number) => {
        setEsims(esims.map(esim =>
            esim.id === esimId ? { ...esim, autoRenew: !esim.autoRenew } : esim
        ));
    };

    const handleTopUp = async () => {
        // TODO: Implement top-up logic
        console.log('Topping up eSIM:', topUpDialog);
        setTopUpDialog(null);
    };

    const handleDelete = async () => {
        // TODO: Implement delete logic
        console.log('Deleting eSIM:', deleteDialog);
        setEsims(esims.filter(esim => esim.id !== deleteDialog.id));
        setDeleteDialog(null);
    };

    const calculateUsagePercentage = (used: number, total: number) => {
        return (used / total) * 100;
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
                        My eSIMs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your eSIM data plans
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<SimCard />} href="/marketplace/esim">
                    Buy New eSIM
                </Button>
            </Box>

            {/* eSIMs Grid */}
            <Grid container spacing={3}>
                {esims.map((esim) => {
                    const usagePercentage = calculateUsagePercentage(esim.dataUsedGb, esim.dataGb);
                    const daysLeft = daysUntilExpiry(esim.expiresAt);
                    const isExpiringSoon = daysLeft <= 7;
                    const isDataLow = usagePercentage >= 80;

                    return (
                        <Grid key={esim.id} size={{ xs: 12, md: 6 }}>
                            <Card>
                                <CardContent>
                                    {/* Header */}
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold">
                                                {esim.planName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {esim.region} • {esim.dataGb}GB
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={esim.status}
                                            size="small"
                                            color="success"
                                        />
                                    </Box>

                                    {/* Alerts */}
                                    {isExpiringSoon && (
                                        <Alert severity="warning" sx={{ mb: 2 }}>
                                            Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
                                        </Alert>
                                    )}
                                    {isDataLow && (
                                        <Alert severity="warning" sx={{ mb: 2 }}>
                                            {(100 - usagePercentage).toFixed(0)}% data remaining
                                        </Alert>
                                    )}

                                    {/* Data Usage */}
                                    <Box mb={2}>
                                        <Box display="flex" justifyContent="space-between" mb={1}>
                                            <Typography variant="body2" color="text.secondary">
                                                Data Usage
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {esim.dataUsedGb.toFixed(1)}GB / {esim.dataGb}GB
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={usagePercentage}
                                            color={isDataLow ? 'warning' : 'primary'}
                                            sx={{ height: 8, borderRadius: 1 }}
                                        />
                                    </Box>

                                    {/* Info Grid */}
                                    <Grid container spacing={2} mb={2}>
                                        <Grid size={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Provider
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {esim.provider}
                                            </Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Validity
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {esim.validityDays} days
                                            </Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Activated
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {new Date(esim.activatedAt).toLocaleDateString()}
                                            </Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Expires
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {new Date(esim.expiresAt).toLocaleDateString()}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    {/* Actions */}
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Switch
                                                checked={esim.autoRenew}
                                                onChange={() => handleToggleAutoRenew(esim.id)}
                                                size="small"
                                            />
                                            <Typography variant="caption">Auto-renew</Typography>
                                        </Box>
                                        <Box display="flex" gap={1}>
                                            <Button
                                                size="small"
                                                startIcon={<QrCode2 />}
                                                onClick={() => setQrDialog(esim)}
                                            >
                                                QR Code
                                            </Button>
                                            <Button
                                                size="small"
                                                startIcon={<Add />}
                                                onClick={() => setTopUpDialog(esim)}
                                            >
                                                Top Up
                                            </Button>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => setDeleteDialog(esim)}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    {/* ICCID */}
                                    <Box bgcolor="grey.50" borderRadius={1} p={1}>
                                        <Typography variant="caption" color="text.secondary">
                                            ICCID
                                        </Typography>
                                        <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                                            {esim.iccid}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Empty State */}
            {esims.length === 0 && (
                <Card>
                    <CardContent sx={{ textAlign: 'center', py: 8 }}>
                        <SimCard sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            No eSIMs Yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Purchase your first eSIM data plan to get started
                        </Typography>
                        <Button variant="contained" href="/marketplace/esim">
                            Browse eSIM Plans
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* QR Code Dialog */}
            <Dialog open={!!qrDialog} onClose={() => setQrDialog(null)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Box display="flex" alignItems="center" gap={1}>
                        <QrCode2 />
                        eSIM QR Code
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {qrDialog && (
                        <Box textAlign="center">
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                Scan this QR code to activate your eSIM
                            </Typography>

                            {/* QR Code */}
                            <Box
                                sx={{
                                    bgcolor: 'white',
                                    p: 3,
                                    borderRadius: 2,
                                    border: '2px solid',
                                    borderColor: 'grey.300',
                                    mb: 3,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={qrDialog.qrCode}
                                    alt="eSIM QR Code"
                                    sx={{ width: 200, height: 200, mx: 'auto' }}
                                />
                            </Box>

                            {/* Details */}
                            <Box textAlign="left" mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    ICCID
                                </Typography>
                                <Typography variant="body1" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                                    {qrDialog.iccid}
                                </Typography>
                            </Box>
                            <Box textAlign="left" mb={2}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    LPA String
                                </Typography>
                                <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                                    {qrDialog.lpaString}
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Download />}
                                sx={{ mt: 2 }}
                            >
                                Download QR Code
                            </Button>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setQrDialog(null)} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Top Up Dialog */}
            <Dialog open={!!topUpDialog} onClose={() => setTopUpDialog(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Top Up Data</DialogTitle>
                <DialogContent>
                    {topUpDialog && (
                        <Box>
                            <Alert severity="info" sx={{ mb: 2 }}>
                                Add more data to your existing eSIM plan
                            </Alert>
                            <Typography variant="h6" gutterBottom>
                                {topUpDialog.planName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                Current: {topUpDialog.dataUsedGb.toFixed(1)}GB / {topUpDialog.dataGb}GB used
                            </Typography>
                            {/* Add top-up options here */}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTopUpDialog(null)}>Cancel</Button>
                    <Button variant="contained" onClick={handleTopUp}>
                        Confirm Top Up
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Delete eSIM</DialogTitle>
                <DialogContent>
                    {deleteDialog && (
                        <Box>
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                Are you sure you want to delete this eSIM? This action cannot be undone.
                            </Alert>
                            <Typography variant="h6" gutterBottom>
                                {deleteDialog.planName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You will lose access to this eSIM and any remaining data.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Delete eSIM
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
