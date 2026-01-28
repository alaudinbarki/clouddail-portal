import React from 'react';
import { Chip, ChipProps } from '@mui/material';

interface eSIMStatusBadgeProps {
    status: 'active' | 'inactive' | 'suspended' | 'expired';
}

const eSIMStatusBadge: React.FC<eSIMStatusBadgeProps> = ({ status }) => {
    const getStatusColor = (): ChipProps['color'] => {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'default';
            case 'suspended':
                return 'warning';
            case 'expired':
                return 'error';
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

export default eSIMStatusBadge;
