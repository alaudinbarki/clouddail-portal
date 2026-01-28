import axiosInstance from '../utils/axios';
import type {
    User,
    UserQueryParams,
    PaginatedResponse,
    KYCDocument,
    BanUserRequest,
    UserActivity,
    Purchase,
    UserStats,
} from '../types/user';
import { USER_ROLES, USER_STATUSES } from '../types/auth';

// Mock user data generator
const generateMockUsers = (count: number): User[] => {
    const users: User[] = [];
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Maria'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 'Japan', 'Brazil'];
    const cities = ['New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Paris', 'Madrid', 'Rome', 'Tokyo', 'São Paulo'];

    for (let i = 1; i <= count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const kycStatuses: Array<'pending' | 'verified' | 'rejected' | 'not_submitted'> = ['pending', 'verified', 'rejected', 'not_submitted'];

        users.push({
            id: `user-${i}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
            firstName,
            lastName,
            phone: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
            role: i <= 2 ? USER_ROLES.ADMIN : i <= 5 ? USER_ROLES.SUPPORT : USER_ROLES.VIEWER,
            status: i % 10 === 0 ? USER_STATUSES.SUSPENDED : USER_STATUSES.ACTIVE,
            kycStatus: kycStatuses[Math.floor(Math.random() * kycStatuses.length)],
            createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            lastLogin: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
            totalSpent: Math.floor(Math.random() * 5000),
            activeESIMs: Math.floor(Math.random() * 5),
            totalPurchases: Math.floor(Math.random() * 20),
            country: countries[Math.floor(Math.random() * countries.length)],
            city: cities[Math.floor(Math.random() * cities.length)],
        });
    }

    return users;
};

const MOCK_USERS = generateMockUsers(50);

class UserService {
    /**
     * Get paginated list of users with filtering
     */
    async getUsers(params: UserQueryParams = {}): Promise<PaginatedResponse<User>> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<PaginatedResponse<User>>('/users', { params });
            // return response.data;

            // Mock implementation
            return new Promise((resolve) => {
                setTimeout(() => {
                    let filteredUsers = [...MOCK_USERS];

                    // Apply search filter
                    if (params.search) {
                        const search = params.search.toLowerCase();
                        filteredUsers = filteredUsers.filter(
                            (user) =>
                                user.firstName.toLowerCase().includes(search) ||
                                user.lastName.toLowerCase().includes(search) ||
                                user.email.toLowerCase().includes(search)
                        );
                    }

                    // Apply status filter
                    if (params.status && params.status !== 'all') {
                        filteredUsers = filteredUsers.filter((user) => user.status === params.status);
                    }

                    // Apply role filter
                    if (params.role && params.role !== 'all') {
                        filteredUsers = filteredUsers.filter((user) => user.role === params.role);
                    }

                    // Apply KYC status filter
                    if (params.kycStatus && params.kycStatus !== 'all') {
                        filteredUsers = filteredUsers.filter((user) => user.kycStatus === params.kycStatus);
                    }

                    // Apply sorting
                    if (params.sortBy) {
                        filteredUsers.sort((a, b) => {
                            const aValue = a[params.sortBy as keyof User];
                            const bValue = b[params.sortBy as keyof User];
                            if (aValue === undefined || bValue === undefined) return 0;
                            const order = params.sortOrder === 'desc' ? -1 : 1;
                            return aValue > bValue ? order : -order;
                        });
                    }

                    // Apply pagination
                    const page = params.page || 1;
                    const pageSize = params.pageSize || 10;
                    const startIndex = (page - 1) * pageSize;
                    const endIndex = startIndex + pageSize;
                    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

                    resolve({
                        data: paginatedUsers,
                        total: filteredUsers.length,
                        page,
                        pageSize,
                        totalPages: Math.ceil(filteredUsers.length / pageSize),
                    });
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }

    /**
     * Get user by ID
     */
    async getUserById(id: string): Promise<User> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<User>(`/users/${id}`);
            // return response.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const user = MOCK_USERS.find((u) => u.id === id);
                    if (user) {
                        resolve(user);
                    } else {
                        reject(new Error('User not found'));
                    }
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch user');
        }
    }

    /**
     * Update user
     */
    async updateUser(id: string, data: Partial<User>): Promise<User> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.patch<User>(`/users/${id}`, data);
            // return response.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const userIndex = MOCK_USERS.findIndex((u) => u.id === id);
                    if (userIndex !== -1) {
                        MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...data, updatedAt: new Date().toISOString() };
                        resolve(MOCK_USERS[userIndex]);
                    } else {
                        reject(new Error('User not found'));
                    }
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to update user');
        }
    }

    /**
     * Ban user
     */
    async banUser(request: BanUserRequest): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.post(`/users/${request.userId}/ban`, request);

            return new Promise((resolve) => {
                setTimeout(() => {
                    const userIndex = MOCK_USERS.findIndex((u) => u.id === request.userId);
                    if (userIndex !== -1) {
                        MOCK_USERS[userIndex].status = USER_STATUSES.SUSPENDED;
                    }
                    resolve();
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to ban user');
        }
    }

    /**
     * Unban user
     */
    async unbanUser(userId: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.post(`/users/${userId}/unban`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId);
                    if (userIndex !== -1) {
                        MOCK_USERS[userIndex].status = USER_STATUSES.ACTIVE;
                    }
                    resolve();
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to unban user');
        }
    }

    /**
     * Reset user password
     */
    async resetPassword(userId: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.post(`/users/${userId}/reset-password`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`Password reset email sent for user: ${userId}`);
                    resolve();
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to reset password');
        }
    }

    /**
     * Delete user
     */
    async deleteUser(userId: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.delete(`/users/${userId}`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId);
                    if (userIndex !== -1) {
                        MOCK_USERS.splice(userIndex, 1);
                    }
                    resolve();
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }

    /**
     * Get user statistics
     */
    async getUserStats(): Promise<UserStats> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<UserStats>('/users/stats');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const now = new Date();
                    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

                    const activeCount = MOCK_USERS.filter((u) => u.status === USER_STATUSES.ACTIVE).length;
                    const inactiveCount = MOCK_USERS.filter((u) => u.status === USER_STATUSES.INACTIVE).length;
                    const suspendedCount = MOCK_USERS.filter((u) => u.status === USER_STATUSES.SUSPENDED).length;
                    const verifiedCount = MOCK_USERS.filter((u) => u.kycStatus === 'verified').length;
                    const pendingKYCCount = MOCK_USERS.filter((u) => u.kycStatus === 'pending').length;

                    resolve({
                        total: MOCK_USERS.length,
                        active: activeCount,
                        inactive: inactiveCount,
                        suspended: suspendedCount,
                        verified: verifiedCount,
                        pending: pendingKYCCount,
                        totalUsers: MOCK_USERS.length,
                        activeUsers: activeCount,
                        newUsersToday: MOCK_USERS.filter((u) => new Date(u.createdAt) >= today).length,
                        newUsersThisWeek: MOCK_USERS.filter((u) => new Date(u.createdAt) >= weekAgo).length,
                        newUsersThisMonth: MOCK_USERS.filter((u) => new Date(u.createdAt) >= monthAgo).length,
                        pendingKYC: pendingKYCCount,
                        bannedUsers: suspendedCount,
                    });
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch user stats');
        }
    }
}

export default new UserService();
