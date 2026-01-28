import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Branding: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Branding</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Configure Branding settings here</Typography>
      </Paper>
    </Box>
  );
};

export default Branding;
