import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

const TaxReports: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>TaxReports</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        TaxReports page - Coming soon
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Sample Metric</Typography>
              <Typography variant="h4">1,234</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaxReports;
