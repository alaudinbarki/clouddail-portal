// @ts-nocheck
/* eslint-disable */
// TODO: Install vitest and testing dependencies with: npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom --legacy-peer-deps
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, userEvent } from '../../utils/test-utils';
import Login from '../Login';

describe('Login Component', () => {
    it('should render login form', () => {
        renderWithProviders(<Login />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should show validation errors for empty fields', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Login />);

        const submitButton = screen.getByRole('button', { name: /sign in/i });
        await user.click(submitButton);

        expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    });

    it('should show validation error for invalid email', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Login />);

        const emailInput = screen.getByLabelText(/email/i);
        await user.type(emailInput, 'invalid-email');

        const submitButton = screen.getByRole('button', { name: /sign in/i });
        await user.click(submitButton);

        expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
    });

    it('should toggle password visibility', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Login />);

        const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
        expect(passwordInput.type).toBe('password');

        const toggleButton = screen.getByLabelText(/toggle password visibility/i);
        await user.click(toggleButton);

        expect(passwordInput.type).toBe('text');
    });
});
