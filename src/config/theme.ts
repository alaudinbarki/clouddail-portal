import { createTheme, ThemeOptions } from '@mui/material/styles';

// Color palette
const colors = {
    primary: {
        main: '#6366F1', // Indigo
        light: '#818CF8',
        dark: '#4F46E5',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#EC4899', // Pink
        light: '#F472B6',
        dark: '#DB2777',
        contrastText: '#FFFFFF',
    },
    success: {
        main: '#10B981', // Emerald
        light: '#34D399',
        dark: '#059669',
    },
    warning: {
        main: '#F59E0B', // Amber
        light: '#FBBF24',
        dark: '#D97706',
    },
    error: {
        main: '#EF4444', // Red
        light: '#F87171',
        dark: '#DC2626',
    },
    info: {
        main: '#3B82F6', // Blue
        light: '#60A5FA',
        dark: '#2563EB',
    },
    grey: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    },
};

// Common theme options
const commonTheme: ThemeOptions = {
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 20px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                },
                contained: {
                    '&:hover': {
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                    },
                    transition: 'box-shadow 0.3s ease-in-out',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
                elevation1: {
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontWeight: 500,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid',
                },
                head: {
                    fontWeight: 600,
                    fontSize: '0.875rem',
                },
            },
        },
    },
};

// Light theme
export const lightTheme = createTheme({
    ...commonTheme,
    palette: {
        mode: 'light',
        ...colors,
        background: {
            default: '#F9FAFB',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#111827',
            secondary: '#6B7280',
        },
        divider: '#E5E7EB',
    },
    components: {
        ...commonTheme.components,
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottomColor: '#E5E7EB',
                },
            },
        },
    },
});

// Dark theme
export const darkTheme = createTheme({
    ...commonTheme,
    palette: {
        mode: 'dark',
        ...colors,
        background: {
            default: '#0F172A', // Slate 900
            paper: '#1E293B', // Slate 800
        },
        text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
        },
        divider: '#334155',
    },
    components: {
        ...commonTheme.components,
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottomColor: '#334155',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#1E293B',
                },
            },
        },
    },
});

export default lightTheme;
