import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    FormControlLabel,
    Checkbox,
    Link,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, LoginOutlined } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import type { LoginCredentials } from '../../types/auth';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '../../config/routes';

// Validation schema
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    rememberMe: yup.boolean().default(false),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const Login: React.FC = () => {
    const { login, isLoading, error, clearAuthError } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    // Clear error when component unmounts
    useEffect(() => {
        return () => {
            clearAuthError();
        };
    }, [clearAuthError]);

    const onSubmit = async (data: LoginFormData) => {
        await login(data as LoginCredentials);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: 3,
            }}
        >
            <Card
                sx={{
                    maxWidth: 450,
                    width: '100%',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    {/* Logo/Title */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
                            eSIM Admin Portal
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sign in to manage your eSIM business
                        </Typography>
                    </Box>

                    {/* Error Alert */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }} onClose={clearAuthError}>
                            {error}
                        </Alert>
                    )}

                    {/* Demo Credentials Info */}
                    <Alert severity="info" sx={{ mb: 3 }}>
                        <Typography variant="body2" fontWeight={600}>
                            Demo Credentials:
                        </Typography>
                        <Typography variant="body2">
                            Email: admin@esimadmin.com
                        </Typography>
                        <Typography variant="body2">
                            Password: admin123
                        </Typography>
                    </Alert>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    margin="normal"
                                    autoComplete="email"
                                    autoFocus
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    margin="normal"
                                    autoComplete="current-password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleTogglePassword}
                                                    edge="end"
                                                    aria-label="toggle password visibility"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                            <Controller
                                name="rememberMe"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={field.value} color="primary" />}
                                        label="Remember me"
                                    />
                                )}
                            />

                            <Link
                                component={RouterLink}
                                to={ROUTES.FORGOT_PASSWORD}
                                variant="body2"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                            startIcon={<LoginOutlined />}
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Footer */}
            <Typography variant="body2" color="white" sx={{ mt: 3, opacity: 0.9 }}>
                © 2024 eSIM Admin Portal. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Login;
