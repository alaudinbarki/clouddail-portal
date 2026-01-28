import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { ROUTES } from '../../config/routes';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

    // Show loading spinner while checking authentication
    if (isLoading) {
        return <LoadingSpinner fullScreen message="Checking authentication..." />;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    // Render children if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
