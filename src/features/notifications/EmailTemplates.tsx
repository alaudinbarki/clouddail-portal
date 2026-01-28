import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const EmailTemplates: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">EmailTemplates</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Create New</Button>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Typography>Manage EmailTemplates here</Typography>
      </Paper>
    </Box>
  );
};

export default EmailTemplates;
