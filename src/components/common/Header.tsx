import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    Tooltip,
    Divider,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    MenuOutlined,
    NotificationsOutlined,
    AccountCircleOutlined,
    SettingsOutlined,
    LogoutOutlined,
    Brightness4Outlined,
    Brightness7Outlined,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSidebar, toggleTheme } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const { themeMode } = useAppSelector((state) => state.ui);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotifMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setNotifAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setNotifAnchor(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate(ROUTES.LOGIN);
        handleMenuClose();
    };

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1E293B' : '#FFFFFF',
                color: (theme) => theme.palette.text.primary,
                boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                        ? '0 1px 3px rgba(0, 0, 0, 0.3)'
                        : '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => dispatch(toggleSidebar())}
                    sx={{ mr: 2 }}
                >
                    <MenuOutlined />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 0, fontWeight: 700 }}>
                    eSIM Admin
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                {/* Theme Toggle */}
                <Tooltip title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
                    <IconButton color="inherit" onClick={handleThemeToggle} sx={{ mr: 1 }}>
                        {themeMode === 'light' ? <Brightness4Outlined /> : <Brightness7Outlined />}
                    </IconButton>
                </Tooltip>

                {/* Notifications */}
                <Tooltip title="Notifications">
                    <IconButton color="inherit" onClick={handleNotifMenuOpen} sx={{ mr: 1 }}>
                        <Badge badgeContent={3} color="error">
                            <NotificationsOutlined />
                        </Badge>
                    </IconButton>
                </Tooltip>

                {/* Profile Menu */}
                <Tooltip title="Account">
                    <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                bgcolor: 'primary.main',
                                fontSize: '0.875rem',
                            }}
                        >
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </Avatar>
                    </IconButton>
                </Tooltip>

                {/* Profile Menu Dropdown */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                        sx: {
                            mt: 1.5,
                            minWidth: 200,
                        },
                    }}
                >
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                            {user?.firstName} {user?.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                            {user?.email}
                        </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={() => navigate(ROUTES.PROFILE)}>
                        <ListItemIcon>
                            <AccountCircleOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => navigate(ROUTES.PROFILE_SETTINGS)}>
                        <ListItemIcon>
                            <SettingsOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutOutlined fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography color="error">Logout</Typography>
                        </ListItemText>
                    </MenuItem>
                </Menu>

                {/* Notifications Menu */}
                <Menu
                    anchorEl={notifAnchor}
                    open={Boolean(notifAnchor)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                        sx: {
                            mt: 1.5,
                            minWidth: 320,
                            maxHeight: 400,
                        },
                    }}
                >
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Notifications
                        </Typography>
                    </Box>
                    <Divider />
                    <MenuItem>
                        <Typography variant="body2">No new notifications</Typography>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
