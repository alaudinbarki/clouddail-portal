import React from 'react';
import { Chip, ChipProps } from '@mui/material';

interface PaymentStatusBadgeProps {
    status: 'completed' | 'pending' | 'failed' | 'refunded';
}

const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
    const getStatusColor = (): ChipProps['color'] => {
        switch (status) {
            case 'completed':
                return 'success';
            case 'pending':
                return 'warning';
            case 'failed':
                return 'error';
            case 'refunded':
                return 'default';
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

export default PaymentStatusBadge;
