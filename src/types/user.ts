// User Management TypeScript interfaces and types

export type UserRole = 'super_admin' | 'admin' | 'support' | 'user' | 'viewer';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export type KYCStatus = 'pending' | 'verified' | 'rejected' | 'not_submitted';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
    role: UserRole;
    status: UserStatus;
    kycStatus: KYCStatus;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
    totalSpent: number;
    activeESIMs: number;
    totalPurchases: number;
    country?: string;
    city?: string;
}

export interface KYCDocument {
    id: string;
    userId: string;
    type: 'passport' | 'drivers_license' | 'national_id' | 'proof_of_address';
    status: 'pending' | 'approved' | 'rejected';
    fileUrl: string;
    fileName: string;
    fileSize: number;
    submittedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    rejectionReason?: string;
}

export interface UserQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: UserStatus | 'all';
    role?: UserRole | 'all';
    kycStatus?: KYCStatus | 'all';
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    startDate?: string;
    endDate?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface UserActivity {
    id: string;
    userId: string;
    type: 'login' | 'purchase' | 'esim_activation' | 'profile_update' | 'kyc_submission';
    description: string;
    timestamp: string;
    metadata?: Record<string, any>;
}

export interface Purchase {
    id: string;
    userId: string;
    planId: string;
    planName: string;
    amount: number;
    currency: string;
    status: 'completed' | 'pending' | 'failed' | 'refunded';
    paymentMethod: string;
    createdAt: string;
    esimId?: string;
}

export interface BanUserRequest {
    userId: string;
    reason: string;
    duration?: number; // in days, undefined = permanent
    bannedBy: string;
}

export interface UserStats {
    total: number;
    active: number;
    inactive: number;
    suspended: number;
    verified: number;
    pending: number;
    totalUsers: number;
    activeUsers: number;
    newUsersToday: number;
    newUsersThisWeek: number;
    newUsersThisMonth: number;
    pendingKYC: number;
    bannedUsers: number;
}
