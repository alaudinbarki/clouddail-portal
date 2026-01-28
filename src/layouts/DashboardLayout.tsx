import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const DashboardLayout: React.FC = () => {

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Header />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 2.5, md: 3 },
                    mt: '64px', // AppBar height
                    backgroundColor: 'background.default',
                    minHeight: 'calc(100vh - 64px)',
                    width: '100%',
                    overflow: 'auto',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
