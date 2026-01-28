import axiosInstance from '../utils/axios';
import type {
    eSIM,
    eSIMQueryParams,
    eSIMStats,
    DataUsage,
    ProvisionRequest,
    RegionStats,
} from '../types/esim';
import type { PaginatedResponse } from '../types/user';

// Mock eSIM data generator
const generateMockeSIMs = (count: number): eSIM[] => {
    const esims: eSIM[] = [];
    const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'];
    const countries = ['USA', 'UK', 'Germany', 'Japan', 'Brazil', 'Australia'];
    const plans = ['Basic 1GB', 'Standard 5GB', 'Premium 10GB', 'Unlimited'];
    const statuses: Array<'available' | 'active' | 'suspended' | 'expired' | 'cancelled'> =
        ['available', 'active', 'suspended', 'expired', 'cancelled'];

    for (let i = 1; i <= count; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const dataLimit = [1024, 5120, 10240, 51200][Math.floor(Math.random() * 4)]; // MB
        const dataUsed = status === 'active' ? Math.floor(Math.random() * dataLimit) : 0;
        const isActive = status === 'active';

        esims.push({
            id: `esim-${i}`,
            iccid: `89014103${String(i).padStart(12, '0')}`,
            userId: isActive ? `user-${Math.floor(Math.random() * 50) + 1}` : undefined,
            userName: isActive ? `User ${Math.floor(Math.random() * 50) + 1}` : undefined,
            planId: `plan-${Math.floor(Math.random() * 4) + 1}`,
            planName: plans[Math.floor(Math.random() * plans.length)],
            status,
            activatedAt: isActive ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
            expiresAt: isActive ? new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString() : undefined,
            dataLimit,
            dataUsed,
            qrCode: `LPA:1$smdp.example.com$ACTIVATION-CODE-${i}`,
            activationCode: `ACTIVATION-CODE-${i}`,
            region: regions[Math.floor(Math.random() * regions.length)],
            country: countries[Math.floor(Math.random() * countries.length)],
            provider: Math.random() > 0.5 ? 'twilio' : 'other',
            createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        });
    }

    return esims;
};

const MOCK_ESIMS = generateMockeSIMs(100);

class eSIMService {
    /**
     * Get paginated list of eSIMs with filtering
     */
    async geteSIMs(params: eSIMQueryParams = {}): Promise<PaginatedResponse<eSIM>> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<PaginatedResponse<eSIM>>('/esims', { params });
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    let filteredeSIMs = [...MOCK_ESIMS];

                    // Apply search filter
                    if (params.search) {
                        const search = params.search.toLowerCase();
                        filteredeSIMs = filteredeSIMs.filter(
                            (esim) =>
                                esim.iccid.toLowerCase().includes(search) ||
                                esim.planName.toLowerCase().includes(search) ||
                                esim.userName?.toLowerCase().includes(search)
                        );
                    }

                    // Apply status filter
                    if (params.status && params.status !== 'all') {
                        filteredeSIMs = filteredeSIMs.filter((esim) => esim.status === params.status);
                    }

                    // Apply region filter
                    if (params.region) {
                        filteredeSIMs = filteredeSIMs.filter((esim) => esim.region === params.region);
                    }

                    // Apply user filter
                    if (params.userId) {
                        filteredeSIMs = filteredeSIMs.filter((esim) => esim.userId === params.userId);
                    }

                    // Apply sorting
                    if (params.sortBy) {
                        filteredeSIMs.sort((a, b) => {
                            const aValue = a[params.sortBy as keyof eSIM];
                            const bValue = b[params.sortBy as keyof eSIM];
                            const order = params.sortOrder === 'desc' ? -1 : 1;
                            return aValue > bValue ? order : -order;
                        });
                    }

                    // Apply pagination
                    const page = params.page || 1;
                    const pageSize = params.pageSize || 10;
                    const startIndex = (page - 1) * pageSize;
                    const endIndex = startIndex + pageSize;
                    const paginatedeSIMs = filteredeSIMs.slice(startIndex, endIndex);

