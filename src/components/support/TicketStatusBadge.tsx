import React from 'react';
import { Chip, ChipProps } from '@mui/material';

interface TicketStatusBadgeProps {
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
}

const TicketStatusBadge: React.FC<TicketStatusBadgeProps> = ({ status }) => {
    const getStatusColor = (): ChipProps['color'] => {
        switch (status) {
            case 'open':
                return 'error';
            case 'in_progress':
                return 'warning';
            case 'resolved':
                return 'success';
            case 'closed':
                return 'default';
            default:
                return 'default';
        }
    };

    return (
        <Chip
            label={status.replace('_', ' ').toUpperCase()}
            color={getStatusColor()}
            size="small"
        />
    );
};

export default TicketStatusBadge;
