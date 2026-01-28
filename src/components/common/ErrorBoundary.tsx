import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        p: 3,
                        backgroundColor: 'background.default',
                    }}
                >
                    <Paper
                        sx={{
                            p: 4,
                            maxWidth: 500,
                            textAlign: 'center',
                        }}
                    >
                        <ErrorOutline
                            sx={{
                                fontSize: 64,
                                color: 'error.main',
                                mb: 2,
                            }}
                        />
                        <Typography variant="h5" gutterBottom fontWeight={600}>
                            Oops! Something went wrong
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            We're sorry for the inconvenience. An unexpected error has occurred.
                        </Typography>
                        {this.state.error && (
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    mb: 3,
                                    backgroundColor: 'grey.50',
                                    textAlign: 'left',
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    component="pre"
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontSize: '0.75rem',
                                        overflow: 'auto',
                                        maxHeight: 200,
                                    }}
                                >
                                    {this.state.error.message}
                                </Typography>
                            </Paper>
                        )}
                        <Button
                            variant="contained"
                            onClick={this.handleReset}
                            size="large"
                        >
                            Return to Dashboard
                        </Button>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
