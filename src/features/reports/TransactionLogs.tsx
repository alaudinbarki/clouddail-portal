import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

const TransactionLogs: React.FC = () => {
  const logs = [
    { id: 'TXN-001', user: 'John Doe', amount: 49.99, status: 'success', timestamp: new Date().toISOString() },
    { id: 'TXN-002', user: 'Jane Smith', amount: 99.99, status: 'success', timestamp: new Date().toISOString() },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Transaction Logs</Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.id}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>${log.amount}</TableCell>
                  <TableCell><Chip label={log.status} color="success" size="small" /></TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TransactionLogs;
