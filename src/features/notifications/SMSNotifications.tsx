import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const SMSNotifications: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">SMSNotifications</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Create New</Button>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Typography>Manage SMSNotifications here</Typography>
      </Paper>
    </Box>
  );
};

export default SMSNotifications;
