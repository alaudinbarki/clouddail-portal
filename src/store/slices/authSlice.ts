import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../config/constants';
import authService from '../../services/authService';
import type { User, LoginCredentials } from '../../types/auth';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
    isAuthenticated: !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
    isLoading: false,
    error: null,
};

// Async thunk for login
export const loginAsync = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);

            // Store tokens in localStorage
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
            if (response.refreshToken) {
                localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
            }
            localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));

            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

// Async thunk for logout
export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
            return null;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, action.payload.token);
            localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_DATA);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(state.user));
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            });

        // Logout
        builder
            .addCase(logoutAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCredentials, logout, updateUser, clearError } = authSlice.actions;
export default authSlice.reducer;
