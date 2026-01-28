import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { usePermissions } from '../../hooks/usePermissions';
import type { UserRole } from '../../types/auth';

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: UserRole | UserRole[];
    fallback?: React.ReactNode;
}

/**
 * Role Guard Component
 * Restricts access based on user roles
 */
const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles, fallback }) => {
    const { hasRole } = usePermissions();

    // Check if user has required role
    if (!hasRole(allowedRoles)) {
        // Show custom fallback or default access denied page
        if (fallback) {
            return <>{fallback}</>;
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    p: 3,
                }}
            >
                <Paper
                    sx={{
                        p: 4,
                        maxWidth: 500,
                        textAlign: 'center',
                    }}
                >
                    <LockOutlined sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Access Denied
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        You don't have permission to access this page. Please contact your administrator if
                        you believe this is an error.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => window.history.back()}
                        sx={{ mt: 2 }}
                    >
                        Go Back
                    </Button>
                </Paper>
            </Box>
        );
    }

    // Render children if user has required role
    return <>{children}</>;
};

export default RoleGuard;
