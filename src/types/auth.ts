// Authentication TypeScript interfaces and types

export type UserRole = 'super_admin' | 'admin' | 'support' | 'viewer';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

// Role constants for easy access
export const USER_ROLES = {
    SUPER_ADMIN: 'super_admin' as UserRole,
    ADMIN: 'admin' as UserRole,
    SUPPORT: 'support' as UserRole,
    VIEWER: 'viewer' as UserRole,
} as const;

export const USER_STATUSES = {
    ACTIVE: 'active' as UserStatus,
    INACTIVE: 'inactive' as UserStatus,
    SUSPENDED: 'suspended' as UserStatus,
    PENDING: 'pending' as UserStatus,
} as const;

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    status: UserStatus;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
    expiresIn: number;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface TokenResponse {
    token: string;
    refreshToken?: string;
    expiresIn: number;
}

export interface AuthError {
    code: string;
    message: string;
    field?: string;
}
