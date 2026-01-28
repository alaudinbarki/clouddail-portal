import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, Button, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const Promotions: React.FC = () => {
  const promos = [
    { id: '1', name: 'Summer Sale 2024', discount: 20, status: 'active', validUntil: '2024-08-31' },
    { id: '2', name: 'New User Discount', discount: 15, status: 'active', validUntil: '2024-12-31' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Promotional Pricing</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Create Promotion</Button>
      </Box>
      <Grid container spacing={3}>
        {promos.map((promo) => (
          <Grid item xs={12} md={6} key={promo.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{promo.name}</Typography>
                <Typography variant="h4" color="primary.main">{promo.discount}% OFF</Typography>
                <Chip label={promo.status} color="success" size="small" sx={{ mt: 1 }} />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Valid until: {promo.validUntil}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Promotions;
