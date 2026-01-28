import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../config/constants';

interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
}

interface UIState {
    themeMode: 'light' | 'dark';
    sidebarOpen: boolean;
    notifications: Notification[];
    isLoading: boolean;
    loadingMessage?: string;
}

const getInitialTheme = (): 'light' | 'dark' => {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME_MODE);
    return (stored as 'light' | 'dark') || 'light';
};

const getInitialSidebarState = (): boolean => {
    const stored = localStorage.getItem(STORAGE_KEYS.SIDEBAR_STATE);
    return stored ? JSON.parse(stored) : true;
};

const initialState: UIState = {
    themeMode: getInitialTheme(),
    sidebarOpen: getInitialSidebarState(),
    notifications: [],
    isLoading: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
            localStorage.setItem(STORAGE_KEYS.THEME_MODE, state.themeMode);
        },
        setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.themeMode = action.payload;
            localStorage.setItem(STORAGE_KEYS.THEME_MODE, action.payload);
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
            localStorage.setItem(STORAGE_KEYS.SIDEBAR_STATE, JSON.stringify(state.sidebarOpen));
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
            localStorage.setItem(STORAGE_KEYS.SIDEBAR_STATE, JSON.stringify(action.payload));
        },
        addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
            const notification: Notification = {
                ...action.payload,
                id: Date.now().toString(),
            };
            state.notifications.push(notification);
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (n) => n.id !== action.payload
            );
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
        setGlobalLoading: (state, action: PayloadAction<{ isLoading: boolean; message?: string }>) => {
            state.isLoading = action.payload.isLoading;
            state.loadingMessage = action.payload.message;
        },
    },
});

export const {
    toggleTheme,
    setThemeMode,
    toggleSidebar,
    setSidebarOpen,
    addNotification,
    removeNotification,
    clearNotifications,
    setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
