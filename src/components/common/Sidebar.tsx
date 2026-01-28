import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Box,
    Typography,
    Divider,
    useTheme,
} from '@mui/material';
import {
    DashboardOutlined,
    PeopleOutlined,
    SimCardOutlined,
    AttachMoneyOutlined,
    PaymentOutlined,
    AssessmentOutlined,
    IntegrationInstructionsOutlined,
    NotificationsOutlined,
    SupportAgentOutlined,
    SettingsOutlined,
    ExpandLess,
    ExpandMore,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { NAVIGATION_MENU } from '../../config/routes';

const DRAWER_WIDTH = 260;

const iconMap: Record<string, React.ReactElement> = {
    DashboardOutlined: <DashboardOutlined />,
    PeopleOutlined: <PeopleOutlined />,
    SimCardOutlined: <SimCardOutlined />,
    AttachMoneyOutlined: <AttachMoneyOutlined />,
    PaymentOutlined: <PaymentOutlined />,
    AssessmentOutlined: <AssessmentOutlined />,
    IntegrationInstructionsOutlined: <IntegrationInstructionsOutlined />,
    NotificationsOutlined: <NotificationsOutlined />,
    SupportAgentOutlined: <SupportAgentOutlined />,
    SettingsOutlined: <SettingsOutlined />,
};

const Sidebar: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { sidebarOpen } = useAppSelector((state) => state.ui);
    const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

    const handleMenuClick = (title: string) => {
        setOpenMenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: { xs: 0, md: DRAWER_WIDTH },
                flexShrink: 0,
                display: { xs: sidebarOpen ? 'block' : 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    borderRight: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    mt: '64px', // Height of AppBar
                },
            }}
        >
            <Box sx={{ overflow: 'auto', height: '100%' }}>
                <Box sx={{ p: 2 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                        }}
                    >
                        Main Menu
                    </Typography>
                </Box>

                <List sx={{ px: 1 }}>
                    {NAVIGATION_MENU.map((item) => (
                        <React.Fragment key={item.title}>
                            {item.children ? (
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={() => handleMenuClick(item.title)}
                                            sx={{
                                                borderRadius: 2,
                                                mb: 0.5,
                                                '&:hover': {
                                                    backgroundColor: theme.palette.action.hover,
                                                },
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                                                {iconMap[item.icon]}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.title}
                                                primaryTypographyProps={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 500,
                                                }}
                                            />
                                            {openMenus[item.title] ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </ListItem>
                                    <Collapse in={openMenus[item.title]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.children.map((child) => (
                                                <ListItem key={child.title} disablePadding>
                                                    <ListItemButton
                                                        onClick={() => handleNavigate(child.path)}
                                                        sx={{
                                                            pl: 7,
                                                            borderRadius: 2,
                                                            mb: 0.5,
                                                            backgroundColor: isActive(child.path)
                                                                ? theme.palette.primary.main + '15'
                                                                : 'transparent',
                                                            color: isActive(child.path)
                                                                ? theme.palette.primary.main
                                                                : theme.palette.text.primary,
                                                            '&:hover': {
                                                                backgroundColor: isActive(child.path)
                                                                    ? theme.palette.primary.main + '25'
                                                                    : theme.palette.action.hover,
                                                            },
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={child.title}
                                                            primaryTypographyProps={{
                                                                fontSize: '0.8125rem',
                                                                fontWeight: isActive(child.path) ? 600 : 400,
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </>
                            ) : (
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => item.path && handleNavigate(item.path)}
                                        sx={{
                                            borderRadius: 2,
                                            mb: 0.5,
                                            backgroundColor: isActive(item.path || '')
                                                ? theme.palette.primary.main + '15'
                                                : 'transparent',
                                            color: isActive(item.path || '')
                                                ? theme.palette.primary.main
                                                : theme.palette.text.primary,
                                            '&:hover': {
                                                backgroundColor: isActive(item.path || '')
                                                    ? theme.palette.primary.main + '25'
                                                    : theme.palette.action.hover,
                                            },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 40,
                                                color: isActive(item.path || '')
                                                    ? theme.palette.primary.main
                                                    : 'text.secondary',
                                            }}
                                        >
                                            {iconMap[item.icon]}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.title}
                                            primaryTypographyProps={{
                                                fontSize: '0.875rem',
                                                fontWeight: isActive(item.path || '') ? 600 : 500,
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </React.Fragment>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ px: 3, py: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Version 1.0.0
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
