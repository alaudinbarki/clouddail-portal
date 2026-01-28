// Compliance & GDPR TypeScript interfaces and types

export interface ComplianceReport {
    id: string;
    type: 'gdpr' | 'ccpa' | 'pci_dss' | 'hipaa' | 'sox';
    period: string;
    startDate: string;
    endDate: string;
    status: 'compliant' | 'non_compliant' | 'pending_review';
    findings: ComplianceFinding[];
    recommendations: string[];
    generatedAt: string;
    generatedBy: string;
}

export interface ComplianceFinding {
    id: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    category: string;
    description: string;
    affectedRecords: number;
    remediation: string;
    status: 'open' | 'in_progress' | 'resolved';
}

export interface DataRetentionPolicy {
    id: string;
    name: string;
    dataType: 'user_data' | 'payment_data' | 'esim_data' | 'logs' | 'analytics';
    retentionPeriod: number; // days
    archiveAfter: number; // days
    deleteAfter: number; // days
    enabled: boolean;
    lastRun?: string;
    recordsProcessed?: number;
    createdAt: string;
    updatedAt: string;
}

export interface GDPRRequest {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction';
    status: 'pending' | 'in_progress' | 'completed' | 'rejected';
    requestDate: string;
    completedDate?: string;
    notes?: string;
    attachments?: string[];
}

export interface DataExportRequest {
    id: string;
    userId: string;
    format: 'json' | 'csv' | 'pdf';
    dataTypes: string[];
    status: 'pending' | 'processing' | 'completed' | 'failed';
    downloadUrl?: string;
    expiresAt?: string;
    requestedAt: string;
    completedAt?: string;
}

export interface ConsentRecord {
    id: string;
    userId: string;
    consentType: 'marketing' | 'analytics' | 'third_party' | 'cookies';
    granted: boolean;
    grantedAt?: string;
    revokedAt?: string;
    ipAddress: string;
    userAgent: string;
}

export interface PrivacySettings {
    userId: string;
    dataCollection: boolean;
    marketingEmails: boolean;
    analyticsTracking: boolean;
    thirdPartySharing: boolean;
    cookieConsent: boolean;
    updatedAt: string;
}

export interface DataBreachIncident {
    id: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    type: 'unauthorized_access' | 'data_leak' | 'malware' | 'phishing' | 'other';
    affectedUsers: number;
    affectedRecords: number;
    dataTypes: string[];
    discoveredAt: string;
    reportedAt?: string;
    resolvedAt?: string;
    status: 'investigating' | 'contained' | 'resolved';
    description: string;
    actions: string[];
}
