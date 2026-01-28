import axiosInstance from '../utils/axios';
import {
    User,
    AuthResponse,
    LoginCredentials,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    TokenResponse,
    USER_ROLES,
    USER_STATUSES,
} from '../types/auth';
import { STORAGE_KEYS } from '../config/constants';

// Mock user data for development
const MOCK_USER: User = {
    id: '1',
    email: 'admin@esimadmin.com',
    firstName: 'Admin',
    lastName: 'User',
    role: USER_ROLES.SUPER_ADMIN,
    status: USER_STATUSES.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
};

// Mock credentials
const MOCK_CREDENTIALS = {
    email: 'admin@esimadmin.com',
    password: 'admin123',
};

class AuthService {
    /**
     * Login user with email and password
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
            // return response.data;

            // Mock authentication for development
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (
                        credentials.email === MOCK_CREDENTIALS.email &&
                        credentials.password === MOCK_CREDENTIALS.password
                    ) {
                        const authResponse: AuthResponse = {
                            user: MOCK_USER,
                            token: 'mock-jwt-token-' + Date.now(),
                            refreshToken: 'mock-refresh-token-' + Date.now(),
                            expiresIn: 3600, // 1 hour
                        };
                        resolve(authResponse);
                    } else {
                        reject({
                            response: {
                                data: {
                                    code: 'INVALID_CREDENTIALS',
                                    message: 'Invalid email or password',
                                },
                            },
                        });
                    }
                }, 1000); // Simulate network delay
            });
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // await axiosInstance.post('/auth/logout');

            // Clear local storage
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_DATA);

            return Promise.resolve();
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Refresh authentication token
     */
    async refreshToken(): Promise<TokenResponse> {
        try {
            const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            // TODO: Replace with actual API call when backend is ready
            // const response = await axiosInstance.post<TokenResponse>('/auth/refresh', {
            //   refreshToken,
            // });
            // return response.data;

            // Mock token refresh
            return Promise.resolve({
                token: 'mock-jwt-token-refreshed-' + Date.now(),
                refreshToken: 'mock-refresh-token-refreshed-' + Date.now(),
                expiresIn: 3600,
            });
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Request password reset
     */
    async forgotPassword(request: ForgotPasswordRequest): Promise<void> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // await axiosInstance.post('/auth/forgot-password', request);

            // Mock forgot password
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Password reset email sent to:', request.email);
                    resolve();
                }, 1000);
            });
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Reset password with token
     */
    async resetPassword(request: ResetPasswordRequest): Promise<void> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // await axiosInstance.post('/auth/reset-password', request);

            // Mock password reset
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (request.token === 'valid-reset-token') {
                        resolve();
                    } else {
                        reject({
                            response: {
                                data: {
                                    code: 'INVALID_TOKEN',
                                    message: 'Invalid or expired reset token',
                                },
                            },
                        });
                    }
                }, 1000);
            });
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get current authenticated user
     */
    async getCurrentUser(): Promise<User> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await axiosInstance.get<User>('/auth/me');
            // return response.data;

            // Mock get current user
            const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
            if (userData) {
                return Promise.resolve(JSON.parse(userData));
            }
            return Promise.resolve(MOCK_USER);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Update user profile
     */
    async updateProfile(data: Partial<User>): Promise<User> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await axiosInstance.patch<User>('/auth/profile', data);
            // return response.data;

            // Mock update profile
            const currentUser = await this.getCurrentUser();
            const updatedUser = { ...currentUser, ...data, updatedAt: new Date().toISOString() };
            localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
            return Promise.resolve(updatedUser);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Handle API errors
     */
    private handleError(error: any): Error {
        if (error.response?.data?.message) {
            return new Error(error.response.data.message);
        }
        if (error.message) {
            return new Error(error.message);
        }
        return new Error('An unexpected error occurred');
    }
}

export default new AuthService();
