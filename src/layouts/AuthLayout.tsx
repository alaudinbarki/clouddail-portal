import React from 'react';
import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                p: 2,
            }}
        >
            <Paper
                elevation={24}
                sx={{
                    maxWidth: 450,
                    width: '100%',
                    p: 4,
                    borderRadius: 3,
                }}
            >
                <Outlet />
            </Paper>
        </Box>
    );
};

export default AuthLayout;
