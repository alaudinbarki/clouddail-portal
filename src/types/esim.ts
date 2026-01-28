// eSIM Management TypeScript interfaces and types

export interface eSIM {
    id: string;
    iccid: string;
    userId: string;
    userName: string;
    userEmail: string;
    planId: string;
    planName: string;
    status: eSIMStatus;
    region: string;
    dataLimit: number; // in MB
    dataUsed: number; // in MB
    activatedAt?: string;
    expiresAt?: string;
    createdAt: string;
    updatedAt: string;
}

export type eSIMStatus = 'available' | 'active' | 'suspended' | 'expired' | 'cancelled';

export interface DataUsage {
    date: string;
    upload: number; // in MB
    download: number; // in MB
    total: number; // in MB
}

export interface eSIMStats {
    total: number;
    active: number;
    available: number;
    suspended: number;
    expired: number;
    cancelled: number;
    totalDataUsed: number; // in GB
    totalDataLimit: number; // in GB
    usagePercentage: number;
}

export interface eSIMQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: eSIMStatus | 'all';
    region?: string;
    userId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface ProvisionRequest {
    userId: string;
    planId: string;
    region: string;
    activationDate?: string;
    sendEmail?: boolean;
}

export interface UsageAlert {
    id: string;
    esimId: string;
    type: 'high_usage' | 'expiring_soon' | 'expired' | 'limit_reached';
    message: string;
    threshold?: number;
    createdAt: string;
}

export interface RegionStats {
    region: string;
    totaleSIMs: number;
    activeeSIMs: number;
    dataUsed: number;
}
