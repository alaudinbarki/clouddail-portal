import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import type { UserStatus } from '../../types/user';

interface UserStatusBadgeProps {
    status: UserStatus;
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
    const getStatusColor = (): ChipProps['color'] => {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'default';
            case 'suspended':
                return 'error';
            case 'pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            color={getStatusColor()}
            size="small"
        />
    );
};

export default UserStatusBadge;
