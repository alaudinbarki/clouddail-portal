import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Compliance: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Compliance</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Configure Compliance settings here</Typography>
      </Paper>
    </Box>
  );
};

export default Compliance;
