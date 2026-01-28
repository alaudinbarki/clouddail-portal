import axiosInstance from '../utils/axios';
import type {
    Ticket,
    TicketQueryParams,
    TicketStats,
    CreateTicketRequest,
    TicketMessage,
    KnowledgeBaseArticle,
    FAQ,
    SupportAgent,
} from '../types/support';
import type { PaginatedResponse } from '../types/user';

// Mock ticket data generator
const generateMockTickets = (count: number): Ticket[] => {
    const tickets: Ticket[] = [];
    const categories: Array<'technical' | 'billing' | 'account' | 'esim' | 'general'> =
        ['technical', 'billing', 'account', 'esim', 'general'];
    const priorities: Array<'low' | 'medium' | 'high' | 'urgent'> =
        ['low', 'medium', 'high', 'urgent'];
    const statuses: Array<'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed'> =
        ['open', 'in_progress', 'waiting_customer', 'resolved', 'closed'];

    for (let i = 1; i <= count; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const createdAt = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);

        tickets.push({
            id: `ticket-${i}`,
            ticketNumber: `TKT-${String(i).padStart(6, '0')}`,
            userId: `user-${Math.floor(Math.random() * 50) + 1}`,
            userName: `User ${Math.floor(Math.random() * 50) + 1}`,
            userEmail: `user${i}@example.com`,
            subject: `Support request #${i}`,
            description: `I need help with my eSIM activation. It's not working properly.`,
            category: categories[Math.floor(Math.random() * categories.length)],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            status,
            assignedTo: status !== 'open' ? `agent-${Math.floor(Math.random() * 5) + 1}` : undefined,
            assignedToName: status !== 'open' ? `Agent ${Math.floor(Math.random() * 5) + 1}` : undefined,
            tags: ['esim', 'activation'],
            attachments: [],
            messages: [],
            createdAt: createdAt.toISOString(),
            updatedAt: new Date().toISOString(),
            resolvedAt: status === 'resolved' || status === 'closed' ? new Date(createdAt.getTime() + 86400000).toISOString() : undefined,
            closedAt: status === 'closed' ? new Date(createdAt.getTime() + 172800000).toISOString() : undefined,
            satisfaction: status === 'closed' ? Math.floor(Math.random() * 2) + 4 : undefined,
        });
    }

    return tickets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const MOCK_TICKETS = generateMockTickets(100);

