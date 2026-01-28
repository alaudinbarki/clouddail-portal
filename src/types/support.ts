// Support & Ticketing TypeScript interfaces and types

export interface Ticket {
    id: string;
    ticketNumber: string;
    userId: string;
    userName: string;
    userEmail: string;
    subject: string;
    description: string;
    category: TicketCategory;
    priority: TicketPriority;
    status: TicketStatus;
    assignedTo?: string;
    assignedToName?: string;
    tags: string[];
    attachments: Attachment[];
    messages: TicketMessage[];
    createdAt: string;
    updatedAt: string;
    resolvedAt?: string;
    closedAt?: string;
    satisfaction?: number; // 1-5 rating
    satisfactionComment?: string;
}

export type TicketCategory =
    | 'technical'
    | 'billing'
    | 'account'
    | 'esim'
    | 'general'
    | 'feature_request'
    | 'bug_report';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TicketStatus =
    | 'open'
    | 'in_progress'
    | 'waiting_customer'
    | 'waiting_internal'
    | 'resolved'
    | 'closed';

export interface TicketMessage {
    id: string;
    ticketId: string;
    senderId: string;
    senderName: string;
    senderType: 'user' | 'agent' | 'system';
    message: string;
    attachments: Attachment[];
    isInternal: boolean;
    createdAt: string;
}

export interface Attachment {
    id: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    fileUrl: string;
    uploadedAt: string;
}

export interface TicketQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: TicketStatus | 'all';
    category?: TicketCategory | 'all';
    priority?: TicketPriority | 'all';
    assignedTo?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface CreateTicketRequest {
    userId: string;
    subject: string;
    description: string;
    category: TicketCategory;
    priority: TicketPriority;
    attachments?: File[];
}

export interface TicketStats {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
    averageResolutionTime: number; // in hours
    satisfactionScore: number; // average 1-5
    byCategory: Record<TicketCategory, number>;
    byPriority: Record<TicketPriority, number>;
}

export interface KnowledgeBaseArticle {
    id: string;
    title: string;
    slug: string;
    content: string;
    category: string;
    tags: string[];
    views: number;
    helpful: number;
    notHelpful: number;
    status: 'draft' | 'published' | 'archived';
    author: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
    views: number;
    helpful: number;
    notHelpful: number;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

export interface SupportAgent {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status: 'online' | 'offline' | 'busy' | 'away';
    activeTickets: number;
    resolvedTickets: number;
    averageRating: number;
    specialties: TicketCategory[];
}
