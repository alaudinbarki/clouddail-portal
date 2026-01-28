import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DataProvidersIntegration: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Data Providers Integration</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage data provider integrations
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Airhub</Typography>
              <Button variant="outlined" onClick={() => navigate('/providers')} sx={{ mt: 2 }}>Configure</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">1Global</Typography>
              <Button variant="outlined" onClick={() => navigate('/providers')} sx={{ mt: 2 }}>Configure</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataProvidersIntegration;
