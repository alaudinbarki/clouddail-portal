// @ts-nocheck
/* eslint-disable */
// TODO: Install vitest and testing dependencies with: npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom --legacy-peer-deps
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userService from '../userService';
import { createMockUser, createMockList } from '../../utils/test-factories';

// Mock axios
vi.mock('../../utils/axios');

describe('UserService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should return paginated users', async () => {
            const result = await userService.getUsers({ page: 1, pageSize: 10 });

            expect(result).toHaveProperty('data');
            expect(result).toHaveProperty('total');
            expect(result).toHaveProperty('page', 1);
            expect(result).toHaveProperty('pageSize', 10);
            expect(Array.isArray(result.data)).toBe(true);
        });

        it('should filter users by status', async () => {
            const result = await userService.getUsers({ status: 'active' });

            expect(result.data.every((user) => user.status === 'active')).toBe(true);
        });

        it('should search users by name or email', async () => {
            const searchTerm = 'test';
            const result = await userService.getUsers({ search: searchTerm });

            expect(result.data.length).toBeGreaterThan(0);
        });
    });

    describe('getUserById', () => {
        it('should return a user by ID', async () => {
            const userId = 'user-1';
            const user = await userService.getUserById(userId);

            expect(user).toBeDefined();
            expect(user.id).toBe(userId);
        });

        it('should throw error for non-existent user', async () => {
            await expect(userService.getUserById('non-existent')).rejects.toThrow();
        });
    });

    describe('banUser', () => {
        it('should ban a user', async () => {
            const userId = 'user-1';
            await expect(userService.banUser(userId, 'Violation of terms')).resolves.not.toThrow();
        });
    });

    describe('getUserStats', () => {
        it('should return user statistics', async () => {
            const stats = await userService.getUserStats();

            expect(stats).toHaveProperty('total');
            expect(stats).toHaveProperty('active');
            expect(stats).toHaveProperty('inactive');
            expect(typeof stats.total).toBe('number');
        });
    });
});
