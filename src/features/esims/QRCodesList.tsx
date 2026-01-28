import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button } from '@mui/material';
import { QrCode2 as QrIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QRCodesList: React.FC = () => {
  const navigate = useNavigate();
  const qrCodes = [
    { id: '1', iccid: '89012345678901234567', createdAt: '2024-06-01', status: 'active' },
    { id: '2', iccid: '89012345678901234568', createdAt: '2024-06-02', status: 'used' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">eSIM QR Codes</Typography>
        <Button variant="contained" onClick={() => navigate('/esims/qr-generator')}>Generate New QR Code</Button>
      </Box>
      <Grid container spacing={3}>
        {qrCodes.map((qr) => (
          <Grid item xs={12} md={6} key={qr.id}>
            <Card>
              <CardContent>
                <QrIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="body2">ICCID: {qr.iccid}</Typography>
                <Typography variant="caption" color="text.secondary">Created: {qr.createdAt}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QRCodesList;
