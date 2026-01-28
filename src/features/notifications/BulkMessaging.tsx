import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const BulkMessaging: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">BulkMessaging</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Create New</Button>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Typography>Manage BulkMessaging here</Typography>
      </Paper>
    </Box>
  );
};

export default BulkMessaging;
