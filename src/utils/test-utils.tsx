// Test Utilities and Helpers

import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import authReducer from '../store/slices/authSlice';
import uiReducer from '../store/slices/uiSlice';
import { lightTheme } from '../config/theme';

/**
 * Create a test store with initial state
 */
export function createTestStore(preloadedState = {}) {
    return configureStore({
        reducer: {
            auth: authReducer,
            ui: uiReducer,
        },
        preloadedState,
    });
}

/**
 * Custom render function with providers
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    preloadedState?: any;
    store?: ReturnType<typeof createTestStore>;
}

export function renderWithProviders(
    ui: ReactElement,
    {
        preloadedState = {},
        store = createTestStore(preloadedState),
        ...renderOptions
    }: CustomRenderOptions = {}
) {
    function Wrapper({ children }: { children: React.ReactNode }) {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={lightTheme}>
                        {children}
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

/**
 * Wait for async operations
 */
export const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Mock localStorage
 */
export const mockLocalStorage = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

/**
 * Mock API response
 */
export function mockApiResponse<T>(data: T, delay = 100): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), delay);
    });
}

/**
 * Mock API error
 */
export function mockApiError(message: string, delay = 100): Promise<never> {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error(message)), delay);
    });
}

// Re-export everything from testing library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