const MOCK_KB_ARTICLES: KnowledgeBaseArticle[] = [
    {
        id: 'kb-1',
        title: 'How to Activate Your eSIM',
        slug: 'how-to-activate-esim',
        content: 'Step-by-step guide to activate your eSIM...',
        category: 'Getting Started',
        tags: ['esim', 'activation', 'setup'],
        views: 1250,
        helpful: 98,
        notHelpful: 5,
        status: 'published',
        author: 'Support Team',
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'kb-2',
        title: 'Troubleshooting Connection Issues',
        slug: 'troubleshooting-connection',
        content: 'Common connection issues and how to fix them...',
        category: 'Troubleshooting',
        tags: ['connection', 'troubleshooting', 'network'],
        views: 890,
        helpful: 75,
        notHelpful: 8,
        status: 'published',
        author: 'Support Team',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

const MOCK_FAQS: FAQ[] = [
    {
        id: 'faq-1',
        question: 'What is an eSIM?',
        answer: 'An eSIM is a digital SIM that allows you to activate a cellular plan without using a physical SIM card.',
        category: 'General',
        order: 1,
        views: 2500,
        helpful: 200,
        notHelpful: 10,
        status: 'active',
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'faq-2',
        question: 'How do I check my data usage?',
        answer: 'You can check your data usage in the dashboard under the eSIM details section.',
        category: 'Usage',
        order: 2,
        views: 1800,
        helpful: 150,
        notHelpful: 5,
        status: 'active',
        createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

class SupportService {
    /**
     * Get tickets
     */
    async getTickets(params: TicketQueryParams = {}): Promise<PaginatedResponse<Ticket>> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<PaginatedResponse<Ticket>>('/tickets', { params });
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    let filteredTickets = [...MOCK_TICKETS];

                    // Apply search filter
                    if (params.search) {
                        const search = params.search.toLowerCase();
                        filteredTickets = filteredTickets.filter(
                            (ticket) =>
                                ticket.ticketNumber.toLowerCase().includes(search) ||
                                ticket.subject.toLowerCase().includes(search) ||
                                ticket.userName.toLowerCase().includes(search)
                        );
                    }

                    // Apply status filter
                    if (params.status && params.status !== 'all') {
                        filteredTickets = filteredTickets.filter((ticket) => ticket.status === params.status);
                    }

                    // Apply category filter
                    if (params.category && params.category !== 'all') {
                        filteredTickets = filteredTickets.filter((ticket) => ticket.category === params.category);
                    }

                    // Apply priority filter
                    if (params.priority && params.priority !== 'all') {
                        filteredTickets = filteredTickets.filter((ticket) => ticket.priority === params.priority);
                    }

                    // Apply pagination
                    const page = params.page || 1;
                    const pageSize = params.pageSize || 10;
                    const startIndex = (page - 1) * pageSize;
                    const endIndex = startIndex + pageSize;
                    const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

                    resolve({
                        data: paginatedTickets,
                        total: filteredTickets.length,
                        page,
                        pageSize,
                        totalPages: Math.ceil(filteredTickets.length / pageSize),
                    });
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to fetch tickets');
        }
    }

    /**
     * Get ticket by ID
     */
    async getTicketById(id: string): Promise<Ticket> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<Ticket>(`/tickets/${id}`);
            // return response.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const ticket = MOCK_TICKETS.find((t) => t.id === id);
                    if (ticket) {
                        resolve(ticket);
                    } else {
                        reject(new Error('Ticket not found'));
                    }
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch ticket');
        }
    }

    /**
     * Create ticket
     */
    async createTicket(request: CreateTicketRequest): Promise<Ticket> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.post<Ticket>('/tickets', request);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const newTicket: Ticket = {
                        id: `ticket-${MOCK_TICKETS.length + 1}`,
                        ticketNumber: `TKT-${String(MOCK_TICKETS.length + 1).padStart(6, '0')}`,
                        userId: request.userId,
                        userName: `User ${request.userId}`,
                        userEmail: 'user@example.com',
                        subject: request.subject,
                        description: request.description,
                        category: request.category,
                        priority: request.priority,
                        status: 'open',
                        tags: [],
                        attachments: [],
                        messages: [],
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };

                    MOCK_TICKETS.unshift(newTicket);
                    resolve(newTicket);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to create ticket');
        }
    }

    /**
     * Update ticket
     */
    async updateTicket(id: string, data: Partial<Ticket>): Promise<Ticket> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.patch<Ticket>(`/tickets/${id}`, data);
            // return response.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const ticketIndex = MOCK_TICKETS.findIndex((t) => t.id === id);
                    if (ticketIndex !== -1) {
                        MOCK_TICKETS[ticketIndex] = {
                            ...MOCK_TICKETS[ticketIndex],
                            ...data,
                            updatedAt: new Date().toISOString(),
                        };
                        resolve(MOCK_TICKETS[ticketIndex]);
                    } else {
                        reject(new Error('Ticket not found'));
                    }
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to update ticket');
        }
    }

    /**
     * Get ticket statistics
     */
    async getTicketStats(): Promise<TicketStats> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<TicketStats>('/tickets/stats');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const byCategory: any = {};
                    const byPriority: any = {};

                    MOCK_TICKETS.forEach((ticket) => {
                        byCategory[ticket.category] = (byCategory[ticket.category] || 0) + 1;
                        byPriority[ticket.priority] = (byPriority[ticket.priority] || 0) + 1;
                    });

                    const resolvedTickets = MOCK_TICKETS.filter((t) => t.resolvedAt);
                    const avgResolutionTime = resolvedTickets.length > 0
                        ? resolvedTickets.reduce((sum, t) => {
                            const created = new Date(t.createdAt).getTime();
                            const resolved = new Date(t.resolvedAt!).getTime();
                            return sum + (resolved - created) / (1000 * 60 * 60);
                        }, 0) / resolvedTickets.length
                        : 0;

                    const satisfactionScores = MOCK_TICKETS.filter((t) => t.satisfaction).map((t) => t.satisfaction!);
                    const avgSatisfaction = satisfactionScores.length > 0
                        ? satisfactionScores.reduce((sum, s) => sum + s, 0) / satisfactionScores.length
                        : 0;

                    resolve({
                        total: MOCK_TICKETS.length,
                        open: MOCK_TICKETS.filter((t) => t.status === 'open').length,
                        inProgress: MOCK_TICKETS.filter((t) => t.status === 'in_progress').length,
                        resolved: MOCK_TICKETS.filter((t) => t.status === 'resolved').length,
                        closed: MOCK_TICKETS.filter((t) => t.status === 'closed').length,
                        averageResolutionTime: avgResolutionTime,
                        satisfactionScore: avgSatisfaction,
                        byCategory,
                        byPriority,
                    });
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch ticket stats');
        }
    }

    /**
     * Get knowledge base articles
     */
    async getKBArticles(): Promise<KnowledgeBaseArticle[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<KnowledgeBaseArticle[]>('/kb/articles');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_KB_ARTICLES);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch KB articles');
        }
    }

    /**
     * Get FAQs
     */
    async getFAQs(): Promise<FAQ[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<FAQ[]>('/faqs');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_FAQS);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch FAQs');
        }
    }
}

export default new SupportService();