                    resolve({
                        data: paginatedeSIMs,
                        total: filteredeSIMs.length,
                        page,
                        pageSize,
                        totalPages: Math.ceil(filteredeSIMs.length / pageSize),
                    });
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to fetch eSIMs');
        }
    }

    /**
     * Get eSIM by ID
     */
    async geteSIMById(id: string): Promise<eSIM> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<eSIM>(`/esims/${id}`);
            // return response.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const esim = MOCK_ESIMS.find((e) => e.id === id);
                    if (esim) {
                        resolve(esim);
                    } else {
                        reject(new Error('eSIM not found'));
                    }
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch eSIM');
        }
    }

    /**
     * Provision new eSIM
     */
    async provisioneSIM(request: ProvisionRequest): Promise<eSIM> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.post<eSIM>('/esims/provision', request);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const neweSIM: eSIM = {
                        id: `esim-${MOCK_ESIMS.length + 1}`,
                        iccid: `89014103${String(MOCK_ESIMS.length + 1).padStart(12, '0')}`,
                        userId: request.userId,
                        userName: `User ${request.userId}`,
                        planId: request.planId,
                        planName: 'Standard 5GB',
                        status: 'active',
                        activatedAt: request.activationDate || new Date().toISOString(),
                        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                        dataLimit: 5120,
                        dataUsed: 0,
                        qrCode: `LPA:1$smdp.example.com$ACTIVATION-CODE-${MOCK_ESIMS.length + 1}`,
                        activationCode: `ACTIVATION-CODE-${MOCK_ESIMS.length + 1}`,
                        region: request.region,
                        country: 'USA',
                        provider: 'twilio',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };
                    MOCK_ESIMS.push(neweSIM);
                    resolve(neweSIM);
                }, 1000);
            });
        } catch (error) {
            throw new Error('Failed to provision eSIM');
        }
    }

    /**
     * Suspend eSIM
     */
    async suspendeSIM(id: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.post(`/esims/${id}/suspend`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    const esimIndex = MOCK_ESIMS.findIndex((e) => e.id === id);
                    if (esimIndex !== -1) {
                        MOCK_ESIMS[esimIndex].status = 'suspended';
                        MOCK_ESIMS[esimIndex].updatedAt = new Date().toISOString();
                    }
                    resolve();
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to suspend eSIM');
        }
    }

    /**
     * Reactivate eSIM
     */
    async reactivateeSIM(id: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.post(`/esims/${id}/reactivate`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    const esimIndex = MOCK_ESIMS.findIndex((e) => e.id === id);
                    if (esimIndex !== -1) {
                        MOCK_ESIMS[esimIndex].status = 'active';
                        MOCK_ESIMS[esimIndex].updatedAt = new Date().toISOString();
                    }
                    resolve();
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to reactivate eSIM');
        }
    }

    /**
     * Cancel eSIM
     */
    async canceleSIM(id: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.post(`/esims/${id}/cancel`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    const esimIndex = MOCK_ESIMS.findIndex((e) => e.id === id);
                    if (esimIndex !== -1) {
                        MOCK_ESIMS[esimIndex].status = 'cancelled';
                        MOCK_ESIMS[esimIndex].updatedAt = new Date().toISOString();
                    }
                    resolve();
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to cancel eSIM');
        }
    }

    /**
     * Get data usage for eSIM
     */
    async getDataUsage(id: string, days: number = 30): Promise<DataUsage[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<DataUsage[]>(`/esims/${id}/usage`, { params: { days } });
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const usage: DataUsage[] = [];
                    for (let i = days - 1; i >= 0; i--) {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        const upload = Math.floor(Math.random() * 100);
                        const download = Math.floor(Math.random() * 500);
                        usage.push({
                            date: date.toISOString().split('T')[0],
                            upload,
                            download,
                            total: upload + download,
                        });
                    }
                    resolve(usage);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch data usage');
        }
    }

    /**
     * Get eSIM statistics
     */
    async geteSIMStats(): Promise<eSIMStats> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<eSIMStats>('/esims/stats');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const stats = MOCK_ESIMS.reduce(
                        (acc, esim) => {
                            acc.total++;
                            acc[esim.status]++;
                            acc.totalDataUsed += esim.dataUsed;
                            acc.totalDataLimit += esim.dataLimit;
                            return acc;
                        },
                        {
                            total: 0,
                            active: 0,
                            available: 0,
                            suspended: 0,
                            expired: 0,
                            cancelled: 0,
                            totalDataUsed: 0,
                            totalDataLimit: 0,
                            usagePercentage: 0,
                        }
                    );

                    stats.totalDataUsed = stats.totalDataUsed / 1024; // Convert to GB
                    stats.totalDataLimit = stats.totalDataLimit / 1024; // Convert to GB
                    stats.usagePercentage = (stats.totalDataUsed / stats.totalDataLimit) * 100;

                    resolve(stats);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch eSIM stats');
        }
    }

    /**
     * Generate QR code for eSIM
     */
    async generateQRCode(id: string): Promise<string> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<{ qrCode: string }>(`/esims/${id}/qrcode`);
            // return response.data.qrCode;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const esim = MOCK_ESIMS.find((e) => e.id === id);
                    if (esim) {
                        resolve(esim.qrCode);
                    } else {
                        reject(new Error('eSIM not found'));
                    }
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to generate QR code');
        }
    }
}

export default new eSIMService();
