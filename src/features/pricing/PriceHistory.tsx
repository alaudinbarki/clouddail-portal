import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const PriceHistory: React.FC = () => {
  const history = [
    { date: '2024-06-01', plan: 'Global 5GB', oldPrice: 45, newPrice: 49.99, changedBy: 'Admin' },
    { date: '2024-05-15', plan: 'Europe 10GB', oldPrice: 95, newPrice: 99.99, changedBy: 'Admin' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Price History</Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Old Price</TableCell>
                <TableCell>New Price</TableCell>
                <TableCell>Changed By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.plan}</TableCell>
                  <TableCell>${item.oldPrice}</TableCell>
                  <TableCell>${item.newPrice}</TableCell>
                  <TableCell>{item.changedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PriceHistory;
