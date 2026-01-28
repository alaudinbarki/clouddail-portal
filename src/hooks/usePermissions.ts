import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import type { UserRole } from '../types/auth';
import { USER_ROLES } from '../types/auth';

/**
 * Custom hook for permission checking
 */
export const usePermissions = () => {
    const user = useAppSelector((state) => state.auth.user);

    /**
     * Check if user has one of the specified roles
     */
    const hasRole = useMemo(
        () => (roles: UserRole | UserRole[]) => {
            if (!user) return false;

            const rolesArray = Array.isArray(roles) ? roles : [roles];
            return rolesArray.includes(user.role);
        },
        [user]
    );

    /**
     * Check if user is super admin
     */
    const isSuperAdmin = useMemo(() => {
        return user?.role === USER_ROLES.SUPER_ADMIN;
    }, [user]);

    /**
     * Check if user is admin (super admin or admin)
     */
    const isAdmin = useMemo(() => {
        return user?.role === USER_ROLES.SUPER_ADMIN || user?.role === USER_ROLES.ADMIN;
    }, [user]);

    /**
     * Check if user can access a resource
     * This is a simplified version - expand based on your permission model
     */
    const canAccess = useMemo(
        () => (resource: string, action: string) => {
            if (!user) return false;

            // Super admin can access everything
            if (user.role === USER_ROLES.SUPER_ADMIN) return true;

            // Define permission rules
            const permissions: Record<UserRole, Record<string, string[]>> = {
                [USER_ROLES.SUPER_ADMIN]: {
                    '*': ['*'], // All resources, all actions
                },
                [USER_ROLES.ADMIN]: {
                    users: ['read', 'create', 'update'],
                    esims: ['read', 'create', 'update', 'delete'],
                    plans: ['read', 'create', 'update', 'delete'],
                    payments: ['read', 'refund'],
                    reports: ['read', 'export'],
                    settings: ['read', 'update'],
                },
                [USER_ROLES.SUPPORT]: {
                    users: ['read'],
                    esims: ['read'],
                    tickets: ['read', 'create', 'update'],
                    reports: ['read'],
                },
                [USER_ROLES.VIEWER]: {
                    users: ['read'],
                    esims: ['read'],
                    reports: ['read'],
                },
            };

            const userPermissions = permissions[user.role];
            if (!userPermissions) return false;

            // Check if user has permission for this resource
            const resourcePermissions = userPermissions[resource] || [];
            return resourcePermissions.includes(action) || resourcePermissions.includes('*');
        },
        [user]
    );

    return {
        hasRole,
        isSuperAdmin,
        isAdmin,
        canAccess,
    };
};
