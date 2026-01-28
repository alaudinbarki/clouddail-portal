import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const APIKeys: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>APIKeys</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Configure APIKeys settings here</Typography>
      </Paper>
    </Box>
  );
};

export default APIKeys;
