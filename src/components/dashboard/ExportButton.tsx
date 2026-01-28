import React, { useState } from 'react';
import {
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
} from '@mui/material';
import {
    FileDownloadOutlined,
    PictureAsPdfOutlined,
    TableChartOutlined,
    EmailOutlined,
} from '@mui/icons-material';

interface ExportButtonProps {
    onExport: (format: 'csv' | 'pdf' | 'excel') => Promise<void>;
    disabled?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport, disabled = false }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
        setLoading(true);
        try {
            await onExport(format);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                startIcon={loading ? <CircularProgress size={16} /> : <FileDownloadOutlined />}
                onClick={handleClick}
                disabled={disabled || loading}
            >
                Export
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => handleExport('csv')}>
                    <ListItemIcon>
                        <TableChartOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Export as CSV</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleExport('pdf')}>
                    <ListItemIcon>
                        <PictureAsPdfOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Export as PDF</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleExport('excel')}>
                    <ListItemIcon>
                        <TableChartOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Export as Excel</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default ExportButton;
