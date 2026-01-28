import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Paper,
    TextField,
    Divider,
} from '@mui/material';
import {
    QrCode2 as QrCodeIcon,
    Download as DownloadIcon,
    ContentCopy as CopyIcon,
} from '@mui/icons-material';
import QRCode from 'qrcode';

const QRCodeGenerator: React.FC = () => {
    const [qrData, setQrData] = useState({
        iccid: '',
        activationCode: '',
        smdpAddress: 'smdp.example.com',
        confirmationCode: '',
    });
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [lpaString, setLpaString] = useState('');

    const generateQRCode = async () => {
        // Generate LPA string format: LPA:1$smdp.address$activationCode$confirmationCode
        const lpa = `LPA:1$${qrData.smdpAddress}$${qrData.activationCode}${qrData.confirmationCode ? `$${qrData.confirmationCode}` : ''
            }`;
        setLpaString(lpa);

        try {
            const url = await QRCode.toDataURL(lpa, {
                width: 400,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                },
            });
            setQrCodeUrl(url);
        } catch (err) {
            console.error('Error generating QR code:', err);
        }
    };

    const handleDownload = () => {
        if (!qrCodeUrl) return;
        const link = document.createElement('a');
        link.download = `esim-qr-${qrData.iccid || 'code'}.png`;
        link.href = qrCodeUrl;
        link.click();
    };

    const handleCopyLPA = () => {
        navigator.clipboard.writeText(lpaString);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                eSIM QR Code Generator
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Generate QR codes for eSIM activation. Users can scan these codes to activate their eSIM profiles.
            </Typography>

            <Grid container spacing={3}>
                {/* Input Form */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            eSIM Details
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="ICCID"
                                    value={qrData.iccid}
                                    onChange={(e) => setQrData({ ...qrData, iccid: e.target.value })}
                                    placeholder="89012345678901234567"
                                    helperText="Integrated Circuit Card Identifier"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="SM-DP+ Address"
                                    value={qrData.smdpAddress}
                                    onChange={(e) => setQrData({ ...qrData, smdpAddress: e.target.value })}
                                    placeholder="smdp.example.com"
                                    helperText="Subscription Manager Data Preparation address"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Activation Code"
                                    value={qrData.activationCode}
                                    onChange={(e) => setQrData({ ...qrData, activationCode: e.target.value })}
                                    placeholder="1234-5678-9012-3456"
                                    helperText="Required for eSIM activation"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Confirmation Code (Optional)"
                                    value={qrData.confirmationCode}
                                    onChange={(e) => setQrData({ ...qrData, confirmationCode: e.target.value })}
                                    placeholder="ABCD1234"
                                    helperText="Optional security code"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    startIcon={<QrCodeIcon />}
                                    onClick={generateQRCode}
                                    disabled={!qrData.activationCode || !qrData.smdpAddress}
                                >
                                    Generate QR Code
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Quick Templates */}
                    <Paper sx={{ p: 3, mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Templates
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                        setQrData({
                                            iccid: '89012345678901234567',
                                            activationCode: 'DEMO-1234-5678-ABCD',
                                            smdpAddress: 'smdp.airhub.com',
                                            confirmationCode: '',
                                        })
                                    }
                                >
                                    Airhub Template
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                        setQrData({
                                            iccid: '89012345678901234568',
                                            activationCode: 'DEMO-9876-5432-WXYZ',
                                            smdpAddress: 'smdp.1global.com',
                                            confirmationCode: '',
                                        })
                                    }
                                >
                                    1Global Template
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                        setQrData({
                                            iccid: '89012345678901234569',
                                            activationCode: 'DEMO-1111-2222-3333',
                                            smdpAddress: 'smdp.telna.com',
                                            confirmationCode: '',
                                        })
                                    }
                                >
                                    Telna Template
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* QR Code Display */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Generated QR Code
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        {qrCodeUrl ? (
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mb: 3,
                                        p: 3,
                                        bgcolor: 'grey.100',
                                        borderRadius: 2,
                                    }}
                                >
                                    <img src={qrCodeUrl} alt="eSIM QR Code" style={{ maxWidth: '100%' }} />
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="caption" color="text.secondary" gutterBottom>
                                        LPA String:
                                    </Typography>
                                    <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                                        <Typography
                                            variant="body2"
                                            fontFamily="monospace"
                                            sx={{ wordBreak: 'break-all' }}
                                        >
                                            {lpaString}
                                        </Typography>
                                    </Paper>
                                </Box>

                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<DownloadIcon />}
                                            onClick={handleDownload}
                                        >
                                            Download QR
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<CopyIcon />}
                                            onClick={handleCopyLPA}
                                        >
                                            Copy LPA String
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        <strong>Instructions:</strong>
                                        <br />
                                        1. Download the QR code or share the LPA string with the user
                                        <br />
                                        2. User opens their device's eSIM settings
                                        <br />
                                        3. User scans the QR code or enters the LPA string manually
                                        <br />
                                        4. eSIM profile will be downloaded and activated
                                    </Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: 400,
                                    color: 'text.secondary',
                                }}
                            >
                                <QrCodeIcon sx={{ fontSize: 80, mb: 2, opacity: 0.3 }} />
                                <Typography variant="body2">
                                    Fill in the eSIM details and click "Generate QR Code"
                                </Typography>
                            </Box>
                        )}
                    </Paper>

                    {/* Info Card */}
                    <Card sx={{ mt: 3, bgcolor: 'info.50' }}>
                        <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                                💡 About eSIM QR Codes
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                QR codes contain the LPA (Local Profile Assistant) string which includes the SM-DP+
                                address and activation code. When scanned, the device contacts the SM-DP+ server to
                                download and install the eSIM profile.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default QRCodeGenerator;
