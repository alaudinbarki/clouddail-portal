import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginAsync, logoutAsync, updateUser, clearError } from '../store/slices/authSlice';
import type { LoginCredentials, User } from '../types/auth';
import { ROUTES } from '../config/routes';

/**
 * Custom hook for authentication operations
 */
export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

    /**
     * Login user
     */
    const login = useCallback(
        async (credentials: LoginCredentials) => {
            try {
                await dispatch(loginAsync(credentials)).unwrap();
                navigate(ROUTES.DASHBOARD);
            } catch (error) {
                // Error is handled by Redux
                console.error('Login failed:', error);
            }
        },
        [dispatch, navigate]
    );

    /**
     * Logout user
     */
    const logout = useCallback(async () => {
        try {
            await dispatch(logoutAsync()).unwrap();
            navigate(ROUTES.LOGIN);
        } catch (error) {
            // Error is handled by Redux
            console.error('Logout failed:', error);
        }
    }, [dispatch, navigate]);

    /**
     * Update user profile
     */
    const updateProfile = useCallback(
        (data: Partial<User>) => {
            dispatch(updateUser(data));
        },
        [dispatch]
    );

    /**
     * Clear authentication error
     */
    const clearAuthError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        updateProfile,
        clearAuthError,
    };
};
